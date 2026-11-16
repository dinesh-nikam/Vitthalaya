import type { Metadata } from 'next';
import { ScrollProgressBar } from '@/components/luxury/scroll-progress-bar';
import { CustomCursor } from '@/components/luxury/custom-cursor';
import { GrainOverlay } from '@/components/luxury/grain-overlay';
import { LuxuryNav } from '@/components/luxury/luxury-nav';
import { LuxuryFooter } from '@/components/luxury/luxury-footer';

export const metadata: Metadata = {
  title: 'Atelier Véricourt | Haute Conception & Scénographie Digitale',
  description:
    'Award-winning international creative maison sculpting digital architecture, spatial scenography, and high horology with the silence of deliberate restraint.',
  keywords:
    'luxury digital agency, haute horlogerie, spatial scenography, bespoke typography, Place Vendome, Paris, Kyoto, New York, London',
  openGraph: {
    title: 'Atelier Véricourt | Haute Conception & Scénographie Digitale',
    description:
      'Award-winning international creative maison sculpting digital architecture, spatial scenography, and high horology with the silence of deliberate restraint.',
    type: 'website',
    url: 'https://varkari.org/luxury',
  },
};

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-[var(--dp-gold,#c5a059)]/30 selection:text-foreground">
      {/* Editorial Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Spring Physics Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Subtle Analog Film Grain Texture */}
      <GrainOverlay />

      {/* Shrinking & Blurring Sticky Luxury Nav */}
      <LuxuryNav />

      {/* Main Luxury Route Canvas */}
      <div className="relative z-10 flex flex-col">
        {children}
      </div>

      {/* Editorial Luxury Footer */}
      <LuxuryFooter />
    </div>
  );
}
