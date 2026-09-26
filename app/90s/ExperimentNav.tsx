import styles from "./nineties.module.css";

const NAVIGATION_ITEMS = [
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * The experiment nav. The hub links to its own sections; a nested route links
 * back to `/90s#…` so the reader is never a dead end.
 */
export function ExperimentNav({ hrefBase = "" }: { hrefBase?: string }) {
  return (
    <nav className={styles.navigation} aria-label="Experiment sections">
      {NAVIGATION_ITEMS.map((item) => (
        <a
          className={styles.navigationLink}
          href={`${hrefBase}#${item.id}`}
          key={item.id}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
