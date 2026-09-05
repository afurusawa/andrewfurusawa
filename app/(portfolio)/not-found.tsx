import { NotFoundBody } from "./NotFoundBody";

/**
 * 404 for routes inside the modern presentation. It renders inside this
 * group's root layout, so it gets the provider, the type stack, and the theme
 * control. Unmatched URLs (no presentation route) use `global-not-found`.
 */

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundBody />;
}
