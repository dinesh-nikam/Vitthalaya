'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export function PrintRouteButton({ className = '' }: { className?: string }) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--dp-ground-well)] border border-[var(--dp-gold)]/40 hover:border-[var(--dp-gold)] text-xs font-marathi font-medium text-[var(--dp-gold-celestial)] hover:text-[var(--dp-ink)] transition-all shadow-sm active:translate-y-px print:hidden ${className}`}
      aria-label="वारी मार्गदर्शक पत्रक प्रिंट करा (A4 आकार)"
      title="A4 आकारातील वारी मार्गदर्शक पत्रक प्रिंट किंवा सेव्ह करा"
    >
      <Printer className="w-4 h-4 text-[var(--dp-gold)]" aria-hidden="true" />
      <span>मार्गदर्शक पत्रक प्रिंट करा (A4 Sheet)</span>
    </button>
  );
}
