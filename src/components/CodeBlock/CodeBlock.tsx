import React from 'react';
interface ACodeBlockProps {
  filename?: string;
  lang?: string;
  children: React.ReactNode;
}

export default function ACodeBlock({ filename, lang = 'yaml', children }: ACodeBlockProps) {
  return (
    <div
      style={{
        background: 'var(--color-dark)',
        borderRadius: 6,
        overflow: 'hidden',
        border: '1px solid var(--color-dark)',
        boxShadow: '0 1px 0 rgba(42,32,24,0.08)',
      }}
    >
      {filename && (
        <div
          style={{
            padding: '11px 16px',
            borderBottom: '1px solid var(--color-dark-rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--color-dark-fg-dim)',
            letterSpacing: '0.05em',
          }}
        >
          <span>{filename}</span>
          <span style={{ textTransform: 'uppercase', fontSize: 10 }}>{lang}</span>
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: '18px 20px',
          fontFamily: 'var(--font-mono)',
          fontSize: 12.5,
          lineHeight: 1.7,
          color: 'var(--color-dark-fg)',
          whiteSpace: 'pre',
          overflow: 'auto',
        }}
      >
        {children}
      </pre>
    </div>
  );
}

/* YAML syntax helpers — span components for colorized keywords */
export const YK = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--color-terra)' }}>{children}</span>
);

export const YV = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--color-mustard)' }}>{children}</span>
);

export const YC = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--color-dark-fg-dim)', fontStyle: 'italic' }}>{children}</span>
);
