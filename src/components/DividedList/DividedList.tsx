import React from 'react';
import './DividedList.module.css';

/* Liste avec border-top pleine + border-bottom légère sur chaque item.
   Pattern récurrent : Services (home), Thèse + Patterns (studio),
   Process (contact), Skills (apropos). */

interface DividedListProps {
  children: React.ReactNode;
  /** Couleur de la ligne supérieure. Défaut: ink (pleine) */
  topBorder?: 'ink' | 'rule';
  style?: React.CSSProperties;
}

export default function DividedList({ children, topBorder = 'ink', style }: DividedListProps) {
  return (
    <div
      style={{
        borderTop: `1px solid ${
          topBorder === 'ink' ? 'var(--color-ink)' : 'var(--color-ink-rule)'
        }`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Chaque ligne dans la liste — le grid columns est défini par le parent
   car il varie trop d'une page à l'autre pour être standardisé. */
interface DividedRowProps {
  children: React.ReactNode;
  columns: string;
  gap?: number;
  py?: number;
}

export function DividedRow({ children, columns, gap = 40, py = 32 }: DividedRowProps) {
  return (
    <div
      className="ds-divided-row"
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap,
        padding: `${py}px 0`,
        alignItems: 'start',
      }}
    >
      {children}
    </div>
  );
}
