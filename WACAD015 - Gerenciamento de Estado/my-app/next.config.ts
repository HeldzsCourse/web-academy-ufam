import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ranekapi.origamid.dev",
      },
    ]
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
