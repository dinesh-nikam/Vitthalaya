'use client';

import * as React from 'react';

interface ConditionalWrapperProps {
  children: React.ReactNode;
}

/**
 * Standard layout header wrapper.
 */
export function ConditionalHeader({ children }: ConditionalWrapperProps) {
  return <>{children}</>;
}
