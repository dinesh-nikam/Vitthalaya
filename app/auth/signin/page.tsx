'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, LogIn, AlertCircle, Sparkles, Shield } from 'lucide-react';
import '@/app/homepage.css';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);

    if (!email || !password) {
      setLocalError('कृपया ईमेल आणि पासवर्ड दोन्ही प्रविष्ट करा.');
      setLoading(false);
      return;
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setLocalError(
          res.error === 'CredentialsSignin'
            ? 'चुकीचा ईमेल किंवा पासवर्ड टाकण्यात आला आहे. कृपया पुन्हा तपासा.'
            : res.error
        );
      } else if (res?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setLocalError('लॉगिन करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vitthalaya-shell min-h-screen flex items-center justify-center p-4 py-12">
      <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-2xl max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[var(--dp-ground-elevated)] border border-[var(--dp-gold)] rounded-full flex items-center justify-center mx-auto text-[var(--dp-gold)] shadow-[0_0_15px_rgba(201,162,39,0.25)]">
            <LogIn className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <Sparkles size={11} />
            साधक प्रवेश दालन
          </span>
          <h1 className="vitthalaya-display text-2xl font-bold">
            डिजिटल पंढरपूर प्रवेश
          </h1>
          <p className="text-xs font-marathi text-[var(--dp-muted)] leading-relaxed">
            संत साहित्य संरक्षण, संकलन व संपादनासाठी खात्यात प्रवेश करा
          </p>
        </div>

        {/* Errors */}
        {(localError || error) && (
          <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-3.5 flex gap-2.5 items-start text-xs font-marathi text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
            <p>{localError || 'प्रमाणीकरण अयशस्वी झाले. कृपया लॉग इन क्रेडेंशियल तपासा.'}</p>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5"
              >
                ईमेल पत्ता (Email) *
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contributor@warkari.org"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/20 outline-none text-xs sm:text-sm font-marathi transition-colors min-h-[44px]"
              />
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi"
                >
                  पासवर्ड (Password) *
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-marathi text-[var(--dp-gold)] hover:underline"
                >
                  पासवर्ड विसरलात?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/20 outline-none text-xs sm:text-sm font-marathi transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold font-marathi text-[#0d0906] bg-[var(--dp-gold)] hover:bg-[var(--dp-gold-celestial)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-h-[44px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>प्रक्रिया सुरू आहे...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>प्रवेश करा (Log In)</span>
              </>
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center pt-2 border-t border-[var(--dp-rule)]/40 text-xs font-marathi text-[var(--dp-muted)]">
          <span>नवीन साधक आहात? </span>
          <Link href="/auth/signup" className="text-[var(--dp-gold)] font-semibold hover:underline">
            नवीन खाते तयार करा
          </Link>
        </div>

        {/* Developer Sandbox login assistance */}
        <div className="bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--dp-gold)] font-marathi">
            <Shield size={13} />
            <span>विकासक चाचणी माहिती (Dev Credentials):</span>
          </div>
          <div className="text-xs text-[var(--dp-muted)] font-marathi space-y-1">
            <p>स्थानिक चाचणीसाठी खालील क्रेडेंशियल्स उपलब्ध आहेत:</p>
            <p className="font-mono text-[11px] select-all bg-[var(--dp-ground-deep)] border border-[var(--dp-rule)]/50 p-2 rounded text-[var(--dp-ink)]">
              ईमेल: <span className="text-[var(--dp-gold)]">admin@warkari.org</span>
              <br />
              पासवर्ड: <span className="text-[var(--dp-gold)]">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <React.Suspense
      fallback={
        <div className="vitthalaya-shell min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--dp-gold)]" />
        </div>
      }
    >
      <SignInForm />
    </React.Suspense>
  );
}
