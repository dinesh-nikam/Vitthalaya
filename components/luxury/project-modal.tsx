'use client';

import * as React from 'react';
import Image from 'next/image';
import { X, Sparkles, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { LuxuryProject } from '@/src/data/luxury-data';

interface ProjectModalProps {
  project: LuxuryProject;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.3))] text-card-foreground shadow-2xl p-6 sm:p-10 space-y-8 animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 right-6 p-2 rounded-full border border-border hover:border-[var(--dp-gold,#c5a059)] text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
          aria-label="Close Case Study"
        >
          <X size={18} />
        </button>

        {/* Header Metadata */}
        <div className="space-y-3 pr-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[var(--dp-gold,#c5a059)]/15 border border-[var(--dp-gold,#c5a059)]/40 text-xs font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
              {project.disciplineLabel}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans">
              <MapPin size={12} /> {project.salonLocation}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans">
              <Calendar size={12} /> {project.year}
            </span>
          </div>

          <h2 id="modal-title" className="text-3xl sm:text-4xl font-serif text-foreground">
            {project.title}
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-border">
          <Image
            src={project.coverImage}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-border">
          <div className="space-y-2">
            <h3 className="text-xs font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
              Client Sector
            </h3>
            <p className="text-sm font-sans text-foreground/90">{project.clientSector}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
              Material Palette
            </h3>
            <div className="flex items-center gap-2">
              {project.palette.map((color, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span
                    className="w-4 h-4 rounded-full border border-black/30 shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] text-muted-foreground font-mono">{color}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-sans tracking-widest uppercase text-[var(--dp-gold,#c5a059)] font-semibold">
              Photographic Provenance
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              {project.photographer} (Unsplash Commercial License)
            </p>
          </div>
        </div>

        {/* Narrative Sections */}
        <div className="space-y-6 pt-4 border-t border-border">
          <div className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-foreground flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--dp-gold,#c5a059)]" /> The Patron Brief
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed font-sans">{project.brief}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-foreground">
              Spatial Scenography & Atmospheric Design
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed font-sans">{project.scenography}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-foreground">
              Technical Metiers & Craftsmanship
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed font-sans">{project.technicalCraft}</p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--dp-gold,#c5a059)]/10 border border-[var(--dp-gold,#c5a059)]/30 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[var(--dp-gold,#c5a059)] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-sans uppercase tracking-widest text-[var(--dp-gold,#c5a059)] font-semibold">
                Curatorial Result & Laurels
              </h4>
              <p className="text-xs sm:text-sm text-foreground/90 mt-1 leading-relaxed">
                {project.metricsResult}
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Gallery Images */}
        {project.galleryImages.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
              Additional Scenographic Perspectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.galleryImages.map((imgUrl, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
                  <Image
                    src={imgUrl}
                    alt={`${project.title} detailed angle ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 420px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer CTA */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            Bespoke commissions handled strictly under confidential covenants.
          </span>
          <a
            href="/luxury/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--dp-gold,#c5a059)] px-6 py-2.5 text-xs font-medium tracking-[0.18em] uppercase text-black hover:opacity-90 transition-opacity"
          >
            Inquire About Similar Commission
          </a>
        </div>
      </div>
    </div>
  );
}
