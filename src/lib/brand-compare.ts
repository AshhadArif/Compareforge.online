import { Comparison, Smartphone } from "@/data/types";
import { comparisons } from "@/lib/comparisons";
import { products } from "@/lib/products";

export interface BrandSummary {
  brand: string;
  models: Smartphone[];
  count: number;
  price: Range | null;
  display: Range | null;
  battery: Range | null;
  weight: Range | null;
  updateYears: Range | null;
}

export interface Range {
  min: number;
  max: number;
}

export function summarizeBrand(brand: string): BrandSummary {
  const models = products
    .filter((p) => p.brand === brand)
    .slice()
    .sort((a, b) => (a.releaseDate ?? "").localeCompare(b.releaseDate ?? ""));

  return {
    brand,
    models,
    count: models.length,
    price: rangeOf(models.map((m) => m.pricing.msrp)),
    display: rangeOf(models.map((m) => m.display.size)),
    battery: rangeOf(models.map((m) => m.battery.capacity)),
    weight: rangeOf(models.map((m) => m.design.weight)),
    updateYears: rangeOf(models.map((m) => m.software.updateCommitment)),
  };
}

function rangeOf(values: (number | null | undefined)[]): Range | null {
  const nums = values.filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  if (nums.length === 0) return null;
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

export function formatRange(range: Range | null, unit = ""): string {
  if (!range) return "not published";
  if (range.min === range.max) return `${range.min}${unit ? ` ${unit}` : ""}`;
  return `${range.min}–${range.max}${unit ? ` ${unit}` : ""}`;
}

export function formatPriceRange(range: Range | null): string {
  if (!range) return "not published";
  if (range.min === range.max) return `$${range.min.toLocaleString()}`;
  return `$${range.min.toLocaleString()}–$${range.max.toLocaleString()}`;
}

/** Comparisons that involve at least one product from each of the two brands. */
export function getCrossBrandComparisons(a: string, b: string): Comparison[] {
  return comparisons.filter((c) => {
    const brands = new Set(
      c.productIds
        .map((id) => products.find((p) => p.id === id)?.brand)
        .filter((x): x is string => Boolean(x))
    );
    return brands.has(a) && brands.has(b);
  });
}

/** Comparisons whose featured products all belong to one of the two brands. */
export function getWithinBrandComparisons(brands: string[]): Comparison[] {
  return comparisons.filter((c) => {
    const productBrands = c.productIds
      .map((id) => products.find((p) => p.id === id)?.brand)
      .filter((x): x is string => Boolean(x));
    return productBrands.length > 0 && productBrands.every((b) => brands.includes(b));
  });
}
