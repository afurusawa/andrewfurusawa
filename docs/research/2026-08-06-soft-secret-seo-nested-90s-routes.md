# Soft-secret SEO for nested /90s skill-post routes

**Issue:** [#37 — Research soft-secret SEO for nested /90s skill post routes](https://github.com/afurusawa/andrewfurusawa/issues/37)
**Parent map:** [Wayfinder: /90s hi-fi kitsch and skill-dispatch content spec](https://github.com/afurusawa/andrewfurusawa/issues/35) (v1 predecessor map: [Wayfinder: 90s experiment design spec for /90s](https://github.com/afurusawa/andrewfurusawa/issues/15))
**Sibling research:** `docs/research/2026-08-06-nextjs-mdx-90s-skill-posts.md` (on branch `research/nextjs-mdx-90s-skill-posts`) — rendering/content half. This doc is the SEO/discoverability half and does not re-derive it.
**Date:** 2026-08-06
**Scope:** Primary sources only — Next.js docs pinned to the repo's runtime (`https://nextjs.org/docs/15/...`, served as `version: 15.5.22`), Google Search Central (`developers.google.com/search`), RFC 9309, and the W3C Referrer Policy spec. No blog posts or secondary write-ups. This feeds a design spec: mechanisms, trade-offs, and spec-able rules — not an implementation.

---

## Short answer

**Drop `Disallow: /90s` for the general crawler and enforce the secret with `noindex, nofollow` instead — delivered as an `X-Robots-Tag` HTTP header scoped to `/90s` and `/90s/:path*` in `next.config.ts`, with the `metadata.robots` object kept as a redundant second layer.** The v1 policy on `prototype/90s-frames-shell` combines `Disallow: /90s` *and* `<meta name="robots" content="noindex,nofollow">`, and those two mechanisms **cancel each other out**: Google states that a page blocked in robots.txt is never fetched, so "the crawler will never see the `noindex` rule" ([Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)), and that it "may still index the URL and show it in search results without a snippet" ([robots.txt spec](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)). The disallow line also *publishes the path* — RFC 9309 §Security Considerations: "Listing paths in the robots.txt file exposes them publicly and thus makes the paths discoverable" ([RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html)). For a soft secret whose stated goal is "must not turn up in search," crawl-and-noindex is the only combination that actually achieves it.

Two Next.js-specific defects must also be locked, both caused by the documented **shallow** metadata merge ([generateMetadata → Merging](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)):

1. `app/90s/metadata.ts` sets `alternates: { canonical: "/90s" }` on the **layout**. Every nested route that does not set its own `alternates` inherits it, so `/90s/skills/foo` would emit `<link rel="canonical" href="https://andrewfurusawa.dev/90s">`. Simply deleting it from the layout is *worse*, because the root layout sets `alternates: { canonical: "/" }` — the post would then claim the homepage as its canonical. **The fix is a per-route self-referential canonical in `generateMetadata`, not a layout edit.**
2. `robots: { index: false, follow: false }` on the `/90s` layout **is** inherited by nested posts — but only as long as the post never exports a `robots` key. A post that exports `robots: { index: false }` replaces the whole object and silently drops `follow: false`. The `X-Robots-Tag` header is immune to this class of bug, which is the main reason to make the header the primary mechanism and the meta tag the backup.

---

## 0. Baseline: what exists today

**On `main`:**

- `app/robots.ts` → `{ rules: { userAgent: "*", allow: "/" }, sitemap, host }`. No disallow.
- `app/sitemap.ts` → a single entry, the root URL.
- `next.config.ts` → one `headers()` entry, `source: "/:path*"`, applying `securityHeaders` from `app/config/securityHeaders.ts`. That array already includes `Referrer-Policy: strict-origin-when-cross-origin`. No `X-Robots-Tag`.
- `app/config/site.ts` → `SITE_URL = "https://andrewfurusawa.dev"`, `absoluteUrl()`.

**On `prototype/90s-frames-shell` (unmerged v1):**

- `app/robots.ts` adds `disallow: "/90s"` to the single `*` rule, locked by `app/robots.test.ts`.
- `app/90s/metadata.ts` exports `ninetiesMetadata` = `{ title, description, alternates: { canonical: "/90s" }, robots: { index: false, follow: false } }`, applied as `export const metadata` in `app/90s/layout.tsx`.
- Root `app/layout.tsx` sets `metadataBase: new URL(SITE_URL)`, `alternates: { canonical: "/" }`, a full `openGraph` block, a `twitter` block, and `robots: { index: true, follow: true }`.
- `app/sitemap.test.ts` asserts `/90s` is absent from the sitemap.
- The frozen `docs/design/90s-experiment-spec.md` locks: *"SEO | Full soft-secret: `noindex,nofollow`; robots disallow `/90s`; omit from sitemap; override root canonical"* and *"Secret means | Unlinked + crawler discouragement — **not** auth"*, with **"multi-route `/90s/*`" listed as out of scope**. As the sibling research also flags, `/90s/skills/[slug]` is a scope amendment to that spec, not an implementation detail of it.

---

## 1. The robots.txt-vs-noindex conflict

### What Google actually says

The `noindex` page is unambiguous:

> "For the `noindex` rule to be effective, the page or resource **must not** be blocked by a robots.txt file, and it has to be otherwise accessible to the crawler. If the page is blocked by a robots.txt file or the crawler can't access the page, the crawler will never see the `noindex` rule."
> — [Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

The robots meta tag reference repeats it for both delivery mechanisms:

> "If a page is disallowed from crawling through the robots.txt file, then any information about indexing or serving rules will not be found and will therefore be ignored."
> — [Robots meta tag, data-nosnippet, and X-Robots-Tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)

And the robots.txt reference states the failure mode plainly:

> "Google can't index the content of pages which are disallowed for crawling, but it may still index the URL and show it in search results without a snippet."
> — [robots.txt specifications](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)

The canonicalization guide says the same thing from a different angle:

> "Don't use the robots.txt file for canonicalization purposes. Google may still index URLs that are disallowed in robots.txt without their content."
> — [Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

### The two coherent policies

| Goal | Mechanism | What you get | What you pay |
| --- | --- | --- | --- |
| **"Not in the index at all"** | Allow crawling; serve `noindex` (meta and/or `X-Robots-Tag`) | Googlebot fetches the page, reads `noindex`, and drops/never adds the URL. This is the *only* documented path to true de-indexing. | The content **is fetched** by every compliant crawler. Bytes leave the server; the HTML is in crawler caches. |
| **"Not crawled"** | `Disallow` in robots.txt | Compliant crawlers never request the URL. Saves bandwidth and keeps the body out of crawler pipelines. | `noindex` is never seen. If any external link points at the URL, it can still appear as a bare, snippet-less result. **And the disallowed path is itself published in `/robots.txt`.** |

You cannot have both. Attempting both — the current v1 config — gets you the *worse* half of each: the content is not crawled (so `noindex` is inert), the URL can still surface, and the path `/90s` is broadcast to anyone who reads `https://andrewfurusawa.dev/robots.txt`.

### The RFC 9309 point that matters most here

> "The Robots Exclusion Protocol is not a substitute for valid content security measures. Listing paths in the robots.txt file exposes them publicly and thus makes the paths discoverable."
> — [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html)

The spec's own framing — "Unlinked + crawler discouragement — **not** auth" — is consistent with this: robots.txt is not a secrecy mechanism. But a *soft secret* still has a discoverability budget, and `Disallow: /90s` spends it for no indexing benefit. `robots.txt` is one of the first URLs a curious visitor checks.

Note the asymmetry: a disallow line would leak the **hub path** (`/90s`), never the **post slugs** (those are not in robots.txt). So the disallow line does not directly expose `/90s/skills/<slug>`. It exposes the door, not the rooms.

---

## 2. robots.txt path matching

### The rules

Google:

> Google employs prefix matching with two wildcard characters: `*` (matching zero or more characters) and `$` (designating URL end). The matching process is case-sensitive.
>
> - `/fish` matches `/fish`, `/fish.html`, `/fishheads/yummy.html`
> - `/fish/` matches only content within that folder, not `/fish` itself
> - `/$` matches exclusively the root URL
>
> — [robots.txt specifications](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)

RFC 9309:

> "To evaluate if access to a URI is allowed, a crawler MUST match the paths in 'allow' and 'disallow' rules against the URI." … matching must "start with the first octet of the path" … "the most specific match found MUST be used. The most specific match is the match that has the most octets."
> — [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html)

Google's tie-break, where the two differ in emphasis:

> "When matching robots.txt rules to URLs, crawlers use the most specific rule based on the length of the rule path. In case of conflicting rules, including those with wildcards, Google uses the least restrictive rule."
> — [robots.txt specifications](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)

### Answers to the specific questions

| Directive | `/90s` | `/90s/` | `/90s/skills/foo` | `/90sfoo` |
| --- | --- | --- | --- | --- |
| `Disallow: /90s` | blocked | blocked | **blocked** | **blocked** (unintended) |
| `Disallow: /90s/` | allowed | blocked | blocked | allowed |
| `Disallow: /90s$` | blocked | allowed | allowed | allowed |
| `Disallow: /90s$` + `Disallow: /90s/` | blocked | blocked | blocked | allowed |

- **Yes, `Disallow: /90s` covers `/90s/skills/foo`.** It is an octet-prefix match, not a segment match — exactly as `/fish` matches `/fishheads/yummy.html`.
- **It also matches `/90sfoo`, `/90s-notes`, `/90something`.** Collateral, currently harmless (no such routes), but it is a latent trap the spec should not leave unstated.
- The existing `Allow: /` does not rescue these URLs: it is a 1-octet match against a 4-octet disallow, and the longer rule wins.

**Exact directive recommendation, *if* the author chooses the disallow branch (see §7):** use the pair

```
Disallow: /90s$
Disallow: /90s/
```

which covers the hub and the whole subtree and nothing else. Expressed through `app/robots.ts`, whose `Robots` type accepts `disallow?: string | string[]` ([robots.txt file convention](https://nextjs.org/docs/15/app/api-reference/file-conventions/metadata/robots)):

```ts
disallow: ["/90s$", "/90s/"],
```

Under the recommended default policy, **no `disallow` entry for `userAgent: "*"` exists at all** — see §7.

---

## 3. Next.js metadata inheritance for nested routes

### The documented mechanics

Ordering:

> "Metadata is evaluated in order, starting from the root segment down to the segment closest to the final `page.js` segment."
> — [generateMetadata](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)

Merging (the load-bearing paragraph):

> "Following the evaluation order, Metadata objects exported from multiple segments in the same route are **shallowly** merged together to form the final metadata output of a route. Duplicate keys are **replaced** based on their ordering.
>
> This means metadata with nested fields such as `openGraph` and `robots` that are defined in an earlier segment are **overwritten** by the last segment to define them."
> — [generateMetadata → Merging](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)

The doc's own "Inheriting fields" example makes the complement explicit: a page that sets only `title` inherits the layout's entire `openGraph` object, "because `app/about/page.js` doesn't set `openGraph` metadata."

So the rule is **per top-level key, all-or-nothing**:
- Key absent in the child → the parent's whole object is inherited intact.
- Key present in the child → the parent's whole object is discarded, including sub-keys the child did not restate.

For this repo the chain is:

1. `app/layout.tsx` — `metadataBase`, `title`, `description`, `alternates: { canonical: "/" }`, `openGraph`, `twitter`, `robots: { index: true, follow: true }`
2. `app/90s/layout.tsx` — `title`, `description`, `alternates: { canonical: "/90s" }`, `robots: { index: false, follow: false }`
3. `app/90s/skills/[slug]/page.tsx` — TBD

### (a) Does the nested post inherit `robots: { index: false, follow: false }`?

**Yes — conditionally.** If the post's `metadata`/`generateMetadata` never mentions `robots`, the `/90s` layout's object survives the merge unchanged and the page emits `<meta name="robots" content="noindex, nofollow">` (the `robots` field's documented rendering, per the `robots` section of the same page).

The failure modes:

- **Post exports a partial `robots` object** — e.g. `robots: { index: false }`. The layout's object is *replaced*, `follow: false` vanishes, and the emitted tag is `noindex` only. Not catastrophic (Google: `noindex` alone still de-indexes) but it silently violates the spec's stated `noindex,nofollow`.
- **Post exports any *other* metadata** (`title`, `description`, `openGraph`, `alternates`) — `robots` is untouched and correctly inherited. This is the common case and it is safe.
- **Post exports `robots: { index: true }` by copy-paste accident** — full de-secretion, and nothing in the type system or the build catches it.

This is precisely why §4's header belongs in the design: an HTTP header set in `next.config.ts` cannot be overridden by a page-level metadata export.

Also note the sibling research's `generateMetadata` recommendation interacts here: a `generateMetadata` that returns a fresh object per post is the exact code shape most likely to omit or partially restate `robots`. The spec should say so.

### (b) The canonical problem — the sharper bug

`app/90s/layout.tsx` sets `alternates: { canonical: "/90s" }`. A nested post that does not set `alternates` **inherits the entire `alternates` object**, and with `metadataBase` resolving the relative path, emits:

```html
<link rel="canonical" href="https://andrewfurusawa.dev/90s" />
```

on `/90s/skills/foo`. That declares every post a duplicate of the hub. Google treats `rel="canonical"` as "a strong signal that the specified URL should become canonical" and recommends "a `rel="canonical"` link on the canonical page itself (also known as a self-referential canonical)" ([Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)). A hub-pointing canonical on a post is a wrong signal, and it is a *content* signal that survives independently of the `noindex` decision.

**The naive fix is a trap.** Deleting `alternates` from `app/90s/metadata.ts` does not produce "no canonical" — it produces inheritance from the *root* layout, which sets `alternates: { canonical: "/" }`. Posts would then emit `<link rel="canonical" href="https://andrewfurusawa.dev">`, pointing at the public homepage. Strictly worse.

**The documented fix is per-route canonical.** Every routable segment under `/90s` sets its own:

```ts
// app/90s/skills/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: post.title,
    alternates: { canonical: `/90s/skills/${slug}` },
  };
}
```

Keep `alternates: { canonical: "/90s" }` on the hub — but move it from `app/90s/layout.tsx` to `app/90s/page.tsx`, so the layout stops broadcasting a canonical to descendants. Belt and braces: with a per-route canonical on every child, the layout's value is never reached anyway, but a layout that carries no `alternates` makes the *next* nested route added under `/90s` fail loudly (inheriting root's `/`) rather than quietly (inheriting `/90s`) — and either way the spec rule "every routable segment under `/90s` declares its own canonical" is what actually holds the line.

### (c) The `openGraph` inheritance nobody asked for

Same mechanism, currently live and unnoticed: neither `app/90s/metadata.ts` nor `app/90s/layout.tsx` sets `openGraph` or `twitter`, so `/90s` (and every future nested post) **inherits the root layout's entire block** and emits `og:url = https://andrewfurusawa.dev`, `og:title = "Andrew Furusawa - personal website"`, `og:site_name`, and a `twitter:card`. A "private portfolio experiment" page currently advertises itself with the public portfolio's Open Graph identity. See §6.

---

## 4. `X-Robots-Tag` as the primary mechanism

### Google's rules for it

> "The `X-Robots-Tag` can be used as an element of the HTTP header response for a given URL" … using "the same syntax" as the robots meta tag. Multiple headers may be combined, or rules comma-separated:
>
> ```
> X-Robots-Tag: noindex
> X-Robots-Tag: noimageindex
> ```
>
> "The `X-Robots-Tag` may optionally specify a user agent before the rules", e.g. `X-Robots-Tag: googlebot: nofollow`. Rules without a user agent apply to all crawlers.
> — [Robots meta tag, data-nosnippet, and X-Robots-Tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)

Same page: `nofollow` = "Do not follow the links on this page"; `none` = "Equivalent to `noindex, nofollow`"; and where directives conflict, **the more restrictive rule wins** (`nosnippet` beats `max-snippet:50`). The crawl prerequisite is identical to the meta tag's — a robots.txt-blocked URL means the header is never seen either.

The [noindex guide](https://developers.google.com/search/docs/crawling-indexing/block-indexing) lists the meta tag and the header as the two equally valid implementations. There is **no documented precedence of meta over header**; the restrictive-wins rule means having both `X-Robots-Tag: noindex, nofollow` and `<meta name="robots" content="noindex, nofollow">` is consistent and safe, not conflicting.

### How it configures in this repo

`next.config.ts` already returns an array from `headers()`. A second entry is all that is needed. Two facts from [the headers reference](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/headers) govern the shape:

- **`source` is path-to-regexp style, and `:slug*` spans nested paths**: "`/blog/:slug*` will match `/blog/a/b/c/d/hello-world`". Plain `/blog/:slug` matches one segment only ("no nested paths").
- **"Headers are checked before the filesystem which includes pages and `/public` files."** This is the answer to "does it survive static generation": yes. The header is applied at request-routing time, before the prerendered HTML is served from the filesystem. Static generation makes the *body* precomputed; it does not remove the response-header layer.
- **Override behaviour**: "If two headers match the same path and set the same header key, the last header key will override the first." `X-Robots-Tag` collides with nothing in `securityHeaders`, so ordering is a non-issue here — but a future second `X-Robots-Tag` entry would silently replace, not append.

Minimal illustrative shape (spec-level, not an implementation):

```ts
// next.config.ts — additional entry alongside the existing "/:path*" security headers
{ source: "/90s",         headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
{ source: "/90s/:path*",  headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
```

**Both sources are listed deliberately.** The docs demonstrate that `:path*` spans nested segments but never state whether `/90s/:path*` also matches the bare `/90s`. Listing both removes the question. The spec should require a test asserting the header is present on `/90s`, `/90s/skills/<slug>`, and absent on `/`.

### Is the header more robust than the meta tag here? Yes, for four sourced reasons

1. **It cannot be broken by the shallow metadata merge.** §3(a)'s partial-`robots` failure mode is unreachable from `next.config.ts`.
2. **It covers non-HTML responses under the subtree.** Google notes `X-Robots-Tag` is how you apply rules to non-HTML resources (PDFs, images). Anything served under `/90s/*` — an OG image route, an asset — is covered by one directive.
3. **It is immune to streaming-metadata placement.** Next 15 documents that "when `generateMetadata` resolves, the resulting metadata tags are appended to the `<body>` tag" for bots that execute JS, with only "HTML-limited bots" getting them in `<head>` ([generateMetadata → Streaming metadata](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)). Next states it verified Googlebot interprets this correctly, but a response header has no such caveat to verify.
4. **It applies to the RSC/route responses of the subtree**, not only the document.

Deployment caveat to record: `headers()` requires a Next.js runtime. It has no effect under `output: "export"` (plain static file output has no header layer), and on a static-file CDN the equivalent must be configured at the host. This repo runs on Vercel with a normal Next build, so the header applies — but the spec should note that this policy is **runtime-dependent**, whereas the meta tag is baked into the HTML. That is the argument for keeping the meta tag as the redundant second layer rather than deleting it.

---

## 5. Sitemap

**Omission is correct and sufficient, and Next does nothing automatic.**

`sitemap.(js|ts)` is a plain default export returning an array — "You can use the `sitemap.(js|ts)` file convention to programmatically **generate** a sitemap by exporting a default function that returns an array of URLs" ([sitemap.xml](https://nextjs.org/docs/15/app/api-reference/file-conventions/metadata/sitemap)). There is **no route discovery, no crawl of `app/`, and no `generateStaticParams` integration**. What you return is what is served. `app/sitemap.ts` on `main` returns exactly one entry (the root), so `/90s` and everything under it are already absent, and `app/sitemap.test.ts` on the branch locks it.

Two automatic behaviours exist and both are opt-in — the spec should forbid them for this subtree:

- **Nested sitemaps.** "By nesting `sitemap.(xml|js|ts)` inside multiple route segments e.g. `app/sitemap.xml` and `app/products/sitemap.xml`." A file at `app/90s/sitemap.ts` would create a live `/90s/sitemap.xml`. **Rule: no sitemap file anywhere under `app/90s/`.**
- **`generateSitemaps`.** Produces additional public URLs at `/.../sitemap/[id]` (e.g. `/product/sitemap/1.xml`). Not in use; **rule: not used for `/90s`.**

The `sitemap` field in `app/robots.ts` merely writes a `Sitemap:` line into `robots.txt` pointing at `/sitemap.xml` ([robots.txt file convention](https://nextjs.org/docs/15/app/api-reference/file-conventions/metadata/robots)). It cannot leak `/90s` because the sitemap it points at does not contain it.

Honest caveat: sitemap omission is **not** a de-indexing mechanism. A sitemap is a discovery aid; absence from it prevents one discovery path and nothing more. It is necessary, not sufficient — the actual de-indexing work is done entirely by §4.

---

## 6. Other leak vectors — real vs. not

### Real, and worth a spec rule

**A. The `Disallow` line in `robots.txt` itself.** Covered in §1. RFC 9309: "Listing paths in the robots.txt file exposes them publicly and thus makes the paths discoverable." This is the single most concrete discoverability leak in the v1 config, and removing it is free under the recommended policy.

**B. Open Graph / Twitter metadata inheritance.** Live today, per §3(c): `/90s` inherits the root layout's `openGraph` and `twitter` blocks wholesale, so it presents the public portfolio's OG identity. Two distinct problems:
- Wrong data (`og:url` points at the homepage from a `/90s` page).
- `noindex` does not suppress link-preview unfurling. Google's `noindex` controls *search indexing*; social unfurlers are a separate class. Next's own docs name `facebookexternalhit` as an "HTML-limited bot" it special-cases ([generateMetadata → Streaming metadata](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)) — i.e. these agents exist, fetch, and read `<head>`. Pasting a `/90s/skills/foo` URL into Slack, Discord, or iMessage will produce a preview card.
- **Rule:** the `/90s` subtree sets its own `openGraph`/`twitter` explicitly — either minimal-and-honest, or set to a deliberately bare value. Do not leave it inherited. Accept and document that a pasted URL still unfurls; the only way to stop that is to serve nothing useful in `<head>`, and that is a design choice, not an SEO one.

**C. `next/link` prefetch from a public page.** The mechanism is real: "Prefetching happens when a `<Link />` component enters the user's viewport (initially or through scroll). Next.js prefetches and loads the linked route … **Prefetching is only enabled in production**" ([Link component](https://nextjs.org/docs/15/app/api-reference/components/link)). Default `"auto"`/`null` prefetches the full route for static routes.

  But this vector only fires if a public route renders a `<Link href="/90s...">`, and the map constraint forbids exactly that ("no homepage link"). So it is **not currently live** — it is a regression guard, not a defect. Two things it *would* do if violated: expose the href in the public page's HTML (the actual leak), and warm the route in the visitor's browser (harmless). **Rule:** no `next/link` or `<a href>` targeting `/90s` from any route outside `/90s`. If some internal link ever becomes necessary, `prefetch={false}` mitigates the fetch but not the href-in-HTML exposure, which is the part that matters.

**D. Referrer on outbound links.** Real, and already mitigated. `securityHeaders` sets `Referrer-Policy: strict-origin-when-cross-origin`, which per the W3C spec sends "a full URL stripped for use as a referrer … when making same-origin requests", but for cross-origin requests sends "only the ASCII serialization of the origin of the request client" ([Referrer Policy](https://www.w3.org/TR/referrer-policy/)). So an outbound link from `/90s/skills/foo` to an external site leaks `https://andrewfurusawa.dev` — the origin — and **not the path**. The secret URL does not appear in third-party analytics.

  If the author wants zero referrer from the subtree, the spec-able options are `rel="noreferrer"` on outbound links in `/90s` content, or a path-scoped `Referrer-Policy: no-referrer` (spec: "no referrer information is to be sent … The header will be omitted entirely") or `same-origin` (cross-origin requests "will contain no referrer information"). **Recommendation: leave the existing policy.** It already withholds the path; tightening further is cosmetic.

### Not real, or overstated

**E. `generateStaticParams` output in build manifests.** No primary Next.js source documents any public URL that enumerates prerendered route paths. Build output lives under `.next/server/…` and is not served; the public static namespace is `/_next/static/*` (hashed asset chunks). There is no documented `routes.json`-equivalent served to the browser in App Router.

  The honest version of this concern is different and more mundane: **the `/90s` hub page will itself list links to every published post**, in server-rendered HTML that anyone who visits `/90s` can read. That is inherent to a hub-with-links design, not a Next.js leak. The slug set is exactly as secret as the hub is.

**F. RSC payload at a predictable URL.** The RSC payload for a route is fetched from the route's own URL (via an RSC request), not from a separate public path. There is nothing at a *different*, guessable URL to find. Under the recommended policy the `X-Robots-Tag` header covers `/90s/:path*` regardless, so even the RSC response carries the directive. No separate rule needed.

**G. Static generation exposing something extra.** No. Static generation determines *when* the HTML is produced, not *where* it is served from. Per §4, `headers()` applies before the filesystem, so prerendered pages get the header. The one caveat already stated: `output: "export"` would remove the header layer.

**H. Draft posts.** Handled by the sibling research's mechanism (drafts omitted from `generateStaticParams` + `dynamicParams = false` ⇒ 404) and needs no SEO mechanism. A 404 is the correct and complete answer for "must not be reachable at all"; `noindex` is for things that *are* reachable. **Rule:** draft slugs must not appear in the hub's link list either, or the 404 becomes a published 404.

---

## 7. Recommended locked policy for the v2 spec

### Default recommendation: crawl-allowed, header-enforced `noindex`

State it in the spec as these rules:

1. **`app/robots.ts` carries no `disallow` for `userAgent: "*"`.** The `/90s` path is not named in `robots.txt` at all. (This is a change from v1; `app/robots.test.ts` must be updated to assert the *absence* of a `/90s` disallow, and the reason recorded in the test name.)
2. **`X-Robots-Tag: noindex, nofollow` is the primary mechanism**, set in `next.config.ts` `headers()` on two sources: `/90s` and `/90s/:path*`. This is the rule that actually delivers "not in search."
3. **`metadata.robots = { index: false, follow: false }` stays on `app/90s/layout.tsx`** as a redundant, runtime-independent second layer.
4. **No route under `/90s` may export a `robots` key** in `metadata` or `generateMetadata`. Inheritance from the layout is the only permitted source. (Shallow merge — a partial object silently drops sibling fields.)
5. **Every routable segment under `/90s` declares its own self-referential `alternates.canonical`.** `app/90s/page.tsx` → `/90s`; `app/90s/skills/[slug]/page.tsx` → `/90s/skills/<slug>`. **`alternates` is removed from `app/90s/layout.tsx`** so no descendant can inherit a hub-pointing canonical.
6. **`app/90s/layout.tsx` sets `openGraph` and `twitter` explicitly** rather than inheriting the public portfolio's blocks from the root layout.
7. **Sitemap:** `/90s` and all descendants are absent from `app/sitemap.ts`; **no `sitemap.*` file exists anywhere under `app/90s/`**; `generateSitemaps` is not used for this subtree.
8. **No link into `/90s` from any route outside `/90s`** — no `next/link`, no `<a href>`, no `og:url` reference.
9. **Draft posts are absent from `generateStaticParams` and from the hub's link list**, and therefore 404 (`dynamicParams = false`). No SEO mechanism is applied to them, because they do not exist as routes.
10. **Tests lock the observable surface**, not the config shape: `robots.txt` contains no `/90s`; `/90s` and a representative post URL respond with `X-Robots-Tag: noindex, nofollow`; `/` does not; the sitemap contains no `/90s` URL; the post's canonical resolves to its own URL.

### The trade-off the author is explicitly accepting

**Crawlers will fetch these pages.** Googlebot and every other compliant crawler will request `/90s` and each `/90s/skills/<slug>`, download the full HTML, and then honour `noindex` by keeping it out of the index. The content exists in crawler infrastructure. In exchange you get the only documented guarantee of true absence from search results, plus a `robots.txt` that says nothing about `/90s`.

The alternative — `Disallow: /90s$` + `Disallow: /90s/` — means compliant crawlers never fetch the bytes, but (a) the `noindex` is never seen, so a URL discovered via an external link can still appear as a bare result, and (b) `/90s` is announced in a file at a well-known public path.

### When to choose the other branch

Pick `Disallow` if the author's real priority shifts from *"must not appear in search"* to *"must not be ingested"* — e.g. the posts contain writing the author does not want in crawler or model-training corpora. In that case the risk of a stray snippet-less URL listing is the acceptable price, and it is a coherent position.

**The compromise worth putting in front of the author:** `MetadataRoute.Robots` accepts an array of per-user-agent rules ([robots.txt file convention](https://nextjs.org/docs/15/app/api-reference/file-conventions/metadata/robots)). You can leave the `*` group free to crawl — so Googlebot fetches and obeys `noindex` — while disallowing specific named ingestion agents:

```ts
rules: [
  { userAgent: "*", allow: "/" },
  { userAgent: ["GPTBot", "CCBot"], disallow: ["/90s$", "/90s/"] },
],
```

This gets true de-indexing *and* opts out of named scrapers. It costs the RFC 9309 path-exposure — `/90s` is back in `robots.txt` — so it is only worth it if ingestion is a real concern. **If it is not, take the default: no mention of `/90s` in `robots.txt` at all.**

---

## 8. Open questions for the spec author

1. **Scope amendment.** The frozen v1 spec lists "multi-route `/90s/*`" as out of scope and locks "robots disallow `/90s`". Both need explicit amendment before this policy is actionable. Should the v2 spec supersede §"SEO" wholesale, or amend it line by line with a changelog?
2. **Ingestion vs. de-indexing.** Which do you actually care more about — the posts never appearing in Google, or the posts never being fetched by scrapers/model crawlers? The default in §7 assumes the former. The answer decides whether `robots.txt` mentions `/90s` at all.
3. **Unfurl behaviour.** Should a `/90s/skills/<slug>` URL pasted into Slack/Discord produce a preview card? `noindex` does not prevent this. If the answer is no, the spec must say what `openGraph` on the subtree is set to — and accept a degraded share experience for the people you *do* send the link to.
4. **Meta tag retention.** Is the redundant `metadata.robots` on the layout worth the shallow-merge footgun it creates (rule 4)? Keeping it buys runtime-independence; dropping it removes a class of silent regression. Recommendation is keep + test, but it is a judgement call.
5. **Rule 8 enforcement.** "No link into `/90s` from outside" is the whole soft-secret premise and nothing currently enforces it. Is a lint rule / test worth it, or is the constraint small enough to hold by convention?
6. **Header-source matching.** Whether `/90s/:path*` also matches the bare `/90s` is not stated in the Next docs. §7 lists both sources to sidestep it; if the author prefers one entry, the behaviour needs an empirical check against `next start` before it is spec'd.
7. **Deployment coupling.** Rule 2 depends on a Next.js runtime serving the headers. If the site ever moves to `output: "export"` or a pure static host, the primary mechanism silently disappears while the meta tag survives. Worth a note in the spec's "assumptions" section.
