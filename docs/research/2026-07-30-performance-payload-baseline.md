# Performance and payload baseline

**Issue:** [#3 — Measure the portfolio performance and payload baseline](https://github.com/afurusawa/andrewfurusawa/issues/3)  
**Date:** 2026-07-30  
**Scope:** the public home page (`/`), current Next.js source, the checked-in June 2025 Lighthouse artifacts, and production reachability.

## Conclusion

There is no valid current production baseline yet. `andrewfurusawa.com` and `www.andrewfurusawa.com` returned DNS `NXDOMAIN` on 2026-07-30, so the current deployment cannot be fetched or audited. The two committed Lighthouse reports are useful historical infrastructure evidence, but they measured the original `create-next-app` screen rather than the portfolio now in this repository. They must not be used to decide whether Astro clears the agreed 20% initial-JavaScript threshold.

The first performance work should therefore be: restore the existing domain/deployment, repair the reproducible install, then collect a fresh deployed mobile baseline. The leading source-level opportunities are to narrow the page-wide client boundary, measure the large skills/icon client graph, and remove or consolidate fonts only after validating visual parity.

## Agreed acceptance targets

| Measure | Target |
| --- | ---: |
| Mobile field LCP, 75th percentile | <= 2.5 s |
| Mobile field INP, 75th percentile | <= 200 ms |
| Mobile field CLS, 75th percentile | <= 0.1 |
| Cold initial transfer, compressed | <= 500 KiB |
| Initial JavaScript, compressed | <= 150 KiB |
| Total fonts, compressed | <= 100 KiB |
| Largest delivered image | <= 200 KiB |

No current measurement is claimed against these targets.

## Production availability

On 2026-07-30, `nslookup andrewfurusawa.com` and `nslookup www.andrewfurusawa.com` both returned `Non-existent domain`; an HTTPS request consequently could not resolve the host. This blocks fresh checks of HTTP status, headers, compression, caching, deployed assets, Core Web Vitals lab data, and content sizes. The repository has no hosting configuration or deployment workflow; the Vercel footer link is not deployment evidence.

**Required recovery evidence:** a resolving production hostname, a successful HTTPS request, and confirmation that the deployed revision is the intended revision. Only then is a current production baseline possible.

## Historical Lighthouse artifacts (context only)

Both reports contain Lighthouse 12.6.1 navigation runs of `https://andrewfurusawa.com/` under Android 11 / Moto G Power (2022) mobile emulation:

| Artifact | Fetch time (UTC) | FCP | LCP | TBT | CLS | Transfer |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| [`andrewfurusawa.com_2025-06-03_19-05-43.report.html`](../../andrewfurusawa.com_2025-06-03_19-05-43.report.html) | 2025-06-04 02:05:43 | 848 ms | 1,758 ms | 14 ms | 0 | 186 KiB |
| [`andrewfurusawa.com_2025-06-03_19-06-17.report.html`](../../andrewfurusawa.com_2025-06-03_19-06-17.report.html) | 2025-06-04 02:06:17 | 817 ms | 1,744 ms | 31 ms | 0 | 186 KiB |

The historic response was small and third-party-free: 15 requests, about 110 KiB JavaScript, 59 KiB fonts, 4 KiB CSS, 4 KiB HTML, and about 3 KiB images. HTTPS, response compression, responsive/optimized images, font display, and long-lived caching passed. The reports also flagged approximately 21 KiB of unused JavaScript; one 3.9 KiB stylesheet was render-blocking.

These are **not current-site results**. Both reports identify the LCP element as the default Next.js logo and transfer `next.svg`, `globe.svg`, `file.svg`, `window.svg`, and `vercel.svg`. The current page source does not reference those assets; it renders the portfolio sections instead. The reports therefore reflect the initial starter deployment, before the portfolio UI was deployed to the inspected URL.

## Current source findings

### Delivery and render model

- The project is a Next.js 15.3.3 / React 19 App Router application with `react-icons` ([`package.json`](../../package.json)). `next.config.ts` has no delivery or caching configuration.
- There is one rendered route, `/`, and no API routes. The whole page is marked `'use client'` ([`app/page.tsx`](../../app/page.tsx)), importing `SkillsSection`, `ContactSection`, `Footer`, and social icons. In Next.js, the directive establishes the client entry boundary; it should be limited to components that need state, events, or browser APIs ([Next.js: `use client`](https://nextjs.org/docs/app/api-reference/directives/use-client)).
- `ThemeToggle` legitimately needs client JavaScript because it reads/writes `localStorage` and changes the root `.dark` class ([`app/components/ThemeToggle.tsx`](../../app/components/ThemeToggle.tsx)). `SkillsSection` needs client state for filtering ([`app/components/SkillsSection.tsx`](../../app/components/SkillsSection.tsx)). `ContactSection` and `Footer` are static but are currently imported below the page-wide client boundary.
- `SkillsSection` imports roughly 40 icon exports and renders 35 skill cards. It is the strongest source-level candidate for initial-JavaScript measurement and reduction. Narrowing the client boundary would let the static hero, contact, and footer remain server-rendered; icon SVG markup in those static sections would then not require client component code. Next.js documents dynamic imports as an additional way to defer client components or libraries when needed ([Next.js: lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)).

### Fonts, images, and visual work

- Five Google font families are initialized and all their variable classes are applied at the root: DM Serif Display, VT323, Spectral, Contrail One, and Pixelify Sans ([`app/config/fonts.ts`](../../app/config/fonts.ts), [`app/layout.tsx`](../../app/layout.tsx)). Pixelify Sans is not referenced by the stylesheet. The fresh baseline must measure the emitted font resources and verify that the stylesheet uses the intended generated font variables before any family is removed.
- `next/font` self-hosts Google fonts as deployment assets and avoids browser requests to Google; it does not make unused font families free ([Next.js: Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)).
- The current page source has no content images or third-party scripts. `app/icon.png` (14,006 bytes on disk) is the only current app-icon candidate; the legacy public SVGs are unreferenced.
- A full-viewport CSS gradient animates continuously every 15 seconds, and translucent containers use `backdrop-blur` ([`app/components/BackgroundAnimation.tsx`](../../app/components/BackgroundAnimation.tsx), [`app/globals.css`](../../app/globals.css)). These are profiling candidates for paint/compositing and reduced-motion treatment, not measured regressions.

### Reproducibility blocker

`npm ci` currently fails before installation because `package-lock.json` is out of sync with `package.json` (missing optional Tailwind, Lightning CSS, Sharp, and `@emnapi` packages). Consequently `npm run build` cannot run (`next` is not installed), and no local production artifact or bundle-size measurement was produced. Repair the lockfile in a dedicated change and require `npm ci && npm run build` to pass before recording the baseline.

## Fresh-baseline protocol

After availability and install reproducibility are restored:

1. Build the deployed revision with `npm ci && npm run build`; retain the build output and command versions.
2. Run at least three mobile Lighthouse navigation measurements against the production URL, saving JSON/HTML for each. Record FCP, LCP, CLS, TBT, INP where available, total transfer, initial JavaScript transfer, font transfer, image transfer, request count, LCP element, and render-blocking resources. Treat median and range as lab evidence, not field Core Web Vitals.
3. Use browser network data or the Lighthouse request table to compare the compressed cold-load budgets above. Repeat once with a warm cache to inspect cache behavior.
4. Validate light and dark themes, the theme toggle, the skill filter, and the animated background at mobile and desktop widths. Record any visual or interaction changes before optimizing.
5. Add real-user Core Web Vitals and uptime monitoring after the first deployment so the 75th-percentile requirements are continuously measured.

## Decision implication for Astro

Do not migrate from Next.js on the evidence available today. The historical reports cannot quantify the portfolio, the current host is unavailable, and the current project cannot produce a local build. First establish the fresh Next.js baseline and apply the low-risk client-boundary/font optimizations while preserving the current design and interactions. Consider Astro only if a like-for-like proof shows at least a 20% reduction in initial JavaScript or resolves a demonstrated rendering/caching limitation on the existing host.

## Sources

- Repository source and committed Lighthouse artifacts cited inline; inspected at `HEAD` on 2026-07-30.
- [Next.js — `use client` directive](https://nextjs.org/docs/app/api-reference/directives/use-client) (official documentation; client boundary and component guidance).
- [Next.js — Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) (official documentation; font self-hosting and loading behavior).
- [Next.js — Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading) (official documentation; deferring client components and libraries).
