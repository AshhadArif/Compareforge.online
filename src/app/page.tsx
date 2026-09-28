import type { Metadata } from "next";
import Link from "next/link";
import ComparisonCard from "@/components/ComparisonCard";
import GuideCard from "@/components/GuideCard";
import CompareHubLinks from "@/components/CompareHubLinks";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";
import { getPopularProducts } from "@/lib/products";
import {
  getBuiltTools,
  getFeaturedTools,
  getBuiltToolsByType,
  TOOL_TYPE_LABELS,
  TOOL_TYPE_DESCRIPTIONS,
} from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "CompareForge — Compare Products, Phones & Specs Side by Side",
  description:
    "Free comparison tools for phones, laptops, tablets, monitors, cameras and headphones. Compare specifications side by side, calculate price and percentage differences, and decide with sourced data.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CompareForge — Compare Products, Phones & Specs Side by Side",
    description:
      "Free side-by-side comparison tools for phones, laptops, tablets, monitors, cameras and headphones, with sourced specifications and published formulas.",
    url: "https://compareforge.online",
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

const TYPE_ORDER = ["compare", "calculate", "match", "decide"] as const;

const HOME_FAQ = [
  {
    question: "What tools does CompareForge offer?",
    answer:
      `${getBuiltTools().length} tools across four families: compare products side by side, calculate price/percentage/cost differences, check fit and compatibility, and decide with transparent weighted rankings. They are all free and run in your browser.`,
  },
  {
    question: "How does CompareForge get its information?",
    answer:
      "Specifications are sourced from manufacturer official pages and cross-referenced with independent sources. All sources are documented on each product and comparison page.",
  },
  {
    question: "Does CompareForge test products?",
    answer:
      "We do not run lab tests and do not assign review scores. Comparisons are built from verified specifications, and calculators compute from numbers you enter — each with its formula published.",
  },
  {
    question: "How often is content updated?",
    answer:
      "We update comparisons when new information becomes available, specifications are corrected, or products are discontinued. Each page shows when it was last updated.",
  },
  {
    question: "Can I report an error?",
    answer:
      "Yes. If you find an inaccuracy, please visit our Report an Error page. We review corrections promptly.",
  },
];

export default function HomePage() {
  const featuredComparisons = comparisons.slice(0, 4);
  const featuredGuides = guides.slice(0, 4);
  const popularProducts = getPopularProducts(6);
  const builtTools = getBuiltTools();
  const featuredTools = getFeaturedTools().slice(0, 3);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CompareForge",
    url: "https://compareforge.online",
    description:
      "Interactive comparison and decision tools with sourced data and plain-language explanations.",
    publisher: {
      "@type": "Organization",
      name: "CompareForge",
      url: "https://compareforge.online",
      logo: {
        "@type": "ImageObject",
        url: "https://compareforge.online/og-image.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://compareforge.online/tools?q={search_term_string}",
      },
    },
  };
  const faqSchema = generateFAQSchema(HOME_FAQ);
  const faqItems = HOME_FAQ;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-light to-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text tracking-tight">
            Compare. Decide.
            <br />
            <span className="text-primary">With Better Tools</span>
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            {builtTools.length} free comparison, calculator and decision tools. Compare
            products side by side, calculate real price and percentage differences, check
            fit and compatibility — all backed by sourced data.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {featuredTools.map((tool) => (
              <Link
                key={tool.tool_id}
                href={tool.route.replace(/\/$/, "")}
                className="p-5 bg-white border border-border rounded-xl text-left hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  {TOOL_TYPE_LABELS[tool.type]} tool
                </span>
                <span className="block font-semibold text-text mt-1">{tool.name}</span>
                <span className="block text-sm text-text-secondary mt-1">{tool.problem}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
            >
              Search All {builtTools.length} Tools
            </Link>
            <Link
              href="/tools/product-comparison"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary bg-white border border-primary rounded-lg hover:bg-primary-light transition-colors"
            >
              Compare Two Phones
            </Link>
          </div>
        </div>
      </section>

      {/* Tool families */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-text">Four Families of Tools</h2>
            <p className="mt-2 text-text-secondary">
              Whatever stage of the decision you are at, there is a tool for it
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {TYPE_ORDER.map((type) => {
              const ofType = getBuiltToolsByType(type);
              if (ofType.length === 0) return null;
              return (
                <div key={type} className="p-5 bg-bg-secondary border border-border rounded-xl">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-text">{TOOL_TYPE_LABELS[type]}</h3>
                    <span className="text-xs text-text-light">{ofType.length} tools</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    {TOOL_TYPE_DESCRIPTIONS[type]}
                  </p>
                  <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                    {ofType.slice(0, 5).map((t) => (
                      <li key={t.tool_id}>
                        <Link
                          href={t.route.replace(/\/$/, "")}
                          className="text-primary hover:underline"
                        >
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/tools" className="text-sm font-medium text-primary hover:underline">
              Browse the full directory with search →
            </Link>
          </div>
        </div>
      </section>

      {/* Compare by category */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompareHubLinks title="Compare Products by Category" />
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-text">Popular Phones</h2>
            <p className="mt-2 text-text-secondary">
              The phones people are comparing right now
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="block p-4 bg-white border border-border rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <span className="block text-xs font-medium text-primary">{product.brand}</span>
                <span className="block text-sm font-semibold text-text mt-1">{product.model}</span>
                <span className="block text-xs text-text-light mt-1">
                  {product.pricing.msrp ? `$${product.pricing.msrp.toLocaleString()}` : "TBA"}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium">
            <Link href="/compare/phones" className="text-primary hover:underline">
              Phone comparison tool
            </Link>
            <Link href="/compare/phone-size-comparison" className="text-primary hover:underline">
              Phone size comparison
            </Link>
            <Link href="/best-phones" className="text-primary hover:underline">
              Best phones by specification
            </Link>
            <Link href="/products" className="text-primary hover:underline">
              Full phone database
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-text">Featured Comparisons</h2>
            <p className="mt-2 text-text-secondary">
              Side-by-side analysis of the phones you are researching
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {featuredComparisons.map((comparison) => (
              <ComparisonCard key={comparison.slug} comparison={comparison} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/compare"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              View all comparisons →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / methodology */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-text">How CompareForge Works</h2>
            <p className="mt-2 text-text-secondary">Tools first — content and data support the decision</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-text mb-2">You Choose</h3>
              <p className="text-sm text-text-secondary">
                Pick a tool — compare known options, find a shortlist, or verify what works
                together — and provide your input.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-text mb-2">We Structure</h3>
              <p className="text-sm text-text-secondary">
                Results highlight differences, explain what they mean, and cite sources — no
                marketing fluff, no invented test claims.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-text mb-2">You Decide</h3>
              <p className="text-sm text-text-secondary">
                Follow related tools and guides to go deeper, then choose with clearer
                trade-offs in view.
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 bg-white border border-border rounded-xl sm:flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-text">Sourced data, published formulas</h3>
              <p className="text-sm text-text-secondary mt-1">
                Every specification carries a source and verification date; every calculator
                shows its formula; every ranking shows its weights. No lab tests we did not
                run, no ratings we did not measure.
              </p>
            </div>
            <Link
              href="/methodology"
              className="inline-block mt-3 sm:mt-0 flex-shrink-0 text-sm font-medium text-primary hover:underline"
            >
              Read the methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-text">Research Guides</h2>
            <p className="mt-2 text-text-secondary">
              Understand features, specifications, and what matters when choosing
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <GuideCard
                key={guide.slug}
                title={guide.title}
                slug={guide.slug}
                description={guide.description}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/guides" className="text-sm font-medium text-primary hover:underline">
              View all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-text">{item.question}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {item.question === "Can I report an error?" ? (
                    <>
                      Yes. If you find an inaccuracy, please visit our{" "}
                      <Link href="/report-an-error" className="text-primary hover:underline">
                        Report an Error
                      </Link>{" "}
                      page. We review corrections promptly.
                    </>
                  ) : (
                    item.answer
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
