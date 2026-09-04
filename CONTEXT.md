# Portfolio

Andrew Furusawa's personal portfolio at `andrewfurusawa.dev` — a Next.js App Router site that renders the same professional substance through more than one presentation, including a soft-secret 90s-styled experiment.

## Language

### The site

**Portfolio**:
The whole site at `andrewfurusawa.dev`, across every presentation of it.
_Avoid_: website, homepage (the homepage is one route within it)

**Presentation**:
A complete visual rendering of the portfolio's substance with its own route, chrome, and type. Today: the modern presentation at `/` and the experiment at `/90s`.
_Avoid_: theme, skin, variant

**Experiment**:
The `/90s` presentation — a parallel, soft-secret take on the portfolio, shipped and maintained alongside the modern one rather than replacing it.
_Avoid_: prototype (that is throwaway), demo, v2 site

**Soft secret**:
Reachable by anyone who knows the URL, but never advertised — no inbound links from the modern presentation, and absent from search results. Absence from search is the goal, not absence from crawlers; this is not authentication, and nothing here is private.
_Avoid_: secret, hidden, private, gated

### Substance and chrome

**Substance**:
The real portfolio content — identity, skills, work, contact. Substance is shared across presentations; chrome is not.
_Avoid_: content (too broad), copy

**Capabilities page**:
The authored one-page offer — What I do, Where I help, Recent work, How I work — that is the source of homepage substance and section shape. It is not a presentation, not a downloadable product, and not a second site.
_Avoid_: resume, CV, about page, capabilities deck

**Offer**:
The professional proposition the homepage makes — who the work is for and what they can hire Andrew to do. The capabilities page is the source of the current offer. Distinct from chrome and from the skills catalogue.
_Avoid_: pitch, brand, value prop

**Chrome**:
The decorative frame a presentation wraps around substance — banners, nav bevels, panes, dividers, footer, texture. Chrome carries the period character; substance stays readable underneath it.
_Avoid_: styling, decoration, theme

**Theater**:
Chrome that imitates a working period feature without one behind it — the hit counter counts nothing, and there is no guestbook. Theater is non-interactive by policy.
_Avoid_: fake feature, mock, stub

**Kitsch**:
The deliberate period excess of the experiment's chrome, held on a short leash so it never costs readability or WCAG 2.2 AA.

**Neon Cyber Basement**:
The experiment's dark visual identity — pure neons on near-black, pixel-terminal body type, an Impact-class display face. Its light counterpart, **Neon Cyber Dayroom**, is a reference mood only and is not a shipped presentation.

### Work

**Project**:
One piece of shipped professional work, named and attributable — an app, a product, a platform. Substance, not chrome: shared across presentations as the same data. Distinct from the repository this site lives in, which is never called a project in domain terms.
_Avoid_: case study (promises a narrative this site does not tell), portfolio piece, app

**Featured work**:
The curated handful of projects a presentation chooses to show — a section label, never a property of a project. Capped at three by design: a project is not marked featured, it is simply in the set or absent from it.
_Avoid_: selected work, highlights, portfolio

**Outcome**:
A concrete result of a project — what was done and what it produced. Substance, shared across presentations. A project holds a list, possibly empty; each outcome may carry an optional figure the homepage prints large. The bar is concreteness: "did X, which resulted in Y" passes, "worked hard on X" does not.
_Avoid_: achievement, accomplishment (both attach to a person, not a project), metric, impact, highlight, bullet

**Domain**:
The industry a project was delivered into — Healthcare, Consumer IoT, Education. Substance, one short free-text label per project, not drawn from a catalogue. It carries the range the homepage no longer claims in prose, so a reader who does not recognise a client still places the work.
_Avoid_: industry (used interchangeably in conversation, but the field is `domain`), sector, vertical, category (taken by the skills catalogue)

### Skills and notes

**Skill**:
One named technology in the portfolio's professional skills list, shared by every presentation as the same data. Carries an explicit `slug` — its durable identity, independent of the display name.
_Avoid_: technology, tool, tag

**Skill note**:
First-person writing about one skill within the experiment — where it was used, why it fit at the time, what it taught. One note per skill at most, and only for skills with something to say. Deliberately not documentation: a note is considered and partial, never a reference.
_Avoid_: dispatch (collides with the Redux/React reducer verb), post (implies a dated feed), README (promises reference documentation, not experience)

**Publish set**:
The skills that have a note. Always a strict subset of the catalogue, and expected to stay one — a skill without a note is the normal case, not a gap.
_Avoid_: published posts, live pages

**Catalogue**:
The full list of skills as displayed — every skill appears, whether or not a note exists for it. Only skills in the publish set are links.
_Avoid_: index, registry (a registry is the set of pages, not of skills)

**Category**:
A named grouping of skills in the catalogue. Every skill has exactly one. The experiment's directory sections the tile wall by it; other presentations may ignore it.
_Avoid_: tag (implies many), folder, bucket

### Planning

**Wayfinder map**:
A charted route from a loose idea to a named destination, held as an issue on the tracker with its decisions as child tickets. The active one is summarised in [`PLAN.md`](PLAN.md).
_Avoid_: roadmap, plan, epic

**Spec**:
An implementable package of locked decisions, published as a GitHub issue via `/to-spec`. It is the source of truth for taste and scope until the change ships; after ship, the code wins. Prototypes and research notes yield to it. v1's file under `docs/design/` is historical only.
_Avoid_: design spec, design doc, PRD (the issue *is* the spec; do not keep a second copy in `docs/design/`)
