import type { NextConfig } from "next";

// Change to "" when switching to a custom domain
const basePath = "/nidevconf.com";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sessionize.com",
      },
    ],
  },
};

export default nextConfig;
