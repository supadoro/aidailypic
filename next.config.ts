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
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "resource.miricanvas.com",
      },
      {
        protocol: "https",
        hostname: "typefully.com",
      },
      {
        protocol: "https",
        hostname: "buffer.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "imgproxy.gamma.app",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "api.typedream.com",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        protocol: "https",
        hostname: "cdn.channel.io",
      },
      {
        protocol: "https",
        hostname: "static.tosspayments.com",
      },
    ],
  },
};

export default nextConfig;
