import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComparisonTable from "@/components/ComparisonTable";
import ProductCard from "@/components/ProductCard";
import ComparisonCard from "@/components/ComparisonCard";
import { comparisons, getComparisonBySlug, getRelatedComparisons } from "@/lib/comparisons";
import { getProductById } from "@/lib/products";
import { getGuideBySlug } from "@/lib/guides";
import { Smartphone } from "@/data/types";
import {
  generateFAQSchema,
  generateArticleSchema,
} from "@/lib/schema";

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return { title: "Comparison Not Found" };
  return {
    title: comparison.title,
    description: comparison.metaDescription,
    alternates: {
      canonical: `/compare/${slug}`,
    },
    openGraph: {
      title: `${comparison.title} | CompareForge`,
      description: comparison.metaDescription,
      url: `https://compareforge.online/compare/${slug}`,
      type: "article",
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
    robots: { index: true, follow: true },
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const comparisonProducts = comparison.productIds
    .map((id) => getProductById(id))
    .filter((p): p is Smartphone => Boolean(p));

  const productA = comparisonProducts[0];
  const productB = comparisonProducts[1];

  const relatedComparisons = getRelatedComparisons(slug, 3);
  const relatedGuides = comparison.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))
    .slice(0, 2);

  const faqSchema = generateFAQSchema(comparison.faq);
  const articleSchema = generateArticleSchema({
    title: comparison.title,
    description: comparison.metaDescription,
    url: `/compare/${slug}`,
    dateModified: comparison.lastUpdated,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Comparisons", href: "/compare" },
          { label: comparison.title },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">{comparison.title}</h1>
      <p className="text-text-secondary mb-8 max-w-3xl">{comparison.intro}</p>

      {/* Product cards */}
      {comparisonProducts.length >= 2 && (
        <section className="mb-10">
          <div
            className={
              comparison.isRoundup
                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "grid sm:grid-cols-2 gap-6"
            }
          >
            {(comparison.isRoundup ? comparisonProducts : comparisonProducts.slice(0, 2)).map(
              (p) => (
                <ProductCard key={p.id} product={p} />
              ),
            )}
          </div>
        </section>
      )}

      {/* Quick Verdict */}
      <section className="mb-10 p-6 bg-primary-light rounded-xl border border-primary/20">
        <h2 className="text-lg font-bold text-text mb-2">Quick Verdict</h2>
        <p className="text-text-secondary">{comparison.quickVerdict}</p>
      </section>

      {/* Interactive comparison table */}
      {productA && productB && !comparison.isRoundup && (
        <section className="mb-12">
          <ComparisonTable productA={productA} productB={productB} />
        </section>
      )}

      {/* Key Differences */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Key Differences</h2>
        <div className="space-y-4">
          {comparison.keyDifferences.map((diff, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-text">{diff.feature}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    diff.significance === "high"
                      ? "bg-error-light text-error"
                      : diff.significance === "medium"
                        ? "bg-warning-light text-warning"
                        : "bg-bg-secondary text-text-light"
                  }`}
                >
                  {diff.significance} impact
                </span>
              </div>
              {comparison.isRoundup ? (
                <div className="space-y-2 mb-2 text-sm">
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <span className="text-text">{diff.productAValue}</span>
                  </div>
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <span className="text-text">{diff.productBValue}</span>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3 mb-2 text-sm">
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <span className="block text-xs text-text-light">
                      {productA?.model ?? "Product A"}
                    </span>
                    <span className="text-text">{diff.productAValue}</span>
                  </div>
                  <div className="bg-bg-secondary rounded-lg p-3">
                    <span className="block text-xs text-text-light">
                      {productB?.model ?? "Product B"}
                    </span>
                    <span className="text-text">{diff.productBValue}</span>
                  </div>
                </div>
              )}
              <p className="text-sm text-text-secondary">{diff.interpretation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Implications */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">What This Means in Practice</h2>
        <div className="bg-bg-secondary rounded-xl p-5">
          <p className="text-sm text-text-secondary leading-relaxed">
            {comparison.practicalImplications}
          </p>
        </div>
      </section>

      {/* Use-Case Recommendations */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Which Phone Suits Your Needs?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {comparison.useCaseRecommendations.map((rec, i) => {
            const recProduct = getProductById(rec.recommended);
            return (
              <div key={i} className="bg-white border border-border rounded-xl p-5">
                <h3 className="font-semibold text-text mb-1">{rec.scenario}</h3>
                <p className="text-sm font-medium text-primary mb-1">
                  → {recProduct?.fullName ?? rec.recommended}
                </p>
                <p className="text-sm text-text-secondary">{rec.reason}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Considerations */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Important Considerations</h2>
        <div className="bg-bg-secondary rounded-xl p-5">
          <ul className="space-y-2">
            {comparison.considerations.map((item, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-warning mt-0.5">!</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      {comparison.faq.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {comparison.faq.map((item, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-5">
                <h3 className="font-semibold text-text mb-2">{item.question}</h3>
                <p className="text-sm text-text-secondary">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Methodology */}
      <section className="mb-12 p-5 bg-bg-secondary rounded-xl">
        <h2 className="text-lg font-semibold text-text mb-2">Methodology and Sources</h2>
        <p className="text-sm text-text-secondary mb-2">
          Specifications are sourced from manufacturers&apos; official product pages and
          cross-referenced with independent sources. We document where specifications
          come from and acknowledge limitations.
        </p>
        <p className="text-sm text-text-secondary">
          Last updated: {comparison.lastUpdated}. Prices and availability may vary by
          region. If you find an error, please{" "}
          <Link href="/report-an-error" className="text-primary hover:underline">
            report it here
          </Link>
          .
        </p>
      </section>

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Related Comparisons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedComparisons.map((rc) => (
              <ComparisonCard key={rc.slug} comparison={rc} />
            ))}
          </div>
        </section>
      )}

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="block bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-medium text-accent bg-accent-light px-2 py-0.5 rounded-full">
                  Guide
                </span>
                <h3 className="font-semibold text-text mt-2">{guide.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </div>
  );
}
