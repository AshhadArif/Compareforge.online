import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComparisonCard from "@/components/ComparisonCard";
import SpecComparison from "@/components/tools/SpecComparison";
import CompareHubLinks from "@/components/CompareHubLinks";
import { comparisons } from "@/lib/comparisons";
import { products } from "@/lib/products";
import { generateItemListSchema, generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Product Comparison — Compare Products Side by Side",
  description:
    "Free product comparison tool. Compare two products side by side on specifications and features — phones, laptops, tablets, monitors, cameras and headphones.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Product Comparison — Compare Products Side by Side",
    description:
      "Compare products side by side on specifications and features with a free comparison tool and published comparisons.",
    url: "https://compareforge.online/compare",
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
    question: "What does a product comparison tool compare?",
    answer:
      "Two products, attribute by attribute, so you can see which values match and which differ. Depending on the category that means display size, processor, memory, battery, dimensions, ports, connectivity — whichever rows are relevant to the decision you are making.",
  },
  {
    question: "How do I compare two products side by side?",
    answer:
      "Choose a category in the tool above, enter the same specification fields for both products, and read the difference column. Rows are labelled identical, higher, lower, different or missing, and the differences-only switch hides everything that matches.",
  },
  {
    question: "Can I compare product specifications I have not collected yet?",
    answer:
      "Yes. Open both manufacturers' specification pages in separate tabs and transcribe the fields into the two columns. Nothing you enter is stored or sent anywhere — the table is computed in your browser.",
  },
  {
    question: "Do you compare features as well as numbers?",
    answer:
      "Yes. Feature rows are compared as text: identical values are marked the same and anything else is marked different. For a yes/no feature, enter Yes or No in both columns.",
  },
  {
    question: "Can I compare phones from your database instead of typing them?",
    answer:
      "Yes. For the smartphones we publish records for, the phone comparison tool reads our sourced specifications directly — no typing needed. Every value there carries a source and a verification date.",
  },
  {
    question: "Do you publish reviews or ratings?",
    answer:
      "No. CompareForge does not run lab tests and does not assign scores or awards. We compare documented specifications, state where each value came from, and leave unverified fields empty.",
  },
];

export default function CompareHubPage() {
  const itemList = generateItemListSchema(
    comparisons.map((c) => ({ name: c.title, url: `/compare/${c.slug}` })),
    "Published Comparisons"
  );
  const faqSchema = generateFAQSchema(FAQ);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Product Comparison" }]} />

      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">Product Comparison</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Compare products side by side on the specifications and features that decide a
          purchase — two at a time, with every difference labelled and no verdict handed
          down.
        </p>
        <p className="mt-3 text-text-secondary">
          Use the tool below for any category, or go straight to a category that has
          verified product records:{" "}
          <Link href="/compare/phones" className="text-primary hover:underline">
            phones
          </Link>
          ,{" "}
          <Link href="/compare/laptops" className="text-primary hover:underline">
            laptops
          </Link>
          ,{" "}
          <Link href="/compare/tablets" className="text-primary hover:underline">
            tablets
          </Link>
          ,{" "}
          <Link href="/compare/monitors" className="text-primary hover:underline">
            monitors
          </Link>
          ,{" "}
          <Link href="/compare/cameras" className="text-primary hover:underline">
            cameras
          </Link>{" "}
          or{" "}
          <Link href="/compare/headphones" className="text-primary hover:underline">
            headphones
          </Link>
          .
        </p>
      </div>

      <section className="mb-12 max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-3">
          What Is a Product Comparison Tool?
        </h2>
        <p className="text-text-secondary leading-relaxed mb-3">
          A product comparison tool takes two products and puts their attributes into the
          same rows, in the same units, so that differences become visible without you having
          to keep two specification pages in your head at once. That is the entire job. It
          does not decide which product is better, because that depends on what you need the
          product for.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The tool on this page is general-purpose: choose the category that matches your
          products and the relevant rows load for you. It covers phones, laptops, tablets,
          monitors, cameras and headphones, and it accepts any values you type — so you can
          also compare two products we hold no records for. Values you enter are calculated in
          your browser and are never stored.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Compare Products Side by Side</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Pick a category and the table fills with the standard specification rows for it.
          Enter one product in each column — the difference column updates as you type.
        </p>
        <SpecComparison defaultCategory="laptops" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">How to Compare Two Products</h2>
        <ol className="grid sm:grid-cols-3 gap-4 text-sm max-w-4xl">
          <li className="flex items-start gap-3 bg-bg-secondary rounded-xl p-4">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </span>
            <span className="text-text-secondary">
              Choose a category. The rows for that product class load automatically.
            </span>
          </li>
          <li className="flex items-start gap-3 bg-bg-secondary rounded-xl p-4">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </span>
            <span className="text-text-secondary">
              Enter both products&apos; values. Add or remove any row you need.
            </span>
          </li>
          <li className="flex items-start gap-3 bg-bg-secondary rounded-xl p-4">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </span>
            <span className="text-text-secondary">
              Read the difference column, then switch on differences only.
            </span>
          </li>
        </ol>
        <p className="mt-4 text-sm text-text-secondary max-w-3xl">
          Numeric rows are compared directly and labelled higher or lower; text rows are
          compared as written. A row with only one value is marked as a data gap rather than
          a difference. Full detail:{" "}
          <Link href="/tools/spec-comparison" className="text-primary hover:underline">
            the specification comparison tool
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Compare Product Specifications</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Specification comparison means reading attributes that exist on both products and
          are comparable in the same unit. The attributes that carry the most weight depend
          on the category — but the method is the same everywhere:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["Display", "Size, resolution, panel type and refresh rate — compared together, since density comes from size and pixel count together."],
            ["Performance", "Processor model, core count and memory. Compare model names first; core counts alone are misleading across manufacturers."],
            ["Battery", "Capacity and charging rate. Capacity is comparable; runtime claims are measured under each maker's own conditions."],
            ["Storage", "Capacity and whether it is expandable — the second half of that question matters more than the headline number."],
            ["Dimensions", "Height, width, depth and weight. Read them together: footprint and mass trade against each other."],
            ["Connectivity", "Wireless generations, ports and their versions. This is what decides whether the product works with what you already own."],
          ].map(([title, body]) => (
            <div key={title} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{title}</h3>
              <p className="text-sm text-text-secondary mt-1">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">How to Read a Product Comparison Chart</h2>
        <p className="text-text-secondary leading-relaxed mb-3 max-w-3xl">
          The chart has three columns per product and one column of differences. Read the
          difference column first — it is the only column that changes — and use it to decide
          which rows deserve a second look.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["Identical", "Both products state the same value in the same unit. Safe to skip; it is not a tie in your favour, it is simply no difference."],
            ["Higher / lower", "A numeric row where both values exist and can be ordered. Higher is not automatically better — a lower weight and a lower price both favour the other side."],
            ["Different", "A text row where the values do not match. This is where reading the actual words matters: two different chipset names are a real difference, two different packaging descriptions may not be."],
            ["Missing / incomplete", "Only one side states a value. This is a data gap, not a difference, and it is worth noticing — a product with fewer published specifications is harder to compare, not better or worse."],
          ].map(([title, body]) => (
            <div key={title} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{title}</h3>
              <p className="text-sm text-text-secondary mt-1">{body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-secondary mt-4 max-w-3xl">
          Units are compared only when both sides use the same one. Where a manufacturer
          publishes a figure in a different unit, convert it before entering it — the tool
          will not convert for you, because a silent conversion is an assumption.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Product Specifications vs Features</h2>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          A specification is a measured or stated quantity — 6.7 inches, 12 GB, 5,000 mAh —
          and it can be ordered: one number is higher than the other. A feature is a
          capability — NFC, a headphone jack, an included keyboard — and it can only be
          present or absent, or present in a different form. Confusing the two is the most
          common reason a comparison ends up arguing about nothing.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-3xl mt-3">
          Compare specifications numerically and features as text. Feature comparison treats
          values as text and marks them identical only when they match, so a capability
          present on one product and absent on the other shows up as a one-sided row rather
          than a tie. Enter features as their own rows — a list of capabilities, a supported
          standard, a warranty length — and add as many as the decision needs. For
          subscription-style features where price matters more than presence, the{" "}
          <Link href="/tools/plan-comparison" className="text-primary hover:underline">
            plan comparison
          </Link>{" "}
          tool normalizes costs across billing periods instead.
        </p>
      </section>

      <CompareHubLinks title="Compare Products by Category" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          What Should You Compare When Choosing a Product?
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          The right comparison depends on the product, but the sequence below works across
          categories — decide in this order and you will usually need six rows instead of
          thirty:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            [
              "Specifications",
              "The documented facts: capacity, size, resolution, weight, standards supported. Comparable only when both products state them in the same unit.",
            ],
            [
              "Features",
              "What the product does or supports. Compare presence honestly — a value on one side and nothing on the other is a data gap, not a win.",
            ],
            [
              "Size and compatibility",
              "Whether it fits the space, the ecosystem and the accessories you already own. Compatibility failures are the most expensive mistakes and the easiest to check.",
            ],
            [
              "Price — when the figure is current",
              "Manufacturer suggested retail price with a verification date is worth comparing; a price you saw months ago is not. Street pricing moves faster than any database.",
            ],
            [
              "Support and upgradeability",
              "Update commitments, warranty length, whether memory and storage can be added later. These determine how long the purchase stays useful.",
            ],
            [
              "Verified performance metrics",
              "Only where a documented measurement exists. We do not publish benchmark or test results we did not run, and neither should you rely on figures without a stated method.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{title}</h3>
              <p className="text-sm text-text-secondary mt-1">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Published Comparisons</h2>
          <span className="text-sm text-text-secondary">
            {comparisons.length} comparisons · {products.length} phones
          </span>
        </div>
        <p className="text-text-secondary text-sm mb-4 max-w-3xl">
          Every comparison below is built from product records in our database, with sources
          and verification dates on each product page.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {comparisons.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
      </section>

      <section className="mb-12 p-6 bg-bg-secondary rounded-xl max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-3">Related Tools</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/tools/product-comparison" className="text-primary hover:underline">
              Phone comparison tool
            </Link>{" "}
            <span className="text-text-secondary">
              — reads our verified records, no typing required.
            </span>
          </li>
          <li>
            <Link href="/tools/spec-comparison" className="text-primary hover:underline">
              Specification comparison tool
            </Link>{" "}
            <span className="text-text-secondary">
              — the tool above, for any category you bring data to.
            </span>
          </li>
          <li>
            <Link href="/tools/dimension-comparison" className="text-primary hover:underline">
              Dimension comparison
            </Link>{" "}
            <span className="text-text-secondary">
              — to-scale drawing for any two objects.
            </span>
          </li>
          <li>
            <Link href="/tools/decision-matrix" className="text-primary hover:underline">
              Weighted decision matrix
            </Link>{" "}
            <span className="text-text-secondary">
              — when the difference is a trade-off rather than a number.
            </span>
          </li>
          <li>
            <Link href="/guides/how-to-compare-product-specifications" className="text-primary hover:underline">
              How to compare product specifications
            </Link>{" "}
            <span className="text-text-secondary">— a repeatable method.</span>
          </li>
        </ul>
      </section>

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
