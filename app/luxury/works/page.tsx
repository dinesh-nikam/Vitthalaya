'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, Filter } from 'lucide-react';
import { LUXURY_PROJECTS, LuxuryProject } from '@/src/data/luxury-data';
import { ProjectModal } from '@/components/luxury/project-modal';

const FILTERS = [
  { id: 'all', label: 'All Commissions' },
  { id: 'horology', label: 'Haute Horlogerie' },
  { id: 'spatial', label: 'Spatial Scenography' },
  { id: 'jewellery', label: 'High Jewellery' },
  { id: 'digital', label: 'Digital Flagships' },
  { id: 'monograph', label: 'Bespoke Publishing' },
];

export default function LuxuryWorksPage() {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [selectedProject, setSelectedProject] = React.useState<LuxuryProject | null>(null);

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === 'all') return LUXURY_PROJECTS;
    return LUXURY_PROJECTS.filter((p) => p.discipline === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex flex-col w-full py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header Introduction */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
          The Permanent Archive
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-foreground font-normal tracking-tight">
          Selected Works & Commissions
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
          An ongoing chronicle of digital flagships, spatial architecture, high horology simulators, and archival monographs crafted across our global salons.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border no-scrollbar">
        <Filter size={14} className="text-[var(--dp-gold,#c5a059)] mr-2 shrink-0" aria-hidden="true" />
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-sans tracking-[0.16em] uppercase whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] ${
              activeFilter === f.id
                ? 'bg-[var(--dp-gold,#c5a059)] text-black font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
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
            className="group relative flex flex-col rounded-xl bg-card border border-border overflow-hidden hover:border-[var(--dp-gold,#c5a059)]/60 hover:shadow-xl transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
            aria-label={`Open case study for ${project.title}`}
          >
            {/* Visual Cover */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={project.coverImage}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[var(--dp-gold,#c5a059)]/40 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
                  {project.disciplineLabel}
                </span>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-2 rounded-full bg-[var(--dp-gold,#c5a059)] text-black">
                  <Eye size={14} />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-sans">
                <span>{project.salonLocation}</span>
                <span className="font-mono">{project.year}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-serif text-card-foreground group-hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5" title="Material Palette">
                  {project.palette.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <span className="text-xs font-sans text-[var(--dp-gold,#c5a059)] tracking-wider uppercase group-hover:underline flex items-center gap-1">
                  Examine Study →
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

      {/* Bottom Commission Inquiry Banner */}
      <div className="rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.3))] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl font-serif text-foreground">
            Commission a Dedicated Atelier Study
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
            All commissions undergo bespoke material research, custom typefoundry development, and end-to-end encrypted delivery.
          </p>
        </div>

        <Link
          href="/luxury/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-95 transition-opacity shrink-0"
        >
          <span>Request Private Briefing</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
