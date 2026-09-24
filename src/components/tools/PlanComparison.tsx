"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/engine/calc";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: "month" | "year";
  features: string;
}

const START: Plan[] = [
  { id: "a", name: "Plan A", price: "", period: "month", features: "" },
  { id: "b", name: "Plan B", price: "", period: "year", features: "" },
];

function monthlyCost(price: number, period: Plan["period"]): number {
  return period === "year" ? price / 12 : price;
}

export default function PlanComparison() {
  const [plans, setPlans] = useState<Plan[]>(START);

  const update = (id: string, patch: Partial<Plan>) =>
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addPlan = () =>
    setPlans((prev) =>
      prev.length >= 3
        ? prev
        : [...prev, { id: `c${prev.length}`, name: `Plan ${String.fromCharCode(65 + prev.length)}`, price: "", period: "month", features: "" }]
    );

  const removePlan = (id: string) => setPlans((prev) => (prev.length <= 2 ? prev : prev.filter((p) => p.id !== id)));

  const parsed = plans.map((p) => {
    const price = parseFloat(p.price);
    const valid = Number.isFinite(price) && price >= 0;
    const mCost = valid ? monthlyCost(price, p.period) : null;
    const features = p.features
      .split(/[,\n]/)
      .map((f) => f.trim())
      .filter(Boolean);
    return { ...p, price, valid, mCost, features };
  });

  const allValid = parsed.every((p) => p.valid);
  const cheapest = allValid
    ? parsed.reduce((min, p) => ((p.mCost ?? Infinity) < (min.mCost ?? Infinity) ? p : min))
    : null;
  const featureSet = Array.from(new Set(parsed.flatMap((p) => p.features)));

  const inputClass =
    "w-full px-3 py-2.5 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text">Enter your plans</h2>
        <div className="flex gap-2">
          {plans.length < 3 && (
            <button
              type="button"
              onClick={addPlan}
              className="px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light transition-colors"
            >
              + Add plan
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {parsed.map((plan, i) => (
          <fieldset key={plan.id} className="border border-border rounded-lg p-4 space-y-3">
            <legend className="px-1 text-xs font-medium uppercase tracking-wide text-primary">
              Plan {String.fromCharCode(65 + i)}
            </legend>
            <div>
              <label htmlFor={`plan-${plan.id}-name`} className="block text-sm font-medium text-text mb-1">
                Name
              </label>
              <input
                id={`plan-${plan.id}-name`}
                type="text"
                className={inputClass}
                value={plan.name}
                onChange={(e) => update(plan.id, { name: e.target.value })}
                placeholder="Basic"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor={`plan-${plan.id}-price`} className="block text-sm font-medium text-text mb-1">
                  Price
                </label>
                <input
                  id={`plan-${plan.id}-price`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  className={inputClass}
                  value={plan.price}
                  onChange={(e) => update(plan.id, { price: e.target.value })}
                  placeholder="9.99"
                />
              </div>
              <div>
                <label htmlFor={`plan-${plan.id}-period`} className="block text-sm font-medium text-text mb-1">
                  Billed
                </label>
                <select
                  id={`plan-${plan.id}-period`}
                  className={inputClass}
                  value={plan.period}
                  onChange={(e) => update(plan.id, { period: e.target.value as Plan["period"] })}
                >
                  <option value="month">per month</option>
                  <option value="year">per year</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={`plan-${plan.id}-features`} className="block text-sm font-medium text-text mb-1">
                Features / allowances
              </label>
              <textarea
                id={`plan-${plan.id}-features`}
                className={`${inputClass} min-h-[80px]`}
                value={plan.features}
                onChange={(e) => update(plan.id, { features: e.target.value })}
                placeholder="HD streaming, 1 user, ad-free"
              />
              <p className="mt-1 text-xs text-text-secondary">Comma-separated — one feature per item.</p>
            </div>
            {plans.length > 2 && (
              <button
                type="button"
                onClick={() => removePlan(plan.id)}
                className="text-xs text-error hover:underline"
              >
                Remove
              </button>
            )}
          </fieldset>
        ))}
      </div>

      {!allValid ? (
        <div className="p-4 bg-bg-secondary border border-border rounded-lg text-sm text-text-secondary">
          Enter a price for every plan to see the normalized cost comparison.
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-text mb-3">Normalized cost</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {parsed.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-lg border ${
                    cheapest && p.id === cheapest.id ? "border-primary bg-primary-light" : "border-border bg-bg-secondary"
                  }`}
                >
                  <p className="text-xs text-text-secondary">{p.name}</p>
                  <p className="text-xl font-bold text-text mt-1">{formatMoney(p.mCost ?? 0)}</p>
                  <p className="text-xs text-text-secondary">per month</p>
                  <p className="text-sm text-text-secondary mt-1">
                    {formatMoney(p.price)} {p.period === "year" ? "per year" : "per month"} ·{" "}
                    {formatMoney((p.mCost ?? 0) * 12)} per year
                  </p>
                  {cheapest && p.id === cheapest.id && (
                    <p className="text-xs font-medium text-primary mt-1">Lowest monthly cost</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {featureSet.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text mb-3">Feature matrix</h3>
              <div className="overflow-x-auto -mx-1 px-1">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <caption className="sr-only">Features included in each plan</caption>
                  <thead>
                    <tr className="bg-bg-secondary">
                      <th scope="col" className="text-left p-3 font-semibold text-text">
                        Feature
                      </th>
                      {parsed.map((p) => (
                        <th key={p.id} scope="col" className="text-center p-3 font-semibold text-text">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureSet.map((f) => (
                      <tr key={f} className="border-t border-border">
                        <th scope="row" className="text-left p-3 font-medium text-text">
                          {f}
                        </th>
                        {parsed.map((p) => (
                          <td key={p.id} className="text-center p-3">
                            {p.features.includes(f) ? (
                              <span className="text-accent font-bold" aria-label="included">
                                ✓
                              </span>
                            ) : (
                              <span className="text-text-light" aria-label="not included">
                                —
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="p-4 bg-primary-light rounded-lg text-sm text-text">
            <p>
              <strong>{cheapest?.name}</strong> has the lowest monthly equivalent at{" "}
              {formatMoney(cheapest?.mCost ?? 0)}/month. Cost differences and feature coverage are
              computed from the values you entered — verify current prices on the provider’s site
              before committing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
