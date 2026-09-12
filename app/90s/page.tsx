import { contactLinks, type ProfileLink } from "../config/profileLinks";
import {
  featuredWork,
  formatProjectPeriod,
  formatProjectRole,
} from "../config/featuredWork";
import { cspoBadge } from "../config/homepage";
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
  SITE_NAME,
  SKILLS_HELPER,
  WELCOME_TAG,
  WHATS_NEW,
  WORK_HELPER,
  WORK_TABLE,
  homepageContactLeadIn,
  homepageHowIWork,
  homepageIdentity,
  homepageWhatIDoHeading,
  homepageWhatIDoSteps,
  homepageWhereIHelp,
} from "./copy";
import { ChromeDivider, HitCounter, HubKitsch, WebRing } from "./kitsch";
import { ninetiesHubMetadata } from "./metadata";
import styles from "./nineties.module.css";

export const metadata = ninetiesHubMetadata;

const catalogueBySlug = new Map(
  getSkillCatalogue().map((skill) => [skill.slug, skill]),
);

const skillDirectory = getSkillDirectory();

function ProfileLinkButtons({ links }: { links: readonly ProfileLink[] }) {
  return (
    <ul className={styles.contactLinks}>
      {links.map((link) => {
        const kind = link.href.startsWith("mailto")
          ? styles.contactMail
          : link.href.includes("github")
            ? styles.contactGh
            : styles.contactLi;

        return (
          <li key={link.href}>
            <a
              className={`${styles.contactButton} ${kind}`}
              href={link.href}
              target={link.openInNewTab ? "_blank" : undefined}
              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
              aria-label={link.ariaLabel}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function NinetiesExperiment() {
  const latestTitle = featuredWork[0]?.title;

  return (
    <main className={styles.stage} id="main">
      <table className={styles.page} role="presentation">
        <tbody>
          <tr>
            <td colSpan={2} className={styles.banner}>
              <header>
                <p className={styles.tag} aria-hidden="true">
                  {WELCOME_TAG}
                </p>
                <h1 className={styles.wordmark}>{HUB_HEADING}</h1>
                <p className={styles.role}>
                  {homepageIdentity.name}, {HANDLE}
                </p>
                <p className={styles.sub}>
                  {homepageIdentity.line} · {homepageIdentity.location}
                </p>
                <HitCounter />
              </header>
              <ExperimentNav />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <HubKitsch />
            </td>
          </tr>
          <tr>
            <td className={`${styles.card} ${styles.introCard}`} id="welcome">
              <h2 className={styles.cardTitle}>Welcome to {SITE_NAME}</h2>
              <div className={styles.introRow}>
                <img
                  className={styles.portrait}
                  src={HUB_PORTRAIT.src}
                  alt={HUB_PORTRAIT.alt}
                  width={96}
                  height={96}
                />
                <div>
                  <p>{ARRIVED_LINE}</p>
                  <p className={styles.lede}>{homepageIdentity.lede}</p>
                  <p>{homepageIdentity.credentialLine}</p>
                  <p className={styles.credential}>
                    <img
                      src={cspoBadge.src}
                      alt=""
                      width={24}
                      height={24}
                    />
                    {homepageIdentity.credential}
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.card} ${styles.newsCard}`}>
              <div className={styles.news} aria-hidden="true">
                <div className={styles.newsHead}>
                  <img src="/90s/saturn.png" alt="" width={52} height={31} />
                  <p className={styles.newsStamp}>★ {WHATS_NEW.heading}</p>
                </div>
                <p>{WHATS_NEW.date}</p>
                <ul>
                  {WHATS_NEW.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {latestTitle ? (
                    <li>
                      <span className={`${styles.newsNew} ${styles.blink}`}>
                        New!{" "}
                      </span>
                      {latestTitle}
                    </li>
                  ) : null}
                </ul>
                <p>{WHATS_NEW.more}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <ChromeDivider />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.sectionBar} id="what">
              <h2>
                <span aria-hidden="true">:: </span>
                What I do
                <span aria-hidden="true"> ::</span>
              </h2>
              <p>{homepageWhatIDoHeading}</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.stepsCell}>
              <table className={styles.steps} role="presentation">
                <tbody>
                  <tr>
                    {homepageWhatIDoSteps.map((step) => (
                      <td key={step.title}>
                        <h3>{step.title}</h3>
                        <ul>
                          {step.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.quote} id="where">
              <h2 className={styles.srOnly}>Where I help</h2>
              <p>{homepageWhereIHelp.quote}</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.helpCell}>
              <table className={styles.help} role="presentation">
                <tbody>
                  <tr>
                    {homepageWhereIHelp.items.slice(0, 2).map((item) => (
                      <td key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {homepageWhereIHelp.items.slice(2).map((item) => (
                      <td key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.sectionBar} id="work">
              <h2>
                <span aria-hidden="true">:: </span>
                Work
                <span aria-hidden="true"> ::</span>
              </h2>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.workWrap}>
              <p className={styles.helper}>{WORK_HELPER}</p>
              <table className={styles.work}>
                <caption className={styles.srOnly}>{WORK_TABLE.caption}</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{WORK_TABLE.project}</th>
                    <th scope="col">{WORK_TABLE.domain}</th>
                    <th scope="col">{WORK_TABLE.period}</th>
                    <th scope="col">{WORK_TABLE.role}</th>
                  </tr>
                </thead>
                <tbody>
                  {featuredWork.flatMap((project, index) => [
                    <tr key={project.slug}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{project.title}</strong>
                      </td>
                      <td>{project.domain}</td>
                      <td>{formatProjectPeriod(project)}</td>
                      <td>{formatProjectRole(project)}</td>
                    </tr>,
                    <tr key={`${project.slug}-blurb`}>
                      <td colSpan={5}>
                        <p>{project.blurb}</p>
                        <ul
                          className={styles.stackTags}
                          aria-label={`${project.title} stack`}
                        >
                          {project.stack.map((slug) => {
                            const skill = catalogueBySlug.get(slug);
                            const label = skill?.name ?? slug;

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
                      </td>
                    </tr>,
                  ])}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.sectionBar} id="how">
              <h2>
                <span aria-hidden="true">:: </span>
                How I work
                <span aria-hidden="true"> ::</span>
              </h2>
            </td>
          </tr>
          {homepageHowIWork.map((item) => (
            <tr key={item.title}>
              <td colSpan={2} className={styles.how}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2} className={styles.skills} id="skills">
              <h2>Skills</h2>
              <p className={styles.helper}>{SKILLS_HELPER}</p>
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
                      {group.skills.map((skill) => (
                        <li key={skill.slug}>
                          {skill.hasNote ? (
                            <a
                              className={`${styles.skillTile} ${styles.skillTileNoted}`}
                              href={skillNoteHref(skill.slug)}
                            >
                              {skill.name}
                              <span
                                className={styles.skillTileFlag}
                                aria-hidden="true"
                              >
                                {" "}
                                ★
                              </span>
                            </a>
                          ) : (
                            <span className={styles.skillTile}>
                              {skill.name}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className={styles.contact} id="contact">
              <h2>Contact</h2>
              <p className={styles.helper}>{homepageContactLeadIn}</p>
              <ProfileLinkButtons links={contactLinks} />
            </td>
            <td className={styles.contact}>
              <WebRing />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.footer} aria-hidden="true">
              <img src="/90s/skull.png" alt="" width={24} height={24} /> {FOOTER}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
