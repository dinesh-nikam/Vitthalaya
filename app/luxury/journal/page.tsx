'use client';

import * as React from 'react';
import Image from 'next/image';
import { Clock, User, X } from 'lucide-react';
import { LUXURY_ESSAYS, LuxuryEssay } from '@/src/data/luxury-data';

const CATEGORIES = ['All', 'Aesthetics', 'Scenography', 'Typography', 'Horology'];

export default function LuxuryJournalPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [activeEssay, setActiveEssay] = React.useState<LuxuryEssay | null>(null);

  const filteredEssays = React.useMemo(() => {
    if (selectedCategory === 'All') return LUXURY_ESSAYS;
    return LUXURY_ESSAYS.filter((e) => e.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col w-full py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header Introduction */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
          Curatorial Literature & Monographs
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-foreground font-normal tracking-tight">
          The Journal of Restraint
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
          Essays, curatorial treatises, and technical monographs authored by our directors on the acoustic silence of space, proportional typography, and high horology scenography.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-border no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-sans tracking-[0.16em] uppercase whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] ${
              selectedCategory === cat
                ? 'bg-[var(--dp-gold,#c5a059)] text-black font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Essays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredEssays.map((essay) => (
          <article
            key={essay.id}
            onClick={() => setActiveEssay(essay)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveEssay(essay);
              }
            }}
            tabIndex={0}
            role="button"
            data-cursor
            data-cursor-text="READ"
            className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-[var(--dp-gold,#c5a059)]/50 hover:shadow-xl transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
            aria-label={`Read essay: ${essay.title}`}
          >
            {/* Visual Cover */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <Image
                src={essay.coverImage}
                alt={essay.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[var(--dp-gold,#c5a059)]/40 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
                  {essay.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-sans">
                <span className="flex items-center gap-1.5">
                  <User size={12} className="text-[var(--dp-gold,#c5a059)]" />
                  {essay.author}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock size={12} className="text-[var(--dp-gold,#c5a059)]" />
                  {essay.readTime}
                </span>
              </div>
            </div>

            {/* Details & Excerpt */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Published {essay.publishDate}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-card-foreground group-hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  {essay.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-sans">
                  {essay.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs italic font-serif text-foreground/70 line-clamp-1 max-w-[260px]">
                  &ldquo;{essay.pullQuote}&rdquo;
                </span>

                <span className="text-xs font-sans text-[var(--dp-gold,#c5a059)] tracking-wider uppercase group-hover:underline flex items-center gap-1 shrink-0">
                  Read Essay →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Essay Reading Drawer / Modal */}
      {activeEssay && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="essay-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveEssay(null);
          }}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.3))] text-card-foreground p-6 sm:p-12 space-y-8 animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setActiveEssay(null)}
              type="button"
              className="absolute top-6 right-6 p-2 rounded-full border border-border hover:border-[var(--dp-gold,#c5a059)] text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
              aria-label="Close Essay View"
            >
              <X size={18} />
            </button>

            {/* Essay Header */}
            <div className="space-y-4 pr-12">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans">
                <span className="px-3 py-1 rounded-full bg-[var(--dp-gold,#c5a059)]/15 border border-[var(--dp-gold,#c5a059)]/40 text-[10px] font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
                  {activeEssay.category}
                </span>
                <span>{activeEssay.readTime}</span>
                <span>•</span>
                <span>{activeEssay.publishDate}</span>
              </div>

              <h2 id="essay-title" className="text-3xl sm:text-4xl font-serif text-foreground">
                {activeEssay.title}
              </h2>
              <p className="text-base text-muted-foreground font-sans">
                {activeEssay.subtitle}
              </p>
              <div className="text-xs text-[var(--dp-gold,#c5a059)] font-sans">
                By {activeEssay.author}
              </div>
            </div>

            {/* Essay Cover Image */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-border">
              <Image
                src={activeEssay.coverImage}
                alt={activeEssay.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>

            {/* Pull Quote */}
            <blockquote className="p-6 rounded-xl bg-[var(--dp-gold,#c5a059)]/10 border-l-4 border-[var(--dp-gold,#c5a059)] font-serif italic text-lg text-foreground">
              &ldquo;{activeEssay.pullQuote}&rdquo;
            </blockquote>

            {/* Body Text with Refined Editorial Flow */}
            <div className="space-y-6 text-foreground/85 font-sans text-base leading-relaxed">
              {activeEssay.content.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-[var(--dp-gold,#c5a059)] first-letter:float-left first-letter:mr-3 first-letter:leading-none'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <div className="pt-8 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-sans">
              <span>Atelier Véricourt Editorial Monographs</span>
              <button
                onClick={() => setActiveEssay(null)}
                type="button"
                className="text-[var(--dp-gold,#c5a059)] hover:underline"
              >
                Return to Journal Archive ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
