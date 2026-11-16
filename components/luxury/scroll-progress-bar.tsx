'use client';

import * as React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Editorial Scroll Progress Bar
 * Sleek 2px gradient line across the top of the viewport indicating
 * reading and exploration progress with spring damping.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] origin-left bg-gradient-to-r from-[#9c7728] via-[#e5c378] to-[#c5a059] shadow-[0_0_10px_rgba(229,195,120,0.5)]"
      style={{ scaleX }}
    />
  );
}
