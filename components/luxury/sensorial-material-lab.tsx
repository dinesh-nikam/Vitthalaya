'use client';

import * as React from 'react';
import { Volume2, Sparkles, Sun } from 'lucide-react';
import { LUXURY_NOBLE_MATERIALS, LuxuryNobleMaterial } from '@/src/data/luxury-data';

export function SensorialMaterialLab() {
  const [selectedMaterial, setSelectedMaterial] = React.useState<LuxuryNobleMaterial>(LUXURY_NOBLE_MATERIALS[0]);
  const [lightAngleDeg, setLightAngleDeg] = React.useState(45);
  const [isAudioActive, setIsAudioActive] = React.useState(true);
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  // Play synthesized physical acoustic timbre tailored to material density
  const playMaterialAcoustic = (freq: number, category: string) => {
    if (!isAudioActive) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Set oscillator waveform based on category
      if (category === 'Stone') {
        osc.type = 'triangle';
      } else if (category === 'Precious Metal') {
        osc.type = 'sine';
      } else if (category === 'Timber') {
        osc.type = 'sawtooth';
      } else if (category === 'Paper & Silk') {
        osc.type = 'triangle';
      } else {
        osc.type = 'sine';
      }

      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low pass filter for natural acoustic resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 1.8, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      // Decay time based on density (metals ring longer, timber decays quickly)
      const decaySec = category === 'Precious Metal' || category === 'Crystal' ? 0.9 : 0.35;
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decaySec);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + decaySec + 0.05);
    } catch {
      // AudioContext unavailable
    }
  };

  const handleSelectMaterial = (mat: LuxuryNobleMaterial) => {
    setSelectedMaterial(mat);
    playMaterialAcoustic(mat.acousticFrequency, mat.category);
  };

  // Compute specular highlight gradient based on light angle
  const rad = (lightAngleDeg * Math.PI) / 180;
  const lightX = Math.round(50 + 40 * Math.cos(rad));
  const lightY = Math.round(50 - 40 * Math.sin(rad));

  return (
    <div className="w-full rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.25))] p-6 sm:p-10 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--dp-gold,#c5a059)]/10 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-semibold border border-[var(--dp-gold,#c5a059)]/30">
            <Sparkles size={12} />
            <span>Interactive Material Alchemy Lab</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
            Tactile & Acoustic Material Explorer
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Shift the raking light angle to examine surface specular reflection and listen to molecular acoustic resonance.
          </p>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={() => setIsAudioActive(!isAudioActive)}
          type="button"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:text-foreground self-start transition-colors"
          aria-label={isAudioActive ? 'Mute material acoustic timbre' : 'Enable material acoustic timbre'}
        >
          <Volume2 size={13} className={isAudioActive ? 'text-[var(--dp-gold,#c5a059)]' : 'opacity-40'} />
          <span className="font-mono text-[11px]">{isAudioActive ? 'Acoustic Timbre: On' : 'Acoustic: Muted'}</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Material Selector Swatches */}
        <div className="lg:col-span-5 space-y-3">
          <label className="block text-xs font-sans tracking-widest uppercase text-muted-foreground font-semibold">
            Select Noble Material ({LUXURY_NOBLE_MATERIALS.length})
          </label>
          <div className="space-y-2">
            {LUXURY_NOBLE_MATERIALS.map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() => handleSelectMaterial(mat)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] ${
                  selectedMaterial.id === mat.id
                    ? 'border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/10 shadow-sm'
                    : 'border-border bg-background/50 hover:border-foreground/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full border border-black/30 shadow-inner shrink-0"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  <div>
                    <span className="font-serif text-sm text-foreground block font-medium">
                      {mat.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-sans">
                      {mat.category} • {mat.origin.split(',')[0]}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[var(--dp-gold,#c5a059)]">
                  {mat.acousticFrequency} Hz
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Physical Simulation & Specular Chamber */}
        <div className="lg:col-span-7 space-y-6">
          {/* Specular Light Canvas */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border p-8 flex flex-col justify-between shadow-inner transition-colors duration-500"
            style={{
              backgroundColor: selectedMaterial.colorHex,
              backgroundImage: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, ${selectedMaterial.reflectionCoeff * 0.95}) 0%, rgba(255, 255, 255, ${selectedMaterial.reflectionCoeff * 0.2}) 35%, transparent 70%), linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)`,
            }}
          >
            {/* Top Light Indicator */}
            <div className="flex items-center justify-between text-xs font-mono drop-shadow-md">
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20">
                Light Angle: {lightAngleDeg}°
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[var(--dp-gold,#c5a059)] border border-[var(--dp-gold,#c5a059)]/40 font-semibold">
                Reflectance: {Math.round(selectedMaterial.reflectionCoeff * 100)}%
              </span>
            </div>

            {/* Center Macro Inspection */}
            <div className="my-auto text-center space-y-1 drop-shadow-lg">
              <h4 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                {selectedMaterial.name}
              </h4>
              <p className="text-xs text-white/80 font-sans max-w-sm mx-auto">
                {selectedMaterial.textureDescription}
              </p>
            </div>

            {/* Bottom Origin */}
            <div className="flex items-center justify-between text-[11px] text-white/90 drop-shadow">
              <span>{selectedMaterial.origin}</span>
              <span className="font-mono">Mohs: {selectedMaterial.mohsHardness}</span>
            </div>
          </div>

          {/* Raking Light Angle Slider */}
          <div className="space-y-2 p-4 rounded-xl bg-background/60 border border-border">
            <div className="flex items-center justify-between text-xs font-sans text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Sun size={14} className="text-[var(--dp-gold,#c5a059)]" />
                <span>Raking Light Vector</span>
              </span>
              <span className="font-mono">{lightAngleDeg}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={lightAngleDeg}
              onChange={(e) => setLightAngleDeg(Number(e.target.value))}
              className="w-full accent-[var(--dp-gold,#c5a059)] cursor-pointer"
              aria-label="Adjust virtual raking light angle"
            />
          </div>

          {/* Physical Specifications & Architectural Applications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-background/50 border border-border space-y-2">
              <span className="font-semibold text-foreground tracking-wider uppercase text-[10px] block">
                Physical Narrative
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {selectedMaterial.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-border space-y-2">
              <span className="font-semibold text-foreground tracking-wider uppercase text-[10px] block">
                Architectural Applications
              </span>
              <ul className="space-y-1 text-muted-foreground">
                {selectedMaterial.architecturalApplications.map((app, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-[var(--dp-gold,#c5a059)]">•</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
