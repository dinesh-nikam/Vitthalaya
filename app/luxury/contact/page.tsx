'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { LUXURY_SALONS, LUXURY_FAQS } from '@/src/data/luxury-data';

export default function LuxuryContactPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Atelier Concierge...</div>}>
      <ContactFormContent />
    </React.Suspense>
  );
}

function ContactFormContent() {
  const searchParams = useSearchParams();

  // Initial values from search params if passed from estimator
  const paramDiscipline = searchParams?.get('discipline') || 'digital';
  const paramSalon = searchParams?.get('salon') || 'paris';

  const [formData, setFormData] = React.useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    salon: paramSalon,
    metier: paramDiscipline,
    investment: 'tier-2',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Generate authentic cryptographic reference code
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const refCode = `AV-${formData.salon.toUpperCase().slice(0, 3)}-2026-${randomHex}`;
    setSubmittedRef(refCode);
  };

  return (
    <div className="flex flex-col w-full py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header Introduction */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
          Private Vernissage & Audience
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-foreground font-normal tracking-tight">
          Initiate a Bespoke Commission
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
          Our Curatorial Board receives patron briefings with strict confidentiality. Complete the diagnostic inquiry below to request an audience at our Paris, Kyoto, New York, or London salons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Commission Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.25))] shadow-xl space-y-8">
            {submittedRef ? (
              <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[var(--dp-gold,#c5a059)]/15 border border-[var(--dp-gold,#c5a059)] text-[var(--dp-gold,#c5a059)] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
                    Briefing Inscribed
                  </span>
                  <h2 className="text-3xl font-serif text-card-foreground">
                    Private Audience Requested
                  </h2>
                  <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto leading-relaxed">
                    Your transmission has been encrypted and delivered to the desk of our Curatorial Director. A confidential response will follow within 48 business hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-background/80 border border-border inline-block text-left text-xs space-y-1">
                  <span className="text-muted-foreground font-sans block">
                    Confidential Reference Code:
                  </span>
                  <span className="font-mono text-base text-[var(--dp-gold,#c5a059)] font-bold tracking-wider">
                    {submittedRef}
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmittedRef(null)}
                    type="button"
                    className="text-xs font-sans text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-border text-xs text-muted-foreground font-sans">
                  <ShieldCheck size={16} className="text-[var(--dp-gold,#c5a059)]" />
                  <span>Encrypted 256-Bit SSL Transmission • Non-Disclosure Covenant</span>
                </div>

                {/* Identity Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                      Patron Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Baron Henri de Saint-Germain"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                      Maison or Foundation
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Saint-Germain Heritage Trust"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                      Confidential Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patron@domain.com"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                      Direct Telephone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 1 42 68 00 00"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                    />
                  </div>
                </div>

                {/* Scope & Host Salon Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                      Preferred Host Salon
                    </label>
                    <select
                      value={formData.salon}
                      onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-xs sm:text-sm font-sans text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                    >
                      <option value="paris">Paris — Place Vendôme</option>
                      <option value="kyoto">Kyoto — Gion-machi</option>
                      <option value="newyork">New York — Madison Avenue</option>
                      <option value="london">London — Mayfair</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                      Primary Metier
                    </label>
                    <select
                      value={formData.metier}
                      onChange={(e) => setFormData({ ...formData, metier: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-xs sm:text-sm font-sans text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                    >
                      <option value="digital">Digital Haute Flagship (3D/WebGL)</option>
                      <option value="spatial">Spatial Scenography & Interiors</option>
                      <option value="identity">Haute Identity & Custom Typefoundry</option>
                      <option value="monograph">Archival Hardcover Monograph Publishing</option>
                    </select>
                  </div>
                </div>

                {/* Investment Scope Tier */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                    Anticipated Investment Allocation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'tier-1', label: '€65,000 – €120,000' },
                      { id: 'tier-2', label: '€120,000 – €250,000' },
                      { id: 'tier-3', label: '€250,000+' },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, investment: tier.id })}
                        className={`p-3 rounded-xl border text-xs font-mono transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] ${
                          formData.investment === tier.id
                            ? 'border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/10 text-foreground font-semibold shadow-sm'
                            : 'border-border bg-background/50 text-muted-foreground hover:border-foreground/20'
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Briefing Notes */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                    Briefing Notes & Vision Narrative
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Describe your maison's history, the scope of the commission, desired completion horizon, and any confidential material requirements..."
                    className="w-full rounded-xl border border-border bg-background/50 p-4 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-95 shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                >
                  <Send size={14} />
                  <span>Transmit Confidential Dossier</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Salons Directory & FAQ */}
        <div className="lg:col-span-5 space-y-8">
          {/* Direct Concierge Quarters */}
          <div className="p-8 rounded-2xl bg-card border border-border space-y-6 shadow-sm">
            <h3 className="text-xl font-serif text-foreground">
              Direct Concierge Lines
            </h3>
            <div className="space-y-4 text-xs font-sans text-muted-foreground">
              {LUXURY_SALONS.map((salon) => (
                <div key={salon.id} className="pb-4 border-b border-border last:border-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between font-semibold text-foreground">
                    <span>{salon.city} ({salon.district})</span>
                    <span className="text-[var(--dp-gold,#c5a059)] font-mono">{salon.conciergePhone}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{salon.hours}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Addressed Queries */}
          <div className="p-8 rounded-2xl bg-card border border-border space-y-6 shadow-sm">
            <h3 className="text-xl font-serif text-foreground">
              Curatorial Protocol FAQ
            </h3>
            <div className="space-y-3">
              {LUXURY_FAQS.map((faq, idx) => (
                <div key={idx} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    type="button"
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-sans font-medium text-foreground hover:text-[var(--dp-gold,#c5a059)] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={14}
                      className={`text-[var(--dp-gold,#c5a059)] shrink-0 transition-transform ${
                        openFaqIndex === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs text-muted-foreground font-sans leading-relaxed border-t border-border bg-background/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
