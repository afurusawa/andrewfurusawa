# Plan

**Objective:** produce a **spec** (GitHub issue via `/to-spec`) for rebuilding the public homepage (`/`) from scratch — new chrome, new UI, and a new **offer** taken from the **capabilities page** — charted as [Wayfinder: homepage rebuild from the capabilities page](https://github.com/afurusawa/andrewfurusawa/issues/66). This effort produces **decisions**, then one tracker spec. It does not implement the redesign, restyle `/90s`, fork the site by audience, or ship a PDF.

**Architecture, route ownership, and data contracts:** see `docs/MAP.md`, `docs/agent-context-map.md` (path inventory), and `docs/adr/`. Do not duplicate those essays here.

**The issue tracker is canonical.** This file is the readable snapshot; where the two disagree, GitHub wins. `docs/agents/issue-tracker.md` records how maps, tickets, blocking, and the frontier are expressed here.

_Last updated: 2026-08-31._

## Active Slice

**In flight:** nothing. Decision tickets are unclaimed.

**Takeable now (frontier):** [Lock featured-work homepage copy](https://github.com/afurusawa/andrewfurusawa/issues/73); [Lock colour-scheme persistence and first-paint](https://github.com/afurusawa/andrewfurusawa/issues/74); [Define homepage chrome inventory from the chosen visual register](https://github.com/afurusawa/andrewfurusawa/issues/75); [Decide how the capabilities-page snapshot is maintained](https://github.com/afurusawa/andrewfurusawa/issues/77). Visual taste is the heavy path — use `/prototype`.

## Backlog

Blocked until its parents close: spec packaging.

**Not yet sharp enough to ticket:** second-pass polish prototypes after the winning register; dark treatment of the winner; type, motion, in-page nav; font/motion budget vs live `/`; whether leftover homepage modules are named for deletion in the spec.

**Ruled out of this effort:** implementing the redesign; restyling `/90s` or rewriting its identity line; homepage cutover of `/90s`; audience fork; PDF product or download; blog/case-study routes; CMS; contact form; public phone number; keeping the homepage skills wall; reopening the stack.

## Completed Ledger

One line per finished decision. Detail lives in the linked ticket — zoom there rather than restating it here.

### Current effort — [Wayfinder: homepage rebuild from the capabilities page](https://github.com/afurusawa/andrewfurusawa/issues/66)

- [Research light-default optional-dark theming in Next.js App Router](https://github.com/afurusawa/andrewfurusawa/issues/69) — light is the absence of `.dark`; optional dark is a class + `localStorage` opt-in, not `prefers-color-scheme`; apply before first paint with a parser-blocking script that no-ops on `/90s`. Findings on `research/nextjs-light-default-optional-dark`.
- [Prototype homepage visual registers for the public homepage](https://github.com/afurusawa/andrewfurusawa/issues/67) — register **H "Loaded Stage"** wins: sticky colour stage beside a loaded record, mixed display/serif/mono type, ghost numerals, engagement timeline as one lane chart, portrait and CSPO credential in the identity cluster. Prototype on `prototype/homepage-visual-registers`.
- [Transcribe the capabilities page into the repo](https://github.com/afurusawa/andrewfurusawa/issues/68) — verbatim snapshot at `content/capabilities-page.md`, phone withheld because the repo is public. Recent work is anonymised domain + years, not named projects — reconciliation owned by [Lock featured-work homepage copy](https://github.com/afurusawa/andrewfurusawa/issues/73). Branch `content/capabilities-page`.
- [Decide featured-work field split across presentations](https://github.com/afurusawa/andrewfurusawa/issues/70) — one shared substance, no per-presentation copy layer. `period` → structured `start`/`end` with derived label; `role` → `role` + `client`; new shared `outcomes: [{ result, figure? }]`. One `blurb`. Standing rule surfaced: the homepage takes priority over the experiment, always.
- [Decide site metadata for the new offer](https://github.com/afurusawa/andrewfurusawa/issues/71) — title copies the identity line, `Andrew Furusawa · Product & Software Delivery Consulting`; description authored fresh, first person, offer-led, no technology names and no location. One string pair for search result and share card; no `title.template`. Adds a built `app/opengraph-image.tsx` and `summary_large_image`. Constrains [Lock homepage voice and section copy](https://github.com/afurusawa/andrewfurusawa/issues/72) to first person.
- [Lock homepage voice and section copy](https://github.com/afurusawa/andrewfurusawa/issues/72) — capabilities-page prose rewritten **for the web**: every claim kept, blocks halved to ~40–70 words, first person, spine headings verbatim. Offer leads with speed; agentic tooling is named as why the pace is possible, not as the offer itself. The edge is the product-owner/engineer crossover — "either seat, or both when the work needs one person to" — stated **once** in a new lede and then demonstrated by the `Where I help` row order. `Where I help` splits two dense bullets into four rows; `How I work` stays three. Location `Inland Empire, CA · Remote`; 12+ years, degree and CSPO all sit in the identity cluster. Contact lead-in names the paid discovery sprint. Handed [#75](https://github.com/afurusawa/andrewfurusawa/issues/75) a conditional pull-quote string and the finding that per-section stage figures are unsupported by the substance; handed [#73](https://github.com/afurusawa/andrewfurusawa/issues/73) a surfaced résumé that **names clients** the capabilities page anonymises.

### [/90s v2 spec](https://github.com/afurusawa/andrewfurusawa/issues/35) — closed

Map closed into [Spec: /90s v2 hi-fi kitsch and skill notes](https://github.com/afurusawa/andrewfurusawa/issues/51) and shipped. Not this effort.
