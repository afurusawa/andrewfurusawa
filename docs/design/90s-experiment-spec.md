# /90s experiment Ã¢â‚¬â€ product & design spec

**Status:** implementable (decisions frozen on wayfinder map)  
**Path:** `https://andrewfurusawa.dev/90s`  
**Wayfinder map:** [Wayfinder: 90s experiment design spec for /90s](https://github.com/afurusawa/andrewfurusawa/issues/15)  
**Agent PRD:** [Spec: /90s Neon Cyber Basement experiment](https://github.com/afurusawa/andrewfurusawa/issues/27)

This document is the durable design-doc packaging of locked wayfinder decisions. It is the source of truth for taste and scope; throwaway prototypes and research notes yield to this file (and the companion PRD) on conflict.

---

## 1. Purpose & scope

Ship a **secret, parallel** Neon Cyber Basement experiment that mixes **real portfolio substance** (identity, skills proof, contact) with **cosmetic 90s chrome**. The live modern homepage remains the public portfolio. This effort does **not** cut `/90s` over as the primary site.

**In scope:** single-page `/90s`, isolation from portfolio chrome, soft-secret SEO, hybrid-D shell, tokens, a11y AA, shared data.

**Out of scope:** homepage cutover; Dayroom light theme; real backends (guestbook, hit counters, webring); homepage links to `/90s`; autoplay audio/MIDI; multi-route `/90s/*`; contact form; auth gate.

---

## 2. Information architecture

| Decision | Value |
|----------|--------|
| Routes | **Single page** `/90s` only |
| Nav | **About Ã‚Â· Skills Ã‚Â· Contact** |
| Theater nav targets | **None** (kitsch is chrome-only) |
| Structure | Top banner stack + horizontal beveled nav + stacked panes (not left frameset) |
| Layout behavior | Modern responsive reflow with period skin; stage ~1024px |

---

## 3. Content model

| Section | Model |
|---------|--------|
| **Data sharing** | Share **profile links** and **skills data** with the live homepage |
| **About** | Name, role, homepage-parity bio (string may be experiment-specific), socials from shared links; no separate career timeline requirement |
| **Skills** | Full shared skills list as **period table/list**; **no filter UI** |
| **Contact** | mailto + GitHub + LinkedIn; period chrome; **no form**; no guestbook facade |
| **Voice** | Professional base, playful garnish in chrome microcopy |

---

## 4. Shell / visual baseline

- **Accepted direction:** hybrid **variant D** Ã¢â‚¬â€ ~1024 centered stage, multi-hue neon, top banner stack, preferred optional-pack density.
- **Reference only (not pixel mandate):** mood board Neon Cyber Basement; prototype branch `prototype/90s-frames-shell`, `/prototype/90s-shell?variant=D`.
- **Theme:** dark Neon Cyber Basement only for v1.
- **Intensity:** faithful kitsch with short leash on motion/noise so substance stays readable.

### Shell structure (top Ã¢â€ â€™ bottom)

1. Full-bleed denser starfield  
2. Centered stage (~1024 / `64rem`) with purple/magenta frame + glow  
3. Banner (radical title + tagline garnish)  
4. Horizontal beveled nav (About Ã‚Â· Skills Ã‚Â· Contact)  
5. Optional pack row (UC strip + 2Ã¢â‚¬â€œ4 badges) Ã¢â‚¬â€ **default ON** (CSS stand-ins OK)  
6. Stacked section panes with pane bars  
7. Cosmetic counter + period footer  

---

## 5. Chrome inventory

### Must-have shell (CSS + fonts only)

Palette, type, frames-feel nav, content cards/panes, cosmetic hit counter, simple dividers, period footer, dual-tone focus.

### Preferred-default pack (density ON; assets not required)

- Under-construction / caution strip  
- 2Ã¢â‚¬â€œ4 badges  
- One **denser starfield** (not circuit; not multi-texture)

### Deferred / hard no

Web-ring row, badge walls, multi-texture stacks, blink/marquee on substance or nav labels, autoplay, functional theater backends.

---

## 6. Design tokens

### Color (mood-board lock)

| Token | Hex |
|-------|-----|
| bg | `#000000` |
| panel | `#0B0E1A` |
| panel-2 | `#1A1A1A` |
| panel-deep | `#05080F` (stage ~92% opaque) |
| cyan | `#00FFFF` |
| green / text / border | `#00FF66` |
| magenta | `#FF00FF` |
| purple | `#6600CC` |
| muted | `#7DFFB0` |
| focus | cyan outline + purple ring |

Prefer pure neons over soft modern grays. Text must meet WCAG AA contrast on its background.

### Type

| Role | Rule |
|------|------|
| Body / UI | VT323 (or pixel-terminal equivalent) Ã¢â€ â€™ Courier New, Courier, monospace; ~1.125rem / lh 1.4 / tracking ~0.04em |
| Radical title | Second **Impact-class** display face (author-approved); ~1.75Ã¢â‚¬â€œ2.75rem; cyan + neon/purple shadow recipe |
| Pane bar | ~0.95rem cyan |
| Micro | ~0.85Ã¢â‚¬â€œ0.9rem muted |
| Load scope | Kitsch faces **only** on `/90s` |

### Spacing / stage

| Token | Value |
|-------|--------|
| stage-max | `64rem` (~1024px), centered |
| outer gutter | ~0.75rem |
| nav gap / pad | ~0.45rem gap; ~0.4Ãƒâ€”0.9rem pad; min-width ~6.5rem |
| main / stack | ~1rem main pad; ~0.85rem stack gap |
| pane | bar ~0.35Ãƒâ€”0.65rem; body ~0.85Ãƒâ€”0.9rem |
| pack | ~0.5Ãƒâ€”0.75rem |

### Chrome recipes

- Bevel buttons (green/cyan/magenta faces)  
- Stage: 3px purple border, magenta hairline, outer purple glow, light cyan inset wash  
- Panes: 2px section-colored borders + soft purple glow  
- Pane-bar gradient + magenta rule  
- Banner double magenta rule; nav cyan bottom rule  
- CSS neon dividers  
- Dual-tone focus: 3px cyan outline, offset 3px, + purple ring  
- **`prefers-reduced-motion`:** strip soft glows to hard offset/none; keep structure, bevels, colors, focus  

---

## 7. Asset strategy

| Layer | Strategy |
|-------|----------|
| Must shell | **CSS-only** Ã¢â‚¬â€ no required images |
| Optional pack | Dual-track: CSS stand-ins ship; real assets preferred upgrade |
| Production | Author-approved finals; agent drafts OK; stock/PD if licensed; **no hotlinks** |
| Formats | SVG preferred for UC/badges; PNG/WebP starfield; GIF only static or reduced-motion-safe; decorative null alt |
| Budget | Soft Ã¢â€°Â¤ ~150KB for optional pack total |

---

## 8. Accessibility & motion

- **WCAG 2.2 AA** whole page; no intentional kitsch exemptions  
- Gentle motion only without reduced-motion preference  
- Theater **non-interactive** for v1 (counter, badges, UC art)  
- Decorative chrome ignorable to AT; landmarks + reflow (no real frameset)  
- See `docs/research/2026-07-31-accessible-90s-kitsch-ui-patterns.md`  

---

## 9. Technical isolation defaults

| Concern | Decision |
|---------|----------|
| Layout | **B:** slim root + portfolio-only chrome layout + nested `/90s` layout/page |
| Styles | CSS Modules / experiment root class; kitsch fonts on `/90s` only |
| SEO | Full soft-secret: `noindex,nofollow`; robots disallow `/90s`; omit from sitemap; override root canonical |
| JS / share | Share **data** not chrome; Server Components default; no portfolio ThemeToggle/BackgroundAnimation; no third-party period embeds |
| Secret means | Unlinked + crawler discouragement Ã¢â‚¬â€ **not** auth |

---

## 10. Open / deferred for implement (non-blocking)

- Final microcopy (banner, pane bars, footer, UC lines) Ã¢â‚¬â€ placeholders OK  
- Performance budget vs live portfolio  
- Coordination with broader delivery-plan issues  
- Branding name beyond path `/90s`  
- Exact Impact-class font family file (author-approved at implement)  
- Real optional-pack image production (stand-ins OK at ship)  

---

## Ready to implement

An implementer can build `/90s` from this document without reopening locked taste/scope. Prototype branch and research notes are supporting references only.
