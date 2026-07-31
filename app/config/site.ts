export const SITE_URL = "https://andrewfurusawa.dev";
export const SITE_NAME = "Andrew Furusawa";
export const SITE_TITLE = "Andrew Furusawa - personal website";
export const SITE_DESCRIPTION =
  "Portfolio website for Andrew Furusawa, front-end developer";

export function absoluteUrl(path = "/"): string {
  if (path === "" || path === "/") {
    return SITE_URL;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
