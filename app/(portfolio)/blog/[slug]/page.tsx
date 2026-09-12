import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublishedBlogSlugs,
  getRenderedBlogEntry,
} from "../../../lib/blogCatalogue";
import { SITE_NAME } from "../../../config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const entry = await getRenderedBlogEntry((await params).slug);

  if (!entry) {
    return {};
  }

  return {
    title: `${entry.title} · ${SITE_NAME}`,
    description: entry.summary,
    alternates: {
      canonical: `/blog/${entry.slug}`,
    },
  };
}

export default async function BlogEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const entry = await getRenderedBlogEntry((await params).slug);

  if (!entry) {
    notFound();
  }

  return (
    <main id="record" tabIndex={-1} className="px-6 py-12 md:px-12 lg:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-metadata">
        <a
          href="/blog"
          className="underline decoration-1 underline-offset-4 hover:text-heading"
        >
          Writing
        </a>
      </p>
      <header className="mt-6 max-w-prose">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-metadata">
          <time dateTime={entry.date}>{entry.date}</time>
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
          {entry.summary}
        </p>
      </header>
      <article className="blog-body mt-10 max-w-prose">
        {/* Sanitized at build time by the shared Markdown pipeline. */}
        <div dangerouslySetInnerHTML={{ __html: entry.html }} />
      </article>
    </main>
  );
}
