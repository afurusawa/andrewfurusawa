/**
 * Fallback for a URL that matches no presentation route. The presentation
 * roots own their own not-found and error boundaries; this fallback stays
 * dependency-free so its module cannot pull portfolio fonts or theme code into
 * the experiment's document.
 */

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
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
