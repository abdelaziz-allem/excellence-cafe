import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Menu photos uploaded from the dashboard (DigitalOcean Spaces)
      { protocol: "https", hostname: "*.digitaloceanspaces.com" },
    ],
  },
  // Native/WASM image libs used by the upload action — load from node_modules, don't bundle
  serverExternalPackages: ["sharp", "heic-convert"],
  experimental: {
    // Menu photos are uploaded through server actions (default limit is 1MB)
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default nextConfig;
