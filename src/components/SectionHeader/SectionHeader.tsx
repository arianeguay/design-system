'use client';

import React from 'react';
import FadeIn from '../FadeIn';
import { withStudio } from '../StudioWordmark';

type TitleSize = 'xl' | 'lg' | 'md' | 'sm';

interface SectionHeaderProps {
  tag: string;
  title: React.ReactNode;
  lead?: string;
  /** Kept for existing callers: every size now renders at --fs-h2. */
  size?: TitleSize;
  maxWidth?: number;
  /** Colors for a header rendered on the band. */
  onDark?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  lead,
  maxWidth = 1100,
  onDark = false,
}: SectionHeaderProps) {
  return (
    <FadeIn>
      <p className="t-eyebrow" style={{ marginBottom: 16, ...(onDark && { color: 'var(--band-accent)' }) }}>
        {withStudio(tag)}
      </p>
      <h2
        className="t-h2"
        style={{ margin: '0 0 16px', maxWidth, ...(onDark && { color: 'var(--band-fg)' }) }}
      >
        {typeof title === 'string' ? withStudio(title) : title}
      </h2>
      {lead && (
        <p
          className="t-lead-sm"
          style={{ margin: '0 0 48px', maxWidth: '68ch', ...(onDark && { color: 'var(--band-fg-dim)' }) }}
        >
          {withStudio(lead)}
        </p>
      )}
    </FadeIn>
  );
}
