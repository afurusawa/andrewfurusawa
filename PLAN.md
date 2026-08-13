# Plan

**Objective:** produce a v2 **spec** (GitHub issue via `/to-spec`) for the `/90s` experiment — hi-fi kitsch chrome, skill notes at `/90s/skills/[slug]`, a light featured-work strip, mailto-only contact — charted as [Wayfinder: /90s hi-fi kitsch and skill-note content spec](https://github.com/afurusawa/andrewfurusawa/issues/35). This effort produces **decisions**, then one tracker spec. It does not build the upgrade, cut over the public homepage, or write a new `docs/design/` file.

**Architecture, route ownership, and data contracts:** see `docs/MAP.md`, `docs/agent-context-map.md` (path inventory), and `docs/adr/`. Do not duplicate those essays here.

**The issue tracker is canonical.** This file is the readable snapshot; where the two disagree, GitHub wins. `docs/agents/issue-tracker.md` records how maps, tickets, blocking, and the frontier are expressed here.

_Last updated: 2026-08-12._

## Active Slice

**In flight:** nothing. Decision tickets are closed.

**Terminology:** the writing unit is a **skill note**. "Dispatch" is retired everywhere except the two closed research tickets, whose titles are left as historical record. The implementable package is a **spec** issue, not a `docs/design/` file.

**Takeable now:** destination handoff — run `/to-spec` to write the v2 spec issue from the closed map. Not a new wayfinder child.

## Backlog

None. The map waits on that spec issue before it can close.

**Not yet sharp enough to ticket:** performance budget for hub and note pages against the live portfolio; a brand name for the space beyond the path `/90s`; the first multi-skill publish batch after the single example.

**Ruled out of this effort:** homepage cutover or linking `/90s` from the live nav; changing the modern homepage skills UI (shared `category` does not force it); guestbook or public message walls; server-backed contact form or hit counter; a first-class light theme; autoplay audio; drafting the full first batch of skill notes; any CMS as the authoring source of truth.

## Completed Ledger

One line per finished decision. Detail lives in the linked ticket — zoom there rather than restating it here.

### Current effort — [/90s v2 spec](https://github.com/afurusawa/andrewfurusawa/issues/35)

- [Research Next.js MDX/content patterns for /90s skill posts](https://github.com/afurusawa/andrewfurusawa/issues/36) — `@next/mdx` + top-level `content/skills/*.mdx` + `gray-matter` frontmatter + `generateStaticParams` with `dynamicParams = false`; `next-mdx-remote` archived, `output: export` ruled out, MDX config is app-global. Findings on `research/nextjs-mdx-90s-skill-posts`.
- [Research soft-secret SEO for nested /90s skill post routes](https://github.com/afurusawa/andrewfurusawa/issues/37) — today's `Disallow: /90s` and `noindex` cancel each other; use `X-Robots-Tag` on `/90s` and `/90s/:path*` with self-referential canonicals per segment. Findings on `research/soft-secret-seo-90s`.
- [Define the skill-note content model for /90s](https://github.com/afurusawa/andrewfurusawa/issues/38) — the unit is a **skill note**, one per skill and only where there's something to say; "dispatch" retired. `Skill` gains an explicit `slug`; `content/skills/<slug>.md`, filename is the association. Frontmatter `summary` + optional `updated`, no `draft`. Three fixed H2s: Where I used it / Why it fit / What it taught me.
- [Define Featured work strip model for /90s hub](https://github.com/afurusawa/andrewfurusawa/issues/39) — shared `featuredWork.ts`; cap of 3, no floor; stack entries are skill slugs; all three items link-free. Nav becomes About · Work · Skills · Contact.
- [Decide skills catalogue vs note set data relationship](https://github.com/afurusawa/andrewfurusawa/issues/42) — `allSkills` moves to `app/config/skills.ts` as `{ slug, name, icon }`; one build-time join; orphan notes throw. 35 slugs locked. `category` later added by the directory prototype.
- [Prototype /90s skills directory UI treatments](https://github.com/afurusawa/andrewfurusawa/issues/43) — category-grouped icon-tile wall; publish-set carried by tile treatment; `category` ships; VT323 is display-only. See [Fix the category taxonomy for the skills catalogue](https://github.com/afurusawa/andrewfurusawa/issues/50).
- [Define About and hub voice/microcopy for /90s v2](https://github.com/afurusawa/andrewfurusawa/issues/40) — garnish only in information-free chrome; hub `<h1>` is `Andrew Furusawa`; four locked strings (About, Skills helper, Work helper, 404).
- [Prototype /90s skill note page shell](https://github.com/afurusawa/andrewfurusawa/issues/44) — Document Window: one bordered article on the existing stage; no sticky TOC. On `prototype/90s-skill-note-shell`.
- [Choose the example skill for the v2 sample note](https://github.com/afurusawa/andrewfurusawa/issues/45) — **Ionic** (`ionic`).
- [Produce the example skill note for the v2 spec](https://github.com/afurusawa/andrewfurusawa/issues/46) — Ionic example note drafted from MilkTracker and Blossom/GroConnect. [Final draft](https://github.com/afurusawa/andrewfurusawa/issues/46#issuecomment-5266039742).
- [Decide the Markdown/MDX rendering toolchain for /90s skill notes](https://github.com/afurusawa/andrewfurusawa/issues/48) — local server-side plain-Markdown pipeline (`gray-matter` + `unified`/`remark`/`rehype`); no JSX/GFM/raw HTML.
- [Lock the /90s soft-secret discoverability policy](https://github.com/afurusawa/andrewfurusawa/issues/49) — crawl-allowed + header `noindex, nofollow`; `/90s` unnamed in `robots.txt`; per-route experiment unfurls, no share image; inbound-link test.
- [Fix the category taxonomy for the skills catalogue](https://github.com/afurusawa/andrewfurusawa/issues/50) — closed union Frontend · Mobile · Backend · Tooling · Design; no singletons (Testing merged into Tooling, Shadcn moved to Frontend); `/` ignores the field.
- [Define hi-fi chrome inventory and assets for /90s v2](https://github.com/afurusawa/andrewfurusawa/issues/41) — fidelity-only v1 pack: required 88×31 badges + tape UC, CSS starfield, hub-only, static, ≤40KB; no new motifs.
- [Lock /90s v2 design-spec packaging and map-done criteria](https://github.com/afurusawa/andrewfurusawa/issues/47) — no v2 `docs/design/` file; implementable package is a `/to-spec` GitHub issue; map closes when that issue exists.

### [/90s v1 design spec](https://github.com/afurusawa/andrewfurusawa/issues/15) — closed

Delivered `docs/design/90s-experiment-spec.md` and shipped as `app/90s/` in [#34](https://github.com/afurusawa/andrewfurusawa/pull/34). Locked and still binding until v2 supersedes them: single-page `/90s`; About · Skills · Contact; shared profile links and skills data; dark theme only; cosmetic theater only; soft-secret discoverability; WCAG 2.2 AA; hybrid variant D shell at a ~64rem stage; mood-board colour lock with VT323 body type.

### [Portfolio audit and framework decision](https://github.com/afurusawa/andrewfurusawa/issues/1) — closed

Stay on **Next.js** — no material Astro advantage evidenced; reconsider only if a like-for-like proof clears the initial-JS gate. Set the performance budgets and the canonical `https://andrewfurusawa.dev` domain now recorded in `docs/MAP.md`.
