'use client';

import * as React from 'react';

interface ConditionalWrapperProps {
  children: React.ReactNode;
}

/**
 * Standard layout footer wrapper.
 */
export function ConditionalFooter({ children }: ConditionalWrapperProps) {
  return <>{children}</>;
}
