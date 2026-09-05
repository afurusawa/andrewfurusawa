import Link from "next/link";

/** Body used by the portfolio presentation's not-found boundary. */
export function NotFoundBody() {
  return (
    <div id="record" className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-4xl">Page not found</h1>
      <p className="mb-8">That page does not exist.</p>
      <Link href="/">Back to the homepage</Link>
    </div>
  );
}
