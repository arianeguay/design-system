import React, { useId } from 'react';
import './TextureGrid.module.css';

const VARIANTS = {
  strong: { r: 1.3, opacity: 0.12 },
  base: { r: 0.8, opacity: 0.18 },
};

export type TextureGridVariant = keyof typeof VARIANTS;

// Studio dot grid: dark grounds only, `strong` in heroes.
export default function TextureGrid({ variant = 'base' }: { variant?: TextureGridVariant }) {
  const patternId = `ds-grid-${variant}-${useId().replace(/:/g, '')}`;
  const { r, opacity } = VARIANTS[variant];
  return (
    <svg aria-hidden="true" className="ds-texture-grid">
      <defs>
        <pattern id={patternId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r={r} fill="var(--band-fg)" fillOpacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
