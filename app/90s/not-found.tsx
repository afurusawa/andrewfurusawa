import { NOT_FOUND_HREF, NOT_FOUND_LEAD, NOT_FOUND_LINK } from "./copy";
import { NoteShell } from "./NoteShell";
import styles from "./nineties.module.css";

/**
 * The experiment's own 404, reached by any stray path under /90s. Plain pane
 * inside the shell, and the recovery is the last sentence rather than a bare
 * "here".
 */
export default function NinetiesNotFound() {
  return (
    <NoteShell windowPath="C:\DAEMON\NOT.FOUND">
      <div className={styles.noteBody}>
        <p>
          {NOT_FOUND_LEAD} <a href={NOT_FOUND_HREF}>{NOT_FOUND_LINK}</a>
        </p>
      </div>
    </NoteShell>
  );
}
