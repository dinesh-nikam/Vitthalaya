'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LUXURY_DISCIPLINES } from '@/src/data/luxury-data';
import { CommissionEstimator } from '@/components/luxury/commission-estimator';

const METHODOLOGY_STAGES = [
  {
    stage: '01',
    title: 'Immersion & Provenance Analysis',
    duration: 'Weeks 1 – 4',
    summary:
      'We enter the patron’s archives, studying founding documents, historical monograms, and spatial acoustics to extract the enduring DNA of the house.',
    deliverables: ['Archival Provenance Dossier', 'Sensorial Palette Matrix', 'Typographic Historical Study'],
  },
  {
    stage: '02',
    title: 'Architectural Scenography & Typefoundry',
    duration: 'Weeks 5 – 10',
    summary:
      'Carving proprietary letterforms, computing spatial lighting models, and engineering mathematical geometry grids that govern every surface.',
    deliverables: ['Custom Variable OpenType Foundry', '3D Scenographic Wireframes', 'Lighting Choreography Blueprint'],
  },
  {
    stage: '03',
    title: 'Master Fabrication & Micro-Physics',
    duration: 'Weeks 11 – 18',
    summary:
      'Executing WebGL raymarching shaders, spring-physics micro-interactions, or physical timber joinery and letterpress printing on mould-made paper.',
    deliverables: ['60 FPS WebGL Engine', 'Physical Material Mockups', 'Web Audio Acoustic Soundscape'],
  },
  {
    stage: '04',
    title: 'Precision Vernissage & Archival Custody',
    duration: 'Weeks 19 – 24',
    summary:
      'Rigorous WCAG 2.2 AA accessibility audit, penetration testing, and encrypted transfer of all perpetual intellectual property rights to the patron.',
    deliverables: ['Full Source Repository Handoff', 'Perpetual Commercial Deeds', 'Archival Monograph Box Set'],
  },
];

export default function LuxuryServicesPage() {
  return (
    <div className="flex flex-col w-full py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header Introduction */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
          Disciplines & Metiers
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-foreground font-normal tracking-tight">
          Haute Metiers of the Atelier
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
          Four distinct yet harmonious disciplines dedicated to elevating digital canvases, architectural spaces, and fine typography into permanent works of art.
        </p>
      </div>

      {/* The Four Core Metiers Grid */}
      <div className="space-y-16">
        {LUXURY_DISCIPLINES.map((metier, idx) => (
          <div
            key={metier.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-2xl bg-card border border-border shadow-sm ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Column */}
            <div className={`lg:col-span-6 relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-muted border border-border ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <Image
                src={metier.image}
                alt={metier.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[var(--dp-gold,#c5a059)]/40 text-[11px] font-mono tracking-widest text-[var(--dp-gold,#c5a059)]">
                  METIER {metier.number}
                </span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--dp-gold,#c5a059)] uppercase tracking-widest">
                  Discipline {metier.number}
                </span>
                <h2 className="text-3xl font-serif text-card-foreground">{metier.title}</h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans">
                  {metier.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-foreground/80 font-sans leading-relaxed">
                {metier.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                  Atelier Deliverables
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/90 font-sans">
                  {metier.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--dp-gold,#c5a059)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Material Palette */}
              <div className="pt-2 border-t border-border flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-muted-foreground font-sans uppercase tracking-wider">
                  Noble Materials:
                </span>
                {metier.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-muted text-[10px] font-sans text-muted-foreground border border-border"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* The Four-Stage Methodology */}
      <div className="space-y-12 pt-12 border-t border-border">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            Artisanal Rigor
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
            The Atelier Protocol
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
            Every commission advances through four structured vernissage stages to safeguard architectural excellence, security, and permanence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODOLOGY_STAGES.map((step) => (
            <div
              key={step.stage}
              className="p-6 rounded-xl bg-card border border-border space-y-4 hover:border-[var(--dp-gold,#c5a059)]/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-2xl font-serif text-[var(--dp-gold,#c5a059)]">
                  {step.stage}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {step.duration}
                </span>
              </div>

              <h3 className="font-serif text-lg text-foreground font-medium">
                {step.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                {step.summary}
              </p>

              <div className="pt-2 border-t border-border space-y-1.5">
                <span className="text-[10px] font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
                  Milestone
                </span>
                {step.deliverables.map((del, idx) => (
                  <p key={idx} className="text-[11px] text-foreground/80 font-sans">
                    • {del}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Estimator Instrument */}
      <div className="pt-8">
        <CommissionEstimator />
      </div>

      {/* Closing Callout */}
      <div className="p-8 sm:p-12 rounded-2xl bg-card border border-[var(--dp-gold,#c5a059)]/30 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
          Schedule an Atelier Consultation
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
          Private viewing appointments are arranged confidentially at our Paris, Kyoto, New York, or London salons.
        </p>
        <Link
          href="/luxury/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-95 transition-opacity"
        >
          <span>Connect with Concierge</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
