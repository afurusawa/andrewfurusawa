import { blogEntryHref, type BlogEntry } from "../../lib/blogCatalogue";

export function BlogIndex({ entries }: { entries: readonly BlogEntry[] }) {
  return (
    <main id="record" tabIndex={-1} className="px-6 py-12 md:px-12 lg:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-metadata">
        <a
          href="/"
          className="underline decoration-1 underline-offset-4 hover:text-heading"
        >
          Home
        </a>
      </p>
      <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-5xl">
        Writing
      </h1>
      {entries.length === 0 ? (
        <p className="mt-8 max-w-prose text-[0.9375rem] leading-relaxed text-body">
          Nothing published yet.
        </p>
      ) : (
        <ul className="mt-10">
          {entries.map((entry) => (
            <li
              key={entry.slug}
              className="border-t border-hairline py-6 first:border-t-0 first:pt-0"
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-metadata">
                <time dateTime={entry.date}>{entry.date}</time>
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-tight">
                <a
                  href={blogEntryHref(entry.slug)}
                  className="hover:underline hover:decoration-1 hover:underline-offset-4"
                >
                  {entry.title}
                </a>
              </h2>
              <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-body">
                {entry.summary}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
