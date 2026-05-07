import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "content-management-files.canva.com",
      },
      {
        protocol: "https",
        hostname: "p16-seeyou-sg.ibyteimg.com",
      },
      {
        protocol: "https",
        hostname: "tally.so",
      },
      {
        protocol: "https",
        hostname: "help.openai.com",
      },
      {
        protocol: "https",
        hostname: "static.intercomassets.com",
      },
    ],
  },
};

export default nextConfig;
