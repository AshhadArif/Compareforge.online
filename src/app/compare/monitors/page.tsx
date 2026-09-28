import type { Metadata } from "next";
import CategoryHubPage from "@/components/CategoryHubPage";
import { getCategoryHub } from "@/data/category-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getCategoryHub("monitors");
  if (!hub) return { title: "Comparison Not Found" };
  return {
    title: hub.title,
    description: hub.description,
    alternates: { canonical: "/compare/monitors" },
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: "https://compareforge.online/compare/monitors",
      type: "website",
      siteName: "CompareForge",
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "CompareForge — Comparison & Decision Tools",
        },
      ],
    },
  };
}

export default function MonitorsComparisonPage() {
  const hub = getCategoryHub("monitors");
  if (!hub) return null;
  return <CategoryHubPage hub={hub} />;
}
