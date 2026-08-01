Part of #15

## Question

What do **primary accessibility sources** say about implementing 90s-kitsch UI patterns on a modern public page — and what techniques preserve the look without trapping keyboard, screen-reader, or vestibular users?

Cover at least:

1. Animated / blinking text and marquee-like motion (`prefers-reduced-motion`, alternatives).
2. Contrast of neon-on-black palettes (cyan/lime/magenta on near-black).
3. Decorative GIF-like chrome vs meaningful images (alt text, `aria-hidden`).
4. Fake hit counters, badge walls, and non-functional controls (avoiding false affordances).
5. Multi-pane / frames-*feel* layouts on small screens and for assistive tech.
6. Focus visibility on beveled/neon controls.

Primary sources: WCAG, WAI, MDN, relevant platform docs — not blog roundups. Write findings under `docs/research/` per repo convention.
