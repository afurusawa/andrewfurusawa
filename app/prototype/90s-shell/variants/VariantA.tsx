import {
  BIO,
  CONTACT,
  HIT_COUNT,
  NAME,
  NAV,
  ROLE,
  STUB_SKILLS,
} from "../stubData";

/** Classic frameset emulation: left nav chrome + right content pane. */
export default function VariantA() {
  return (
    <div className="p90-a">
      <header className="p90-a__titlebar">
        <h1 className="p90-radical">{NAME}</h1>
        <p className="p90-tagline">// cyber basement — enter if you dare…</p>
        <p className="p90-micro">{ROLE} · professional substance, period chrome</p>
      </header>

      <div className="p90-a__body">
        <nav className="p90-a__nav" aria-label="Section">
          <div className="p90-a__nav-label">:: NAVIGATION ::</div>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="p90-bevel">
              {item.label}
            </a>
          ))}
          <div className="p90-a__theater" aria-hidden="true">
            <div className="p90-counter">
              {HIT_COUNT.split("").map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>
            <div>visitors since May 12, 1997</div>
          </div>
        </nav>

        <main className="p90-a__main">
          <section id="about" className="p90-card" aria-labelledby="about-h">
            <h2 id="about-h">About</h2>
            <hr className="p90-divider" />
            <p style={{ margin: 0, color: "var(--p90-muted)" }}>{BIO}</p>
          </section>

          <section id="skills" className="p90-card" aria-labelledby="skills-h">
            <h2 id="skills-h">Skills</h2>
            <hr className="p90-divider" />
            <table className="p90-table">
              <caption className="sr-only">Skills list</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Skill</th>
                  <th scope="col">Zone</th>
                </tr>
              </thead>
              <tbody>
                {STUB_SKILLS.map((skill, i) => (
                  <tr key={skill}>
                    <td>{String(i + 1).padStart(2, "0")}</td>
                    <td>{skill}</td>
                    <td>front-end</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="contact" className="p90-card" aria-labelledby="contact-h">
            <h2 id="contact-h">Contact</h2>
            <hr className="p90-divider" />
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CONTACT.map((c) => (
                <li key={c.href} style={{ marginBottom: "0.4rem" }}>
                  <a
                    href={c.href}
                    className="p90-bevel"
                    style={{ display: "inline-block", padding: "0.35rem 0.7rem" }}
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
      </div>

      <footer className="p90-footer">
        Best viewed with Netscape Navigator 4.0+ · © 1997–∞ cyber basement · all
        rights reserved (theater)
      </footer>
    </div>
  );
}
