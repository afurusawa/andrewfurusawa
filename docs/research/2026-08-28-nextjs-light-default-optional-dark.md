# Light-default optional-dark theming in Next.js App Router

**Issue:** [Research light-default optional-dark theming in Next.js App Router](https://github.com/afurusawa/andrewfurusawa/issues/69)  
**Parent map:** [Wayfinder: homepage rebuild from the capabilities page](https://github.com/afurusawa/andrewfurusawa/issues/66)  
**Date:** 2026-08-28  
**Scope:** Best-fit, current App Router approach for **light default with optional dark** in this codebase — first paint / FOUC, `class` vs `prefers-color-scheme`, CSS variables, `next/font`, and how a rebuilt `/` toggle would interact with the existing `.dark` class on `<html>` that `/90s` opts out of. Primary sources only. Research — does not implement theming, restyle `/90s`, or rewrite `PLAN.md`.

## Short answer

Keep **light as the absence of a class** and **dark as an explicit `.dark` class**, driven by a user toggle, **not** by `@media (prefers-color-scheme)`. Persist the opt-in in `localStorage`. Apply the class **before first paint** with a tiny **parser-blocking inline `<script>`** in the root layout (not `next/script`, not a `useEffect` after hydration). Scope dark **tokens and Tailwind `dark:`** so they only fire under that class. Keep the script’s `/90s` path a no-op that **strips** `.dark`, and have `(portfolio)` chrome **remove `.dark` on unmount**, because the root layout persists across client navigations.

Do **not** read a theme cookie in the root layout (`cookies()` opts the route into dynamic rendering). Do **not** add `next-themes` or follow the OS on first visit. Treat a second type family that only exists in dark as a **transfer-budget** decision: `next/font` preloads every font whose module is used from the layout that wraps the route.

---

## 1. What this repo already does

Verified in code:

| Fact | Source |
| --- | --- |
| Root layout is non-visual: `<html lang="en">`, `next/font` CSS variables on `<html>`, `globals.css`, metadata, Speed Insights. No `.dark`, no `color-scheme`. | [`app/layout.tsx`](../../app/layout.tsx) |
| Modern presentation chrome, including `ThemeToggle`, lives in the `(portfolio)` group. | [`app/(portfolio)/layout.tsx`](../../app/(portfolio)/layout.tsx), [`docs/MAP.md`](../MAP.md) |
| `ThemeToggle` is a Client Component. On mount it reads `localStorage.theme === 'dark'` and then `document.documentElement.classList.add('dark')`. Light is the absence of `.dark`. Persistence writes `'dark'` or `'light'`. | [`app/components/ThemeToggle.tsx`](../../app/components/ThemeToggle.tsx) |
| Tokens live as custom properties on `:root`, overridden under `.dark`. Headings/body/type also switch families under `.dark`. | [`app/globals.css`](../../app/globals.css) |
| Some modern-presentation markup also uses Tailwind `dark:` utilities. | e.g. [`app/config/profileLinks.ts`](../../app/config/profileLinks.ts), [`app/components/ContactSection.tsx`](../../app/components/ContactSection.tsx) |
| Tailwind v4 is on, with **no** `@custom-variant dark`. | [`package.json`](../../package.json) (`tailwindcss` `^4`), [`app/globals.css`](../../app/globals.css) (`@import "tailwindcss"`) |
| `/90s` layout is a CSS-module wrapper (`.experiment`) and does not import portfolio components. | [`app/90s/layout.tsx`](../../app/90s/layout.tsx), [`app/90s/nineties.module.css`](../../app/90s/nineties.module.css) |
| Four Google faces are loaded in a shared module and applied on `<html>` from the **root** layout. | [`app/config/fonts.ts`](../../app/config/fonts.ts) |
| Performance budgets: mobile p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; ≤ 500 KB initial transfer, ≤ 150 KB initial JS. A new font or client island is a budget decision. WCAG 2.2 AA on every route. Motion respects `prefers-reduced-motion`. | [`docs/MAP.md`](../MAP.md) |
| CSP allows `'unsafe-inline'` scripts. | [`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts) |

Architecture constraint that governs every option: **anything added to the root layout appears on `/` and `/90s`**. The route-group seam exists so portfolio chrome cannot leak onto the experiment. [`docs/MAP.md`](../MAP.md)

Current first-paint behaviour: server HTML is always light. Dark is applied in `useEffect`, which runs **after** hydration. A returning visitor with `localStorage.theme === 'dark'` therefore paints light, then flips — a flash of the wrong color scheme. The toggle also never reads `prefers-color-scheme`. That FOUC was already noted in [Portfolio quality audit](2026-07-30-portfolio-quality-audit.md).

There is a second, quieter mismatch: Tailwind v4’s `dark` variant **defaults to `prefers-color-scheme`**, unless overridden. [Tailwind CSS: Dark mode](https://tailwindcss.com/docs/dark-mode). This repo’s hand-written tokens use `.dark`, but `dark:` utilities still follow the OS. A dark-OS visitor on the light default can get a mixed page. A rebuilt `/` must pick **one** switch.

---

## 2. Light default vs `prefers-color-scheme`

The map’s standing preference is **light default, optional dark** — not “follow the OS, with a toggle.” That policy is the discriminator.

**`prefers-color-scheme`** is a discrete media feature whose values are `light` and `dark`. `light` also covers “the user has not expressed an active preference (and thus should receive the **web default of a light theme**).” [Media Queries Level 5, §12.5](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)

So CSS that only uses:

```css
:root { /* light tokens */ }
@media (prefers-color-scheme: dark) { :root { /* dark tokens */ } }
```

gives **OS-driven dark with no author override**. That is first-paint-correct (the UA applies it while parsing CSS; no JS) and JS-disabled-correct. It cannot implement “optional dark”: a user on a dark OS cannot stay on the light presentation, and a user on a light OS cannot opt into dark, without a class/`data-*` override sitting **above** the media query.

The CSS Color Adjustment spec is explicit that `prefers-color-scheme` is how pages *adapt* to the user’s preferred scheme, and that `color-scheme` is a **separate** property for UA-provided UI (scrollbars, form controls, canvas). Authors who want particular page colors must specify them; pairing system colors with author colors does not guarantee contrast. [CSS Color Adjustment Module Level 1, §2 and §2.1](https://www.w3.org/TR/css-color-adjust-1/#color-scheme-prop)

**Class (or `data-theme`) strategy:** light tokens on `:root`; dark tokens under `.dark` (or `[data-theme="dark"]`). First paint is light unless something adds the class before paint. A toggle can force dark regardless of OS. JS-disabled users stay on light — which matches “optional.”

Tailwind documents the same fork: default `dark:` = media query; manual toggling = override the variant to a selector such as `&:where(.dark, .dark *)`. [Tailwind CSS: Toggling dark mode manually](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)

**Recommendation:** class strategy. Use `prefers-color-scheme` only as a **non-default** hint if a later spec wants a “system” third state — not as the homepage default.

---

## 3. First paint / FOUC in the App Router

### Why `useEffect` flashes

Layouts and pages are Server Components by default. HTML is sent first; Client Components hydrate afterward. `localStorage` is a browser API, so it belongs in a Client Component. [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

`ThemeToggle` therefore cannot know the stored preference during SSR/SSG. The first frame is always the server HTML (light). Adding `.dark` in `useEffect` is too late.

### Cookie on the server (rejected for this site)

`cookies()` can read a theme cookie in a Server Component and put `class="dark"` on `<html>` in the SSR HTML. That eliminates FOUC **and** hydration mismatch. But `cookies` is a request-time API: **using it in a layout or page opts the route into dynamic rendering**. [Next.js: `cookies()`](https://nextjs.org/docs/app/api-reference/functions/cookies)

This portfolio is static substance, no CMS, no auth. Making the **root** layout dynamic to paint an optional color scheme is the wrong trade: every route, including `/90s`, would pay request-time rendering for a preference that only the modern presentation uses.

A cookie scoped with `path=/` would also be sent on `/90s`. Setting `path=/` and then branching in the root layout still runs on experiment requests.

### `next/script` (wrong tool)

`next/script` with `strategy="beforeInteractive"` injects into `<head>`, loads before Next.js modules, and **must live in the root layout** (so it runs on every route). Execution **does not block hydration**. Scripts with this strategy **run once per document load**; client-side navigation does not run them again. [Next.js: Script `beforeInteractive`](https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive)

That is designed for third-party bootstrapping (bot detectors, consent), not for a synchronous class mutation before first paint.

### Parser-blocking inline `<script>` (recommended)

A classic inline `<script>` in the root layout’s `<head>` (or as the first child of `<html>` before `<body>`) runs while the HTML is parsed, **before** the rest of the body is painted. HTML treats classic scripts without `async`/`defer` as parser-blocking. [HTML Standard — script / parser-blocking scripts](https://html.spec.whatwg.org/multipage/scripting.html)

Because this CSP already includes `script-src ... 'unsafe-inline'`, an inline snippet is allowed. [`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts)

The snippet should be **narrow**:

1. If `location.pathname` is `/90s` or starts with `/90s/`, **remove** `.dark` and stop. The experiment must not inherit a homepage opt-in.
2. Else if `localStorage.getItem('theme') === 'dark'`, add `.dark` on `document.documentElement`.
3. Do **not** treat `prefers-color-scheme: dark` as dark. That would violate light-default.
4. Wrap `localStorage` in `try/catch` (it can throw).

Mutating `<html className>` before hydration disagrees with the server HTML. React documents `suppressHydrationWarning` on `<html>` for exactly this text-content / attribute mismatch. Use it on `<html>` only.

This is the same pattern Tailwind sketches (“best to add inline in `head` to avoid FOUC”), minus their OS-fallback clause. [Tailwind CSS: With system theme support](https://tailwindcss.com/docs/dark-mode#with-system-theme-support)

**Client navigations:** the root layout does not remount, and a blocking script does not re-run. [Next.js: Script `beforeInteractive` good-to-know](https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive). The rebuilt toggle (a Client Component in `(portfolio)/layout.tsx`) must:

- On mount (modern presentation): apply stored dark if needed (the inline script already did this on full load; mount still matters after client nav from `/90s` → `/`).
- On **unmount**: `classList.remove('dark')` so a dark `/` does not leak into `/90s`.

JS disabled: no script, no toggle, light default. Acceptable for optional dark.

---

## 4. CSS variables, `color-scheme`, and Tailwind

**Tokens:** CSS custom properties cascade and inherit; a `.dark` ancestor redefines them for descendants. [CSS Custom Properties for Cascading Variables Level 1](https://www.w3.org/TR/css-variables-1/)

Keep light values on `:root`. Put dark values on `.dark` (or on a presentation wrapper that *is* `.dark`). Do not put dark values in `@media (prefers-color-scheme: dark)` unless the spec later adds a system state.

**`color-scheme`:** set `color-scheme: light` on `:root` so UA chrome (canvas, scrollbars, form controls) matches the light default even when the OS is dark. Under `.dark`, set `color-scheme: dark`. The used scheme on the **root** element also affects the canvas and viewport scrollbars. [CSS Color Adjustment, §2.1–2.2](https://www.w3.org/TR/css-color-adjust-1/#color-scheme-prop)

If `.dark` lives only on an inner wrapper, the **canvas** may stay light while the page is dark. For a full-viewport dark homepage that is a real gap; for `/90s` isolation it is a reason **not** to leave `.dark` on `<html>` without a strip on experiment routes. The recommended pair is: class **may** sit on `<html>` for canvas/`color-scheme`, **and** the inline script plus portfolio unmount **must** clear it on `/90s`.

**Tailwind v4:** add `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css` so `dark:` tracks the same switch as the custom properties. Without it, `dark:` stays OS-tied. [Tailwind CSS: Toggling dark mode manually](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)

A `data-theme="dark"` attribute is equivalent. This repo already uses `.dark`; staying on the class avoids renaming every selector.

---

## 5. `/90s` opt-out and a rebuilt `/` toggle

Share substance, never chrome. `/90s` must not inherit a new homepage toggle. [`docs/MAP.md`](../MAP.md), [`CONTEXT.md`](../../CONTEXT.md) (presentation / chrome)

Today the leak paths if `.dark` is on `<html>` while the experiment is showing:

- Global `.dark { … }` token overrides and `.dark h3` / `.dark svg` rules in [`app/globals.css`](../../app/globals.css).
- Tailwind `dark:` utilities anywhere under `<html class="dark">`.
- `body { background: var(--background); color: var(--foreground); }` picking up redefined variables (canvas around `.experiment`).
- Root `color-scheme: dark` restyling viewport scrollbars.

`.experiment` redefines its own custom properties and type, which is why the experiment *mostly* looks independent — but it does **not** cancel global `.dark` descendant rules or the canvas. [`app/90s/nineties.module.css`](../../app/90s/nineties.module.css)

**Do not** put the toggle in `app/layout.tsx`. Keep it in `(portfolio)` chrome, as now.

**Do not** introduce a root `ThemeProvider` that wraps `{children}` for the whole app. Next.js even advises rendering providers as deep as possible so static Server Component output stays optimizable. [Next.js: Context providers](https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers)

Recommended isolation (all of these, not one):

1. Blocking script: no-op + strip `.dark` when the path is under `/90s`.
2. Portfolio toggle island: remove `.dark` on unmount; re-apply from `localStorage` on mount.
3. Keep experiment CSS as a closed module; do not import the toggle or portfolio token sheets into `app/90s/`.
4. Align Tailwind `dark:` with the class so a leaked class is the *only* switch (and it is stripped).

Putting `.dark` on a `(portfolio)` wrapper instead of `<html>` also isolates the experiment on client navigations **without** a strip, but then root `color-scheme` / canvas stay light on a dark homepage. Prefer `<html class="dark">` plus strip, unless a prototype shows canvas flash into `/90s` that the strip does not catch.

---

## 6. `next/font` and dual color schemes

`next/font/google` self-hosts at build time (no Google runtime request), subsets, and injects a preload when `preload` is true (the default) for specified `subsets`. `display` defaults to `'swap'`. `adjustFontFallback` defaults to `true` to reduce CLS. [Next.js: Font module](https://nextjs.org/docs/app/api-reference/components/font)

**Preload scope is the layout that uses the font.** A font used from the **root** layout is preloaded on **all** routes. A font used from a nested layout is preloaded on the routes that layout wraps. Next.js recommends using multiple fonts conservatively: each face is another download. [Next.js: Using multiple fonts / Preloading](https://nextjs.org/docs/app/api-reference/components/font#using-multiple-fonts)

This repo currently loads four non-variable 400-weight latin faces in [`app/config/fonts.ts`](../../app/config/fonts.ts) and stamps every `variable` onto `<html>` in the root layout. Light uses DM Serif Display / Spectral / Contrail One; dark swaps header and body to VT323. `/90s` uses `--font-vt323` inside `.experiment`. **Every route therefore preloads every family**, including faces the first paint will not use.

Implications for a rebuilt `/` (do not pick faces here):

- A **shared** family across light and dark is one transfer, both schemes. That is the cheap dual-scheme option.
- A **dark-only** extra family is a second file. With `display: 'swap'` it can still shift glyphs after paint (CLS pressure against the ≤ 0.1 budget). `display: 'optional'` reduces swap/CLS at the cost of often never applying the face on slow networks. [Next.js: `display`](https://nextjs.org/docs/app/api-reference/components/font#display)
- Applying homepage faces from `(portfolio)/layout.tsx` (or only on `/`) keeps them off `/90s` preloads. Experiment faces belong in `app/90s/` layout, not on root `<html>`.
- `variable: '--font-…'` plus `font-family: var(--font-…)` is how Next documents Tailwind integration; this repo’s `globals.css` still names families as string literals (`'DM Serif Display'`, `'VT323'`, …) while the loader also exposes unused CSS variables. A rebuild should consume the `next/font` variables so fallback metrics from `adjustFontFallback` actually apply.
- Variable fonts are recommended when a face exists in that form (one file, many weights). [Next.js: Fonts getting started](https://nextjs.org/docs/app/getting-started/fonts)

A new face **or** a fifth `'use client'` island is a budget decision against ≤ 500 KB transfer and ≤ 150 KB initial JS. [`docs/MAP.md`](../MAP.md). The toggle itself must stay a small Client Component (state, click, `localStorage`). Do not mark `(portfolio)/layout.tsx` `'use client'` just to host it.

---

## 7. Accessibility constraints the spec must keep

- **WCAG 2.2 AA** on both palettes: contrast of text and UI (1.4.3 / 1.4.11) is luminance-based; “optional dark” is not an exemption. Specify foreground **and** background together when either is specified. [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- The control needs an accessible name and pressed state (the current `aria-label` / `aria-pressed` pattern is the right shape; do not rely on color alone).
- Motion stays behind `prefers-reduced-motion` (already used for `.animate-swirl`). [Media Queries Level 5 — `prefers-reduced-motion`](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion)
- `color-scheme` on the root reduces unreadable UA widgets when the page is dark; it does not replace authored contrast.

---

## 8. Recommended default for the spec

For the homepage rebuild spec, lock this default:

1. **Policy:** first visit is **light**, including when the OS is dark. Dark is an **opt-in** persisted as `localStorage.theme === 'dark'`. No third “system” state unless a later ticket adds one.
2. **Switch:** a `.dark` class. Light = class absent. Align **both** custom properties and Tailwind `dark:` to that class (`@custom-variant dark (&:where(.dark, .dark *));`).
3. **Tokens:** CSS variables on `:root`, overridden under `.dark`. Set `color-scheme: light` on `:root` and `color-scheme: dark` on `.dark`.
4. **First paint:** parser-blocking inline `<script>` in the root layout that adds `.dark` only for that stored opt-in, and **strips** it under `/90s`. `suppressHydrationWarning` on `<html>`. Not `useEffect`, not `next/script`, not `cookies()`.
5. **Chrome:** rebuilt toggle lives only in `(portfolio)` as a Client island. It writes `localStorage`, toggles `.dark` on `document.documentElement`, and **removes `.dark` on unmount**. Do not reuse the current `ThemeToggle` as a visual baseline (map Notes); reuse the **mechanism**.
6. **Experiment:** no toggle, no homepage dark tokens, no new root visual chrome. Path-guard the script; do not restyle `/90s`.
7. **Fonts:** `next/font` with faces applied from the presentation layout that needs them, not blindly on root. Prefer one family set for both homepage schemes unless a prototype proves a second face is worth the transfer. Measure against the live budgets. Do not pick faces in this ticket.
8. **JS-disabled:** light, no toggle. That is the correct fallback for optional dark.

### Rejected alternatives

| Alternative | Why not |
| --- | --- |
| `@media (prefers-color-scheme: dark)` as the homepage driver | Implements “follow OS”, not “light default, optional dark”. Users on dark OS never see the default light presentation. |
| Tailwind default `dark:` (media) plus a class for tokens | Split brain: OS-dark + class-light paints mixed UI. Already true in current `dark:` utilities. |
| `useEffect` / hydrated toggle only (status quo) | FOUC for returning dark visitors. Client JS is not first paint. |
| `next/script strategy="beforeInteractive"` | Root-layout-only, runs on `/90s`, does not guarantee parser-block before paint, does not re-run on client nav. |
| `cookies()` + `className` on `<html>` in root layout | Request-time API → dynamic rendering for the whole tree, including `/90s`. Overkill for a static portfolio. |
| `next-themes` (or similar) provider in root layout | Extra client JS against the 150 KB budget; wraps all presentations; still needs an inline script; fights the “root layout is non-visual” rule. |
| `color-scheme: light dark` without a class | UA/canvas follow OS; page tokens still need an author switch. Conflicts with light-default. |
| Dark-only extra webfont loaded from root `layout.tsx` | Preloaded on `/90s` and on light first paint. Dual-family dark is a budget choice, and preload must be scoped to the layout that uses it. |
| Putting the toggle or `.dark` ownership in `app/layout.tsx` as product chrome | Leaks onto the experiment. Map: anything in the root layout appears on both presentations. |

---

## Sources

- [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js: Script component](https://nextjs.org/docs/app/api-reference/components/script)
- [Next.js: `cookies()`](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [Next.js: Font module](https://nextjs.org/docs/app/api-reference/components/font)
- [Next.js: Fonts (getting started)](https://nextjs.org/docs/app/getting-started/fonts)
- [Tailwind CSS v4: Dark mode](https://tailwindcss.com/docs/dark-mode)
- [Media Queries Level 5 — `prefers-color-scheme`](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)
- [CSS Color Adjustment Module Level 1 — `color-scheme`](https://www.w3.org/TR/css-color-adjust-1/#color-scheme-prop)
- [CSS Custom Properties Level 1](https://www.w3.org/TR/css-variables-1/)
- [HTML Standard — script](https://html.spec.whatwg.org/multipage/scripting.html)
- [WCAG 2.2 Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- Repo: [`app/layout.tsx`](../../app/layout.tsx), [`app/(portfolio)/layout.tsx`](../../app/(portfolio)/layout.tsx), [`app/components/ThemeToggle.tsx`](../../app/components/ThemeToggle.tsx), [`app/globals.css`](../../app/globals.css), [`app/config/fonts.ts`](../../app/config/fonts.ts), [`app/90s/layout.tsx`](../../app/90s/layout.tsx), [`app/90s/nineties.module.css`](../../app/90s/nineties.module.css), [`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts), [`docs/MAP.md`](../MAP.md)
