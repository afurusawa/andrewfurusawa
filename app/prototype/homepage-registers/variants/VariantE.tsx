"use client";

/**
 * PROTOTYPE Variant E — "Rail + Bands".
 *
 * Round 2, from the feedback on C and D: keep C's information architecture
 * (a persistent rail carrying identity, spine and contact) but stop the right
 * column being an undifferentiated wall of text. Each section becomes a
 * full-bleed band with its own field colour, so scrolling reads as a sequence
 * of rooms — D's chroma and rhythm, at C's density, with no dead space.
 */
import {
  contact,
  howIWork,
  identity,
  recentWork,
  whatIDo,
  whereIHelp,
} from "../stubContent";

const SECTIONS = [
  { id: "what", label: whatIDo.label },
  { id: "where", label: whereIHelp.label },
  { id: "work", label: recentWork.label },
  { id: "how", label: howIWork.label },
];

export default function VariantE() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-[family-name:var(--phr-sans)] antialiased lg:grid lg:grid-cols-[18rem_1fr]">
      {/* Ink rail — identity, spine, contact, always on screen */}
      <aside className="flex flex-col bg-slate-900 px-7 py-9 text-white lg:sticky lg:top-0 lg:h-screen">
        <div>
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.22em] text-blue-300">
            {identity.line}
          </p>
          <h1 className="mt-3 font-[family-name:var(--phr-display)] text-3xl leading-none tracking-tight">
            {identity.name}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-slate-300">{identity.lede}</p>
        </div>

        <nav className="mt-9" aria-label="Sections">
          <ul>
            {SECTIONS.map((section, i) => (
              <li key={section.id} className="border-t border-white/15">
                <a
                  href={"#" + section.id}
                  className="group flex items-baseline gap-3 py-3 font-[family-name:var(--phr-mono)] text-xs uppercase tracking-[0.14em] text-slate-300 hover:text-white"
                >
                  <span className="text-blue-400">{String(i + 1).padStart(2, "0")}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-9 lg:mt-auto">
          <a
            href={contact.primary.href}
            className="block bg-blue-600 px-4 py-3 text-center text-sm font-semibold tracking-tight text-white hover:bg-blue-500"
          >
            Start a conversation
          </a>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {contact.links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noreferrer" : undefined}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                >
                  <link.Icon aria-hidden className="h-3.5 w-3.5" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main>
        {/* Band 1 — cream, the statement */}
        <section id="what" className="bg-[#fdf8ef] px-7 py-16 md:px-14 md:py-24">
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-blue-700">
            {whatIDo.label}
          </p>
          <h2 className="mt-6 max-w-[20ch] font-[family-name:var(--phr-display)] text-4xl leading-[1.02] tracking-tight md:text-6xl">
            {whatIDo.statement}
          </h2>
          <div className="mt-10 grid gap-8 border-t border-slate-900/15 pt-8 md:grid-cols-2">
            {whatIDo.body.map(p => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Band 2 — white, four fields with numeral watermarks */}
        <section id="where" className="px-7 py-16 md:px-14 md:py-24">
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-blue-700">
            {whereIHelp.label}
          </p>
          <div className="mt-8 grid gap-px bg-slate-200 md:grid-cols-2">
            {whereIHelp.items.map((item, i) => (
              <div key={item.title} className="relative overflow-hidden bg-white p-7">
                <span
                  aria-hidden
                  className="absolute -top-4 right-2 font-[family-name:var(--phr-display)] text-8xl leading-none text-slate-100"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <h3 className="font-[family-name:var(--phr-display)] text-2xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Band 3 — cobalt, the work */}
        <section id="work" className="bg-blue-700 px-7 py-16 text-white md:px-14 md:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-blue-200">
              {recentWork.label}
            </p>
            <p className="text-sm text-blue-200">{recentWork.helper}</p>
          </div>
          <div className="mt-8">
            {recentWork.projects.map(project => (
              <article
                key={project.slug}
                className="grid gap-4 border-t border-white/25 py-8 md:grid-cols-[12rem_1fr] md:gap-10"
              >
                <div>
                  <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-blue-200">
                    {project.period}
                  </p>
                  <p className="mt-1 text-xs text-blue-200/80">{project.role}</p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--phr-display)] text-3xl leading-none tracking-tight md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-blue-50">
                    {project.blurb}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <li
                        key={tech}
                        className="border border-white/30 px-2 py-1 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.1em] text-blue-100"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Band 4 — cream, working method */}
        <section id="how" className="bg-[#fdf8ef] px-7 py-16 md:px-14 md:py-24">
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-blue-700">
            {howIWork.label}
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {howIWork.items.map(item => (
              <div key={item.title} className="border-t-2 border-slate-900 pt-4">
                <h3 className="font-[family-name:var(--phr-display)] text-xl tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Band 5 — ink, the close */}
        <section className="bg-slate-900 px-7 py-16 text-white md:px-14 md:py-20">
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-blue-300">
            {contact.label}
          </p>
          <p className="mt-6 max-w-[20ch] font-[family-name:var(--phr-display)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
            {contact.invitation}
          </p>
          <a
            href={contact.primary.href}
            className="mt-8 inline-block border-b-2 border-blue-400 pb-1 text-xl text-blue-200 hover:text-white md:text-2xl"
          >
            {contact.primary.label}
          </a>
        </section>
      </main>
    </div>
  );
}
