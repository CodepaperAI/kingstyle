import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "amaliproperties.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "kingstylehomes.com.au",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "kingstylehomes.com.au",
        pathname: "/wp-content/themes/**",
      },
    ],
  },
};

export default nextConfig;
