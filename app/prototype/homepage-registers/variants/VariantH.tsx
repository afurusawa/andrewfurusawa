"use client";

/**
 * PROTOTYPE Variant H — "Loaded Stage".
 *
 * Round 4, from the round-3 verdict on H:
 * - "Recent work" now reads as one chart. Three lanes on a single shared
 *   axis (J's move) instead of three bars spread down the page, with the
 *   lane colour tying each record back to its bar.
 * - The stage carries more: a ghost stage numeral, a pair of figures that
 *   change with the section, and a section index. The CSPO credential moves
 *   up into the identity cluster, where a credential belongs, instead of
 *   floating above the CTA.
 * - "Where I help" numerals sit in a fixed-width, vertically centred box on
 *   rows of equal minimum height, so 01 through 04 line up on both axes.
 *
 * Below `lg` the stage becomes a full coloured section card plus a sticky
 * five-segment progress bar, so mobile keeps the colour story.
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
  stageFigures,
  whatIDo,
  whereIHelp,
} from "../stubContent";
import { AXIS_END, AXIS_YEARS, METRICS, pct, span } from "../timeline";

const STAGES = [
  {
    id: "what",
    label: whatIDo.label,
    caption: whatIDo.statement,
    field: "bg-emerald-800",
    seg: "bg-emerald-800",
    ink: "text-emerald-800",
    ghost: "text-emerald-100",
  },
  {
    id: "where",
    label: whereIHelp.label,
    caption: "Four situations I get called into.",
    field: "bg-blue-800",
    seg: "bg-blue-800",
    ink: "text-blue-800",
    ghost: "text-blue-100",
  },
  {
    id: "work",
    label: recentWork.label,
    caption: recentWork.helper,
    field: "bg-neutral-900",
    seg: "bg-neutral-900",
    ink: "text-neutral-900",
    ghost: "text-neutral-200",
  },
  {
    id: "how",
    label: howIWork.label,
    caption: "The habits that make the dates hold.",
    field: "bg-amber-600",
    seg: "bg-amber-600",
    ink: "text-amber-700",
    ghost: "text-amber-100",
  },
  {
    id: "contact",
    label: contact.label,
    caption: contact.invitation,
    field: "bg-rose-800",
    seg: "bg-rose-800",
    ink: "text-rose-800",
    ghost: "text-rose-100",
  },
];

/** One colour per engagement lane, reused by the record below the chart. */
const LANE = ["bg-teal-600", "bg-indigo-500", "bg-amber-500"];

export default function VariantH() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = STAGES.map(stage => document.getElementById("h-" + stage.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = STAGES.findIndex(stage => "h-" + stage.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const stage = STAGES[active];
  const cred = credentials.items[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-[family-name:var(--phr-sans)] antialiased lg:grid lg:grid-cols-[42%_58%]">
      {/* Sticky progress — mobile only; carries the colour transition */}
      <div className="sticky top-0 z-40 flex h-1.5 lg:hidden" aria-hidden>
        {STAGES.map((s, i) => (
          <div
            key={s.id}
            className={
              "h-full flex-1 transition-opacity duration-500 " +
              s.seg +
              (i <= active ? " opacity-100" : " opacity-20")
            }
          />
        ))}
      </div>

      {/* Stage */}
      <aside
        className={
          // overflow-x-hidden clips the ghost numeral's bleed; overflow-y-auto
          // means a short laptop viewport scrolls the stage rather than losing
          // the CTA off the bottom (the stage needs ~720px to sit still).
          "relative hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-y-auto lg:overflow-x-hidden lg:px-12 lg:py-10 text-white transition-colors duration-500 " +
          stage.field
        }
      >
        {/* ghost stage numeral — weight in the field without more words */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 bottom-24 select-none font-[family-name:var(--phr-display)] text-[13rem] leading-none tracking-tight text-white/[0.07]"
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="relative">
          <div className="flex items-center gap-4">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white/40"
            />
            <div>
              <p className="font-[family-name:var(--phr-display)] text-xl tracking-tight">
                {identity.name}
              </p>
              <p className="mt-0.5 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.2em] text-white/70">
                {identity.line}
              </p>
            </div>
          </div>
          {/* credential sits with the identity, not floating above the CTA */}
          <div className="mt-4 flex items-center gap-2.5 border-t border-white/15 pt-4">
            <Image
              src={cred.badge}
              alt={cred.alt}
              width={600}
              height={600}
              className="h-8 w-8 shrink-0"
            />
            <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-white/70">
              {cred.short} · {cred.issuer} · {cred.year}
            </p>
          </div>
        </div>

        <div className="relative">
          <p className="font-[family-name:var(--phr-mono)] text-sm tracking-[0.2em] text-white/60">
            {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--phr-display)] text-[3.25rem] leading-[0.95] tracking-tight">
            {stage.label}
          </h2>
          <p className="mt-5 max-w-[26ch] font-[family-name:var(--phr-serif)] text-xl leading-snug text-white/85">
            {stage.caption}
          </p>
          <dl className="mt-7 flex gap-10 border-t border-white/20 pt-5">
            {stageFigures[stage.id].map(figure => (
              <div key={figure.label}>
                <dt className="font-[family-name:var(--phr-display)] text-3xl leading-none tracking-tight">
                  {figure.value}
                </dt>
                <dd className="mt-1.5 max-w-[16ch] font-[family-name:var(--phr-mono)] text-[0.5625rem] uppercase leading-relaxed tracking-[0.12em] text-white/60">
                  {figure.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <ol className="mb-7 space-y-1">
            {STAGES.map((s, i) => (
              <li key={s.id}>
                <a
                  href={"#h-" + s.id}
                  className={
                    "flex items-center gap-3 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] transition-opacity hover:opacity-100 " +
                    (i === active ? "opacity-100" : "opacity-45")
                  }
                >
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden
                    className={"h-px bg-white transition-all " + (i === active ? "w-8" : "w-3")}
                  />
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href={contact.primary.href}
            className="inline-block border-2 border-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] hover:bg-white hover:text-neutral-900"
          >
            Start a conversation
          </a>
          <ul className="mt-4 flex flex-wrap gap-5">
            {contact.links.slice(1).map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noreferrer" : undefined}
                  className="flex items-center gap-2 text-xs text-white/70 hover:text-white"
                >
                  <link.Icon aria-hidden className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main>
        {/* Mobile masthead — the stage's job, done once at the top */}
        <div className="flex items-center gap-4 border-b border-neutral-200 px-6 py-6 lg:hidden">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="font-[family-name:var(--phr-display)] text-2xl tracking-tight">
              {identity.name}
            </p>
            <p className="mt-0.5 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.18em] text-neutral-500">
              {identity.line}
            </p>
          </div>
        </div>

        <section id="h-what">
          <StageCard stage={STAGES[0]} index={0} />
          <div className="px-6 py-12 md:px-12 lg:py-20">
            <h1 className="max-w-[18ch] font-[family-name:var(--phr-display)] text-[2rem] leading-[1.05] tracking-tight md:text-5xl">
              {whatIDo.statement}
            </h1>
            <p className="mt-7 max-w-prose font-[family-name:var(--phr-serif)] text-xl leading-relaxed text-neutral-700">
              {identity.lede}
            </p>
            <div className="mt-10 grid gap-6 border-t border-neutral-900 pt-7 md:grid-cols-2">
              {whatIDo.body.map(p => (
                <p key={p.slice(0, 24)} className="text-[0.9375rem] leading-relaxed text-neutral-600">
                  {p}
                </p>
              ))}
            </div>
            {/* outcome numerals — F's other good idea, kept small */}
            <dl className="mt-10 grid grid-cols-3 gap-px bg-neutral-200">
              {recentWork.projects.map(project => (
                <div key={project.slug} className="bg-white pr-4 pt-4">
                  <dt className="font-[family-name:var(--phr-display)] text-4xl leading-none tracking-tight text-emerald-800">
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

        <section id="h-where">
          <StageCard stage={STAGES[1]} index={1} />
          <ul className="px-6 py-12 md:px-12 lg:py-20">
            {whereIHelp.items.map((item, i) => (
              <li
                key={item.title}
                className="relative flex min-h-[8.5rem] items-center overflow-hidden border-t border-neutral-200 first:border-t-0"
              >
                {/* fixed-width, right-aligned, vertically centred: 01–04 line up */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 w-[2.1em] -translate-y-1/2 select-none text-right font-[family-name:var(--phr-display)] text-8xl leading-none tabular-nums text-blue-100"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative max-w-prose py-6 pr-24">
                  <h3 className="font-[family-name:var(--phr-display)] text-2xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="h-work">
          <StageCard stage={STAGES[2]} index={2} />
          <div className="bg-neutral-50 px-6 py-12 md:px-12 lg:py-20">
            <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
              {recentWork.helper}
            </p>

            {/* One chart: three lanes, one axis, read in a glance */}
            <div className="mt-7 space-y-2">
              {recentWork.projects.map((project, i) => {
                const [start, end] = span(project.period);
                return (
                  <div key={project.slug} className="flex items-center gap-4">
                    <span className="w-28 shrink-0 truncate font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.1em] text-neutral-600 md:w-40">
                      {project.title}
                    </span>
                    <div className="relative h-4 flex-1 bg-neutral-200">
                      <div
                        className={"absolute top-0 h-4 " + LANE[i % LANE.length]}
                        style={{ left: pct(start) + "%", width: pct(end) - pct(start) + "%" }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4">
                <span className="w-28 shrink-0 md:w-40" aria-hidden />
                <div className="flex flex-1 justify-between border-t border-neutral-900 pt-2 font-[family-name:var(--phr-mono)] text-[0.625rem] tracking-[0.1em] text-neutral-500">
                  {AXIS_YEARS.map(year => (
                    <span key={year}>{year === AXIS_END ? "now" : year}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* The record — each row keyed back to its lane by colour */}
            <div className="mt-12">
              {recentWork.projects.map((project, i) => (
                <article
                  key={project.slug}
                  className="border-t border-neutral-300 py-6 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      aria-hidden
                      className={"h-3 w-3 shrink-0 self-center " + LANE[i % LANE.length]}
                    />
                    <h3 className="font-[family-name:var(--phr-display)] text-xl tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-neutral-500">
                      {project.period} · {project.role}
                    </p>
                  </div>
                  <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-neutral-700">
                    {project.blurb}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
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

        <section id="h-how">
          <StageCard stage={STAGES[3]} index={3} />
          <div className="grid px-6 py-12 md:grid-cols-2 md:gap-x-10 md:px-12 lg:py-20">
            {howIWork.items.map(item => (
              <div key={item.title} className="border-t-2 border-amber-500 py-6">
                <h3 className="font-[family-name:var(--phr-display)] text-lg tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="h-contact">
          <StageCard stage={STAGES[4]} index={4} />
          <div className="px-6 py-12 md:px-12 lg:py-20">
            <p className="max-w-[18ch] font-[family-name:var(--phr-display)] text-3xl leading-tight tracking-tight md:text-4xl">
              {contact.invitation}
            </p>
            <ul className="mt-8 space-y-3">
              {contact.links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noreferrer" : undefined}
                    className="flex items-center gap-3 text-base text-neutral-700 hover:text-rose-800"
                  >
                    <link.Icon aria-hidden className="h-4 w-4" />
                    {link.label}
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

/** The stage as a full coloured card — narrow viewports only. */
function StageCard({ stage, index }: { stage: (typeof STAGES)[number]; index: number }) {
  return (
    <div className={"px-6 py-8 text-white lg:hidden " + stage.field}>
      <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] tracking-[0.2em] text-white/60">
        {String(index + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
      </p>
      <h2 className="mt-3 font-[family-name:var(--phr-display)] text-4xl leading-[0.95] tracking-tight">
        {stage.label}
      </h2>
      <p className="mt-4 max-w-[28ch] font-[family-name:var(--phr-serif)] text-lg leading-snug text-white/85">
        {stage.caption}
      </p>
      <dl className="mt-6 flex gap-8 border-t border-white/25 pt-4">
        {stageFigures[stage.id].map(figure => (
          <div key={figure.label}>
            <dt className="font-[family-name:var(--phr-display)] text-2xl leading-none tracking-tight">
              {figure.value}
            </dt>
            <dd className="mt-1.5 max-w-[16ch] font-[family-name:var(--phr-mono)] text-[0.5625rem] uppercase leading-relaxed tracking-[0.12em] text-white/60">
              {figure.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
