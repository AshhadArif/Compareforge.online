import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComparisonCard from "@/components/ComparisonCard";
import UseCaseComparison from "@/components/tools/UseCaseComparison";
import ProductSelectorSection from "@/components/ProductSelectorSection";
import CompareHubLinks from "@/components/CompareHubLinks";
import { comparisons } from "@/lib/comparisons";
import { products } from "@/lib/products";
import type { Smartphone } from "@/data/types";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Best Phones — Compare Specifications, Features and Prices",
  description:
    "A specification-based way to find the best phones: rank by battery capacity, charging speed or update commitment, browse our published roundups, and compare any two side by side.",
  alternates: {
    canonical: "/best-phones",
  },
  openGraph: {
    title: "Best Phones — Compare Specifications, Features and Prices",
    description:
      "Rank phones by documented specifications, browse transparent roundups, and compare any two side by side.",
    url: "https://compareforge.online/best-phones",
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

const FAQ = [
  {
    question: "How does CompareForge decide which phones are best?",
    answer:
      "We do not hand out a single 'best phone' verdict. Instead we rank phones by one documented attribute at a time — battery capacity, charging speed, update commitment — and we publish the criteria behind every roundup. Each ranking is computed from the specifications in our database, and the method is stated on the page.",
  },
  {
    question: "Do you test phones before ranking them?",
    answer:
      "No. CompareForge does not run lab tests, does not take comparison photographs, and does not assign review scores. Everything on this page comes from manufacturer-sourced specifications with documented sources and verification dates.",
  },
  {
    question: "What is the best phone for most people?",
    answer:
      "There is no universal answer, and we will not invent one. The use-case tool above ranks phones against a stated set of criteria — camera hardware, battery capacity, weight, refresh rate, update commitments — and shows its reasons, so you can judge whether its weights match yours.",
  },
  {
    question: "How many phones do you cover?",
    answer:
      "The database currently holds phones across Apple, Samsung, Google, OnePlus, Motorola, Nothing, Asus and Xiaomi, with specifications, sources and verification dates on every product page. The count is shown on the phone comparison hub.",
  },
  {
    question: "Are the prices current?",
    answer:
      "Prices are manufacturer suggested retail prices recorded with a verification date. Street prices change faster than any database, so treat them as a launch reference and confirm with a retailer before buying.",
  },
  {
    question: "What if a specification is missing?",
    answer:
      "It shows as a dash rather than an estimate. Missing values are excluded from the rankings above rather than guessed, which is why a model can appear in one table and not another.",
  },
];

function Leaderboard({
  title,
  description,
  unit,
  rows,
  renderValue,
}: {
  title: string;
  description: string;
  unit: string;
  rows: { product: Smartphone; value: number }[];
  renderValue?: (value: number) => string;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <h3 className="font-semibold text-text">{title}</h3>
      <p className="text-sm text-text-secondary mt-1 mb-3">{description}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-text-secondary">Not published for any model yet.</p>
      ) : (
        <ol className="space-y-2">
          {rows.map((row, i) => (
            <li
              key={row.product.id}
              className="flex items-center justify-between gap-3 text-sm border-b border-border-light pb-2 last:border-0 last:pb-0"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-text-light w-4">{i + 1}</span>
                <Link
                  href={`/products/${row.product.slug}`}
                  className="text-text hover:text-primary truncate"
                >
                  {row.product.fullName}
                </Link>
              </span>
              <span className="font-medium text-primary whitespace-nowrap">
                {renderValue ? renderValue(row.value) : `${row.value} ${unit}`.trim()}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function topBy(
  pick: (p: Smartphone) => number | null,
  limit = 6
): { product: Smartphone; value: number }[] {
  return products
    .map((product) => ({ product, value: pick(product) }))
    .filter((row): row is { product: Smartphone; value: number } =>
      typeof row.value === "number" && Number.isFinite(row.value)
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export default function BestPhonesPage() {
  const battery = topBy((p) => p.battery.capacity);
  const charging = topBy((p) => p.battery.wiredCharging);
  const updates = topBy((p) => p.software.updateCommitment, 8);
  const roundups = comparisons.filter((c) => c.isRoundup);
  const faqSchema = generateFAQSchema(FAQ);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Best Phones" }]} />

      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">Best Phones</h1>
        <p className="mt-3 text-lg text-text-secondary">
          “Best” is only meaningful once you say best at what. This page gives you three
          honest ways to answer it: rank phones by a single documented specification, use a
          weighted tool that shows its own criteria, or read a roundup with the method
          stated up front.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <a href="#rank" className="text-primary hover:underline">
            Rank by specification ↓
          </a>
          <a href="#roundups" className="text-primary hover:underline">
            Published roundups ↓
          </a>
          <Link href="/compare/phones" className="text-primary hover:underline">
            Compare any two phones →
          </Link>
        </div>
      </div>

      <section className="mb-12 p-6 bg-primary-light border border-primary/20 rounded-xl max-w-3xl">
        <h2 className="text-lg font-bold text-text mb-2">How these lists are produced</h2>
        <ul className="space-y-2 text-sm text-text-secondary list-disc pl-5">
          <li>
            Every figure is read from the product records in our database, which are sourced
            from manufacturer specification pages and cross-referenced.
          </li>
          <li>
            We do not run lab tests, do not take comparison photos, and do not assign review
            scores or awards.
          </li>
          <li>
            Each table ranks by exactly one attribute, in the stated direction. Nothing is
            weighted or blended behind the scenes.
          </li>
          <li>
            Models with no published value for that attribute are excluded rather than
            estimated.
          </li>
        </ul>
        <p className="mt-3 text-sm text-text-secondary">
          Full method:{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            our methodology
          </Link>
          .
        </p>
      </section>

      <section id="rank" className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          Rank Phones by Specification
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Three single-attribute rankings, recomputed from the database on every page load.
          A phone topping one of these lists is the largest or fastest on that measure — not
          a better phone overall.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Leaderboard
            title="Largest battery capacity"
            description="Ranked by battery capacity in mAh, as published by the manufacturer."
            unit="mAh"
            rows={battery}
          />
          <Leaderboard
            title="Fastest stated wired charging"
            description="Ranked by wired charging wattage. Charging speed also depends on the charger and heat."
            unit="W"
            rows={charging}
          />
          <Leaderboard
            title="Longest update commitment"
            description="Ranked by stated years of OS updates from launch."
            unit="years"
            rows={updates}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          Best Phone for a Specific Job
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Pick a use case and the tool ranks the database against a fixed set of documented
          attributes — camera hardware, battery capacity, weight, refresh rate, update
          commitments — then lists the reasons behind each placement. The weights are
          published so you can disagree with them.
        </p>
        <div className="max-w-2xl mx-auto">
          <UseCaseComparison />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Compare Before You Decide</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          A shortlist is only useful once you put two of them side by side. Select any two
          models below and the full specification table is built from our sourced records.
        </p>
        <div className="max-w-2xl mx-auto mb-4">
          <ProductSelectorSection basePath="/compare/phones" />
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/compare/phones" className="text-primary hover:underline">
            Phone comparison hub →
          </Link>
          <Link href="/tools/product-finder" className="text-primary hover:underline">
            Product finder (3 questions) →
          </Link>
          <Link href="/tools/decision-matrix" className="text-primary hover:underline">
            Weighted decision matrix →
          </Link>
          <Link href="/products" className="text-primary hover:underline">
            Full phone database →
          </Link>
        </div>
      </section>

      <section id="roundups" className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Published Roundups</h2>
          <Link href="/compare" className="text-sm font-medium text-primary hover:underline">
            All comparisons →
          </Link>
        </div>
        <p className="text-text-secondary text-sm mb-4 max-w-3xl">
          Each roundup states which models it covers, the criteria used and the date it was
          last verified. Where a roundup reaches a conclusion, it is derived from the
          specifications of the models included — not from hands-on testing.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {roundups.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
      </section>

      <CompareHubLinks title="Compare Phones and Other Products" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl">
          {FAQ.map((item) => (
            <div key={item.question} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text mb-2">{item.question}</h3>
              <p className="text-sm text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
