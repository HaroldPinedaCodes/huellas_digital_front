import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "huellasdigitalcms-production.up.railway.app",
    ],
  },
  /* config options here */
};

export default nextConfig;
