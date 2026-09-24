import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Any tool URL with a query string (shareable result states) — also noindexed client-side
          "/tools/*?",
          "/api/",
          "/admin/",
        ],
      },
    ],
    sitemap: "https://compareforge.online/sitemap.xml",
  };
}
