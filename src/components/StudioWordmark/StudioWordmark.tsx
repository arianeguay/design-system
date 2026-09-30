import React from 'react';

export interface StudioWordmarkProps {
  size?: number;
  onDark?: boolean;
  className?: string;
}

// "Studio" the product, not the Studio Foundation organization.
const STUDIO = /\bStudio\b(?! Foundation)/;
const STUDIO_ALL = new RegExp(STUDIO.source, 'g');

const STUDIO_MARK_HTML =
  '<span class="studio-mark">studio<span class="studio-mark-colon">:</span></span>';

export default function StudioWordmark({ size, onDark = false, className }: StudioWordmarkProps) {
  const style = {
    ...(size !== undefined && { fontSize: `${size}px` }),
    ...(onDark && { '--studio-ink': 'var(--band-fg)', '--studio-colon': 'var(--band-accent)' }),
  } as React.CSSProperties;
  return (
    <span className={className ? `studio-mark ${className}` : 'studio-mark'} style={style}>
      studio<span className="studio-mark-colon">:</span>
    </span>
  );
}

export function withStudio(text: string): React.ReactNode {
  const parts = text.split(STUDIO);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<StudioWordmark key={i} />, part]));
}

export function withStudioHtml(html: string): string {
  return html.replace(STUDIO_ALL, STUDIO_MARK_HTML);
}
