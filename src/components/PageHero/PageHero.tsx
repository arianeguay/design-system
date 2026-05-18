import s from './PageHero.module.css';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  ctas?: React.ReactNode;
  right?: React.ReactNode;
  /** Colonnes CSS grid pour left/right. Défaut: '1.3fr 1fr' */
  columns?: string;
  /** Padding vertical haut / bas */
  py?: [number, number];
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>;
  renderTexture?: React.ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  lead,
  ctas,
  right,
  columns = '1.3fr 1fr',
  py = [80, 90],
  titleProps,
  renderTexture,
}: PageHeroProps) {
  return (
    <header style={{ position: 'relative', overflow: 'hidden' }}>
      {renderTexture}
      <div
        className={`container ${s.grid}`}
        style={{
          padding: `${py[0]}px var(--page-px) ${py[1]}px`,
          gridTemplateColumns: right ? columns : '1fr',
        }}
      >
        <div style={{ paddingTop: 20, minWidth: 0 }}>
          <div className="t-eyebrow">{eyebrow}</div>
          <h1 className="t-h1" style={{ margin: 0 }} {...titleProps}>
            {title}
          </h1>
          {lead && (
            <div className="t-lead" style={{ marginTop: 32, maxWidth: 580 }}>
              {lead}
            </div>
          )}
          {ctas && (
            <div className="flex-row flex-wrap" style={{ marginTop: 38, gap: 18 }}>
              {ctas}
            </div>
          )}
        </div>

        {right && <div style={{ position: 'relative' }}>{right}</div>}
      </div>
    </header>
  );
}
