'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

interface ConditionalWrapperProps {
  children: React.ReactNode;
}

/**
 * Conditionally renders the standard site footer when NOT on /luxury routes.
 * The luxury suite renders its own dedicated editorial footer with
 * international salon directories, copyright-safe image citations, and
 * bespoke concierge access.
 */
export function ConditionalFooter({ children }: ConditionalWrapperProps) {
  const pathname = usePathname();
  const isLuxury = pathname?.startsWith('/luxury');

  if (isLuxury) {
    return null;
  }

  return <>{children}</>;
}
