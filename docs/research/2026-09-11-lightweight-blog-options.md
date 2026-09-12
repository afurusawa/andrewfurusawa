# Lightweight blog options for dual presentations

**Date:** 2026-09-11  
**Scope:** Stack-fit research only. Does not implement a blog, does not lock an ADR, does not open a tracker issue. A blog is a new domain concept: a dated feed of writing. It is not a skill note and not an extension of the skill-note catalogue.

## Short answer

**Homeroll.** Add `content/blog/*.md` plus a sibling module in `app/lib/` that reuses the six locked Markdown packages already on the server. Emit a typed record both presentations consume. Each presentation supplies its own chrome.

The pipeline that already ships skill notes already reads Markdown at build time, parses frontmatter, compiles to sanitized HTML, publishes by file existence, fails the build on bad files, and is tested in a node Vitest environment. A personal-portfolio blog adds a dated listing, two chrome shells, RSS, and sitemap entries. That is route and domain work, not a CMS. A typed compiler (Velite or Content Collections) would save schema codegen and a watch loop. At this volume that is not worth a new dependency, a `next.config` spawn, generated output, or a second Markdown dialect.

Do not introduce MDX. Do not add a CMS, database, or runtime API. Do not take a docs framework that owns chrome. Public canonical URLs belong on the modern presentation (indexed, in the sitemap). The experiment may tease the same records, and may render the body in its own chrome as a noindex duplicate with `rel=canonical` to the public URL. The experiment may link *out* to that public URL. The modern presentation still does not link *into* `/90s`.

---

## 1. Constraints verified in this repo

One codebase, two presentations of the same substance: `/` (modern, indexed) and `/90s` (experiment, soft secret). No CMS, no database, no API. Content is TypeScript modules under `app/config/` plus Markdown under `content/skills/`, read at build time. [`docs/MAP.md`](../MAP.md)

**Stack** ([`package.json`](../../package.json)): Next.js `15.5.22`, React `^19.0.0`, TypeScript 5, Tailwind v4, Vitest, Vercel. `packageManager: pnpm@11.24.0`. `npm run dev` is `next dev --turbopack`.

**Markdown lock.** Skill notes compile with `gray-matter` + `unified` + `remark-parse` + `remark-rehype` + `rehype-sanitize` + `rehype-stringify`. Server components only. Explicit lock: no MDX, no GFM, no raw HTML. Enforced by [`app/lib/skillCatalogue.test.ts`](../../app/lib/skillCatalogue.test.ts) (`ships the six locked packages and no MDX, GFM, or raw-HTML plugin`). Pipeline: [`app/lib/skillCatalogue.ts`](../../app/lib/skillCatalogue.ts).

**Dual-presentation rule.** There is no shared `app/layout.tsx`. `app/(portfolio)/` and `app/90s/` are separate root layouts. `app/90s/` imports data from `app/config/` and nothing from `app/components/`. Share substance, never chrome. Anything added to a shared root layout would appear on both presentations. [`docs/MAP.md`](../MAP.md)

**Tests.** Vitest runs in a `node` environment and only collects `app/**/*.test.ts`. Logic belongs in `app/lib/`. [`docs/MAP.md`](../MAP.md)

**Performance.** Mobile p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; ≤ 500 KiB initial transfer, ≤ 150 KiB initial JS, ≤ 100 KiB fonts, ≤ 200 KiB largest image. A new dependency or font is a budget decision. Client islands on `/` are theme + colour-panel observer only. [`docs/MAP.md`](../MAP.md)

**Discoverability.** [`app/sitemap.ts`](../../app/sitemap.ts) lists `/` only. `/90s` is crawl-allowed, `X-Robots-Tag: noindex, nofollow` on `/90s` and `/90s/:path*`, not in the sitemap. [`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts)

**Domain.** A skill note is first-person writing about one skill inside the experiment. CONTEXT.md: avoid *post* (implies a dated feed). A blog is a new concept. [`CONTEXT.md`](../../CONTEXT.md)

**CSP.** `default-src 'self'`. No `frame-src` exception. Third-party iframes (Medium, Substack embeds) are blocked unless the policy is widened. That is a budget and security decision, not a default. [`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts)

Next.js already documents the primitives a homeroll would use:

- Dynamic routes + [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) (already used for skill notes).
- [`generateMetadata`](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) on Server Components.
- [`sitemap.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) returning `{ url, lastModified? }[]`.
- [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route) for non-UI responses, including the official `app/rss.xml/route.ts` example.

The official Next.js Markdown/MDX guide also shows the same `unified` chain this repo already ships, as the “how markdown becomes HTML” deep dive, independent of `@next/mdx`. [Next.js: How to use markdown and MDX](https://nextjs.org/docs/app/guides/mdx)

---

## 2. What “shown on both” means

Blog entries are **substance**. Both presentations consume the same records. Each presentation supplies listing cards, entry-page shell, type, and CSS. A kit that owns the entry-page chrome is only acceptable if that chrome can be stripped and the data consumed independently.

### URL strategy (part of the research)

| Surface | Presentation | Indexing |
| --- | --- | --- |
| Teaser list on `/` | modern | indexed (homepage already is) |
| Listing + entry routes, e.g. `/blog`, `/blog/[slug]` | modern | indexed; add to `sitemap.ts` |
| Teaser list on `/90s` hub | experiment | noindex via existing `/90s/:path*` header |
| Optional full body at `/90s/blog/[slug]` | experiment | noindex; if rendered, set `rel=canonical` to the public URL |

**Canonical public URL on the modern presentation.** Search should see one URL per entry. The experiment is a soft secret: absence from search is the goal, not absence from crawlers. [`CONTEXT.md`](../../CONTEXT.md)

**Soft-secret inbound rule.** The modern presentation does not link *into* `/90s`. That rule is about advertising the experiment. The reverse is a different question: the experiment linking *out* to a public, indexed `/blog/[slug]` does not advertise `/90s` to the modern audience. It is allowed. Prefer it for “read the full piece” if the experiment only teases.

**Do not duplicate without a canonical.** If `/90s` renders the same body in experiment chrome, that URL stays noindex and should point `rel=canonical` at the public URL so crawlers that ignore `noindex` still see one document.

**Homepage teasers.** A short list on `/` and a short list on the `/90s` hub. Both read the same sorted records. Neither list is chrome-shared.

---

## 3. Homeroll / extend the existing pipeline

**What already exists.** [`skillCatalogue.ts`](../../app/lib/skillCatalogue.ts) reads `content/skills/<slug>.md`, takes the slug from the filename, requires `summary`, optionally reads `updated`, compiles the body with the six locked packages, sanitizes HTML, and joins notes to the skills catalogue. An orphan note fails `next build`. The experiment route injects that HTML with `dangerouslySetInnerHTML` after the sanitize pass. [`app/90s/skills/[slug]/page.tsx`](../../app/90s/skills/[slug]/page.tsx)

**What a blog still needs to write** (this is the whole gap):

1. **`BlogEntry` type** in `app/lib/`: `{ slug, title, date, summary, html, draft? }`. Distinct from `SkillNote`. A blog entry is not bound to a catalogue skill.
2. **Reader** for `content/blog/*.md`: same `gray-matter` + `unified` chain, or a shared `renderMarkdownHtml()` extracted from the note pipeline so both stay on the lock.
3. **Publish policy.** Skill notes publish by existing. A dated feed usually wants drafts. Recommend: filename is the slug; `date` and `title` and `summary` required; `draft: true` excludes the file from listings, sitemap, RSS, and `generateStaticParams`. Absence of the flag publishes. Do not reuse the skill-note “orphan throws” join; blog files are the source of truth.
4. **Listing sort** by `date` descending.
5. **Two route trees, or one plus teasers.** Public: `app/(portfolio)/blog/page.tsx` and `app/(portfolio)/blog/[slug]/page.tsx` with `generateStaticParams` + `dynamicParams = false` (same pattern as skill notes). Experiment: hub teaser; optional `app/90s/blog/[slug]/page.tsx` that reads the same record and wraps it in experiment chrome.
6. **Homepage teasers** on `/` and `/90s`, each with its own card chrome.
7. **RSS** via a Route Handler at e.g. `app/rss.xml/route.ts`. [Next.js Route Handlers, non-UI example](https://nextjs.org/docs/app/api-reference/file-conventions/route)
8. **Sitemap** entries for `/blog` and each published slug. Leave `/90s` out. [Next.js sitemap.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
9. **Metadata** via `generateMetadata` per public entry. [Next.js metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
10. **Images.** Not in the skill-note pipeline today. For a lightweight blog, put files in `public/blog/` and reference them from Markdown as ordinary `<img>` after sanitize. `next/image` is chrome; do not share an image component across presentations. A new image is a budget decision (≤ 200 KiB largest image).
11. **Syntax highlighting.** Not required for a first slice. Adding Shiki/`rehype-pretty-code` is a new dependency and a lock exception. Defer until an entry actually needs code samples.

**What a compiler/CMS would save:** Zod/schema codegen, a file watcher wired into `next dev`, maybe image copy-and-hash. It would not write the two chrome trees, RSS, sitemap policy, or teasers. Those stay in this repo either way.

**Volume.** This is a personal portfolio, not a newsroom. Dozens of files, not thousands. Incremental compilers earn their keep at CMS scale. Here the existing `readdirSync` + parse is the same shape as skill notes.

**Fit.** Dual-presentation: yes (typed records, HTML string, no chrome). Architecture: yes. Client JS: none if routes stay Server Components. Turbopack: no plugin. MDX: no. Authoring: git Markdown. Testable: `app/lib/blogCatalogue.test.ts` next to the module. Maintenance: this repo already maintains the six packages. Cost: zero new npm packages if the HTML helper is shared.

---

## 4. Typed content compilers (git Markdown, no hosted CMS)

### Velite

[Velite](https://velite.js.org) turns Markdown / MDX / YAML / JSON into a typed data layer with Zod. Framework-agnostic: it writes `.velite` output you import. [GitHub README](https://github.com/zce/velite)

- **Next.js 15 / App Router / React 19.** Integration is “call `velite.build()` from `next.config`,” not a React runtime. [Velite: Integration with Next.js](https://github.com/zce/velite/blob/main/docs/guide/with-nextjs.md)
- **MDX.** Optional. `s.markdown()` emits HTML; `s.mdx()` emits function-body code. [Velite: Define Collections](https://github.com/zce/velite/blob/main/docs/guide/define-collections.md)
- **Client JS.** Build-time only if you import data, not MDX runtime.
- **Turbopack.** The webpack plugin (`VeliteWebpackPlugin`) **does not work with Turbopack**. Official replacement: spawn `import('velite').then(m => m.build({ watch: isDev }))` from `next.config`. [same Next.js guide](https://github.com/zce/velite/blob/main/docs/guide/with-nextjs.md)
- **Typed contract.** Yes. Collections + generated types.
- **CMS/DB/API.** No.
- **Vercel.** Yes as a build-time step. The same guide notes a historical Vercel + `sharp` crash when using `npm-run-all` instead of the config spawn.
- **Maintenance.** Latest stable [v0.4.0](https://github.com/zce/velite/releases/tag/v0.4.0) (2026-06-17). `v1.0.0-alpha.3` followed two days later (core refactor). Still 0.x for the recommended line.
- **Dual-presentation.** Yes if you use `s.markdown()` and import the records into both trees.
- **Fights this repo.** Default markdown options are `{ gfm: true, removeComments: true, copyLinkedFiles: true }`. [Velite schemas: `s.markdown()`](https://github.com/zce/velite/blob/main/docs/guide/velite-schemas.md) GFM is locked out here. You would have to turn GFM off and still would not get `rehype-sanitize` unless you add it. New dependency, generated `.velite`, `next.config` side effect. Image hashing via `s.image()` is extra surface against the image budget.

**Verdict:** closest compiler if this repo later wants schema codegen. Not justified for a first blog. If chosen, disable GFM, keep sanitize, use `s.markdown()` not `s.mdx()`, spawn from `next.config` (never the webpack plugin).

### Content Collections

[Content Collections](https://github.com/sdorra/content-collections) (`sdorra/content-collections`) transforms files into type-safe collections with Zod. Markdown is **not** compiled by default; `@content-collections/markdown` / `@content-collections/mdx` are optional. [README](https://github.com/sdorra/content-collections/blob/main/README.md)

- **Next.js adapter.** `@content-collections/next` exports `withContentCollections`, which loads `next.config`, runs `createBuilder`, `builder.build()`, and `builder.watch()` in dev. It does **not** register a webpack plugin. [adapter source](https://raw.githubusercontent.com/sdorra/content-collections/main/packages/next/src/index.ts)
- **Turbopack.** Compatible with that spawn model. Next.js documents that Turbopack does not support webpack plugins; this adapter avoids that API. [Next.js Turbopack: webpack plugins](https://nextjs.org/docs/app/api-reference/turbopack)
- **MDX.** Optional package, not required.
- **Client JS.** Generated data is importable from Server Components.
- **Typed contract.** Yes (`allPosts` from the `content-collections` path alias).
- **CMS/DB/API.** No.
- **Maintenance.** [`@content-collections/core@0.15.2`](https://github.com/sdorra/content-collections/releases/tag/%40content-collections%2Fcore%400.15.2) released 2026-06-16. Active.
- **Dual-presentation.** Yes if you keep Markdown as data (or HTML via a transform) and do not render MDX components that import presentation chrome.
- **Fights this repo.** Adds `@content-collections/core`, `zod`, `@content-collections/next`, a `content-collections.ts`, a `tsconfig` path, and `.content-collections/generated`. A transform that calls this repo’s existing `unified` chain is homeroll wearing a compiler. The compiler’s value is then mostly watch + codegen.

**Verdict:** best *compiler* fit (Turbopack-safe, Markdown-first, no webpack plugin). Still more machinery than a sibling of `skillCatalogue.ts`. Runner-up, not the pick.

### Contentlayer and contentlayer2

Original Contentlayer README: **“Unfortunately Contentlayer is no longer maintained due to lack of funding.”** Points at the fork. [contentlayerdev/contentlayer](https://github.com/contentlayerdev/contentlayer)

[contentlayer2](https://github.com/timlrx/contentlayer2) is a maintained fork. Latest release [v0.5.8](https://github.com/timlrx/contentlayer2/releases/tag/v0.5.8) (2025-05-03). Integration is still `next-contentlayer2` / `withContentlayer`, a webpack `beforeCompile` hook. Turbopack does not run webpack plugins. [Next.js Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)

**Verdict:** drop. Unmaintained original; fork still webpack-plugin-shaped and not a new-project choice against this stack.

---

## 5. MDX in Next.js

This repo forbids MDX. The lock is a test, not a preference. Only break it for a capability the existing pipeline cannot provide. A lightweight blog of titles, dates, summaries, and sanitized HTML does not need JSX in Markdown.

### Official Next.js Markdown / MDX + `@next/mdx`

[Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx) and [`@next/mdx`](https://www.npmjs.com/package/@next/mdx):

- Install `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`.
- Wrap `next.config` with `createMDX()`.
- **`mdx-components.tsx` is required** for App Router and is global.
- Default extension is `.mdx`. `.md` needs a webpack `extension` override.
- Frontmatter is **not** supported by default (suggests `gray-matter` / remark plugins, which this repo already has without MDX).
- File-based `page.mdx` lives in `app/` and inherits the nearest layout: that is chrome, not a data contract.
- Turbopack: remark/rehype plugins must be **string names**; plugins with non-serializable options cannot be passed to Rust. [same guide, “Using Plugins with Turbopack”](https://nextjs.org/docs/app/guides/mdx)

Global MDX components fight dual presentation: one map of `h1`/`a`/`img` cannot be both modern and experiment chrome. Per-import `components={}` can override, but then you are threading chrome into the compiler. HTML string + two wrappers does not.

**Verdict:** do not. No capability gain for this blog. Breaks the lock, adds a bundler plugin, and couples chrome.

### `next-mdx-remote`

[hashicorp/next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) is **archived** (2026-04-09) and marked unsupported. Classic usage hydrates MDX on the client (`<MDXRemote />`). RSC entry (`next-mdx-remote/rsc`) exists but the repo is dead. README itself tells people building a small blog they may not need this stack.

**Verdict:** drop. Archived. MDX. Not needed.

### `next-mdx-remote-client`

[ipikuka/next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client) is a living fork. RSC `evaluate` / `MDXRemote` from `next-mdx-remote-client/rsc`. Still MDX. Still evaluates JavaScript from content. Security section: never render untrusted MDX.

**Verdict:** drop for this blog. Capability (JSX in entries) is exactly what the lock refuses.

---

## 6. Local-first / git CMS

### Keystatic (Thinkmill)

[Keystatic Next.js install](https://keystatic.com/docs/installation-next-js) (docs still say “existing Next.js 14” + `app` directory):

- Packages: `@keystatic/core`, `@keystatic/next`, `@markdoc/markdoc`.
- Local storage writes Markdown/Markdoc into the repo.
- Admin UI is a **client** page (`"use client"` + `makePage`) at `/keystatic`, plus an API Route Handler `app/api/keystatic/[...params]/route.ts`.
- Default content field is **Markdoc**, not the locked Markdown pipeline. Reader API is Node-only (good for Server Components). Rendering uses `Markdoc.renderers.react`, which is a React tree, not sanitized HTML.
- Deployed editing wants GitHub mode.

**Fights this repo:** introduces an API, an admin route, Markdoc, and client JS for the editor. Dual-presentation can use the Reader as data, but the admin chrome and API violate “no CMS, no API.” Authoring in git from an editor is the only benefit; this owner already writes Markdown in the repo.

**Verdict:** drop.

### Decap CMS (formerly Netlify CMS)

[Decap overview](https://decapcms.org/docs/intro/): React admin wrapping GitHub/GitLab/Bitbucket. Content stays in git.

[Decap Next.js guide](https://decapcms.org/docs/nextjs/): webpack `frontmatter-markdown-loader` in `next.config.js`, static `/public/admin` with a CDN script, Netlify Identity + Git Gateway. Turbopack does not support webpack plugins; custom webpack loaders are a real constraint here. [`docs/MAP.md`](../MAP.md), [Next.js Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)

**Verdict:** drop. Webpack-era Next guide, admin UI, Identity, not a typed data contract.

---

## 7. Hosted / DB CMS

### Sanity

[Sanity + Next.js](https://www.sanity.io/docs/nextjs) and [client config](https://www.sanity.io/docs/nextjs/configure-sanity-client-nextjs): hosted Content Lake, GROQ, `next-sanity` `createClient`. Live Content API (`defineLive`, `<SanityLive />`) is the recommended path and places a listener in the browser. Static generation wants `useCdn: false` at build. Tokens, env vars, CORS, optional embedded Studio.

**Fights this repo:** CMS + API + (if Live) client JS. Dual-presentation can consume GROQ results as data, but the architecture rule is no CMS/DB/API. Money and lock-in for a personal dated feed.

**Verdict:** drop.

### Payload 3

[Payload installation (3.x)](https://github.com/payloadcms/payload/blob/3.x/docs/getting-started/installation.mdx):

- **Requires a database adapter** (MongoDB, Postgres, or SQLite). “Payload requires a Database Adapter to establish a database connection.”
- Installs into `app/(payload)/`, wraps `next.config` with `withPayload`.
- Supported Next.js ranges: `15.2.9`–`15.2.x`, `15.3.9`–`15.3.x`, `15.4.11`–`15.4.x`, `16.2.6`+. **This repo is on Next.js `15.5.22`, which is not in those ranges.**
- Admin panel at `/admin`. Local API can be called from Server Components, but that is still a CMS + DB inside the app.

**Verdict:** drop. Database, admin chrome, Next version mismatch, fights “no CMS/DB/API.”

### Ghost (self-host or Ghost(Pro) Content API)

[Ghost Content API](https://docs.ghost.org/content-api): read-only REST, `?key=` query param, `GET /ghost/api/content/posts/`. Response includes `html`, `slug`, `published_at`, `excerpt`. Designed to be fetched by any client.

That is a runtime or build-time **API**. Self-host adds a Ghost process + DB. Ghost(Pro) is hosted money. Dual-presentation can restyle `html`, but the map forbids an API, and `html` from Ghost is not passed through this repo’s `rehype-sanitize`.

**Verdict:** drop.

---

## 8. Hosted writing platforms (blog lives elsewhere)

### Hashnode headless

Hashnode documents a public GraphQL API and a headless mode. [Hashnode Pro](https://hashnode.com/pro) lists **GraphQL API access** and **Headless mode** as Pro features ($5/month). Official starter kit talks to `https://gql.hashnode.com`. [Hashnode starter-kit README](https://github.com/Hashnode/starter-kit-hashnode-blog)

**Fights this repo:** the blog lives on Hashnode; this portfolio becomes a client. Runtime or build fetch is an API. Pro cost for the features that make “headless” real. Dual-presentation is possible (GraphQL in `app/lib/`, two chrome consumers) but abandons git-as-source and the no-API rule. Duplicate-content risk unless headless mode is on.

**Verdict:** drop. “Blog lives elsewhere.”

### Substack / Medium embed

Treat as syndication, not a portfolio blog.

- This site’s CSP is `default-src 'self'` with no `frame-src` exception. [`securityHeaders.ts`](../../app/config/securityHeaders.ts) Medium/Substack iframe embeds would not load without opening the policy.
- Opening `frame-src` for third-party widgets is a performance and privacy hit (LCP, extra JS, third-party cookies). Against the budget.
- RSS consumption at build time is technically an API fetch and still leaves canonical URLs on someone else’s domain.

**Verdict:** drop. If a piece is also on Substack/Medium, link out. Do not embed.

---

## 9. Docs frameworks that happen to do Markdown

### Fumadocs

[Fumadocs MDX](https://www.fumadocs.dev/docs/mdx) is “a tool to transform content into type-safe data, similar to Content Collections” and “not a full CMS.” Next.js setup still installs `fumadocs-mdx` + `fumadocs-core` and wraps config with `createMDX()` from `fumadocs-mdx/next`. Collections compile Markdown **and MDX** into React components. [Fumadocs MDX + Next.js](https://www.fumadocs.dev/docs/mdx/next)

Using it “as a source only” still adds an MDX compiler plugin and a docs-oriented loader (`baseUrl: '/docs'`). The UI package (`fumadocs-ui`) is the chrome you would have to refuse. Dual-presentation wants HTML or records, not a docs layout.

**Verdict:** drop for this portfolio. MDX plugin, docs-shaped, not a chrome-free data layer worth the lock break.

### Nextra

[Nextra](https://nextra.site/docs) is “a framework on top of Next.js.” Nextra 4 is App Router only. Getting started is: pick the docs theme or the blog theme, wrap `next.config` with `nextra()`, put Nextra `Layout` / `Head` / `Navbar` in the **root layout**. [Nextra 4 announcement](https://the-guild.dev/blog/nextra-4), [blog theme start](https://nextra.site/docs/blog-theme/start)

That root layout is exactly what this repo cannot share. Two presentations already own two roots. Nextra’s blog theme owns listing chrome, tags, RSS. MDX required.

**Verdict:** drop. It takes over the site.

---

## 10. Comparison

| Option | Dual-presentation (same records, no shared chrome) | Fits architecture (no CMS/DB/API, build-time files, RSC) | Client JS / budget | Turbopack / Next 15 App Router | MDX required? | Authoring | Node Vitest | Maintenance / lock-in | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Homeroll sibling of skill notes** | Yes | Yes | None if RSC | Yes, no plugin | No | Git Markdown | Yes (`app/lib/*.test.ts`) | This repo already owns the six packages | $0, no new deps |
| Velite | Yes with `s.markdown()` | Yes | None if no MDX | Yes via config spawn; webpack plugin **no** | No (optional) | Git Markdown | Indirect (generated data) | Active 0.x; GFM on by default | New dep + `.velite` |
| Content Collections | Yes | Yes | None if no MDX | Yes (builder spawn, not webpack) | No (optional) | Git Markdown | Indirect | Active (0.15.2, 2026-06) | core + zod + next adapter |
| Contentlayer | Yes in theory | Webpack-era | — | **No** (webpack plugin) | Often | Git MD/MDX | — | **Unmaintained** | — |
| contentlayer2 | Yes in theory | Fork of above | — | Still webpack plugin | Often | Git MD/MDX | — | Fork; last 0.5.8 May 2025 | — |
| `@next/mdx` | No (global `mdx-components`, page files are chrome) | Bundler plugin | MDX runtime if client components mapped | Plugins as strings only | **Yes** | MDX in `app/` | Poor | First-party but fights lock | New deps |
| next-mdx-remote | Chrome-coupled MDX tree | RSC path exists | Client hydrate in classic API | transpilePackages note | **Yes** | MDX | Poor | **Archived 2026-04-09** | — |
| next-mdx-remote-client | Same MDX coupling | RSC evaluate | Can stay RSC | Claimed Next 15/16 | **Yes** | MDX | Poor | Living fork | New dep; lock break |
| Keystatic | Reader can emit data | **No** (admin + API route + Markdoc) | Admin is client | Docs still say Next 14 | Markdoc | Git + admin UI | Reader is Node | Thinkmill | Editor surface |
| Decap | Files could be read separately | **No** (admin, Identity, webpack loader) | Admin JS | Webpack loader | No | Git + admin | No | Git CMS | Netlify Identity |
| Sanity | GROQ data yes | **No** (hosted CMS + API) | Live API is client | Yes | No | Hosted Studio | No | Hosted lock-in | Sanity plan |
| Payload 3 | Local API data yes | **No** (DB + admin + `app/(payload)`) | Admin JS | **Next 15.5.22 not in supported ranges** | No | Admin | No | DB + Payload | Hosting + DB |
| Ghost | `html` field yes | **No** (Content API) | SDK optional | Fetch from RSC | No | Ghost editor | No | Ghost host | Ghost(Pro) or VPS |
| Hashnode | GraphQL data yes | **No** (API; blog elsewhere) | Fetch | Fetch from RSC | No | Hashnode editor | No | Hashnode | Pro for headless/API |
| Medium/Substack embed | No (their chrome) | **No** | Iframe JS; CSP blocks | — | — | Their editors | No | Their platform | Canonical off-site |
| Fumadocs MDX | Component exports, not HTML | MDX plugin | Docs UI if used | `createMDX` plugin | **Yes** | MD/MDX | Poor | Docs-shaped | New deps |
| Nextra | **No** (owns root layout / theme) | Framework-on-Next | Theme JS | `nextra()` wrapper | **Yes** | MDX | Poor | Takes over site | New deps |

---

## 11. Architectural implications if homerolling

**Module.** `app/lib/blogCatalogue.ts` (name as a later spec). Do not fold blog entries into `skillCatalogue.ts`. A blog entry is not a skill note.

**Shared HTML helper.** Extract `renderMarkdownHtml` (the six-package chain) so notes and blog entries cannot drift. Keep the lock test pointed at `package.json`.

**Routes.**

```
app/(portfolio)/blog/page.tsx          // listing, modern chrome
app/(portfolio)/blog/[slug]/page.tsx   // entry, modern chrome
app/rss.xml/route.ts                   // public RSS
app/sitemap.ts                         // `/`, `/blog`, `/blog/<slug>`
app/90s/...                            // hub teaser; optional /90s/blog/[slug]
```

`app/90s/` imports the catalogue module only. No import from `app/components/`.

**Indexing.** Public routes: default index. Experiment routes: existing `X-Robots-Tag` on `/90s/:path*`. If the experiment renders a full body, export metadata `alternates.canonical` to the public URL.

**Client JS.** Listing and entry pages stay Server Components. Do not add a comments widget, a client MDX runtime, or a syntax highlighter that hydrates.

**Fonts.** Do not add a blog-only face. Modern entries use the portfolio stack; experiment entries use VT323 / Press Start 2P already loaded on `/90s`.

**Drafts.** `draft: true` in frontmatter. Tests: a drafted file is absent from `getPublishedBlogSlugs()`.

**Failure mode.** Missing `title` / `date` / `summary` throws at read time so `next build` fails. Same gate as skill-note `summary`.

---

## 12. Recommended next actions

This note is research, not a spec and not an ADR.

1. **Treat homeroll as the default path** in any later spec: `content/blog/*.md` + `app/lib/` catalogue + two chrome consumers. Do not add npm packages for the first slice.
2. **Lock URL policy in that spec:** canonical `/blog/[slug]` on the modern presentation; experiment teasers on the hub; outbound links from `/90s` to public URLs allowed; no inbound links from `/` to `/90s`; optional experiment full-body route is noindex + canonical.
3. **Keep the Markdown lock.** No MDX, no GFM, no raw HTML. Reuse `rehype-sanitize`.
4. **Defer** syntax highlighting, OG image generation, and a compiler (Velite / Content Collections) until volume or authoring pain is measured.
5. **Do not** open a Payload, Sanity, Ghost, Hashnode, Nextra, or Fumadocs implementation ticket from this finding.

---

## Sources (primary)

**This repo**

- [`docs/MAP.md`](../MAP.md)
- [`CONTEXT.md`](../../CONTEXT.md) (Skills and notes; Substance and chrome; Soft secret)
- [`package.json`](../../package.json)
- [`app/lib/skillCatalogue.ts`](../../app/lib/skillCatalogue.ts)
- [`app/lib/skillCatalogue.test.ts`](../../app/lib/skillCatalogue.test.ts)
- [`app/sitemap.ts`](../../app/sitemap.ts)
- [`app/config/securityHeaders.ts`](../../app/config/securityHeaders.ts)
- [`app/90s/skills/[slug]/page.tsx`](../../app/90s/skills/[slug]/page.tsx)

**Next.js**

- [Markdown and MDX](https://nextjs.org/docs/app/guides/mdx)
- [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [`sitemap.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route) (includes `app/rss.xml/route.ts`)
- [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) (no webpack plugins)
- [`@next/mdx` on npm](https://www.npmjs.com/package/@next/mdx)

**Compilers**

- [Velite GitHub](https://github.com/zce/velite), [Next.js integration (source docs)](https://github.com/zce/velite/blob/main/docs/guide/with-nextjs.md), [collections](https://github.com/zce/velite/blob/main/docs/guide/define-collections.md), [schemas (`s.markdown` GFM default)](https://github.com/zce/velite/blob/main/docs/guide/velite-schemas.md), [releases](https://github.com/zce/velite/releases)
- [Content Collections GitHub](https://github.com/sdorra/content-collections), [Next adapter source](https://raw.githubusercontent.com/sdorra/content-collections/main/packages/next/src/index.ts), [core 0.15.2](https://github.com/sdorra/content-collections/releases/tag/%40content-collections%2Fcore%400.15.2)
- [Contentlayer README (unmaintained)](https://github.com/contentlayerdev/contentlayer), [contentlayer2](https://github.com/timlrx/contentlayer2), [contentlayer2 v0.5.8](https://github.com/timlrx/contentlayer2/releases/tag/v0.5.8)

**MDX**

- [next-mdx-remote (archived)](https://github.com/hashicorp/next-mdx-remote)
- [next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client)

**Git CMS**

- [Keystatic + Next.js](https://keystatic.com/docs/installation-next-js), [Markdoc field](https://keystatic.com/docs/fields/markdoc)
- [Decap overview](https://decapcms.org/docs/intro/), [Decap + Next.js](https://decapcms.org/docs/nextjs/)

**Hosted / DB**

- [Sanity + Next.js](https://www.sanity.io/docs/nextjs), [Sanity client config](https://www.sanity.io/docs/nextjs/configure-sanity-client-nextjs)
- [Payload 3 installation](https://github.com/payloadcms/payload/blob/3.x/docs/getting-started/installation.mdx)
- [Ghost Content API](https://docs.ghost.org/content-api), [Ghost posts](https://docs.ghost.org/content-api/posts)

**Elsewhere**

- [Hashnode Pro (API + headless)](https://hashnode.com/pro), [Hashnode headless starter kit](https://github.com/Hashnode/starter-kit-hashnode-blog)

**Docs frameworks**

- [Fumadocs MDX](https://www.fumadocs.dev/docs/mdx), [Fumadocs MDX + Next.js](https://www.fumadocs.dev/docs/mdx/next)
- [Nextra introduction](https://nextra.site/docs), [Nextra 4](https://the-guild.dev/blog/nextra-4), [Nextra blog theme](https://nextra.site/docs/blog-theme/start)

---

## Out of scope

- Implementing routes, types, or RSS.
- Migrating off Next.js (already decided: [`2026-07-30-astro-framework-decision.md`](2026-07-30-astro-framework-decision.md)).
- Sharing React components between `/` and `/90s`.
- Treating skill notes as the blog.
- An ADR. Nothing here has cleared the hard-to-reverse bar in `docs/MAP.md`.
