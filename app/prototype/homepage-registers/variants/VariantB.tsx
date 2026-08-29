"use client";

/**
 * PROTOTYPE Variant B — "Studio Grid".
 *
 * Register: contemporary product studio. Sticky slim nav with a persistent
 * CTA, cool near-white field, geometric sans throughout, and a bento grid that
 * mixes tile sizes. Everything is a surface with a border radius; the primary
 * affordance is scanning and clicking, not reading straight through.
 */
import {
  contact,
  howIWork,
  identity,
  recentWork,
  whatIDo,
  whereIHelp,
} from "../stubContent";

const NAV = [
  { label: "What I do", href: "#what" },
  { label: "Where I help", href: "#where" },
  { label: "Recent work", href: "#work" },
  { label: "How I work", href: "#how" },
];

export default function VariantB() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-[family-name:var(--phr-sans)] antialiased">
      {/* Sticky slim nav */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <span className="text-sm font-semibold tracking-tight">{identity.name}</span>
          <ul className="hidden gap-5 md:flex">
            {NAV.map(item => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-slate-500 hover:text-slate-900">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={contact.primary.href}
            className="ml-auto rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Get in touch
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <header id="what" className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-8">
            <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium tracking-wide text-slate-600">
              {identity.line}
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              {whatIDo.statement}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              {identity.lede}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={contact.primary.href}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Start a conversation
              </a>
              <a
                href="#work"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                See recent work
              </a>
            </div>
          </div>
          <aside className="self-end rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-4">
            {whatIDo.body.map(p => (
              <p
                key={p.slice(0, 24)}
                className="mb-4 text-sm leading-relaxed text-slate-600 last:mb-0"
              >
                {p}
              </p>
            ))}
          </aside>
        </header>

        {/* Where I help — bento */}
        <section id="where" className="py-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {whereIHelp.label}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {whereIHelp.items.map((item, i) => (
              <div
                key={item.title}
                className={
                  "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" +
                  (i === 0 ? " md:col-span-2" : "")
                }
              >
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent work — cards */}
        <section id="work" className="py-14">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {recentWork.label}
            </h2>
            <p className="text-sm text-slate-500">{recentWork.helper}</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recentWork.projects.map(project => (
              <article
                key={project.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
              >
                <div
                  className="h-28 rounded-xl bg-gradient-to-br from-indigo-100 via-slate-100 to-teal-100"
                  aria-hidden
                />
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{project.role}</p>
                <p className="text-xs text-slate-400">{project.period}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {project.blurb}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map(tag => (
                    <li
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[0.6875rem] font-medium text-slate-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* How I work — numbered strip */}
        <section id="how" className="py-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {howIWork.label}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {howIWork.items.map((item, i) => (
              <div key={item.title} className="border-t-2 border-slate-900 pt-4">
                <span className="text-xs font-semibold text-indigo-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact block */}
        <section className="mb-20 rounded-3xl bg-slate-900 px-8 py-12 text-white md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <h2 className="max-w-md text-3xl font-semibold tracking-tight">
                {contact.invitation}
              </h2>
              <a
                href={contact.primary.href}
                className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-indigo-100"
              >
                {contact.primary.label}
              </a>
            </div>
            <ul className="flex gap-4">
              {contact.links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noreferrer" : undefined}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 hover:border-white hover:text-white"
                  >
                    <link.Icon aria-hidden className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
