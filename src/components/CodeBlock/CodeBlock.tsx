import React from 'react';
import './CodeBlock.module.css';

interface ACodeBlockProps {
  filename?: string;
  lang?: string;
  children: React.ReactNode;
}

export default function ACodeBlock({ filename, lang = 'yaml', children }: ACodeBlockProps) {
  return (
    <div className="ds-code">
      {filename && (
        <div className="ds-code-head">
          <span>{filename}</span>
          <span>{lang.toLowerCase()}</span>
        </div>
      )}
      <pre className="ds-code-body">{children}</pre>
    </div>
  );
}

/* YAML syntax helpers: span components for colorized keywords */
export const YK = ({ children }: { children: React.ReactNode }) => (
  <span className="ds-code-key">{children}</span>
);

export const YV = ({ children }: { children: React.ReactNode }) => (
  <span className="ds-code-val">{children}</span>
);

export const YC = ({ children }: { children: React.ReactNode }) => (
  <span className="ds-code-comment">{children}</span>
);
