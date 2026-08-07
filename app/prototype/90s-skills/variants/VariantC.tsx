import React from "react";
import { CATALOGUE, hasNote, iconFor, PUBLISH_SET } from "../stubCatalogue";
import Stage from "./Stage";

/**
 * C — NOTES FIRST, CATALOGUE BELOW.
 * Splits the section in two: the publish set gets real estate as feature cards
 * carrying their summaries, and the full catalogue follows as a dense text run.
 * Optimises for the writing rather than for completeness — the opposite bet from A.
 */
export default function VariantC() {
  return (
    <Stage>
      <section id="skills" className="p90-pane" aria-labelledby="c-skills-h">
        <div className="p90-pane__bar">
          <span>SKILLS — WHAT I HAVE WRITTEN DOWN</span>
          <span>
            {PUBLISH_SET.length} notes · {CATALOGUE.length} skills total
          </span>
        </div>
        <div className="p90-pane__body">
          <h2 id="c-skills-h" className="p90-radical" style={{ fontSize: "1.5rem" }}>
            Skills
          </h2>
          <p className="p90-micro" style={{ marginBottom: "0.85rem" }}>
            A few of these I have something to say about. Those are below, first.
          </p>
          <div className="p90-c__notes">
            {PUBLISH_SET.map((skill) => {
              const Icon = iconFor(skill.name);
              return (
                <a
                  key={skill.slug}
                  className="p90-c__note"
                  href={`/90s/skills/${skill.slug}`}
                >
                  <span className="p90-c__note-head">
                    {Icon ? <Icon aria-hidden="true" /> : null}
                    {skill.name}
                  </span>
                  <span className="p90-c__note-body">{skill.summary}</span>
                  <span className="p90-c__note-meta">
                    {skill.updated ? `UPDATED ${skill.updated}` : "READ THE NOTE ►"}
                  </span>
                </a>
              );
            })}
          </div>

          <hr className="p90-divider" />

          <h3 style={{ color: "var(--p90-cyan)", fontSize: "1.1rem" }}>
            Everything else I work with
          </h3>
          <p className="p90-micro" style={{ marginBottom: "0.5rem" }}>
            No notes on these — just the list.
          </p>
          <p className="p90-c__run">
            {CATALOGUE.map((skill, i) => (
              <React.Fragment key={skill.slug}>
                {i > 0 ? <span className="p90-c__sep">·</span> : null}
                {hasNote(skill) ? (
                  <a href={`/90s/skills/${skill.slug}`}>{skill.name}</a>
                ) : (
                  <span>{skill.name}</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>
    </Stage>
  );
}
