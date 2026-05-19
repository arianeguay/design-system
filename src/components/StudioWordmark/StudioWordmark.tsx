import React from 'react';

export interface StudioWordmarkProps {
  size?: number;
  onDark?: boolean;
  className?: string;
}

export default function StudioWordmark({ size, onDark = false, className }: StudioWordmarkProps) {
  return (
    <span
      className={`t-wordmark-studio${className ? ` ${className}` : ''}`}
      style={{
        fontSize: size ? `${size}px` : undefined,
        letterSpacing: size && size >= 64 ? '-0.03em' : '-0.02em',
        color: onDark ? 'var(--color-dark-fg)' : 'var(--color-ink)',
      }}
    >
      studio<span style={{ color: 'var(--color-terra)' }}>:</span>
    </span>
  );
}
