import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComparisonTable from "@/components/ComparisonTable";
import ComparisonCard from "@/components/ComparisonCard";
import ProductSelectorSection from "@/components/ProductSelectorSection";
import { getProductById, products } from "@/lib/products";
import {
  formatPriceRange,
  formatRange,
  getCrossBrandComparisons,
  summarizeBrand,
} from "@/lib/brand-compare";
import { generateFAQSchema } from "@/lib/schema";
import { Smartphone } from "@/data/types";

export interface BrandVsBrandConfig {
  slug: string;
  h1: string;
  intro: string;
  aliasNote: string;
  brandA: string;
  brandB: string;
  labelA: string;
  labelB: string;
  flagshipA: string;
  flagshipB: string;
  keyDifferences: { title: string; body: string }[];
  preferA: string[];
  preferB: string[];
  faq: { question: string; answer: string }[];
}

function SpecList({ summary, label }: { summary: ReturnType<typeof summarizeBrand>; label: string }) {
  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <h3 className="font-semibold text-text">{label}</h3>
      <p className="text-sm text-text-secondary mt-1">
        {summary.count} phone{summary.count !== 1 ? "s" : ""} published with sourced
        specifications.
      </p>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Starting price range</dt>
          <dd className="font-medium text-text text-right">
            {formatPriceRange(summary.price)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Display size</dt>
          <dd className="font-medium text-text text-right">
            {formatRange(summary.display, "in")}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Battery capacity</dt>
          <dd className="font-medium text-text text-right">
            {formatRange(summary.battery, "mAh")}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Weight</dt>
          <dd className="font-medium text-text text-right">
            {formatRange(summary.weight, "g")}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">OS update commitment</dt>
          <dd className="font-medium text-text text-right">
            {formatRange(summary.updateYears, "years")}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function BrandVsBrandPage({ config }: { config: BrandVsBrandConfig }) {
  const summaryA = summarizeBrand(config.brandA);
  const summaryB = summarizeBrand(config.brandB);
  const flagshipA = getProductById(config.flagshipA);
  const flagshipB = getProductById(config.flagshipB);
  const crossComparisons = getCrossBrandComparisons(config.brandA, config.brandB);
  const faqSchema = generateFAQSchema(config.faq);

  const sharedBrands = [config.brandA, config.brandB];

  function brandModels(summary: ReturnType<typeof summarizeBrand>): Smartphone[] {
    return summary.models;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[{ label: "Comparisons", href: "/compare" }, { label: config.h1 }]}
      />

      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">{config.h1}</h1>
        <p className="mt-3 text-lg text-text-secondary">{config.intro}</p>
        <p className="mt-2 text-sm text-text-secondary">{config.aliasNote}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          Compare {config.labelA} and {config.labelB} Phones
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Pick one model from each side below. The tool builds the full specification table
          from our sourced records — display, performance, camera, battery, design,
          storage, connectivity and software — and marks every row that differs.
        </p>
        <div className="max-w-2xl mx-auto">
          <ProductSelectorSection basePath="/compare/phones" />
        </div>
        <p className="mt-3 text-sm">
          <Link href="/compare/phones" className="text-primary hover:underline">
            Open the full phone comparison tool →
          </Link>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Key Differences</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {config.keyDifferences.map((diff) => (
            <div key={diff.title} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{diff.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{diff.body}</p>
            </div>
          ))}
        </div>
      </section>

      {flagshipA && flagshipB && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-3">
            Flagship Specification Comparison
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
            The current flagships from both brands, read directly from the product records.
            Use the Differences Only switch to collapse matching rows.
          </p>
          <ComparisonTable productA={flagshipA} productB={flagshipB} />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href={`/products/${flagshipA.slug}`} className="text-primary hover:underline">
              {flagshipA.fullName} specs →
            </Link>
            <Link href={`/products/${flagshipB.slug}`} className="text-primary hover:underline">
              {flagshipB.fullName} specs →
            </Link>
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          Every {config.labelA} and {config.labelB} We Publish
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <SpecList summary={summaryA} label={config.brandA} />
          <SpecList summary={summaryB} label={config.brandB} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-2">{config.brandA} models</h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {brandModels(summaryA).map((m) => (
                <li key={m.id}>
                  <Link href={`/products/${m.slug}`} className="text-primary hover:underline">
                    {m.model}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-2">{config.brandB} models</h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {brandModels(summaryB).map((m) => (
                <li key={m.id}>
                  <Link href={`/products/${m.slug}`} className="text-primary hover:underline">
                    {m.model}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 text-sm text-text-secondary">
          Ranges are computed from the {products.length} phone records in the database at
          the time of writing and exclude models where the field is not published.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Who Might Prefer Each</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          These are not recommendations — they are the conditions under which the documented
          differences above point one way. Pick the condition that matches your situation
          and see which side satisfies it.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-2">
              You might lean {config.labelA} if…
            </h3>
            <ul className="space-y-2">
              {config.preferA.map((item) => (
                <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-primary mt-0.5">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-2">
              You might lean {config.labelB} if…
            </h3>
            <ul className="space-y-2">
              {config.preferB.map((item) => (
                <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-primary mt-0.5">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {crossComparisons.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Related Comparisons</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {crossComparisons.map((comparison) => (
              <ComparisonCard key={comparison.slug} comparison={comparison} />
            ))}
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            Comparisons limited to one brand:{" "}
            {sharedBrands.map((brand, i) => (
              <span key={brand}>
                {i > 0 ? " · " : ""}
                {brand}
              </span>
            ))}{" "}
            — full list in the{" "}
            <Link href="/compare" className="text-primary hover:underline">
              comparison library
            </Link>
            .
          </p>
        </section>
      )}

      <section className="mb-12">
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/compare/phones" className="text-primary hover:underline">
            Phone comparison hub →
          </Link>
          <Link href="/compare/phone-size-comparison" className="text-primary hover:underline">
            Phone size comparison →
          </Link>
          <Link href="/best-phones" className="text-primary hover:underline">
            Best phones by specification →
          </Link>
          <Link href="/products" className="text-primary hover:underline">
            Full phone database →
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl">
          {config.faq.map((item) => (
            <div key={item.question} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text mb-2">{item.question}</h3>
              <p className="text-sm text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-5 bg-bg-secondary rounded-xl max-w-3xl">
        <h2 className="text-lg font-semibold text-text mb-2">Methodology and Sources</h2>
        <p className="text-sm text-text-secondary mb-2">
          Brand ranges are computed from the product records currently in the database — not
          from a representative sample and not from estimates. Each record documents its own
          sources and verification date on the product page. We do not run lab tests, do not
          compare image quality, and do not publish scores.
        </p>
        <p className="text-sm text-text-secondary">
          Full method:{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            how we source and verify data
          </Link>
          . Found a mistake?{" "}
          <Link href="/report-an-error" className="text-primary hover:underline">
            report it
          </Link>
          .
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
