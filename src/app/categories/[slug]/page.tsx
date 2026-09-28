import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComparisonCard from "@/components/ComparisonCard";
import CompareHubLinks from "@/components/CompareHubLinks";
import GuideCard from "@/components/GuideCard";
import ProductCard from "@/components/ProductCard";
import { getComparisonsByCategory } from "@/lib/comparisons";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import { guides } from "@/lib/guides";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "smartphones" }, { slug: "foldable-phones" }, { slug: "budget-phones" }];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} Comparisons`,
    description: category.description,
    alternates: {
      canonical: `/categories/${slug}`,
    },
  };
}

const categoryBuyingGuides: Record<string, string> = {
  smartphones:
    "When choosing a smartphone, consider display quality, processor performance, camera capabilities, battery life, and ecosystem. The best phone depends on your priorities — whether that's camera quality, battery life, performance, or value.",
  "foldable-phones":
    "Foldable phones offer larger screens in a pocketable form factor. Consider durability, water resistance, repair costs, software support, and whether you prefer book-style or flip-style designs.",
  "budget-phones":
    "Budget phones have improved significantly. Focus on software update commitment, camera quality, battery life, and display quality. You don't need to spend flagship prices for a great everyday phone.",
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryComparisons = getComparisonsByCategory(slug);
  const categoryProducts = getProductsByCategory(slug === "smartphones" ? "smartphones" : slug);
  const buyingGuide = categoryBuyingGuides[slug] ?? category.description;

  const isBudget = slug === "budget-phones";

  const filteredProducts = isBudget
    ? categoryProducts.filter((p) => (p.pricing.msrp ?? 0) <= 500)
    : categoryProducts;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">{category.name} Comparisons</h1>
        <p className="mt-3 text-text-secondary max-w-3xl">{category.description}</p>
      </div>

      <div className="p-5 bg-bg-secondary rounded-xl mb-8">
        <h2 className="font-semibold text-text mb-2">
          What to Consider When Choosing a {category.name.replace(/s$/, "")}
        </h2>
        <p className="text-sm text-text-secondary">{buyingGuide}</p>
      </div>

      <CompareHubLinks highlight="/compare/phones" />

      {/* Products */}
      {filteredProducts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text">Phones in This Category</h2>
            <Link href="/products" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Comparisons */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Comparisons</h2>
        {categoryComparisons.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {categoryComparisons.map((comparison) => (
              <ComparisonCard key={comparison.slug} comparison={comparison} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-bg-secondary rounded-xl">
            <p className="text-text-secondary">
              No comparisons available in this category yet.
            </p>
            <Link
              href="/compare"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Browse all comparisons
            </Link>
          </div>
        )}
      </section>

      {/* Guides */}
      {guides.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {guides.map((guide) => (
              <GuideCard
                key={guide.slug}
                title={guide.title}
                slug={guide.slug}
                description={guide.description}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
