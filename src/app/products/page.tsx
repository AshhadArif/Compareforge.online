import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { products, brands } from "@/lib/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smartphone Database",
  description:
    "Browse our database of smartphones with verified specifications. Compare features, prices, and details for the latest phones.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Smartphone Database | CompareForge",
    description:
      "Browse our database of smartphones with verified specifications.",
    url: "https://compareforge.online/products",
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

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Products" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Smartphone Database</h1>
        <p className="mt-2 text-text-secondary max-w-3xl">
          Browse {products.length} smartphone records across {brands.length} brands with
          specifications sourced from manufacturer spec pages and cross-checked against independent
          sources. Every record lists its sources and the date it was last verified, and every
          product page links into the comparison and calculation tools so a spec turns into a
          decision.
        </p>
      </div>

      {/* Brand filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-sm font-medium text-text-secondary self-center mr-2">
          Brands:
        </span>
        {brands.map((brand) => {
          const count = products.filter(
            (p) => p.brand.toLowerCase() === brand.slug
          ).length;
          if (count === 0) return null;
          return (
            <span
              key={brand.id}
              className="text-sm px-3 py-1.5 bg-bg-secondary border border-border rounded-full text-text-secondary"
            >
              {brand.name} ({count})
            </span>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-3">Compare These Phones</h2>
        <p className="text-sm text-text-secondary mb-4 max-w-3xl">
          Every product page links into the comparison tool, so you can put any two records
          side by side across display, performance, camera, battery, design, storage,
          connectivity and software.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/compare/phones" className="text-primary hover:underline">
            Phone comparison →
          </Link>
          <Link href="/compare/phone-size-comparison" className="text-primary hover:underline">
            Phone size comparison →
          </Link>
          <Link href="/compare/iphone-vs-samsung" className="text-primary hover:underline">
            iPhone vs Samsung →
          </Link>
          <Link href="/compare/pixel-vs-iphone" className="text-primary hover:underline">
            Pixel vs iPhone →
          </Link>
          <Link href="/best-phones" className="text-primary hover:underline">
            Best phones by specification →
          </Link>
        </div>
      </div>

      <div className="mt-12 p-6 bg-bg-secondary rounded-xl">
        <h2 className="font-semibold text-text mb-2">About Our Product Data</h2>
        <p className="text-sm text-text-secondary mb-3">
          Specifications are sourced from manufacturer official pages and
          cross-referenced with independent sources. Each product page documents its
          sources and verification dates.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/compare"
            className="text-sm font-medium text-primary hover:underline"
          >
            Browse comparisons →
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-primary hover:underline"
          >
            Our methodology →
          </Link>
        </div>
      </div>
    </div>
  );
}
