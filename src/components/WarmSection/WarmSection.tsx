import React from 'react';
import './WarmSection.module.css';

type TextureName = 'hero' | 'section' | 'projects' | 'chatbot' | 'banner' | 'footer';

type BgKey = 'paperWarm' | 'paper' | 'dark' | 'cream';

interface WarmSectionProps {
  bg?: BgKey;
  py?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  texture?: TextureName;
  renderTexture?: React.ReactNode;
}

const bgClassName: Record<BgKey, string> = {
  paper: 'ds-warm-section-bg-paper',
  paperWarm: 'ds-warm-section-bg-paper-warm',
  cream: 'ds-warm-section-bg-cream',
  dark: 'ds-warm-section-bg-dark',
};

export default function WarmSection({ bg = 'paperWarm', py, children, style, texture, renderTexture }: WarmSectionProps) {
  return (
    <section
      className={`ds-warm-section ${bgClassName[bg]}`}
      style={{ ...(py !== undefined ? { '--section-py': `${py}px` } as React.CSSProperties : {}), ...style }}
    >
      {texture && (
        <img
          src={`/assets/texture-${texture}.svg`}
          alt=""
          aria-hidden
          className="ds-warm-section-texture"
        />
      )}
      {renderTexture}
      <div className="ds-warm-section-inner">
        {children}
      </div>
    </section>
  );
}
