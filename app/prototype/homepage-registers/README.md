# Throwaway homepage visual-register prototype

Four **structurally different** full-page registers for the rebuilt public
homepage (`/`), answering [Prototype homepage visual registers for the public
homepage](https://github.com/afurusawa/andrewfurusawa/issues/67) on
[Wayfinder: homepage rebuild from the capabilities
page](https://github.com/afurusawa/andrewfurusawa/issues/66).

Run `npm run dev`, then open
<http://localhost:3000/prototype/homepage-registers> and cycle with the bottom
bar or the ← → keys.

| Variant | Name                | Structure                                                                       |
| ------- | ------------------- | ------------------------------------------------------------------------------- |
| `A`     | Editorial Broadsheet | Paper field, serif measure, hairline rules, numbered work index, colophon contact |
| `B`     | Studio Grid         | Sticky nav + persistent CTA, bento tiles, work cards with stack chips, dark CTA block |
| `C`     | Dossier Rail        | Fixed left rail (identity + spine + contact always visible), dense label/value rows |
| `D`     | Poster Panels       | No nav, full-height panels, one saturated accent field, inverse work section       |

All four render the locked spine — What I do / Where I help / Recent work / How
I work + one contact cluster — light-only, with no skills wall and no phone
number.

**The prose is stub copy**, written to the spine while [Transcribe the
capabilities page into the
repo](https://github.com/afurusawa/andrewfurusawa/issues/68) is open. Judge
structure, density, and type — not the words. Projects and contact channels are
the real shared substance from `app/config`.

Throwaway by construction: no tests, no abstractions, no dark treatment. Do not
promote this code — the winning register gets rebuilt properly against the spec.
