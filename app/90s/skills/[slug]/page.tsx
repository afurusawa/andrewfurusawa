import { notFound } from "next/navigation";
import {
  getPublishedNoteSlugs,
  getRenderedSkillNote,
} from "../../../lib/skillCatalogue";
import { BACK_TO_DIRECTORY } from "../../copy";
import { ninetiesNoteMetadata } from "../../metadata";
import { NoteShell } from "../../NoteShell";
import styles from "../../nineties.module.css";

/** Only the publish set is routable; an unknown slug 404s instead of rendering. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const note = await getRenderedSkillNote((await params).slug);

  if (!note) {
    return {};
  }

  return ninetiesNoteMetadata(note);
}

export default async function SkillNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const note = await getRenderedSkillNote((await params).slug);

  if (!note) {
    notFound();
  }

  return (
    <NoteShell windowPath={`C:\\SKILLS\\${note.slug.toUpperCase()}.NOTE`}>
      <nav className={styles.noteBreadcrumb} aria-label="Breadcrumb">
        <a href="/90s">Home</a>
        <span aria-hidden="true">/</span>
        <a href="/90s#skills">Skills</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{note.name}</span>
      </nav>

      <header className={styles.noteHead}>
        <h1 className={styles.noteHeading}>{note.name}</h1>
        <p className={styles.noteSummary}>{note.summary}</p>
        {note.updated ? (
          <p className={styles.noteUpdated}>Updated {note.updated}</p>
        ) : null}
      </header>

      <div className={styles.noteBody}>
        {/* Sanitized at build time by the note pipeline's rehype-sanitize pass. */}
        <div dangerouslySetInnerHTML={{ __html: note.html }} />
        <a className={styles.noteBack} href="/90s#skills">
          {BACK_TO_DIRECTORY}
        </a>
      </div>
    </NoteShell>
  );
}
