# Throwaway colour-panel palette prototype

**Palette only** — register H ("Loaded Stage") at `4e8a1ed`, retokened to
answer [Prototype the exact dark-scheme values for the colour
panel](https://github.com/afurusawa/andrewfurusawa/issues/80) on
[Wayfinder: homepage rebuild from the capabilities
page](https://github.com/afurusawa/andrewfurusawa/issues/66).

This is not a fifth register. Layout, type mix, and IA are frozen. The
opacity ladder is gone in both schemes; type carries the hierarchy. Mono
strings sit on the 11px floor from [Define homepage chrome inventory from the
chosen visual register](https://github.com/afurusawa/andrewfurusawa/issues/75).

Run `npm run dev`, then open
<http://localhost:3000/prototype/homepage-registers?variant=A&scheme=dark>

- ← → cycles palettes A / B / C
- the scheme button, or `L` / `D`, flips the locked light control

## What to look at

| Key | Name            | Dark fields                                      | Dark lanes                          |
| --- | --------------- | ------------------------------------------------ | ----------------------------------- |
| `A` | Starting point  | `emerald/blue/amber/rose-300` + `neutral-100`    | `teal-500` / `indigo-400` / `amber-500` |
| `B` | Calmer tints    | same hues at `-400`; `neutral-100` unchanged     | lifted, same as A                   |
| `C` | Unlifted lanes  | same as A                                        | `teal-600` / `indigo-500` / `amber-600` |

Light is not a variant. It is the locked scheme from #75 (with #78's
`amber-700` field, `amber-600` lane, and no opacity ladder), so the type
hierarchy can be judged on the default rendering too.

Rules that are not up for revision: inverted colour scheme, polarity-flipped
neutral field, `neutral-950` paper, ink-and-field as one token, panel numeral
at 7% of the ink, record numeral as `hue-950`, AA on the tokens.

## Ground rules

Stub copy, real projects, throwaway. Do not promote this code — the winning
values land in the spec, then get rebuilt.
