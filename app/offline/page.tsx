'use client';

/**
 * Offline fallback page — shown when the user navigates without connectivity
 * and the page is not in the service worker cache.
 */
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

export default function OfflinePage() {
  return (
    <div className="vitthalaya-shell min-h-screen flex items-center justify-center p-4">
      <div className="vitthalaya-card rounded-2xl p-8 sm:p-10 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-2xl max-w-md w-full text-center space-y-6">
        {/* Offline indicator */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-gold)] flex items-center justify-center text-[var(--dp-gold)] shadow-[0_0_15px_rgba(201,162,39,0.25)]">
          <WifiOff className="w-8 h-8" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-2">
            इंटरनेट अनुपलब्ध
          </span>
          <h1 className="vitthalaya-display text-2xl sm:text-3xl font-bold mb-2">
            आपण सध्या ऑफलाइन आहात
          </h1>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)] leading-relaxed">
            कृपया आपले इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs sm:text-sm font-marathi rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px] shadow-sm"
          >
            <RefreshCw size={14} />
            <span>पुन्हा प्रयत्न करा (Reload)</span>
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-gold)] font-medium text-xs sm:text-sm font-marathi rounded-lg transition-colors min-h-[44px]"
          >
            <Home size={14} />
            <span>मुख्य मंदिराकडे परत</span>
          </Link>
        </div>

        {/* Cached content hint */}
        <div className="p-4 rounded-xl border border-[var(--dp-rule)]/60 bg-[var(--dp-ground-elevated)] text-left flex items-start gap-3">
          <Sparkles size={16} className="text-[var(--dp-gold)] shrink-0 mt-0.5" />
          <p className="text-xs font-marathi text-[var(--dp-muted)] leading-relaxed">
            टीप: पूर्वी वाचलेले अभंग व नित्यनेम आपल्या डिव्हाइसवर ऑफलाइन सुरक्षित जतन केलेले असू शकतात.
          </p>
        </div>
      </div>
    </div>
  );
}
