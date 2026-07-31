# Deployed mobile performance and payload baseline

**Issue:** [#9 — Capture a fresh deployed performance and payload baseline](https://github.com/afurusawa/andrewfurusawa/issues/9)  
**Date:** 2026-07-30  
**Scope:** three fresh cold-load Lighthouse mobile navigation runs of `https://andrewfurusawa.dev/`.

## Conclusion

The deployed portfolio passes every agreed **lab** page-weight budget and the mobile LCP/CLS targets in three consistent Lighthouse runs. Its median simulated-mobile result was **0.97 s FCP, 1.97 s LCP, 0 CLS, and 17 ms TBT**, with **236 KiB transferred in 18 requests**. The 131.5 KiB JavaScript and 56.5 KiB fonts are both within the agreed 150 KiB and 100 KiB compressed-transfer budgets.

This is the valid current Next.js baseline that the earlier investigation lacked. It does **not** establish 75th-percentile field Core Web Vitals or INP, so it is not sufficient evidence to declare visitor experience permanently healthy. Add real-user CWV monitoring and use the same three-run process as a regression guardrail.

The evidence does not support an Astro migration now: the current Next.js delivery already clears the approved payload budgets and leaves only 18.5 KiB of headroom on the initial-JavaScript budget. Astro should be reconsidered only after a like-for-like measurement proves the agreed material benefit (at least 20% less initial JavaScript) or resolves a demonstrated delivery limitation.

## Deployed app validation

The target returned HTTP 200 on Vercel on 2026-07-30. Its document title was `Andrew Furusawa - personal website`, its HTML contained the `ANDREW FURUSAWA` portfolio heading and Next.js `/_next/static/` assets, and browser inspection showed the portfolio hero, skills filter, theme control, contact section, and footer. This is the current portfolio—not the obsolete `create-next-app` starter that invalidated the historical `.com` reports.

## Repeatable lab method

- Lighthouse **13.4.1** CLI, performance category only; each navigation used `https://andrewfurusawa.dev/`.
- Mobile form factor: the default Lighthouse mobile emulation (412 × 823 CSS pixels; Android 11 Moto G Power user agent); simulated throttling was retained (`150 ms` RTT, `1,638.4 Kbps` throughput, 4× CPU slowdown).
- Each run used a newly launched headless Chrome for Testing 151 browser. Lighthouse storage reset and browser-cache cleaning were enabled (the reports record `disableStorageReset: false`); these are cold-load diagnostics, not a warm-cache result.
- Runs were consecutive at 23:19–23:20 UTC. The three JSON reports are retained in the local measurement workspace for reproducibility; this repository records the extracted evidence below rather than committing machine-specific artifacts.

Lighthouse is a controlled lab diagnostic, while field data reflects real devices, networks, geography, behavior, and caches. Core Web Vitals success is assessed at the 75th percentile of field experience, so neither one run nor this three-run median may be represented as field CWV. [Chrome’s lab-versus-field guidance](https://web.dev/articles/lab-and-field-data-differences)

## Lighthouse results

| Run (UTC) | Perf. score | FCP | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| 2026-07-30 23:19:45 | 98 | 0.970 s | 1.954 s | 0.0000 | 16 ms |
| 2026-07-30 23:19:56 | 98 | 0.979 s | 1.965 s | 0.0125 | 17 ms |
| 2026-07-30 23:20:07 | 98 | 0.969 s | 2.113 s | 0.0000 | 36 ms |
| **Median (range)** | **98** | **0.970 s (0.969–0.979)** | **1.965 s (1.954–2.113)** | **0.0000 (0–0.0125)** | **17 ms (16–36)** |

FCP is when the first text or image renders; LCP is when the largest visible content element renders. [FCP](https://web.dev/articles/fcp) and [LCP](https://web.dev/articles/lcp) guidance provides the relevant field thresholds. TBT is a Lighthouse lab measure of the blocking portions of long tasks between FCP and TTI, not a field Core Web Vital. [Chrome’s TBT documentation](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time)

### LCP element and cache context

In all runs, the LCP candidate was the hero description paragraph beginning “With over 12 years of front-end development experience…”, not an image. The first run’s LCP breakdown recorded 293 ms time-to-first-byte and 347 ms element-render delay. No image request participates in LCP.

These values are cold-load results after Lighthouse cleared origin storage/cache. They should not be compared directly to a visitor’s repeated navigation, whose Vercel/browser caches can reduce transfer and timings. Conversely, they do not cover slower real devices, different geographies, or interactions after load. The small run-to-run LCP range (159 ms) is good repeatability evidence for this test setup, not evidence of field-percentile performance.

## Compressed transfer and request baseline

Lighthouse’s resource summary reports transferred response bytes by resource type. Each run produced the same summary:

| Resource type | Requests | Transfer | Approved budget | Result |
| --- | ---: | ---: | ---: | --- |
| Total | 18 | 236.0 KiB | ≤500 KiB | Pass (264.0 KiB headroom) |
| JavaScript | 10 | 131.5 KiB | ≤150 KiB | Pass (18.5 KiB headroom) |
| Fonts | 5 | 56.5 KiB | ≤100 KiB | Pass (43.5 KiB headroom) |
| Images | 0 | 0 KiB | ≤200 KiB largest delivered image | Pass; no delivered image |
| Stylesheet | 1 | 6.3 KiB | — | Informational |
| Document | 1 | 27.8 KiB | — | Informational |
| Other | 1 | 13.9 KiB | — | Informational |
| Third party | 0 | 0 KiB | No render-blocking third-party scripts | Pass |

The largest-image budget is not exercised by this page: icons are delivered as markup/assets rather than image requests. Request count has no approved numerical ceiling; 18 requests is the regression baseline. Lighthouse defines this summary as the combined transfer of document, script, font, image, stylesheet, media, and other resources; reducing bytes or requests can help performance even though the diagnostic itself is not score-bearing. [Chrome resource-summary documentation](https://developer.chrome.com/docs/lighthouse/performance/resource-summary/)

## Target comparison and follow-up

| Requirement | Evidence from this ticket | Status |
| --- | --- | --- |
| Mobile field LCP p75 ≤2.5 s | Lab median 1.965 s; field p75 not measured | Lab pass; field pending |
| Mobile field INP p75 ≤200 ms | Navigation Lighthouse does not provide representative field INP | Pending RUM |
| Mobile field CLS p75 ≤0.1 | Lab median 0; field p75 not measured | Lab pass; field pending |
| Cold compressed transfer ≤500 KiB | 236.0 KiB in all three runs | Pass |
| Initial compressed JS ≤150 KiB | 131.5 KiB in all three runs | Pass |
| Total compressed fonts ≤100 KiB | 56.5 KiB in all three runs | Pass |
| Largest delivered image ≤200 KiB | No image transfer | Pass / not applicable |
| No unnecessary render-blocking third party | 0 third-party requests/bytes | Pass |

The lab CLS result is especially incomplete for this animated/interactable page: CLS is assessed across the full page lifecycle, while lab tools commonly only observe load-time shifts. [Chrome’s CLS guidance](https://web.dev/articles/cls)

## Recommended resolution

Resolve #9 as complete: a fresh, current-deployment, three-run mobile baseline now exists and all approved lab transfer budgets pass. Create or prioritize delivery work to add real-user LCP/INP/CLS monitoring and uptime monitoring, retain the 236 KiB / 131.5 KiB / 56.5 KiB baseline as a release guardrail, and make no Astro migration decision until a parity experiment clears the agreed 20% JavaScript-reduction threshold.
