import type { ReactNode } from "react";
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
import { homepageSections } from "../config/homepage";
import { getSkillCatalogue } from "../lib/skillCatalogue";
import {
  getSkillDirectory,
  groupCountLabel,
  skillNoteHref,
} from "../lib/skillDirectory";
import { ExperimentNav } from "./ExperimentNav";
import {
  ARRIVED_LINE,
  FOOTER,
  HANDLE,
  HUB_HEADING,
  HUB_PORTRAIT,
  PANE_GARNISH,
  SKILLS_HELPER,
  WEBRING,
  WHATS_NEW,
  WHATS_NEW_LABEL,
  WHATS_NEW_STAMP,
  WHATS_NEW_TITLE,
  WORK_TABLE,
  WORK_HELPER,
  homepageContactLeadIn,
  homepageHowIWork,
  homepageIdentity,
  homepageRecentWorkLeadIn,
  homepageWhatIDoHeading,
  homepageWhatIDoSteps,
  homepageWhereIHelp,
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

function Window({
  id,
  title,
  garnish,
  className,
  children,
}: {
  id: string;
  title: string;
  garnish: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`${styles.window} ${className ?? ""}`}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <div className={styles.windowBar}>
        <h2 id={`${id}-heading`}>{title}</h2>
        <span aria-hidden="true">{garnish}</span>
      </div>
      <div className={styles.windowBody}>{children}</div>
    </section>
  );
}

function StackList({ project }: { project: (typeof featuredWork)[number] }) {
  return (
    <ul className={styles.stackList} aria-label={`${project.title} skills`}>
      {project.stack.map((slug) => {
        const skill = catalogueBySlug.get(slug);
        const label = skill?.name ?? slug;

        // A stack tag is a link only for the publish set, so the strip can
        // never point at a note that does not exist.
        return (
          <li className={styles.stackTag} key={slug}>
            {skill?.hasNote ? (
              <a className={styles.stackTagLink} href={skillNoteHref(slug)}>
                {label}
              </a>
            ) : (
              label
            )}
          </li>
        );
      })}
    </ul>
  );
}

function WorkTable() {
  return (
    <table className={styles.workTable} role="table">
      <caption className={styles.srOnly}>
        {WORK_TABLE.caption}
      </caption>
      <thead>
        <tr>
          <th scope="col">{WORK_TABLE.project}</th>
          <th scope="col">{WORK_TABLE.domain}</th>
          <th scope="col">{WORK_TABLE.period}</th>
          <th scope="col">{WORK_TABLE.role}</th>
        </tr>
      </thead>
      <tbody>
        {featuredWork.map((project) => (
          <tr key={project.slug}>
            <th scope="row" data-label="Project">
              {project.title}
            </th>
            <td data-label="Domain">{project.domain}</td>
            <td data-label="Period">{formatProjectPeriod(project)}</td>
            <td data-label="Role">{formatProjectRole(project)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function NinetiesExperiment() {
  return (
    <main className={styles.stage}>
      <a className={styles.skipLink} href="#welcome">
        Skip to content
      </a>

      <header className={styles.banner}>
        <h1>{HUB_HEADING}</h1>
        <p className={styles.tagline}>
          {homepageIdentity.name}, {HANDLE}
        </p>
        <p className={styles.identityLine}>{homepageIdentity.line}</p>
        <p className={styles.identityLine}>{homepageIdentity.location}</p>
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

      <table className={styles.collage} role="presentation">
        <tbody>
          <tr>
            <td className={styles.collageCell}>
              <div className={styles.collageColumn}>
                <Window
                  id="welcome"
                  title="Welcome"
                  garnish={PANE_GARNISH.welcome}
                  className={styles.welcomeWindow}
                >
                  <table className={styles.introTable} role="presentation">
                    <tbody>
                      <tr>
                        <td className={styles.portraitCell}>
                          <img
                            className={styles.portrait}
                            src={HUB_PORTRAIT.src}
                            alt={HUB_PORTRAIT.alt}
                            width={HUB_PORTRAIT.width}
                            height={HUB_PORTRAIT.height}
                          />
                        </td>
                        <td className={styles.identityCell}>
                          <p className={styles.identityName}>
                            {homepageIdentity.name}, {HANDLE}
                          </p>
                          <p>{homepageIdentity.line}</p>
                          <p>{homepageIdentity.location}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p className={styles.arrivedNote}>
                    <span aria-hidden="true">ARRIVED // </span>
                    {ARRIVED_LINE}
                  </p>
                  <p>{homepageIdentity.lede}</p>
                  <p className={styles.credentialLine}>
                    {homepageIdentity.credentialLine}
                  </p>
                  <p className={styles.microcopy}>
                    {homepageIdentity.credential}
                  </p>
                  <ProfileLinkList
                    links={socialProfileLinks}
                    className={styles.socialLinks}
                    ariaLabel="Andrew's social profiles"
                  />
                </Window>

                <aside className={`${styles.window} ${styles.newsWindow}`}>
                  <div className={styles.windowBar}>
                    <h2>{WHATS_NEW_TITLE}</h2>
                    <span>{WHATS_NEW_LABEL}</span>
                  </div>
                  <div className={styles.windowBody}>
                    <p className={styles.newStamp}>{WHATS_NEW_STAMP}</p>
                    <ul className={styles.newsList}>
                      {WHATS_NEW.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </aside>

                <Window
                  id="what"
                  title={homepageSections[0].label}
                  garnish={PANE_GARNISH.what}
                >
                  <h3 className={styles.offerHeading}>
                    {homepageWhatIDoHeading}
                  </h3>
                  <ul className={styles.offerList}>
                    {homepageWhatIDoSteps.map((step) => (
                      <li className={styles.offerItem} key={step.title}>
                        <h4 className={styles.offerItemTitle}>{step.title}</h4>
                        <ul className={styles.offerItems}>
                          {step.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </Window>

                <Window
                  id="where"
                  title={homepageSections[1].label}
                  garnish={PANE_GARNISH.where}
                >
                  <blockquote className={styles.offerQuote}>
                    {homepageWhereIHelp.quote}
                  </blockquote>
                  <ul className={styles.offerList}>
                    {homepageWhereIHelp.items.map((item) => (
                      <li className={styles.offerItem} key={item.title}>
                        <h3 className={styles.offerItemTitle}>{item.title}</h3>
                        <p>{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </Window>
              </div>
            </td>

            <td className={`${styles.collageCell} ${styles.workCell}`}>
              <div className={styles.collageColumn}>
                <Window
                  id="work"
                  title={homepageSections[2].label}
                  garnish={PANE_GARNISH.work}
                  className={styles.workWindow}
                >
                  <p className={styles.microcopy}>{homepageRecentWorkLeadIn}</p>
                  <WorkTable />
                  <p className={styles.workHelper}>{WORK_HELPER}</p>
                  <div className={styles.workBlurbs}>
                    {featuredWork.map((project) => (
                      <article className={styles.workBlurb} key={project.slug}>
                        <h3>{project.title}</h3>
                        <p>{project.blurb}</p>
                        <StackList project={project} />
                      </article>
                    ))}
                  </div>
                </Window>

                <Window
                  id="how"
                  title={homepageSections[3].label}
                  garnish={PANE_GARNISH.how}
                >
                  <ul className={styles.offerList}>
                    {homepageHowIWork.map((item) => (
                      <li className={styles.offerItem} key={item.title}>
                        <h3 className={styles.offerItemTitle}>{item.title}</h3>
                        <p>{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </Window>

                <Window
                  id="skills"
                  title="Skills"
                  garnish={PANE_GARNISH.skills}
                  className={styles.skillsWindow}
                >
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
                        <ul
                          className={styles.skillWall}
                          aria-labelledby={headingId}
                        >
                          {group.skills.map((skill) => {
                            const Icon = skill.icon;

                            // A noted tile is itself the link; a listed-only
                            // tile stays plain text so it can never read as a
                            // dead link.
                            return (
                              <li key={skill.slug}>
                                {skill.hasNote ? (
                                  <a
                                    className={`${styles.skillTile} ${styles.skillTileNoted}`}
                                    href={skillNoteHref(skill.slug)}
                                  >
                                    <Icon aria-hidden="true" />
                                    <span>{skill.name}</span>
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
                </Window>

                <Window
                  id="contact"
                  title={homepageSections[4].label}
                  garnish={PANE_GARNISH.contact}
                  className={styles.contactWindow}
                >
                  <p>{homepageContactLeadIn}</p>
                  <ProfileLinkList
                    links={contactLinks}
                    className={styles.contactLinks}
                  />

                  <aside className={styles.webring} aria-hidden="true">
                    <h3>{WEBRING.title}</h3>
                    <p>{WEBRING.body}</p>
                  </aside>
                </Window>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <footer className={styles.footer} aria-hidden="true">
        {FOOTER}
      </footer>
    </main>
  );
}
