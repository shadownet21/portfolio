import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The root layout lives under app/[locale], so unmatched URLs need a global 404.
  experimental: { globalNotFound: true },
  async redirects() {
    return [{ source: "/", destination: "/fr", permanent: true }];
  },
};

export default nextConfig;
