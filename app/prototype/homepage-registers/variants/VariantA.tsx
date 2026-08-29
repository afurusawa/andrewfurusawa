"use client";

/**
 * PROTOTYPE Variant A — "Editorial Broadsheet".
 *
 * Register: printed feature article. One warm paper field, a full-bleed
 * masthead rule, asymmetric measure (statement left, supporting prose right),
 * hairline dividers, no cards anywhere. Recent work is a numbered index, not a
 * grid. Contact is a closing colophon. Primary affordance: reading.
 */
import {
  contact,
  howIWork,
  identity,
  recentWork,
  whatIDo,
  whereIHelp,
} from "../stubContent";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.22em] text-stone-500">
      {children}
    </p>
  );
}

export default function VariantA() {
  return (
    <div className="min-h-screen bg-[#faf7f1] text-stone-900 font-[family-name:var(--phr-serif)] selection:bg-stone-900 selection:text-[#faf7f1]">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Masthead */}
        <header className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-stone-900 pt-12 pb-4">
          <h1 className="text-3xl md:text-4xl tracking-tight">{identity.name}</h1>
          <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.22em] text-stone-600">
            {identity.line}
          </p>
        </header>

        {/* Lede */}
        <section className="grid gap-8 border-b border-stone-300 py-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[2rem] leading-[1.2] md:text-[2.75rem] md:leading-[1.15]">
              {whatIDo.statement}
            </p>
          </div>
          <div className="space-y-5 self-end md:col-span-4 md:col-start-9">
            <SectionLabel>{whatIDo.label}</SectionLabel>
            {whatIDo.body.map(p => (
              <p
                key={p.slice(0, 24)}
                className="font-[family-name:var(--phr-sans)] text-[0.9375rem] leading-relaxed text-stone-700"
              >
                {p}
              </p>
            ))}
            <a
              href={contact.primary.href}
              className="inline-block border-b-2 border-stone-900 pb-0.5 font-[family-name:var(--phr-sans)] text-sm font-medium hover:border-orange-600 hover:text-orange-700"
            >
              Start a conversation →
            </a>
          </div>
        </section>

        {/* Where I help — running columns, no cards */}
        <section className="border-b border-stone-300 py-14">
          <SectionLabel>{whereIHelp.label}</SectionLabel>
          <div className="mt-8 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {whereIHelp.items.map(item => (
              <div key={item.title} className="border-t border-stone-900/80 pt-4">
                <h2 className="text-xl">{item.title}</h2>
                <p className="mt-2 max-w-prose font-[family-name:var(--phr-sans)] text-[0.9375rem] leading-relaxed text-stone-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent work — numbered index */}
        <section className="border-b border-stone-300 py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <SectionLabel>{recentWork.label}</SectionLabel>
            <p className="font-[family-name:var(--phr-sans)] text-sm text-stone-500">
              {recentWork.helper}
            </p>
          </div>
          <ol className="mt-8">
            {recentWork.projects.map((project, i) => (
              <li
                key={project.slug}
                className="grid gap-x-8 gap-y-3 border-t border-stone-300 py-8 md:grid-cols-12"
              >
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-[family-name:var(--phr-mono)] text-sm text-stone-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl leading-tight">{project.title}</h3>
                    <p className="mt-1 font-[family-name:var(--phr-sans)] text-sm text-stone-600">
                      {project.role}
                    </p>
                    <p className="font-[family-name:var(--phr-mono)] text-xs text-stone-500">
                      {project.period}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="max-w-prose font-[family-name:var(--phr-sans)] text-[0.9375rem] leading-relaxed text-stone-700">
                    {project.blurb}
                  </p>
                  <p className="mt-3 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-stone-500">
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* How I work — inline creed */}
        <section className="border-b border-stone-300 py-14">
          <SectionLabel>{howIWork.label}</SectionLabel>
          <div className="mt-6 grid gap-8 md:grid-cols-4">
            {howIWork.items.map(item => (
              <div key={item.title}>
                <h3 className="text-lg leading-snug">{item.title}</h3>
                <p className="mt-2 font-[family-name:var(--phr-sans)] text-sm leading-relaxed text-stone-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Colophon contact */}
        <footer className="grid gap-6 py-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-3xl leading-tight md:text-4xl">{contact.invitation}</p>
          </div>
          <ul className="space-y-2 self-end md:col-span-4 md:col-start-9">
            {contact.links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 font-[family-name:var(--phr-sans)] text-[0.9375rem] text-stone-700 hover:text-orange-700"
                >
                  <link.Icon aria-hidden className="h-4 w-4 text-stone-400 group-hover:text-orange-700" />
                  <span className="border-b border-transparent group-hover:border-orange-700">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
}
