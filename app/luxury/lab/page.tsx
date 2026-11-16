'use client';

import * as React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ThreeDComplicationViewer } from '@/components/luxury/3d-complication-viewer';
import { SensorialMaterialLab } from '@/components/luxury/sensorial-material-lab';
import { CuratorialDiagnostic } from '@/components/luxury/curatorial-diagnostic';
import { TypographicSpecimen } from '@/components/luxury/typographic-specimen';

export default function LuxuryLabPage() {
  return (
    <div className="flex flex-col w-full py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header Introduction */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--dp-gold,#c5a059)]/10 text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold border border-[var(--dp-gold,#c5a059)]/30">
          <Sparkles size={12} />
          <span>Experimental Metiers & Interactive Instruments</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif text-foreground font-normal tracking-tight">
          L’Atelier Sensorial Lab
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
          Four out-of-the-box digital instruments merging real-time WebGL horology, physical acoustic resonance, bespoke curatorial diagnostics, and kinetic typography.
        </p>
      </div>

      {/* 1. 3D WebGL Complication Explorer */}
      <section className="space-y-6" aria-label="3D Celestial Tourbillon Simulator">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-2xl font-serif text-foreground">
            01. Interactive 3D WebGL Horology
          </h2>
          <span className="text-xs font-mono text-[var(--dp-gold,#c5a059)]">Three.js Engine</span>
        </div>
        <ThreeDComplicationViewer />
      </section>

      {/* 2. Sensorial Material Alchemy Lab */}
      <section className="space-y-6" aria-label="Sensorial Noble Materials Lab">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-2xl font-serif text-foreground">
            02. Sensorial Material Alchemy
          </h2>
          <span className="text-xs font-mono text-[var(--dp-gold,#c5a059)]">Acoustic Web Audio</span>
        </div>
        <SensorialMaterialLab />
      </section>

      {/* 3. Curatorial Diagnostic Instrument */}
      <section className="space-y-6" aria-label="Curatorial Persona Diagnostic">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-2xl font-serif text-foreground">
            03. Curatorial Diagnostic Concierge
          </h2>
          <span className="text-xs font-mono text-[var(--dp-gold,#c5a059)]">Bespoke Blueprint</span>
        </div>
        <CuratorialDiagnostic />
      </section>

      {/* 4. Typographic Specimen & Monogram Carver */}
      <section className="space-y-6" aria-label="Kinetic Typefoundry and Monogram Weaver">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-2xl font-serif text-foreground">
            04. Kinetic Typefoundry & Monogram Weaver
          </h2>
          <span className="text-xs font-mono text-[var(--dp-gold,#c5a059)]">SVG Synthesis</span>
        </div>
        <TypographicSpecimen />
      </section>

      {/* Bottom Closing CTA */}
      <div className="p-8 sm:p-12 rounded-2xl bg-card border border-[var(--dp-gold,#c5a059)]/30 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
          Ready to Inscribe Your Commission?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
          The instruments in this lab represent our commitment to pushing the frontiers of digital craftsmanship while maintaining acoustic silence and restraint.
        </p>
        <Link
          href="/luxury/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-95 transition-opacity"
        >
          <span>Schedule Private Audience</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
