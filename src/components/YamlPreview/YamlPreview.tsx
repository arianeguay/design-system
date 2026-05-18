/* Fenêtre de code YAML syntaxiquement colorée.
   Utilisée dans HomeHero, StudioHero, et les patterns Studio. */

interface YamlPreviewProps {
  filename: string;
  children: React.ReactNode;
}

export default function YamlPreview({ filename, children }: YamlPreviewProps) {
  return (
    <div style={{ background: 'var(--color-cream)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 40px rgba(0,0,0,0.3)' }}>
      <div style={{
        padding: '11px 18px',
        borderBottom: '1px solid rgba(42,32,24,0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--color-ink-mute)',
        letterSpacing: '0.05em',
      }}>
        <span>{filename}</span>
        <span style={{ textTransform: 'uppercase', fontSize: 10 }}>YAML</span>
      </div>
      <pre style={{
        margin: 0,
        padding: '20px 22px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12.5,
        lineHeight: 1.75,
        color: 'var(--color-ink)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        overflowX: 'auto',
      }}>
        {children}
      </pre>
    </div>
  );
}

/* Variante sombre — utilisée dans les patterns Studio */
export function YamlPreviewDark({ filename, children }: YamlPreviewProps) {
  return (
    <div style={{ background: 'var(--color-dark)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{
        padding: '11px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.05em',
      }}>
        <span>{filename}</span>
        <span style={{ textTransform: 'uppercase', fontSize: 10 }}>YAML</span>
      </div>
      <pre style={{
        margin: 0,
        padding: '20px 22px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12.5,
        lineHeight: 1.75,
        color: 'rgba(255,255,255,0.75)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        overflowX: 'auto',
      }}>
        {children}
      </pre>
    </div>
  );
}

/* Helpers de colorisation YAML — à utiliser dans le contenu des previews */
export const Y = {
  key: (s: string) => <span style={{ color: 'var(--color-terra)' }}>{s}</span>,
  val: (s: string) => <span style={{ color: 'var(--color-bourgogne)' }}>{s}</span>,
  mute: (s: string) => <span style={{ color: 'var(--color-ink-mute)' }}>{s}</span>,
  comment: (s: string) => <span style={{ color: 'var(--color-ink-mute)', fontStyle: 'italic' }}>{s}</span>,
  // Pour les previews sombres
  dkey: (s: string) => <span style={{ color: 'var(--color-terra)' }}>{s}</span>,
  dmute: (s: string) => <span style={{ color: 'rgba(255,255,255,0.4)' }}>{s}</span>,
  dval: (s: string) => <span style={{ color: 'rgba(201,100,66,0.75)' }}>{s}</span>,
  dcomment: (s: string) => <span style={{ color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>{s}</span>,
};
