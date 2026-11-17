'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, KeySquare, AlertCircle, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!token || !email) {
      setError('पासवर्ड रिसेट टोकन किंवा ईमेल गहाळ आहे. कृपया पासवर्ड रिसेट लिंक पुन्हा मागवा.');
      setLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setError('कृपया दोन्ही पासवर्ड रकाने भरा.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('पासवर्ड जुळत नाहीत. कृपया पुन्हा तपासा.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('पासवर्ड किमान ६ अक्षरांचा असावा.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'पासवर्ड रिसेट करण्यास अडचण आली.');
      } else {
        setSuccess('पासवर्ड यशस्वीरित्या बदलला गेला! लॉगिन पानावर नेत आहोत...');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 1500);
      }
    } catch {
      setError('पासवर्ड रिसेट करताना तांत्रिक अडचण आली. कृपया पुन्हा प्रयत्न करा.');
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
            <KeySquare className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <Sparkles size={11} />
            सुरक्षित पासवर्ड नूतनीकरण
          </span>
          <h1 className="vitthalaya-display text-2xl font-bold">
            नवीन पासवर्ड सेट करा
          </h1>
          <p className="text-xs font-marathi text-[var(--dp-muted)] leading-relaxed">
            आपल्या खात्यासाठी नवीन आणि मजबूत पासवर्ड निश्चित करा
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
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5"
              >
                नवीन पासवर्ड (New Password) *
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="किमान ६ अक्षरे"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5"
              >
                नवीन पासवर्ड पुन्हा प्रविष्ट करा *
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="पासवर्ड पुन्हा प्रविष्ट करा"
                className={inputClass}
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
                <span>पासवर्ड बदलत आहे...</span>
              </>
            ) : (
              <span>नवीन पासवर्ड जतन करा</span>
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

export default function ResetPasswordPage() {
  return (
    <React.Suspense
      fallback={
        <div className="vitthalaya-shell min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--dp-gold)]" />
        </div>
      }
    >
      <ResetPasswordForm />
    </React.Suspense>
  );
}
