import { Smartphone, Source } from "@/data/types";

export interface ProductSEO {
  title: string;
  metaDescription: string;
  h1: string;
  canonical: string;
}

export function generateProductSEO(product: Smartphone): ProductSEO {
  const msrp = product.pricing.msrp;
  const titlePrice = msrp ? ` — $${msrp.toLocaleString()}` : "";
  const descPrice = msrp ? ` from $${msrp.toLocaleString()}` : "";
  return {
    // No "| CompareForge" suffix — the root layout title template appends it.
    title: `${product.fullName}${titlePrice} — Specs & Features`,
    metaDescription: `${product.fullName} full specifications${descPrice}. Display, camera, battery, performance, and software details with sources.`,
    h1: product.fullName,
    canonical: `/products/${product.slug}`,
  };
}

export function getProductSources(product: Smartphone): Source[] {
  return product.sources;
}

export function formatReleaseDate(dateStr: string | null): string {
  if (!dateStr) return "TBA";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(dateStr: string | null): string {
  if (!dateStr) return "TBA";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
