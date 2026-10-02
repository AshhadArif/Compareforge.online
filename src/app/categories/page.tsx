import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";
import { categories, products } from "@/lib/products";
import { getBuiltTools } from "@/lib/tools";
import { COMPARE_HUBS } from "@/components/CompareHubLinks";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Product Comparison Categories — Browse by Product Type",
  description:
    "Browse product comparison categories on CompareForge: phones, laptops, tablets, monitors, cameras, headphones, CPUs, GPUs, TVs, smartwatches, projectors and printers, plus smartphone categories.",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "Categories | CompareForge",
    description:
      "Browse product comparison categories on CompareForge. Find comparisons organized by product type.",
    url: "https://compareforge.online/categories",
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

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Categories" }]} />

      <h1 className="text-3xl font-bold text-text mb-2">Categories</h1>
      <p className="text-text-secondary mb-2">
        Browse product comparisons by category.
      </p>
      <p className="text-sm text-text-secondary mb-8 max-w-3xl">
        Each category groups related product comparisons together, making it easy to
        find the comparison you need.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = comparisons.filter((c) => c.category === cat.slug).length;
          const productCount = products.filter((p) => p.category === cat.slug).length;

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="block bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-text mb-2">{cat.name}</h2>
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {cat.description}
              </p>
              <span className="text-xs font-medium text-primary">
                {count} comparison{count !== 1 ? "s" : ""}
                {productCount > 0 ? ` · ${productCount} phone${productCount !== 1 ? "s" : ""}` : ""}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-3">Not sure where to start?</h2>
        <p className="text-sm text-text-secondary mb-4 max-w-3xl">
          Categories group comparisons, but the tools work on any question — compare two
          phones directly, find one that fits your needs, or calculate a price or percentage
          difference with the calculators.
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/tools" className="text-primary hover:underline">
            Browse all {getBuiltTools().length} tools →
          </Link>
          <Link href="/compare" className="text-primary hover:underline">
            Product comparison →
          </Link>
          <Link href="/guides" className="text-primary hover:underline">
            Buying guides →
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-text mb-4">Compare by Product Type</h2>
        <p className="text-sm text-text-secondary mb-4 max-w-3xl">
          Every comparison hub runs on the same principle: a working tool first, then the
          specification context that makes the result readable.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPARE_HUBS.map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className="block p-5 bg-white border border-border rounded-xl hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-text">{hub.label}</span>
              <span className="block text-sm text-text-secondary mt-1">{hub.blurb}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-text mb-4">All Guides</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-medium text-accent bg-accent-light px-2 py-0.5 rounded-full">
                Guide
              </span>
              <h3 className="font-semibold text-text mt-2 text-sm">{g.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
