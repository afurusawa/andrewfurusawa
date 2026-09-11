import type { ReactNode } from "react";
import { HUB_HEADING, NOTE_FOOTER } from "./copy";
import { ExperimentNav } from "./ExperimentNav";
import styles from "./nineties.module.css";

/**
 * The outer shell every note route shares — banner, hub nav, one bordered
 * Document Window, footer. The experiment's 404 wears the same shell, so a
 * missing note lands somewhere that still looks like the place it came from.
 *
 * `windowPath` is the fake DOS path on the window bar: garnish, aria-hidden.
 */
export function NoteShell({
  windowPath,
  children,
}: {
  windowPath: string;
  children: ReactNode;
}) {
  return (
    <main className={styles.stage}>
      <a className={styles.skipLink} href="#note-content">
        Skip to content
      </a>

      <header className={styles.banner}>
        <p className={styles.noteSiteName}>{HUB_HEADING}</p>
      </header>

      <ExperimentNav hrefBase="/90s" current="skills" />

      <article className={styles.noteWindow} id="note-content">
        <div className={styles.noteWindowBar} aria-hidden="true">
          <span>{windowPath}</span>
          <span>□ ×</span>
        </div>
        {children}
      </article>

      <footer className={styles.noteFooter} aria-hidden="true">
        {NOTE_FOOTER}
      </footer>
    </main>
  );
}
