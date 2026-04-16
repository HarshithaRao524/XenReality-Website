import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ["motion"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
