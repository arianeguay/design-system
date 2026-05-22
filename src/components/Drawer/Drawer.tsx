'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './Drawer.module.css';

export type DrawerSide = 'right' | 'left' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';
export type DrawerBackdrop = 'opaque' | 'none';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  /** Allow closing via Esc + backdrop click. Default: true. */
  dismissible?: boolean;
  backdrop?: DrawerBackdrop;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

interface DrawerContextValue {
  onClose: () => void;
  titleId: string;
  labelledBy: string | undefined;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext(component: string): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside <Drawer>.`);
  }
  return ctx;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const TRANSITION_MS = 240;

// --- Body scroll lock, ref-counted across drawers/modals ---
let openCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

function lockBodyScroll() {
  if (openCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    savedOverflow = document.body.style.overflow;
    savedPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  openCount++;
}

function unlockBodyScroll() {
  openCount = Math.max(0, openCount - 1);
  if (openCount === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPaddingRight;
  }
}

export default function Drawer({
  open,
  onOpenChange,
  children,
  side = 'right',
  size = 'md',
  dismissible = true,
  backdrop = 'opaque',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);
  const [dataState, setDataState] = useState<'open' | 'closed'>(open ? 'open' : 'closed');

  const contentRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const fallbackTitleId = useId();
  const titleId = ariaLabelledBy ?? `ds-drawer-title-${fallbackTitleId}`;

  // Mount flag for SSR-safe portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Drive enter/exit animation by toggling data-state with a frame delay on enter
  // and a setTimeout on exit (matches CSS transition duration).
  useEffect(() => {
    if (open) {
      setShouldRender(true);
      const raf = requestAnimationFrame(() => setDataState('open'));
      return () => cancelAnimationFrame(raf);
    }
    if (!shouldRender) return;
    setDataState('closed');
    const timer = setTimeout(() => setShouldRender(false), TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [open, shouldRender]);

  // Scroll lock + focus management — tied to `open` so it triggers immediately,
  // even before the exit animation finishes.
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = (document.activeElement as HTMLElement | null) ?? null;
    lockBodyScroll();

    // Defer initial focus until the content is in the DOM.
    const raf = requestAnimationFrame(() => {
      const content = contentRef.current;
      if (!content) return;
      const focusable = content.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusable ?? content).focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      unlockBodyScroll();
      const toRestore = previouslyFocused.current;
      if (toRestore && typeof toRestore.focus === 'function') {
        toRestore.focus();
      }
    };
  }, [open]);

  // Esc + Tab focus trap
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (dismissible) {
          e.stopPropagation();
          onOpenChange(false);
        }
        return;
      }
      if (e.key !== 'Tab') return;

      const content = contentRef.current;
      if (!content) return;

      const focusables = Array.from(
        content.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (focusables.length === 0) {
        e.preventDefault();
        content.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !content.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, dismissible, onOpenChange]);

  if (!mounted || !shouldRender) return null;

  const handleBackdropClick = () => {
    if (dismissible) onOpenChange(false);
  };

  const rootCls = [
    'ds-drawer-root',
    `ds-drawer-side-${side}`,
    `ds-drawer-size-${size}`,
    backdrop === 'none' && 'ds-drawer-no-backdrop',
  ]
    .filter(Boolean)
    .join(' ');

  const contentCls = ['ds-drawer-content', className].filter(Boolean).join(' ');

  const ctxValue: DrawerContextValue = {
    onClose: () => onOpenChange(false),
    titleId,
    labelledBy: ariaLabelledBy,
  };

  return createPortal(
    <DrawerContext.Provider value={ctxValue}>
      <div className={rootCls} data-state={dataState}>
        <div
          className="ds-drawer-backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
        <div
          ref={contentRef}
          className={contentCls}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabel ? undefined : titleId}
          aria-describedby={ariaDescribedBy}
          tabIndex={-1}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>,
    document.body
  );
}

// --- Sub-components ---

interface DivProps {
  children: React.ReactNode;
  className?: string;
}

export function DrawerHeader({ children, className }: DivProps) {
  return (
    <div className={['ds-drawer-header', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export interface DrawerTitleProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function DrawerTitle({ children, id, className, as: Tag = 'h2' }: DrawerTitleProps) {
  const ctx = useDrawerContext('DrawerTitle');
  return (
    <Tag
      id={id ?? ctx.titleId}
      className={['ds-drawer-title', className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}

export function DrawerBody({ children, className }: DivProps) {
  return (
    <div className={['ds-drawer-body', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className }: DivProps) {
  return (
    <div className={['ds-drawer-footer', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export interface DrawerCloseProps {
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function DrawerClose({
  children,
  className,
  'aria-label': ariaLabel = 'Close',
}: DrawerCloseProps) {
  const { onClose } = useDrawerContext('DrawerClose');
  return (
    <button
      type="button"
      className={['ds-drawer-close', className].filter(Boolean).join(' ')}
      onClick={onClose}
      aria-label={ariaLabel}
    >
      {children ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3 3L13 13M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
