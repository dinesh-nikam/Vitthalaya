'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Copy, RefreshCw, Compass } from 'lucide-react';
import { CURATORIAL_ARCHETYPES, CuratorialArchetype } from '@/src/data/luxury-data';

interface QuestionStep {
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    archetypeId: keyof typeof CURATORIAL_ARCHETYPES;
  }[];
}

const DIAGNOSTIC_STEPS: QuestionStep[] = [
  {
    title: '01. Emotional Essence',
    subtitle: 'Which quality must anchor the visitor’s soul upon crossing the threshold?',
    options: [
      {
        id: 'quietude',
        label: 'Sacred Monumental Silence',
        description: 'Immovable stone masses, high acoustic absorption, and reverent quietude.',
        archetypeId: 'monumental_quietude',
      },
      {
        id: 'horology',
        label: 'Mathematical Precision & Mechanics',
        description: 'Sub-millimeter gear trains, rhodium anglage, and interactive WebGL physics.',
        archetypeId: 'mathematical_horology',
      },
      {
        id: 'organicism',
        label: 'Organic Harmony & Seasonal Flow',
        description: 'Smoked cedar joinery, translucent washi lanterns, and living materials.',
        archetypeId: 'sensorial_organicism',
      },
      {
        id: 'typography',
        label: 'Archival Provenance & Typographic Authority',
        description: 'Proprietary variable typefoundries, hot-stamped gold foil, and hardcover folios.',
        archetypeId: 'archival_sovereignty',
      },
    ],
  },
  {
    title: '02. Material Anchor',
    subtitle: 'Which noble tactile texture will command the central vitrine or canvas?',
    options: [
      {
        id: 'stone',
        label: 'Honed Roman Travertine & Fluted Alabaster',
        description: 'Sedimentary veins and matte silk surfaces capturing low raking sunlight.',
        archetypeId: 'monumental_quietude',
      },
      {
        id: 'metal',
        label: 'Mirror-Polished Rhodium & Blued Titanium',
        description: 'High-contrast metallic chamfers with zero optical distortion.',
        archetypeId: 'mathematical_horology',
      },
      {
        id: 'timber',
        label: 'Smoked Hinoki Cedar & Kurotani Mulberry Washi',
        description: 'Tight straight wood grains and deckle-edged handmade fibers.',
        archetypeId: 'sensorial_organicism',
      },
      {
        id: 'paper',
        label: 'Deckle-Edged Cotton Rag & 24k Ormolu Leaf',
        description: 'Archival museum papers bound in French book cloth.',
        archetypeId: 'archival_sovereignty',
      },
    ],
  },
];

export function CuratorialDiagnostic() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [selectedChoices, setSelectedChoices] = React.useState<string[]>([]);
  const [generatedArchetype, setGeneratedArchetype] = React.useState<CuratorialArchetype | null>(null);
  const [hasCopied, setHasCopied] = React.useState(false);

  const handleSelectOption = (archetypeId: string) => {
    const nextChoices = [...selectedChoices, archetypeId];
    setSelectedChoices(nextChoices);

    if (currentStepIndex < DIAGNOSTIC_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Determine dominant archetype
      const archetypeKey = (nextChoices[0] || 'monumental_quietude') as keyof typeof CURATORIAL_ARCHETYPES;
      setGeneratedArchetype(CURATORIAL_ARCHETYPES[archetypeKey] || CURATORIAL_ARCHETYPES.monumental_quietude);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedChoices([]);
    setGeneratedArchetype(null);
  };

  const handleCopyDossier = () => {
    if (!generatedArchetype) return;
    const text = `ATELIER VÉRICOURT — BESPOKE VERNISSAGE DOSSIER
Title: ${generatedArchetype.title}
Subtitle: ${generatedArchetype.subtitle}
Recommended Metier: ${generatedArchetype.recommendedMetier}
Host Salon: ${generatedArchetype.recommendedSalon}
Estimated Timeline: ~${generatedArchetype.projectedTimelineWeeks} weeks
Investment Horizon: ${generatedArchetype.investmentGuide}
Materials: ${generatedArchetype.materials.join(', ')}
Narrative: ${generatedArchetype.diagnosticNarrative}`;

    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleTransmitBrief = () => {
    if (!generatedArchetype) return;
    const params = new URLSearchParams({
      archetype: generatedArchetype.id,
      metier: generatedArchetype.recommendedMetier,
      salon: generatedArchetype.recommendedSalon.split(' ')[0].toLowerCase(),
    });
    router.push(`/luxury/contact?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.25))] p-6 sm:p-10 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--dp-gold,#c5a059)]/10 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold border border-[var(--dp-gold,#c5a059)]/30">
            <Compass size={12} />
            <span>Curatorial Diagnostic Instrument</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
            Bespoke Architectural Diagnostic
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Answer two foundational sensory prompts to generate a tailored Curatorial Dossier and feasibility blueprint.
          </p>
        </div>

        {generatedArchetype && (
          <button
            onClick={handleReset}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[var(--dp-gold,#c5a059)] self-start transition-colors"
          >
            <RefreshCw size={13} />
            <span>Re-evaluate Persona</span>
          </button>
        )}
      </div>

      {!generatedArchetype ? (
        /* Question Step Form */
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[var(--dp-gold,#c5a059)] tracking-widest uppercase">
              Step {currentStepIndex + 1} of {DIAGNOSTIC_STEPS.length}
            </span>
            <h4 className="text-xl sm:text-2xl font-serif text-foreground">
              {DIAGNOSTIC_STEPS[currentStepIndex].title}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans">
              {DIAGNOSTIC_STEPS[currentStepIndex].subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIAGNOSTIC_STEPS[currentStepIndex].options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.archetypeId)}
                type="button"
                className="p-5 rounded-xl border border-border bg-background/50 text-left hover:border-[var(--dp-gold,#c5a059)] hover:bg-[var(--dp-gold,#c5a059)]/5 transition-all duration-300 space-y-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-serif text-base text-foreground group-hover:text-[var(--dp-gold,#c5a059)] transition-colors">
                    {opt.label}
                  </h5>
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-[var(--dp-gold,#c5a059)] transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  {opt.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Generated Dossier View */
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
          <div className="p-8 rounded-2xl bg-background/90 border border-[var(--dp-gold,#c5a059)]/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--dp-gold,#c5a059)] block">
                  Curatorial Diagnostic Result
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif text-foreground">
                  {generatedArchetype.title}
                </h4>
                <p className="text-xs text-muted-foreground font-sans">
                  {generatedArchetype.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-1.5" title="Harmonized Material Palette">
                {generatedArchetype.palette.map((color, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-black/30 shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <blockquote className="p-4 rounded-xl bg-card border-l-2 border-[var(--dp-gold,#c5a059)] font-serif italic text-base text-foreground/90">
              &ldquo;{generatedArchetype.quote}&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">
              {generatedArchetype.diagnosticNarrative}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border text-xs font-sans">
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-muted-foreground">Primary Metier</span>
                <span className="font-medium text-foreground">{generatedArchetype.recommendedMetier}</span>
              </div>
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-muted-foreground">Host Salon</span>
                <span className="font-medium text-foreground">{generatedArchetype.recommendedSalon}</span>
              </div>
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-muted-foreground">Est. Timeline</span>
                <span className="font-medium text-foreground">~{generatedArchetype.projectedTimelineWeeks} weeks</span>
              </div>
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-muted-foreground">Investment Horizon</span>
                <span className="font-medium text-[var(--dp-gold,#c5a059)] font-mono">{generatedArchetype.investmentGuide}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleCopyDossier}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-xs text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {hasCopied ? (
                <>
                  <Check size={14} className="text-[var(--dp-gold,#c5a059)]" />
                  <span>Dossier Inscribed to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Curatorial Dossier</span>
                </>
              )}
            </button>

            <button
              onClick={handleTransmitBrief}
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--dp-gold,#c5a059)] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-95 transition-opacity"
            >
              <span>Transmit Dossier to Concierge</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
