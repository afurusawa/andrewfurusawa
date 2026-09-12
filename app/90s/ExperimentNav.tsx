import styles from "./nineties.module.css";

const NAVIGATION_ITEMS = [
  { id: "welcome", label: "Welcome" },
  { id: "what", label: "What I do" },
  { id: "where", label: "Where I help" },
  { id: "work", label: "Work" },
  { id: "how", label: "How I work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type NavSection = (typeof NAVIGATION_ITEMS)[number]["id"];

/**
 * The experiment nav. The hub links to its own sections; a note route links
 * back to `/90s#…` so the reader is never a dead end, and marks the section
 * it came from as current.
 */
export function ExperimentNav({
  hrefBase = "",
  current,
}: {
  /** `""` on the hub, `"/90s"` from a nested route. */
  hrefBase?: string;
  current?: NavSection;
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
    </nav>
  );
}
