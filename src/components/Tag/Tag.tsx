import React from 'react';
import s from './Tag.module.css';

interface TagProps {
  children: React.ReactNode;
  accent?: boolean;
  onDark?: boolean;
}

export default function Tag({ children, accent = false, onDark = false }: TagProps) {
  const cls = [s.tag, accent && s.accent, onDark && s.onDark].filter(Boolean).join(' ');
  return <span className={cls}>{children}</span>;
}
