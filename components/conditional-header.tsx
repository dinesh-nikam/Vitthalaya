'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

interface ConditionalWrapperProps {
  children: React.ReactNode;
}

/**
 * Conditionally renders children only when NOT on /luxury routes.
 * This allows the luxury multi-page portal to exhibit an unencumbered,
 * award-winning editorial aesthetic while preserving the full standard
 * site navigation for all other routes.
 */
export function ConditionalHeader({ children }: ConditionalWrapperProps) {
  const pathname = usePathname();
  const isLuxury = pathname?.startsWith('/luxury');

  if (isLuxury) {
    return null;
  }

  return <>{children}</>;
}
