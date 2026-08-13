import type { NextConfig } from "next";
import { pathHeaders } from "./app/config/securityHeaders";

const nextConfig: NextConfig = {
  async headers() {
    return pathHeaders;
  },
};

export default nextConfig;
