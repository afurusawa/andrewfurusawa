# Project Map

**What this is:** Andrew Furusawa's personal portfolio at `andrewfurusawa.dev`, deployed on Vercel. One codebase, two **presentations** of the same substance: the public modern portfolio at `/`, and a soft-secret 90s experiment at `/90s`. There is no CMS, no database, and no API — content is TypeScript modules under `app/config/`, plus the skill notes as Markdown files under `content/skills/`, read at build time.

**Stack:** Next.js 15 App Router, React 19, TypeScript 5, Tailwind v4 (PostCSS), react-icons, Vitest, Vercel Speed Insights. Skill notes add a build-time Markdown pipeline: `gray-matter` plus `unified`/`remark-parse`/`remark-rehype`/`rehype-sanitize`/`rehype-stringify`. Those six run in server components only and reach no browser bundle, so they cost nothing against the initial-JS budget — no MDX, no GFM, no raw HTML.

_Last updated: 2026-09-04. Update this map when architecture or ownership changes in a way that matters._

This file is orientation: how the system is shaped and why. For *where a file lives*, use [`agent-context-map.md`](agent-context-map.md). For *what is being worked on now*, use [`../PLAN.md`](../PLAN.md). For *what a word means*, use [`../CONTEXT.md`](../CONTEXT.md).

## Routes and ownership

| Route | Owned by | Public? |
|-------|----------|---------|
| `/` | `app/(portfolio)/` + `app/components/` | Yes — indexed, in the sitemap |
| `/90s` | `app/90s/` alone | Soft secret — crawl-allowed, `X-Robots-Tag` `noindex, nofollow`, not in the sitemap |
| `/90s/skills/[slug]` | `app/90s/skills/[slug]/` | Same soft secret. Prerendered from the publish set; `dynamicParams = false` |
| `/90s/[...missing]` | `app/90s/[...missing]/` | Never renders — calls `notFound()` so every stray path under `/90s` gets the experiment's 404 rather than the global one |
| `/prototype/90s-shell` | `app/prototype/` | Throwaway; kept for reference, not a product surface |

The **route-group seam is the whole architecture**. There is no shared `app/layout.tsx`. `app/(portfolio)/layout.tsx` and `app/90s/layout.tsx` are separate root layouts, each with its own `<html>` and `<body>`. The portfolio shell owns its four-font stack, `next-themes` provider, theme control, global CSS, and page padding. The experiment root loads only its own VT323 face and preflight; its chrome lives entirely in `app/90s/nineties.module.css` behind a single `.experiment` class. Throwaway routes have their own root in `app/prototype/layout.tsx`.

**Anything added to the root layout appears on both presentations.** That is almost never what you want.

## Data contracts

Both presentations read the same data and share none of their chrome.

| Contract | Shape | Consumed by |
|----------|-------|-------------|
| `Skill` (`app/config/skills.ts`) | `{ slug, name, icon, category }` | `/` skills section, `/90s` directory |
| `ProfileLink` (`app/config/profileLinks.ts`) | `{ href, ariaLabel, label, Icon, openInNewTab, heroClassName? }` | `/` hero + contact, `/90s` contact |
| Site identity (`app/config/site.ts`) | `SITE_URL`, `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`, `absoluteUrl()` | root metadata, `robots.ts`, `sitemap.ts` |
| `pathHeaders` (`app/config/securityHeaders.ts`) | security tuples on `/:path*`; `X-Robots-Tag` on `/90s` and `/90s/:path*` | `next.config.ts` |
| `SkillNote` (`app/lib/skillCatalogue.ts`) | `{ slug, summary, updated?, body }`, parsed from `content/skills/<slug>.md` | the note route |
| `CatalogueSkill` (`app/lib/skillCatalogue.ts`) | `Skill & { hasNote, summary? }` — the one join of catalogue and notes | `/90s` tiles, featured-work stack tags, the note route |

`app/90s/` imports *data* from `app/config/` and *nothing* from `app/components/`. Share substance, never chrome — if a change makes the experiment import a portfolio component, the change is wrong.

**A note publishes by existing.** `content/skills/<slug>.md` is the whole publish decision — no `draft` flag, no list to keep in step. `getSkillCatalogue()` is the only place catalogue and notes meet; a file whose slug names no catalogue skill throws there, which fails `next build` rather than shipping a hub link to a 404.

`slug` is authored, never derived — `/90s/skills/<slug>` must survive a display-name change. `category` is a closed union (Frontend · Mobile · Backend · Tooling · Design) in `CATEGORY_ORDER`; `/` ignores it. Homepage anchors are `skill-${slug}`. See [Prefactor the shared skills catalogue with authored slugs and categories](https://github.com/afurusawa/andrewfurusawa/issues/52).

**Decided, not yet built:** v2 hub chrome pack is one tape under-construction graphic plus three 88×31 badges; the starfield stays CSS; CSS stand-ins must not ship. See [Define hi-fi chrome inventory and assets for /90s v2](https://github.com/afurusawa/andrewfurusawa/issues/41).

## Conventions

- **Tests are colocated `*.test.ts` next to the module.** Vitest runs in a `node` environment and only collects `app/**/*.test.ts` (`vitest.config.mts`). There is no DOM or component testing — which is *why* logic belongs in `app/lib/` and content in `app/config/`, where it is reachable.
- **`npm test` runs the suite; `npm run dev` uses Turbopack.** A plugin Turbopack can't take is a real constraint, not a detail.
- **Server components by default.** The portfolio theme provider and control form one client boundary. The existing skills-filter islands remain until the homepage rebuild replaces the old homepage.
- **Theming is a `.dark` class on the portfolio `<html>`** driven by `next-themes` and stored under the `theme` key. `/90s` has its own root and no theme provider or theme script.
- **Performance is budgeted:** mobile p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; ≤ 500 KB initial transfer, ≤ 150 KB initial JS. A new dependency or font is a budget decision.
- **WCAG 2.2 AA on every route**, kitsch included. Motion respects `prefers-reduced-motion`.

## Design authority

v1's [`design/90s-experiment-spec.md`](design/90s-experiment-spec.md) is **historical**. It remains binding for the *shipped* `/90s` until v2 is implemented. v2 taste and scope live in a GitHub **spec** issue produced from [Wayfinder: /90s hi-fi kitsch and skill-note content spec](https://github.com/afurusawa/andrewfurusawa/issues/35) — not in a new `docs/design/` file. Before that issue exists, the map and its closed tickets are the record. After v2 ships, the code wins.

`adr/` holds architecture decision records. It does not exist yet — nothing has cleared the hard-to-reverse, surprising, real-trade-off bar.

## Known sharp edges

- **`/90s` is a soft secret by header, not by `robots.txt`.** `robots.txt` does not name `/90s`. `X-Robots-Tag: noindex, nofollow` is sent on `/90s` and `/90s/:path*`. The experiment layout still exports `robots: { index: false, follow: false }`. See [Switch /90s to crawl-allowed de-indexing](https://github.com/afurusawa/andrewfurusawa/issues/53).
- **`README.md` is untouched `create-next-app` boilerplate** describing fonts this project doesn't use. Trust this map over it.
