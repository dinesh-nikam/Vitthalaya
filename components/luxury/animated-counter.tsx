'use client';

import * as React from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  durationSeconds?: number;
  decimals?: number;
  className?: string;
}

/**
 * Animated Metric Counter
 * Gracefully increments when scrolled into view using an easing curve.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  durationSeconds = 2.2,
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (durationSeconds * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * value;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, durationSeconds]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}
