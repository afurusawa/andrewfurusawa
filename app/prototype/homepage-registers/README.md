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
<http://localhost:3000/prototype/homepage-registers?variant=D&scheme=dark>

- ← → cycles palettes D / A / B / C
- the scheme button, or `L` / `D`, flips the locked light control

## What to look at

| Key | Name            | Dark fields                                      | Dark lanes                          |
| --- | --------------- | ------------------------------------------------ | ----------------------------------- |
| `D` | Panel holds     | same as light (`800`/`700` + white ink)          | lifted                              |
| `A` | Starting point  | `emerald/blue/amber/rose-300` + `neutral-100`    | `teal-500` / `indigo-400` / `amber-500` |
| `B` | Calmer tints    | same hues at `-400`; `neutral-100` unchanged     | lifted, same as A                   |
| `C` | Unlifted lanes  | same as A                                        | `teal-600` / `indigo-500` / `amber-600` |

Light is not a variant. It is the locked scheme from #75 (with #78's
`amber-700` field, `amber-600` lane, and no opacity ladder), so the type
hierarchy can be judged on the default rendering too.

`D` overturns the inversion of the colour panel itself — the panel is a
coloured field with its own ink, so it does not have to follow the paper.
Hue-on-paper then splits from the field token, because the light field
values fail on `neutral-950`. The `Recent work` field (`neutral-900` on
`neutral-950`) nearly vanishes; that is the cost of holding the panel.

## Ground rules

Stub copy, real projects, throwaway. Do not promote this code — the winning
values land in the spec, then get rebuilt.
