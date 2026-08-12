import {
  contactLinks,
  socialProfileLinks,
  type ProfileLink,
} from "../config/profileLinks";
import { skills } from "../config/skills";
import { ninetiesHubMetadata } from "./metadata";
import styles from "./nineties.module.css";

export const metadata = ninetiesHubMetadata;

const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

const identity = {
  name: "Andrew Furusawa",
  role: "Front-End Developer",
} as const;

const cosmeticHitCount = "001337";

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
        <p className={styles.eyebrow}>Welcome to the information superhighway</p>
        <h1>Neon Cyber Basement</h1>
        <p className={styles.tagline}>
          {identity.name} · {identity.role}
        </p>
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

      <aside className={styles.optionalPack} aria-hidden="true">
        <span className={styles.cautionStrip}>
          ⚠ Under construction — please be patient
        </span>
        <span className={`${styles.badge} ${styles.htmlBadge}`}>I ♥ HTML</span>
        <span className={`${styles.badge} ${styles.coolBadge}`}>100% COOL</span>
        <span className={`${styles.badge} ${styles.hackBadge}`}>HACK THE PLANET</span>
      </aside>

      <div className={styles.panes}>
        <section className={styles.pane} id="about" aria-labelledby="about-heading">
          <div className={styles.paneBar}>
            <h2 id="about-heading">:: About ::</h2>
            <span>Welcome, traveler</span>
          </div>
          <div className={styles.paneBody}>
            <p className={styles.microcopy}>
              Building useful things from the early web to the modern one.
            </p>
            <p className={styles.identity}>
              {identity.name} <span>· {identity.role}</span>
            </p>
            <p>
              With over 12 years of front-end development experience, I enjoy
              building web applications from discovery to production. I&apos;ve
              been a key player in all phases of the development process,
              including discovery and requirements gathering, usability
              testing, prototyping, development, deployment, release
              management, and maintenance.
            </p>
            <ProfileLinkList
              links={socialProfileLinks}
              className={styles.socialLinks}
              ariaLabel="Andrew's social profiles"
            />
          </div>
        </section>

        <section className={`${styles.pane} ${styles.skillsPane}`} id="skills" aria-labelledby="skills-heading">
          <div className={styles.paneBar}>
            <h2 id="skills-heading">:: Skills ::</h2>
            <span>Signal acquired</span>
          </div>
          <div className={styles.paneBody}>
            <div className={styles.tableScroll}>
              <table className={styles.skillsTable}>
                <caption>Andrew Furusawa&apos;s skills catalogue</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Skill</th>
                    <th scope="col">Status</th>
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
                        <td>online</td>
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
            <h2 id="contact-heading">:: Contact ::</h2>
            <span>Open channels</span>
          </div>
          <div className={styles.paneBody}>
            <p className={styles.microcopy}>Ping me on the period-legal channels:</p>
            <ProfileLinkList
              links={contactLinks}
              className={styles.contactLinks}
            />
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        Best viewed at 1024×768 · Built with notepad energy · No web ring
        membership
      </footer>
    </main>
  );
}
