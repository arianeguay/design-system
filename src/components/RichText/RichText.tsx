import React from 'react';
/* Wrapper pour du contenu HTML issu de nos propres fichiers de traduction.
   Remplace dangerouslySetInnerHTML + t.raw() partout dans le codebase.
   À utiliser uniquement avec du contenu contrôlé (JSON interne), jamais avec de l'input utilisateur. */

type Tag = 'p' | 'div' | 'span' | 'blockquote' | 'cite';

interface RichTextProps {
  children: string;
  as?: Tag;
  className?: string;
  style?: React.CSSProperties;
}

export default function RichText({ children, as: Tag = 'div', className, style }: RichTextProps) {
  return (
    <Tag
      dangerouslySetInnerHTML={{ __html: children }}
      className={className}
      style={style}
    />
  );
}
