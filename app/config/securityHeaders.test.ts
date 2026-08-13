import { describe, expect, it } from "vitest";
import {
  pathHeaders,
  requiredSecurityHeaderNames,
  securityHeaders,
} from "./securityHeaders";

describe("securityHeaders", () => {
  it("defines the deliberate browser security headers", () => {
    expect(requiredSecurityHeaderNames).toEqual(
      expect.arrayContaining([
        "Content-Security-Policy",
        "X-Content-Type-Options",
        "X-Frame-Options",
        "Referrer-Policy",
        "Permissions-Policy",
        "Strict-Transport-Security",
      ]),
    );
  });

  it("restricts framing and content type sniffing", () => {
    const byKey = Object.fromEntries(
      securityHeaders.map((header) => [header.key, header.value]),
    );

    expect(byKey["X-Content-Type-Options"]).toBe("nosniff");
    expect(byKey["X-Frame-Options"]).toBe("DENY");
    expect(byKey["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
  });

  it("sends X-Robots-Tag on the experiment paths only", () => {
    const bySource = Object.fromEntries(
      pathHeaders.map((entry) => [
        entry.source,
        Object.fromEntries(
          entry.headers.map((header) => [header.key, header.value]),
        ),
      ]),
    );

    expect(bySource["/90s"]["X-Robots-Tag"]).toBe("noindex, nofollow");
    expect(bySource["/90s/:path*"]["X-Robots-Tag"]).toBe("noindex, nofollow");
    expect(bySource["/:path*"]["X-Robots-Tag"]).toBeUndefined();
  });

  it("allows Vercel Speed Insights endpoints in CSP", () => {
    const csp = securityHeaders.find(
      (header) => header.key === "Content-Security-Policy",
    )?.value;

    expect(csp).toContain("https://va.vercel-scripts.com");
    expect(csp).toContain("https://vitals.vercel-insights.com");
  });
});
