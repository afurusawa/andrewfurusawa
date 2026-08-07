import type { ReactNode } from "react";

/**
 * The shell chrome from the frames prototype, held constant across all three
 * treatments so the only thing under comparison is the directory itself.
 * Nav is the four-item set locked in the Featured work strip ticket.
 */
export default function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="p90-stagewrap">
      <div className="p90-stage">
        <div className="p90-stage__banner">
          <h1 className="p90-radical">Andrew Furusawa</h1>
          <p className="p90-tagline">
            ★ Lead Front-End Developer ★ est. somewhere in the basement ★
          </p>
        </div>
        <nav className="p90-stage__navrow" aria-label="Sections">
          <a className="p90-bevel" href="#about">
            About
          </a>
          <a className="p90-bevel" href="#work">
            Work
          </a>
          <a className="p90-bevel" href="#skills" aria-current="page">
            Skills
          </a>
          <a className="p90-bevel" href="#contact">
            Contact
          </a>
        </nav>
        {children}
      </div>
    </div>
  );
}
