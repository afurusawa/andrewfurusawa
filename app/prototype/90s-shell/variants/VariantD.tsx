import {
  BIO,
  CONTACT,
  HIT_COUNT,
  NAME,
  NAV,
  ROLE,
  STUB_SKILLS,
} from "../stubData";

/**
 * Hybrid from feedback: B's period max-width stage (~1024) + C's kitsch/color
 * (starfield, purple glow, multi-hue nav, optional pack, pane chrome).
 */
export default function VariantD() {
  return (
    <div className="p90-d">
      <div className="p90-d__stage">
        <header className="p90-d__banner">
          <h1 className="p90-radical">CYBER ZONE</h1>
          <p className="p90-tagline">NO RULES. JUST BANDWIDTH.</p>
          <p className="p90-micro" style={{ marginTop: "0.5rem" }}>
            {NAME} — {ROLE}
          </p>
        </header>

        <nav className="p90-d__navrow" aria-label="Section">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="p90-bevel">
              {item.label}
            </a>
          ))}
          <div className="p90-d__counter-wrap" aria-hidden="true">
            hits{" "}
            <span className="p90-counter">
              {HIT_COUNT.split("").map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </span>
          </div>
        </nav>

        <div className="p90-d__pack" aria-hidden="true">
          <span className="p90-uc">⚠ UNDER CONSTRUCTION — please be patient</span>
          <span className="p90-badge p90-badge--html">I ♥ HTML</span>
          <span className="p90-badge p90-badge--cool">100% COOL</span>
          <span className="p90-badge p90-badge--ns">NETSCAPE NOW</span>
          <span className="p90-badge p90-badge--hack">HACK THE PLANET</span>
        </div>

        <main className="p90-d__main">
          <section
            id="about"
            className="p90-d__pane"
            aria-labelledby="about-h-d"
          >
            <div className="p90-d__pane-bar" id="about-h-d">
              <span>:: ABOUT ::</span>
              <span>welcome traveler</span>
            </div>
            <div className="p90-d__pane-body">
              <p className="p90-micro" style={{ marginTop: 0 }}>
                welcome to my space on the information superhighway
              </p>
              <hr className="p90-divider" />
              <p style={{ margin: 0, color: "var(--p90-muted)" }}>{BIO}</p>
            </div>
          </section>

          <section
            id="skills"
            className="p90-d__pane p90-d__pane--skills"
            aria-labelledby="skills-h-d"
          >
            <div className="p90-d__pane-bar" id="skills-h-d">
              <span>:: SKILLS ::</span>
              <span>full table · no filter</span>
            </div>
            <div className="p90-d__pane-body">
              <table className="p90-table">
                <caption className="sr-only">Skills list</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Skill</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {STUB_SKILLS.map((skill, i) => (
                    <tr key={skill}>
                      <td>{String(i + 1).padStart(2, "0")}</td>
                      <td>{skill}</td>
                      <td>online</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            id="contact"
            className="p90-d__pane p90-d__pane--contact"
            aria-labelledby="contact-h-d"
          >
            <div className="p90-d__pane-bar" id="contact-h-d">
              <span>:: CONTACT ::</span>
              <span>old channels only</span>
            </div>
            <div className="p90-d__pane-body">
              <p className="p90-micro" style={{ marginTop: 0 }}>
                ping me on the period-legal links:
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0.5rem 0 0",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.45rem",
                }}
              >
                {CONTACT.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      className="p90-bevel"
                      style={{
                        display: "inline-block",
                        padding: "0.35rem 0.7rem",
                      }}
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
            </div>
          </section>
        </main>

        <footer className="p90-footer">
          Best viewed at 1024×768 · built with notepad energy · hit counter by
          HitBox (fake) · no web ring membership
        </footer>
      </div>
    </div>
  );
}
