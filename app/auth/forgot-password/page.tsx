'use client';

import * as React from 'react';
import Link from 'next/link';
import { Loader2, KeyRound, AlertCircle, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('कृपया तुमचा नोंदणीकृत ईमेल पत्ता प्रविष्ट करा.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'पासवर्ड रिसेट विनंती अयशस्वी झाली.');
      } else {
        setSuccess(data.message || 'पासवर्ड रिसेट लिंक आपल्या ईमेलवर पाठवली आहे.');
      }
    } catch {
      setError('पासवर्ड रिसेट विनंती करताना तांत्रिक अडचण आली. कृपया पुन्हा प्रयत्न करा.');
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
            <KeyRound className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <Sparkles size={11} />
            खाते सुरक्षा
          </span>
          <h1 className="vitthalaya-display text-2xl font-bold">
            पासवर्ड विसरलात?
          </h1>
          <p className="text-xs font-marathi text-[var(--dp-muted)] leading-relaxed">
            आपला नोंदणीकृत ईमेल प्रविष्ट करा. आम्ही पासवर्ड रिसेट करण्यासाठी सुरक्षित लिंक पाठवू.
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
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5"
            >
              नोंदणीकृत ईमेल (Email) *
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

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold font-marathi text-[#0d0906] bg-[var(--dp-gold)] hover:bg-[var(--dp-gold-celestial)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-h-[44px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>लिंक पाठवत आहे...</span>
              </>
            ) : (
              <span>पासवर्ड रिसेट लिंक पाठवा</span>
            )}
          </button>
        </form>

        {/* Return to Signin */}
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
