'use client';

import { useRef, useEffect, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof HTMLElementTagNameMap;
  threshold?: number;
}

// Délai minimal avant de lancer l'observer — évite le flash opacity:0→1
// qui se produit quand l'hydration et l'observer se déclenchent en même temps.
const BOOT_DELAY = 300;

export default function FadeIn({
  children,
  delay = 0,
  y = 30,
  className,
  style,
  as: Tag = 'div',
  threshold = 0.1,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const boot = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold }
      );
      observer.observe(el);
    }, BOOT_DELAY);

    return () => clearTimeout(boot);
  }, [threshold]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
