# Agent context map

Path inventory. **Read the one section you need, not the whole file.** For why the system is shaped this way, read [`MAP.md`](MAP.md) instead.

_Last updated: 2026-09-05._

## Routes and layouts

| Path | Holds |
|------|-------|
| `app/(portfolio)/layout.tsx` | Portfolio root layout and metadata. Delegates the document shell to `shell.tsx`. |
| `app/(portfolio)/shell.tsx` | Portfolio `<html>` and `<body>`, four-family fonts, `next-themes`, theme control, skip link, theme-color meta, global CSS, and Speed Insights. |
| `app/(portfolio)/theme.tsx` | Portfolio theme provider, hand-written control, and scheme-aware theme-color meta. |
| `app/(portfolio)/fonts.ts` | Portfolio font loaders: Inter, IBM Plex Mono, and self-hosted Fraunces. Newsreader is the public latin cut. |
| `app/(portfolio)/fonts/Fraunces-opsz-400-latin.woff2` | Self-hosted Fraunces latin cut at weight 400 with optical sizing. |
| `app/(portfolio)/fonts/Fraunces-og-400-latin.woff` | Static latin Fraunces woff for the built share image (`next/og` cannot take woff2). |
| `app/(portfolio)/fonts/IBMPlexMono-og-400-latin.woff` | Static latin IBM Plex Mono woff for the built share image. |
| `app/(portfolio)/opengraph-image.tsx` | Built share card for `/` — Recent work field, `violet-900`, always dark. |
| `app/(portfolio)/share-portrait.jpg` | Portrait used by the share image. |
| `app/(portfolio)/page.tsx` | The public homepage `/`. |
| `app/(portfolio)/not-found.tsx` | Portfolio not-found boundary inside the portfolio root and provider. |
| `app/(portfolio)/error.tsx` | Portfolio error boundary inside the portfolio root and provider. |
| `app/90s/layout.tsx` | Experiment root layout with its own `<html>`, `<body>`, VT323 face, preflight, and metadata. |
| `app/90s/fonts.ts` | Experiment-only VT323 font loader. |
| `app/90s/experiment.css` | Experiment-only preflight import. |
| `app/90s/page.tsx` | The `/90s` page. |
| `app/90s/metadata.ts` | Experiment layout unfurl + `noindex`; hub and note canonicals live on their pages. |
| `app/90s/skills/[slug]/page.tsx` | A skill note. `generateStaticParams` from the publish set, `dynamicParams = false`. |
| `app/90s/ExperimentNav.tsx` | The About · Work · Skills · Contact nav, shared by the hub, the notes, and the 404. |
| `app/90s/NoteShell.tsx` | The outer shell a note and the 404 share — banner, nav, one Document Window, footer. |
| `app/90s/not-found.tsx` | The experiment's own 404 — same shell, recovery in the last sentence. |
| `app/90s/[...missing]/page.tsx` | Catches every unknown path under `/90s` and calls `notFound()`, so the router's own rejection of an unmatched slug can't escape to the global 404. |
| `app/90s/nineties.module.css` | All experiment chrome. Nothing else styles `/90s`. |
| `app/global-not-found.tsx` | Full-document 404 for URLs that match no presentation route. Owns `<html>` / `<body>` because there is no shared root layout (`experimental.globalNotFound`). |
| `app/prototype/layout.tsx` | Throwaway root layout for prototype routes. |
| `app/prototype/90s-shell/` | Throwaway shell variants A–D behind `?variant=`. Reference only. |
| `public/90s/` | The hub kitsch pack — under-construction tape plus three 88×31 badges. Hub-only theater, ≤40KB, never rendered on a note route. |
| `scripts/generate-90s-pack.mjs` | Draws `public/90s/`. Provenance for the pack; run it rather than hand-editing an asset. |

## Content and configuration

Everything here is data, not markup. New content belongs in this directory, never inlined in a component.

| Path | Holds |
|------|-------|
| `app/config/skills.ts` | The skills catalogue — `Skill = { slug, name, icon, category }`, shared by both presentations. |
| `app/config/featuredWork.ts` | Featured work — `FeaturedProject`, hand-curated and capped at three. Membership is featuring; `stack` entries are catalogue slugs. |
| `app/config/homepage.ts` | Locked homepage copy — identity cluster, spine, colour-panel figures. |
| `app/config/profileLinks.ts` | Social and contact links — `ProfileLink`. |
| `app/config/site.ts` | `SITE_URL`, `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`, `absoluteUrl()`. |
| `app/config/securityHeaders.ts` | Response headers, consumed by `next.config.ts`. |
| `content/skills/` | The skill notes, one Markdown file per catalogue slug. A file here is what publishes a note; a filename with no catalogue slug fails the build. |

## Logic

No React — this is what the node-environment test runner can reach. Pure functions, with one exception: `skillCatalogue.ts` reads `content/skills/` from disk. That read happens at build time inside server components, and the tests run against the real files.

| Path | Holds |
|------|-------|
| `app/lib/workTimeline.ts` | Shared-axis span and percent for the homepage work chart. |
| `app/lib/skillCatalogue.ts` | The one join: catalogue skills plus the notes on disk, and the Markdown pipeline that renders one. The publish set is owned here; nothing else re-derives it. Touches the filesystem, so it is build-time only. |
| `app/lib/skillDirectory.ts` | The `/90s` skills directory shape — the catalogue grouped by category. Reads the join, never the filesystem. |

## Components (modern presentation only)

Server components unless marked. `app/90s/` must not import from here.

| Path | Client? |
|------|---------|
| `app/components/homepage/Homepage.tsx` | server |
| `app/components/homepage/ColourPanelObserver.tsx` | **client** — writes `data-section` for the colour panel |

## Discoverability and build config

| Path | Holds |
|------|-------|
| `public/fonts/newsreader-400-latin.woff2` | Self-hosted Newsreader latin 400, preloaded on `/`. |
| `public/portrait.jpg` | Homepage portrait. |
| `public/cspo-badge.png` | CSPO badge in the identity cluster. |
| `app/robots.ts` | Crawler rules, sitemap and host declarations. Tested. |
| `app/sitemap.ts` | Sitemap entries — `/` only. Tested. |
| `next.config.ts` | Applies `pathHeaders`: security on `/:path*`, `X-Robots-Tag` on `/90s` and `/90s/:path*`. |
| `vitest.config.mts` | node environment, collects `app/**/*.test.ts` only. |
| `postcss.config.mjs`, `app/globals.css` | Tailwind v4 entry and the light/dark CSS-variable themes. |

## Docs

| Path | Holds |
|------|-------|
| `docs/MAP.md` | Orientation: architecture, route ownership, data contracts, conventions. |
| `docs/agent-context-map.md` | This file. |
| `CONTEXT.md` (root) | Domain glossary. Search its headings; don't load it whole. |
| `PLAN.md` (root) | Objective, active slice, backlog, completed ledger. |
| `AGENTS.md` (root) | Always-on rules. |
| `docs/design/90s-experiment-spec.md` | v1 `/90s` spec, historical. Do not treat as v2 authority. |
| `docs/agents/issue-tracker.md` | How issues, PRDs, and wayfinder maps are expressed on GitHub here. |
| `docs/agents/triage-labels.md` | The five canonical triage labels. |
| `docs/agents/domain.md` | How skills should consume `CONTEXT.md` and `docs/adr/`. |
| `docs/adr/` | Architecture decision records. Does not exist yet. |

## Do not load

Point-in-time evidence and scratch output, archived on purpose. Open only if sent there by name.

| Path | Why |
|------|-----|
| `docs/research/` | Dated research notes; findings that mattered are already in specs and decisions. |
| `.lighthouse-#14/` | Scratch output from an old ticket run. |
| `*.report.html` (repo root) | 2025 Lighthouse reports for the dead `.com` domain. |
| `README.md` | Unmodified `create-next-app` boilerplate; inaccurate about this project. |
| `.agents/skills/`, `.claude/skills/` | Vendored agent skill definitions, not project code. |
