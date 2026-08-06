# Next.js MDX/content patterns for /90s skill posts

**Issue:** [#36 — Research Next.js MDX/content patterns for /90s skill posts](https://github.com/afurusawa/andrewfurusawa/issues/36)
**Parent map:** [Wayfinder: /90s hi-fi kitsch and skill-dispatch content spec](https://github.com/afurusawa/andrewfurusawa/issues/35) (v1 predecessor map: [Wayfinder: 90s experiment design spec for /90s](https://github.com/afurusawa/andrewfurusawa/issues/15))
**Date:** 2026-08-06
**Scope:** Primary sources only — official Next.js docs pinned to the repo's version (`https://nextjs.org/docs/15/...`, served as `version: 15.5.22`), first-party package READMEs/docs for `@next/mdx`, `next-mdx-remote`, `next-mdx-remote-client`, `gray-matter`, `remark-frontmatter`, `remark-mdx-frontmatter`. No blog posts or secondary write-ups. This feeds a design spec: approaches and trade-offs, not an implementation. SEO/`noindex` handling for these routes is a sibling ticket and is mentioned here only where it constrains the content/rendering choice.

---

## Short answer

Author the posts as **`.mdx` files in a top-level `content/` directory outside `app/`**, render them through the **dynamic-`import()` pattern that the Next 15 MDX guide documents verbatim** — `app/90s/skills/[slug]/page.tsx` importing `` `@/content/skills/${slug}.mdx` `` — and pin the route set with **`generateStaticParams()` + `export const dynamicParams = false`**. Read frontmatter **server-side with `gray-matter`** in a small content module that both `generateStaticParams` and `generateMetadata` call; that same module does draft filtering by simply **omitting draft slugs from `generateStaticParams`**, which with `dynamicParams = false` makes them 404 in production. Do not reach for `draftMode()` — it is CMS-oriented, forces dynamic rendering, and adds a server surface to a soft-secret static experiment. `next-mdx-remote` is **archived** and is not a live option. The one real cost of `@next/mdx` is that its configuration (`pageExtensions`, `mdx-components.tsx`, `createMDX()`) is **global to the app**, not scoped to `/90s`; the runner-up — plain `.md` + a local `unified`/`remark`/`rehype` pipeline — buys perfect isolation and zero global config at the price of losing JSX-in-content.

**Scope flag before anything else:** the frozen `docs/design/90s-experiment-spec.md` (on `prototype/90s-frames-shell`) locks **Routes = "Single page `/90s` only"** and explicitly lists **"multi-route `/90s/*`" as out of scope**. `/90s/skills/[slug]` is therefore a *scope evolution* of that spec, not an implementation detail of it. The spec needs an amendment before this research is actionable.

---

## 0. Baseline: what this repo is today

- `package.json` pins `next@15.5.22`, `react@^19`, `react-dom@^19`, Tailwind v4 via `@tailwindcss/postcss`, `vitest@^4`. **No MDX, remark, rehype, unified, or gray-matter dependency exists today.** Every option below is a net-new dependency decision.
- `dev` runs `next dev --turbopack`. This is load-bearing — see the Turbopack plugin constraint in §2.
- `next.config.ts` currently exports a plain `NextConfig` with a `headers()` function only. Adopting `@next/mdx` means wrapping this export in `createMDX()`.
- On `prototype/90s-frames-shell` the layout seam already exists: a slim `app/layout.tsx` (html/body/fonts/SpeedInsights only), an `app/(portfolio)/layout.tsx` holding the portfolio chrome, and `app/90s/layout.tsx` applying `nineties.module.css` plus `ninetiesMetadata` (`robots: { index: false, follow: false }`). `/90s/skills/[slug]` would nest *inside* that existing `/90s` layout for free.

### Docs-version caveat worth carrying into the spec

Unversioned `nextjs.org/docs/...` URLs currently serve **Next 16.3.0** content, where the route segment config options `dynamic`, `dynamicParams`, `revalidate`, and `fetchCache` are documented as disabled/removed under the Cache Components model. The Next 15 reference itself already warns: "The options outlined on this page are disabled if the `cacheComponents` flag is on, and will eventually be deprecated in the future."
Source: [Route Segment Config (v15)](https://nextjs.org/docs/15/app/api-reference/file-conventions/route-segment-config)

Everything below cites `/docs/15/` URLs to match the pinned runtime. The `dynamicParams = false` mechanism recommended here is exactly the API slated for deprecation, so **a future Next 16 upgrade is a known, scoped migration point** for this feature.

---

## 1. Content layout — where the files live

### What primary sources require

Next.js draws a hard line between "in a route segment" and "routable":

> "a route is **not publicly accessible** until a `page.js` or `route.js` file is added to a route segment" … "even when a route is made publicly accessible, only the **content returned** by `page.js` or `route.js` is sent to the client" … "project files can be **safely colocated** inside route segments in the `app` directory without accidentally being routable."
Source: [Project structure and organization (v15)](https://nextjs.org/docs/15/app/getting-started/project-structure)

That colocation guarantee holds **only while `pageExtensions` excludes the content's extension**. Once you add `md`/`mdx` to `pageExtensions` for `@next/mdx`, every `.mdx` file named `page.mdx` becomes a route, and the guide's own file-based-routing example (`app/mdx-page/page.mdx` → `/mdx-page`) is precisely that behaviour.
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

The same doc gives two escape hatches:
- **Private folders**: `_folderName` opts "the folder and all its subfolders" out of routing, and is recommended for "avoiding potential naming conflicts with future Next.js file conventions."
- **Store project files outside `app`** entirely, keeping `app` purely for routing.
Source: [Project structure and organization (v15)](https://nextjs.org/docs/15/app/getting-started/project-structure)

The MDX guide's own dynamic-import example puts content **outside `app`**, at `@/content/${slug}.mdx`.
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

### Options

| Layout | Route-collision risk | Discoverability for authoring | Scanning cost |
| --- | --- | --- | --- |
| **A. Top-level `content/skills/*.mdx`** (outside `app/`) | None — `content/` is not scanned for routes at all | Good: one obvious folder; matches the Next docs example | `fs.readdir` of one flat dir |
| **B. Colocated `app/90s/skills/_posts/*.mdx`** | None *if* the private-folder `_` prefix is kept; a rename to `posts/` while `pageExtensions` includes `mdx` silently exposes `page.mdx` files | Good: content sits next to the route that renders it | Same |
| **C. Colocated without `_` prefix** | Real — any file named `page.mdx`/`route.mdx` becomes a live route | Good | Same |

### Research takeaway for /90s

Take **A: `content/skills/*.mdx` at repo root.** It is what the Next docs demonstrate for exactly this dynamic-slug case, it makes the route-collision question moot regardless of what `pageExtensions` ends up containing, and it keeps the `/90s` subtree in `app/` purely structural. Given the map constraint that **only skills with a real post get linked**, the file list in `content/skills/` becomes the single source of truth: the presence of `<slug>.mdx` *is* the "has a post" predicate that `app/config/skills.ts` gets joined against. That is a cheap, build-time, one-directory read — no glob library needed, and it stays honest because a deleted file removes the link automatically.

Note the guide's constraint on any of these: "Using `fs`, `globby`, etc. can only be used server-side."
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

---

## 2. Frontmatter

### What primary sources require

This is the sharpest fork in the road, and the Next docs state the gap plainly:

> "`@next/mdx` does **not** support frontmatter by default, though there are many solutions for adding frontmatter to your MDX content, such as: `remark-frontmatter`, `remark-mdx-frontmatter`, `gray-matter`."
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

The docs' own preferred workaround is **not** frontmatter at all — it is JS exports:

> "`@next/mdx` **does** allow you to use exports like any other JavaScript component"

…with `export const metadata = { author: 'John Doe' }` inside the `.mdx`, consumed as `import BlogPost, { metadata } from '@/content/blog-post.mdx'`. The doc adds: "A common use case for this is when you want to iterate over a collection of MDX and extract data… You can use packages like Node's `fs` module or globby to read a directory of posts and extract the metadata."
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

The plugin route needs **two** packages, not one, because they do different jobs:

- `remark-frontmatter` is a **syntax** plugin only: "Doesn't parse the data inside them: create your own plugin to do that." / "This plugin handles the syntax of frontmatter in markdown. It does not *parse* that frontmatter as say YAML or TOML and expose it somewhere." It points at `vfile-matter` or a custom plugin for the actual values.
Source: [`remark-frontmatter` README](https://github.com/remarkjs/remark-frontmatter)
- `remark-mdx-frontmatter` turns that parsed frontmatter into JS exports in the compiled MDX, requires `remark-frontmatter` upstream, and its `name` option is "the identifier name of the variable the frontmatter data is assigned to (Default: `frontmatter`)" — compiling to `export const frontmatter = { … }` alongside the default export.
Source: [`remark-mdx-frontmatter` README](https://github.com/remcohaszing/remark-mdx-frontmatter)
- `gray-matter` is the standalone reader: `matter(input, options)` / `matter.read(filepath, options)` returning `{ data, content, excerpt, orig, … }`, YAML/JSON/JS frontmatter supported out of the box. It parses *files*, independent of any bundler pipeline.
Source: [`gray-matter` README](https://github.com/jonschlinkert/gray-matter)

**Turbopack constraint (this repo runs `next dev --turbopack`):** remark/rehype plugins must be configured *as strings* with serializable options — `'remark-gfm'`, `['remark-toc', { heading: 'The Table' }]` — because "remark and rehype plugins without serializable options cannot be used yet with Turbopack, because JavaScript functions can't be passed to Rust." Plugin config also forces an ESM config file (`next.config.mjs`/`.ts`); the repo already uses `next.config.ts`, so that part is free.
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

### Options

| Approach | Frontmatter mechanism | Cost |
| --- | --- | --- |
| **`@next/mdx` + exported consts** | `export const meta = {…}` inside each `.mdx`; imported alongside the default export | Zero extra deps. Authoring is less "markdown-y" (a JS line at the top of every post). Reading the *collection* still needs `fs` + a compile/import per file. |
| **`@next/mdx` + `remark-frontmatter` + `remark-mdx-frontmatter`** | Real `---` YAML block, exported as `frontmatter` from the compiled module | Two deps + Turbopack string-plugin config. Only available *after* compilation — you still cannot cheaply enumerate/filter posts without importing them all. |
| **`@next/mdx` (render) + `gray-matter` (enumerate)** | `---` YAML read directly off disk by `gray-matter` in a server-only content module | One extra dep. Frontmatter is available *without compiling* the MDX, which is exactly what `generateStaticParams` and draft filtering need. Frontmatter is duplicated conceptually (file read once for metadata, compiled once for rendering) but never diverges, since both read the same file. |
| **`next-mdx-remote` `serialize({ parseFrontmatter: true })`** | Built in, via `vfile-matter` | Moot — see §3.5. |

### Research takeaway for /90s

Use **`gray-matter` for enumeration/metadata and `@next/mdx` for rendering.** The asymmetry matters: `generateStaticParams` and the "which skills get a link" join need frontmatter for *all* posts *before* any page renders, and the compiled-export approaches only surface frontmatter as a side effect of importing (and therefore compiling) each file. `gray-matter` reads it off disk in a plain `fs` loop.

Adding `remark-mdx-frontmatter` on top is optional and only pays off if the MDX body itself needs to interpolate its own frontmatter (`{frontmatter.title}`). For short skill-dispatch posts, it is a dependency and a Turbopack config wrinkle for no gain. Skip it initially.

Keep the frontmatter shape deliberately tiny — `title`, `summary`, `skill` (the id joining to `app/config/skills.ts`), `draft`. Anything more is spec surface the experiment does not need.

---

## 3. Static params, rendering, and metadata

### 3.1 The documented dynamic-route pattern

The MDX guide gives the shape of the answer directly, and it is the whole recommendation in nine lines:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/${slug}.mdx`)
  return <Post />
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }]
}

export const dynamicParams = false
```

with the note: "Ensure you specify the `.mdx` file extension in your import."
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

### 3.2 `generateStaticParams`

- It "statically generates routes at build time" and "During `next build`, `generateStaticParams` runs before the corresponding Layouts or Pages are generated."
- **"You must always return an array from `generateStaticParams`, even if it's empty. Otherwise, the route will be dynamically rendered."** — the single most important footgun for a zero-post or all-drafts state.
- Return shape for `/product/[id]` is `{ id: string }[]`.
- `fetch` requests are memoized across `generateStaticParams`, Layouts, Pages and `generateMetadata`; where `fetch` isn't used (i.e. `fs` reads, as here), React's `cache` is the documented way to dedupe.
Source: [`generateStaticParams` (v15)](https://nextjs.org/docs/15/app/api-reference/functions/generate-static-params)

That last point is directly applicable: the content module doing `fs.readdir` + `gray-matter` will be called by `generateStaticParams`, `generateMetadata`, and the page. Wrapping it in React `cache` is the documented dedupe.

### 3.3 `dynamicParams` and `dynamic`

- `dynamicParams` defaults to `true`: "Dynamic segments not included in `generateStaticParams` are generated on demand." Setting it to **`false`** means those segments "will return a 404."
- `dynamic` defaults to `'auto'`. `'error'` "forces static rendering and errors if any Dynamic API or uncached data is used" (the doc equates it to the old `getStaticProps`). `'force-static'` instead forces `cookies()`, `headers()` and `useSearchParams()` to return empty values.
- `revalidate` defaults to `false`, i.e. cache indefinitely.
Source: [Route Segment Config (v15)](https://nextjs.org/docs/15/app/api-reference/file-conventions/route-segment-config)

For a repo-authored, build-time-known set of posts, `dynamicParams = false` is doing real work beyond staticness: it is the **404 mechanism for anything not in the published list**, which is what makes draft filtering (§4) work without any runtime check. `dynamic = 'error'` is worth considering as a *build-time assertion* that nothing accidentally makes these pages dynamic; it is belt-and-braces, not a requirement.

### 3.4 `generateMetadata` vs static `metadata`

- "Resolving `generateMetadata` is part of rendering the page. If the page can be pre-rendered and `generateMetadata` doesn't introduce dynamic behavior, the resulting metadata is included in the page's initial HTML."
- Metadata is evaluated **root → leaf and shallowly merged**; duplicate keys are replaced by the deeper segment.
- You cannot export both `metadata` and `generateMetadata` from the same segment; `generateMetadata` is Server-Components-only; `params` is a Promise.
- "If metadata doesn't depend on runtime information, it should be defined using the static `metadata` object rather than `generateMetadata`."
Source: [`generateMetadata` (v15)](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)

The per-post title/description *does* depend on the slug, so `generateMetadata` is correct here — it reads the same cached `gray-matter` result. **Where this touches SEO (sibling ticket, noted only as a constraint):** the shallow root→leaf merge means `app/90s/layout.tsx`'s existing `robots: { index: false, follow: false }` is inherited by `/90s/skills/[slug]` automatically, but **any `robots` key the post page emits replaces it wholesale**. So the content/rendering choice constrains SEO in exactly one way: `generateMetadata` on the post page should set `title`/`description`/`alternates` and **must not** emit a partial `robots` object. That is the extent of the overlap; the rest belongs to the sibling ticket.

### 3.5 What about `next-mdx-remote`?

It is **archived and read-only** as of 2026-04-09: "⚠️ This project is archived and is no longer supported ⚠️". The README redirects users to `mdx-bundler`, `next-mdx-remote-client`, and `remote-mdx`, and notes that for RSC with basic MDX needs the core MDX library alone may suffice.
Source: [`next-mdx-remote` README](https://github.com/hashicorp/next-mdx-remote)

The Next 15 docs corroborate the successor: for remote MDX, "A community package for this use is `next-mdx-remote-client`," alongside a security warning — "MDX compiles to JavaScript and is executed on the server. You should only fetch MDX content from a trusted source, otherwise this can lead to remote code execution (RCE)."
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

`next-mdx-remote-client` is a maintained fork whose `/rsc` entrypoint exports `evaluate` and `MDXRemote` for the App Router, supports `parseFrontmatter`, and renders as a Server Component with no client JS for the initial render.
Source: [`next-mdx-remote-client` README](https://github.com/ipikuka/next-mdx-remote-client)

**None of this is needed here.** Runtime compilation exists to serve content that is *not* in the repo. This content *is* in the repo, so runtime compilation buys nothing and costs a runtime compile step, a larger dependency, and — per the docs' own warning — a code-execution surface that only makes sense for untrusted/remote sources. Both are ruled out on the "cheap relative to the live portfolio" constraint alone. Record `next-mdx-remote` in the spec as **disqualified (archived)** so it does not get re-proposed.

### 3.6 `output: 'export'` — not recommended

A full static export is available (`output: 'export'` → `out/`), and Server Components run at build time under it. But the unsupported list includes **Rewrites, Redirects, Headers, Middleware, Draft Mode, ISR, dynamic routes with `dynamicParams: true` or without `generateStaticParams()`**, and default-loader Image Optimization.
Source: [Static exports guide (v15)](https://nextjs.org/docs/15/app/guides/static-exports)

`next.config.ts` in this repo defines `headers()` for `securityHeaders` across `/:path*`. **A static export would silently drop the security headers**, which is a much larger regression than any gain from exporting. Do not pursue static export for this feature; the default build already prerenders these pages to HTML given `generateStaticParams` + `dynamicParams = false`.

### Research takeaway for /90s

`generateStaticParams` (from the `gray-matter` file scan, filtered to non-drafts) + `dynamicParams = false` + `generateMetadata` reading the same cached scan. No `revalidate`, no `output: 'export'`, no runtime MDX. Optionally `export const dynamic = 'error'` as a build-time guard. Ensure `generateStaticParams` returns `[]` rather than throwing when `content/skills/` is empty — the docs are explicit that a non-array result makes the route dynamic.

---

## 4. Draft handling

### What primary sources require

`draftMode()` is a real API but a poorly-fitting one here:

- It is "an async function that allows you to enable or disable Draft Mode," imported from `next/headers`, exposing `isEnabled`, `enable()`, `disable()`; `enable()` sets the `__prerender_bypass` cookie.
Source: [`draftMode` (v15)](https://nextjs.org/docs/15/app/api-reference/functions/draft-mode)
- Its purpose is stated as: "Draft Mode allows you to preview draft content from your headless CMS… This is useful for static pages that are generated at build time as it allows you to switch to dynamic rendering and see the draft changes without having to rebuild your entire site." And: "If you request a page which has the cookie set, then data will be fetched at **request time** (instead of at build time)." A new bypass cookie value is generated on each `next build`, and the documented enable path is a secret-token Route Handler (with an explicit warning against redirecting to a `searchParams`-supplied path — open redirect).
Source: [Draft Mode guide (v15)](https://nextjs.org/docs/15/app/guides/draft-mode)
- It is also on the **unsupported list for static export**.
Source: [Static exports guide (v15)](https://nextjs.org/docs/15/app/guides/static-exports)

### Options

| Option | How it works | Fit |
| --- | --- | --- |
| **A. Frontmatter `draft: true`, filtered in `generateStaticParams`** | Draft slugs never enter the param list; with `dynamicParams = false` they 404. Author previews by flipping the flag locally and running `next dev`. | **Best fit.** Zero runtime cost, zero new API surface, no cookie, no server route. The content is in the repo, so "preview" is just running the dev server on your own branch. |
| **B. `draftMode()`** | Secret-token Route Handler sets `__prerender_bypass`; pages switch to dynamic rendering. | Poor fit. Adds a public route handler and a secret to a *soft-secret* experiment, converts static pages to dynamic on request, and solves a problem (previewing content that lives in an external CMS between builds) this repo does not have. |
| **C. Env-gated filtering** (e.g. include drafts when `NODE_ENV !== 'production'` or a `SHOW_DRAFTS` var) | Same filter as A, keyed on env instead of/in addition to the flag | Reasonable refinement of A: lets a preview deployment show drafts while production omits them. Costs one env var and the discipline to keep the preview deployment as unindexed as `/90s` already is. |

### Research takeaway for /90s

Take **A**, optionally with the **C** refinement if a preview deployment is ever wanted. Explicitly reject `draftMode()` in the spec with the reason recorded, because it is the obvious-looking answer and will otherwise be re-litigated. The whole point of repo-authored content is that the draft/publish boundary is a git branch plus a one-line frontmatter flag.

One consequence to state in the spec: **draft posts must also be excluded from the skills-link join**, not just from the route set. Otherwise `/90s` renders a link to a slug that 404s. Both the link list and `generateStaticParams` should call the same filtered content module — that is the guarantee, and it is worth a unit test given the repo already runs Vitest.

---

## 5. Isolation from the portfolio route group

### What primary sources require

**Layout/CSS/font isolation is already solved by the App Router and by the prototype branch's structure.**

- Route groups: "`(folderName)`" is excluded from the URL; caveats include a full page reload when navigating between different **root** layouts, and "Routes in different groups should not resolve to the same URL path."
Source: [Route groups (v15)](https://nextjs.org/docs/15/app/api-reference/file-conventions/route-groups)
- Multiple root layouts are supported by removing the top-level `layout.js` and adding one per group, each with its own `<html>`/`<body>`.
Source: [Project structure and organization (v15)](https://nextjs.org/docs/15/app/getting-started/project-structure)
- Metadata merges root → leaf, shallowly, deeper keys winning.
Source: [`generateMetadata` (v15)](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)
- Fonts: "Fonts are scoped to the component they're used in. To apply a font to your entire application, add it to the Root Layout." `next/font/google` self-hosts, "meaning no requests are sent to Google by the browser."
Source: [Font optimization (v15)](https://nextjs.org/docs/15/app/getting-started/fonts)

**MDX configuration is the one thing that is *not* isolatable.** Three pieces of `@next/mdx` setup are global by construction:

1. `pageExtensions` is a top-level `next.config` key: "By default, Next.js accepts files with the following extensions: `.tsx`, `.ts`, `.jsx`, `.js`. This can be modified to allow other extensions like markdown (`.md`, `.mdx`)."
Source: [`pageExtensions` (v15)](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/pageExtensions)
2. `mdx-components.tsx` is a project-root file convention — it must live "in the root of your project… at the same level as `pages` or `app`, or inside `src`", and "is **required** to use `@next/mdx` with App Router and will not work without it."
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)
3. `createMDX()` wraps the entire exported `nextConfig`; by default it "only compiles files with the `.mdx` extension" and `.md` requires `createMDX({ extension: /\.(md|mdx)$/ })`.
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

### What this actually costs, concretely

- **`pageExtensions`**: it is additive, and since `.tsx`/`.ts` remain in the list the portfolio is unaffected — but the array replaces the default, so the defaults must be restated explicitly (`['js','jsx','md','mdx','ts','tsx']`, per the guide's example). The behavioural change is that *any* `page.mdx`/`route.mdx` anywhere under `app/` becomes routable. Keeping content in top-level `content/` (§1) makes this inert.
- **`mdx-components.tsx`**: this is the seam that actually matters for visual isolation. It is a **single global component map**, so styling MDX output differently for `/90s` than for a hypothetical future portfolio-side MDX page cannot be done in that file — it has to be done by **CSS scoping in the `/90s` layout**. Which is fine, because that is already the established pattern here: `app/90s/layout.tsx` wraps children in `styles.experiment` from `nineties.module.css`. Post styling should be a descendant selector under that class (or a Tailwind `prose` variant applied in a nested `app/90s/skills/layout.tsx`), **not** logic in `mdx-components.tsx`. The docs endorse the layout-scoped approach: shared styling via a layout, including Tailwind typography `prose` classes.
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)
- **Fonts**: no work needed. The prototype root layout applies all four font *variables* to `<html>`, and `nineties.module.css` decides which ones are actually used. Because `next/font` self-hosts and the kitsch faces are only *referenced* by `/90s` CSS, the portfolio pays the declaration but not the fetch. If the spec wants stricter separation, the font calls can move into `app/90s/layout.tsx` — "fonts are scoped to the component they're used in" — at the cost of splitting the `app/config/fonts.ts` module.
- **Metadata**: `/90s/skills/[slug]` inherits `ninetiesMetadata` from `app/90s/layout.tsx` with no extra work, subject to the do-not-emit-partial-`robots` rule from §3.4.
- **Bundle**: the docs note `@next/mdx` compiles MDX at build time; combined with Server Components by default, a rendered post ships as HTML with no MDX runtime on the client — nothing is added to the portfolio's client bundle. The experimental Rust compiler (`experimental.mdxRs`) is explicitly "still experimental and is not recommended for production use" and should stay off.
Source: [MDX guide (v15)](https://nextjs.org/docs/15/app/guides/mdx)

### Research takeaway for /90s

Isolation is **complete for layout, CSS, fonts, and metadata**, and **partial for MDX config** — `pageExtensions`, `mdx-components.tsx`, and the `createMDX()` wrapper are app-global and cannot be scoped to `/90s`. That is the honest price of `@next/mdx`, and it is a small one: three lines in `next.config.ts` and one root file, none of which changes portfolio behaviour. Do **not** attempt multiple root layouts for this — the prototype's single-root + nested-layout design (spec decision B) already achieves the separation, and multiple root layouts would add full page reloads on cross-group navigation for no benefit.

If that global footprint is judged unacceptable — a defensible call for a soft-secret side experiment that is supposed to stay cheap — the runner-up below has a **zero-global-config** footprint.

---

## 6. Recommendation

### Default: `@next/mdx` + top-level `content/` + `gray-matter` + `generateStaticParams`/`dynamicParams = false`

| Piece | Choice |
| --- | --- |
| Content location | `content/skills/<slug>.mdx` (outside `app/`) |
| Compilation | `@next/mdx` (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`), build-time, via `createMDX()` in `next.config.ts` |
| Route | `app/90s/skills/[slug]/page.tsx` doing `await import(\`@/content/skills/${slug}.mdx\`)` |
| Frontmatter | YAML `---` block, read server-side by `gray-matter` in a React-`cache`d content module |
| Params | `generateStaticParams()` from that module (drafts filtered), `export const dynamicParams = false` |
| Metadata | `generateMetadata` for title/description only; inherits `robots` from `app/90s/layout.tsx` |
| Drafts | `draft: true` frontmatter → omitted from params → 404; same filter feeds the skills link list |
| Styling | CSS Modules under the existing `.experiment` root class in a nested `/90s/skills` layout |

**Rationale.** Every element of this is a pattern the Next 15 docs demonstrate for this exact shape of problem (dynamic slug, in-repo MDX, build-time-known set), which matters for a design spec that has to survive a Next upgrade. It is fully static with no runtime compilation, so the "cheap relative to the live portfolio" constraint holds. It keeps JSX-in-content available, which is the one thing a *90s kitsch* post set plausibly wants (a marquee-ish flourish, a blink-safe callout, an image frame) without inventing a shortcode syntax. And the `gray-matter`-reads-the-directory design makes "only skills with a real post get linked" a structural property rather than a list someone has to maintain by hand.

**What it costs.** Four new dependencies plus `gray-matter`; a `createMDX()` wrapper and a `pageExtensions` array in `next.config.ts`; a root `mdx-components.tsx`. All global, none behaviour-changing for the portfolio. Plus the deprecation exposure on `dynamicParams` noted in §0.

### Runner-up: plain `.md` + a local `unified`/`remark`/`rehype` pipeline

Content stays `content/skills/*.md`; the page reads the file with `gray-matter` and runs `remark-parse` → `remark-rehype` → `rehype-sanitize` → `rehype-stringify`, rendering the result. Everything in §3 and §4 (`generateStaticParams`, `dynamicParams = false`, `generateMetadata`, draft filtering) is **identical** — those choices are orthogonal to the compiler.

**Switch to this when:**
- The global MDX config footprint (`pageExtensions` + root `mdx-components.tsx` + `createMDX()`) is judged too invasive for a side experiment. This pipeline touches `next.config.ts` **not at all**.
- No post needs JSX/components in the body. If posts are prose + links + code + images, MDX is unused capability.
- The Turbopack string-plugin constraint becomes annoying — a local unified pipeline runs in your own module and takes plugin *functions* freely, since it never goes through the bundler config.
- Content sanitation matters. `rehype-sanitize` in a local pipeline is a straightforward, auditable step; MDX has no equivalent because MDX *is* code by design (per the docs' own RCE warning for untrusted sources).

**Switch back to the default when** the first post actually needs an interactive or styled component inline. The migration is mechanical: rename `.md` → `.mdx`, add the `@next/mdx` config, swap the render call. Keeping frontmatter in real YAML from day one (rather than JS exports) is what makes that migration cheap — which is another reason to prefer `gray-matter` over the docs' exported-consts workaround even on the MDX path.

### Ruled out

- **`next-mdx-remote`** — archived 2026-04-09, read-only, no longer supported.
- **`next-mdx-remote-client` / `mdx-bundler`** — maintained, but runtime compilation of content that lives in the repo is cost with no corresponding benefit, and the docs' RCE warning applies to a class of problem this feature does not have.
- **`output: 'export'`** — would drop the `securityHeaders` configured in `next.config.ts`.
- **`draftMode()`** — CMS-shaped; forces dynamic rendering and adds a token-guarded route handler to a soft-secret static subtree.
- **`experimental.mdxRs`** — "not recommended for production use" per the docs.

---

## 7. Open questions for the spec author

1. **Scope amendment.** `docs/design/90s-experiment-spec.md` currently states Routes = "Single page `/90s` only" with "multi-route `/90s/*`" out of scope. That line has to change before any of this is buildable. Worth deciding whether the amendment covers only `/90s/skills/[slug]` or opens `/90s/*` generally.
2. **Index page.** Is there a `/90s/skills` index, or do posts only reach the surface via the existing `/90s` skill list? The latter is cheaper and matches "only skills with a real post get linked"; the former is another route and another `generateStaticParams`-free static page.
3. **Frontmatter contract.** Exact fields, and whether `skill` (join key to `app/config/skills.ts`) is validated at build time. A Vitest test asserting every post's `skill` resolves to a known skill id — and that no draft is linked — is the cheap insurance.
4. **Motion.** The map constraint requires `prefers-reduced-motion` to strip glows; the frozen spec already establishes this for `/90s`. Post content inherits it via the `.experiment` root class, but any per-post decorative element authored in MDX would sit outside that discipline. Worth stating that decorative components must come from a small approved set rather than being authored ad hoc per post.
5. **Next 16.** `dynamicParams` is on the deprecation path under Cache Components. Decide whether to note this as a known migration in the spec now, or absorb it at upgrade time.
