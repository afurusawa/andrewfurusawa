import {
  contactLinks,
  socialProfileLinks,
  type ProfileLink,
} from "../config/profileLinks";
import {
  featuredWork,
  formatProjectPeriod,
  formatProjectRole,
} from "../config/featuredWork";
import { getSkillCatalogue } from "../lib/skillCatalogue";
import {
  getSkillDirectory,
  groupCountLabel,
  skillNoteHref,
} from "../lib/skillDirectory";
import { ExperimentNav } from "./ExperimentNav";
import {
  ABOUT_PARAGRAPHS,
  CONTACT_LEAD_IN,
  EYEBROW,
  FOOTER,
  HUB_HEADING,
  PANE_GARNISH,
  ROLE,
  SKILLS_HELPER,
  WORK_HELPER,
} from "./copy";
import { ninetiesHubMetadata } from "./metadata";
import styles from "./nineties.module.css";

export const metadata = ninetiesHubMetadata;

// Stack entries are catalogue slugs; the join owns how a skill is named and
// whether it has a note to link to.
const catalogueBySlug = new Map(
  getSkillCatalogue().map((skill) => [skill.slug, skill]),
);

// Grouped once at module scope: the directory is static build-time data.
const skillDirectory = getSkillDirectory();

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

      <ExperimentNav hitCount={cosmeticHitCount} />

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
                    <span>{formatProjectRole(project)}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{formatProjectPeriod(project)}</span>
                  </p>
                  <p>{project.blurb}</p>
                  <ul
                    className={styles.stackTags}
                    aria-label={`${project.title} stack`}
                  >
                    {project.stack.map((slug) => {
                      const skill = catalogueBySlug.get(slug);
                      const label = skill?.name ?? slug;

                      // A stack tag is a link only for the publish set, so the
                      // strip can never point at a note that does not exist.
                      return (
                        <li className={styles.stackTag} key={slug}>
                          {skill?.hasNote ? (
                            <a
                              className={styles.stackTagLink}
                              href={skillNoteHref(slug)}
                            >
                              {label}
                            </a>
                          ) : (
                            label
                          )}
                        </li>
                      );
                    })}
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
            <p className={styles.microcopy}>{SKILLS_HELPER}</p>
            {skillDirectory.map((group) => {
              const headingId = `skills-${group.category.toLowerCase()}`;

              return (
                <div className={styles.skillGroup} key={group.category}>
                  <h3 className={styles.skillGroupHeading} id={headingId}>
                    {group.category}
                    <span className={styles.skillGroupCount}>
                      {groupCountLabel(group)}
                    </span>
                  </h3>
                  <ul className={styles.skillWall} aria-labelledby={headingId}>
                    {group.skills.map((skill) => {
                      const Icon = skill.icon;

                      // A noted tile is itself the link; a listed-only tile
                      // stays plain text so it can never read as a dead link.
                      return (
                        <li key={skill.slug}>
                          {skill.hasNote ? (
                            <a
                              className={`${styles.skillTile} ${styles.skillTileNoted}`}
                              href={skillNoteHref(skill.slug)}
                            >
                              <Icon aria-hidden="true" />
                              <span>{skill.name}</span>
                              <span
                                className={styles.skillTileFlag}
                                aria-hidden="true"
                              >
                                NOTE ►
                              </span>
                            </a>
                          ) : (
                            <span className={styles.skillTile}>
                              <Icon aria-hidden="true" />
                              <span>{skill.name}</span>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
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
