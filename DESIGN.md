# Design System — @arianeguay/design-system

Palette **70 / 20 / 10** : neutres chauds calmes / terracotta / ponctuation (moutarde ou bourgogne, jamais ensemble dans la même zone). Atmosphère chaude et artisanale, jamais clinique.

Ce document décrit le DS tel qu'il existe dans ce package. Les consumers (portfolio, studio-foundation-web) peuvent surcharger les tokens CSS pour leur identité propre — le DS de base reste inchangé.

---

## Palette de couleurs

### Règle 70 / 20 / 10
| Part | Rôle | Tokens |
|---|---|---|
| 70 % | Fonds neutres chauds | `--color-cream`, `--color-paper`, `--color-paper-warm` |
| 20 % | Accent primaire | `--color-terra`, `--color-terra-deep`, `--color-terra-soft` |
| 10 % | Ponctuation — une seule par zone | `--color-mustard`, `--color-bourgogne` |

### Sémantique des accents

| Couleur | Fonction | Fréquence | Signal |
|---|---|---|---|
| `--color-terra` | Présence de marque, accent de base | Fréquent | "voici le langage du site" |
| `--color-mustard` | Appel à l'engagement | Max 1 par page | "agis maintenant" |
| `--color-bourgogne` | Gravité de positionnement | Ultra-rare | "ce mot porte une promesse de marque" |

Moutarde et bourgogne ne cohabitent jamais dans le même `<section>` — incompatibilité sémantique, pas esthétique.

### Tokens complets (`src/styles/tokens.css`)

```
Neutres
  --color-cream:       #f5efe4   fond de page par défaut
  --color-cream-deep:  #ede3d2
  --color-paper:       #faf6ed   sections claires, cards
  --color-paper-warm:  #f1e8d8   WarmSection default

Texte
  --color-ink:         #2a2018   texte principal
  --color-ink-soft:    #4a3d31   lead, secondaire
  --color-ink-mute:    rgba(42, 32, 24, 0.6)
  --color-ink-faint:   rgba(42, 32, 24, 0.4)
  --color-ink-rule:    rgba(42, 32, 24, 0.13)   séparateurs discrets
  --color-ink-line:    rgba(42, 32, 24, 0.22)   bordures

Terracotta
  --color-terra:       #c96442
  --color-terra-deep:  #9b4528
  --color-terra-soft:  rgba(201, 100, 66, 0.12)

Ponctuation
  --color-mustard:     #dba636
  --color-bourgogne:   #7a1f3d

Surfaces sombres
  --color-dark:        #2a2018
  --color-dark-elev:   #3a2e23
  --color-dark-fg:     #ead9d4
  --color-dark-fg-dim: rgba(234, 217, 212, 0.55)
  --color-dark-rule:   rgba(234, 217, 212, 0.1)
```

### Mode sombre (`prefers-color-scheme: dark`)
Les tokens sont remappés dans `tokens.css`. Fonds cream/paper → bruns très sombres. Encre → crème. Terracotta → légèrement plus lumineux. **Ne jamais hardcoder `#fff` ou `#2a2018`** — utiliser les tokens pour bénéficier du remapping automatique.

Les remappings dark mode préservent la *fonction sémantique*, pas la valeur hex. Le bourgogne est éclairci vers rose-magenta en dark parce qu'il doit garder son poids perceptuel sur fond sombre.

---

## Typographie

### Familles
| Variable | Police | Usage |
|---|---|---|
| `--font-body` | Inter + system-ui | Corps de texte, labels, UI |
| `--font-heading` | Ubuntu + Inter | Titres (`h1`–`h3`) |
| `--font-mono` | JetBrains Mono | Eyebrows, labels mono, code |
| `--font-wordmark` | Fraunces | Wordmark uniquement (configuré par le consumer) |

Les fonts sont injectées via `next/font` dans le `layout.tsx` du consumer — pas dans ce package.

### Échelle fluide (390px → 1400px)
```
--fs-display: clamp(28px, 7.5vw, 104px)   h1 hero
--fs-h2:      clamp(20px, 4.5vw, 64px)    titres de section
--fs-h3:      clamp(18px, 2.2vw, 28px)    sous-titres
```

### Classes utilitaires
| Classe | Rendu |
|---|---|
| `.t-h1` | Ubuntu 700, `--fs-display`, letter-spacing -0.035em |
| `.t-h2` | Ubuntu 700, `--fs-h2`, letter-spacing -0.035em |
| `.t-h3` | Ubuntu 700, `--fs-h3`, letter-spacing -0.025em |
| `.t-lead` | Inter 19px, line-height 1.55, `--color-ink-soft` |
| `.t-lead-sm` | Inter 17px, line-height 1.6, `--color-ink-soft` |
| `.t-eyebrow` | JetBrains Mono 11px, uppercase, letter-spacing 0.16em, `--color-terra` |
| `.t-mono-label` | JetBrains Mono 11px, uppercase, letter-spacing 0.08em, `--color-ink-mute` |
| `.t-body` | Inter 15px, line-height 1.65 |
| `.t-accent` | Couleur `--color-terra` — mot dans un **h1 hero** |
| `.t-accent-serif` | Fraunces italique + `--color-terra` — mot dans un **h2 de section** |
| `.t-accent-mustard` | Couleur `--color-mustard` |
| `.t-quote` | Ubuntu italique, `--fs-h3`, blockquote / pull-quote |
| `.t-wordmark` | Fraunces — wordmark du consumer uniquement |

### Liens
| Classe | Usage |
|---|---|
| `.t-link-subtle` | Fond clair — hover vers `--color-ink` |
| `.t-link-glass` | Fond sombre — semi-transparent, hover fond blanc |
| `.t-link-dark-subtle` | Fond sombre — label mono discret |

### Règle accent serif vs wordmark
- `.t-wordmark` → wordmark du consumer uniquement (header + footer)
- `<span className="t-accent">` → mot coloré dans un **h1** (police heading normale)
- `<em className="t-accent-serif">` → mot calligraphique dans un **h2** (Fraunces italique)
- `color: var(--color-terra)` inline → éléments UI uniquement (icônes, bordures, clés YAML)

---

## Layout

```
--page-max: 1280px
--page-px:  56px  →  32px (≤1024px)  →  22px (≤760px)  →  16px (≤480px)
```

### Classes utilitaires
```css
.container      /* centré, max-width, padding horizontal */
.section        /* padding 110px 0  (64px mobile) */
.section-sm     /* padding 72px 0   (40px mobile) */
.section-lg     /* padding 160px 0  (80px mobile) */

.bg-cream / .bg-paper / .bg-paper-warm / .bg-dark

.flex-row / .flex-col / .flex-wrap
.page-grid      /* 1.3fr 1fr, gap 64px */
.grid-2         /* 1fr 1fr, gap 48px */

.stack-sm / .stack / .stack-lg   /* margin-top 12/24/48px entre enfants */
.rule           /* séparateur 1px --color-ink-rule */
```

---

## Composants

### `<Button>`
```tsx
<Button variant="primary" href="/contact">Travailler ensemble →</Button>
```

| Variant | Sémantique |
|---|---|
| `primary` | Action principale neutre |
| `terra` | Action Studio / produit / code |
| `mustard` | Conversion forte — max 1 par page |
| `outline` | Action secondaire dans une paire de CTAs |
| `ghost` | Action tertiaire / tech-mono |

`onDark` : adapte `outline` pour fonds sombres. Flèche `→` en fin de texte animée automatiquement.

---

### `<Tag>`
```tsx
<Tag>Next.js</Tag>
<Tag accent>TypeScript</Tag>
<Tag onDark>Open source</Tag>
```
- `accent` : fond terracotta teinté — **fonds clairs uniquement**
- `onDark` : teinte claire — **fonds sombres uniquement**

---

### `<WarmSection>`
```tsx
<WarmSection bg="dark" py={120} texture="section">...</WarmSection>
```
Section pleine largeur avec conteneur interne centré.
- `bg`: `"paper"` | `"paperWarm"` | `"cream"` | `"dark"`
- `texture`: `"hero"` | `"section"` | `"projects"` | `"chatbot"` | `"banner"` | `"footer"` — SVG absolu
- Textures sur fonds clairs reçoivent `filter: invert(1)` en dark mode automatiquement

---

### `<PageHero>`
```tsx
<PageHero
  eyebrow="Studio Foundation"
  title={<>Build <span className="t-accent">agentic</span> pipelines</>}
  lead="..."
  ctas={<Button variant="mustard">Get started →</Button>}
  right={<YamlPreviewDark ... />}
/>
```
Grille 1.3fr/1fr avec eyebrow, h1, lead, CTAs, colonne droite optionnelle. Se réduit à une colonne si `right` absent.

---

### `<SectionHeader>`
```tsx
<SectionHeader tag="Projets" title={<>Ce que je <em className="t-accent-serif">construis</em></>} lead="..." size="xl" />
```
FadeIn automatique + eyebrow + h2 + lead optionnel. Tailles : `xl` (72px) / `lg` (64px) / `md` (56px) / `sm` (52px).

---

### `<YamlPreview>` / `<YamlPreviewDark>`
Fenêtre de code YAML syntaxiquement colorée. Helpers `Y.*` pour la coloration :

```tsx
import { YamlPreviewDark, Y } from '@arianeguay/design-system';

<YamlPreviewDark filename="pipeline.yaml">
  {Y.dkey('name')}{': '}{Y.dval('my-pipeline')}{'\n'}
  {Y.dcomment('# commentaire')}{'\n'}
</YamlPreviewDark>
```

Helpers fond clair : `Y.key()`, `Y.val()`, `Y.mute()`, `Y.comment()`  
Helpers fond sombre : `Y.dkey()`, `Y.dval()`, `Y.dmute()`, `Y.dcomment()`

---

### `<CodeBlock>`
```tsx
import { CodeBlock, YK, YV, YC } from '@arianeguay/design-system';

<CodeBlock filename="pipeline.yaml" lang="yaml">
  {YK('name')}{': '}{YV('my-pipeline')}{'\n'}
  {YC('# commentaire')}{'\n'}
</CodeBlock>
```
Variante plus générique que `YamlPreviewDark` — fond dark toujours. `YK` (clé), `YV` (valeur mustard), `YC` (commentaire dim italique).

---

### `<FadeIn>`
```tsx
<FadeIn delay={200} y={30} threshold={0.1}>
  <p>Contenu animé au scroll</p>
</FadeIn>
```
Composant client (`"use client"`). `IntersectionObserver` avec délai de boot de 300ms pour éviter le flash hydration. Respecte `prefers-reduced-motion`.

---

### `<RichText>`
**Seul endroit autorisé** pour `dangerouslySetInnerHTML` dans tout consumer.
```tsx
<RichText as="p">{t.raw('key') as string}</RichText>
```
Tags : `p`, `div`, `span`, `blockquote`, `cite`.

---

### `<DividedList>` / `<DividedRow>`
```tsx
<DividedList topBorder="ink">
  <DividedRow columns="1fr 2fr" gap={40} py={32}>
    <span className="t-mono-label">Label</span>
    <p className="t-body">Contenu</p>
  </DividedRow>
</DividedList>
```
Liste avec séparateurs horizontaux. `topBorder`: `"ink"` (pleine) | `"rule"` (discret).

---

### `<DashLines>`
```tsx
<DashLines variant="grid" stroke="#FFE7C9" opacity={0.4} style={{ position: 'absolute', inset: 0 }} />
```
Décoration SVG absolute. `variant`: `"grid"` (lignes diagonales) | `"arc"` (courbes organiques). Utilisé en background décoratif sur fonds sombres.

---

## Animations

```css
@keyframes float   /* translateY 0 → -8px → 0 */
@keyframes blink   /* opacity 1 → 0 → 1 */
```

Transitions standard boutons : `transform 200ms cubic-bezier(0.2, 0, 0, 1)`. Easing départ rapide / arrivée douce.

---

## Règles absolues

1. Aucune couleur hex hors de `src/styles/tokens.css`.
2. `dangerouslySetInnerHTML` uniquement dans `RichText.tsx`.
3. Moutarde et bourgogne ne cohabitent jamais dans le même `<section>`.
4. Texte sur fond sombre → `var(--color-dark-fg)`, jamais `#fff`.
5. Fonds blancs → `var(--color-paper)`, jamais `#fff` ou `white`.
6. `t-accent` dans les h1 seulement. `t-accent-serif` dans les h2 seulement.
7. `Tag accent` sur fonds clairs. `Tag onDark` sur fonds sombres.
8. La flèche `→` dans un `<Button>` est animée automatiquement — ne pas la gérer manuellement.
