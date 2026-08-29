"use client";

/**
 * PROTOTYPE Variant C — "Dossier Rail".
 *
 * Register: a consulting one-pager. A fixed left rail carries identity, the
 * section spine, and the contact cluster, so the offer and the way to reach
 * him are on screen the whole time; the right column scrolls as a dense
 * record. Label/value rows instead of cards, mono labels, tight vertical
 * rhythm. Primary affordance: orientation — you always know where you are.
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

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-t border-zinc-200 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
      <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}

export default function VariantC() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-[family-name:var(--phr-sans)] antialiased lg:grid lg:grid-cols-[19rem_1fr]">
      {/* Fixed rail */}
      <aside className="border-b border-zinc-200 bg-zinc-50 px-8 py-10 lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0 lg:flex lg:flex-col">
        <div>
          <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.2em] text-zinc-500">
            {identity.line}
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">{identity.name}</h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">{identity.lede}</p>
        </div>

        <nav className="mt-10" aria-label="Sections">
          <ul className="space-y-2">
            {SECTIONS.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-baseline gap-3 font-[family-name:var(--phr-mono)] text-xs uppercase tracking-[0.14em] text-zinc-500 hover:text-zinc-900"
                >
                  <span className="text-zinc-300 group-hover:text-emerald-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 lg:mt-auto">
          <a
            href={contact.primary.href}
            className="block rounded-md bg-zinc-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700"
          >
            Start a conversation
          </a>
          <ul className="mt-4 space-y-1.5">
            {contact.links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noreferrer" : undefined}
                  className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900"
                >
                  <link.Icon aria-hidden className="h-3.5 w-3.5" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Scrolling record */}
      <main className="px-8 py-12 md:px-14 lg:py-16">
        <section id="what" className="max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {whatIDo.statement}
          </h2>
          <div className="mt-8">
            {whatIDo.body.map((p, i) => (
              <Row key={p.slice(0, 24)} label={i === 0 ? whatIDo.label : ""}>
                <p className="max-w-prose text-[0.9375rem] leading-relaxed text-zinc-700">{p}</p>
              </Row>
            ))}
          </div>
        </section>

        <section id="where" className="mt-16 max-w-3xl">
          <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.2em] text-emerald-700">
            {whereIHelp.label}
          </h2>
          <div className="mt-4">
            {whereIHelp.items.map(item => (
              <Row key={item.title} label={item.title}>
                <p className="max-w-prose text-[0.9375rem] leading-relaxed text-zinc-700">
                  {item.body}
                </p>
              </Row>
            ))}
          </div>
        </section>

        <section id="work" className="mt-16 max-w-4xl">
          <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.2em] text-emerald-700">
            {recentWork.label}
          </h2>
          <div className="mt-4">
            {recentWork.projects.map(project => (
              <article
                key={project.slug}
                className="grid gap-3 border-t border-zinc-200 py-7 md:grid-cols-[10rem_1fr] md:gap-8"
              >
                <div>
                  <p className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-zinc-500">
                    {project.period}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                  <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-relaxed text-zinc-700">
                    {project.blurb}
                  </p>
                  <p className="mt-3 font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-zinc-400">
                    {project.stack.join(" / ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="mt-16 max-w-3xl pb-24">
          <h2 className="font-[family-name:var(--phr-mono)] text-[0.6875rem] uppercase tracking-[0.2em] text-emerald-700">
            {howIWork.label}
          </h2>
          <div className="mt-4">
            {howIWork.items.map(item => (
              <Row key={item.title} label={item.title}>
                <p className="max-w-prose text-[0.9375rem] leading-relaxed text-zinc-700">
                  {item.body}
                </p>
              </Row>
            ))}
          </div>
          <p className="mt-12 border-t border-zinc-200 pt-8 text-xl leading-snug text-zinc-800">
            {contact.invitation}{" "}
            <a
              href={contact.primary.href}
              className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
            >
              {contact.primary.label}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
