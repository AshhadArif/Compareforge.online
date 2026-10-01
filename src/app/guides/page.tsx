import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Research Guides",
  description:
    "Learn about smartphone features, specifications, and buying considerations with our research guides.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Research Guides | CompareForge",
    description:
      "Learn about smartphone features, specifications, and buying considerations with our research guides.",
    url: "https://compareforge.online/guides",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CompareForge Research Guides",
      },
    ],
  },
};

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Guides" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Research Guides</h1>
        <p className="mt-2 text-text-secondary">
          Understand features, specifications, and what matters when choosing a product.
        </p>
        <p className="mt-2 text-sm text-text-secondary max-w-3xl">
          Our guides explain technical concepts in plain language, help you understand
          what specifications actually mean, and provide practical advice for making
          informed purchasing decisions. Each guide links to relevant comparisons so
          you can see how these concepts apply to real products.
        </p>
      </div>

      <h2 className="text-xl font-bold text-text mb-4">All Research Guides</h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <GuideCard
            key={guide.slug}
            title={guide.title}
            slug={guide.slug}
            description={guide.description}
          />
        ))}
      </div>
    </div>
  );
}
