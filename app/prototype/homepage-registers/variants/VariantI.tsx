"use client";

/**
 * PROTOTYPE Variant I — "Portrait Ledger".
 *
 * Round 3. No sticky chrome at all: the colour story is carried by
 * full-bleed bands that reflow identically at every width, so the mobile
 * reading is the same design rather than a reduced one. Opens on a portrait
 * masthead — face, name, credential — then runs E's typographic range and
 * ghost numerals through the spine, with F's timeline inverted on a dark
 * band as the centre of gravity.
 */
import Image from "next/image";
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

export default function VariantI() {
  const cred = credentials.items[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-[family-name:var(--phr-sans)] antialiased">
      {/* Masthead — colour field beside the portrait */}
      <header className="grid md:grid-cols-[1.15fr_1fr]">
        <div className="order-2 flex flex-col justify-between bg-blue-900 px-6 py-10 text-white md:order-1 md:px-12 md:py-14">
          <div>
            <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-blue-300">
              {identity.line}
            </p>
            <h1 className="mt-6 font-[family-name:var(--phr-display)] text-[2.75rem] leading-[0.95] tracking-tight md:text-6xl">
              {identity.name}
            </h1>
            <p className="mt-7 max-w-[34ch] font-[family-name:var(--phr-serif)] text-xl leading-snug text-white/85">
              {identity.lede}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={contact.primary.href}
              className="bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-blue-900 hover:bg-blue-200"
            >
              Start a conversation
            </a>
            <div className="flex items-center gap-3">
              <Image src={cred.badge} alt={cred.alt} width={600} height={600} className="h-12 w-12" />
              <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-blue-200">
                {cred.short} · {cred.issuer}
                <br />
                {cred.year}
              </p>
            </div>
          </div>
        </div>
        <div className="relative order-1 h-64 md:order-2 md:h-auto">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            priority
            className="h-full w-full object-cover object-top"
          />
        </div>
      </header>

      {/* What I do — cream, serif statement, numerals */}
      <section className="bg-[#fdf8ef] px-6 py-14 md:px-12 md:py-20">
        <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
          {whatIDo.label}
        </p>
        <h2 className="mt-6 max-w-[20ch] font-[family-name:var(--phr-display)] text-[2.25rem] leading-[1.02] tracking-tight md:text-[3.5rem]">
          {whatIDo.statement}
        </h2>
        <div className="mt-10 grid gap-8 border-t border-neutral-900 pt-8 md:grid-cols-[1fr_1fr_0.8fr] md:gap-12">
          {whatIDo.body.map(p => (
            <p key={p.slice(0, 24)} className="text-[0.9375rem] leading-relaxed text-neutral-700">
              {p}
            </p>
          ))}
          <dl className="space-y-5">
            {recentWork.projects.map(project => (
              <div key={project.slug} className="flex items-baseline gap-3">
                <dt className="font-[family-name:var(--phr-display)] text-3xl leading-none tracking-tight text-blue-900">
                  {METRICS[project.slug].value}
                </dt>
                <dd className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase leading-snug tracking-[0.1em] text-neutral-500">
                  {METRICS[project.slug].caption}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Where I help — white, ghost numerals behind each cell */}
      <section className="px-6 py-14 md:px-12 md:py-20">
        <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
          {whereIHelp.label}
        </p>
        <ul className="mt-8 grid gap-px bg-neutral-200 md:grid-cols-2">
          {whereIHelp.items.map((item, i) => (
            <li key={item.title} className="relative overflow-hidden bg-white p-7 md:p-9">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 select-none font-[family-name:var(--phr-display)] text-9xl leading-none text-neutral-100"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="font-[family-name:var(--phr-display)] text-2xl tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent work — inverted timeline band */}
      <section className="bg-neutral-900 px-6 py-14 text-white md:px-12 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-amber-400">
            {recentWork.label}
          </p>
          <p className="font-[family-name:var(--phr-serif)] text-lg text-white/70">
            {recentWork.helper}
          </p>
        </div>

        <div className="mt-9">
          {recentWork.projects.map(project => {
            const [start, end] = span(project.period);
            return (
              <article
                key={project.slug}
                className="grid gap-5 border-t border-white/20 py-8 md:grid-cols-[1fr_1.15fr] md:gap-12"
              >
                <div>
                  <h3 className="font-[family-name:var(--phr-display)] text-3xl leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-white/50">
                    {project.period} · {project.role}
                  </p>
                  <div className="relative mt-5 h-3 bg-white/15">
                    <div
                      className="absolute top-0 h-3 bg-amber-400"
                      style={{ left: pct(start) + "%", width: pct(end) - pct(start) + "%" }}
                    />
                  </div>
                </div>
                <div>
                  <p className="max-w-prose text-base leading-relaxed text-white/85">
                    {project.blurb}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <li
                        key={tech}
                        className="border border-white/25 px-2 py-0.5 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-white/70"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* shared axis — same template as the rows so it tracks the bars */}
        <div className="mt-2 grid md:grid-cols-[1fr_1.15fr] md:gap-12">
          <div className="flex justify-between border-t border-white/40 pt-2 font-[family-name:var(--phr-mono)] text-[0.625rem] tracking-[0.1em] text-white/50">
            {AXIS_YEARS.map(year => (
              <span key={year}>{year === AXIS_END ? "now" : year}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How I work — cream, ruled */}
      <section className="bg-[#fdf8ef] px-6 py-14 md:px-12 md:py-20">
        <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
          {howIWork.label}
        </p>
        <div className="mt-8 grid md:grid-cols-2 md:gap-x-12">
          {howIWork.items.map(item => (
            <div key={item.title} className="border-t-2 border-neutral-900 py-6">
              <h3 className="font-[family-name:var(--phr-display)] text-xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-neutral-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-blue-900 px-6 py-14 text-white md:px-12 md:py-20">
        <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-blue-300">
          {contact.label}
        </p>
        <p className="mt-6 max-w-[20ch] font-[family-name:var(--phr-display)] text-[2rem] leading-tight tracking-tight md:text-5xl">
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
                className="flex items-center gap-2 border-b-2 border-amber-400 pb-1 text-base text-white hover:border-white"
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
