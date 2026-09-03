"use client";

/**
 * PROTOTYPE Variant H — "Loaded Stage", retokened for the dark-scheme
 * palette round. Structure is the register as of 4e8a1ed. Colour comes from
 * the palette prop. The opacity ladder is gone; type carries hierarchy.
 * Mono strings sit on the 11px floor from #75.
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Palette, StageTokens } from "../palettes";
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

const STAGE_COPY = [
  { id: "what", label: whatIDo.label, caption: whatIDo.statement },
  { id: "where", label: whereIHelp.label, caption: "Four situations I get called into." },
  { id: "work", label: recentWork.label, caption: recentWork.helper },
  { id: "how", label: howIWork.label, caption: "The habits that make the dates hold." },
  { id: "contact", label: contact.label, caption: contact.invitation },
];

export default function VariantH({ palette }: { palette: Palette }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = STAGE_COPY.map(stage => document.getElementById("h-" + stage.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = STAGE_COPY.findIndex(stage => "h-" + stage.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const stage = palette.stages[active];
  const copy = STAGE_COPY[active];
  const cred = credentials.items[0];

  return (
    <div
      className={
        "min-h-screen font-[family-name:var(--phr-sans)] antialiased lg:grid lg:grid-cols-[42%_58%] " +
        palette.paper +
        " " +
        palette.heading
      }
    >
      <div className="sticky top-0 z-40 flex h-1.5 lg:hidden" aria-hidden>
        {palette.stages.map((s, i) => (
          <div
            key={STAGE_COPY[i].id}
            className={
              "h-full flex-1 transition-opacity duration-500 " +
              s.field +
              (i <= active ? " opacity-100" : " opacity-20")
            }
          />
        ))}
      </div>

      <aside
        className={
          "relative hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-y-auto lg:overflow-x-hidden lg:px-12 lg:py-10 transition-colors duration-500 " +
          palette.panelInk +
          " " +
          stage.field
        }
      >
        <span
          aria-hidden
          className={
            "pointer-events-none absolute -right-6 bottom-24 select-none font-[family-name:var(--phr-display)] text-[13rem] leading-none tracking-tight " +
            palette.panelGhost
          }
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
              className={"h-14 w-14 rounded-full object-cover ring-2 " + palette.panelRing}
            />
            <div>
              <p className="font-[family-name:var(--phr-display)] text-xl tracking-tight">
                {identity.name}
              </p>
              <p className="mt-0.5 font-[family-name:var(--phr-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
                {identity.line}
              </p>
            </div>
          </div>
          <div className={"mt-4 flex items-center gap-2.5 border-t pt-4 " + palette.panelBorder}>
            <Image
              src={cred.badge}
              alt={cred.alt}
              width={600}
              height={600}
              className="h-8 w-8 shrink-0"
            />
            <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em]">
              {cred.short} · {cred.issuer} · {cred.year}
            </p>
          </div>
        </div>

        <div className="relative">
          <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] tracking-[0.2em]">
            {String(active + 1).padStart(2, "0")} / {String(STAGE_COPY.length).padStart(2, "0")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--phr-display)] text-[3.25rem] leading-[0.95] tracking-tight">
            {copy.label}
          </h2>
          <p className="mt-5 max-w-[26ch] font-[family-name:var(--phr-serif)] text-xl leading-snug">
            {copy.caption}
          </p>
          <dl className={"mt-7 flex gap-10 border-t pt-5 " + palette.panelBorder}>
            {stageFigures[copy.id].map(figure => (
              <div key={figure.label}>
                <dt className="font-[family-name:var(--phr-display)] text-3xl leading-none tracking-tight">
                  {figure.value}
                </dt>
                <dd className="mt-1.5 max-w-[16ch] font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em]">
                  {figure.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <ol className="mb-7 space-y-1">
            {STAGE_COPY.map((s, i) => (
              <li key={s.id}>
                <a
                  href={"#h-" + s.id}
                  className={
                    "flex items-center gap-3 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] " +
                    (i === active ? "font-medium" : "font-normal")
                  }
                >
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden
                    className={
                      "h-px transition-all " +
                      palette.panelRule +
                      (i === active ? " w-8" : " w-3")
                    }
                  />
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href={contact.primary.href}
            className={
              "inline-block border-2 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] " +
              palette.cta +
              " " +
              stage.ctaHover
            }
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
                  className="flex items-center gap-2 text-xs underline-offset-2 hover:underline"
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
        <div className={"flex items-center gap-4 border-b px-6 py-6 lg:hidden " + palette.hairline}>
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
            <p
              className={
                "mt-0.5 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.18em] " +
                palette.muted
              }
            >
              {identity.line}
            </p>
          </div>
        </div>

        <section id="h-what">
          <StageCard palette={palette} tokens={palette.stages[0]} copy={STAGE_COPY[0]} index={0} />
          <div className="px-6 py-12 md:px-12 lg:py-20">
            <h1 className="max-w-[18ch] font-[family-name:var(--phr-display)] text-[2rem] leading-[1.05] tracking-tight md:text-5xl">
              {whatIDo.statement}
            </h1>
            <p
              className={
                "mt-7 max-w-prose font-[family-name:var(--phr-serif)] text-xl leading-relaxed " +
                palette.body
              }
            >
              {identity.lede}
            </p>
            <div className={"mt-10 grid gap-6 border-t pt-7 md:grid-cols-2 " + palette.strongHairline}>
              {whatIDo.body.map(p => (
                <p
                  key={p.slice(0, 24)}
                  className={"text-[0.9375rem] leading-relaxed " + palette.body}
                >
                  {p}
                </p>
              ))}
            </div>
            <dl className={"mt-10 grid grid-cols-3 gap-px " + palette.metricGrid}>
              {recentWork.projects.map(project => (
                <div key={project.slug} className={"pr-4 pt-4 " + palette.metricCell}>
                  <dt
                    className={
                      "font-[family-name:var(--phr-display)] text-4xl leading-none tracking-tight " +
                      palette.stages[0].ink
                    }
                  >
                    {METRICS[project.slug].value}
                  </dt>
                  <dd
                    className={
                      "mt-2 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] " +
                      palette.muted
                    }
                  >
                    {METRICS[project.slug].caption}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="h-where">
          <StageCard palette={palette} tokens={palette.stages[1]} copy={STAGE_COPY[1]} index={1} />
          <ul className="px-6 py-12 md:px-12 lg:py-20">
            {whereIHelp.items.map((item, i) => (
              <li
                key={item.title}
                className={
                  "relative flex min-h-[8.5rem] items-center overflow-hidden border-t first:border-t-0 " +
                  palette.hairline
                }
              >
                <span
                  aria-hidden
                  className={
                    "pointer-events-none absolute right-0 top-1/2 w-[2.1em] -translate-y-1/2 select-none text-right font-[family-name:var(--phr-display)] text-8xl leading-none tabular-nums " +
                    palette.stages[1].recordGhost
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative max-w-prose py-6 pr-24">
                  <h3 className="font-[family-name:var(--phr-display)] text-2xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className={"mt-2 text-[0.9375rem] leading-relaxed " + palette.body}>
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="h-work">
          <StageCard palette={palette} tokens={palette.stages[2]} copy={STAGE_COPY[2]} index={2} />
          <div className={"px-6 py-12 md:px-12 lg:py-20 " + palette.band}>
            <p
              className={
                "font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.24em] " +
                palette.muted
              }
            >
              {recentWork.helper}
            </p>

            <div className="mt-7 space-y-2">
              {recentWork.projects.map((project, i) => {
                const [start, end] = span(project.period);
                return (
                  <div key={project.slug} className="flex items-center gap-4">
                    <span
                      className={
                        "w-28 shrink-0 truncate font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.1em] md:w-40 " +
                        palette.body
                      }
                    >
                      {project.title}
                    </span>
                    <div className={"relative h-4 flex-1 " + palette.track}>
                      <div
                        className={"absolute top-0 h-4 " + palette.lanes[i % palette.lanes.length]}
                        style={{ left: pct(start) + "%", width: pct(end) - pct(start) + "%" }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4">
                <span className="w-28 shrink-0 md:w-40" aria-hidden />
                <div
                  className={
                    "flex flex-1 justify-between border-t pt-2 font-[family-name:var(--phr-mono)] text-[0.6875rem] tracking-[0.1em] " +
                    palette.axis +
                    " " +
                    palette.muted
                  }
                >
                  {AXIS_YEARS.map(year => (
                    <span key={year}>{year === AXIS_END ? "now" : year}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              {recentWork.projects.map((project, i) => (
                <article
                  key={project.slug}
                  className={"border-t py-6 first:border-t-0 first:pt-0 " + palette.hairline}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      aria-hidden
                      className={
                        "h-3 w-3 shrink-0 self-center " + palette.lanes[i % palette.lanes.length]
                      }
                    />
                    <h3 className="font-[family-name:var(--phr-display)] text-xl tracking-tight">
                      {project.title}
                    </h3>
                    <p
                      className={
                        "font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] " +
                        palette.muted
                      }
                    >
                      {project.period} · {project.role}
                    </p>
                  </div>
                  <p className={"mt-3 max-w-prose text-[0.9375rem] leading-relaxed " + palette.body}>
                    {project.blurb}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <li
                        key={tech}
                        className={
                          "border px-2 py-0.5 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.1em] " +
                          palette.chip
                        }
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
          <StageCard palette={palette} tokens={palette.stages[3]} copy={STAGE_COPY[3]} index={3} />
          <div className="grid px-6 py-12 md:grid-cols-2 md:gap-x-10 md:px-12 lg:py-20">
            {howIWork.items.map(item => (
              <div key={item.title} className={"border-t-2 py-6 " + palette.stages[3].accent}>
                <h3 className="font-[family-name:var(--phr-display)] text-lg tracking-tight">
                  {item.title}
                </h3>
                <p className={"mt-2 text-[0.9375rem] leading-relaxed " + palette.body}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="h-contact">
          <StageCard palette={palette} tokens={palette.stages[4]} copy={STAGE_COPY[4]} index={4} />
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
                    className={
                      "flex items-center gap-3 text-base " +
                      palette.body +
                      " " +
                      palette.stages[4].linkHover
                    }
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

function StageCard({
  palette,
  tokens,
  copy,
  index,
}: {
  palette: Palette;
  tokens: StageTokens;
  copy: (typeof STAGE_COPY)[number];
  index: number;
}) {
  return (
    <div className={"px-6 py-8 lg:hidden " + palette.panelInk + " " + tokens.field}>
      <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] tracking-[0.2em]">
        {String(index + 1).padStart(2, "0")} / {String(STAGE_COPY.length).padStart(2, "0")}
      </p>
      <h2 className="mt-3 font-[family-name:var(--phr-display)] text-4xl leading-[0.95] tracking-tight">
        {copy.label}
      </h2>
      <p className="mt-4 max-w-[28ch] font-[family-name:var(--phr-serif)] text-lg leading-snug">
        {copy.caption}
      </p>
      <dl className={"mt-6 flex gap-8 border-t pt-4 " + palette.panelBorder}>
        {stageFigures[copy.id].map(figure => (
          <div key={figure.label}>
            <dt className="font-[family-name:var(--phr-display)] text-2xl leading-none tracking-tight">
              {figure.value}
            </dt>
            <dd className="mt-1.5 max-w-[16ch] font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em]">
              {figure.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
