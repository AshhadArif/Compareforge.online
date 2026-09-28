"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductSelector from "./ProductSelector";
import { Smartphone } from "@/data/types";
import { validateComparison } from "@/lib/comparisons";

export default function ProductSelectorSection({
  basePath = "/tools/product-comparison",
  labelA = "Phone A",
  labelB = "Phone B",
}: {
  basePath?: string;
  labelA?: string;
  labelB?: string;
}) {
  const router = useRouter();
  const [productA, setProductA] = useState<Smartphone | null>(null);
  const [productB, setProductB] = useState<Smartphone | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCompare() {
    setError(null);
    if (!productA || !productB) {
      setError("Select two phones to compare.");
      return;
    }
    const validation = validateComparison(productA, productB);
    if (!validation.valid) {
      setError(validation.error ?? "Invalid selection.");
      return;
    }
    router.push(`${basePath}?a=${productA.id}&b=${productB.id}`);
  }

  return (
    <div className="p-5 bg-white border border-border rounded-xl shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4">
        <ProductSelector
          label={labelA}
          selectedId={productA?.id ?? null}
          onSelect={(p) => setProductA(p)}
          excludeIds={productB ? [productB.id] : []}
          placeholder="e.g. iPhone 18 Pro Max"
        />
        <ProductSelector
          label={labelB}
          selectedId={productB?.id ?? null}
          onSelect={(p) => setProductB(p)}
          excludeIds={productA ? [productA.id] : []}
          placeholder="e.g. Galaxy S26 Ultra"
        />
      </div>
      {error && (
        <p className="mt-3 text-sm text-error" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleCompare}
        disabled={!productA || !productB}
        className="mt-4 w-full px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Compare Now
      </button>
    </div>
  );
}
