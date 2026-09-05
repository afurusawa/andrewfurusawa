/**
 * 404 for a URL that matches no presentation route. Multiple root layouts
 * mean there is no shared `app/layout.tsx` to wrap `not-found.tsx`, so Next
 * would inject DefaultLayout and nest a second `<html>` — a hydration
 * mismatch. `global-not-found` owns the document instead.
 *
 * Stays dependency-free so this module cannot pull portfolio fonts or theme
 * code into the experiment's document.
 */

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Page not found</h1>
          <p>That page does not exist.</p>
          <a href="/">Back to the homepage</a>
        </main>
      </body>
    </html>
  );
}
