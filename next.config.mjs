/**
 * @type {import('next').NextConfig}
 *
 * Plain JavaScript on purpose: loading a TypeScript config requires the
 * native SWC compiler, which cannot run on hosts with glibc < 2.29
 * (e.g. Hostinger's build servers). An .mjs config loads without it.
 *
 * Set NEXT_OUTPUT=export to build a fully static site (scripts/build-static.mjs);
 * otherwise SSR redirects + security headers apply.
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  ...(isStaticExport
    ? { output: "export" }
    : {
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
      }),
};

export default nextConfig;
