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
  const [hidden, setHidden] = useState(false);

  // Visible by default: only content still below the fold is hidden, then revealed on scroll.
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${y}px)` : 'none',
        transition: `opacity var(--dur-enter) var(--ease-enter) ${delay}ms, transform var(--dur-enter) var(--ease-enter) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
