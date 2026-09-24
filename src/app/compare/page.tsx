import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComparisonCard from "@/components/ComparisonCard";
import { comparisons } from "@/lib/comparisons";
import { generateItemListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Product Comparisons",
  description:
    "Browse all product comparisons on CompareForge. Find side-by-side analysis of specifications, features, and differences.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Product Comparisons | CompareForge",
    description:
      "Browse all product comparisons on CompareForge. Find side-by-side analysis of specifications, features, and differences.",
    url: "https://compareforge.online/compare",
    type: "website",
  },
};

export default function CompareHubPage() {
  const itemList = generateItemListSchema(
    comparisons.map((c) => ({ name: c.title, url: `/compare/${c.slug}` })),
    "Product Comparisons"
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Comparisons" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Product Comparisons</h1>
        <p className="mt-2 text-text-secondary">
          Browse our collection of detailed product comparisons. Each comparison
          provides specifications, analysis, and use-case guidance to help you make
          informed decisions.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {comparisons.map((comparison) => (
          <ComparisonCard key={comparison.slug} comparison={comparison} />
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </div>
  );
}
