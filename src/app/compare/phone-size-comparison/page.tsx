import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DimensionComparison from "@/components/tools/DimensionComparison";
import ProductCard from "@/components/ProductCard";
import CompareHubLinks from "@/components/CompareHubLinks";
import { getPopularProducts, products } from "@/lib/products";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Phone Size Comparison — Compare Phone Dimensions",
  description:
    "Compare phone sizes side by side: height, width, thickness and weight, drawn to scale with percentage differences per axis. Free phone size comparison tool.",
  alternates: {
    canonical: "/compare/phone-size-comparison",
  },
  openGraph: {
    title: "Phone Size Comparison — Compare Phone Dimensions",
    description:
      "Compare the height, width, thickness and weight of any two phones with a to-scale drawing and percentage differences.",
    url: "https://compareforge.online/compare/phone-size-comparison",
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
    question: "How do I compare the size of two phones?",
    answer:
      "Select both phones in the tool above. It draws them to the same scale and reports the difference in width, height, depth and front-face area as a percentage, with neither phone treated as the baseline.",
  },
  {
    question: "What dimensions does a phone size comparison use?",
    answer:
      "Height, width and depth (thickness) in millimetres, taken from the manufacturer's specification sheet, plus weight in grams. Depth drives the thickness figure; height and width drive the drawing.",
  },
  {
    question: "Can I compare phone weight?",
    answer:
      "Yes. Weight is part of every product record and appears in the main phone comparison table. In the size tool it is shown alongside the dimensions because weight and footprint often trade against each other.",
  },
  {
    question: "Are the drawings to scale?",
    answer:
      "Yes. Both shapes are normalised to the larger of the two objects on each axis, so the proportions you see are the proportions of the real devices. The drawing is two-dimensional and does not represent bezels, curved edges or camera bumps.",
  },
  {
    question: "Can I compare a phone against something that is not a phone?",
    answer:
      "Yes. Switch either side to manual entry and type your own width, height and depth in millimetres — for example a phone against a case, a pocket or a shelf opening.",
  },
  {
    question: "Why do some phones show no dimensions?",
    answer:
      "If a manufacturer has not published a figure we could verify, the field is left empty rather than estimated. Report anything you can source and we will correct it.",
  },
];

export default function PhoneSizeComparisonPage() {
  const popular = getPopularProducts(6);
  const faqSchema = generateFAQSchema(FAQ);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Comparisons", href: "/compare" },
          { label: "Phone Comparison", href: "/compare/phones" },
          { label: "Phone Size Comparison" },
        ]}
      />

      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">Phone Size Comparison</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Compare the physical size of any two phones — height, width, thickness and
          weight — with a to-scale drawing and the percentage difference on every axis.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Compare Phone Sizes</h2>
        <DimensionComparison />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Compare Phone Dimensions</h2>
        <p className="text-text-secondary leading-relaxed mb-3 max-w-3xl">
          Dimensions come from the manufacturer specification sheet for each model and are
          recorded in millimetres: height, width and depth. The tool multiplies width by
          height to compare front-face area, which is the figure that answers “how much
          bigger does it feel in the hand” more reliably than any single axis.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          Percentages use the symmetric difference — the gap divided by the average of both
          values — so neither phone is treated as the reference point. A 10% difference
          means the same thing whichever way round you put the two devices.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          Phone Height, Width, and Thickness
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl">
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text">Height</h3>
            <p className="text-sm text-text-secondary mt-1">
              The longest edge. It decides whether a phone reaches from the base of your
              palm to your fingertips, and whether it sits comfortably in a pocket.
            </p>
          </div>
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text">Width</h3>
            <p className="text-sm text-text-secondary mt-1">
              The short edge. This is the dimension that determines one-handed reach across
              the screen and how the phone feels to grip.
            </p>
          </div>
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text">Thickness</h3>
            <p className="text-sm text-text-secondary mt-1">
              Depth in millimetres, measured at the body. Camera bumps add more, which is
              why the drawing stays two-dimensional rather than pretending to model them.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">Compare Phone Weight</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          Weight is recorded in grams for every model in the database. It rarely decides a
          purchase on its own, but combined with dimensions it explains why two phones with
          similar screen sizes can feel completely different — a larger phone with a metal
          frame can be lighter than a smaller one with a bigger battery.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popular.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="block p-4 bg-white border border-border rounded-xl text-center hover:shadow-md transition-shadow"
            >
              <span className="block text-xs font-medium text-primary">{product.brand}</span>
              <span className="block text-sm font-semibold text-text mt-1">
                {product.model}
              </span>
              <span className="block text-xs text-text-light mt-1">
                {product.design.weight ? `${product.design.weight} g` : "Weight TBA"}
                {product.design.dimensions?.height
                  ? ` · ${product.design.dimensions.height} mm`
                  : ""}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm">
          <Link href="/products" className="text-primary hover:underline">
            Browse all {products.length} phones with dimensions →
          </Link>
        </p>
      </section>

      <section className="mb-12 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-3">
          How Phone Size Comparison Works
        </h2>
        <ol className="space-y-3 text-sm text-text-secondary list-decimal pl-5 max-w-3xl">
          <li>
            Pick a model on each side from the database, or switch a side to manual entry
            and type width, height and depth yourself.
          </li>
          <li>
            Each axis is normalised to the larger object, then both rectangles are drawn on
            the same scale so the proportions are directly comparable.
          </li>
          <li>
            The tool computes the symmetric percentage difference for width, height, depth
            and front-face area, and shows weight where both records have it.
          </li>
          <li>
            Nothing is scored or ranked — the tool reports how far apart two objects are,
            not which one you should buy.
          </li>
        </ol>
        <p className="mt-4 text-sm text-text-secondary">
          For the full specification table — display, camera, battery, software — use the{" "}
          <Link href="/compare/phones" className="text-primary hover:underline">
            phone comparison
          </Link>{" "}
          tool instead.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Phones You Can Compare</h2>
          <Link href="/compare/phones" className="text-sm font-medium text-primary hover:underline">
            Full comparison tool →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <CompareHubLinks highlight="/compare/phones" />

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

      <section className="p-5 bg-bg-secondary rounded-xl max-w-3xl">
        <h2 className="text-lg font-semibold text-text mb-2">Data Sources</h2>
        <p className="text-sm text-text-secondary">
          Dimensions and weight are taken from manufacturer specification pages and are
          listed with their source and verification date on each{" "}
          <Link href="/products" className="text-primary hover:underline">
            product page
          </Link>
          . Custom measurements entered in the tool are yours and are not stored. See our{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            methodology
          </Link>{" "}
          for the full process.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
