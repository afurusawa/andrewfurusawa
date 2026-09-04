# Plan

**Objective:** rebuild the public homepage (`/`) from [Spec: homepage rebuild from the capabilities page](https://github.com/afurusawa/andrewfurusawa/issues/81). The wayfinder that produced that spec is closed: [Wayfinder: homepage rebuild from the capabilities page](https://github.com/afurusawa/andrewfurusawa/issues/66).

**Architecture, route ownership, and data contracts:** see `docs/MAP.md`, `docs/agent-context-map.md` (path inventory), and `docs/adr/`. Do not duplicate those essays here.

**The issue tracker is canonical.** This file is the readable snapshot; where the two disagree, GitHub wins. `docs/agents/issue-tracker.md` records how maps, tickets, blocking, and the frontier are expressed here.

_Last updated: 2026-09-04._

## Active Slice

**In flight:** nothing.

**Takeable now** (frontier — no open blockers):

- [Reshape shared featured work and /90s consumption](https://github.com/afurusawa/andrewfurusawa/issues/82)
- [Split presentation roots; adopt next-themes and portfolio type](https://github.com/afurusawa/andrewfurusawa/issues/83)

## Backlog

Children of [Spec #81](https://github.com/afurusawa/andrewfurusawa/issues/81), not of the closed wayfinder map:

- [Lock site metadata and the built share image](https://github.com/afurusawa/andrewfurusawa/issues/84) — blocked by #83
- [Rebuild / as Loaded Stage](https://github.com/afurusawa/andrewfurusawa/issues/85) — blocked by #82, #83
- [Cold mobile performance acceptance for rebuilt /](https://github.com/afurusawa/andrewfurusawa/issues/86) — blocked by #85

**Allowed leftovers the spec already named:** colour panel split ratio, ghost-numeral size/bleed, internal-scroll mechanism; mobile colour-card check on a real phone; static Fraunces cut file for the share image.

## Completed Ledger

One line per finished decision. Detail lives in the linked ticket — zoom there rather than restating it here.

### Current effort — [homepage rebuild spec](https://github.com/afurusawa/andrewfurusawa/issues/81)

- [Research light-default optional-dark theming in Next.js App Router](https://github.com/afurusawa/andrewfurusawa/issues/69)
- [Prototype homepage visual registers for the public homepage](https://github.com/afurusawa/andrewfurusawa/issues/67) — register H "Loaded Stage"
- [Transcribe the capabilities page into the repo](https://github.com/afurusawa/andrewfurusawa/issues/68)
- [Decide featured-work field split across presentations](https://github.com/afurusawa/andrewfurusawa/issues/70)
- [Decide site metadata for the new offer](https://github.com/afurusawa/andrewfurusawa/issues/71)
- [Lock homepage voice and section copy](https://github.com/afurusawa/andrewfurusawa/issues/72)
- [Lock featured-work homepage copy](https://github.com/afurusawa/andrewfurusawa/issues/73)
- [Lock colour-scheme persistence and first-paint](https://github.com/afurusawa/andrewfurusawa/issues/74)
- [Define homepage chrome inventory from the chosen visual register](https://github.com/afurusawa/andrewfurusawa/issues/75)
- [Lock homepage-rebuild spec packaging and map-done criteria](https://github.com/afurusawa/andrewfurusawa/issues/76)
- [Decide how the capabilities-page snapshot is maintained](https://github.com/afurusawa/andrewfurusawa/issues/77)
- [Lock the dark palette for the colour panel](https://github.com/afurusawa/andrewfurusawa/issues/78)
- [Set the performance budget for the rebuilt homepage chrome](https://github.com/afurusawa/andrewfurusawa/issues/79)
- [Prototype the exact dark-scheme values for the colour panel](https://github.com/afurusawa/andrewfurusawa/issues/80)

### [/90s v2 spec](https://github.com/afurusawa/andrewfurusawa/issues/51) — closed

Produced from [Wayfinder: /90s hi-fi kitsch and skill-note content spec](https://github.com/afurusawa/andrewfurusawa/issues/35). Implementable package for the experiment upgrade; orthogonal to the homepage rebuild.

### [/90s v1 design spec](https://github.com/afurusawa/andrewfurusawa/issues/15) — closed

Delivered `docs/design/90s-experiment-spec.md` and shipped as `app/90s/` in [#34](https://github.com/afurusawa/andrewfurusawa/pull/34). Locked and still binding until v2 supersedes them: single-page `/90s`; About · Skills · Contact; shared profile links and skills data; dark theme only; cosmetic theater only; soft-secret discoverability; WCAG 2.2 AA; hybrid variant D shell at a ~64rem stage; mood-board colour lock with VT323 body type.

### [Portfolio audit and framework decision](https://github.com/afurusawa/andrewfurusawa/issues/1) — closed

Stay on **Next.js** — no material Astro advantage evidenced; reconsider only if a like-for-like proof clears the initial-JS gate. Set the performance budgets and the canonical `https://andrewfurusawa.dev` domain now recorded in `docs/MAP.md`.
