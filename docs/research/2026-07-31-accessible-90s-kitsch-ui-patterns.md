# Accessible techniques for 90s-kitsch UI patterns

**Issue:** [#20 — Research accessible techniques for 90s kitsch UI patterns](https://github.com/afurusawa/andrewfurusawa/issues/20)  
**Parent map:** [#15 — Wayfinder: 90s experiment design spec for /90s](https://github.com/afurusawa/andrewfurusawa/issues/15)  
**Date:** 2026-07-31  
**Scope:** Primary accessibility sources only (WCAG 2.2 Understanding docs and techniques, WAI tutorials, MDN where relevant, WHATWG HTML for obsolete markup). Research only — does not implement `/90s`.

## Short answer

A faithful 90s kitsch look is compatible with modern accessibility **if** period motion, chrome, and theater stay presentational: honor `prefers-reduced-motion` and pause/stop rules for marquees and blink; keep neon text and control chrome above WCAG contrast floors; treat decorative GIFs as ignorable non-text content; never give non-functional hit counters, badges, or faux buttons real control roles or focus; implement “frames feel” with modern landmarks and reflow (not real frames); and keep author-supplied focus indicators visible against beveled/neon surfaces. The aesthetic is cosmetic theater on a single modern document tree — not obsolete markup, autoplay distraction, or false affordances.

---

## 1. Animated / blinking text and marquee-like motion

### What primary sources require

**Pause, Stop, Hide (2.2.2, Level A).** For moving, blinking, or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, authors must provide a mechanism to pause, stop, or hide it unless the motion is essential. The same applies to auto-updating content, with the option to control update frequency instead. A “pause” mechanism must not trap focus or make the page unusable (e.g., pausing only while focused is not sufficient). When a page has multiple moving elements, a single page-level control that stops all of them is recommended for usability, though separate controls still meet the normative requirement.

Source: [Understanding SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)

**Sufficient techniques for 2.2.2** that map cleanly to kitsch motion:

| Technique | Application to 90s patterns |
| --- | --- |
| [G11](https://www.w3.org/WAI/WCAG22/Techniques/general/G11) | Blink effects that stop within 5 seconds |
| [G152](https://www.w3.org/WAI/WCAG22/Techniques/general/G152) | Animated GIFs that stop after *n* cycles within 5 seconds |
| [G186](https://www.w3.org/WAI/WCAG22/Techniques/general/G186) | An in-page control that stops moving/blinking/auto-updating content |
| [SCR33](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR33) | Scripted scroll/marquee with a pause control |
| [SCR22](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR22) | Scripted blink stopped within 5 seconds |

**Three Flashes or Below Threshold (2.3.1, Level A).** Web pages must not flash more than three times in any one-second period, or the flash must stay below the general/red flash thresholds. This is a non-interference criterion: failing content can block use of the whole page. Looping GIF animations must be analyzed while looping. “Blinking” (attention distraction) and “flashing” (seizure risk) are distinguished: blink may be allowed if short or stoppable; flash above threshold is never allowed even briefly.

Source: [Understanding SC 2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold)

**Animation from Interactions (2.3.3, Level AAA).** Motion animation triggered by interaction must be disableable unless essential. Vestibular reactions (dizziness, nausea, headaches) are explicitly in scope. Sufficient techniques include [C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) and [SCR40](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR40) using `prefers-reduced-motion`.

Source: [Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)

### Obsolete markup note

WHATWG HTML lists `marquee` and `blink` as obsolete/non-conforming for authors. CSS transitions and animations are the intended modern replacement for marquee-like presentation.

Source: [WHATWG HTML — Obsolete features](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features) (lists `marquee`, `blink`; notes CSS animations/transitions for marquee-like effects in the marquee implementation section)

### Techniques that preserve the look

1. **Prefer CSS-driven marquees/scrollers over `<marquee>`**, with a visible pause/stop control when motion runs longer than 5 seconds alongside other content (2.2.2 + SCR33/G186).
2. **Respect `prefers-reduced-motion: reduce`** for non-essential motion (C39). Pattern:

   ```css
   @media (prefers-reduced-motion: reduce) {
     /* disable or replace marquee/blink/parallax */
   }
   ```

   Inverse form (motion only when user has not requested reduction):

   ```css
   @media (prefers-reduced-motion: no-preference) {
     /* motion styles */
   }
   ```

3. **Cap blink and GIF loops** at ≤5 seconds of continuous attention-drawing motion (G11, G152), and keep flash frequency ≤3/s with area/luminance under thresholds (2.3.1).
4. **Static fallback for reduced motion:** show the full marquee message as static text (or slowly cross-fading opacity without spatial movement — note that 2.3.3’s motion-animation definition focuses on perceived size/shape/position change; color/opacity alone is treated differently, but continuous distraction still engages 2.2.2 if it blinks/auto-updates in parallel with other content).
5. **Do not rely on autoplay audio/MIDI** for period fidelity: map notes already place intrusive audio out of scope; 1.4.2 Audio Control also constrains autoplay audio.

### Research takeaway for `/90s`

Marquee theater is allowed as **optional motion with user control and OS preference respect**, not as endless unpausable scroll or seizure-risk blink. Default to reduced motion when the user asks for it; keep full kitsch when they do not.

---

## 2. Contrast of neon-on-black palettes

### What primary sources require

**Contrast (Minimum) (1.4.3, Level AA).** Text and images of text need a contrast ratio of at least **4.5:1** against their background; **large-scale** text (at least 18pt / ~24px, or 14pt bold / ~18.5px) needs at least **3:1**. Pure decoration, inactive controls, and logotypes are excepted. Contrast is luminance-based, not hue-based: “neon” does not exempt text. Values must not be rounded up to the threshold (e.g., 4.499:1 fails 4.5:1). Both foreground and background colors must be specified when either is specified (failure [F24](https://www.w3.org/WAI/WCAG22/Techniques/failures/F24)). Background images under text that drop effective contrast fail ([F83](https://www.w3.org/WAI/WCAG22/Techniques/failures/F83)).

Source: [Understanding SC 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)

**Non-text Contrast (1.4.11, Level AA).** Visual information needed to identify UI components and their states, and parts of graphics required for understanding, need **at least 3:1** against adjacent colors (except inactive components and unmodified user-agent appearance). Focus indicators, control borders, and meaningful icons fall here. Decorative graphics that are not required for understanding do not need 3:1.

Source: [Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)

**Contrast (Enhanced) (1.4.6, Level AAA)** raises text thresholds to 7:1 / 4.5:1 large — useful as a stretch goal for body copy on a public page, not required for AA.

Source: [Understanding SC 1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced)

### Neon-on-black implications

- **Saturated cyan / lime / magenta on near-black often pass 4.5:1** when both ends are near pure `#00ffff` / `#00ff00` / `#ff00ff` on `#000000` or very dark greys, because relative luminance contrast is high. The failure modes for kitsch palettes are usually:
  - **Dimmed “glow” text** or mid-tone neon on dark grey (looks period, fails AA).
  - **Text over busy GIF/starfield backgrounds** where local contrast collapses (F83).
  - **Thin pixel fonts / CRT-style type** that anti-alias to a fainter effective color than the CSS hex (Understanding 1.4.3 notes this; prefer thicker strokes or higher ratios).
  - **Red-ish neon on black** for protanopia: Understanding 1.4.3 notes advisory concern for long-wavelength colors against dark backgrounds for protanopia; luminance still governs the normative ratio, but designers should verify problematic pairs with a contrast tool, not assume “neon = readable.”
- **Glow and bevels:** Soft outer glows and multi-stop gradients can leave the *glyph core* at one luminance and the *halo* at another. Measure contrast on the colors that define the letter shapes against the actual background behind the text, not against the glow color alone. Wide “halos” can act as background for the letter (Understanding 1.4.3 contrast-ratio notes).
- **Controls:** Beveled buttons, neon borders, and icon-only chrome need **3:1** for the parts that identify the control and its focused/selected states (1.4.11), separate from label text (1.4.3).

### Techniques that preserve the look

1. Lock a token set of **verified AA pairs** (body, large headings, links, muted captions) before shipping chrome flourishes.
2. Put substantive copy on **solid or near-solid dark panels**, not raw animated wallpaper; keep wallpaper as decorative layers behind panels.
3. Prefer **true text** over images of neon text (easier reflow, zoom, and contrast tweaking); if images of text are used, 1.4.3 still applies and 1.4.5 Images of Text adds further constraints at AA.
4. Provide a **high-contrast content region** even if chrome stays loud — G174 allows a control that switches to a sufficient-contrast presentation if needed.

### Research takeaway for `/90s`

Neon Cyber Basement can stay neon if **content text and interactive chrome** are measured pairs on near-black, and decorative glow/wallpaper never becomes the sole background for body copy.

---

## 3. Decorative GIF-like chrome vs meaningful images

### What primary sources require

**Non-text Content (1.1.1, Level A).** All non-text content needs a text alternative that serves the equivalent purpose, with exceptions. **Pure decoration**, formatting-only, or non-presented content must be implemented so assistive technology can **ignore** it.

Source: [Understanding SC 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)

**WAI Images tutorial — Decorative images.** Decorative images (borders, spacers, corners, eye-candy, images already described by adjacent text) should use **null `alt=""`**. Omitting `alt` is not acceptable (some screen readers announce the filename). Prefer CSS background images for pure decoration when possible. WAI-ARIA `role="presentation"` is mentioned but null `alt` is more widely supported for `img`.

Source: [WAI Tutorial: Decorative Images](https://www.w3.org/WAI/tutorials/images/decorative/)

**Techniques:**

- [H67](https://www.w3.org/WAI/WCAG22/Techniques/html/H67) — null `alt` and no `title` on decorative `img`
- [C9](https://www.w3.org/WAI/WCAG22/Techniques/css/C9) — CSS for decorative images
- Failures: [F38](https://www.w3.org/WAI/WCAG22/Techniques/failures/F38) (decorative images not marked ignoreable), [F39](https://www.w3.org/WAI/WCAG22/Techniques/failures/F39) (non-null fluff like `alt="spacer"`), [F65](https://www.w3.org/WAI/WCAG22/Techniques/failures/F65) (missing `alt`)

**Animated GIFs and motion:** G152 (under 2.2.2) covers limiting animation cycles. A decorative spinning GIF that runs forever in parallel with content needs pause/stop/hide or a ≤5s stop, even when `alt=""`.

### Meaningful vs decorative for kitsch inventory

| Asset | Treatment |
| --- | --- |
| Divider bars, starfield corners, “Under Construction” eye-candy with no info | Decorative: CSS background or `alt=""` |
| Construction GIF next to real status text | Decorative if text already conveys status; else short informative `alt` |
| Skill/logo badges that identify technologies | Informative: short `alt` naming the technology (or adjacent text + null `alt` if linked group) |
| Photo of author / project screenshots | Informative: descriptive `alt` |
| Badge wall that is pure theater (not navigation) | Prefer one group description or mark each decorative; do not announce twenty “best viewed with” images |

**`aria-hidden`:** MDN and ACT-related guidance treat `aria-hidden="true"` as removing content from the accessibility tree. It must **not** wrap focusable controls (ACT rule referenced from Name, Role, Value understanding: element with `aria-hidden` must have no content in sequential focus navigation). Prefer null `alt` for decorative `img`; use `aria-hidden` carefully on decorative *containers* that contain no interactive descendants.

Sources: [Understanding SC 4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) (test rules include `aria-hidden` focus constraints); decorative image guidance above.

### Research takeaway for `/90s`

GIF chrome is fine as **noise that AT can skip**. If a graphic conveys identity, status, or navigation, give it a real text alternative; if it only sells the aesthetic, hide it from AT and still manage its motion under 2.2.2 / 2.3.1.

---

## 4. Fake hit counters, badge walls, and non-functional controls

### What primary sources require

**Name, Role, Value (4.1.2, Level A).** Every UI component must expose a programmatically determinable name and role; user-settable states/values must be programmatically settable; changes must be available to AT. Standard HTML used per spec already meets this; custom or re-purposed controls need ARIA/APIs correctly. Failures include scripted `div`/`span` controls without roles ([F59](https://www.w3.org/WAI/WCAG22/Techniques/failures/F59)), missing names ([F68](https://www.w3.org/WAI/WCAG22/Techniques/failures/F68)), and emulating links incorrectly ([F42](https://www.w3.org/WAI/WCAG22/Techniques/failures/F42)).

Source: [Understanding SC 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

**Keyboard (2.1.1, Level A)** and **Focus Visible (2.4.7)** apply to anything that *is* a control: if it behaves like a button, keyboard users must reach and operate it with a visible focus indicator.

**Non-text Content** for controls: interactive non-text content needs a name describing its purpose (1.1.1 Situation C / G82).

### False affordances — primary-source-aligned practice

Primary sources do not use the design phrase “false affordance,” but they constrain the failure mode tightly:

1. **Do not mark theater as interactive.** A painted “guestbook” panel that does nothing must not be a `<button>`, `<a href="#">`, or `role="button"` with a click handler that no-ops. Sighted users get a broken control; AT users get a named control that does nothing or surprises them (4.1.2 + keyboard expectations).
2. **Hit counters:** Prefer static text or a decorative graphic with null `alt` / plain text such as a visible label that frames it as period theater (e.g., visible caption “Hit counter (decorative)”) rather than an `input` or live region that implies real analytics. If the number is meaningful content, expose it as text; if pure kitsch, keep it out of the accessibility tree as decoration or as ordinary non-interactive text.
3. **Badge walls:** If badges are not links, do not wrap them in links. If some badges are real outbound links (e.g., actual profiles), use real `<a>` elements with descriptive link text or image `alt` that states destination/purpose ([H30](https://www.w3.org/WAI/WCAG22/Techniques/html/H30), [H37](https://www.w3.org/WAI/WCAG22/Techniques/html/H37)). Mix of real and fake “buttons” is especially harmful — real links should look/act like links; fake ones should not.
4. **Disabled-looking controls:** Inactive components are exempt from contrast (1.4.3 / 1.4.11 notes), but a fake control that only *looks* disabled while remaining focusable is worse than plain text. Prefer non-focusable text/graphics for non-functional chrome.
5. **Do not use `aria-hidden` on a focusable fake control** to “hide” bad semantics — remove it from tab order and the accessibility tree properly, or do not make it focusable at all.

### Research takeaway for `/90s`

Cosmetic theater must **look like decoration in the accessibility tree**, not like broken widgets. Map decision (“cosmetic theater only; no real guestbook/hit-tracking backends”) implies non-interactive presentation for those motifs.

---

## 5. Multi-pane / frames-feel layouts on small screens and for AT

### What primary sources require

**Obsolete frames.** WHATWG HTML lists `frame`, `frameset`, and `noframes` as non-conforming obsolete features. Authors must not use them; use `iframe` + CSS or server-side composition instead. Real framesets fragment the document model and historically broke unified keyboard/AT navigation of a single page.

Source: [WHATWG HTML — Non-conforming features](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features)

**Reflow (1.4.10, Level AA).** Content must be presentable without loss of information/functionality and without two-dimensional scrolling at **320 CSS px width** (vertical scrolling content) or **256 CSS px height** (horizontal scrolling content), except parts that require 2D layout for usage or meaning. Responsive stacking into a single column is a common pattern; relocating sections is not a loss if content remains available. Sticky headers/footers that consume the viewport when zoomed are called out as harmful; un-fixing sticky chrome at small sizes is advised ([C34](https://www.w3.org/WAI/WCAG22/Techniques/css/C34)).

Source: [Understanding SC 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)

**Info and Relationships (1.3.1)** and **Bypass Blocks (2.4.1)** support multi-region pages via programmatic structure (headings, landmarks/regions, skip links) so AT users can jump between “panes” without a frameset.

**Focus Order (2.4.3)** requires a meaningful sequence when the visual layout suggests sidebar then main content (or vice versa).

### Techniques that preserve “frames feel”

1. **Single document**, CSS grid/flex “chrome + content pane” (matches map notes: frames feel, modern routing — no real `<frameset>`).
2. **Landmarks:** e.g. `header`, `nav`, `main`, optional `aside` / `footer` so screen-reader rotor navigation replaces frame lists.
3. **Reflow:** at narrow widths / 400% zoom path, **stack** nav above or below main; do not force dual-axis scroll of the whole page for ordinary reading (1.4.10). Techniques [C31](https://www.w3.org/WAI/WCAG22/Techniques/css/C31) (flexbox), [C32](https://www.w3.org/WAI/WCAG22/Techniques/css/C32) (media queries + grid).
4. **Skip link** to `main` for long chrome (2.4.1).
5. If an `iframe` is ever used for period gimmicks, give it an accessible name ([H64](https://www.w3.org/WAI/WCAG22/Techniques/html/H64) / 4.1.2 iframe naming); prefer not embedding entire portfolio panes in iframes.

### Research takeaway for `/90s`

Implement multi-pane as **responsive CSS regions with landmarks**, not frames. Small screens and zoom must get a linear, single-axis reading order while large screens can keep the dual-pane kitsch layout.

---

## 6. Focus visibility on beveled / neon controls

### What primary sources require

**Focus Visible (2.4.7, Level AA).** Keyboard-operable UI must have a mode where the focus indicator is visible. Author styles that remove or hide the outline fail ([F78](https://www.w3.org/WAI/WCAG22/Techniques/failures/F78)). Techniques include author-supplied indicators ([G195](https://www.w3.org/WAI/WCAG22/Techniques/general/G195)), CSS focus presentation ([C15](https://www.w3.org/WAI/WCAG22/Techniques/css/C15)), two-color indicators ([C40](https://www.w3.org/WAI/WCAG22/Techniques/css/C40)), and `:focus-visible` ([C45](https://www.w3.org/WAI/WCAG22/Techniques/css/C45)).

Source: [Understanding SC 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)

**Non-text Contrast (1.4.11)** requires the focus indicator (when author-styled) to contrast **≥3:1** with adjacent colors in the focused state.

**Focus Appearance (2.4.13, Level AAA)** adds size (area at least a 2 CSS px thick perimeter) and **≥3:1 change of contrast** between focused and unfocused states for the indicator area. Not required for AA, but highly relevant to neon/bevel UIs where a 1px dim outline disappears into chrome.

Source: [Understanding SC 2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance)

### Techniques for beveled/neon chrome

1. **Never** set `outline: none` / `outline: 0` without a stronger replacement (F78).
2. Prefer a **two-color (double) focus ring** (C40) so the indicator stays visible on both black backgrounds and bright neon fills — e.g., light ring + dark ring, or `outline` + `box-shadow`/`outline-offset`.
3. Offset the ring **outside** the bevel (`outline-offset`) so embossed edges do not swallow the indicator (Focus Appearance examples favor clear perimeter indicators).
4. Ensure the focused control’s **identifying boundary** still meets 1.4.11 against adjacent page colors, not only against its own bevel highlight.
5. Avoid relying solely on neon **glow color change** that fails change-of-contrast or adjacent contrast on multi-color chrome; a solid perimeter is the simplest sufficient approach.
6. Sticky period chrome must not fully obscure focused elements when scrolled/zoomed (related: Focus Not Obscured 2.4.11 in WCAG 2.2; reflow sticky guidance in 1.4.10).

### Research takeaway for `/90s`

Period buttons can stay chunky and neon if **keyboard focus is an explicit, high-contrast, preferably dual-tone perimeter** that is never removed for aesthetic purity.

---

## Consolidated checklist for the `/90s` spec

| Pattern | Must / should | Primary anchors |
| --- | --- | --- |
| Marquee / blink / looping GIF | Pause/stop/hide if >5s parallel motion; flash ≤3/s; honor `prefers-reduced-motion`; avoid obsolete `<marquee>`/`<blink>` | 2.2.2, 2.3.1, 2.3.3, C39, WHATWG obsolete |
| Neon text on black | ≥4.5:1 (3:1 large); solid panels under copy; measure glow/wallpaper | 1.4.3, F83 |
| Control chrome / icons | ≥3:1 non-text contrast for identifying parts and states | 1.4.11 |
| Decorative GIFs / dividers | `alt=""` or CSS backgrounds; no focusable `aria-hidden` wrappers | 1.1.1, H67, C9, WAI decorative tutorial |
| Hit counter / fake guestbook / non-links | Non-interactive text or decoration; no fake `button`/`link` roles | 4.1.2, F42, F59 |
| Dual-pane layout | CSS + landmarks + reflow stack; no `frameset` | 1.4.10, 1.3.1, 2.4.1, WHATWG frames obsolete |
| Beveled neon buttons | Visible author focus; dual-tone ring recommended | 2.4.7, 1.4.11, C40; optional 2.4.13 |

## Sources (primary)

- [WCAG 2.2 Understanding: Pause, Stop, Hide (2.2.2)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- [WCAG 2.2 Understanding: Three Flashes or Below Threshold (2.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold)
- [WCAG 2.2 Understanding: Animation from Interactions (2.3.3)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)
- [Technique C39: prefers-reduced-motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39)
- [WCAG 2.2 Understanding: Contrast (Minimum) (1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- [WCAG 2.2 Understanding: Non-text Contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2 Understanding: Non-text Content (1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [WAI Tutorial: Decorative Images](https://www.w3.org/WAI/tutorials/images/decorative/)
- [WCAG 2.2 Understanding: Name, Role, Value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
- [WCAG 2.2 Understanding: Reflow (1.4.10)](https://www.w3.org/WAI/WCAG22/Understanding/reflow)
- [WCAG 2.2 Understanding: Focus Visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
- [WCAG 2.2 Understanding: Focus Appearance (2.4.13)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance)
- [WHATWG HTML: Obsolete features (marquee, blink, frames)](https://html.spec.whatwg.org/multipage/obsolete.html)
- Related techniques cited inline: G11, G152, G186, SCR22, SCR33, H67, C9, C31, C32, C34, C40, C45, G195, F24, F38, F39, F42, F59, F78, F83

## Out of scope for this note

- Implementing `/90s` UI or choosing final tokens beyond contrast rules.
- Non-primary blog roundups or third-party “90s web a11y” opinion pieces.
- Legal compliance determinations for a specific jurisdiction (WCAG technical criteria only).
