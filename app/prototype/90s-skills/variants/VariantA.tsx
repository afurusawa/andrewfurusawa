import { CATALOGUE, PUBLISH_SET, hasNote } from "../stubCatalogue";
import Stage from "./Stage";

/**
 * A — DIRECTORY LISTING.
 * The catalogue as a period index: one row per skill, in authored order, with an
 * explicit STATUS column. No icons at all. The publish set is a property of a row,
 * not a separate region — everything reads as one list you scan top to bottom.
 */
export default function VariantA() {
  return (
    <Stage>
      <section id="skills" className="p90-pane" aria-labelledby="a-skills-h">
        <div className="p90-pane__bar">
          <span>C:\SKILLS\INDEX.HTM</span>
          <span>
            {CATALOGUE.length} entries · {PUBLISH_SET.length} with notes
          </span>
        </div>
        <div className="p90-legend">
          <span>
            <b>►</b> has a note — click through to read it
          </span>
          <span>
            <b>·</b> listed only — no note written
          </span>
        </div>
        <div className="p90-pane__body">
          <h2 id="a-skills-h" className="p90-radical" style={{ fontSize: "1.5rem" }}>
            Skills
          </h2>
          <p className="p90-micro" style={{ marginBottom: "0.75rem" }}>
            Everything I have shipped with. A few have notes attached; most do not,
            and that is the normal case.
          </p>
          <table className="p90-a__table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Slug</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {CATALOGUE.map((skill) => {
                const noted = hasNote(skill);
                return (
                  <tr
                    key={skill.slug}
                    className={noted ? "p90-a__row--note" : "p90-a__row--none"}
                  >
                    <td>
                      {noted ? (
                        <a href={`/90s/skills/${skill.slug}`}>{skill.name}</a>
                      ) : (
                        skill.name
                      )}
                      {noted && skill.summary ? (
                        <div className="p90-a__summary">{skill.summary}</div>
                      ) : null}
                    </td>
                    <td className="p90-a__slug">{skill.slug}</td>
                    <td
                      className={
                        noted ? "p90-a__status--note" : "p90-a__status--none"
                      }
                    >
                      {noted ? `NOTE${skill.updated ? ` · ${skill.updated}` : ""}` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </Stage>
  );
}
