import { Smartphone } from "@/data/types";
import { products } from "@/lib/products";

export interface MetricContext {
  key: string;
  label: string;
  unit: string;
  value: number;
  median: number;
  formattedValue: string;
  formattedMedian: string;
  direction: "above" | "below" | "equal";
  deltaText: string;
}

const METRICS: {
  key: string;
  label: string;
  unit: string;
  read: (p: Smartphone) => number | null;
  format: (n: number) => string;
}[] = [
  {
    key: "battery",
    label: "Battery capacity",
    unit: "mAh",
    read: (p) => p.battery?.capacity ?? null,
    format: (n) => `${Math.round(n).toLocaleString("en-US")} mAh`,
  },
  {
    key: "weight",
    label: "Weight",
    unit: "g",
    read: (p) => p.design?.weight ?? null,
    format: (n) => `${Math.round(n).toLocaleString("en-US")} g`,
  },
  {
    key: "price",
    label: "Starting price",
    unit: "USD",
    read: (p) => p.pricing?.msrp ?? null,
    format: (n) => `$${Math.round(n).toLocaleString("en-US")}`,
  },
  {
    key: "screen",
    label: "Screen size",
    unit: "in",
    read: (p) => p.display?.size ?? null,
    format: (n) => `${n.toFixed(1)} in`,
  },
];

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * Where a single product sits against the median of the phones we actually
 * publish in this database. Everything is computed from the records at build
 * time, so the numbers are the site's own data — not market estimates.
 */
export function getProductContext(product: Smartphone): {
  count: number;
  metrics: MetricContext[];
} {
  const count = products.length;
  const metrics: MetricContext[] = [];

  for (const metric of METRICS) {
    const value = metric.read(product);
    if (value === null || value === undefined) continue;

    const pool = products.map(metric.read).filter((n): n is number => typeof n === "number");
    const med = median(pool);
    if (med === null) continue;

    const roundedMed = metric.unit === "in" ? Number(med.toFixed(1)) : Math.round(med);
    const delta = value - med;
    const direction: MetricContext["direction"] =
      Math.abs(delta) < 0.001 ? "equal" : delta > 0 ? "above" : "below";

    const abs = Math.abs(delta);
    const deltaText =
      direction === "equal"
        ? "the same as the median"
        : `${metric.format(abs)} ${direction === "above" ? "above" : "below"} the median`;

    metrics.push({
      key: metric.key,
      label: metric.label,
      unit: metric.unit,
      value,
      median: roundedMed,
      formattedValue: metric.format(value),
      formattedMedian: metric.format(roundedMed),
      direction,
      deltaText,
    });
  }

  return { count, metrics };
}
