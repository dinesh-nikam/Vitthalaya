'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Mail, Check } from 'lucide-react';
import { LUXURY_SALONS, LUXURY_IMAGE_CREDITS } from '@/src/data/luxury-data';

export function LuxuryFooter() {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubmitted(true);
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Atelier Véricourt Editorial Footer"
      className="relative w-full border-t border-[var(--dp-rule,rgba(197,160,89,0.2))] bg-card text-card-foreground pt-16 sm:pt-24 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Top Masthead & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-border">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
              Maison de Haute Conception
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-foreground">
              Atelier Véricourt
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-lg leading-relaxed">
              An independent international creative maison sculpting digital architecture, spatial scenography, and high horology with the silence of deliberate restraint.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck size={14} className="text-[var(--dp-gold,#c5a059)]" />
              <span>Full WCAG 2.2 AA Accessibility • Carbon-Sequestered Digital Infrastructure</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-sans tracking-[0.24em] uppercase text-foreground font-semibold">
                Private Vernissage Notices
              </h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                Receive confidential monograph invitations and architectural case studies directly from our Paris curatorial desk.
              </p>
            </div>

            {newsletterSubmitted ? (
              <div className="p-4 rounded-xl bg-[var(--dp-gold,#c5a059)]/10 border border-[var(--dp-gold,#c5a059)]/40 flex items-center gap-3 text-xs text-[var(--dp-gold,#c5a059)]">
                <Check size={16} />
                <span>Your address has been inscribed for our next private curatorial dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full rounded-full border border-border bg-background/50 pl-10 pr-4 py-3 text-xs font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                    aria-label="Email address for private vernissage dispatches"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--dp-gold,#c5a059)] px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-black hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] shrink-0"
                >
                  Inscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Global Salons Directory */}
        <div className="space-y-6">
          <h3 className="text-xs font-sans tracking-[0.26em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
            Global Salons & Private Quarters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {LUXURY_SALONS.map((salon) => (
              <div key={salon.id} className="space-y-2 border-l border-border pl-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-foreground font-medium">{salon.city}</h4>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)]">
                    {salon.district}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{salon.address}</p>
                <p className="text-[11px] text-muted-foreground/80 font-mono">{salon.hours}</p>
                <a
                  href={`mailto:${salon.conciergeEmail}`}
                  className="inline-flex items-center gap-1 text-[11px] text-[var(--dp-gold,#c5a059)] hover:underline pt-1"
                >
                  <span>{salon.conciergeEmail}</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation & Provenance Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-border text-xs font-sans">
          <div className="space-y-3">
            <span className="tracking-widest uppercase text-muted-foreground font-semibold">Atelier Suite</span>
            <ul className="space-y-2">
              <li>
                <Link href="/luxury" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Maison Overview
                </Link>
              </li>
              <li>
                <Link href="/luxury/works" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Selected Works Folio
                </Link>
              </li>
              <li>
                <Link href="/luxury/services" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Disciplines & Scope
                </Link>
              </li>
              <li>
                <Link href="/luxury/lab" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Sensorial Lab & 3D
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="tracking-widest uppercase text-muted-foreground font-semibold">Governance</span>
            <ul className="space-y-2">
              <li>
                <Link href="/luxury/about" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Heritage & Founders
                </Link>
              </li>
              <li>
                <Link href="/luxury/journal" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Curatorial Journal
                </Link>
              </li>
              <li>
                <Link href="/luxury/contact" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Private Salon Inquiries
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="tracking-widest uppercase text-muted-foreground font-semibold">Heritage Ecosystem</span>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Digital Pandharpur Home
                </Link>
              </li>
              <li>
                <Link href="/sanctuary" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  ३D Virtual Mandap
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  Granth Bhandar
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="tracking-widest uppercase text-muted-foreground font-semibold">Confidentiality</span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              All commissioned designs, codebases, and custom typefoundry masters are governed under strict perpetual NDA covenants.
            </p>
          </div>
        </div>

        {/* Image Credits & Copyright Safety Section */}
        <div className="p-6 rounded-xl bg-background/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
              Image Credits & Copyright Attribution Note
            </h4>
            <span className="text-[10px] text-muted-foreground">Free Commercial Licenses (Unsplash)</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All photography displayed across the Atelier Véricourt luxury portal is sourced strictly from verified free-for-commercial-use creative commons photography via Unsplash. No copyrighted trademarks, proprietary commercial brand logos, identifiable private individuals, or unauthorized intellectual property are depicted.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-muted-foreground/80 font-mono pt-1">
            {LUXURY_IMAGE_CREDITS.slice(0, 4).map((credit, idx) => (
              <div key={idx}>
                • {credit.photographer} ({credit.usage})
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2014–2026 Atelier Véricourt. All international design rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Paris • Kyoto • New York • London</span>
            <Link href="/" className="hover:text-[var(--dp-gold,#c5a059)] transition-colors">
              Return to Sacred Archive →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
