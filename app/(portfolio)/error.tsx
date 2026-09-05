"use client";

/**
 * Error boundary for the modern presentation. Like the 404, it renders inside
 * the portfolio root layout and therefore inside the provider — a visitor who
 * chose dark does not get thrown back to light by a failure.
 */

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div id="record" className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-4xl">Something went wrong</h1>
      <p className="mb-8">The page failed to load.</p>
      <button type="button" onClick={reset} className="underline">
        Try again
      </button>
    </div>
  );
}
