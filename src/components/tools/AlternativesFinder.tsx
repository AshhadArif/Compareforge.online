"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { findAlternatives } from "@/lib/decision";

export default function AlternativesFinder() {
  const [anchorId, setAnchorId] = useState("");
  const anchor = useMemo(() => products.find((p) => p.id === anchorId), [anchorId]);
  const rows = useMemo(() => (anchorId ? findAlternatives(anchorId, 5) : []), [anchorId]);

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <div className="max-w-lg mb-5">
        <label htmlFor="anchor-product" className="block text-sm font-medium text-text mb-1.5">
          Start from a phone you know
        </label>
        <select
          id="anchor-product"
          className="w-full px-3 py-2.5 bg-white border border-border rounded-lg text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={anchorId}
          onChange={(e) => setAnchorId(e.target.value)}
        >
          <option value="">Select a phone…</option>
          {[...products]
            .sort((a, b) => a.fullName.localeCompare(b.fullName))
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName}
                {p.pricing.msrp != null ? ` — $${p.pricing.msrp.toLocaleString()}` : ""}
              </option>
            ))}
        </select>
      </div>

      {!anchor ? (
        <div className="p-4 bg-bg-secondary border border-border rounded-lg text-sm text-text-secondary">
          Pick a phone to see cheaper or better-fitting alternatives from our database, ranked by
          specification similarity and price.
        </div>
      ) : rows.length === 0 ? (
        <div className="p-4 bg-warning-light border border-warning/30 rounded-lg text-sm text-warning">
          No close alternatives found in the current database.{" "}
          <Link href="/tools/product-finder" className="underline">
            Try the Product Finder instead →
          </Link>
        </div>
      ) : (
        <>
        <h2 className="text-sm font-semibold text-text mb-3">Closest alternatives</h2>
        <ol className="space-y-4">
          <li className="p-4 border-2 border-primary/30 bg-primary-light rounded-lg">
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Your pick</span>
            <h3 className="font-semibold text-text">{anchor.fullName}</h3>
            <p className="text-sm text-text-secondary mt-0.5">
              {anchor.pricing.msrp != null ? `$${anchor.pricing.msrp.toLocaleString()} MSRP` : "Price not listed"}
              {" · "}
              {`${anchor.display.size ?? "?"}″ · ${anchor.battery.capacity ?? "?"} mAh`}
            </p>
          </li>

          {rows.map((row, index) => (
            <li key={row.product.id} className="border border-border rounded-lg p-4 bg-bg-secondary">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <span className="text-xs font-medium text-primary">
                    Alternative #{index + 1}
                  </span>
                  <h3 className="font-semibold text-text">{row.product.fullName}</h3>
                  <p className="text-sm font-medium text-text mt-0.5">
                    {row.priceDiff == null
                      ? "Price not listed"
                      : row.priceDiff < 0
                        ? `$${Math.abs(row.priceDiff).toLocaleString()} cheaper (${Math.abs(row.pricePct ?? 0).toFixed(0)}%)`
                        : row.priceDiff > 0
                          ? `$${row.priceDiff.toLocaleString()} more`
                          : "Same listed price"}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {row.gains.map((g) => (
                      <li key={g} className="text-xs px-2 py-0.5 bg-accent-light text-accent rounded-full">
                        {g}
                      </li>
                    ))}
                    {row.tradeoffs.map((t) => (
                      <li key={t} className="text-xs px-2 py-0.5 bg-warning-light text-warning rounded-full">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right flex-shrink-0 space-y-1">
                  {row.product.pricing.msrp != null && (
                    <p className="text-sm font-semibold text-text">
                      ${row.product.pricing.msrp.toLocaleString()}
                    </p>
                  )}
                  <Link
                    href={`/products/${row.product.slug}`}
                    className="text-xs font-medium text-primary hover:underline block"
                  >
                    Details →
                  </Link>
                  <Link
                    href={`/tools/product-comparison?a=${anchor.id}&b=${row.product.id}`}
                    className="text-xs font-medium text-primary hover:underline block"
                  >
                    Compare →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
        </>
      )}

      <p className="mt-4 text-xs text-text-secondary">
        Alternatives are ranked by specification similarity and listed price from our database —
        gains and trade-offs are derived from attribute differences, not review scores.{" "}
        <Link href="/methodology" className="text-primary hover:underline">
          Methodology →
        </Link>
      </p>
    </div>
  );
}
