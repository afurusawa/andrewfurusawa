import { contactLinks, type ProfileLink } from "../config/profileLinks";
import { skills } from "../config/skills";
import {
  featuredWork,
  formatProjectPeriod,
  formatProjectRole,
} from "../config/featuredWork";
import { blogEntryHref, readBlogEntries } from "../lib/blogCatalogue";
import { ExperimentNav } from "./ExperimentNav";
import {
  FOOTER,
  HANDLE,
  HUB_CREDO,
  HUB_HEADING,
  HUB_PORTRAIT,
  HUB_QUOTES,
  WELCOME_TAG,
  UPDATES_TABLE,
  WHATS_NEW,
  WORK_HELPER,
  WORK_TABLE,
  WRITING_HELPER,
  homepageContactLeadIn,
  homepageIdentity,
} from "./copy";
import { kitschDate } from "./kitschDate";
import { ChromeDivider, HitCounter, PackBadges, WebRing } from "./kitsch";
import { ninetiesHubMetadata } from "./metadata";
import styles from "./nineties.module.css";

export const metadata = ninetiesHubMetadata;

const skillNames = new Map(skills.map((skill) => [skill.slug, skill.name]));

const quoteLine = `${HUB_QUOTES.join(" · ")} · `;

function QuoteMarquee() {
  return (
    <div className={styles.marquee}>
      <p className={styles.marqueeTrack}>
        <span>{quoteLine}</span>
        <span aria-hidden="true">{quoteLine}</span>
      </p>
    </div>
  );
}

function publishedWriting() {
  return readBlogEntries()
    .filter((entry) => !entry.draft)
    .slice()
    .sort(
      (left, right) =>
        right.date.localeCompare(left.date) ||
        left.slug.localeCompare(right.slug),
    )
    .map(({ slug, title, date, summary }) => ({
      slug,
      title,
      date,
      summary,
      href: blogEntryHref(slug),
    }));
}

function WhatsNew({
  entries,
}: {
  entries: readonly {
    slug: string;
    title: string;
    date: string;
    summary: string;
    href: string;
  }[];
}) {
  const stampDate = entries[0] ? kitschDate(entries[0].date) : WHATS_NEW.date;

  return (
    <>
      <h2 className={styles.newsStamp}>
        <span aria-hidden="true">★ </span>
        {WHATS_NEW.heading}
        <span aria-hidden="true"> ★</span>
      </h2>
      <p className={styles.newsUpdated}>
        {WHATS_NEW.lastUpdated} {stampDate}
      </p>
      <table
        className={styles.newsLog}
        border={1}
        cellPadding={4}
        cellSpacing={1}
      >
        <caption className={styles.srOnly}>{UPDATES_TABLE.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{UPDATES_TABLE.date}</th>
            <th scope="col">{UPDATES_TABLE.entry}</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan={2}>{WHATS_NEW.more}</td>
            </tr>
          ) : (
            entries.map((entry, index) => (
              <tr key={entry.slug}>
                <td className={styles.newsLogDate}>
                  <time dateTime={entry.date}>{kitschDate(entry.date)}</time>
                </td>
                <td>
                  {index === 0 ? (
                    <span className={styles.newsGif}>{WHATS_NEW.newBadge}</span>
                  ) : null}
                  <a href={entry.href}>
                    <b>{entry.title}</b>
                  </a>
                  <small className={styles.newsLogSummary}>{entry.summary}</small>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={styles.newsSite}>
        <b>
          {WHATS_NEW.siteNews} · {WHATS_NEW.date}
        </b>
        <br />
        {WHATS_NEW.items.join(" ")}
      </div>
      {entries.length > 0 ? (
        <p className={styles.newsLeave}>{WRITING_HELPER}</p>
      ) : null}
    </>
  );
}

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
  const published = publishedWriting();

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
              <QuoteMarquee />
            </td>
          </tr>
          <tr>
            <td className={`${styles.card} ${styles.introCard}`}>
              <div className={styles.introRow}>
                <img
                  className={styles.portrait}
                  src={HUB_PORTRAIT.src}
                  alt={HUB_PORTRAIT.alt}
                  width={96}
                  height={96}
                />
                <p className={styles.credo}>{HUB_CREDO}</p>
              </div>
            </td>
            <td className={`${styles.card} ${styles.newsCard}`} id="writing">
              <WhatsNew entries={published} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.badgeRow} aria-hidden="true">
              <PackBadges />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <ChromeDivider />
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
                          {project.stack.map((slug) => (
                            <li className={styles.stackTag} key={slug}>
                              {skillNames.get(slug) ?? slug}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>,
                  ])}
                </tbody>
              </table>
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
