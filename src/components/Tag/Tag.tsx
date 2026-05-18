import React from 'react';
import './Tag.module.css';

interface TagProps {
  children: React.ReactNode;
  accent?: boolean;
  onDark?: boolean;
}

export default function Tag({ children, accent = false, onDark = false }: TagProps) {
  const cls = ['ds-tag', accent && 'ds-tag-accent', onDark && 'ds-tag-on-dark']
    .filter(Boolean)
    .join(' ');
  return <span className={cls}>{children}</span>;
}
