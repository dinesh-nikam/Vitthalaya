'use client';

import * as React from 'react';

interface MarqueeTickerProps {
  items: string[];
  speedSeconds?: number;
  direction?: 'left' | 'right';
  className?: string;
}

/**
 * Infinite Editorial Marquee Ticker
 * Seamless loop ticker with subtle gold separators, pause on hover,
 * and native CSS animation that honors prefers-reduced-motion.
 */
export function MarqueeTicker({
  items,
  speedSeconds = 35,
  direction = 'left',
  className = '',
}: MarqueeTickerProps) {
  // Duplicate for seamless infinite loop
  const content = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-[var(--dp-rule,rgba(197,160,89,0.18))] bg-[var(--dp-ground-well,rgba(20,20,22,0.6))] py-4 select-none ${className}`}
      aria-label="Atelier Disciplines Ticker"
    >
      <div
        className="flex w-max items-center gap-8 hover:[animation-play-state:paused]"
        style={{
          animation: `luxury-marquee ${speedSeconds}s linear infinite ${direction === 'right' ? 'reverse' : 'normal'}`,
        }}
      >
        {content.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8 shrink-0">
            <span className="font-serif text-sm tracking-[0.25em] uppercase text-foreground/80 hover:text-[var(--dp-gold,#c5a059)] transition-colors">
              {item}
            </span>
            <span
              className="text-xs text-[var(--dp-gold,#c5a059)] opacity-60"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes luxury-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .flex {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
