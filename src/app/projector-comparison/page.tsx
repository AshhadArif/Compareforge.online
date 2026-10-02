import type { Metadata } from "next";
import CategoryHubPage from "@/components/CategoryHubPage";
import { getCategoryHub, hubPath } from "@/data/category-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getCategoryHub("projectors");
  if (!hub) return { title: "Comparison Not Found" };
  const path = hubPath(hub);
  return {
    title: hub.title,
    description: hub.description,
    alternates: { canonical: path },
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: `https://compareforge.online${path}`,
      type: "website",
      siteName: "CompareForge",
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "CompareForge - Comparison & Decision Tools",
        },
      ],
    },
  };
}

export default function ProjectorsComparisonPage() {
  const hub = getCategoryHub("projectors");
  if (!hub) return null;
  return <CategoryHubPage hub={hub} />;
}
