/**
 * THROWAWAY: homepage comparisons on /?variant=D|A|B|C.
 * Question: which hierarchy preserves the site's character while making the
 * offer, evidence, and next action easier to reach, especially on a phone?
 */
import Image from "next/image";
import { identity, portrait } from "../../../config/homepage";
import { featuredWork, formatProjectPeriod, formatProjectRole } from "../../../config/featuredWork";
import { contactLinks } from "../../../config/profileLinks";
import { skills } from "../../../config/skills";
import { ColourPanelObserver } from "../ColourPanelObserver";
import { Homepage } from "../Homepage";
import { PrototypeSwitcher } from "../../prototype/PrototypeSwitcher";
import { capabilities, offer, process, situationalHelp, variants, type VariantKey } from "./content";
import styles from "./prototype.module.css";

const skillNames = new Map(skills.map((skill) => [skill.slug, skill.name]));
const links = [
  { id: "what", label: "The offer" },
  { id: "where", label: "Where I help" },
  { id: "work", label: "Recent work" },
  { id: "how", label: "How I work" },
  { id: "contact", label: "Contact" },
];

export function HomepagePrototype({ variant }: { variant: string }) {
  const current: VariantKey = variants.find((item) => item.key === variant)?.key ?? "D";
  if (current === "D") {
    return (
      <div data-prototype-variant="D">
        <PrototypeBrief current={current} />
        <VariantD />
        <PrototypeSwitcher current={current} variants={variants} />
      </div>
    );
  }
  return (
    <div className={styles.prototype} data-prototype-variant={current}>
      <PrototypeBrief current={current} />
      {current === "A" ? <VariantA /> : current === "B" ? <VariantB /> : <VariantC />}
      <PrototypeSwitcher current={current} variants={variants} />
    </div>
  );
}

function PrototypeBrief({ current }: { current: VariantKey }) {
  const selected = variants.find((item) => item.key === current)!;
  return (
    <details className={styles.brief}>
      <summary>Throwaway prototype · {current} / {selected.name} <span>View comparison notes</span></summary>
      <div>
        <p>{selected.description}</p>
        <p><strong>Page order:</strong> {selected.structure}</p>
        <p><strong>Mobile:</strong> {selected.mobile}</p>
        <p>{current === "D" ? "D keeps the original design and changes only the opening action and Where I help copy. " : "A–C explore early email actions, navigation, concise services, proof, and compact mobile layouts. "}Original page: <a href="/">/</a>. Preference: existing visual design with C’s concrete client language; D is the focused comparison.</p>
      </div>
    </details>
  );
}

export function VariantD() {
  return (
    <Homepage
      openingAction={
        <div className="mt-6">
          <a href={offer.email} className={styles.faithfulAction}>
            Tell me what’s stuck <span aria-hidden="true">↗</span>
          </a>
        </div>
      }
      helpContent={situationalHelp}
    />
  );
}

function Identity({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.identity} ${compact ? styles.identityCompact : ""}`}>
      <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} sizes={compact ? "48px" : "64px"} />
      <div>
        <p className={styles.name}>{identity.name}</p>
        <p className={styles.micro}>{compact ? "Product & software delivery" : identity.line}</p>
      </div>
    </div>
  );
}

function Actions({ work = true }: { work?: boolean }) {
  return (
    <div className={styles.actions}>
      <a className={styles.primary} href={offer.email}>Tell me what’s stuck <span aria-hidden="true">↗</span></a>
      {work && <a className={styles.secondary} href="#work">See recent work <span aria-hidden="true">↓</span></a>}
    </div>
  );
}

function Proof({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.proof} ${compact ? styles.proofCompact : ""}`} aria-label="Selected project results">
      <a href="#case-milktracker"><strong>10+</strong><span>hospitals on one codebase</span></a>
      <a href="#case-blossom-groconnect"><strong>70%+</strong><span>reduction in load time</span></a>
      <a href="#case-ai-debate-practice"><strong>&lt;1 week</strong><span>to a working AI prototype</span></a>
    </div>
  );
}

function Steps() {
  return (
    <ol className={styles.steps}>
      {[{ name: "Clarify", text: "Discovery · user research" }, { name: "Define", text: "Scope · acceptance criteria" }, { name: "Deliver", text: "Code · tests · handoff" }].map((step, index) => (
        <li key={step.name}><span className={styles.micro}>0{index + 1}</span><h3>{step.name}</h3><p>{step.text}</p></li>
      ))}
    </ol>
  );
}

export function VariantA() {
  return (
    <ColourPanelObserver>
      <div className={styles.split}>
        <aside className={`${styles.sidebar} colour-panel`}>
          <Identity compact />
          <div className={styles.sidebarCopy}>
            <p className={styles.micro}>Independent consultant · {identity.location}</p>
            {[
              { id: "what", number: "01", title: "From ambiguity to delivery.", text: "Product decisions to production code." },
              { id: "where", number: "02", title: "The right help, at the right point.", text: "Discovery, definition, and hands-on delivery." },
              { id: "work", number: "03", title: "The work behind the promise.", text: "Healthcare, connected devices, and AI." },
              { id: "how", number: "04", title: "A small start. A clear handoff.", text: "Short cycles. Working deliverables." },
              { id: "contact", number: "05", title: "Tell me what’s stuck.", text: "A short email is enough to start." },
            ].map((section) => (
              <div key={section.id} className="panel-copy" data-id={section.id}>
                <span className={styles.sideNumber}>{section.number}</span>
                <h2>{section.title}</h2><p>{section.text}</p>
              </div>
            ))}
          </div>
          <nav className="section-index" aria-label="Homepage sections"><ol>
            {links.map((link, index) => <li key={link.id} data-id={link.id}><a href={`#${link.id}`}><span aria-hidden="true">0{index + 1}</span><i className="section-index__rule" aria-hidden="true" />{link.label}</a></li>)}
          </ol></nav>
        </aside>
        <main id="record" tabIndex={-1} className={styles.splitRecord}>
          <section id="what" className={styles.heroA}>
            <Identity />
            <p className={styles.kicker}>Product decisions to production code</p>
            <h1>{offer.heading}</h1>
            <p className={styles.lede}>{offer.lede}</p>
            <Actions />
            <Proof compact />
            <Steps />
            <p className={styles.credential}>{offer.context}</p>
          </section>
          <Capabilities />
          <Work />
          <Process />
          <Contact />
        </main>
      </div>
    </ColourPanelObserver>
  );
}

function Masthead({ label = "Product & software delivery" }: { label?: string }) {
  return (
    <header className={styles.masthead}>
      <a href="#what" className={styles.wordmark}>{identity.name}<span className={styles.micro}>{label}</span></a>
      <nav aria-label="Homepage sections"><a href="#work">Work</a><a href="#where">Capabilities</a><a href="#how">Approach</a><a href="#contact">Contact ↗</a></nav>
    </header>
  );
}

export function VariantB() {
  return (
    <div className={styles.workFirst}>
      <Masthead />
      <main id="record" tabIndex={-1}>
        <section id="what" className={styles.heroB}>
          <div>
            <p className={styles.kicker}>Independent consultant · {identity.location}</p>
            <h1>Clear requirements.<br /><em>Software that ships.</em></h1>
            <p className={styles.lede}>{offer.lede}</p>
            <Actions />
          </div>
          <div className={styles.portraitNote}>
            <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} sizes="(max-width: 700px) 56px, 200px" />
            <p>{offer.context}</p>
          </div>
        </section>
        <Work editorial />
        <Capabilities />
        <Process />
        <Contact />
      </main>
    </div>
  );
}

export function VariantC() {
  return (
    <div className={styles.problemFirst}>
      <Masthead label="Discovery → definition → delivery" />
      <main id="record" tabIndex={-1}>
        <section id="what" className={styles.heroC}>
          <div className={styles.problemIntro}>
            <Identity compact />
            <p className={styles.kicker}>A product partner who also writes the code</p>
            <h1>What’s keeping your product from shipping?</h1>
            <p className={styles.lede}>I help teams find the next clear step—and stay through delivery. {offer.context}</p>
            <Actions />
          </div>
          <nav className={styles.situations} aria-label="Find help for your situation">
            <p className={styles.micro}>Start with what sounds familiar</p>
            {[capabilities[0], capabilities[2], capabilities[3]].map((item, index) => (
              <a href={`#${item.id}`} key={item.id}><span className={styles.micro}>0{index + 1}</span><div><h2>{item.situation}</h2><span>{item.action} ↗</span></div></a>
            ))}
          </nav>
        </section>
        <div className={styles.discoveryBand}><p>Start small. Test the risky assumption.</p><a href="#how">What happens in discovery <span aria-hidden="true">↓</span></a></div>
        <section className={styles.proofC} aria-label="Selected results"><Proof /></section>
        <Work />
        <Capabilities />
        <Process />
        <Contact />
      </main>
    </div>
  );
}

function Capabilities() {
  return (
    <section id="where" className={`${styles.section} ${styles.capabilities}`}>
      <div className={styles.sectionHeading}><p className={styles.kicker}>Where I help</p><h2>Less uncertainty.<br />A clearer path forward.</h2></div>
      <div className={styles.capabilityList}>{capabilities.map((item, index) => (
        <article id={item.id} key={item.id}>
          <span className={styles.micro}>0{index + 1}</span>
          <div><h3>{item.title}</h3><p className={styles.outcome}>{item.outcome}</p><p>{item.detail}</p></div>
        </article>
      ))}</div>
    </section>
  );
}

function Work({ editorial = false }: { editorial?: boolean }) {
  return (
    <section id="work" className={`${styles.section} ${styles.work} ${editorial ? styles.editorial : ""}`}>
      <div className={styles.sectionHeading}><p className={styles.kicker}>Selected work · 2017–present</p><h2>Built. Shipped. Used.</h2><p>Three engagements across education, healthcare, and consumer IoT.</p></div>
      <div className={styles.projectList}>{featuredWork.map((project, index) => (
        <article id={`case-${project.slug}`} key={project.slug} className={styles.project}>
          {editorial && <div className={styles.projectLead}><span className={styles.micro}>0{index + 1} / {project.domain}</span><strong>{project.slug === "blossom-groconnect" ? "70%+" : project.outcomes[0].figure}</strong><p>{project.slug === "blossom-groconnect" ? "reduction in load time for 20,000+ users" : project.slug === "milktracker" ? "hospitals on one codebase" : "to a working AI prototype"}</p></div>}
          <div className={styles.projectBody}>
            <p className={styles.micro}>{project.domain} · {formatProjectPeriod(project)}</p>
            <h3>{project.title}</h3>
            <p className={styles.projectRole}>{formatProjectRole(project, " · ")}</p>
            <p>{project.blurb}</p>
            <ul className={styles.outcomes}>{project.outcomes.map((outcome) => (
              <li key={outcome.result}>
                {!editorial && outcome.figure && <strong>{project.slug === "blossom-groconnect" ? "70%+" : outcome.figure}</strong>}
                <span>{outcome.result}</span>
              </li>
            ))}</ul>
            <ul className={styles.stack} aria-label={`${project.title} stack`}>{project.stack.map((slug) => <li key={slug}>{skillNames.get(slug) ?? slug}</li>)}</ul>
          </div>
        </article>
      ))}</div>
    </section>
  );
}

function Process() {
  return (
    <section id="how" className={`${styles.section} ${styles.process}`}>
      <div className={styles.sectionHeading}><p className={styles.kicker}>How I work</p><h2>A small commitment.<br />Something real to build on.</h2></div>
      <ol>{process.map((item, index) => <li key={item.title}><span className={styles.micro}>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
      <p className={styles.credential}>{identity.credential}</p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${styles.section} ${styles.contact}`}>
      <p className={styles.kicker}>Have a problem in mind?</p>
      <h2>Tell me what’s stuck.</h2>
      <p>The first step is a short paid discovery sprint. Tell me what you’re working on and where you need help—a short email is enough.</p>
      <Actions work={false} />
      <div className={styles.contactFooter}><p>{identity.name}<br />{identity.location}</p><ul>{contactLinks.map((link) => <li key={link.href}><a href={link.href} aria-label={link.ariaLabel} target={link.openInNewTab ? "_blank" : undefined} rel={link.openInNewTab ? "noopener noreferrer" : undefined}>{link.label} ↗</a></li>)}</ul></div>
    </section>
  );
}
