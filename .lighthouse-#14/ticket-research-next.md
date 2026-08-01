Part of #15

## Question

What are the sound **Next.js App Router** patterns for hosting an isolated visual experiment at `/90s` inside this existing portfolio app?

Surface facts and trade-offs (not a final decision) for:

1. Route/layout structure (nested `app/90s` layout, route groups, shared root layout constraints).
2. **Style isolation** so Neon Cyber Basement CSS/fonts do not leak onto the live homepage, and vice versa.
3. Metadata, `robots` / indexing controls for a secret URL, sitemap inclusion/exclusion.
4. Font loading and client-component boundaries relevant to kitsch UI.
5. Anything in *this* repo's current `app/` setup that constrains the above.

Primary sources: Next.js docs, this repo's `app/` tree and config. Write findings under `docs/research/` per repo convention.
