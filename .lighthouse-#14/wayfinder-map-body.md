## Destination

A product and design **spec** for a work-in-progress experiment at `https://andrewfurusawa.dev/90s`: dark Neon Cyber Basement aesthetic, hybrid portfolio substance plus playful 90s chrome, ready for someone to implement without reopening taste or scope questions. This map plans the decisions; it does not ship the experiment.

## Notes

- **Domain / product**: personal portfolio (Next.js App Router today). Live homepage stays the public portfolio; `/90s` is a parallel secret experiment.
- **Standing preferences (charting grill)**:
  - Destination type: **spec for the experiment**, not a homepage cutover plan.
  - Content purpose: **hybrid** — real core-trio substance (identity, skills/work proof, contact) plus playful period elements.
  - Structure: **frames feel, modern routing** (sidebar/nav chrome + content pane; no real `<frameset>`).
  - Playful elements: **cosmetic theater only** (no real guestbook, hit-tracking, or webring backends).
  - Theme: **dark Neon Cyber Basement only for v1**; light Neon Cyber Dayroom is reference, not a required theme.
  - Discoverability: **secret URL only** — no link from the live homepage in the first spec.
  - Layout: **modern responsive with period skin** (reflow/stack on small screens).
  - Voice: **professional base, playful garnish** in chrome/microcopy.
  - Visual intensity: **faithful kitsch** with a short leash on motion/noise so substance stays readable.
- **Visual reference** (mood boards on the author's machine; not pixel-perfect mandates):
  - Dark primary: `C:\Users\Andrew\OneDrive\Desktop\9f2e34a2-92a3-4763-8125-98fcf909bff9.png` (Neon Cyber Basement)
  - Light secondary reference: `C:\Users\Andrew\OneDrive\Desktop\c72b7751-b20c-4d2f-86f3-89e9b8cb35fe.png` (Neon Cyber Dayroom)
- **Skills for sessions**: `/grilling`, `/domain-modeling`, `/prototype` (for shell/UI fidelity questions), `/research` (for AFK fact tickets). Consult `CONTEXT.md` / `docs/adr/` if present; create domain terms lazily only when they crystallize.
- **Refer by name**: always name maps and tickets by title (with link), never bare issue numbers alone.

## Decisions so far

<!-- empty at charting -->

## Not yet specified

- Exact design tokens beyond the mood-board palette swatches (type scale, spacing, glow recipes).
- Final marketing/microcopy strings for chrome and bio.
- Whether any main-site interaction patterns (e.g. skills filtering) carry into `/90s`.
- Performance budget for the experiment relative to the live portfolio.
- Asset strategy details once chrome inventory is set (pure CSS vs raster GIFs, who produces them).
- Coordination with broader portfolio delivery work (e.g. existing delivery-plan issues) if schedules collide.
- Branding name of the space beyond the path `/90s` (e.g. whether to adopt a "cyber basement" style title).

## Out of scope

- Redesigning or replacing the public homepage / cutting `/90s` over as the primary site.
- First-class light (Dayroom) theme for v1.
- Real period backends (guestbook storage/moderation, real hit counters, webring membership services).
- Linking `/90s` from the live site navigation or footer in this effort.
- Autoplay audio / MIDI and other intrusive period features that fight accessibility defaults.
