# Throwaway homepage visual-register prototype

**Structurally different** full-page registers for the rebuilt public homepage
(`/`), answering [Prototype homepage visual registers for the public
homepage](https://github.com/afurusawa/andrewfurusawa/issues/67) on
[Wayfinder: homepage rebuild from the capabilities
page](https://github.com/afurusawa/andrewfurusawa/issues/66).

Run `npm run dev`, then open
<http://localhost:3000/prototype/homepage-registers> and cycle with the bottom
bar or the ← → keys.

## Round 1 survivors

| Variant | Name          | Structure                                                                          |
| ------- | ------------- | ---------------------------------------------------------------------------------- |
| `C`     | Dossier Rail  | Fixed left rail (identity + spine + contact always visible), dense label/value rows |
| `D`     | Poster Panels | No nav, full-height panels, one saturated accent field, inverse work section        |

## Round 2 — C's density with D's chroma, without the dead space

| Variant | Name          | Structure                                                                             |
| ------- | ------------- | ------------------------------------------------------------------------------------- |
| `E`     | Rail + Bands  | C's rail, but each section is a full-bleed colour band — cream / white / cobalt / ink   |
| `F`     | Data Portrait | Visual interest from information design: engagement timeline, outcome numerals, tinted offer matrix |
| `G`     | Split Stage   | Sticky 45% colour stage that repaints per section beside a dense scrolling record       |

`A` (Editorial Broadsheet) and `B` (Studio Grid) were retired after round 1 —
too visually flat and too agency-like respectively. They are recoverable from
history at commit `b820b8e`.

All variants render the locked spine — What I do / Where I help / Recent work /
How I work + one contact cluster — light-only, with no skills wall and no phone
number.

**The prose is stub copy**, written to the spine while [Transcribe the
capabilities page into the
repo](https://github.com/afurusawa/andrewfurusawa/issues/68) is open. Judge
structure, density, and type — not the words. Projects and contact channels are
the real shared substance from `app/config`. `F`'s outcome numerals are
hand-pulled from the stub blurbs and are prototype-only.

Throwaway by construction: no tests, no abstractions, no dark treatment. Do not
promote this code — the winning register gets rebuilt properly against the spec.
