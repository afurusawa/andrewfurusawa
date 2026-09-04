## Destination

A product **spec** as a GitHub issue (`/to-spec`) — not a new `docs/design/` file — for rebuilding the public homepage (`/`) from scratch: new chrome, new UI, and a new **offer** taken from the **capabilities page**. Spine: What I do / Where I help / Recent work / How I work. One narrative and one CTA cluster for both hiring managers and consulting clients. Visual register is found by heavy `/prototype` work, aimed at a beautiful, polished page — light default with optional dark. Map-done: every child ticket closed **and** the spec issue exists. This map plans decisions; it does not implement the redesign, restyle `/90s`, fork the site by audience, or ship a PDF.

## Notes

- **Domain / product**: personal portfolio (Next.js App Router). `/` is the public indexed homepage. `/90s` stays a parallel soft-secret experiment and is not restyled in this effort. Shared substance may change; experiment chrome may not hitch a ride.
- **Predecessor**: live `/` (hero + skills wall + contact) is the thing being replaced, not a baseline to iterate. [Wayfinder: /90s hi-fi kitsch and skill-note content spec](https://github.com/afurusawa/andrewfurusawa/issues/35) is closed and orthogonal.
- **Standing preferences (charting grill)**:
  - Destination type: **spec only** (not implement-in-map).
  - Surface: **`/` only**. `/90s` identity/role copy stays presentation-specific.
  - Audience: **one page, both buyers** — no toggle, no extra routes, no forked CTAs.
  - Substance source: the **capabilities page** is spine and offer, edited for the web, not a pixel replica and not a downloadable product.
  - Identity line: **Product & Software Delivery Consulting**.
  - Skills wall: **cut from `/`**. Catalogue remains shared data for `/90s` and as stack tags on work.
  - Work: **one shared featured-work list**, keep named **projects** (MilkTracker, Blossom / GroConnect, AI education platform).
  - Contact cluster: **email + GitHub + LinkedIn**. No public phone.
  - Engineering frame kept: Next.js App Router, `(portfolio)` isolation, WCAG 2.2 AA, existing performance budgets, shared `app/config/` substance. Current homepage chrome, components, and copy are throwaways.
  - Theme policy: **light default, optional dark**.
  - **Homepage takes priority over the experiment, always.** Where a shared-substance decision would constrain `/` to keep `/90s` unchanged, `/` wins and `/90s` is updated to follow. The experiment adapts to the data model; the data model does not bend for the experiment. Applies to every decision in this map.
  - Visual: **from scratch**, as beautiful and polished as the prototypes can make it. `/prototype` is the path for taste; do not reuse `BackgroundAnimation`, the current `ThemeToggle`, or the skills filter as a design baseline.
  - Prototype engineering may stay throwaway (no tests, no abstractions). Visual fidelity is in-scope — "skip polish" does not mean "look rough."
  - Prototype host: `app/prototype/`, not variants on public `/`. Follow the existing `/prototype/90s-shell` convention.
  - Packaging: **GitHub spec issue** via `/to-spec` (no new file under `docs/design/`).
- **Skills for sessions**: `/grilling`, `/domain-modeling`, `/prototype` (UI.md, heavily), `/research`. Consult `CONTEXT.md`.
- **Refer by name**: always name maps and tickets by title (with link), never bare issue numbers alone.

## Decisions so far

- [Research light-default optional-dark theming in Next.js App Router](https://github.com/afurusawa/andrewfurusawa/issues/69) — Light default is absence of `.dark`; optional dark is a class + localStorage opt-in, applied before paint with an inline script that strips on `/90s`. Findings on `research/nextjs-light-default-optional-dark`.

- [Prototype homepage visual registers for the public homepage](https://github.com/afurusawa/andrewfurusawa/issues/67) — Register **H "Loaded Stage"** wins: a sticky colour stage beside a loaded record, mixed display/serif/mono type, ghost numerals, the engagement timeline as one lane chart, portrait and CSPO credential in the identity cluster. Prototype on `prototype/homepage-visual-registers`.

- [Transcribe the capabilities page into the repo](https://github.com/afurusawa/andrewfurusawa/issues/68) — Verbatim snapshot at `content/capabilities-page.md` (phone withheld; public repo). Recent work is anonymised domain + years, not named projects — a reconciliation [Lock featured-work homepage copy](https://github.com/afurusawa/andrewfurusawa/issues/73) now owns. Branch `content/capabilities-page`.

- [Decide featured-work field split across presentations](https://github.com/afurusawa/andrewfurusawa/issues/70) — One shared substance, no per-presentation copy layer. `period` splits into structured `start`/`end` with a derived label; `role` splits into `role` + `client`; new shared `outcomes: [{ result, figure? }]` list, possibly empty, replacing the prototype's `METRICS`. One `blurb`. Concreteness bar handed to #73, print-count to #75. Surfaced the homepage-priority rule now in Notes.

- [Decide site metadata for the new offer](https://github.com/afurusawa/andrewfurusawa/issues/71) — Title copies the identity line: `Andrew Furusawa · Product & Software Delivery Consulting`. Description is authored fresh, first person, offer-led, no technology names and no location. One string pair serves both the search result and the share card; no `title.template`. Adds a **built** `app/opengraph-image.tsx` from the Loaded Stage register plus `summary_large_image`; its design is handed to [Define homepage chrome inventory from the chosen visual register](https://github.com/afurusawa/andrewfurusawa/issues/75). Constrains [Lock homepage voice and section copy](https://github.com/afurusawa/andrewfurusawa/issues/72) to first person.

- [Lock homepage voice and section copy](https://github.com/afurusawa/andrewfurusawa/issues/72) — Capabilities-page prose rewritten for the web (all claims kept, blocks halved to ~40–70 words), first person, spine headings verbatim. Offer leads with speed; agentic tooling is named as why the pace holds, not as the offer. The edge is the product-owner/engineer crossover — "either seat, or both" — stated **once**, in a new lede, and then demonstrated by the `Where I help` row order. `Where I help` splits 2 dense bullets into 4 rows; `How I work` stays 3. Location is `Inland Empire, CA · Remote`; 12+ years, degree and CSPO all move into the identity cluster. Contact lead-in names the paid discovery sprint. Handed #75 a pull-quote string plus the finding that per-section stage figures are unsupported by the substance; handed #73 a newly surfaced résumé that **names clients** the capabilities page anonymises.

- [Lock featured-work homepage copy](https://github.com/afurusawa/andrewfurusawa/issues/73) — Clients are **named** (résumé beats the capabilities page; cold traffic reads anonymisation as redaction), with a new shared `domain` field carrying the industry range that naming loses. Blurbs hand every figure to `outcomes` so no record prints a number twice; the education project is retitled **AI debate practice platform**, dated 2026–present, and its `client` is empty — relaxing #70's invariant to `client?`. Cap of three holds and the 2024–2026 gap stays. All strings ship to `/90s` verbatim; the experiment loses the blurb figures.

- [Lock colour-scheme persistence and first-paint](https://github.com/afurusawa/andrewfurusawa/issues/74) — Adopt **`next-themes`** (pinned to 0.4.6), not a hand-written mechanism: `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`, `disableTransitionOnChange`, `enableColorScheme={false}` until the dark palette exists. Storage is the key `theme` with explicit `"light"`/`"dark"`. `/90s` is isolated by **multiple root layouts** — provider only in the portfolio one — not by `forcedTheme` or a pathname guard, which also scopes `next/font` preloads per presentation. The control, `<meta name="theme-color">` (one static light colour now) and the error/not-found paths stay hand-written; shadcn's `mode-toggle` is not adopted and nothing from shadcn/ui is pulled in. A conventionality check against production codebases overturned three interview decisions — findings on `research/dark-mode-conventions`.

- [Define homepage chrome inventory from the chosen visual register](https://github.com/afurusawa/andrewfurusawa/issues/75) — The Loaded Stage register's chrome, locked. Four type families (Inter / Newsreader / Fraunces / IBM Plex Mono) with pinned weights, three families dropped, an 11px text floor. Named colour tokens, with two computed AA failures fixed by darkening (`amber-600` field to `amber-700`, `amber-500` lane to `amber-600`). The sticky panel, per-section colour change, one-chart timeline and mobile colour card are must-have; the split ratio and internal scroll are not. The section index becomes a passive indicator, so `/` ships with **no navigation at all**. Reduced motion changes colour instantly rather than freezing it; the scroll repaint is accepted as the fifth client island with a no-JS colour floor. Theme control is fixed top-right with per-state `aria-label` and no `aria-pressed`. Nine modules plus `filterSkills.ts` and the bare-element type rules are named for deletion — verified `/90s` imports none of them. The register's "stage" is renamed the **colour panel** and added to `CONTEXT.md` (`domain/colour-panel`).

- [Decide how the capabilities-page snapshot is maintained](https://github.com/afurusawa/andrewfurusawa/issues/77) — The snapshot is scaffolding: its consumers [Lock homepage voice and section copy](https://github.com/afurusawa/andrewfurusawa/issues/72) and [Lock featured-work homepage copy](https://github.com/afurusawa/andrewfurusawa/issues/73) are closed and departed from it on purpose, so `content/capabilities-page.md` is **deleted** — joining the spec deletion list from [Define homepage chrome inventory from the chosen visual register](https://github.com/afurusawa/andrewfurusawa/issues/75) rather than going now. No re-capture rule and no drift policy; a later revision of the authored document has no claim on the site. `CONTEXT.md` keeps the term **Capabilities page** but drops the present tense — the homepage is authoritative, the document is where its substance came from (`domain/capabilities-page`).

- [Lock the dark palette for the colour panel](https://github.com/afurusawa/andrewfurusawa/issues/78) — The colour scheme **inverts**: `neutral-950` paper, fields become the `-300` tint of their hue carrying dark ink, and the neutral field flips **polarity** (`neutral-100`) rather than gaining a hue, so #75's five-colour sequence holds. Ink stays one token with the field; the panel numeral is 7% of the ink and the record numeral is `hue-950`; lanes lift to `teal-500`/`indigo-400`/`amber-500` — optional, since the light lanes already pass on a dark track. A correction to #75: **the panel's opacity ladder fails AA in the light scheme**, `amber-700` at every tier, so the ladder is **removed in both schemes** and type carries the hierarchy instead. Both schemes ship in one release (`enableColorScheme` on, per-scheme `theme-color`); the built share image stays dark in both. Exact values handed to [Prototype the exact dark-scheme values for the colour panel](https://github.com/afurusawa/andrewfurusawa/issues/80). New term **Colour scheme** in `CONTEXT.md` (`domain/colour-scheme`).

- [Set the performance budget for the rebuilt homepage chrome](https://github.com/afurusawa/andrewfurusawa/issues/79) — Live ceilings carry in KiB, `/` only: 500 / 150 / 100 / 200 plus CWV. Pinned latin stack (Inter / Newsreader / Plex 400, Fraunces optical-size at 400, self-hosted Fraunces cut) fits: 242.9 / 117.8 / 92.5 KiB measured on `prototype/homepage-chrome-budget`. Extra weights do not fit.

## Not yet specified

- Second-pass / polish prototypes beyond the palette. The dark-scheme values have graduated into [Prototype the exact dark-scheme values for the colour panel](https://github.com/afurusawa/andrewfurusawa/issues/80); what else needs a screen before the spec is packaged is still dim.
- Whether the colour panel's **mobile** behaviour needs a verification pass before the spec is packaged. `preview_resize` has timed out in every prototype round that tried it, so the full-width colour card and progress bar are design intent, not a tested result.

## Out of scope

- Implementing the redesign (later effort once the spec exists).
- Restyling `/90s` chrome, or rewriting its Front-End Developer identity line.
- Cutting `/90s` over as the public site, or linking it from `/`.
- Audience fork: extra routes, a buyer toggle, or two CTA stories.
- Downloadable PDF, or treating the capabilities page as the product.
- New routes beyond `/` (blog, case studies).
- CMS; server-backed contact form.
- Publishing a phone number on `/`.
- Keeping the homepage skills wall or filter UI.
- Reopening the stack (stay on Next.js).




