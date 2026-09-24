"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/engine/calc";

interface Sub {
  id: string;
  name: string;
  price: string;
  period: "month" | "year";
}

let uid = 0;

const PRESETS: Omit<Sub, "id">[] = [
  { name: "Streaming TV", price: "", period: "month" },
  { name: "Music streaming", price: "", period: "month" },
  { name: "Cloud storage", price: "", period: "month" },
];

export default function SubscriptionAudit() {
  const [subs, setSubs] = useState<Sub[]>(() =>
    PRESETS.map((p) => ({ ...p, id: `s${++uid}` }))
  );
  const [cancelId, setCancelId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<Sub>) =>
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const add = () =>
    setSubs((prev) =>
      prev.length >= 15
        ? prev
        : [...prev, { id: `s${++uid}`, name: "", price: "", period: "month" }]
    );

  const remove = (id: string) => {
    setSubs((prev) => prev.filter((s) => s.id !== id));
    if (cancelId === id) setCancelId(null);
  };

  const parsed = subs.map((s) => {
    const price = parseFloat(s.price);
    const valid = s.name.trim() !== "" && Number.isFinite(price) && price >= 0;
    const monthly = valid ? (s.period === "year" ? price / 12 : price) : null;
    return { ...s, valid, monthly, annual: monthly != null ? monthly * 12 : null };
  });

  const active = parsed.filter((s) => s.valid);
  const monthlyTotal = active.reduce((sum, s) => sum + (s.monthly ?? 0), 0);
  const annualTotal = monthlyTotal * 12;
  const sorted = [...active].sort((a, b) => (b.annual ?? 0) - (a.annual ?? 0));
  const cancelTarget = cancelId ? active.find((s) => s.id === cancelId) : null;

  const inputClass =
    "w-full px-3 py-2 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text">Your subscriptions</h2>
        <div className="flex gap-2">
          {subs.length < 15 && (
            <button
              type="button"
              onClick={add}
              className="px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light transition-colors"
            >
              + Add subscription
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-2 mb-5">
        {parsed.map((s) => (
          <li key={s.id} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-12 sm:col-span-5">
              <label htmlFor={`sub-${s.id}-name`} className="sr-only">
                Subscription name
              </label>
              <input
                id={`sub-${s.id}-name`}
                type="text"
                className={inputClass}
                placeholder="e.g. Video streaming"
                value={s.name}
                onChange={(e) => update(s.id, { name: e.target.value })}
              />
            </div>
            <div className="col-span-5 sm:col-span-3">
              <label htmlFor={`sub-${s.id}-price`} className="sr-only">
                Price
              </label>
              <input
                id={`sub-${s.id}-price`}
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                className={inputClass}
                placeholder="Price"
                value={s.price}
                onChange={(e) => update(s.id, { price: e.target.value })}
              />
            </div>
            <div className="col-span-5 sm:col-span-2">
              <label htmlFor={`sub-${s.id}-period`} className="sr-only">
                Billing period
              </label>
              <select
                id={`sub-${s.id}-period`}
                className={inputClass}
                value={s.period}
                onChange={(e) => update(s.id, { period: e.target.value as Sub["period"] })}
              >
                <option value="month">/ month</option>
                <option value="year">/ year</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-2 flex gap-1">
              <span className="text-xs text-text-secondary flex-1 self-center text-right">
                {s.valid && s.monthly != null ? `${formatMoney(s.monthly)}/mo` : ""}
              </span>
              <button
                type="button"
                onClick={() => remove(s.id)}
                aria-label={`Remove ${s.name || "subscription"}`}
                className="px-2 py-1 text-error hover:bg-error-light rounded-lg"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>

      {active.length === 0 ? (
        <div className="p-4 bg-bg-secondary border border-border rounded-lg text-sm text-text-secondary">
          Add your subscriptions with a name and price to see monthly and annual totals.
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 bg-primary-light rounded-lg border border-primary/20">
              <p className="text-xs text-text-secondary">Monthly total</p>
              <p className="text-2xl font-bold text-primary">{formatMoney(monthlyTotal)}</p>
            </div>
            <div className="p-4 bg-bg-secondary rounded-lg border border-border">
              <p className="text-xs text-text-secondary">Annual total</p>
              <p className="text-2xl font-bold text-text">{formatMoney(annualTotal)}</p>
            </div>
            <div className="p-4 bg-bg-secondary rounded-lg border border-border">
              <p className="text-xs text-text-secondary">Active subscriptions</p>
              <p className="text-2xl font-bold text-text">{active.length}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text mb-2">Biggest line items (annual)</h3>
            <ol className="space-y-1.5">
              {sorted.map((s) => (
                <li key={s.id} className="flex items-center justify-between text-sm bg-bg-secondary rounded-lg px-3 py-2">
                  <span className="text-text">{s.name}</span>
                  <span className="font-medium text-text">
                    {formatMoney(s.annual ?? 0)}/yr
                    <span className="text-text-light font-normal"> · {formatMoney(s.monthly ?? 0)}/mo</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-4 bg-white border border-border rounded-lg">
            <label htmlFor="cancel-select" className="block text-sm font-medium text-text mb-1.5">
              What would you save by cancelling one?
            </label>
            <select
              id="cancel-select"
              className={`${inputClass} max-w-md`}
              value={cancelId ?? ""}
              onChange={(e) => setCancelId(e.target.value || null)}
            >
              <option value="">Select a subscription…</option>
              {active.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {cancelTarget && cancelTarget.annual != null && (
              <p className="mt-2 text-sm text-text">
                Cancelling <strong>{cancelTarget.name}</strong> saves{" "}
                <strong className="text-primary">{formatMoney(cancelTarget.annual)}/year</strong>{" "}
                ({formatMoney(cancelTarget.monthly ?? 0)}/month) —{" "}
                {annualTotal > 0 ? `${((cancelTarget.annual / annualTotal) * 100).toFixed(1)}%` : "0%"}{" "}
                of your total subscription spend.
              </p>
            )}
          </div>

          <p className="text-xs text-text-secondary">
            Totals are computed from the prices you enter. Annual figures assume 12 equal months;
            trial periods, shared family plans and annual-only pricing should be entered as their
            yearly amounts.
          </p>
        </div>
      )}
    </div>
  );
}
