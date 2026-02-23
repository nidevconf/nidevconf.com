import type { NextConfig } from "next";

const basePath = "";

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
