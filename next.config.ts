import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ tambahkan ini untuk mengabaikan TypeScript error saat build
  typescript: {
    ignoreBuildErrors: true,
  },

  // (opsional) bisa juga tambahkan ini untuk melewati lint error di Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
