'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, Sparkles, Mail } from 'lucide-react';
import '@/app/homepage.css';

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = React.useState(emailParam);
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email || !token) {
      setError('कृपया ईमेल आणि पडताळणी कोड (OTP) दोन्ही प्रविष्ट करा.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'कोड पडताळणी अयशस्वी झाली.');
      } else {
        setSuccess('ईमेल पडताळणी यशस्वी झाली! लॉगिन करत आहोत...');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 1500);
      }
    } catch {
      setError('पडताळणी करताना तांत्रिक अडचण आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/20 outline-none text-xs sm:text-sm font-marathi transition-colors min-h-[44px]';

  return (
    <div className="vitthalaya-shell min-h-screen flex items-center justify-center p-4 py-12">
      <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-2xl max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[var(--dp-ground-elevated)] border border-[var(--dp-gold)] rounded-full flex items-center justify-center mx-auto text-[var(--dp-gold)] shadow-[0_0_15px_rgba(201,162,39,0.25)]">
            <Mail className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <Sparkles size={11} />
            ईमेल ओळख प्रमाणीकरण
          </span>
          <h1 className="vitthalaya-display text-2xl font-bold">
            ईमेल पडताळणी
          </h1>
          <p className="text-xs font-marathi text-[var(--dp-muted)] leading-relaxed">
            आम्ही आपल्या ईमेलवर पाठवलेला ६-अंकी सुरक्षित पडताळणी कोड (OTP) प्रविष्ट करा
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-3.5 flex gap-2.5 items-start text-xs font-marathi text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 flex gap-2.5 items-start text-xs font-marathi text-emerald-300">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
            <p>{success}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5"
              >
                ईमेल पत्ता *
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contributor@warkari.org"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="token"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5"
              >
                पडताळणी कोड (६-अंकी OTP) *
              </label>
              <input
                id="token"
                type="text"
                required
                maxLength={6}
                value={token}
                onChange={(e) => setToken(e.target.value.trim())}
                placeholder="उदा. 123456"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-gold)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/20 outline-none text-center font-mono text-lg tracking-widest transition-colors min-h-[44px]"
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
                <span>पडताळणी होत आहे...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>कोड पडताळा (Verify)</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[var(--dp-rule)]/40 text-xs font-marathi">
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-1.5 text-[var(--dp-gold)] font-semibold hover:underline min-h-[44px]"
          >
            <ArrowLeft size={13} />
            <span>लॉगिन पानावर परत जा</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="vitthalaya-shell min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--dp-gold)]" />
        </div>
      }
    >
      <VerifyEmailForm />
    </React.Suspense>
  );
}
