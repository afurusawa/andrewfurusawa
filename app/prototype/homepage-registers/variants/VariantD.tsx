"use client";

/**
 * PROTOTYPE Variant D — "Poster Panels".
 *
 * Register: a poster sequence. No nav at all — full-height panels, one idea
 * per screen, oversized display type, and one saturated accent field that
 * flips the page to inverse for the work section. Recent work is full-bleed
 * alternating rows with huge numerals rather than a grid. Primary affordance:
 * scrolling through a statement.
 */
import {
  contact,
  howIWork,
  identity,
  recentWork,
  whatIDo,
  whereIHelp,
} from "../stubContent";

export default function VariantD() {
  return (
    <div className="min-h-screen bg-[#fdfcf9] text-neutral-950 font-[family-name:var(--phr-sans)] antialiased">
      {/* Panel 1 — the statement */}
      <section className="flex min-h-screen flex-col justify-between px-6 py-10 md:px-14">
        <div className="flex items-baseline justify-between">
          <span className="font-[family-name:var(--phr-display)] text-lg uppercase tracking-tight">
            {identity.name}
          </span>
          <span className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.2em] text-neutral-500">
            {identity.line}
          </span>
        </div>

        <h1 className="max-w-[18ch] font-[family-name:var(--phr-display)] text-[13vw] leading-[0.92] tracking-[-0.02em] md:text-[7.5vw]">
          {whatIDo.statement}
        </h1>

        <div className="grid gap-8 md:grid-cols-12">
          <p className="text-base leading-relaxed text-neutral-600 md:col-span-5">
            {identity.lede}
          </p>
          <div className="md:col-span-4 md:col-start-9">
            <a
              href={contact.primary.href}
              className="inline-flex items-center gap-3 bg-neutral-950 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#fdfcf9] hover:bg-orange-600"
            >
              Start a conversation
              <span aria-hidden>↘</span>
            </a>
          </div>
        </div>
      </section>

      {/* Panel 2 — what I do, on the accent field */}
      <section className="bg-orange-600 px-6 py-24 text-neutral-950 md:px-14">
        <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em]">
          {whatIDo.label}
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {whatIDo.body.map(p => (
            <p
              key={p.slice(0, 24)}
              className="text-2xl leading-snug tracking-tight md:text-[1.75rem]"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Panel 3 — where I help, as oversized list */}
      <section className="px-6 py-24 md:px-14">
        <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-neutral-500">
          {whereIHelp.label}
        </p>
        <ul className="mt-8">
          {whereIHelp.items.map(item => (
            <li
              key={item.title}
              className="grid gap-4 border-t border-neutral-950/15 py-8 md:grid-cols-12"
            >
              <h2 className="font-[family-name:var(--phr-display)] text-3xl leading-none tracking-tight md:col-span-6 md:text-5xl">
                {item.title}
              </h2>
              <p className="text-base leading-relaxed text-neutral-600 md:col-span-5 md:col-start-8">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Panel 4 — recent work, inverse */}
      <section className="bg-neutral-950 px-6 py-24 text-[#fdfcf9] md:px-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-neutral-400">
            {recentWork.label}
          </p>
          <p className="text-sm text-neutral-400">{recentWork.helper}</p>
        </div>
        <div className="mt-10">
          {recentWork.projects.map((project, i) => (
            <article
              key={project.slug}
              className="grid items-start gap-6 border-t border-white/15 py-12 md:grid-cols-12"
            >
              <span className="font-[family-name:var(--phr-display)] text-6xl leading-none text-white/25 md:col-span-2 md:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-5">
                <h3 className="font-[family-name:var(--phr-display)] text-4xl leading-none tracking-tight md:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-400">{project.role}</p>
                <p className="font-[family-name:var(--phr-mono)] text-xs text-neutral-500">
                  {project.period}
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <p className="text-base leading-relaxed text-neutral-300">{project.blurb}</p>
                <p className="mt-4 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-neutral-500">
                  {project.stack.join(" · ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Panel 5 — how I work */}
      <section className="px-6 py-24 md:px-14">
        <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-neutral-500">
          {howIWork.label}
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {howIWork.items.map(item => (
            <div key={item.title} className="border-l-4 border-orange-600 pl-6">
              <h3 className="font-[family-name:var(--phr-display)] text-2xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 max-w-prose text-base leading-relaxed text-neutral-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Panel 6 — contact */}
      <section className="flex min-h-[80vh] flex-col justify-between bg-orange-600 px-6 py-16 md:px-14">
        <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em]">
          {contact.label}
        </p>
        <div>
          <p className="max-w-[16ch] font-[family-name:var(--phr-display)] text-[11vw] leading-[0.95] tracking-[-0.02em] md:text-[6vw]">
            {contact.invitation}
          </p>
          <a
            href={contact.primary.href}
            className="mt-8 inline-block border-b-4 border-neutral-950 pb-1 font-[family-name:var(--phr-display)] text-2xl tracking-tight hover:text-[#fdfcf9] md:text-4xl"
          >
            {contact.primary.label}
          </a>
        </div>
        <ul className="mt-12 flex flex-wrap gap-6">
          {contact.links.slice(1).map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-label={link.ariaLabel}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noreferrer" : undefined}
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] hover:text-[#fdfcf9]"
              >
                <link.Icon aria-hidden className="h-4 w-4" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
