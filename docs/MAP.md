# Project Map

**What this is:** Andrew Furusawa's personal portfolio at `andrewfurusawa.dev`, deployed on Vercel. One codebase, two **presentations** of the same substance: the public modern portfolio at `/`, and a soft-secret 90s experiment at `/90s`. There is no hosted CMS, no database, and no public API. Content is TypeScript modules under `app/config/`, Markdown under `content/skills/` (skill notes) and `content/blog/` (writing), read at build time. Keystatic is a **local-only** authoring UI at `/keystatic` that writes those blog files; production 404s the admin and its route handler.

**Stack:** Next.js 15 App Router, React 19, TypeScript 5, Tailwind v4 (PostCSS), react-icons, Vitest, Vercel Speed Insights. Markdown (skill notes and blog entries) compiles with `gray-matter` plus `unified`/`remark-parse`/`remark-rehype`/`rehype-sanitize`/`rehype-stringify`. Those six run in server components only and reach no browser bundle, so they cost nothing against the initial-JS budget — no MDX, no GFM, no raw HTML. Keystatic (`@keystatic/core`, `@keystatic/next`, `@markdoc/markdoc`) is authoring-only and never imported by a presentation.

_Last updated: 2026-09-11. Update this map when architecture or ownership changes in a way that matters._

This file is orientation: how the system is shaped and why. For *where a file lives*, use [`agent-context-map.md`](agent-context-map.md). For *what is being worked on now*, use [`../PLAN.md`](../PLAN.md). For *what a word means*, use [`../CONTEXT.md`](../CONTEXT.md).

## Routes and ownership

| Route | Owned by | Public? |
|-------|----------|---------|
| `/` | `app/(portfolio)/` + `app/components/` | Yes — indexed, in the sitemap |
| `/blog`, `/blog/[slug]` | `app/(portfolio)/blog/` | Yes — indexed when a post is published; teasers on `/` and `/90s` |
| `/rss.xml` | `app/rss.xml/route.ts` | Yes — published posts only |
| `/keystatic` | `app/keystatic/` | Local authoring UI. Production 404. `noindex`. Not in the sitemap |
| `/90s` | `app/90s/` alone | Soft secret — crawl-allowed, `X-Robots-Tag` `noindex, nofollow`, not in the sitemap |
| `/90s/skills/[slug]` | `app/90s/skills/[slug]/` | Same soft secret. Prerendered from the publish set; `dynamicParams = false` |
| `/90s/[...missing]` | `app/90s/[...missing]/` | Never renders — calls `notFound()` so every stray path under `/90s` gets the experiment's 404 rather than the global one |
| unmatched URL | `app/global-not-found.tsx` | Yes as a 404 — no presentation root, so it owns its own `<html>` / `<body>` |

The **route-group seam is the whole architecture**. There is no shared `app/layout.tsx`. `app/(portfolio)/layout.tsx` and `app/90s/layout.tsx` are separate root layouts, each with its own `<html>` and `<body>`. The portfolio shell owns its four-font stack, `next-themes` provider, theme control, skip link, and global CSS. The experiment root loads only its own VT323 and Press Start 2P faces and preflight; its chrome lives entirely in `app/90s/nineties.module.css` behind a single `.experiment` class. Throwaway routes have their own root in `app/prototype/layout.tsx`. Keystatic has its own root in `app/keystatic/layout.tsx` so the admin cannot inherit presentation chrome.

**Anything added to the root layout appears on both presentations.** That is almost never what you want.

## Data contracts

Both presentations read the same data and share none of their chrome.

| Contract | Shape | Consumed by |
|----------|-------|-------------|
| `Skill` (`app/config/skills.ts`) | `{ slug, name, icon, category }` | `/` work stack tags, `/90s` directory |
| `FeaturedProject` (`app/config/featuredWork.ts`) | shared work records; `formatProjectPeriod` / `formatProjectRole` | `/` recent work, `/90s` work strip |
| Homepage offer (`app/config/homepage.ts`) | identity cluster, What I do, Where I help, Recent work, How I work, Contact | `/` and `/90s` (colour-panel figures remain `/` only) |
| `ProfileLink` (`app/config/profileLinks.ts`) | `{ href, ariaLabel, label, Icon, openInNewTab }` | `/` contact, `/90s` contact |
| Site identity (`app/config/site.ts`) | `SITE_URL`, `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`, `absoluteUrl()` | portfolio metadata, `robots.ts`, `sitemap.ts`, the built share image |
| `pathHeaders` (`app/config/securityHeaders.ts`) | security tuples on `/:path*`; `X-Robots-Tag` on `/90s`, `/keystatic`, and `/api/keystatic` | `next.config.ts` |
| `SkillNote` (`app/lib/skillCatalogue.ts`) | `{ slug, summary, updated?, body }`, parsed from `content/skills/<slug>.md` | the note route |
| `CatalogueSkill` (`app/lib/skillCatalogue.ts`) | `Skill & { hasNote, summary? }` — the one join of catalogue and notes | `/90s` tiles and stack tags, the note route |
| `BlogEntry` (`app/lib/blogCatalogue.ts`) | `{ slug, title, date, summary, draft, body }`, parsed from `content/blog/<slug>.md` | `/blog`, homepage and `/90s` teasers, RSS, sitemap |

`app/90s/` imports *data* from `app/config/` and *nothing* from `app/components/`. Share substance, never chrome — if a change makes the experiment import a portfolio component, the change is wrong.

**A note publishes by existing.** `content/skills/<slug>.md` is the whole publish decision — no `draft` flag, no list to keep in step. `getSkillCatalogue()` is the only place catalogue and notes meet; a file whose slug names no catalogue skill throws there, which fails `next build` rather than shipping a hub link to a 404.

**A blog entry publishes when it is not a draft.** Keystatic writes `content/blog/<slug>.md` (local save, then git push). `draft: true` keeps the file off listings, sitemap, RSS, and `generateStaticParams`. Canonical URLs live on the modern presentation (`/blog/<slug>`). The experiment may tease the same records and link *out* to those URLs. The modern presentation still does not link *into* `/90s`.

`slug` is authored, never derived — `/90s/skills/<slug>` must survive a display-name change. `category` is a closed union (Frontend · Mobile · Backend · Tooling · Design) in `CATEGORY_ORDER`; `/` ignores it. See [Prefactor the shared skills catalogue with authored slugs and categories](https://github.com/afurusawa/andrewfurusawa/issues/52).

**Current hub chrome:** Daemonforge GeoCities collage — nested tables, construction tape, 88×31 badges, western portrait, and period graphics. Starfield stays CSS. The pack is hub-only theater.

## Conventions

- **Tests are colocated `*.test.ts` next to the module.** Vitest runs in a `node` environment and only collects `app/**/*.test.ts` (`vitest.config.mts`). There is no DOM or component testing — which is *why* logic belongs in `app/lib/` and content in `app/config/`, where it is reachable.
- **`npm test` runs the suite; `npm run dev` uses Turbopack.** A plugin Turbopack can't take is a real constraint, not a detail.
- **Server components by default.** The portfolio client islands are the theme provider/control and the colour-panel scroll observer.
- **Theming is a `.dark` class on the portfolio `<html>`** driven by `next-themes` and stored under the `theme` key. `/90s` has its own root and no theme provider or theme script.
- **Performance is budgeted:** mobile p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; ≤ 500 KiB initial transfer, ≤ 150 KiB initial JS, ≤ 100 KiB fonts, ≤ 200 KiB largest image. A new dependency or font is a budget decision. Newsreader latin is self-hosted at `/fonts/newsreader-400-latin.woff2` and preloaded on `/`; Inter, Fraunces, and Plex do not preload. The homepage lede uses the size-adjusted Times fallback so lab LCP is not gated on the Newsreader file.
- **WCAG 2.2 AA on every route**, kitsch included. Motion respects `prefers-reduced-motion`.

## Design authority

v1's [`design/90s-experiment-spec.md`](design/90s-experiment-spec.md) is **historical**. [Spec: /90s v2 hi-fi kitsch and skill notes](https://github.com/afurusawa/andrewfurusawa/issues/51) still holds for the **soft secret**, the **skill-note** content model, the **catalogue** join, **featured work** as shared **substance**, voice law, theater policy, and discoverability. [Spec: rebuild the experiment as Daemonforge](https://github.com/afurusawa/andrewfurusawa/issues/91) is the source of truth for identity, hub chrome, and kitsch inventory until it ships; after ship, the code wins. Do not write a new file under `docs/design/`.

`adr/` holds architecture decision records. It does not exist yet — nothing has cleared the hard-to-reverse, surprising, real-trade-off bar.

## Known sharp edges

- **`/90s` is a soft secret by header, not by `robots.txt`.** `robots.txt` does not name `/90s`. `X-Robots-Tag: noindex, nofollow` is sent on `/90s` and `/90s/:path*`. The experiment layout still exports `robots: { index: false, follow: false }`. See [Switch /90s to crawl-allowed de-indexing](https://github.com/afurusawa/andrewfurusawa/issues/53).
- **`/keystatic` is local authoring, not a public CMS.** Production returns 404 for the admin and `/api/keystatic`. `robots.txt` disallows both. Saving a post still requires a git push for Vercel to ship it.
- **`README.md` is untouched `create-next-app` boilerplate** describing fonts this project doesn't use. Trust this map over it.
