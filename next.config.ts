import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonical host is www
      {
        source: "/:path*",
        has: [{ type: "host", value: "jainilchauhan.com" }],
        destination: "https://www.jainilchauhan.com/:path*",
        permanent: true,
      },
      // Removed / renamed pages
      { source: "/field-notes", destination: "/ai-notes", permanent: true },
      { source: "/markets", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
