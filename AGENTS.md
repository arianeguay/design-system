# @arianeguay/design-system

Package partagé publié sur GitHub Packages. Consommé par `portfolio`, `studio-foundation-web`, et `little-chef`.

`@arianeguay/design-system` — v0.1.0 · tsup · ESM + CJS · TypeScript strict

---

## Structure

```
src/
  index.ts                    # barrel export — marqué "use client"
  styles/
    tokens.css                # CSS custom properties
    typography.css            # classes utilitaires .t-*
    layout.css                # classes utilitaires .container, .section, etc.
    index.css                 # @import des trois fichiers ci-dessus
  components/
    Button/                   # Button.tsx + Button.module.css + index.ts
    Tag/
    WarmSection/
    PageHero/
    SectionHeader/            # importe FadeIn — marqué "use client"
    FadeIn/                   # hooks React — marqué "use client"
    RichText/
    YamlPreview/
    CodeBlock/
    DividedList/
    DashLines/
  declarations.d.ts           # déclarations de modules (*.module.css, *.svg)
scripts/
  build-css.mjs               # copie src/styles/ → dist/styles/
```

---

## Build

```bash
pnpm build        # tsup + build-css.mjs
pnpm dev          # tsup --watch
pnpm typecheck    # tsc --noEmit
```

`tsup.config.ts` émet ESM + CJS depuis `src/index.ts`. Le barrel reçoit automatiquement le banner `"use client"` via `banner: { js: '"use client"' }` — nécessaire parce que `SectionHeader` → `FadeIn` (hooks) transitif.

Les CSS de composants (`*.module.css`) sont bundlés en CSS global dans `dist/index.css`. tsup ne gère pas les CSS modules — son plugin postcss interne intercepte tout `.css` et le traite comme global, peu importe le namespace. On utilise donc des classes globales préfixées `ds-*` référencées par chaîne dans les composants (pas d'`import s from`). `scripts/build-css.mjs` ajoute `@import '../index.css'` dans `dist/styles/index.css` pour que le bundle CSS soit livré avec les tokens via un seul import.

---

## Consommer le package

### Import des styles

```ts
// app/layout.tsx
import '@arianeguay/design-system/styles';
```

Cet import couvre tout : tokens, utilitaires typographiques (`t-*`), utilitaires layout (`.container`, `.section`, etc.) **et** styles des composants (`ds-*`). Aucune configuration Next/Turbopack supplémentaire requise.

### Import des composants

```tsx
import { Button, Tag, WarmSection, PageHero, SectionHeader, RichText, YamlPreview, YamlPreviewDark, Y, FadeIn, DividedList, DividedRow, DashLines, CodeBlock, YK, YV, YC } from '@arianeguay/design-system';
```

---

## Ajouter un composant

1. Créer `src/components/NomComposant/NomComposant.tsx`
2. Créer `src/components/NomComposant/index.ts` — `export { default } from './NomComposant'`
3. Si le composant utilise des hooks React : ajouter `'use client'` en première ligne du `.tsx`
4. Exporter depuis `src/index.ts`
5. `pnpm build` pour vérifier

### Règles CSS composants

- Styles locaux → `NomComposant.module.css` dans le même dossier (bundlés en CSS global)
- Toutes les classes locales doivent être préfixées `ds-` (ex: `ds-btn`, `ds-warm-section`) pour éviter les collisions chez les consumers
- Dans le `.tsx`: faire `import './NomComposant.module.css'` (side-effect) — pas `import s from`. Référencer les classes par chaîne littérale (`className="ds-btn"`)
- Aucune couleur hex hors de `src/styles/tokens.css`
- Ne pas dupliquer les utilitaires de `typography.css` / `layout.css` — utiliser les classes globales directement

---

## "use client" — qui et pourquoi

| Composant | Marqué client | Raison |
|---|---|---|
| `FadeIn` | ✓ | `useRef`, `useEffect`, `useState` |
| `SectionHeader` | ✓ | Importe `FadeIn` — transitif |
| `CodeBlock` | — | Pas de hooks, mais `index.ts` barrel l'est |
| Tous les autres | — | Server-safe |
| `src/index.ts` | ✓ (banner tsup) | SectionHeader tire FadeIn dans le barrel |

---

## Do Not

- Hardcoder des valeurs hex — tout passe par les tokens CSS
- Ajouter `dangerouslySetInnerHTML` hors de `RichText.tsx`
- Créer des composants qui dépendent de `next/link`, `next/image`, ou de next-intl — le package est framework-agnostic côté source (Next.js est une peerDep implicite via l'usage, pas une dep explicite)
- Modifier `dist/` à la main — généré par le build, ignoré par git
