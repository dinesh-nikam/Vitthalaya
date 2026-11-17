'use client';

import * as React from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Custom Luxury Cursor — Precision Spring Physics
 * Dual-ring smooth trailing cursor with magnetic reaction, text expanding,
 * touch-device disabling, and prefers-reduced-motion honor.
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPointer, setIsPointer] = React.useState(false);
  const [cursorText, setCursorText] = React.useState('');
  const [isTouchDevice, setIsTouchDevice] = React.useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer trailing ring
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasCoarsePointer || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      if (interactive) {
        setIsPointer(true);
        const text = interactive.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsPointer(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--dp-gold,#c5a059)] flex items-center justify-center transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          width: cursorText ? 84 : isPointer ? 54 : 32,
          height: cursorText ? 84 : isPointer ? 54 : 32,
          backgroundColor: cursorText
            ? 'rgba(197, 160, 89, 0.92)'
            : isPointer
            ? 'rgba(197, 160, 89, 0.12)'
            : 'rgba(197, 160, 89, 0.04)',
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
        }}
      >
        {cursorText && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-black select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot Anchor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--dp-gold,#c5a059)] shadow-[0_0_8px_rgba(197,160,89,0.6)]"
        style={{
          x: mouseX,
          y: mouseY,
          width: isPointer ? 4 : 6,
          height: isPointer ? 4 : 6,
          opacity: cursorText ? 0 : 1,
        }}
      />
    </>
  );
}
