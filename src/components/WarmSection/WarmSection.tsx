import React from 'react';
import s from './WarmSection.module.css';

type TextureName = 'hero' | 'section' | 'projects' | 'chatbot' | 'banner' | 'footer';

interface WarmSectionProps {
  bg?: 'paperWarm' | 'paper' | 'dark' | 'cream';
  py?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  texture?: TextureName;
}

export default function WarmSection({ bg = 'paperWarm', py, children, style, texture }: WarmSectionProps) {
  return (
    <section
      className={`${s.section} ${s[bg]}`}
      style={{ ...(py !== undefined ? { '--section-py': `${py}px` } as React.CSSProperties : {}), ...style }}
    >
      {texture && (
        <img
          src={`/assets/texture-${texture}.svg`}
          alt=""
          aria-hidden
          className={s.texture}
        />
      )}
      <div className={s.inner}>
        {children}
      </div>
    </section>
  );
}
