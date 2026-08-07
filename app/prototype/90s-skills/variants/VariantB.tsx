import {
  CATALOGUE,
  CATEGORY_ORDER,
  hasNote,
  iconFor,
  PUBLISH_SET,
} from "../stubCatalogue";
import Stage from "./Stage";

/**
 * B — TILE WALL BY CATEGORY.
 * Carries the modern presentation's icon tiles across into period bevels, and
 * groups them by category. This variant exists to put the deferred `category`
 * field on trial: if the groups do not visibly help, the field does not ship.
 */
export default function VariantB() {
  return (
    <Stage>
      <section id="skills" className="p90-pane" aria-labelledby="b-skills-h">
        <div className="p90-pane__bar">
          <span>SKILLS.EXE — TILE VIEW</span>
          <span>
            {CATALOGUE.length} tiles · {PUBLISH_SET.length} clickable
          </span>
        </div>
        <div className="p90-legend">
          <span>
            <b>magenta bevel</b> = note attached, tile is a link
          </span>
          <span>
            <b>green bevel</b> = listed only
          </span>
        </div>
        <div className="p90-pane__body">
          <h2 id="b-skills-h" className="p90-radical" style={{ fontSize: "1.5rem" }}>
            Skills
          </h2>
          {CATEGORY_ORDER.map((category) => {
            const group = CATALOGUE.filter((s) => s.category === category);
            if (group.length === 0) return null;
            const noted = group.filter(hasNote).length;
            return (
              <div className="p90-b__group" key={category}>
                <h3 className="p90-b__group-head">
                  {category}
                  <span>
                    {group.length} · {noted} with notes
                  </span>
                </h3>
                <div className="p90-b__wall">
                  {group.map((skill) => {
                    const Icon = iconFor(skill.name);
                    const noteHere = hasNote(skill);
                    const inner = (
                      <>
                        {Icon ? <Icon aria-hidden="true" /> : null}
                        <span>{skill.name}</span>
                        {noteHere ? (
                          <span className="p90-b__tile-flag">NOTE ►</span>
                        ) : null}
                      </>
                    );
                    return noteHere ? (
                      <a
                        key={skill.slug}
                        className="p90-b__tile p90-b__tile--note"
                        href={`/90s/skills/${skill.slug}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        key={skill.slug}
                        className="p90-b__tile p90-b__tile--plain"
                      >
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Stage>
  );
}
