import type { ReactNode } from "react";
import { HUB_HEADING, NOTE_FOOTER, WELCOME_TAG } from "./copy";
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
    <main className={styles.stage} id="main">
      <div className={styles.noteShell}>
        <header className={styles.noteBanner}>
          <p className={styles.tag} aria-hidden="true">
            {WELCOME_TAG}
          </p>
          <p className={styles.wordmark}>{HUB_HEADING}</p>
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
      </div>
    </main>
  );
}
