'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Feather } from 'lucide-react';
import {
  LUXURY_SALONS,
  MASTER_CRAFTSMEN,
  LUXURY_TIMELINE,
} from '@/src/data/luxury-data';

export default function LuxuryAboutPage() {
  return (
    <div className="flex flex-col w-full py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header Introduction */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
          Maison Heritage & Provenance
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-foreground font-normal tracking-tight">
          The Philosophy of Deliberate Restraint
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
          Founded in Paris in 2014, Atelier Véricourt operates as an international guild of architects, typographers, and digital craftsmen dedicated to the enduring power of quietude.
        </p>
      </div>

      {/* Chronicle Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 text-foreground/80 font-sans leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl sm:text-3xl font-serif text-foreground">
            A Trans-Continental Dialogue
          </h2>
          <p>
            The atelier was born from a singular realization: modern software was developing at breakneck velocity, yet losing its soul to ephemeral trends, intrusive notifications, and visual clutter.
          </p>
          <p>
            Seeking an alternative to disposable digital design, our founders turned to the enduring principles of classical architecture: the golden ratios of Renaissance stone facades, the acoustic serenity of Japanese timber joinery, and the mathematical grace of 18th-century French typefoundries.
          </p>
          <p>
            Today, our work spans two hemispheres and four global salons. We remain deliberately small, accepting only fourteen bespoke commissions each year so that every line of code, shader calculation, and letterform is sculpted by a master craftsman.
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs text-muted-foreground font-sans">
            <span>• 100% Privately Owned</span>
            <span>• Zero Outside Capital</span>
            <span>• Archival Longevity Guarantee</span>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border bg-muted shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Atelier architectural sanctuary interior with warm daylight"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-[var(--dp-gold,#c5a059)]/30 text-white text-xs">
            <span className="text-[10px] tracking-widest uppercase text-[var(--dp-gold,#c5a059)] block">
              Architectural Standard
            </span>
            <span>Honed travertine, diffused natural light, and the acoustic calibration of space.</span>
          </div>
        </div>
      </div>

      {/* Master Craftsmen Roster */}
      <div className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            The Curatorial Board
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
            Master Craftsmen & Directors
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
            Leading disciplines across spatial architecture, mathematical WebGL physics, and archival type design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MASTER_CRAFTSMEN.map((craftsman) => (
            <div
              key={craftsman.id}
              className="group rounded-xl bg-card border border-border overflow-hidden hover:border-[var(--dp-gold,#c5a059)]/50 transition-all duration-300 shadow-sm"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <Image
                  src={craftsman.image}
                  alt={craftsman.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-sans">
                  <span className="font-serif text-base block">{craftsman.name}</span>
                  <span className="text-[10px] text-[var(--dp-gold,#c5a059)] tracking-wider uppercase">
                    {craftsman.location}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <span className="text-[11px] font-sans text-[var(--dp-gold,#c5a059)] block font-medium">
                  {craftsman.role}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {craftsman.bio}
                </p>
                <div className="pt-2 border-t border-border text-[10px] text-muted-foreground/80 font-mono">
                  {craftsman.heritage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Provenance Timeline */}
      <div className="space-y-12 pt-12 border-t border-border">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            Chronology of Laurels
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
            Provenance & Milestones
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 border-l border-[var(--dp-gold,#c5a059)]/40 space-y-12">
          {LUXURY_TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background bg-[var(--dp-gold,#c5a059)] group-hover:scale-125 transition-transform" />

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-[var(--dp-gold,#c5a059)] font-light">
                    {item.year}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {item.city}
                  </span>
                </div>
                <h3 className="text-lg font-serif text-foreground font-medium">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Restraint Charter */}
      <div className="p-8 sm:p-12 rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.3))] space-y-6">
        <div className="flex items-center gap-3">
          <Feather className="text-[var(--dp-gold,#c5a059)]" size={20} />
          <h3 className="text-2xl font-serif text-foreground">
            The Atelier Restraint Charter
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs font-sans text-muted-foreground leading-relaxed">
          <div className="space-y-2 border-l border-border pl-4">
            <h4 className="font-semibold text-foreground tracking-wider uppercase text-[11px]">
              01. Zero Algorithmic Intrusion
            </h4>
            <p>
              We incorporate no intrusive surveillance trackers, popup banners, or manipulative dark patterns. Every digital canvas respects the visitor’s autonomy.
            </p>
          </div>

          <div className="space-y-2 border-l border-border pl-4">
            <h4 className="font-semibold text-foreground tracking-wider uppercase text-[11px]">
              02. Carbon-Sequestered Servers
            </h4>
            <p>
              All client digital flagships operate on high-efficiency, 100% renewable or carbon-sequestered edge networks engineered for minimum wattage and sub-80ms global TTFB.
            </p>
          </div>

          <div className="space-y-2 border-l border-border pl-4">
            <h4 className="font-semibold text-foreground tracking-wider uppercase text-[11px]">
              03. Perpetual Source Sovereignty
            </h4>
            <p>
              Patrons receive unencumbered perpetual custody of all source code, 3D asset master files, and bespoke font licenses upon project vernissage.
            </p>
          </div>
        </div>
      </div>

      {/* Global Salons Directory Card */}
      <div className="pt-8">
        <div className="text-center space-y-3 pb-8">
          <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            Private Quarters
          </span>
          <h2 className="text-3xl font-serif text-foreground">
            Consultation Salons Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LUXURY_SALONS.map((salon) => (
            <div key={salon.id} className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-foreground font-medium">{salon.city}</h3>
                <span className="text-[10px] font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)]">
                  {salon.district}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{salon.address}</p>
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-mono">{salon.curator}</span>
                <Link
                  href="/luxury/contact"
                  className="text-[var(--dp-gold,#c5a059)] hover:underline"
                >
                  Inquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
