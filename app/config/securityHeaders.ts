export type SecurityHeader = {
  key: string;
  value: string;
};

/**
 * Browser security headers applied to every path, plus experiment
 * discoverability headers attached only to `/90s` and `/90s/:path*`.
 * CSP is intentionally compatible with Next.js App Router assets and
 * Vercel Speed Insights reporting endpoints.
 */
export const securityHeaders: SecurityHeader[] = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

export const experimentRobotsHeader: SecurityHeader = {
  key: "X-Robots-Tag",
  value: "noindex, nofollow",
};

export const pathHeaders: {
  source: string;
  headers: SecurityHeader[];
}[] = [
  {
    source: "/:path*",
    headers: securityHeaders,
  },
  {
    source: "/90s",
    headers: [experimentRobotsHeader],
  },
  {
    source: "/90s/:path*",
    headers: [experimentRobotsHeader],
  },
];

export const requiredSecurityHeaderNames = securityHeaders.map(
  (header) => header.key,
);
