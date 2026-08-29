"use client";

/**
 * PROTOTYPE Variant F — "Data Portrait".
 *
 * Round 2, from the feedback that C is "all text". The visual interest here
 * comes from information design rather than decoration: an engagement
 * timeline drawn from the real project periods, outcome numerals pulled out
 * of the blurbs, a coloured 2x2 matrix for the offer, and a method checklist.
 * Dense, factual, nothing floating in whitespace — a page you read the way
 * you read a dashboard.
 */
import {
  contact,
  howIWork,
  identity,
  recentWork,
  whatIDo,
  whereIHelp,
} from "../stubContent";

/** PROTOTYPE-only: outcome numerals, hand-pulled from the stub blurbs. */
const METRICS: Record<string, { value: string; caption: string }> = {
  milktracker: { value: "10", caption: "hospitals live on one codebase" },
  "blossom-groconnect": { value: "70%", caption: "faster load for 20k+ users" },
  "ai-education-platform": { value: "1", caption: "platform, ground up" },
};

const AXIS_START = 2017;
const AXIS_END = 2026;

/** "2020–2024" / "2025–present" -> [start, end] on the axis. */
function span(period: string): [number, number] {
  const match = period.match(/(\d{4})\D+(\d{4}|present)/i);
  if (!match) return [AXIS_START, AXIS_END];
  const start = Number(match[1]);
  const end = match[2].toLowerCase() === "present" ? AXIS_END : Number(match[2]);
  return [start, end];
}

function pct(year: number) {
  return ((year - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
}

const MATRIX_TINT = [
  "bg-amber-100 border-amber-300",
  "bg-sky-100 border-sky-300",
  "bg-emerald-100 border-emerald-300",
  "bg-violet-100 border-violet-300",
];

export default function VariantF() {
  const years = [2017, 2019, 2021, 2023, 2026];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-[family-name:var(--phr-sans)] antialiased">
      {/* Thin instrument header */}
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-900 bg-white px-5 py-3 md:px-10">
        <div className="flex items-baseline gap-4">
          <span className="text-sm font-semibold tracking-tight">{identity.name}</span>
          <span className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.18em] text-neutral-500">
            {identity.line}
          </span>
        </div>
        <a
          href={contact.primary.href}
          className="bg-neutral-900 px-3 py-1.5 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-white hover:bg-amber-500 hover:text-neutral-900"
        >
          Start a conversation
        </a>
      </header>

      {/* Statement + outcome numerals side by side */}
      <section className="grid border-b border-neutral-900 md:grid-cols-[1.2fr_1fr]">
        <div className="px-5 py-10 md:border-r md:border-neutral-900 md:px-10 md:py-14">
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
            {whatIDo.label}
          </p>
          <h1 className="mt-5 max-w-[22ch] text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.75rem]">
            {whatIDo.statement}
          </h1>
          <p className="mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-neutral-600">
            {identity.lede}
          </p>
        </div>
        <dl className="grid grid-cols-3 md:grid-cols-1">
          {recentWork.projects.map(project => {
            const metric = METRICS[project.slug];
            return (
              <div
                key={project.slug}
                className="border-t border-neutral-900 px-5 py-6 first:border-t-0 md:px-10 md:first:border-t-0"
              >
                <dt className="font-[family-name:var(--phr-display)] text-4xl leading-none tracking-tight md:text-5xl">
                  {metric.value}
                </dt>
                <dd className="mt-2 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-neutral-500">
                  {metric.caption}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      {/* Offer as a tinted matrix */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
          {whereIHelp.label}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {whereIHelp.items.map((item, i) => (
            <div key={item.title} className={"border p-6 " + MATRIX_TINT[i % MATRIX_TINT.length]}>
              <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.18em] text-neutral-500">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-700">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement timeline, drawn from the real periods */}
      <section className="border-y border-neutral-900 bg-neutral-50 px-5 py-12 md:px-10 md:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
            {recentWork.label}
          </p>
          <p className="text-sm text-neutral-500">{recentWork.helper}</p>
        </div>

        <div className="mt-8">
          {recentWork.projects.map(project => {
            const [start, end] = span(project.period);
            return (
              <article
                key={project.slug}
                className="grid gap-4 border-t border-neutral-300 py-6 md:grid-cols-[1fr_1.1fr] md:gap-10"
              >
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                  <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-neutral-500">
                    {project.period} · {project.role}
                  </p>
                  {/* bar */}
                  <div className="relative mt-4 h-3 bg-neutral-200">
                    <div
                      className="absolute top-0 h-3 bg-neutral-900"
                      style={{ left: pct(start) + "%", width: pct(end) - pct(start) + "%" }}
                    />
                  </div>
                </div>
                <div>
                  <p className="max-w-prose text-[0.9375rem] leading-relaxed text-neutral-700">
                    {project.blurb}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <li
                        key={tech}
                        className="bg-neutral-900 px-2 py-0.5 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-white"
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

        {/* shared axis — same grid template as the rows, so it lines up with the bars */}
        <div className="mt-2 grid md:grid-cols-[1fr_1.1fr] md:gap-10">
          <div className="flex justify-between border-t border-neutral-900 pt-2 font-[family-name:var(--phr-mono)] text-[0.625rem] tracking-[0.1em] text-neutral-500">
            {years.map(year => (
              <span key={year}>{year === AXIS_END ? "now" : year}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Method as a checklist */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-500">
          {howIWork.label}
        </p>
        <ul className="mt-6 grid gap-px bg-neutral-200 md:grid-cols-2">
          {howIWork.items.map(item => (
            <li key={item.title} className="flex gap-4 bg-white p-6">
              <span aria-hidden className="mt-0.5 text-lg text-amber-500">
                ▍
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Close */}
      <section className="flex flex-wrap items-center justify-between gap-6 border-t border-neutral-900 bg-neutral-900 px-5 py-12 text-white md:px-10">
        <div>
          <p className="font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.24em] text-neutral-400">
            {contact.label}
          </p>
          <p className="mt-3 max-w-[24ch] text-2xl leading-snug tracking-tight md:text-3xl">
            {contact.invitation}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-5">
          {contact.links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-label={link.ariaLabel}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noreferrer" : undefined}
                className="flex items-center gap-2 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.12em] text-neutral-300 hover:text-amber-400"
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
