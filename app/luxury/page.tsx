'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, Award } from 'lucide-react';
import { MarqueeTicker } from '@/components/luxury/marquee-ticker';
import { HorizontalShowcase } from '@/components/luxury/horizontal-showcase';
import { AnimatedCounter } from '@/components/luxury/animated-counter';
import { MagneticButton } from '@/components/luxury/magnetic-button';
import { CommissionEstimator } from '@/components/luxury/commission-estimator';
import { ThreeDComplicationViewer } from '@/components/luxury/3d-complication-viewer';
import { LUXURY_METRICS, LUXURY_SALONS, LUXURY_PROJECTS } from '@/src/data/luxury-data';

const TICKER_ITEMS = [
  'Haute Horlogerie',
  'Spatial Scenography',
  'Place Vendôme Paris',
  'Digital Silk & WebGL',
  'Gion Kyoto Sanctuary',
  'Bespoke Typefoundry',
  'Madison Avenue New York',
  'Archival Monograph Editions',
  'Mayfair London Townhouse',
];

export default function LuxuryHomePage() {
  // Live salon clocks
  const [times, setTimes] = React.useState<Record<string, string>>({
    Paris: '--:--',
    Kyoto: '--:--',
    NewYork: '--:--',
    London: '--:--',
  });

  React.useEffect(() => {
    const updateTimes = () => {
      const getCityTime = (timeZone: string) => {
        try {
          return new Intl.DateTimeFormat('en-GB', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(new Date());
        } catch {
          return '--:--';
        }
      };

      setTimes({
        Paris: getCityTime('Europe/Paris'),
        Kyoto: getCityTime('Asia/Tokyo'),
        NewYork: getCityTime('America/New_York'),
        London: getCityTime('Europe/London'),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* ── CINEMATIC HERO SECTION ─────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between pt-8 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full overflow-hidden"
        aria-label="Atelier Hero Manifesto"
      >
        {/* Subtle Ambient SVG Background Gradient Mesh */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[var(--dp-gold,#c5a059)] via-[#9c7728] to-transparent blur-[140px]" />
        </div>

        {/* Top Eyebrow / Live Salon Clocks */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--dp-rule,rgba(197,160,89,0.2))] pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--dp-gold,#c5a059)] animate-pulse" />
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-muted-foreground font-medium">
              Private Creative Maison • Est. 2014
            </span>
          </div>

          {/* Salon Time Indicator Strip */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[var(--dp-gold,#c5a059)]" />
              <span>PAR {times.Paris}</span>
            </span>
            <span>•</span>
            <span>KYO {times.Kyoto}</span>
            <span>•</span>
            <span>NYC {times.NewYork}</span>
            <span>•</span>
            <span>LON {times.London}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle with Clip-Path Reveal */}
        <div className="my-auto py-12 sm:py-16 space-y-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--dp-gold,#c5a059)]/30 bg-[var(--dp-gold,#c5a059)]/10 text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
              <Sparkles size={13} />
              <span>Digital Architecture & Spatial Scenography</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-foreground font-normal leading-[1.05]">
              Sculpting Time, <br className="hidden sm:inline" />
              Silence <span className="font-serif italic text-[var(--dp-gold,#c5a059)]">&</span> Tactile Majesty.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed"
          >
            An independent international maison devoted to haute digital architecture, spatial scenography, and the art of deliberate restraint. We build digital cathedrals for discerning global patrons.
          </motion.p>

          {/* Magnetic Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <MagneticButton strength={0.3}>
              <Link
                href="/luxury/works"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-95 shadow-lg transition-all"
              >
                <span>Explore Selected Metiers</span>
                <ArrowRight size={14} />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Link
                href="/luxury/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border hover:border-[var(--dp-gold,#c5a059)] px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-foreground hover:text-[var(--dp-gold,#c5a059)] transition-colors backdrop-blur-sm"
              >
                <span>Request Private Audience</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom Hero Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[var(--dp-rule,rgba(197,160,89,0.2))] text-xs text-muted-foreground font-sans">
          <div>
            <span className="block text-[10px] tracking-widest uppercase text-[var(--dp-gold,#c5a059)]">Discipline</span>
            <span className="font-medium text-foreground">Spatial & Digital Architecture</span>
          </div>
          <div>
            <span className="block text-[10px] tracking-widest uppercase text-[var(--dp-gold,#c5a059)]">Aesthetics</span>
            <span className="font-medium text-foreground">Tactile Restraint & Noble Light</span>
          </div>
          <div>
            <span className="block text-[10px] tracking-widest uppercase text-[var(--dp-gold,#c5a059)]">Global Footprint</span>
            <span className="font-medium text-foreground">Paris • Kyoto • New York • London</span>
          </div>
          <div>
            <span className="block text-[10px] tracking-widest uppercase text-[var(--dp-gold,#c5a059)]">Standards</span>
            <span className="font-medium text-foreground">WCAG 2.2 AA • 60 FPS Fluidity</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ─────────────────────────────────────────── */}
      <MarqueeTicker items={TICKER_ITEMS} speedSeconds={30} />

      {/* ── EDITORIAL MANIFESTO SECTION ────────────────────────────── */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            The Manifesto of Restraint
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-foreground font-normal">
            Silence is the Height of Architecture
          </h2>
        </div>

        <div className="relative p-8 sm:p-14 rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.2))] shadow-sm space-y-6 text-foreground/80 font-sans leading-relaxed text-base sm:text-lg">
          <p className="first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:text-[var(--dp-gold,#c5a059)] first-letter:float-left first-letter:mr-4 first-letter:leading-none">
            In an era overwhelmed by algorithmic agitation and ephemeral noise, our atelier operates on an ancient conviction: true majesty commands quiet. We treat digital space with the acoustic reverence of a cloister, where every letterform, material texture, and shadow is tuned with mathematical restraint.
          </p>

          <blockquote className="my-8 pl-6 border-l-2 border-[var(--dp-gold,#c5a059)] font-serif italic text-xl sm:text-2xl text-foreground">
            &ldquo;Luxury is never the addition of ornament; it is the courage to let the void speak with absolute clarity.&rdquo;
          </blockquote>

          <p>
            From our founding atelier overlooking the jewelers of Place Vendôme to our timber pavilion in Kyoto, we craft bespoke digital flagships, 3D complication explorers, and archival monographs for patrons who view their heritage through the lens of centuries, not quarters.
          </p>

          <div className="pt-4 flex items-center justify-between border-t border-border text-xs text-muted-foreground font-sans">
            <span>Éléonore de Véricourt — Founding Creative Director</span>
            <span className="text-[var(--dp-gold,#c5a059)]">Paris, Autumn 2026</span>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE 3D WEBGL CELESTIAL HOROLOGY ────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-8" aria-label="Live 3D WebGL Complication">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
              Real-Time WebGL Scenography
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif text-foreground">
              Celestial Complication No. VIII
            </h2>
          </div>

          <Link
            href="/luxury/lab"
            className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] hover:underline"
          >
            <span>Explore All Experimental Instruments in The Lab →</span>
          </Link>
        </div>

        <ThreeDComplicationViewer />
      </section>

      {/* ── PARALLAX FEATURED COMMISSION SHOWCASE ───────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
              Flagship Provenance
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-foreground">
              Haute Scenography in Focus
            </h2>
          </div>

          <Link
            href="/luxury/works"
            className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] hover:underline"
          >
            <span>View All Commissions ({LUXURY_PROJECTS.length})</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Featured Case Study Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.2))] overflow-hidden shadow-xl">
          <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-muted">
            <Image
              src={LUXURY_PROJECTS[0].coverImage}
              alt={LUXURY_PROJECTS[0].imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[var(--dp-gold,#c5a059)]/40 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
                {LUXURY_PROJECTS[0].disciplineLabel}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">
                {LUXURY_PROJECTS[0].salonLocation} • {LUXURY_PROJECTS[0].year}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
                {LUXURY_PROJECTS[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                {LUXURY_PROJECTS[0].subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">
              {LUXURY_PROJECTS[0].scenography}
            </p>

            <div className="space-y-2 pt-2 border-t border-border">
              <span className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                Technical Metiers
              </span>
              <p className="text-xs text-[var(--dp-gold,#c5a059)] font-sans">
                {LUXURY_PROJECTS[0].technicalCraft}
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/luxury/works"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--dp-gold,#c5a059)] hover:underline"
              >
                <span>Examine Technical Case Study</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLL SHOWCASE ─────────────────────────────── */}
      <HorizontalShowcase />

      {/* ── ANIMATED METRIC COUNTERS SECTION ───────────────────────── */}
      <section
        className="py-16 sm:py-24 border-y border-[var(--dp-rule,rgba(197,160,89,0.2))] bg-card/40"
        aria-label="Atelier Heritage Laurels"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center">
            {LUXURY_METRICS.map((metric, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-foreground flex items-center justify-center">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    durationSeconds={2.4}
                    decimals={metric.value % 1 !== 0 ? 1 : 0}
                  />
                </div>
                <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
                  {metric.label}
                </h3>
                <p className="text-xs text-muted-foreground font-sans max-w-[200px] mx-auto leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL SALONS OVERVIEW ─────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            International Quarters
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
            Four Salons, One Timeless Vision
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
            Private consultation spaces designed for confidential commissions, tactile material reviews, and bespoke vernissages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LUXURY_SALONS.map((salon) => (
            <div
              key={salon.id}
              className="group rounded-xl bg-card border border-border overflow-hidden hover:border-[var(--dp-gold,#c5a059)]/50 transition-all duration-300 shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={salon.heroImage}
                  alt={salon.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-sans">
                  <span className="font-serif text-base">{salon.city}</span>
                  <span className="text-[10px] tracking-wider uppercase text-[var(--dp-gold,#c5a059)]">
                    {salon.district}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {salon.description}
                </p>
                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground font-mono">{salon.curator}</span>
                  <Link
                    href="/luxury/contact"
                    className="text-[var(--dp-gold,#c5a059)] hover:underline flex items-center gap-1"
                  >
                    Audience →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE BESPOKE SCOPE ESTIMATOR ────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <CommissionEstimator />
      </section>

      {/* ── CLOSING PRIVATE VERNISSAGE CTA ──────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-4xl mx-auto w-full text-center space-y-8">
        <div className="inline-flex p-3 rounded-full bg-[var(--dp-gold,#c5a059)]/10 text-[var(--dp-gold,#c5a059)] border border-[var(--dp-gold,#c5a059)]/30">
          <Award size={24} />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
            Confidential Commissions
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-foreground font-normal">
            Begin Your Maison&apos;s Next Chapter
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
            Our Curatorial Board accepts a limited allocation of fourteen bespoke commissions annually to ensure uncompromising artisanal fidelity.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton strength={0.35}>
            <Link
              href="/luxury/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-9 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-95 shadow-xl transition-all"
            >
              <span>Transmit Confidential Brief</span>
              <ArrowRight size={14} />
            </Link>
          </MagneticButton>

          <Link
            href="/luxury/about"
            className="inline-flex items-center gap-2 rounded-full border border-border hover:border-foreground/40 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-foreground transition-colors"
          >
            <span>Explore Atelier Heritage</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
