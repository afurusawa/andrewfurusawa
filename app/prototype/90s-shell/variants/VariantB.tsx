import {
  BIO,
  CONTACT,
  HIT_COUNT,
  NAME,
  NAV,
  ROLE,
  STUB_SKILLS,
} from "../stubData";

/** Top banner + horizontal beveled nav; content is a single-column card stack. */
export default function VariantB() {
  return (
    <div className="p90-b">
      <header className="p90-b__banner">
        <h1 className="p90-radical">CYBER ZONE</h1>
        <p className="p90-tagline">NO RULES. JUST BANDWIDTH.</p>
        <p className="p90-micro" style={{ marginTop: "0.5rem" }}>
          {NAME} — {ROLE}
        </p>
      </header>

      <nav className="p90-b__navrow" aria-label="Section">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="p90-bevel">
            {item.label}
          </a>
        ))}
        <div className="p90-b__counter-wrap" aria-hidden="true">
          hits{" "}
          <span className="p90-counter">
            {HIT_COUNT.split("").map((d, i) => (
              <span key={`${d}-${i}`}>{d}</span>
            ))}
          </span>
        </div>
      </nav>

      <main className="p90-b__main">
        <section id="about" className="p90-card" aria-labelledby="about-h-b">
          <h2 id="about-h-b" className="p90-b__card-title">
            About
          </h2>
          <p className="p90-micro" style={{ marginTop: 0 }}>
            welcome to my space on the information superhighway
          </p>
          <hr className="p90-divider" />
          <p style={{ margin: 0, color: "var(--p90-muted)" }}>{BIO}</p>
        </section>

        <section id="skills" className="p90-card" aria-labelledby="skills-h-b">
          <h2 id="skills-h-b" className="p90-b__card-title">
            Skills
          </h2>
          <hr className="p90-divider" />
          <table className="p90-table">
            <caption className="sr-only">Skills list</caption>
            <thead>
              <tr>
                <th scope="col">Skill</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {STUB_SKILLS.map((skill) => (
                <tr key={skill}>
                  <td>{skill}</td>
                  <td>online</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="contact" className="p90-card" aria-labelledby="contact-h-b">
          <h2 id="contact-h-b" className="p90-b__card-title">
            Contact
          </h2>
          <hr className="p90-divider" />
          <p className="p90-micro">ping me on the old channels:</p>
          <ul style={{ listStyle: "square", paddingLeft: "1.25rem", margin: 0 }}>
            {CONTACT.map((c) => (
              <li key={c.href} style={{ marginBottom: "0.35rem" }}>
                <a
                  href={c.href}
                  aria-label={c.ariaLabel}
                  {...(c.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="p90-footer">
        This page best viewed at 800×600 · built with notepad energy · hit counter
        by HitBox (fake)
      </footer>
    </div>
  );
}
