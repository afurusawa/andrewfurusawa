"use client";

/**
 * PROTOTYPE Variant J — "Sticky Marquee".
 *
 * Round 3. Keeps G's colour transitions but moves them from a side stage to
 * a sticky top marquee, which buys the content the full page width — the
 * answer to "the content side is a bit plain": wide editorial grids instead
 * of a narrow column. The marquee works identically at every width, so the
 * mobile reading keeps the colour story. "Recent work" draws all three
 * engagements as lanes on one shared axis rather than three separate bars.
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  contact,
  credentials,
  howIWork,
  identity,
  portrait,
  recentWork,
  whatIDo,
  whereIHelp,
} from "../stubContent";
import { AXIS_END, AXIS_YEARS, METRICS, pct, span } from "../timeline";

const SECTIONS = [
  { id: "what", label: whatIDo.label, field: "bg-teal-800" },
  { id: "where", label: whereIHelp.label, field: "bg-indigo-800" },
  { id: "work", label: recentWork.label, field: "bg-neutral-900" },
  { id: "how", label: howIWork.label, field: "bg-orange-700" },
  { id: "contact", label: contact.label, field: "bg-rose-900" },
];

/** Lane colour per project, in `featuredWork` order. */
const LANE = ["bg-teal-600", "bg-indigo-500", "bg-orange-500"];

export default function VariantJ() {
  const [active, setActive] = useState(0);
  const cred = credentials.items[0];

  useEffect(() => {
    const sections = SECTIONS.map(section => document.getElementById("j-" + section.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = SECTIONS.findIndex(section => "j-" + section.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const current = SECTIONS[active];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-[family-name:var(--phr-sans)] antialiased">
      {/* Marquee — repaints with the section in view, at every width */}
      <div
        className={
          "sticky top-0 z-40 text-white transition-colors duration-500 " + current.field
        }
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 py-3 md:px-10">
          <a
            href="#j-what"
            className="font-[family-name:var(--phr-display)] text-base tracking-tight md:text-lg"
          >
            {identity.name}
          </a>
          <span aria-hidden className="h-4 w-px bg-white/30" />
          <p className="flex min-w-0 items-baseline gap-2">
            <span className="font-[family-name:var(--phr-mono)] text-[0.625rem] tracking-[0.18em] text-white/60">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="truncate font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-white/90">
              {current.label}
            </span>
          </p>
          <a
            href={contact.primary.href}
            className="ml-auto shrink-0 border border-white/60 px-3 py-1.5 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.14em] hover:bg-white hover:text-neutral-900"
          >
            Email me
          </a>
        </div>
        <div className="flex h-1" aria-hidden>
          {SECTIONS.map((section, i) => (
            <div
              key={section.id}
              className={
                "h-full flex-1 bg-white transition-opacity duration-500 " +
                (i <= active ? "opacity-80" : "opacity-20")
              }
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Hero — portrait, statement, credential */}
        <header className="grid gap-8 border-b border-neutral-900 py-12 md:grid-cols-[auto_1fr] md:gap-12 md:py-16">
          <div>
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              priority
              className="h-32 w-32 object-cover md:h-52 md:w-52"
            />
            <div className="mt-5 flex items-center gap-3">
              <Image src={cred.badge} alt={cred.alt} width={600} height={600} className="h-12 w-12" />
              <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] text-neutral-500">
                {cred.name}
                <br />
                {cred.issuer} · {cred.year}
              </p>
            </div>
          </div>
          <div>
            <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-teal-800">
              {identity.line}
            </p>
            <h1 className="mt-5 max-w-[16ch] font-[family-name:var(--phr-display)] text-[2.5rem] leading-[0.98] tracking-tight md:text-[4rem]">
              {whatIDo.statement}
            </h1>
            <p className="mt-7 max-w-[52ch] font-[family-name:var(--phr-serif)] text-xl leading-relaxed text-neutral-700">
              {identity.lede}
            </p>
          </div>
        </header>

        {/* What I do */}
        <section id="j-what" className="grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16">
          <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-neutral-500">
            {whatIDo.label}
          </h2>
          <div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {whatIDo.body.map(p => (
                <p key={p.slice(0, 24)} className="text-base leading-relaxed text-neutral-700">
                  {p}
                </p>
              ))}
            </div>
            <dl className="mt-10 grid gap-6 border-t border-neutral-900 pt-7 sm:grid-cols-3">
              {recentWork.projects.map((project, i) => (
                <div key={project.slug}>
                  <dt
                    className={
                      "font-[family-name:var(--phr-display)] text-5xl leading-none tracking-tight " +
                      ["text-teal-700", "text-indigo-700", "text-orange-600"][i]
                    }
                  >
                    {METRICS[project.slug].value}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-neutral-500">
                    {METRICS[project.slug].caption}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Where I help — full-width four-up */}
        <section id="j-where" className="grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16">
          <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-neutral-500">
            {whereIHelp.label}
          </h2>
          <ul className="grid gap-x-12 gap-y-9 md:grid-cols-2 xl:grid-cols-4">
            {whereIHelp.items.map((item, i) => (
              <li key={item.title} className="relative overflow-hidden">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-5 right-0 select-none font-[family-name:var(--phr-display)] text-7xl leading-none text-indigo-50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative border-t-2 border-indigo-800 pt-4">
                  <h3 className="font-[family-name:var(--phr-display)] text-xl leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent work — one shared axis, three lanes */}
        <section id="j-work" className="grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16">
          <div>
            <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-neutral-500">
              {recentWork.label}
            </h2>
            <p className="mt-3 font-[family-name:var(--phr-serif)] text-lg leading-snug text-neutral-500">
              {recentWork.helper}
            </p>
          </div>

          <div>
            {/* the chart */}
            <div className="border-t border-neutral-900 pt-5">
              {recentWork.projects.map((project, i) => {
                const [start, end] = span(project.period);
                return (
                  <div key={project.slug} className="flex items-center gap-4 py-2">
                    <span className="w-24 shrink-0 truncate font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-neutral-500 md:w-40">
                      {project.title}
                    </span>
                    <div className="relative h-4 flex-1 bg-neutral-100">
                      <div
                        className={"absolute top-0 h-4 " + LANE[i % LANE.length]}
                        style={{ left: pct(start) + "%", width: pct(end) - pct(start) + "%" }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4 pt-1">
                <span className="w-24 shrink-0 md:w-40" aria-hidden />
                <div className="flex flex-1 justify-between border-t border-neutral-300 pt-2 font-[family-name:var(--phr-mono)] text-[0.625rem] tracking-[0.1em] text-neutral-500">
                  {AXIS_YEARS.map(year => (
                    <span key={year}>{year === AXIS_END ? "now" : year}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* the record */}
            <div className="mt-10 grid gap-9 md:grid-cols-3 md:gap-8">
              {recentWork.projects.map((project, i) => (
                <article key={project.slug}>
                  <span
                    aria-hidden
                    className={"block h-1 w-12 " + LANE[i % LANE.length]}
                  />
                  <h3 className="mt-4 font-[family-name:var(--phr-display)] text-2xl leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.12em] text-neutral-500">
                    {project.period}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">{project.role}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral-700">
                    {project.blurb}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <li
                        key={tech}
                        className="border border-neutral-300 px-2 py-0.5 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-neutral-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How I work */}
        <section id="j-how" className="grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16">
          <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-neutral-500">
            {howIWork.label}
          </h2>
          <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
            {howIWork.items.map((item, i) => (
              <li key={item.title}>
                <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] tracking-[0.18em] text-orange-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-[family-name:var(--phr-display)] text-lg leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Contact — full bleed close */}
      <section id="j-contact" className="bg-rose-900 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 md:grid-cols-[14rem_1fr] md:gap-12 md:px-10">
          <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] text-rose-300">
            {contact.label}
          </h2>
          <div>
            <p className="max-w-[18ch] font-[family-name:var(--phr-display)] text-[2rem] leading-tight tracking-tight md:text-5xl">
              {contact.invitation}
            </p>
            <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
              {contact.links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noreferrer" : undefined}
                    className="flex items-center gap-2 border-b border-white/40 pb-1 text-base hover:border-white"
                  >
                    <link.Icon aria-hidden className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
