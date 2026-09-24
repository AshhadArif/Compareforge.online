"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { USE_CASES, rankForUseCase } from "@/lib/decision";

const scoreColor = (score: number, max: number) => {
  const ratio = max > 0 ? score / max : 0;
  if (ratio >= 0.75) return "bg-accent";
  if (ratio >= 0.5) return "bg-primary";
  return "bg-border";
};

export default function UseCaseComparison() {
  const [useCase, setUseCase] = useState(USE_CASES[0].id);
  const active = USE_CASES.find((u) => u.id === useCase) ?? USE_CASES[0];
  const rows = useMemo(() => rankForUseCase(useCase, 8), [useCase]);
  const maxScore = rows.length > 0 ? rows[0].score : 0;

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <fieldset>
        <legend className="text-sm font-medium text-text mb-3">Choose a use case</legend>
        <div className="flex flex-wrap gap-2 mb-5">
          {USE_CASES.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUseCase(u.id)}
              aria-pressed={useCase === u.id}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                useCase === u.id
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="text-sm text-text-secondary mb-4">{active.question}</p>

      <h2 className="text-sm font-semibold text-text mb-3">Ranked matches</h2>

      <ol className="space-y-3">
        {rows.map((row, index) => (
          <li key={row.product.id} className="border border-border rounded-lg p-4 bg-bg-secondary">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <span className="text-xs font-medium text-primary">#{index + 1}</span>
                <h3 className="font-semibold text-text">{row.product.fullName}</h3>
                <p className="text-sm text-text-secondary mt-0.5 line-clamp-2">
                  {row.product.summary}
                </p>
                {row.reasons.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {row.reasons.slice(0, 4).map((r) => (
                      <li key={r} className="text-xs px-2 py-0.5 bg-primary-light text-primary rounded-full">
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                {row.product.pricing.msrp != null && (
                  <p className="text-sm font-medium text-text">${row.product.pricing.msrp.toLocaleString()}</p>
                )}
                <div className="mt-2 w-28 h-2 bg-border-light rounded-full overflow-hidden" aria-hidden>
                  <div
                    className={`h-full ${scoreColor(row.score, maxScore)}`}
                    style={{ width: `${maxScore > 0 ? Math.round((row.score / maxScore) * 100) : 0}%` }}
                  />
                </div>
                <span className="text-xs text-text-light mt-1 block">Relative fit</span>
                <Link
                  href={`/products/${row.product.slug}`}
                  className="text-xs font-medium text-primary hover:underline mt-1 inline-block"
                >
                  Details →
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs text-text-secondary">
        Rankings are editorial fit scores computed from published specifications (camera hardware,
        battery capacity, weight, refresh rate, update commitments and similar attributes) — not
        lab tests or user reviews.{" "}
        <Link href="/methodology" className="text-primary hover:underline">
          Methodology →
        </Link>
      </p>

      <div className="mt-4 p-4 bg-primary-light rounded-lg">
        <p className="text-sm text-text mb-2">
          Want to check two of these side by side?
        </p>
        <Link
          href="/tools/product-comparison"
          className="text-sm font-medium text-primary hover:underline"
        >
          Open the Product Comparison Tool →
        </Link>
      </div>
    </div>
  );
}
