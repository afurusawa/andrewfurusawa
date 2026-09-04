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

- ← → cycles the Recent work hue: D violet / E cyan / F fuchsia
- the scheme button, or `L` / `D`, flips light and dark (the hue follows)

## What to look at

Panel holds (light fields + white ink; record inverts). Recent work is no
longer `neutral-900` — that field vanished on dark paper — and is a hue:

| Key | Recent work field | Why it is in the set |
| --- | ----------------- | -------------------- |
| `D` | `violet-900`      | the missing note; complements emerald; one step dimmer than `-800` |
| `E` | `cyan-800`        | cool, sits near emerald/blue without matching either |
| `F` | `fuchsia-800`     | warm-magenta, distinct from rose |

All three pass white-on-field AA. The hue is applied in both schemes so the
five-colour sequence does not fork.

## Ground rules

Stub copy, real projects, throwaway. Do not promote this code — the winning
values land in the spec, then get rebuilt.
