export const SITE_URL = "https://andrewfurusawa.dev";
export const SITE_NAME = "Andrew Furusawa";
export const SITE_TITLE =
  "Andrew Furusawa · Product & Software Delivery Consulting";
export const SITE_DESCRIPTION =
  "I take software products from concept to production in weeks, not quarters, with the engineering discipline a full team would run.";

export function absoluteUrl(path = "/"): string {
  if (path === "" || path === "/") {
    return SITE_URL;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
