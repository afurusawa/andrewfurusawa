# Astro framework decision

**Issue:** [#5 — Determine whether Astro has a material advantage over optimized Next.js](https://github.com/afurusawa/andrewfurusawa/issues/5)  
**Date:** 2026-07-30  
**Decision:** **Stay on Next.js and optimize the existing client boundaries. Do not migrate to Astro now.**

## Decision

Astro does **not** clear the agreed decision rule on the evidence available. The current one-route Next.js portfolio already meets every agreed mobile lab performance and payload budget on Vercel: 131.5 KiB initial JavaScript, 236 KiB total transfer, and 1.965 s median LCP. The only agreed path to migrate is a like-for-like result showing at least 20% less initial JavaScript, or a demonstrated delivery/caching limitation that Astro resolves. Neither has been demonstrated.

Astro has a plausible *future experiment* advantage: its islands model sends no JavaScript for ordinary Astro components by default, and the two interactive behaviors could be rebuilt as small browser scripts. That is not a measured result and it comes at the cost of a framework rewrite plus visual and interaction-parity testing. Optimized Next.js can also keep the static parts of this page out of the client bundle by making the page a Server Component and restricting client code to the theme control and skills filter. Next.js documents that pages and layouts are Server Components by default, that Server Components do not add client JavaScript, and that a `'use client'` boundary includes its imports and child components in the client graph. [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

This decision is deliberately about the framework choice, not a claim that the current implementation is fully optimized. The remaining Next.js optimization opportunity needs measurement, but it is lower-risk and directly addresses the same client-JavaScript source that an Astro migration would target.

## Numeric decision rule

| Measure | Result |
| --- | ---: |
| Current deployed initial JavaScript transfer | 131.5 KiB |
| Required reduction | at least 20% |
| Minimum byte reduction to qualify | 26.3 KiB |
| Astro qualifying result | **less than 105.2 KiB** initial JavaScript on a like-for-like cold deployed test |
| Actual measured Astro result | Not measured |
| Delivery/caching limitation resolved by Astro | None demonstrated |

The strict “less than” threshold follows the agreed rule: 131.5 KiB × 0.80 = 105.2 KiB. The baseline is the three-run deployed mobile measurement, not the local build report. [Deployed mobile performance and payload baseline](2026-07-30-deployed-mobile-performance-baseline.md)

## Current architecture and what it means

The site has one public, statically prerendered route (`/`) and no API routes. A fresh local production build confirms that `/` is static and reports 128 kB First Load JS; that build diagnostic and the deployed compressed-transfer baseline use different methods, so it must not replace the 131.5 KiB decision baseline. [`package.json`](../../package.json), [`app/page.tsx`](../../app/page.tsx), [`next.config.ts`](../../next.config.ts)

Most visible content is static: the hero, contact content, footer, background markup, and CSS animation require no browser state. However, [`app/page.tsx`](../../app/page.tsx) is marked `'use client'`, so its hero social icons and imported `SkillsSection`, `ContactSection`, and `Footer` fall below one page-wide client boundary. `ContactSection` is also marked client-side despite containing only links. The actual browser-only behaviors are narrower:

- [`ThemeToggle.tsx`](../../app/components/ThemeToggle.tsx) reads/writes `localStorage`, updates the root dark-mode class, and manages click state.
- [`SkillsSection.tsx`](../../app/components/SkillsSection.tsx) holds filter state and imports the skill icon set.

This is exactly the composition Next.js recommends: use Server Components for static/SEO content and nest small Client Components only where state, events, or browser APIs are needed. It means a page-wide client boundary is an implementation choice, not a Next.js limitation. [Next.js: `use client`](https://nextjs.org/docs/app/api-reference/directives/use-client)

## Astro comparison

| Concern | Optimized Next.js 15 | Astro | Decision impact |
| --- | --- | --- | --- |
| Static page delivery | The App Router can prerender static routes; Server Components do not add client JavaScript. | Astro renders components to HTML by default and sends no component JavaScript unless interactivity is added. | Both can deliver this one-route portfolio as static content. |
| Theme and filter | Keep two narrowly scoped Client Components; React is still needed for those components. | Use React islands, or rewrite both as browser scripts. The latter could remove React runtime cost but is a behavior rewrite. | Potential Astro advantage is plausible but unmeasured. |
| Initial JavaScript controls | Restrict `'use client'` boundaries; defer optional client libraries/components when evidence supports it. | Client directives explicitly choose island hydration; standard scripts avoid a UI framework runtime. | Both require deliberate client-boundary design; neither guarantees the qualifying result. |
| Vercel deployment/caching | Static assets are globally cached by Vercel’s CDN. | Vercel auto-detects Astro; static deployment uses the same CDN. On-demand Astro rendering needs an adapter, which this static site does not need. | No demonstrated delivery or caching advantage. |
| Migration scope/risk | Preserve the working build and host; make isolated component-boundary changes. | Replace App Router layout/metadata, font setup, component rendering, and interaction implementation; revalidate visuals, themes, responsive layout, accessibility, SEO, headers, and monitoring. | A material cost without an evidenced performance return. |

Official Astro documentation supports its zero-JavaScript-by-default model and its use of client islands or standard scripts for behavior. [Astro components](https://docs.astro.build/en/basics/astro-components/), [Astro scripts and event handling](https://docs.astro.build/en/guides/client-side-scripts/), [Astro islands](https://docs.astro.build/en/concepts/islands/). Official deployment documentation confirms both frameworks can remain on the current host: Next.js can produce a static export, Astro is supported on Vercel, and Vercel’s CDN caches static assets. [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/), [Vercel CDN cache](https://vercel.com/docs/caching/cdn-cache).

The current deployed evidence shows no server rendering, cache, image, or third-party delivery bottleneck for Astro to solve: there are no content-image requests or third-party bytes, and the cold-load lab runs pass all approved transfer budgets. [Deployed mobile performance and payload baseline](2026-07-30-deployed-mobile-performance-baseline.md)

## Migration cost and parity risk

A no-redesign constraint makes this a full parity migration rather than a content move. Retaining the present result requires carrying over Tailwind styling, five font declarations, the animated background, dark-mode persistence, the skill filter, social/contact links, metadata, and Vercel deployment behavior. It also requires re-testing the quality findings already known for this site (accessible control names, mobile overflow, filter behavior, robots/sitemap, headers, and dependency hygiene); Astro would not correct them automatically. [Portfolio quality audit](2026-07-30-portfolio-quality-audit.md)

Keeping the React versions of the two interactive controls in Astro would reduce the amount of hydrated UI but may retain much of the relevant React/client-runtime cost. Rewriting them as Astro/DOM scripts is the only credible route to a larger reduction, but it changes the implementation of both interactions and adds parity, accessibility, dark-mode flash, and regression risk. It must therefore be treated as an experiment, not an assumed win.

## Recommended next actions

1. **Keep the production framework as Next.js.** Do not open a migration implementation ticket from this finding.
2. In a focused Next.js optimization change, make `app/page.tsx` a Server Component; keep only the theme control and skills filter client-side; remove unnecessary client directives; then measure the same deployed cold-load baseline. Preserve the existing visual design and interactions.
3. Treat 131.5 KiB / 236 KiB / 56.5 KiB as release guardrails, add field LCP/INP/CLS and uptime monitoring, and repair the known quality findings independently of the framework decision.
4. Reopen the Astro question only if the optimized Next.js result still misses a concrete objective, or if a time-boxed parity proof deployed to the same Vercel environment measures **<105.2 KiB** initial JavaScript (and does not regress the agreed transfer, CWV, accessibility, or visual/interaction requirements).

## Suggested resolution comment for #5

> **Decision: stay on Next.js; do not migrate to Astro now.** The deployed one-page portfolio already passes the agreed lab performance budgets on Vercel (131.5 KiB initial JS, 236 KiB transfer, 1.965 s median mobile LCP). Astro would need to demonstrate a like-for-like initial-JS result below **105.2 KiB**—a reduction greater than 26.3 KiB / 20%—or solve a measured delivery/caching limitation. Neither is evidenced. Next.js can narrow the current page-wide client boundary so the static content remains server-rendered; that is the lower-risk next experiment. Full findings: `docs/research/2026-07-30-astro-framework-decision.md`.

## Sources and method

- Current repository source and the local production build were inspected on 2026-07-30; source links are cited inline.
- The deployed compressed-transfer and Lighthouse values are drawn only from [the current three-run deployed baseline](2026-07-30-deployed-mobile-performance-baseline.md).
- Framework and hosting claims use only official Next.js, Astro, and Vercel documentation linked inline. No framework benchmark was treated as evidence for this site.
