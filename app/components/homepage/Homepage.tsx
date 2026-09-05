import Image from "next/image";
import {
  featuredWork,
  formatProjectPeriod,
  formatProjectRole,
} from "../../config/featuredWork";
import {
  contactLeadIn,
  cspoBadge,
  homepageSections,
  howIWork,
  identity,
  portrait,
  recentWorkLeadIn,
  whatIDo,
  whereIHelp,
  type HomepageSection,
} from "../../config/homepage";
import { contactLinks } from "../../config/profileLinks";
import { skills } from "../../config/skills";
import {
  AXIS_END,
  AXIS_YEARS,
  axisPercent,
  projectSpan,
} from "../../lib/workTimeline";
import { ColourPanelObserver } from "./ColourPanelObserver";

const skillNameBySlug = new Map(skills.map((skill) => [skill.slug, skill.name]));

const LANE = ["bg-lane-1", "bg-lane-2", "bg-lane-3"] as const;

const FIELD = {
  what: "bg-field-what",
  where: "bg-field-where",
  work: "bg-field-work",
  how: "bg-field-how",
  contact: "bg-field-contact",
} as const;

function pad(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function Homepage() {
  return (
    <ColourPanelObserver>
      <div className="homepage-grid min-h-screen lg:grid lg:grid-cols-[42%_58%]">
        <ProgressBar />
        <ColourPanel />
        <main id="record">
          <WhatIDo />
          <WhereIHelp />
          <RecentWork />
          <HowIWork />
          <Contact />
        </main>
      </div>
    </ColourPanelObserver>
  );
}

function ProgressBar() {
  return (
    <div
      className="progress-bar sticky top-0 z-40 flex h-1.5 lg:hidden"
      aria-hidden="true"
    >
      {homepageSections.map((section) => (
        <div
          key={section.id}
          className={`progress-seg h-full flex-1 ${FIELD[section.id]}`}
        />
      ))}
    </div>
  );
}

function ColourPanel() {
  return (
    <aside
      className="colour-panel relative hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-x-hidden lg:overflow-y-auto lg:px-12 lg:py-10"
      aria-hidden="true"
    >
      <span className="colour-panel__ghost pointer-events-none absolute -right-6 bottom-24 select-none font-display text-[13rem] leading-none tracking-tight text-white/[0.07]" />

      <div className="colour-panel__identity relative">
        <div className="min-h-0 overflow-hidden">
          <div className="flex items-center gap-4">
            <Image
              src={portrait.src}
              alt=""
              width={portrait.width}
              height={portrait.height}
              sizes="56px"
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white/40"
            />
            <div>
              <p className="font-display text-xl tracking-tight">{identity.name}</p>
              <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em]">
                {identity.line}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2.5 border-t border-white/15 pt-4">
            <Image
              src={cspoBadge.src}
              alt=""
              width={cspoBadge.width}
              height={cspoBadge.height}
              sizes="32px"
              className="h-8 w-8 shrink-0"
            />
            <p className="font-mono text-xs uppercase tracking-[0.14em]">
              {identity.credential}
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        {homepageSections.map((section, index) => (
          <div key={section.id} className="panel-copy" data-id={section.id}>
            <ColourPanelCopy section={section} index={index} />
          </div>
        ))}
      </div>

      <ol className="section-index relative space-y-1">
        {homepageSections.map((section, index) => (
          <li key={section.id} className="flex items-center gap-3" data-id={section.id}>
            <span className="font-mono text-xs uppercase tracking-[0.14em] tabular-nums">
              {pad(index)}
            </span>
            <span className="section-index__rule h-px bg-white" />
            <span className="font-mono text-xs uppercase tracking-[0.14em]">
              {section.label}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function ColourCard({
  section,
  index,
}: {
  section: HomepageSection;
  index: number;
}) {
  return (
    <div
      className={`colour-card px-6 py-8 text-panel-ink lg:hidden ${FIELD[section.id]}`}
      aria-hidden="true"
    >
      <ColourPanelCopy section={section} index={index} />
    </div>
  );
}

function ColourPanelCopy({
  section,
  index,
}: {
  section: HomepageSection;
  index: number;
}) {
  return (
    <>
      <p className="font-mono text-[0.6875rem] tracking-[0.2em]">
        {pad(index)} / {pad(homepageSections.length - 1)}
      </p>
      <p className="mt-3 font-display text-4xl leading-[0.95] tracking-tight lg:text-[3.25rem]">
        {section.label}
      </p>
      <p className="mt-4 max-w-[26ch] font-serif text-lg leading-snug lg:mt-5 lg:text-xl">
        {section.caption}
      </p>
      {section.figures.length > 0 ? (
        <dl className="mt-6 flex gap-8 border-t border-white/15 pt-4 lg:mt-7 lg:gap-10 lg:pt-5">
          {section.figures.map((figure) => (
            <div key={figure.label}>
              <dt className="font-display text-2xl leading-none tracking-tight lg:text-3xl">
                {figure.value}
              </dt>
              <dd className="mt-1.5 max-w-[16ch] font-mono text-xs uppercase leading-relaxed tracking-[0.12em]">
                {figure.label}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </>
  );
}

function WhatIDo() {
  const section = homepageSections[0];

  return (
    <section id={section.id} aria-labelledby="what-heading">
      <ColourCard section={section} index={0} />
      <div className="px-6 py-12 md:px-12 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start" data-homepage-identity>
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 640px) 128px, 112px"
            className="h-28 w-28 shrink-0 rounded-full object-cover sm:h-32 sm:w-32"
          />
          <div>
            <h1 className="font-display text-[2rem] leading-[1.05] tracking-tight md:text-5xl">
              {identity.name}
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-label">
              {identity.line}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-label">
              {identity.location}
            </p>
          </div>
        </div>
        <p className="lede mt-7 max-w-prose text-xl leading-relaxed text-body">
          {identity.lede}
        </p>
        <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-body">
          {identity.credentialLine}
        </p>
        <div className="mt-5 flex items-center gap-2.5">
          <Image
            src={cspoBadge.src}
            alt={cspoBadge.alt}
            width={cspoBadge.width}
            height={cspoBadge.height}
            sizes="32px"
            className="h-8 w-8 shrink-0"
          />
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-label">
            {identity.credential}
          </p>
        </div>
        <h2
          id="what-heading"
          className="mt-12 border-t border-strong-hairline pt-7 font-display text-2xl tracking-tight"
        >
          {section.label}
        </h2>
        <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-body">
          {whatIDo}
        </p>
      </div>
    </section>
  );
}

function WhereIHelp() {
  const section = homepageSections[1];

  return (
    <section id={section.id} aria-labelledby="where-heading">
      <ColourCard section={section} index={1} />
      <div className="px-6 py-12 md:px-12 lg:py-20">
        <h2 id="where-heading" className="sr-only">
          {section.label}
        </h2>
        <blockquote className="max-w-[22ch] font-display text-3xl leading-tight tracking-tight md:text-4xl">
          {whereIHelp.quote}
        </blockquote>
        <ul className="mt-10">
          {whereIHelp.items.map((item, index) => (
            <li
              key={item.title}
              className="relative flex min-h-[8.5rem] items-center overflow-hidden border-t border-hairline first:border-t-0"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/2 w-[2.1em] -translate-y-1/2 select-none text-right font-display text-8xl leading-none tabular-nums text-ghost-where"
              >
                {pad(index)}
              </span>
              <div className="relative max-w-prose py-6 pr-24">
                <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RecentWork() {
  const section = homepageSections[2];

  return (
    <section id={section.id} aria-labelledby="work-heading">
      <ColourCard section={section} index={2} />
      <div className="bg-band px-6 py-12 md:px-12 lg:py-20">
        <h2 id="work-heading" className="sr-only">
          {section.label}
        </h2>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-label">
          {recentWorkLeadIn}
        </p>

        <div className="mt-7 space-y-2">
          {featuredWork.map((project, index) => {
            const [start, end] = projectSpan(project);
            return (
              <div key={project.slug} className="flex items-center gap-4">
                <span className="w-28 shrink-0 truncate font-mono text-xs uppercase tracking-[0.1em] text-body md:w-40">
                  {project.title}
                  <span className="sr-only"> {formatProjectPeriod(project)}</span>
                </span>
                <div className="relative h-4 flex-1 bg-track">
                  <div
                    className={`absolute top-0 h-4 ${LANE[index % LANE.length]}`}
                    style={{
                      left: `${axisPercent(start)}%`,
                      width: `${axisPercent(end) - axisPercent(start)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex gap-4">
            <span className="w-28 shrink-0 md:w-40" aria-hidden="true" />
            <div className="flex flex-1 justify-between border-t border-axis pt-2 font-mono text-[0.6875rem] tracking-[0.1em] text-label">
              {AXIS_YEARS.map((year) => (
                <span key={year}>{year === AXIS_END ? "now" : year}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          {featuredWork.map((project, index) => (
            <article
              key={project.slug}
              className="border-t border-hairline py-6 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  aria-hidden="true"
                  className={`h-3 w-3 shrink-0 self-center ${LANE[index % LANE.length]}`}
                />
                <h3 className="font-display text-xl tracking-tight">
                  {project.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-work">
                  {project.domain}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-label">
                  {formatProjectPeriod(project)}
                </p>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-label">
                {formatProjectRole(project, " · ")}
              </p>
              <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-body">
                {project.blurb}
              </p>
              {project.outcomes.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome.result} className="flex gap-4">
                      {outcome.figure ? (
                        <span className="w-24 shrink-0 font-display text-2xl leading-none tracking-tight text-ink-work">
                          {outcome.figure}
                        </span>
                      ) : (
                        <span className="w-24 shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-[0.9375rem] leading-relaxed text-body">
                        {outcome.result}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul
                className="mt-4 flex flex-wrap gap-1.5"
                aria-label={`${project.title} stack`}
              >
                {project.stack.map((slug) => (
                  <li
                    key={slug}
                    className="border border-chip-border px-2 py-0.5 font-mono text-xs uppercase tracking-[0.1em] text-chip-ink"
                  >
                    {skillNameBySlug.get(slug) ?? slug}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIWork() {
  const section = homepageSections[3];

  return (
    <section id={section.id} aria-labelledby="how-heading">
      <ColourCard section={section} index={3} />
      <div className="px-6 py-12 md:px-12 lg:py-20">
        <h2 id="how-heading" className="sr-only">
          {section.label}
        </h2>
        <div className="grid md:grid-cols-2 md:gap-x-10">
          {howIWork.map((item) => (
            <div key={item.title} className="border-t-2 border-ink-how py-6">
              <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const section = homepageSections[4];

  return (
    <section id={section.id} aria-labelledby="contact-heading">
      <ColourCard section={section} index={4} />
      <div className="px-6 py-12 md:px-12 lg:py-20">
        <h2 id="contact-heading" className="sr-only">
          {section.label}
        </h2>
        <p className="max-w-[22ch] font-display text-3xl leading-tight tracking-tight md:text-4xl">
          {contactLeadIn}
        </p>
        <ul className="mt-8 space-y-3">
          {contactLinks.map((link) => {
            const Icon = link.Icon;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-base text-body hover:text-ink-contact"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
