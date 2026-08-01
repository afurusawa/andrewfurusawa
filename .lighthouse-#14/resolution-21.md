## Resolution

**Baseline:** WCAG 2.2 **AA for the whole page** (substance and chrome). No kitsch exemption.

**Motion:** Gentle kitsch only when `prefers-reduced-motion: no-preference` (e.g. soft neon glow / divider shimmer). Under reduced motion, motion goes static. No blink/marquee on body copy or nav labels. Prefer avoiding continuous motion that would need a pause control; flash always under SC 2.3.1 limits. No autoplay audio (map out of scope).

**Non-functional theater (v1):** Strictly non-interactive. Hit counter, badges, under-construction graphics are never `<button>`, links, or other focusable controls. Decorative images use null `alt` or CSS backgrounds. Real interactive controls are limited to nav (About / Skills / Contact) and shared contact links (mailto, GitHub, LinkedIn).

**Functional theater:** Deferred to a **later effort outside this map**. v1 does not include real guestbook, hit-tracking, or other period backends.

**Trade-offs:** No intentional AA failures. Spec may include soft implementer guidance (solid/near-solid panels under body copy; dual-tone focus indicators on neon controls; decorative vs informative image treatment).

Shared understanding confirmed with author after grilling.
