import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "huellasdigitalcms-production.up.railway.app",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
