import {
  contactLinks,
  socialProfileLinks,
  type ProfileLink,
} from "../config/profileLinks";
import { featuredWork } from "../config/featuredWork";
import { skills } from "../config/skills";
import {
  ABOUT_PARAGRAPHS,
  CONTACT_LEAD_IN,
  EYEBROW,
  FOOTER,
  HUB_HEADING,
  PANE_GARNISH,
  ROLE,
  WORK_HELPER,
} from "./copy";
import { ninetiesHubMetadata } from "./metadata";
import styles from "./nineties.module.css";

export const metadata = ninetiesHubMetadata;

const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

// Stack entries are catalogue slugs; the catalogue owns how a skill is named.
const skillNamesBySlug = new Map(skills.map((skill) => [skill.slug, skill.name]));

const cosmeticHitCount = "001337";

// Hub-only theater. These files live in public/90s/ and are drawn by
// scripts/generate-90s-pack.mjs; a skill note never renders them.
const PACK_TAPE = { src: "/90s/under-construction.svg", width: 480, height: 44 };

const PACK_BADGES = [
  { src: "/90s/badge-html.png" },
  { src: "/90s/badge-cool.png" },
  { src: "/90s/badge-hack.png" },
] as const;

function ProfileLinkList({
  links,
  className,
  ariaLabel,
}: {
  links: readonly ProfileLink[];
  className: string;
  ariaLabel?: string;
}) {
  return (
    <ul className={className} aria-label={ariaLabel}>
      {links.map((link) => {
        const Icon = link.Icon;

        return (
          <li key={link.href}>
            <a
              className={styles.profileLink}
              href={link.href}
              target={link.openInNewTab ? "_blank" : undefined}
              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
              aria-label={link.ariaLabel}
            >
              <Icon aria-hidden="true" /> {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function NinetiesExperiment() {
  return (
    <main className={styles.stage}>
      <header className={styles.banner}>
        <p className={styles.eyebrow} aria-hidden="true">
          {EYEBROW}
        </p>
        <h1>{HUB_HEADING}</h1>
        <p className={styles.tagline}>{ROLE}</p>
      </header>

      <nav className={styles.navigation} aria-label="Experiment sections">
        {navigationItems.map((item) => (
          <a className={styles.navigationLink} href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <div className={styles.hitCounter} aria-hidden="true">
          <span>hits</span>
          <span className={styles.hitDigits}>
            {cosmeticHitCount.split("").map((digit, index) => (
              <span key={`${digit}-${index}`}>{digit}</span>
            ))}
          </span>
        </div>
      </nav>

      <div className={styles.pack} aria-hidden="true">
        <img
          className={styles.packTape}
          src={PACK_TAPE.src}
          alt=""
          width={PACK_TAPE.width}
          height={PACK_TAPE.height}
        />
        {PACK_BADGES.map((badge) => (
          <img
            key={badge.src}
            className={styles.packBadge}
            src={badge.src}
            alt=""
            width={88}
            height={31}
          />
        ))}
      </div>

      <div className={styles.panes}>
        <section className={styles.pane} id="about" aria-labelledby="about-heading">
          <div className={styles.paneBar}>
            <h2 id="about-heading">
              <span aria-hidden="true">:: </span>
              About
              <span aria-hidden="true"> ::</span>
            </h2>
            <span aria-hidden="true">{PANE_GARNISH.about}</span>
          </div>
          <div className={styles.paneBody}>
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ProfileLinkList
              links={socialProfileLinks}
              className={styles.socialLinks}
              ariaLabel="Andrew's social profiles"
            />
          </div>
        </section>

        <section className={`${styles.pane} ${styles.workPane}`} id="work" aria-labelledby="work-heading">
          <div className={styles.paneBar}>
            <h2 id="work-heading">
              <span aria-hidden="true">:: </span>
              Work
              <span aria-hidden="true"> ::</span>
            </h2>
            <span aria-hidden="true">{PANE_GARNISH.work}</span>
          </div>
          <div className={styles.paneBody}>
            <p className={styles.microcopy}>{WORK_HELPER}</p>
            <ul className={styles.workList}>
              {featuredWork.map((project) => (
                <li className={styles.workItem} key={project.slug}>
                  <h3 className={styles.workTitle}>{project.title}</h3>
                  <p className={styles.workMeta}>
                    <span>{project.role}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{project.period}</span>
                  </p>
                  <p>{project.blurb}</p>
                  <ul
                    className={styles.stackTags}
                    aria-label={`${project.title} stack`}
                  >
                    {project.stack.map((slug) => (
                      <li className={styles.stackTag} key={slug}>
                        {skillNamesBySlug.get(slug) ?? slug}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.pane} ${styles.skillsPane}`} id="skills" aria-labelledby="skills-heading">
          <div className={styles.paneBar}>
            <h2 id="skills-heading">
              <span aria-hidden="true">:: </span>
              Skills
              <span aria-hidden="true"> ::</span>
            </h2>
            <span aria-hidden="true">{PANE_GARNISH.skills}</span>
          </div>
          <div className={styles.paneBody}>
            <div className={styles.tableScroll}>
              <table className={styles.skillsTable}>
                <caption>{HUB_HEADING}&apos;s skills catalogue</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Skill</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;

                    return (
                      <tr key={skill.slug}>
                        <td>{String(index + 1).padStart(2, "0")}</td>
                        <td>
                          <Icon aria-hidden="true" /> {skill.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={`${styles.pane} ${styles.contactPane}`} id="contact" aria-labelledby="contact-heading">
          <div className={styles.paneBar}>
            <h2 id="contact-heading">
              <span aria-hidden="true">:: </span>
              Contact
              <span aria-hidden="true"> ::</span>
            </h2>
            <span aria-hidden="true">{PANE_GARNISH.contact}</span>
          </div>
          <div className={styles.paneBody}>
            <p className={styles.microcopy}>{CONTACT_LEAD_IN}</p>
            <ProfileLinkList
              links={contactLinks}
              className={styles.contactLinks}
            />
          </div>
        </section>
      </div>

      <footer className={styles.footer} aria-hidden="true">
        {FOOTER}
      </footer>
    </main>
  );
}
