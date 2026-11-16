'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { LUXURY_PROJECTS, LuxuryProject } from '@/src/data/luxury-data';
import { ProjectModal } from './project-modal';

export function HorizontalShowcase() {
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = React.useState<LuxuryProject | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 440;
    scrollContainerRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="relative w-full py-16 sm:py-24 overflow-hidden"
      aria-label="Curated Bespoke Commissions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-sans tracking-[0.28em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            Permanent Folio
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-foreground">
            Curated Commissions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-foreground/60 max-w-xl font-sans leading-relaxed">
            A continuous horizontal survey of spatial installations, digital haute complications, and archival print editions.
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => scroll('left')}
            type="button"
            className="p-3 rounded-full border border-[var(--dp-rule,rgba(197,160,89,0.25))] text-foreground/80 hover:text-[var(--dp-gold,#c5a059)] hover:border-[var(--dp-gold,#c5a059)] backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
            aria-label="Scroll curated commissions left"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            type="button"
            className="p-3 rounded-full border border-[var(--dp-rule,rgba(197,160,89,0.25))] text-foreground/80 hover:text-[var(--dp-gold,#c5a059)] hover:border-[var(--dp-gold,#c5a059)] backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
            aria-label="Scroll curated commissions right"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 sm:gap-8 overflow-x-auto px-4 sm:px-8 pb-8 pt-2 scroll-smooth no-scrollbar select-none"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {LUXURY_PROJECTS.map((project) => (
          <article
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
            tabIndex={0}
            role="button"
            data-cursor
            data-cursor-text="VIEW"
            style={{ scrollSnapAlign: 'start' }}
            className="group relative flex-none w-[320px] sm:w-[420px] cursor-pointer rounded-xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.18))] overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--dp-gold,#c5a059)]/60 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
            aria-label={`Inspect commission: ${project.title}, ${project.disciplineLabel}`}
          >
            {/* Image Container with Zoom Reveal */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={project.coverImage}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 640px) 320px, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Discipline Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[var(--dp-gold,#c5a059)]/40 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
                  {project.disciplineLabel}
                </span>
              </div>

              {/* Hover Prompt Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-2 rounded-full bg-[var(--dp-gold,#c5a059)] text-black">
                  <Eye size={14} />
                </div>
              </div>

              {/* Bottom Meta Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 font-sans">
                <span>{project.salonLocation}</span>
                <span className="tracking-widest">{project.year}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-serif font-medium text-card-foreground group-hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {project.subtitle}
              </p>

              {/* Palette Swatches & Result */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5" title="Material & Light Palette">
                  {project.palette.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-sans text-[var(--dp-gold,#c5a059)] tracking-wider uppercase group-hover:underline flex items-center gap-1">
                  View Study →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
