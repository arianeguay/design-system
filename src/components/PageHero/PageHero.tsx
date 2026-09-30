import './PageHero.module.css';

interface PageHeroProps {
  /** One label, or several rendered as separate spans. */
  eyebrow: string | string[];
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
  const labels = Array.isArray(eyebrow) ? eyebrow : [eyebrow];
  return (
    <header className="ds-page-hero">
      {renderTexture}
      <div
        className="container ds-page-hero-grid"
        style={{
          padding: `${py[0]}px var(--page-px) ${py[1]}px`,
          gridTemplateColumns: right ? columns : '1fr',
        }}
      >
        <div className="ds-page-hero-text">
          <p className="t-eyebrow">
            {labels.map((label) => <span key={label}>{label}</span>)}
          </p>
          <h1 className="t-h1" style={{ margin: 0 }} {...titleProps}>
            {title}
          </h1>
          {lead && <div className="t-lead ds-page-hero-lead">{lead}</div>}
          {ctas && <div className="ds-page-hero-ctas">{ctas}</div>}
        </div>

        {right && <div style={{ position: 'relative' }}>{right}</div>}
      </div>
    </header>
  );
}
