# @arianeguay/design-system

Shared design system — portfolio, Studio Foundation Web, Little Chef.

Stack: TypeScript · React 19 · tsup (ESM + CJS) · CSS custom properties

---

## Consumer setup

The package is published on **GitHub Packages**, not npm. Authentication is required even for public packages.

### 1. Create a GitHub token

Generate a [Personal Access Token](https://github.com/settings/tokens/new) with the `read:packages` scope.

### 2. Configure `.npmrc`

Add this to the `.npmrc` at the root of your project:

```ini
@arianeguay:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` as an environment variable locally and in your CI/deployment platform.

### 3. Install

```bash
pnpm add @arianeguay/design-system
```

### 4. Import

Import the global styles once at your app root:

```tsx
import '@arianeguay/design-system/styles';
```

Then use components:

```tsx
import { Button, Tag, WarmSection } from '@arianeguay/design-system';
```

### Local dev (workspace)

If you're working inside the `arianeguay/workspace` monorepo, use the workspace protocol instead:

```json
"@arianeguay/design-system": "workspace:*"
```

---

## What's in the package

### Styles (`@arianeguay/design-system/styles`)

Global CSS that must be imported once at the app root. Includes:

- **`tokens.css`** — CSS custom properties: colors, font stacks, fluid type scale, spacing
- **`typography.css`** — Utility classes: `.t-h1`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-eyebrow`, `.t-body`, `.t-accent`, `.t-accent-serif`, `.t-mono-label`, `.t-quote`, `.t-link-subtle`, `.t-link-glass`
- **`layout.css`** — Layout utilities: `.container`, `.section`, `.section-sm`, `.section-lg`, `.page-grid`, `.grid-2`, `.flex-row`, `.flex-col`, `.bg-cream`, `.bg-paper`, `.bg-dark`, `.stack`, `.rule`

### Components

| Component | Description |
|---|---|
| `Button` | Variants: `primary`, `mustard`, `terra`, `outline`, `ghost`. Accepts `LinkComponent` prop for framework-specific routing (Next.js Link, React Router, etc.) |
| `Tag` | Mono label tag. Props: `accent`, `onDark` |
| `WarmSection` | Section wrapper with background variants: `paper`, `paperWarm`, `cream`, `dark`. Accepts `py` for vertical padding and `texture` for SVG texture overlays |
| `SectionHeader` | Eyebrow + h2 + lead paragraph with FadeIn. Props: `tag`, `title`, `lead`, `size` |
| `PageHero` | Page hero with optional two-column layout. Props: `eyebrow`, `title`, `lead`, `ctas`, `right` |
| `FadeIn` | Intersection Observer fade-in wrapper. Respects `prefers-reduced-motion` |
| `RichText` | Safe wrapper for HTML strings from controlled sources (translation files). Never use with user input |
| `YamlPreview` / `YamlPreviewDark` | Syntax-highlighted YAML block. Use the `Y` helper for token coloring |
| `DividedList` | List with horizontal rules between items |
| `DashLines` | Decorative dashed line element |
| `CodeBlock` | Code block with dark background |

---

## Conventions

### Color palette — 70 / 20 / 10

| Share | Role | Tokens |
|---|---|---|
| 70% | Neutral warm backgrounds | `--color-cream`, `--color-paper`, `--color-paper-warm` |
| 20% | Primary accent | `--color-terra`, `--color-terra-deep`, `--color-terra-soft` |
| 10% | Punctuation — one per zone, never together | `--color-mustard`, `--color-bourgogne` |

Each accent has a distinct semantic function:

- **terra** — brand presence, base accent. Used frequently.
- **mustard** — call to engagement. Max 1 per page.
- **bourgogne** — brand positioning gravity. Ultra-rare, nearly locked to the footer tagline.

Mustard and bourgogne must never coexist in the same zone — they carry opposite meanings ("act now" vs "founding promise").

### Typography

Three accent patterns, each with exclusive contexts:

- `.t-accent` — color only, for a word in an h1 hero
- `.t-accent-serif` — Fraunces italic, for a word in a section h2
- `.t-wordmark` — Fraunces upright, for the site wordmark (not in this package — each site has its own)

### Dark mode

Tokens remap automatically via `prefers-color-scheme: dark`. The remapping is perceptual, not mechanical — each accent preserves its visual weight in the dark environment, not its hex value. Never "correct" a dark mode token toward its light mode value.

### What stays per project (not in this package)

- **Wordmark** — each site has its own (`Ariane Guay.`, `studio:`, etc.)
- **Contextual textures** — organic shapes for the portfolio, dot grid for Studio Foundation Web
- **Full pages and site-specific components**

### Button — framework routing

`Button` accepts a `LinkComponent` prop so internal links work with any router:

```tsx
import Link from 'next/link';
import { Button } from '@arianeguay/design-system';

<Button href="/about" LinkComponent={Link}>À propos →</Button>
```

Default is a plain `<a>` tag. The ` →` suffix is automatically animated if present in children.

### Overriding tokens

Override any token at the `:root` level in your app's global CSS:

```css
:root {
  --color-terra: #b85a38; /* site-specific adjustment */
}
```

---

## Publishing

Releases are published automatically to GitHub Packages when a GitHub Release is created. The workflow is in [`.github/workflows/publish.yml`](.github/workflows/publish.yml).

To release a new version:

1. Bump the version in `package.json`
2. Commit and push
3. Create a GitHub Release with the matching tag (e.g. `v0.2.0`)
