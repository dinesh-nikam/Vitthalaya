'use client';

import * as React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Web Audio Ambient Soundscape Generator
 * Synthesizes an organic, harmonic warm drone (432Hz Pythagorean fifths)
 * with zero external mp3 files. Pure client-side Web Audio API.
 */
export function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);
  const oscillatorsRef = React.useRef<OscillatorNode[]>([]);

  const startSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Gentle 1.5s fade in
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low pass filter for warm, velvet tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);
      filter.connect(masterGain);

      // Frequencies: 108Hz (Root), 162Hz (Fifth), 216Hz (Octave), 324Hz (Compound Fifth)
      const freqs = [108, 162, 216, 324];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch {
      // AudioContext unavailable or restricted
      setIsPlaying(false);
    }
  };

  const stopSoundscape = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      // Gentle fade out
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        oscillatorsRef.current = [];
        setIsPlaying(false);
      }, 850);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  React.useEffect(() => {
    return () => {
      // Cleanup on unmount
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className="group relative flex items-center gap-2.5 rounded-full border border-[var(--dp-rule,rgba(197,160,89,0.25))] bg-background/60 px-3.5 py-1.5 text-xs text-foreground/80 hover:text-[var(--dp-gold,#c5a059)] hover:border-[var(--dp-gold,#c5a059)] backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
      aria-label={isPlaying ? 'Mute ambient atelier soundscape' : 'Enable ambient atelier soundscape (432Hz harmonized)'}
      title={isPlaying ? 'Silence soundscape' : 'Harmonize ambient soundscape (432Hz)'}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} className="text-[var(--dp-gold,#c5a059)]" aria-hidden="true" />
          <span className="hidden sm:inline font-sans tracking-wider text-[11px] uppercase">
            Soundscape On
          </span>
          <span className="flex items-center gap-0.5 h-2.5 ml-0.5" aria-hidden="true">
            <span className="w-[1.5px] h-full bg-[var(--dp-gold,#c5a059)] animate-pulse" />
            <span className="w-[1.5px] h-2/3 bg-[var(--dp-gold,#c5a059)] animate-pulse delay-75" />
            <span className="w-[1.5px] h-4/5 bg-[var(--dp-gold,#c5a059)] animate-pulse delay-150" />
          </span>
        </>
      ) : (
        <>
          <VolumeX size={13} className="opacity-60 group-hover:opacity-100" aria-hidden="true" />
          <span className="hidden sm:inline font-sans tracking-wider text-[11px] uppercase opacity-75 group-hover:opacity-100">
            Soundscape
          </span>
        </>
      )}
    </button>
  );
}
