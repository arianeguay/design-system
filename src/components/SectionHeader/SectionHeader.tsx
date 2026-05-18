'use client';

import React from 'react';
import FadeIn from '../FadeIn';

type TitleSize = 'xl' | 'lg' | 'md' | 'sm';

const TITLE_SIZES: Record<TitleSize, number> = {
  xl: 72,
  lg: 64,
  md: 56,
  sm: 52,
};

interface SectionHeaderProps {
  tag: string;
  title: React.ReactNode;
  lead?: string;
  size?: TitleSize;
  maxWidth?: number;
}

export default function SectionHeader({
  tag,
  title,
  lead,
  size = 'xl',
  maxWidth = 1100,
}: SectionHeaderProps) {
  return (
    <FadeIn>
      <p className="t-eyebrow" style={{ marginBottom: 16 }}>{tag}</p>
      <h2
        className="t-h2"
        style={{ margin: '0 0 16px', maxWidth, fontSize: TITLE_SIZES[size] }}
      >
        {title}
      </h2>
      {lead && (
        <p className="t-lead-sm" style={{ margin: '0 0 48px', maxWidth: 760 }}>
          {lead}
        </p>
      )}
    </FadeIn>
  );
}
