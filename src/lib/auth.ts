import { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import crypto from 'crypto';
import { db } from '@/src/db/client';
import { checkAuthRateLimit, recordFailedAuthAttempt, clearAuthRateLimit } from '@/src/lib/auth-rate-limit';

// Password hashing iterations - OWASP recommends 600000 for PBKDF2
const PBKDF2_ITERATIONS = process.env.NODE_ENV === 'production' ? 600000 : 100000;

export function verifyPassword(password: string, hash: string): boolean {
  try {
    const [salt, key] = hash.split(':');
    // Handle legacy hashes with 1000 iterations
    const iterations = hash.includes(':iterations:') ? parseInt(hash.split(':iterations:')[1], 10) : PBKDF2_ITERATIONS;
    const legacyHash = hash.split(':iterations:')[0].split(':')[1];
    const targetKey = key || legacyHash;
    if (!targetKey) return false;

    const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
    const derivedBuf = Buffer.from(derivedKey.toString('hex'), 'utf8');
    const targetBuf = Buffer.from(targetKey, 'utf8');

    if (derivedBuf.length !== targetBuf.length) return false;
    return crypto.timingSafeEqual(derivedBuf, targetBuf);
  } catch {
    return false;
  }
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 64, 'sha512');
  // Include iterations in hash for future upgrades: salt:key:iterations
  return `${salt}:${derivedKey.toString('hex')}:iterations:${PBKDF2_ITERATIONS}`;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'मराठी वारकरी लॉगिन (Credentials)',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'devotee@warkari.org' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Rate limiting check
        const rateLimit = await checkAuthRateLimit(credentials.email);
        if (!rateLimit.allowed) {
          throw new Error(`Too many failed attempts. Try again after ${Math.max(1, Math.floor((rateLimit.lockoutUntil! - Date.now()) / 60000))} minutes.`);
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          // Record failed attempt for non-existent user as well (prevent timing attacks)
          await recordFailedAuthAttempt(credentials.email);
          throw new Error('User not found or password login not configured');
        }

        const isValid = verifyPassword(credentials.password, user.password);
        if (!isValid) {
          await recordFailedAuthAttempt(credentials.email);
          throw new Error('Invalid email or password');
        }

        // Successful login - clear rate limit
        await clearAuthRateLimit(credentials.email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          reputationScore: user.reputationScore,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || 'USER';
        token.reputationScore = (user as any).reputationScore || 0;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).reputationScore = token.reputationScore;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: (() => {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      if (process.env.NODE_ENV === 'production') {
        if (process.env.NEXT_PHASE === 'phase-production-build') {
          return 'build-fallback-secret-key';
        }
        throw new Error('FATAL: NEXTAUTH_SECRET is required in production. Set environment variable.');
      }
      console.warn('⚠️ NEXTAUTH_SECRET not set. Using dev secret. DO NOT USE IN PRODUCTION.');
    }
    return secret || 'dev-secret-fallback';
  })(),
  pages: {
    signIn: '/auth/signin',
  },
};
