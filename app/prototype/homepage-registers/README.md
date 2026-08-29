# Throwaway homepage visual-register prototype

**Structurally different** full-page registers for the rebuilt public homepage
(`/`), answering [Prototype homepage visual registers for the public
homepage](https://github.com/afurusawa/andrewfurusawa/issues/67) on
[Wayfinder: homepage rebuild from the capabilities
page](https://github.com/afurusawa/andrewfurusawa/issues/66).

Run `npm run dev`, then open
<http://localhost:3000/prototype/homepage-registers> and cycle with the bottom
bar or the ← → keys.

## Round 3 — the parts that survived, recombined

Built from the round-2 verdict: E's typographic range and ghost numerals, G's
information architecture and colour transitions, F's engagement timeline (the
only part of F worth keeping — now `timeline.ts`). The record side is loaded
with more to look at, and mobile keeps the colour story instead of flattening.

| Variant | Name            | Structure                                                                                          |
| ------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `H`     | Loaded Stage    | G's side stage, but the record carries ghost numerals, the timeline and mixed type; below `lg` the stage becomes a full colour card per section plus a sticky progress bar |
| `I`     | Portrait Ledger | No sticky chrome at all — portrait masthead, full-bleed colour bands, timeline inverted on a dark band. Reflows identically at every width |
| `J`     | Sticky Marquee  | Colour moves from a side stage to a sticky top marquee, so content gets the full page width; work drawn as three lanes on one shared axis |

Kept from round 2 for comparison: `G` (Split Stage — the IA these are built on)
and `E` (Rail + Bands — the typography they borrow).

## Retired

- `A` Editorial Broadsheet, `B` Studio Grid — round 1, at commit `b820b8e`.
- `C` Dossier Rail (superseded), `D` Poster Panels, `F` Data Portrait — at
  commit `2613dd1`. F's timeline lives on in `timeline.ts`.

## Ground rules

All variants render the locked spine — What I do / Where I help / Recent work /
How I work + one contact cluster — light-only, with no skills wall and no phone
number.

**The prose is stub copy**, written to the spine while [Transcribe the
capabilities page into the
repo](https://github.com/afurusawa/andrewfurusawa/issues/68) is open. Judge
structure, density, and type — not the words. Projects and contact channels are
the real shared substance from `app/config`. The outcome numerals in
`timeline.ts` are hand-pulled from the stub blurbs and are prototype-only.

Round 3 added two real assets under `public/prototype/`: the portrait and the
CSPO badge (Scrum Alliance, 2026). Whether the homepage carries a face or a
credential badge at all is a decision for the register, not settled here.

`PrototypeSwitcher` reads `?variant=` off `location` rather than through
`useSearchParams`, which suspends and would need a `<Suspense>` boundary around
the whole prototype. Consequence: the server always renders the default
variant and the client corrects on mount. Fine for a throwaway.

Throwaway by construction: no tests, no abstractions, no dark treatment. Do not
promote this code — the winning register gets rebuilt properly against the spec.
