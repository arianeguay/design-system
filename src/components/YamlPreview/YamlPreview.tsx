/* Fenêtre de code YAML syntaxiquement colorée, sur la bande sombre.
   Utilisée dans HomeHero, StudioHero, et les patterns Studio. */

import CodeBlock from '../CodeBlock';

interface YamlPreviewProps {
  filename: string;
  children: React.ReactNode;
}

export default function YamlPreview({ filename, children }: YamlPreviewProps) {
  return <CodeBlock filename={filename} lang="yaml">{children}</CodeBlock>;
}

/* Same window as YamlPreview, kept for existing callers. */
export function YamlPreviewDark({ filename, children }: YamlPreviewProps) {
  return <CodeBlock filename={filename} lang="yaml">{children}</CodeBlock>;
}

/* Helpers de colorisation YAML. The d* names are aliases kept for existing callers. */
const key = (t: string) => <span className="ds-code-key">{t}</span>;
const val = (t: string) => <span className="ds-code-val">{t}</span>;
const mute = (t: string) => <span className="ds-code-mute">{t}</span>;
const comment = (t: string) => <span className="ds-code-comment">{t}</span>;

export const Y = { key, val, mute, comment, dkey: key, dval: val, dmute: mute, dcomment: comment };
