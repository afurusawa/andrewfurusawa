# Next.js patterns for an isolated `/90s` experiment route

**Issue:** [#19 — Research Next.js patterns for an isolated /90s experiment route](https://github.com/afurusawa/andrewfurusawa/issues/19)  
**Parent map:** [#15 — Wayfinder: 90s experiment design spec for /90s](https://github.com/afurusawa/andrewfurusawa/issues/15)  
**Date:** 2026-07-30  
**Scope:** Facts and trade-offs only. Not a product decision. Not an implementation.

## Short answer

Next.js App Router can host `/90s` as a normal nested route (`app/90s/page.tsx` + optional `app/90s/layout.tsx`). That is the lowest-friction path, but **this repo’s root layout currently wraps every route** with portfolio chrome (theme toggle, swirl background, main padding, global fonts, and `globals.css`), so a nested layout alone does **not** fully isolate the experiment. Stronger isolation requires either (a) refactoring the root layout so portfolio chrome is opt-in for `/` only, or (b) splitting into **multiple root layouts** via route groups. Style isolation is the main risk: global CSS and Tailwind utilities stay app-wide once imported, and Next.js does not unload stylesheets on client navigations. Secret-URL SEO controls are straightforward: route-level `robots: { index: false }`, optional `disallow` in `app/robots.ts`, and simply not listing `/90s` in `app/sitemap.ts`.

---

## 1. Route / layout structure

### Facts (Next.js)

- File-system routing: a folder `app/90s` with `page.tsx` creates the public URL `/90s`. Nested folders define nested URL segments. [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- A **layout** is shared UI for a segment and its children. Nested layouts wrap child layouts/pages via `children`. On navigation, layouts preserve state and do not re-render. [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages), [`layout.js`](https://nextjs.org/docs/app/api-reference/file-conventions/layout)
- The **root layout** is required, is the top-most layout, and **must** define `<html>` and `<body>`. Nested layouts must **not** re-declare those tags. [`layout.js` — Root Layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout)
- **Route groups** use parentheses, e.g. `app/(marketing)`, and do **not** appear in the URL. Documented use cases include organizing by concern and defining **multiple root layouts**. [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)
- Multiple root layouts: any layout with no parent `layout.js` above it is a root layout. Common approaches: route groups like `app/(shop)/layout.js` and `app/(marketing)/layout.js`, or omitting top-level `app/layout.js` so segment layouts become roots. Navigating **between** different root layouts causes a **full page load** (not client-side navigation). [`layout.js` — Root Layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout), [Route Groups — Caveats](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)
- Do not manually put `<title>` / `<meta>` in layouts; use the Metadata API. [`layout.js`](https://nextjs.org/docs/app/api-reference/file-conventions/layout)

### Patterns relevant to `/90s`

| Pattern | Shape | What it isolates | Cost |
| --- | --- | --- | --- |
| **A. Nested segment only** | `app/90s/page.tsx` + optional `app/90s/layout.tsx` under existing `app/layout.tsx` | Segment UI shell (frames chrome, experiment wrappers). Metadata/fonts can be route-specific if applied carefully. | Lowest file churn. Still inherits root chrome and global CSS. |
| **B. Nested + root slim-down** | Keep one root layout with only `<html>`/`<body>`/shared essentials; move portfolio chrome into a portfolio-only layout (e.g. `app/(site)/layout.tsx` with homepage) and experiment chrome into `app/90s/layout.tsx` | Portfolio chrome (ThemeToggle, BackgroundAnimation, `main` padding) no longer wraps `/90s`. | Requires restructuring how `/` is wrapped; still one document tree for CSS unless styles are carefully scoped. |
| **C. Multiple root layouts (route groups)** | e.g. remove shared top-level chrome layout; `app/(portfolio)/layout.tsx` + `app/(portfolio)/page.tsx` for `/`, and `app/(experiments)/90s/layout.tsx` + `page.tsx` for `/90s`, each defining its own `<html>`/`<body>` | Maximum document-level isolation (fonts on `<html>`, body classes, different root CSS imports per tree). | Larger restructure; full reload between trees; must place `/` inside a group if no top-level layout. [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) |

### Trade-offs

- **A** matches “secret URL, no homepage link”: users rarely soft-navigate `/` ↔ `/90s`, so nested inheritance is mainly about **first paint of `/90s` still carrying root chrome**, not about SPA transition polish.
- **C**’s full-page reload between roots is a non-issue for a secret experiment that is not linked from the homepage; it is actually helpful for flushing one aesthetic tree before loading another.
- Pattern **B** is often enough if the only problem is chrome leakage (toggle, swirl, padding), while CSS leakage is handled by scoping (section 2).
- Route groups alone (without multiple roots) do **not** change URLs; they only organize folders and optional shared layouts. [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)

### Repo constraint

This app has a single root layout at [`app/layout.tsx`](../../app/layout.tsx) that always renders:

- `import "./globals.css"`
- all portfolio font CSS variables on `<html>`
- `BackgroundAnimation`
- `<main className="min-h-screen p-4 sm:p-8 lg:p-16">` wrapping children
- `ThemeToggle`
- `SpeedInsights`

So **`app/90s/*` without further change is nested inside that chrome**. There are no route groups in the tree today.

---

## 2. Style isolation (Neon Cyber Basement vs live homepage)

### Facts (Next.js / CSS model)

- **Global CSS** imported in the root layout applies to **every route**. [CSS — Global CSS](https://nextjs.org/docs/app/getting-started/css)
- Global styles may be imported from any layout/page/component under `app`, but Next.js uses React stylesheet support with Suspense and **currently does not remove stylesheets as you navigate between routes**, which can cause conflicts. Docs recommend global CSS for *truly* global styles (e.g. Tailwind base), Tailwind utilities for components, and **CSS Modules** for scoped custom CSS. [CSS — Global CSS](https://nextjs.org/docs/app/getting-started/css)
- **CSS Modules** (`.module.css`) generate unique class names and avoid naming collisions. [CSS — CSS Modules](https://nextjs.org/docs/app/getting-started/css)
- **Tailwind** is installed by importing it into a global CSS file that the root layout loads. [CSS — Tailwind CSS](https://nextjs.org/docs/app/getting-started/css)
- Production CSS is chunked/minified; import order affects cascade. [CSS — Ordering and Merging](https://nextjs.org/docs/app/getting-started/css)

### What this means for isolation

| Technique | Isolates well? | Notes |
| --- | --- | --- |
| Nested layout + extra global CSS file for `/90s` only | **Weak alone** | Extra global rules can still apply after client navigation *to* the homepage if stylesheets stick; also element selectors (`h1`, `p`, `body`) affect the whole document while on `/90s`. |
| CSS Modules under `app/90s/` | **Strong for custom kitsch chrome** | Local class names; good for frames, beveled buttons, CRT overlays. |
| Wrapper class + descendant selectors (e.g. `.theme-90s h1 { … }`) | **Strong if disciplined** | Overrides portfolio globals only under the experiment root; homepage element rules still load but lose when not under wrapper. |
| Tailwind utility classes | **Shared namespace** | Utilities are available on both routes once Tailwind is global. Isolation is by *not reusing* conflicting design tokens/classes, not by route bundling. Distinct arbitrary values / CSS variables under a scope help. |
| Separate root layouts + separate global CSS imports | **Strongest document isolation** | Each root can import different base CSS; still heed “styles may not unload” if soft-navigating is ever enabled across roots (full reload between roots mitigates). |

### Repo-specific cascade risks

[`app/globals.css`](../../app/globals.css) is not a thin reset. It defines:

- `:root` and `.dark` design tokens (colors, font family names as strings, letter-spacing, text-transform)
- Element selectors: `body`, `h1`/`h2`, `h3`/`.hero-role`, `p`, `input`
- `.dark svg`, `.dark h3`, focus-visible outlines
- `.animate-swirl` used by the root background

Those rules **will style `/90s`** if the route stays under the current root layout and keeps using bare `h1`/`p` elements. Portfolio dark mode is a **document-level** `.dark` class on `<html>` from [`ThemeToggle`](../../app/components/ThemeToggle.tsx) (`document.documentElement.classList`), so if ThemeToggle remains in the shared root, visiting the homepage dark theme and then navigating to `/90s` (or vice versa) can leave `.dark` tokens active on the experiment.

### Trade-offs

- **Minimal change:** nest `/90s`, wrap content in a scoped class, use CSS Modules for chrome, carefully override or avoid bare element typography that conflicts. Accept that Tailwind + portfolio globals still load on `/90s`.
- **Medium change:** slim root layout; do not mount ThemeToggle / BackgroundAnimation / portfolio `main` padding on `/90s`; keep one `globals.css` but scope portfolio typography under a portfolio wrapper class (inverse of today’s global element selectors).
- **Max isolation:** multiple root layouts with separate CSS entry files. Highest restructure cost; cleanest “two skins, one app.”

No claim is made here about which isolation level the product wants—only that nested layout without CSS strategy **will leak** given this repo’s globals.

---

## 3. Metadata, robots / indexing, sitemap

### Facts (Next.js Metadata API)

- Export `metadata` or `generateMetadata` from `layout.js` / `page.js` (Server Components only). [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- Metadata is evaluated root → leaf and **shallowly merged**; duplicate keys are replaced by the deeper segment. Nested objects like `openGraph` and `robots` are replaced as a whole when redefined, not deep-merged field-by-field. [generateMetadata — Ordering / Merging](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- `robots` field supports `index` / `follow` (and more), emitting `<meta name="robots" …>`. Example: `robots: { index: true, follow: true }`. [generateMetadata — robots](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#robots)
- File convention `app/robots.ts` generates `robots.txt` with `allow` / `disallow` / `sitemap` / `host`. Example shows `disallow: '/private/'`. [robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- File convention `app/sitemap.ts` returns an explicit array of URLs; only listed URLs appear. [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- `metadataBase` (typically root) composes relative URLs for canonical/OG fields. [generateMetadata — metadataBase](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### Secret-URL control stack (layered, not mutually exclusive)

| Layer | Mechanism | Strength / limit |
| --- | --- | --- |
| **No homepage link** | Product choice (map already prefers secret URL) | Stops casual discovery; not a crawler guarantee. |
| **Page/layout metadata** | `robots: { index: false, follow: false }` (or `nofollow` variants) on `app/90s` | Tells cooperating crawlers not to index this URL when they fetch it. Overwrites root `robots` for that route via shallow merge. |
| **robots.txt** | `disallow: '/90s'` (or `/90s/`) in [`app/robots.ts`](../../app/robots.ts) | Discourages crawling; crawlers that ignore robots.txt still can fetch. Does not remove a URL already known. Official API supports `disallow`. [robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) |
| **Sitemap omission** | Do not add `/90s` to [`app/sitemap.ts`](../../app/sitemap.ts) | Sitemap is opt-in list today (only homepage). Omission avoids advertising the URL; does not forbid indexing if discovered. [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) |
| **Canonical** | Set `alternates.canonical` for `/90s` if the page is indexable later; for a secret WIP, still override root `canonical: "/"` so `/90s` does not claim the homepage as canonical incorrectly | Root currently sets `canonical: "/"`. Child should replace `alternates` if experiment is public-facing at all. |

### Repo state

- Root metadata ([`app/layout.tsx`](../../app/layout.tsx)): `metadataBase`, site title/description, `alternates.canonical: "/"`, Open Graph / Twitter, **`robots: { index: true, follow: true }`**.
- [`app/robots.ts`](../../app/robots.ts): `userAgent: "*"`, **`allow: "/"` only** (no disallow list), points at sitemap and host via `absoluteUrl`.
- [`app/sitemap.ts`](../../app/sitemap.ts): single entry for the site root only.

### Trade-offs

- **Metadata `noindex` alone** is the usual “don’t rank this WIP page” control and matches Next’s first-class API; combine with sitemap omission for a secret experiment.
- **robots.txt disallow** is optional extra; useful if the path should not even be crawled, but it is coarser and does not replace meta robots for pages already discovered.
- **“Secret” is not authentication.** Public URL remains fetchable. No Next.js metadata API provides password protection; that would be separate (headers/middleware/auth)—out of scope of this research question.
- If `/90s` later becomes public, reverse: allow crawl, add sitemap entry, set indexable metadata and its own canonical/OG.

---

## 4. Font loading and client-component boundaries (kitsch UI)

### Fonts — facts

- `next/font` (Google or local) self-hosts fonts at build time; no browser requests to Google. [Font Optimization](https://nextjs.org/docs/app/getting-started/fonts), [Font Module](https://nextjs.org/docs/app/api-reference/components/font)
- Apply via `className`, `style`, or CSS `variable` on an element. [Font Module — Applying Styles](https://nextjs.org/docs/app/api-reference/components/font)
- **Preload scope:** font used only on a page preloads on that route; used in a layout preloads for all routes that layout wraps; used in **root layout preloads on all routes**. [Font Module — Preloading](https://nextjs.org/docs/app/api-reference/components/font)
- Docs recommend loading fonts conservatively; each font is extra download. Multiple fonts can live in a shared definitions file and be applied only where needed. [Font Module — Using Multiple Fonts](https://nextjs.org/docs/app/api-reference/components/font)
- `display: 'swap'` (and other `font-display` values) is supported; default is `swap`. [Font Module — display](https://nextjs.org/docs/app/api-reference/components/font#display)
- `preload: false` is available when a font should not be preloaded. [Font Module — preload](https://nextjs.org/docs/app/api-reference/components/font#preload)

### Fonts — implications for `/90s`

- **Kitsch-only faces** should be defined in (or imported only from) the `/90s` layout/page so they are not preloaded on the live homepage. Putting them into the current root [`app/config/fonts.ts`](../../app/config/fonts.ts) + applying on `<html>` would load them site-wide.
- Reusing existing families (e.g. VT323 already used in portfolio dark theme) can share the same `next/font` instance if imported from one module—avoid double-instantiating the same Google font loader in two places if sharing is intentional. [Font Module — font definitions file](https://nextjs.org/docs/app/api-reference/components/font)
- Repo CSP ([`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts)) has `font-src 'self' data:`. That is compatible with `next/font` self-hosting; **incompatible with loading fonts from third-party CDNs** without a CSP change. Headers apply to `/:path*` via [`next.config.ts`](../../next.config.ts).

### Client / Server boundaries — facts

- Layouts and pages are **Server Components by default**. Use Client Components for state, events, lifecycle, browser APIs. [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- `"use client"` creates a client boundary; **imports and directly rendered components under that file enter the client bundle**. Prefer small interactive leaves over marking whole pages. [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- `metadata` / `generateMetadata` **only work in Server Components**—keep `page.tsx`/`layout.tsx` as servers and extract interactive kitsch into client children. [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### Client boundaries — kitsch UI implications

| UI kind | Typical boundary |
| --- | --- |
| Static frames, copy, skill lists, faux hit counters as static text | Server Component / static markup |
| Marquee-like motion via **CSS only** | Server markup + CSS (no client JS required) |
| Clickable chrome that toggles panels, fake window drag, client timers, `localStorage` | Client Component leaf |
| Theme / document `classList` on `<html>` | Client Component (as current ThemeToggle); avoid putting that in shared root if `/90s` must ignore portfolio theme |

### Repo state

- Root layout is a Server Component importing client `ThemeToggle`.
- Homepage [`app/page.tsx`](../../app/page.tsx) is currently a Server Component (no `'use client'`).
- Interactive pieces already follow leaf pattern in places (`ThemeToggle`, skills filter context).

---

## 5. Constraints from *this* repo’s `app/` setup

| Area | Current fact | Effect on `/90s` |
| --- | --- | --- |
| Framework | Next.js `15.5.22`, App Router, React 19 ([`package.json`](../../package.json)) | App Router file conventions above apply. |
| Routes | Only `/` page plus `robots` / `sitemap` specials; no `app/90s` yet | Adding `app/90s/page.tsx` is sufficient to create the route. |
| Root layout | Portfolio chrome always on ([`app/layout.tsx`](../../app/layout.tsx)) | Nested experiment inherits padding, toggle, swirl, SpeedInsights. |
| Global CSS | Tailwind v4 `@import "tailwindcss"` + element-level theme ([`app/globals.css`](../../app/globals.css), [`postcss.config.mjs`](../../postcss.config.mjs)) | Strong cascade coupling between sites unless scoped or split. |
| Fonts | Four Google fonts as CSS variables on `<html>` ([`app/config/fonts.ts`](../../app/config/fonts.ts)) | Homepage fonts available on `/90s`; new fonts should not be root-applied if isolation/perf matter. |
| Theme | `.dark` on `documentElement` + localStorage ([`ThemeToggle.tsx`](../../app/components/ThemeToggle.tsx)) | Document-global; conflicts with “dark Neon Cyber Basement only” experiment if shared. |
| SEO files | Allow-all robots; sitemap = homepage only ([`robots.ts`](../../app/robots.ts), [`sitemap.ts`](../../app/sitemap.ts)) | Easy to keep `/90s` out of sitemap; robots currently does not disallow anything. |
| Site constants | `SITE_URL = https://andrewfurusawa.dev` ([`site.ts`](../../app/config/site.ts)) | Absolute URLs for robots/sitemap/metadata already centralized. |
| Security headers | CSP + other headers on all paths ([`securityHeaders.ts`](../../app/config/securityHeaders.ts), [`next.config.ts`](../../next.config.ts)) | External font/script CDNs need CSP updates; `next/font` and self assets OK. `style-src 'self' 'unsafe-inline'` allows typical Next/Tailwind inline. |
| Analytics | Vercel Speed Insights in root layout | Will run on `/90s` if root unchanged—usually desirable, not a style leak. |
| Route groups | None | Multiple-root-layout pattern requires introducing groups and relocating `/`. |

---

## Synthesis of options (not a decision)

For a **secret, parallel** experiment that must not disturb the live homepage:

1. **Routing:** Prefer at least `app/90s/layout.tsx` + `page.tsx`. Treat full multi-root split as optional escalation if root chrome/CSS cannot be slimmed.
2. **Chrome:** Either slim the root layout (pattern B) or accept temporary chrome on `/90s` during early prototypes—but root ThemeToggle + element globals are real visual contaminants for “Neon Cyber Basement only.”
3. **CSS:** Do not rely on a second global CSS file alone for isolation; prefer CSS Modules + a scoped root class; consider refactoring portfolio element selectors to a portfolio scope over time if both skins coexist long-term.
4. **SEO:** On `/90s`, set `robots: { index: false, follow: false }`, keep sitemap without `/90s`, optionally `disallow` in `robots.ts`. Override title/description/canonical so root homepage metadata does not mislabel the experiment.
5. **Fonts / JS:** Load kitsch fonts in the `/90s` layout only; keep `metadata` on Server Components; confine interactive kitsch to small Client Components.

---

## Sources

### Official Next.js

- [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [`layout.js` API](https://nextjs.org/docs/app/api-reference/file-conventions/layout)
- [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)
- [CSS](https://nextjs.org/docs/app/getting-started/css)
- [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Metadata files overview](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Font Module API](https://nextjs.org/docs/app/api-reference/components/font)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

### This repository (inspected 2026-07-30)

- [`app/layout.tsx`](../../app/layout.tsx)
- [`app/page.tsx`](../../app/page.tsx)
- [`app/globals.css`](../../app/globals.css)
- [`app/config/fonts.ts`](../../app/config/fonts.ts)
- [`app/config/site.ts`](../../app/config/site.ts)
- [`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts)
- [`app/robots.ts`](../../app/robots.ts)
- [`app/sitemap.ts`](../../app/sitemap.ts)
- [`app/components/ThemeToggle.tsx`](../../app/components/ThemeToggle.tsx)
- [`app/components/BackgroundAnimation.tsx`](../../app/components/BackgroundAnimation.tsx)
- [`next.config.ts`](../../next.config.ts)
- [`package.json`](../../package.json)
- [`postcss.config.mjs`](../../postcss.config.mjs)
