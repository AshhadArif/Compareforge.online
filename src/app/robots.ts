import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Any URL carrying a query string — shareable tool/comparison result states are
          // also marked noindex client-side, so parameterised variants never compete with
          // the clean canonical URL in the index.
          "/*?",
          "/api/",
          "/admin/",
        ],
      },
    ],
    sitemap: "https://compareforge.online/sitemap.xml",
  };
}
