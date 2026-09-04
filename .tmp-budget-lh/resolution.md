## Resolved — live ceilings carry, pinned chrome fits

Settled across two grilling rounds plus a three-run mobile Lighthouse measurement of a throwaway fixture.

### Policy

1. **The live budgets carry unchanged**, stated in **KiB** (matching the 2026-07-30 baseline and Lighthouse, not MAP's "KB"), measured as a **cold mobile Lighthouse navigation of `/` only**:
   - ≤ 500 KiB initial transfer
   - ≤ 150 KiB initial JavaScript
   - ≤ 100 KiB fonts
   - ≤ 200 KiB largest image
   - mobile p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1
2. Do not raise fonts to excuse the unpinned prototype load. Do not tighten JS in the spec — 150 KiB remains the ceiling a later dependency has to fit, not the old 18.5 KiB of headroom.
3. **Accounting:** portrait is in the image and transfer budgets; the built OG image and its static Fraunces cut are out (Edge, not a navigation resource); `@vercel/speed-insights` and `next-themes` are in initial JS; `/90s` type is out of `/`'s font budget (multiple root layouts).

### Pin set

4. Four families, `latin` only, no italics:
   - Inter **400**
   - Newsreader **400** (no optical-size)
   - Fraunces **400 with optical-size**
   - IBM Plex Mono **400**
5. CTA stays weight 400. Extra weights (Inter 600, Plex 500) **do not fit** — measured font headroom is 7.5 KiB.
6. **`next/font/google` cannot pin Fraunces to weight 400 and keep the `opsz` axis.** The spec self-hosts a latin cut (`opsz` 9..144 at `wght` 400), as the fixture did. Do not load the full variable file (that is the ~66 KiB path).

### Measurement

7. Fixture on `prototype/homepage-chrome-budget` at `92fed0e`, route `/prototype/homepage-chrome-budget`. Three cold mobile Lighthouse 13.4.1 runs against local `next start`, Edge headless, simulated throttling. Payload identical across runs:

   | | Median | Ceiling |
   | --- | ---: | ---: |
   | Transfer | **242.9 KiB** | 500 |
   | JavaScript | **117.8 KiB** | 150 |
   | Fonts | **92.5 KiB** | 100 |
   | Largest image | **1.6 KiB** (stand-in JPEG) | 200 |
   | LCP | **2.48 s** | 2.5 s |
   | CLS | **0.018** | 0.1 |

8. Four latin files transferred: Inter 24.1, Newsreader 22.8, Plex 10.7, Fraunces opsz-400 34.9 KiB.
9. A real portrait of ~50–80 KiB still fits image and transfer. Lab LCP is a pass by a hair on a local server — implementation re-checks on Vercel; the 2.5 s ceiling does not move. A cold mobile Lighthouse pass against these ceilings is **implementation acceptance**, not a further wayfinder ticket.

Do not merge the fixture's root-layout font swap; it is throwaway host wiring so the live families are not double-counted.
