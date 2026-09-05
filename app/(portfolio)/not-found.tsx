import { NotFoundBody } from "./NotFoundBody";

/**
 * 404 for routes inside the modern presentation. It renders inside this
 * group's root layout, so it gets the provider, the type stack, and the theme
 * control. The root `not-found` handles URLs that match no route at all.
 */

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundBody />;
}
