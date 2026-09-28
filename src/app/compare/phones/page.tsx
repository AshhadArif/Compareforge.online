import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DynamicNoIndex from "@/components/tools/DynamicNoIndex";
import ProductSelectorSection from "@/components/ProductSelectorSection";
import InteractiveComparison from "@/components/InteractiveComparison";
import ComparisonCard from "@/components/ComparisonCard";
import GuideCard from "@/components/GuideCard";
import CompareHubLinks from "@/components/CompareHubLinks";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";
import { products } from "@/lib/products";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Phone Comparison — Compare Phones Side by Side",
  description:
    "Compare phones side by side: display, processor, camera, battery, dimensions and software for any two models in our database. Free phone comparison tool with differences highlighted.",
  alternates: {
    canonical: "/compare/phones",
  },
  openGraph: {
    title: "Phone Comparison — Compare Phones Side by Side",
    description:
      "Compare any two phones side by side across display, performance, camera, battery, design and software.",
    url: "https://compareforge.online/compare/phones",
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
    question: "How do I compare two phones?",
    answer:
      "Search for both models in the selectors above and press Compare Now. The tool builds a side-by-side table across display, performance, camera, battery, design, storage, connectivity and software, and marks every row that differs.",
  },
  {
    question: "What specifications should I compare?",
    answer:
      "Start with the attributes that change how a phone is used: display size and brightness, chipset and RAM, camera configuration, battery capacity and charging, dimensions and weight, and the software update commitment. Our comparison table groups these so you can scan one area at a time.",
  },
  {
    question: "Can I compare phone sizes?",
    answer:
      "Yes. Height, width, depth and weight are part of the specification table, and the dedicated phone size comparison draws both phones to scale and reports the percentage difference on each axis.",
  },
  {
    question: "Can I compare camera specifications?",
    answer:
      "Yes. Main, ultrawide, telephoto and front cameras are compared by megapixel count, aperture, optical zoom and video capability. We compare documented camera specifications only — we do not publish photo-quality scores, because we do not run camera tests.",
  },
  {
    question: "How does the comparison tool work?",
    answer:
      "Each specification is read from the product records in our database, which are sourced from manufacturer pages and cross-referenced with independent sources. Differences are classified as high, medium or low significance using published thresholds per attribute. Missing values appear as a dash rather than a guess.",
  },
  {
    question: "Is the phone comparison free?",
    answer:
      "Yes. There is no account, no limit and no cost. Comparisons are shareable as a URL so you can send them or come back to them later.",
  },
];

const SPEC_GROUPS: { title: string; items: string; href?: string }[] = [
  {
    title: "Display",
    items:
      "Size in inches, resolution, panel type, refresh rate, peak brightness, HDR support and glass protection.",
  },
  {
    title: "Processor and memory",
    items:
      "Chipset, fabrication process, CPU core count, GPU, RAM capacity and RAM type.",
  },
  {
    title: "Storage",
    items: "Available capacities, whether it is expandable, and the storage standard used.",
  },
  {
    title: "Camera",
    items:
      "Main, ultrawide, telephoto and front sensors with megapixels, aperture, optical zoom and maximum video resolution and frame rate.",
  },
  {
    title: "Battery and charging",
    items:
      "Capacity in mAh, wired charging wattage, wireless charging wattage and reverse wireless support.",
  },
  {
    title: "Design and dimensions",
    items:
      "Height, width, depth, weight, frame and back materials, water resistance rating and colour options.",
  },
  {
    title: "Connectivity",
    items:
      "5G support, Wi-Fi generation, Bluetooth version, NFC, USB standard and satellite messaging.",
  },
  {
    title: "Software",
    items:
      "Launch operating system, manufacturer skin, OS update years and security update years.",
  },
];

export default function PhoneComparisonPage() {
  const nonRoundups = comparisons.filter((c) => !c.isRoundup);
  const featuredComparisons = nonRoundups.slice(0, 6);
  const featuredGuides = guides.slice(0, 4);
  const faqSchema = generateFAQSchema(FAQ);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DynamicNoIndex />
      <Breadcrumbs
        items={[{ label: "Comparisons", href: "/compare" }, { label: "Phone Comparison" }]}
      />

      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">Phone Comparison</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Pick any two phones from our database and see them side by side — display,
          processor, camera, battery, dimensions, connectivity and software, with every
          difference highlighted and rated by significance.
        </p>
        <p className="mt-3 text-sm text-text-secondary">
          {products.length} phones are currently published with sourced specifications.
          Prefer to read first? Jump to{" "}
          <Link href="#phone-specifications" className="text-primary hover:underline">
            the specification categories
          </Link>
          ,{" "}
          <Link href="/compare/phone-size-comparison" className="text-primary hover:underline">
            phone size comparison
          </Link>
          , or{" "}
          <Link href="#faq" className="text-primary hover:underline">
            the questions below
          </Link>
          .
        </p>
      </div>

      {/* Tool first — the comparison interface stays above the explanatory content */}
      <section id="compare-two-phones" className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">
          Compare Two Phones Side by Side
        </h2>
        <div className="max-w-2xl mx-auto mb-8">
          <ProductSelectorSection basePath="/compare/phones" />
        </div>
        <InteractiveComparison basePath="/compare/phones" />
        <p className="text-sm text-text-secondary max-w-3xl">
          Results appear above as a full specification table. Use the Differences Only
          switch to collapse matching rows, and open any product name for the full record
          with sources.
        </p>
      </section>

      {/* Specification categories */}
      <section id="phone-specifications" className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Compare Phone Specifications</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          The comparison table covers the specification groups below. Only attributes
          present in our product records are shown — if a value has not been verified, the
          cell reads “—” instead of an estimate.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {SPEC_GROUPS.map((group) => (
            <div key={group.title} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{group.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{group.items}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          Every value carries a source and a verification date on the{" "}
          <Link href="/products" className="text-primary hover:underline">
            phone database
          </Link>
          . See{" "}
          <Link href="/guides/how-to-compare-product-specifications" className="text-primary hover:underline">
            how to compare product specifications
          </Link>{" "}
          for a walkthrough of reading a spec sheet.
        </p>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Compare Phone Features</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Features are compared as present, absent or unconfirmed rather than as a score.
          The current feature set includes HDR support, expandable storage, reverse
          wireless charging, NFC, 5G, satellite messaging, water resistance and the
          manufacturer&apos;s on-device AI features.
        </p>
        <div className="bg-bg-secondary rounded-xl p-5 max-w-3xl">
          <p className="text-sm text-text-secondary">
            Where one phone lists a feature and the other does not, the row is flagged as
            one-sided rather than as a win. Absence of information is not evidence of
            absence — if you spot a gap, please{" "}
            <Link href="/report-an-error" className="text-primary hover:underline">
              report it
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Size */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Phone Size Comparison</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Height, width, depth and weight are part of every product record, so the size
          difference between two phones is a number rather than an impression. For a
          visual answer, the size comparison draws both handsets to the same scale and
          reports the percentage difference on each axis plus the front-face area.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          <Link
            href="/compare/phone-size-comparison"
            className="block p-5 bg-white border border-border rounded-xl hover:shadow-md transition-shadow"
          >
            <span className="font-semibold text-text">Phone Size Comparison</span>
            <span className="block text-sm text-text-secondary mt-1">
              To-scale drawing plus width, height, depth and weight differences.
            </span>
          </Link>
          <Link
            href="/tools/dimension-comparison"
            className="block p-5 bg-white border border-border rounded-xl hover:shadow-md transition-shadow"
          >
            <span className="font-semibold text-text">Dimension Comparison tool</span>
            <span className="block text-sm text-text-secondary mt-1">
              Compare any two objects, including items you measure yourself.
            </span>
          </Link>
        </div>
      </section>

      {/* By specs */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Phone Comparison by Specs</h2>
        <p className="text-text-secondary leading-relaxed mb-3 max-w-3xl">
          Comparing by specification means deciding which attributes matter to you first,
          then reading only those rows. A few practical starting points:
        </p>
        <ul className="space-y-2 max-w-3xl">
          <li className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-primary mt-0.5">›</span>
            Screen size and weight together tell you whether a phone is one-handed —
            neither number alone does.
          </li>
          <li className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-primary mt-0.5">›</span>
            Battery capacity only means something alongside display size and chipset,
            because those drive consumption.
          </li>
          <li className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-primary mt-0.5">›</span>
            Optical zoom presence and aperture are documented camera facts; photo quality
            is not something we measure, so we do not rank it.
          </li>
          <li className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-primary mt-0.5">›</span>
            Update commitments are stated in years by the manufacturer and are compared
            directly — one of the few specs where higher is unambiguously better.
          </li>
        </ul>
      </section>

      {/* How to use */}
      <section className="mb-12 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-4">
          How to Use the Phone Comparison Tool
        </h2>
        <ol className="grid sm:grid-cols-3 gap-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </span>
            <span className="text-text-secondary">
              Search for both models in the selectors and press Compare Now.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </span>
            <span className="text-text-secondary">
              Read the grouped table; rows that differ are tagged Key or Notable.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </span>
            <span className="text-text-secondary">
              Switch on Differences Only, then open the product pages for sources.
            </span>
          </li>
        </ol>
        <p className="mt-4 text-sm text-text-secondary">
          The same tool is available at{" "}
          <Link href="/tools/product-comparison" className="text-primary hover:underline">
            the phone comparison tool page
          </Link>
          , and the result URL is shareable.
        </p>
      </section>

      {/* What to compare */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          What Should You Compare When Choosing a Phone?
        </h2>
        <p className="text-text-secondary leading-relaxed mb-3 max-w-3xl">
          There is no universally correct answer, only the attributes that matter for how
          you use a phone. The list below is the one we would work through, in rough order
          of how often it changes a decision:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
          {[
            [
              "Size and weight",
              "Determines whether the phone is comfortable to hold and carry. Check height, width, depth and weight together.",
            ],
            [
              "Battery and charging",
              "Capacity in mAh plus wired and wireless wattage. Compare capacity against display size rather than in isolation.",
            ],
            [
              "Software support",
              "Years of OS and security updates remaining from launch — the clearest higher-is-better specification.",
            ],
            [
              "Camera configuration",
              "Which lenses exist, their aperture and optical zoom. Configuration is a documented fact; image quality is not something we test.",
            ],
            [
              "Performance and memory",
              "Chipset, CPU cores, GPU and RAM. Relevant for gaming and heavy multitasking; less so for messaging and calls.",
            ],
            [
              "Storage",
              "Which capacities are offered and whether storage is expandable. Check the price of the capacity you actually need.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{title}</h3>
              <p className="text-sm text-text-secondary mt-1">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-text-secondary max-w-3xl">
          Price belongs in this list too, but only when you are looking at a current,
          verifiable figure. Our records store manufacturer suggested retail prices with a
          verification date; street prices move faster than any database.
        </p>
      </section>

      {/* Popular comparisons */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Popular Phone Comparisons</h2>
          <Link href="/compare" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {featuredComparisons.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/compare/iphone-vs-samsung" className="text-primary hover:underline">
            iPhone vs Samsung
          </Link>
          <Link href="/compare/pixel-vs-iphone" className="text-primary hover:underline">
            Pixel vs iPhone
          </Link>
          <Link href="/best-phones" className="text-primary hover:underline">
            Best phones by specification
          </Link>
          <Link href="/categories/smartphones" className="text-primary hover:underline">
            Smartphone category
          </Link>
        </div>
      </section>

      {/* Guides */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Related Guides</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {featuredGuides.map((guide) => (
            <GuideCard
              key={guide.slug}
              title={guide.title}
              slug={guide.slug}
              description={guide.description}
            />
          ))}
        </div>
      </section>

      <CompareHubLinks highlight="/compare/phones" />

      {/* FAQ */}
      <section id="faq" className="mb-12">
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

      <section className="p-5 bg-bg-secondary rounded-xl max-w-3xl">
        <h2 className="text-lg font-semibold text-text mb-2">Methodology and Sources</h2>
        <p className="text-sm text-text-secondary mb-2">
          Specifications are sourced from manufacturers&apos; official product pages and
          cross-referenced with independent sources. We do not run lab tests, do not assign
          scores, and show “—” where a value is unverified.
        </p>
        <p className="text-sm text-text-secondary">
          Full method:{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            how we source and verify data
          </Link>
          . Found a mistake?{" "}
          <Link href="/report-an-error" className="text-primary hover:underline">
            Report it here
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
