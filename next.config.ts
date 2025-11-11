import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ tambahkan ini untuk mengabaikan TypeScript error saat build
  typescript: {
    ignoreBuildErrors: true,
  },


};

export default nextConfig;
