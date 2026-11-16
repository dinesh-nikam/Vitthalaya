'use client';

import * as React from 'react';
import { Type, Download, Check } from 'lucide-react';

export function TypographicSpecimen() {
  const [sampleText, setSampleText] = React.useState('ATELIER VÉRICOURT');
  const [trackingEm, setTrackingEm] = React.useState(0.18);
  const [fontSizePx, setFontSizePx] = React.useState(42);
  const [fontStyleWeight, setFontStyleWeight] = React.useState<'normal' | 'italic'>('normal');

  // Monogram state
  const [initials, setInitials] = React.useState('AV');
  const [hasDownloaded, setHasDownloaded] = React.useState(false);

  const cleanInitials = initials.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'AV';

  const handleDownloadSvg = () => {
    const svgElement = document.getElementById('monogram-svg-preview');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `monogram-${cleanInitials.toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setHasDownloaded(true);
    setTimeout(() => setHasDownloaded(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.25))] p-6 sm:p-10 shadow-xl space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--dp-gold,#c5a059)]/10 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold border border-[var(--dp-gold,#c5a059)]/30">
            <Type size={12} />
            <span>Kinetic Typefoundry Lab</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
            Bespoke Typeface & Monogram Weaver
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Calibrate letter-spacing and optical tracking for Véricourt Didot-Lapidary, or synthesize a geometric monogram crest.
          </p>
        </div>
      </div>

      {/* Part 1: Typeface Specimen Tester */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-xl bg-background/50 border border-border">
          {/* Text Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-sans tracking-widest uppercase text-muted-foreground font-semibold">
              Live Inscription Input
            </label>
            <input
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Enter maison or patron name..."
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-sans text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
            />
          </div>

          {/* Tracking Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-sans text-muted-foreground font-semibold uppercase">
              <span>Tracking / Letter-Spacing</span>
              <span className="font-mono text-[var(--dp-gold,#c5a059)]">{trackingEm.toFixed(2)}em</span>
            </div>
            <input
              type="range"
              min="-0.02"
              max="0.38"
              step="0.01"
              value={trackingEm}
              onChange={(e) => setTrackingEm(Number(e.target.value))}
              className="w-full accent-[var(--dp-gold,#c5a059)] cursor-pointer mt-2"
              aria-label="Tracking slider"
            />
          </div>

          {/* Size & Style Controls */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-sans text-muted-foreground font-semibold uppercase">
              <span>Optical Display Size</span>
              <span className="font-mono text-[var(--dp-gold,#c5a059)]">{fontSizePx}px</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="range"
                min="24"
                max="72"
                value={fontSizePx}
                onChange={(e) => setFontSizePx(Number(e.target.value))}
                className="flex-1 accent-[var(--dp-gold,#c5a059)] cursor-pointer"
                aria-label="Font size slider"
              />
              <button
                onClick={() => setFontStyleWeight(fontStyleWeight === 'normal' ? 'italic' : 'normal')}
                type="button"
                className={`px-3 py-1 rounded border text-[11px] font-serif transition-colors ${
                  fontStyleWeight === 'italic'
                    ? 'border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/10 text-[var(--dp-gold,#c5a059)]'
                    : 'border-border text-muted-foreground'
                }`}
              >
                Italic
              </button>
            </div>
          </div>
        </div>

        {/* Live Typographic Canvas */}
        <div className="min-h-[160px] rounded-2xl bg-background/80 border border-border p-8 sm:p-12 flex items-center justify-center text-center overflow-hidden">
          <p
            className={`font-serif text-foreground break-words transition-all duration-200 ${
              fontStyleWeight === 'italic' ? 'italic' : ''
            }`}
            style={{
              fontSize: `${fontSizePx}px`,
              letterSpacing: `${trackingEm}em`,
              lineHeight: 1.2,
            }}
          >
            {sampleText || 'ATELIER VÉRICOURT'}
          </p>
        </div>
      </div>

      {/* Part 2: Geometric Monogram Weaver */}
      <div className="pt-8 border-t border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xl sm:text-2xl font-serif text-foreground">
              Harmonic Monogram Weaver
            </h4>
            <p className="text-xs text-muted-foreground font-sans">
              Intertwining Roman initials inside concentric golden-ratio rings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-sans">Initials:</span>
              <input
                type="text"
                maxLength={3}
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                className="w-16 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-center text-xs font-mono uppercase text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
              />
            </div>

            <button
              onClick={handleDownloadSvg}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--dp-gold,#c5a059)] text-black text-xs font-semibold tracking-wider uppercase hover:opacity-95 transition-opacity"
            >
              {hasDownloaded ? (
                <>
                  <Check size={13} />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download size={13} />
                  <span>Export SVG</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Monogram SVG Preview Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-card border border-border flex items-center justify-center">
          <svg
            id="monogram-svg-preview"
            viewBox="0 0 200 200"
            className="w-44 h-44 sm:w-56 sm:h-56 text-[var(--dp-gold,#c5a059)] drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Concentric Circles */}
            <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
            <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="1" opacity="0.5" />

            {/* Sacred Geometry Rays */}
            <line x1="100" y1="8" x2="100" y2="24" stroke="currentColor" strokeWidth="2" />
            <line x1="100" y1="176" x2="100" y2="192" stroke="currentColor" strokeWidth="2" />
            <line x1="8" y1="100" x2="24" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="176" y1="100" x2="192" y2="100" stroke="currentColor" strokeWidth="2" />

            {/* Golden Ratio Small Accent Diamonds */}
            <rect x="97" y="16" width="6" height="6" transform="rotate(45 100 19)" fill="currentColor" />
            <rect x="97" y="178" width="6" height="6" transform="rotate(45 100 181)" fill="currentColor" />
            <rect x="16" y="97" width="6" height="6" transform="rotate(45 19 100)" fill="currentColor" />
            <rect x="178" y="97" width="6" height="6" transform="rotate(45 181 100)" fill="currentColor" />

            {/* Central Monogram Glyphs */}
            <text
              x="100"
              y="114"
              textAnchor="middle"
              fontFamily="Playfair Display, Didot, Georgia, serif"
              fontSize={cleanInitials.length === 3 ? "52" : "64"}
              fontWeight="300"
              letterSpacing="0.08em"
              fill="currentColor"
            >
              {cleanInitials}
            </text>

            {/* Subtitle Archival Stamp */}
            <text
              x="100"
              y="148"
              textAnchor="middle"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="8"
              letterSpacing="0.3em"
              fill="currentColor"
              opacity="0.65"
            >
              VERICOURT
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
