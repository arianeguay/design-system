import React from 'react';
import './Button.module.css';

export type ButtonVariant = 'primary' | 'mustard' | 'terra' | 'outline' | 'ghost';

export interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  onDark?: boolean;
  children: React.ReactNode;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  /** Override the anchor rendered for internal links. Useful for Next.js Link, React Router, etc. */
  LinkComponent?: React.ElementType;
}

function splitArrow(children: React.ReactNode): [React.ReactNode, boolean] {
  if (typeof children === 'string' && children.endsWith(' →')) {
    return [children.slice(0, -2), true];
  }
  return [children, false];
}

const variantClassName: Record<ButtonVariant, string> = {
  primary: 'ds-btn-primary',
  mustard: 'ds-btn-mustard',
  terra: 'ds-btn-terra',
  outline: 'ds-btn-outline',
  ghost: 'ds-btn-ghost',
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  onDark = false,
  children,
  external = false,
  type = 'button',
  disabled = false,
  style,
  className,
  LinkComponent = 'a',
}: ButtonProps) {
  const variantClass = onDark && variant === 'outline' ? 'ds-btn-outline-dark' : variantClassName[variant];
  const cls = ['ds-btn', variantClass, className].filter(Boolean).join(' ');
  const [text, hasArrow] = splitArrow(children);

  const inner = (
    <>
      {text}
      {hasArrow && <span className="ds-btn-arrow" aria-hidden>→</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
          {inner}
        </a>
      );
    }
    return (
      <LinkComponent href={href} className={cls} style={style}>
        {inner}
      </LinkComponent>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>
      {inner}
    </button>
  );
}
