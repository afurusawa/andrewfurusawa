# THROWAWAY — homepage refinements

Question: which information hierarchy preserves the portfolio’s character while
making the offer, evidence, and next action easier to reach, especially on a phone?

Run `npm run prototype:homepage`, then open <http://localhost:3000/?variant=D>.
The `prototype:homepage` script also works with `pnpm run` on Node 22.13 or newer.

- `D`: Original design + client situations — the current page, with an early email
  action and concrete client situations in the four existing Where I help rows.
- `A`: Refined split — changing sidebar, useful section links, offer and proof first.
- `B`: Work first — horizontal masthead and three prominent project results.
- `C`: Start with the problem — client situations link into relevant capabilities.

The bottom arrows and keyboard left/right keys cycle through shareable variants.
The top disclosure explains the active layout, order, mobile behavior, and shared
changes; the console also prints that state on every switch. State is URL-only.
The existing theme control is available in every variant.

All variants use the actual project data. Proposed copy is local to `content.ts`.
The placeholder writing section is omitted in A–C. D retains the original page.
`/` without a variant retains the existing page. Production ignores `?variant=`.
No new assets or dependencies are added.

Checked: TypeScript (`tsc --noEmit`), all variants at 1280px, 390px, and
320px; section links, sidebar color changes, arrow-button and keyboard cycling,
keyboard protection while typing, theme switching, and the original `/` rendering.
D was also checked at 1280px, 390px, and 320px, including the unchanged 42/58
desktop split, four situation headings, email target, and light/dark rendering.

## Verdict

Andrew prefers the existing visual design, an early contact action, and C's
concrete examples of client situations. D combines that feedback using the actual
homepage component, without A–C's layout changes. Copy remains proposed; no
production changes have been promoted.
Preserve this exploration on `prototype/homepage-refinements`; rebuild the chosen
changes for production after a direction is selected.
