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
 * Multi-pane collage: simultaneous frame panels on desktop + optional pack
 * (starfield texture, UC graphic, small badge strip) for density comparison.
 */
export default function VariantC() {
  return (
    <div className="p90-c">
      <header className="p90-c__top">
        <div>
          <h1 className="p90-radical" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
            {NAME}&apos;S DOMAIN
          </h1>
          <p className="p90-tagline" style={{ margin: 0 }}>
            enter the zone · {ROLE}
          </p>
        </div>
        <nav className="p90-c__chrome-nav" aria-label="Section">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="p90-bevel">
              {item.label}
            </a>
          ))}
        </nav>
        <div aria-hidden="true" style={{ textAlign: "right", fontSize: "0.9rem" }}>
          <div className="p90-counter">
            {HIT_COUNT.split("").map((d, i) => (
              <span key={`${d}-${i}`}>{d}</span>
            ))}
          </div>
          <div className="p90-micro">visitor #</div>
        </div>
      </header>

      <div className="p90-c__sidebits" aria-hidden="true">
        <span className="p90-uc">⚠ UNDER CONSTRUCTION — please be patient</span>
        <span className="p90-badge p90-badge--html">I ♥ HTML</span>
        <span className="p90-badge p90-badge--cool">100% COOL</span>
        <span className="p90-badge p90-badge--ns">NETSCAPE NOW</span>
        <span className="p90-badge p90-badge--hack">HACK THE PLANET</span>
      </div>

      <div className="p90-c__grid">
        <section
          id="about"
          className="p90-c__pane p90-c__about"
          aria-labelledby="about-h-c"
        >
          <div className="p90-c__pane-bar" id="about-h-c">
            :: ABOUT ::
          </div>
          <div className="p90-c__pane-body">
            <p className="p90-micro" style={{ marginTop: 0 }}>
              You have entered the basement. Leave reality above.
            </p>
            <p style={{ margin: 0, color: "var(--p90-muted)" }}>{BIO}</p>
          </div>
        </section>

        <section
          id="skills"
          className="p90-c__pane p90-c__skills"
          aria-labelledby="skills-h-c"
        >
          <div className="p90-c__pane-bar" id="skills-h-c">
            :: SKILLS TABLE ::
          </div>
          <div className="p90-c__pane-body">
            <table className="p90-table">
              <caption className="sr-only">Skills list</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Skill</th>
                </tr>
              </thead>
              <tbody>
                {STUB_SKILLS.map((skill, i) => (
                  <tr key={skill}>
                    <td>{i + 1}</td>
                    <td>{skill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="contact"
          className="p90-c__pane p90-c__contact"
          aria-labelledby="contact-h-c"
        >
          <div className="p90-c__pane-bar" id="contact-h-c">
            :: CONTACT ::
          </div>
          <div className="p90-c__pane-body">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CONTACT.map((c) => (
                <li key={c.href} style={{ marginBottom: "0.45rem" }}>
                  <a
                    href={c.href}
                    className="p90-bevel"
                    style={{ display: "inline-block", padding: "0.3rem 0.6rem" }}
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
      </div>

      <footer className="p90-footer">
        All graphics &amp; content © theater year · member of no web ring · best
        viewed in any browser that still scrolls
      </footer>
    </div>
  );
}
