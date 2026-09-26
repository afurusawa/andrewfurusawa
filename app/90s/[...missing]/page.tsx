import { notFound } from "next/navigation";

/**
 * Every unknown path under /90s. This catch-all renders instead of letting the
 * router serve the global 404, and calling notFound() hands the request to
 * app/90s/not-found.tsx with a 404 status.
 */
export default function NinetiesMissing(): never {
  notFound();
}
