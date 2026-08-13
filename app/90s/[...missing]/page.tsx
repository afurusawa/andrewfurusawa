import { notFound } from "next/navigation";

/**
 * Every unknown path under /90s, including an unknown note slug. The note route
 * locks its params at build time (`dynamicParams = false`), and that rejection
 * happens in the router, before any segment renders — so it would serve the
 * global 404 rather than the experiment's. This catch-all renders instead, and
 * calling notFound() here hands the request to app/90s/not-found.tsx with a 404
 * status, keeping the experiment inside its own shell.
 */
export default function NinetiesMissing(): never {
  notFound();
}
