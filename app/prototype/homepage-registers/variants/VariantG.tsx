"use client";

/**
 * PROTOTYPE Variant G — "Split Stage".
 *
 * Round 2, answering D's "wasted space": the poster energy moves into a
 * fixed left stage that repaints as you scroll — colour field, section
 * numeral and oversized title — while the right half stays a dense scrolling
 * record. Both halves are always full, so nothing is empty, but the page
 * still changes character section by section. Below `lg` the stage collapses
 * into a coloured header strip per section.
 */
import { useEffect, useState } from "react";
import {
  contact,
  howIWork,
  identity,
  recentWork,
  whatIDo,
  whereIHelp,
} from "../stubContent";

const STAGES = [
  { id: "what", label: whatIDo.label, caption: whatIDo.statement, field: "bg-emerald-700" },
  {
    id: "where",
    label: whereIHelp.label,
    caption: "Four situations I get called into.",
    field: "bg-blue-800",
  },
  { id: "work", label: recentWork.label, caption: recentWork.helper, field: "bg-neutral-900" },
  {
    id: "how",
    label: howIWork.label,
    caption: "The habits that make the dates hold.",
    field: "bg-amber-600",
  },
  { id: "contact", label: contact.label, caption: contact.invitation, field: "bg-rose-700" },
];

export default function VariantG() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = STAGES.map(stage => document.getElementById("g-" + stage.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = STAGES.findIndex(stage => "g-" + stage.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const stage = STAGES[active];

  return (
    <div
      className="min-h-screen bg-white text-neutral-900 font-[family-name:var(--phr-sans)] antialiased lg:grid lg:grid-cols-[45%_55%]"
    >
      {/* Stage — repaints with the section in view */}
      <aside
        className={
          "hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:px-12 lg:py-12 text-white transition-colors duration-500 " +
          stage.field
        }
      >
        <div>
          <p className="font-[family-name:var(--phr-display)] text-xl tracking-tight">
            {identity.name}
          </p>
          <p className="mt-1 font-[family-name:var(--phr-mono)] text-[0.625rem] uppercase tracking-[0.2em] text-white/70">
            {identity.line}
          </p>
        </div>

        <div>
          <p className="font-[family-name:var(--phr-mono)] text-sm tracking-[0.2em] text-white/60">
            {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
          </p>
          <h2 className="mt-4 font-[family-name:var(--phr-display)] text-6xl leading-[0.95] tracking-tight">
            {stage.label}
          </h2>
          <p className="mt-6 max-w-[26ch] text-lg leading-snug text-white/85">{stage.caption}</p>
        </div>

        <div>
          <a
            href={contact.primary.href}
            className="inline-block border-2 border-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] hover:bg-white hover:text-neutral-900"
          >
            Start a conversation
          </a>
          <ul className="mt-5 flex flex-wrap gap-5">
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

      {/* Record */}
      <main>
        <section id="g-what">
          <SectionHead stage={STAGES[0]} index={0} />
          <div className="px-6 py-12 md:px-12 lg:py-20">
            <h1 className="max-w-[20ch] text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
              {whatIDo.statement}
            </h1>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-neutral-600">
              {identity.lede}
            </p>
            <div className="mt-8 space-y-5 border-t border-neutral-200 pt-6">
              {whatIDo.body.map(p => (
                <p key={p.slice(0, 24)} className="max-w-prose text-[0.9375rem] leading-relaxed text-neutral-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="g-where">
          <SectionHead stage={STAGES[1]} index={1} />
          <ul className="px-6 py-12 md:px-12 lg:py-20">
            {whereIHelp.items.map((item, i) => (
              <li key={item.title} className="grid gap-2 border-t border-neutral-200 py-6 first:border-t-0 first:pt-0 md:grid-cols-[2rem_1fr] md:gap-6">
                <span className="font-[family-name:var(--phr-mono)] text-xs text-blue-800">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="g-work">
          <SectionHead stage={STAGES[2]} index={2} />
          <div className="px-6 py-12 md:px-12 lg:py-20">
            {recentWork.projects.map(project => (
              <article
                key={project.slug}
                className="border-t border-neutral-200 py-7 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                  <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-neutral-500">
                    {project.period}
                  </p>
                </div>
                <p className="mt-1 text-xs text-neutral-500">{project.role}</p>
                <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-neutral-700">
                  {project.blurb}
                </p>
                <p className="mt-3 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.12em] text-neutral-400">
                  {project.stack.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="g-how">
          <SectionHead stage={STAGES[3]} index={3} />
          <div className="px-6 py-12 md:px-12 lg:py-20">
            {howIWork.items.map(item => (
              <div key={item.title} className="border-t border-neutral-200 py-6 first:border-t-0 first:pt-0">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="g-contact">
          <SectionHead stage={STAGES[4]} index={4} />
          <div className="px-6 py-12 md:px-12 lg:py-20">
            <p className="max-w-[20ch] font-[family-name:var(--phr-display)] text-3xl leading-tight tracking-tight md:text-4xl">
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
                    className="flex items-center gap-3 text-base text-neutral-700 hover:text-rose-700"
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

/** The stage, collapsed into a coloured strip for narrow viewports. */
function SectionHead({
  stage,
  index,
}: {
  stage: (typeof STAGES)[number];
  index: number;
}) {
  return (
    <div className={"flex items-baseline gap-3 px-6 py-4 text-white lg:hidden " + stage.field}>
      <span className="font-[family-name:var(--phr-mono)] text-xs text-white/70">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2 className="font-[family-name:var(--phr-display)] text-2xl tracking-tight">
        {stage.label}
      </h2>
    </div>
  );
}
