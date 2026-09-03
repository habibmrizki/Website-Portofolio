import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nyzdbfhsrvciscywmkrv.supabase.co",
      },
    ],
  },
  // experimental: {
  //   reactCompiler: false, // ⬅️ Pindahkan ke sini aja
  // },
};

export default nextConfig;
