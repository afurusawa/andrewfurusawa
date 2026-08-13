import styles from "./nineties.module.css";

const NAVIGATION_ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type NavSection = (typeof NAVIGATION_ITEMS)[number]["id"];

/**
 * The experiment nav. The hub links to its own sections and carries the
 * cosmetic counter; a note route links back to `/90s#…` so the reader is never
 * a dead end, and marks the section it came from as current.
 */
export function ExperimentNav({
  hrefBase = "",
  current,
  hitCount,
}: {
  /** `""` on the hub, `"/90s"` from a nested route. */
  hrefBase?: string;
  current?: NavSection;
  hitCount?: string;
}) {
  return (
    <nav className={styles.navigation} aria-label="Experiment sections">
      {NAVIGATION_ITEMS.map((item) => (
        <a
          className={styles.navigationLink}
          href={`${hrefBase}#${item.id}`}
          key={item.id}
          aria-current={item.id === current ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
      {hitCount ? (
        <div className={styles.hitCounter} aria-hidden="true">
          <span>hits</span>
          <span className={styles.hitDigits}>
            {hitCount.split("").map((digit, index) => (
              <span key={`${digit}-${index}`}>{digit}</span>
            ))}
          </span>
        </div>
      ) : null}
    </nav>
  );
}
