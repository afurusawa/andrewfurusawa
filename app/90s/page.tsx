import {
  contactLinks,
  socialProfileLinks,
  type ProfileLink,
} from "../config/profileLinks";
import styles from "./nineties.module.css";

const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

const identity = {
  name: "Andrew Furusawa",
  role: "Front-End Developer",
} as const;

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
      </nav>

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
            <p className={styles.microcopy}>
              The full skills transmission is being decoded.
            </p>
          </div>
        </section>

        <section className={`${styles.pane} ${styles.contactPane}`} id="contact" aria-labelledby="contact-heading">
          <div className={styles.paneBar}>
            <h2 id="contact-heading">:: Contact ::</h2>
            <span>Open channels</span>
          </div>
          <div className={styles.paneBody}>
            <ProfileLinkList
              links={contactLinks}
              className={styles.contactLinks}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
