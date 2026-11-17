'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface ScopeOption {
  id: string;
  label: string;
  multiplier: number;
  weeks: number;
}

const DISCIPLINES = [
  { id: 'digital', label: 'Digital Haute Flagship (3D/WebGL)', basePrice: 85000, baseWeeks: 16 },
  { id: 'spatial', label: 'Spatial Scenography & Interiors', basePrice: 120000, baseWeeks: 20 },
  { id: 'identity', label: 'Haute Identity & Custom Typefoundry', basePrice: 65000, baseWeeks: 12 },
  { id: 'monograph', label: 'Archival Hardcover Monograph Publishing', basePrice: 75000, baseWeeks: 14 },
];

const SALONS = [
  { id: 'paris', label: 'Paris (Place Vendôme)' },
  { id: 'kyoto', label: 'Kyoto (Gion-machi)' },
  { id: 'newyork', label: 'New York (Madison Ave)' },
  { id: 'london', label: 'London (Mayfair)' },
];

const TIERS: ScopeOption[] = [
  { id: 'essential', label: 'Curated Edition (Single Flagship)', multiplier: 1.0, weeks: 0 },
  { id: 'comprehensive', label: 'Comprehensive Metiers (Flagship + Identity)', multiplier: 1.6, weeks: 4 },
  { id: 'grand', label: 'Grand Maison Scenography (Multi-Disciplinary)', multiplier: 2.4, weeks: 8 },
];

export function CommissionEstimator() {
  const router = useRouter();
  const [selectedDiscipline, setSelectedDiscipline] = React.useState(DISCIPLINES[0]);
  const [selectedSalon, setSelectedSalon] = React.useState(SALONS[0]);
  const [selectedTier, setSelectedTier] = React.useState(TIERS[0]);

  // Compute estimate
  const estimatedInvestment = Math.round(selectedDiscipline.basePrice * selectedTier.multiplier);
  const estimatedTimelineWeeks = selectedDiscipline.baseWeeks + selectedTier.weeks;

  const handleProceedToInquiry = () => {
    const params = new URLSearchParams({
      discipline: selectedDiscipline.id,
      salon: selectedSalon.id,
      tier: selectedTier.id,
      estimate: estimatedInvestment.toString(),
    });
    router.push(`/luxury/contact?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.25))] p-6 sm:p-10 shadow-xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-sans tracking-[0.24em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            Atelier Planning Instrument
          </span>
          <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-card-foreground">
            Bespoke Commission Scope Calculator
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-sans">
            Calibrate discipline, geographic salon, and scope tier for an immediate feasibility projection.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--dp-gold,#c5a059)]/10 border border-[var(--dp-gold,#c5a059)]/30 text-xs text-[var(--dp-gold,#c5a059)] font-sans self-start">
          <Calculator size={14} />
          <span>Live Atelier Model</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step 1: Discipline */}
        <div className="space-y-3">
          <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
            01. Core Metier
          </label>
          <div className="space-y-2">
            {DISCIPLINES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDiscipline(d)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] ${
                  selectedDiscipline.id === d.id
                    ? 'border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/10 text-foreground font-medium shadow-sm'
                    : 'border-border bg-background/50 text-muted-foreground hover:border-foreground/20'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Scope Tier */}
        <div className="space-y-3">
          <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
            02. Architectural Tier
          </label>
          <div className="space-y-2">
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTier(t)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] ${
                  selectedTier.id === t.id
                    ? 'border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/10 text-foreground font-medium shadow-sm'
                    : 'border-border bg-background/50 text-muted-foreground hover:border-foreground/20'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Geographic Salon */}
        <div className="space-y-3">
          <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
            03. Host Salon
          </label>
          <div className="space-y-2">
            {SALONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSalon(s)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] ${
                  selectedSalon.id === s.id
                    ? 'border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/10 text-foreground font-medium shadow-sm'
                    : 'border-border bg-background/50 text-muted-foreground hover:border-foreground/20'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projection Summary Card */}
      <div className="p-6 rounded-2xl bg-background/80 border border-[var(--dp-gold,#c5a059)]/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
            Feasibility Projection
          </span>
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-serif text-foreground font-semibold">
              €{estimatedInvestment.toLocaleString('en-US')}
            </span>
            <span className="text-xs text-muted-foreground font-sans">
              (Est. investment allocation, excluding VAT)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[var(--dp-gold,#c5a059)]" />
              Duration: ~{estimatedTimelineWeeks} weeks
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[var(--dp-gold,#c5a059)]" />
              Encrypted Confidential Escrow
            </span>
          </div>
        </div>

        <button
          onClick={handleProceedToInquiry}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-black hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] shrink-0"
        >
          <span>Transmit Bespoke Brief</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
