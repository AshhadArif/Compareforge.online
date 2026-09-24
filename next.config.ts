import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/comparisons",
        destination: "/compare",
        permanent: true,
      },
      {
        source: "/comparisons/:slug",
        destination: "/compare/:slug",
        permanent: true,
      },
      {
        source: "/tools/phone-comparison",
        destination: "/tools/product-comparison",
        permanent: true,
      },
      {
        source: "/tools/phone-comparison/:path*",
        destination: "/tools/product-comparison/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
