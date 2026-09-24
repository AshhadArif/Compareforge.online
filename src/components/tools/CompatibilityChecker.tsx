"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { COMPAT_REQUIREMENTS, checkCompatibility } from "@/lib/decision";

export default function CompatibilityChecker() {
  const [productId, setProductId] = useState("");
  const [requirementId, setRequirementId] = useState(COMPAT_REQUIREMENTS[0].id);

  const product = useMemo(() => products.find((p) => p.id === productId), [productId]);
  const result = useMemo(
    () => (product ? checkCompatibility(product, requirementId) : null),
    [product, requirementId]
  );

  const groups = useMemo(() => {
    const map = new Map<string, typeof COMPAT_REQUIREMENTS>();
    for (const r of COMPAT_REQUIREMENTS) {
      const list = map.get(r.group) ?? [];
      list.push(r);
      map.set(r.group, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor="compat-product" className="block text-sm font-medium text-text mb-1.5">
            1. Choose a phone
          </label>
          <select
            id="compat-product"
            className="w-full px-3 py-2.5 bg-white border border-border rounded-lg text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select a phone…</option>
            {[...products]
              .sort((a, b) => a.fullName.localeCompare(b.fullName))
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="compat-requirement" className="block text-sm font-medium text-text mb-1.5">
            2. Choose a requirement
          </label>
          <select
            id="compat-requirement"
            className="w-full px-3 py-2.5 bg-white border border-border rounded-lg text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={requirementId}
            onChange={(e) => setRequirementId(e.target.value)}
          >
            {groups.map(([group, reqs]) => (
              <optgroup key={group} label={group}>
                {reqs.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {!product ? (
        <div className="p-4 bg-bg-secondary border border-border rounded-lg text-sm text-text-secondary">
          Select a phone and a requirement to get a verdict based on its published specifications —
          for example, does it support wireless charging, eSIM, 5G, NFC payments or microSD cards.
        </div>
      ) : !result ? null : (
        <div
          className={`p-5 rounded-lg border ${
            result.unknown
              ? "bg-warning-light border-warning/30"
              : result.pass
                ? "bg-accent-light border-accent/30"
                : "bg-error-light border-error/30"
          }`}
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${
                result.unknown
                  ? "bg-warning text-white"
                  : result.pass
                    ? "bg-accent text-white"
                    : "bg-error text-white"
              }`}
              aria-hidden
            >
              {result.unknown ? "?" : result.pass ? "✓" : "✗"}
            </span>
            <h2 className="font-semibold text-text">
              {result.unknown
                ? "Not documented"
                : result.pass
                  ? "Compatible"
                  : "Not compatible"}
            </h2>
          </div>
          <p className="text-sm text-text-secondary">
            <strong>{product.fullName}</strong> × <strong>{result.requirement.label}</strong> —{" "}
            {result.reason}
          </p>
          <p className="text-xs text-text-light mt-2">
            Source: product specification record, last verified {product.lastVerified}.{" "}
            {result.unknown
              ? "When a field is missing from the spec sheet we say so rather than guess."
              : ""}
          </p>
        </div>
      )}

      <div className="mt-5">
        <h2 className="text-sm font-semibold text-text mb-2">All requirements for {product?.model ?? "the selected phone"}</h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {COMPAT_REQUIREMENTS.map((r) => {
            const res = product ? checkCompatibility(product, r.id) : null;
            return (
              <li
                key={r.id}
                className={`flex items-start gap-2 text-sm p-2.5 rounded-lg border ${
                  !product
                    ? "border-border bg-white text-text-secondary"
                    : res?.unknown
                      ? "border-warning/30 bg-warning-light text-text"
                      : res?.pass
                        ? "border-accent/30 bg-accent-light text-text"
                        : "border-error/30 bg-error-light text-text"
                }`}
              >
                <span className="font-bold flex-shrink-0" aria-hidden>
                  {!product ? "·" : res?.unknown ? "?" : res?.pass ? "✓" : "✗"}
                </span>
                <span>{r.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 text-xs text-text-secondary">
        Verdicts come only from fields documented in our specification records. A “not documented”
        result means the spec sheet does not state it — not that the feature is absent.{" "}
        <Link href="/methodology" className="text-primary hover:underline">
          Methodology →
        </Link>
      </p>
    </div>
  );
}
