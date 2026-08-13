# Agent context map

Path inventory. **Read the one section you need, not the whole file.** For why the system is shaped this way, read [`MAP.md`](MAP.md) instead.

_Last updated: 2026-08-06._

## Routes and layouts

| Path | Holds |
|------|-------|
| `app/layout.tsx` | Root layout — `<html>`, font variables, `globals.css`, Speed Insights, site metadata. Deliberately non-visual. |
| `app/(portfolio)/layout.tsx` | Modern presentation chrome: background animation, theme toggle, page padding. |
| `app/(portfolio)/page.tsx` | The public homepage `/`. |
| `app/90s/layout.tsx` | Experiment shell — wraps children in the `.experiment` class, exports its metadata. |
| `app/90s/page.tsx` | The `/90s` page. |
| `app/90s/metadata.ts` | Experiment layout unfurl + `noindex`; hub canonical lives on the page. |
| `app/90s/nineties.module.css` | All experiment chrome. Nothing else styles `/90s`. |
| `app/prototype/90s-shell/` | Throwaway shell variants A–D behind `?variant=`. Reference only. |

## Content and configuration

Everything here is data, not markup. New content belongs in this directory, never inlined in a component.

| Path | Holds |
|------|-------|
| `app/config/skills.ts` | The skills catalogue — `Skill = { slug, name, icon, category }`, shared by both presentations. |
| `app/config/profileLinks.ts` | Social and contact links — `ProfileLink`, plus hero-specific styling. |
| `app/config/site.ts` | `SITE_URL`, `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`, `absoluteUrl()`. |
| `app/config/fonts.ts` | All four Google fonts, loaded once at the root as CSS variables. |
| `app/config/securityHeaders.ts` | Response headers, consumed by `next.config.ts`. |

## Logic

Pure functions, no React, no side effects — this is what the node-environment test runner can reach.

| Path | Holds |
|------|-------|
| `app/lib/filterSkills.ts` | Skills filtering for the homepage filter UI. |

## Components (modern presentation only)

Server components unless marked. `app/90s/` must not import from here.

| Path | Client? |
|------|---------|
| `app/components/SkillsSection.tsx` | server |
| `app/components/ExperienceSection.tsx` | server |
| `app/components/ContactSection.tsx` | server |
| `app/components/Footer.tsx` | server |
| `app/components/BackgroundAnimation.tsx` | server |
| `app/components/ThemeToggle.tsx` | **client** |
| `app/components/SkillTile.tsx` | **client** |
| `app/components/SkillsFilter.tsx` | **client** |
| `app/components/SkillsFilterContext.tsx` | **client** |

## Discoverability and build config

| Path | Holds |
|------|-------|
| `app/robots.ts` | Crawler rules, sitemap and host declarations. Tested. |
| `app/sitemap.ts` | Sitemap entries — `/` only. Tested. |
| `next.config.ts` | Applies `pathHeaders`: security on `/:path*`, `X-Robots-Tag` on `/90s` and `/90s/:path*`. |
| `vitest.config.mts` | node environment, collects `app/**/*.test.ts` only. |
| `postcss.config.mjs`, `app/globals.css` | Tailwind v4 entry and the light/dark CSS-variable themes. |

## Docs

| Path | Holds |
|------|-------|
| `docs/MAP.md` | Orientation: architecture, route ownership, data contracts, conventions. |
| `docs/agent-context-map.md` | This file. |
| `CONTEXT.md` (root) | Domain glossary. Search its headings; don't load it whole. |
| `PLAN.md` (root) | Objective, active slice, backlog, completed ledger. |
| `AGENTS.md` (root) | Always-on rules. |
| `docs/design/90s-experiment-spec.md` | v1 `/90s` spec, historical. Do not treat as v2 authority. |
| `docs/agents/issue-tracker.md` | How issues, PRDs, and wayfinder maps are expressed on GitHub here. |
| `docs/agents/triage-labels.md` | The five canonical triage labels. |
| `docs/agents/domain.md` | How skills should consume `CONTEXT.md` and `docs/adr/`. |
| `docs/adr/` | Architecture decision records. Does not exist yet. |

## Do not load

Point-in-time evidence and scratch output, archived on purpose. Open only if sent there by name.

| Path | Why |
|------|-----|
| `docs/research/` | Dated research notes; findings that mattered are already in specs and decisions. |
| `.lighthouse-#14/` | Scratch output from an old ticket run. |
| `*.report.html` (repo root) | 2025 Lighthouse reports for the dead `.com` domain. |
| `README.md` | Unmodified `create-next-app` boilerplate; inaccurate about this project. |
| `.agents/skills/`, `.claude/skills/` | Vendored agent skill definitions, not project code. |
