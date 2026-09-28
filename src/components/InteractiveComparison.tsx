"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getProductById } from "@/lib/products";
import { validateComparison } from "@/lib/comparisons";
import ComparisonTable from "@/components/ComparisonTable";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

function ComparisonResult({ basePath }: { basePath: string }) {
  const searchParams = useSearchParams();
  const aId = searchParams.get("a");
  const bId = searchParams.get("b");

  if (!aId || !bId) return null;

  const productA = getProductById(aId);
  const productB = getProductById(bId);

  if (!productA || !productB) {
    return (
      <div className="mb-12 p-5 bg-error-light border border-error/30 rounded-xl">
        <p className="text-sm text-error">
          One or both phones could not be found. Please try selecting again.
        </p>
      </div>
    );
  }

  const validation = validateComparison(productA, productB);
  if (!validation.valid) {
    return (
      <div className="mb-12 p-5 bg-warning-light border border-warning/30 rounded-xl">
        <p className="text-sm text-warning">{validation.error}</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <ProductCard product={productA} />
        <ProductCard product={productB} />
      </div>
      <ComparisonTable productA={productA} productB={productB} />
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Link
          href={`/products/${productA.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          {productA.fullName} details →
        </Link>
        <Link
          href={`/products/${productB.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          {productB.fullName} details →
        </Link>
        <Link
          href={basePath}
          className="text-sm font-medium text-primary hover:underline"
        >
          Compare different phones →
        </Link>
      </div>
    </div>
  );
}

export default function InteractiveComparison({
  basePath = "/tools/product-comparison",
}: {
  basePath?: string;
}) {
  return (
    <Suspense fallback={null}>
      <ComparisonResult basePath={basePath} />
    </Suspense>
  );
}
