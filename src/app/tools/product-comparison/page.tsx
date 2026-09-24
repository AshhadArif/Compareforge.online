import type { Metadata } from "next";
import Link from "next/link";
import ComparisonCard from "@/components/ComparisonCard";
import ProductSelectorSection from "@/components/ProductSelectorSection";
import InteractiveComparison from "@/components/InteractiveComparison";
import ToolShell from "@/components/tools/ToolShell";
import { comparisons } from "@/lib/comparisons";
import { getPopularProducts } from "@/lib/products";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Product Comparison Tool — Compare Phones Side by Side | CompareForge",
  description:
    "Use our free product comparison tool to compare any two smartphones side by side. Display, camera, battery, performance, and software differences highlighted instantly.",
  alternates: {
    canonical: "/tools/product-comparison",
  },
  openGraph: {
    title: "Product Comparison Tool | CompareForge",
    description:
      "Compare any two smartphones side by side with our free interactive tool.",
    url: "https://compareforge.online/tools/product-comparison",
    type: "website",
  },
};

const faq = [
  {
    question: "How do I use the comparison tool?",
    answer:
      "Search for two phones using the selectors, then click Compare Now. You'll see a full side-by-side specification comparison with key differences highlighted. Use the Differences Only toggle to focus on what actually differs.",
  },
  {
    question: "What specifications does the tool compare?",
    answer:
      "The tool compares display, performance, camera, battery, design, storage, connectivity, and software specifications. Each difference is rated by significance (high, medium, low) to help you focus on what matters.",
  },
  {
    question: "Is the comparison tool free?",
    answer:
      "Yes, the comparison tool is completely free to use. There are no accounts, no limits, and no hidden fees.",
  },
  {
    question: "Where does the specification data come from?",
    answer:
      "All specifications are sourced from manufacturers' official product pages and cross-referenced with independent sources. Sources and verification dates are documented on each product page. Missing values are shown as missing — we never invent data.",
  },
  {
    question: "What if I don't know which phones to compare?",
    answer:
      "Use the Product Finder. Answer a few questions about your needs and budget, and it will shortlist matching phones you can then compare side by side.",
  },
];

const methodology = [
  "Specifications come from manufacturer official pages, cross-checked against independent sources where possible.",
  "Differences-only highlighting uses published thresholds (percent, absolute, or categorical) — see the comparison table controls.",
  "Quick interpretations explain what a difference means in practice; they are not hands-on test claims.",
  "Prices shown are manufacturer suggested retail prices (MSRP) and may differ from street prices.",
  "If a value is unverified, it appears as “—” rather than a guess.",
];

const sections = [
  {
    heading: "How to Use This Comparison Tool",
    paragraphs: [
      "Search for both phones in the selectors and hit Compare Now. You get a full specification table across display, performance, camera, battery, design, storage, connectivity and software — with every row that differs highlighted and rated by significance.",
      "Use the Differences Only toggle once you have seen the full picture: it collapses every row where both phones match, leaving the decision-relevant gaps alone. High-significance differences are the ones worth researching; low-significance ones are usually rounding.",
      "The result is shareable as a URL, so you can send a comparison to someone else or return to it later without rebuilding it.",
    ],
  },
  {
    heading: "Reading the Significance Ratings",
    paragraphs: [
      "Each difference is classified as high, medium or low using published thresholds per attribute — percentage gaps for numeric specs like battery capacity, categorical rules for features like wireless charging support.",
      "A high rating means the gap would change the experience for most buyers (a 30% battery capacity difference, an optical zoom lens present on one side only). Low means both products are effectively equivalent on that row (a few grams of weight, a 5% screen-size gap). Ratings are computed from the data, not assigned by hand.",
      "Where one phone lists a value and the other does not, the row is flagged as missing data rather than a difference — an absence of information is not evidence of a gap.",
    ],
  },
  {
    heading: "What the Tool Does Not Claim",
    paragraphs: [
      "This is a specification comparison, not a review. It does not rate photo quality, judge build materials by hand, or predict reliability — we do not run lab tests, and we will not present numbers we did not verify.",
      "Prices shown are MSRP from the source record and may lag current street pricing; check the retailer before purchase. Quick interpretations describe what a specification difference means in practice, based on the documented specs — they are not hands-on test claims.",
    ],
  },
];

export default function ProductComparisonToolPage() {
  const tool = getToolById("product-comparison");
  if (!tool) return null;

  const popular = comparisons.filter((c) => !c.isRoundup).slice(0, 4);
  const popularProducts = getPopularProducts(6);
  const faqSchema = generateFAQSchema(faq);

  return (
    <ToolShell
      tool={tool}
      crumbs={[{ label: "Tools", href: "/tools" }, { label: "Product Comparison" }]}
      intro="Compare any two smartphones side by side. See specifications, key differences, and practical analysis — free, no signup required."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={faqSchema}
    >
      <div className="max-w-2xl mx-auto mb-8">
        <ProductSelectorSection />
      </div>

      <InteractiveComparison />

      <section className="mb-12 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-4">How It Works</h2>
        <ol className="grid sm:grid-cols-3 gap-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </span>
            <span className="text-text-secondary">
              Search and select two phones from our database
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </span>
            <span className="text-text-secondary">
              View full specifications side by side with differences highlighted
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </span>
            <span className="text-text-secondary">
              Toggle Differences Only to focus on what actually matters
            </span>
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Popular Phones</h2>
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
      </section>

      <section className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Popular Comparisons</h2>
          <Link href="/compare" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {popular.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
      </section>
    </ToolShell>
  );
}
