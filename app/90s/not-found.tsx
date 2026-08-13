import { NOTE_MISSING_LEAD, NOTE_MISSING_LINK } from "./copy";
import { NoteShell } from "./NoteShell";
import styles from "./nineties.module.css";

/**
 * The experiment's own 404, reached by an unknown note slug or any other stray
 * path under /90s. Same shell as a note, plain pane inside, and the recovery is
 * the last sentence rather than a bare "here".
 */
export default function NinetiesNotFound() {
  return (
    <NoteShell windowPath="C:\SKILLS\NOT.FOUND">
      <div className={styles.noteBody}>
        <p>
          {NOTE_MISSING_LEAD} <a href="/90s#skills">{NOTE_MISSING_LINK}</a>
        </p>
      </div>
    </NoteShell>
  );
}
