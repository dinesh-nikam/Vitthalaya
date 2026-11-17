'use client';

import * as React from 'react';
import Image from 'next/image';
import { getSaintSeal } from '@/src/lib/saint-metadata';

interface SaintCardVisualProps {
  slug: string;
  nameMarathi: string;
  nameTranslit?: string;
  period?: string | null;
  region?: string | null;
}

export function SaintCardVisual({
  slug,
  nameMarathi,
  period,
  region,
}: SaintCardVisualProps) {
  const seal = getSaintSeal(slug, nameMarathi);

  // If a verified authentic photographic portrait exists, render it with editorial reverence
  if (seal.authenticPortrait) {
    return (
      <div className="relative aspect-[16/10] bg-[var(--dp-ground-well)] overflow-hidden border-b border-[var(--dp-rule)] dp-shimmer-container">
        <Image
          src={seal.authenticPortrait}
          alt={nameMarathi}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Subtle authentic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)]/90 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic golden halo on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(246,188,85,0.25) 0%, transparent 70%)' }}
        />

        {/* Rotating Sacred Aureole / तेजोवलय on hover */}
        <div
          className="absolute -top-10 -right-10 w-44 h-44 opacity-0 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none dp-halo-spin"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(246,188,85,0.5) 90deg, transparent 180deg, rgba(255,111,30,0.4) 270deg, transparent 360deg)',
            borderRadius: '50%',
          }}
          aria-hidden="true"
        />

        {/* Mudra watermark badge with subtle elevation */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-marathi z-10">
          <span className="px-2 py-0.5 rounded bg-[var(--dp-ground-well)]/90 text-[var(--dp-gold)] border border-[var(--dp-rule)] backdrop-blur-xs shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
            {seal.mudra}
          </span>
          <span className="text-[var(--dp-ink-dim)] font-mono text-[10px]">
            {period || 'वारकरी परंपरा'}
          </span>
        </div>
      </div>
    );
  }

  // Museum-Grade Sacred Devanagari Monogram & Seal for revered saints
  return (
    <div
      className={`relative aspect-[16/10] bg-gradient-to-br ${seal.accentBg} overflow-hidden border-b border-[var(--dp-rule)] flex flex-col justify-between p-4 select-none`}
      aria-label={`${nameMarathi} यांचे पवित्र बोधचिन्ह`}
    >
      {/* Background Sacred Geometric & Calligraphic Watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 250"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="200" cy="125" r="90" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="200" cy="125" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path
          d="M 200,35 Q 230,125 200,215 Q 170,125 200,35 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 110,125 Q 200,155 290,125 Q 200,95 110,125 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      {/* Top Bar: Tradition & Region */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-marathi text-[var(--dp-gold)]">
        <span className="tracking-wide">{seal.tradition}</span>
        {region && <span className="opacity-80">{region}</span>}
      </div>

      {/* Center: Majestic Devanagari Monogram Glyph */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="relative w-16 h-16 rounded-full border border-[var(--dp-rule-strong)] bg-[var(--dp-ground-well)]/70 backdrop-blur-xs flex items-center justify-center shadow-inner group-hover:border-[var(--dp-gold)] transition-colors">
          <span
            className="text-3xl font-bold text-[var(--dp-ink)] font-marathiHeading leading-none translate-y-0.5"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {seal.glyph}
          </span>
        </div>
      </div>

      {/* Bottom Bar: Signature Abhang Mudra */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-marathi pt-1 border-t border-[var(--dp-rule)]">
        <span className="font-semibold text-[var(--dp-gold)] tracking-wide">
          « {seal.mudra} »
        </span>
        <span className="text-[var(--dp-ink-dim)] text-[10px]">
          {period || 'भक्ती कालखंड'}
        </span>
      </div>
    </div>
  );
}
