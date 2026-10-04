import type { CalcDefinition, CalcValues } from "@/lib/engine/calc";
import { fail, formatMoney, num, ok } from "@/lib/engine/calc";
import {
  percentageDifferenceCompute,
  percentageChangeCompute,
  priceDifferenceCompute,
  unitPriceCompute,
  monthlyVsAnnualCompute,
  costPerUseCompute,
  repairVsReplaceCompute,
  upgradeVsKeepCompute,
  fitClearanceCompute,
} from "@/lib/engine/computes";

interface TcoInput {
  name: string;
  upfront: number;
  monthly: number;
  annualExtra: number;
}

function totalCostOwnershipCompute(values: CalcValues) {
  const horizonRaw = num(values, "horizonYears");
  const horizonYears = Number.isFinite(horizonRaw) && horizonRaw > 0 ? horizonRaw : 1;
  const months = Math.round(horizonYears * 12);

  const options: TcoInput[] = [];
  for (const key of ["a", "b", "c"] as const) {
    const name = String(values[`name_${key}`] ?? "").trim() || `Option ${key.toUpperCase()}`;
    const upfront = num(values, `upfront_${key}`);
    const monthly = num(values, `monthly_${key}`);
    const annualExtra = num(values, `annual_${key}`);
    const used =
      (Number.isFinite(upfront) && upfront !== 0) ||
      (Number.isFinite(monthly) && monthly !== 0) ||
      (Number.isFinite(annualExtra) && annualExtra !== 0) ||
      (key === "c" && String(values[`name_${key}`] ?? "").trim() !== "");
    if (!used) continue;
    options.push({
      name,
      upfront: Number.isFinite(upfront) ? Math.max(upfront, 0) : 0,
      monthly: Number.isFinite(monthly) ? Math.max(monthly, 0) : 0,
      annualExtra: Number.isFinite(annualExtra) ? Math.max(annualExtra, 0) : 0,
    });
  }
  if (options.length < 2) return fail("Enter costs for at least two options.");

  const results = options.map((o) => {
    const recurring = o.monthly * months;
    const extras = o.annualExtra * horizonYears;
    const total = o.upfront + recurring + extras;
    return { ...o, recurring, extras, total, perMonth: total / months };
  });
  const ranked = [...results].sort((x, y) => x.total - y.total);
  const cheapest = ranked[0];
  const priciest = ranked[ranked.length - 1];
  const gap = priciest.total - cheapest.total;

  return ok({
    title: `Total cost over ${horizonYears} year${horizonYears === 1 ? "" : "s"} (${months} months)`,
    lines: [
      ...results.map((r) => ({
        label: r.name,
        value: formatMoney(r.total),
        emphasis: r === cheapest ? ("primary" as const) : undefined,
        hint: `≈ ${formatMoney(r.perMonth)}/month · upfront ${formatMoney(r.upfront)} + recurring ${formatMoney(r.recurring)}${r.extras > 0 ? ` + extras ${formatMoney(r.extras)}` : ""}`,
      })),
      { label: "Spread between cheapest and priciest", value: formatMoney(gap) },
    ],
    steps: [
      { label: "Horizon", expression: `${horizonYears} year(s)`, result: `${months} months` },
      ...results.map((r) => ({
        label: r.name,
        expression: `${formatMoney(r.upfront)} + (${formatMoney(r.monthly)} × ${months}) + (${formatMoney(r.annualExtra)} × ${horizonYears})`,
        result: formatMoney(r.total),
      })),
    ],
    interpretation: `${cheapest.name} is the cheapest path over the horizon at ${formatMoney(cheapest.total)}; ${priciest.name} costs ${formatMoney(gap)} more (${formatMoney(gap / months)}/month).`,
    warnings: [
      "Assumes all costs stay constant over the horizon — price rises, discounts, interest and switching costs are not modeled.",
    ],
  });
}

export const CALCULATOR_DEFINITIONS: Record<string, CalcDefinition> = {
  "percentage-difference-calculator": {
    shareable: true,
    fields: [
      { id: "a", label: "Value A", type: "number", placeholder: "e.g. 45", required: true },
      { id: "b", label: "Value B", type: "number", placeholder: "e.g. 60", required: true },
    ],
    compute: percentageDifferenceCompute,
  },
  "percentage-change-calculator": {
    shareable: true,
    fields: [
      { id: "original", label: "Original value", type: "number", placeholder: "e.g. 799", required: true },
      { id: "newValue", label: "New value", type: "number", placeholder: "e.g. 899", required: true },
    ],
    compute: percentageChangeCompute,
  },
  "price-difference-calculator": {
    shareable: true,
    fields: [
      { id: "priceA", label: "Price A", type: "money", placeholder: "e.g. 699", required: true },
      { id: "priceB", label: "Price B", type: "money", placeholder: "e.g. 799", required: true },
      { id: "quantity", label: "Quantity (optional)", type: "number", placeholder: "e.g. 3", min: 1, help: "Multiply the per-unit gap by how many you would buy." },
    ],
    compute: priceDifferenceCompute,
  },
  "unit-price-calculator": {
    shareable: true,
    fields: [
      { id: "unit", label: "Unit name", type: "text", defaultValue: "oz", placeholder: "oz, ml, g, GB, m…" },
      { id: "priceA", label: "Option A — price", type: "money", placeholder: "e.g. 4.50", required: true },
      { id: "quantityA", label: "Option A — quantity", type: "number", placeholder: "e.g. 500", min: 0.01, required: true },
      { id: "priceB", label: "Option B — price", type: "money", placeholder: "e.g. 8.00", required: true },
      { id: "quantityB", label: "Option B — quantity", type: "number", placeholder: "e.g. 1000", min: 0.01, required: true },
    ],
    compute: unitPriceCompute,
  },
  "monthly-vs-annual-calculator": {
    shareable: true,
    fields: [
      { id: "monthly", label: "Monthly price", type: "money", placeholder: "e.g. 12.99", required: true },
      { id: "annual", label: "Annual price", type: "money", placeholder: "e.g. 119.00", required: true },
    ],
    compute: monthlyVsAnnualCompute,
  },
  "cost-per-use-calculator": {
    shareable: true,
    fields: [
      { id: "price", label: "Price (or total paid)", type: "money", placeholder: "e.g. 180", required: true },
      { id: "usesPerWeek", label: "Times used per week", type: "number", placeholder: "e.g. 3", min: 0.01, required: true },
      { id: "weeksPerYear", label: "Weeks per year you actually use it", type: "number", defaultValue: 52, min: 1, max: 52, help: "Lower this for seasonal items — 26 for example halves the annual usage." },
      { id: "years", label: "Years you expect to keep it", type: "number", defaultValue: 1, min: 0.01, step: 0.5 },
    ],
    compute: costPerUseCompute,
  },
  "repair-vs-replace-calculator": {
    shareable: true,
    fields: [
      { id: "repairCost", label: "Repair cost", type: "money", placeholder: "e.g. 250", required: true },
      { id: "replacementPrice", label: "Replacement price", type: "money", placeholder: "e.g. 899", required: true },
      { id: "repairLifeMonths", label: "Expected life after repair (months)", type: "number", placeholder: "e.g. 24", min: 1, required: true },
      { id: "newLifeMonths", label: "Expected life of a new one (months)", type: "number", placeholder: "e.g. 48", min: 1, required: true },
      { id: "currentValue", label: "Current value of the broken item (optional)", type: "money", placeholder: "e.g. 100", help: "Salvage or trade-in value — deducted from the repair cost." },
    ],
    compute: repairVsReplaceCompute,
  },
  "upgrade-vs-keep-calculator": {
    shareable: true,
    fields: [
      { id: "upgradePrice", label: "Price of the upgrade / new device", type: "money", placeholder: "e.g. 999", required: true },
      { id: "currentValue", label: "Value of your current device today", type: "money", placeholder: "e.g. 350", required: true, help: "What it is worth now (trade-in or resale estimate). Enter 0 if it has no resale value." },
      { id: "tradeIn", label: "Expected trade-in credit (optional)", type: "money", placeholder: "e.g. 300", help: "Reduces the net upgrade cost." },
      { id: "monthsToKeep", label: "Months you would keep the new device", type: "number", placeholder: "e.g. 36", min: 1, required: true },
    ],
    compute: upgradeVsKeepCompute,
  },
  "total-cost-ownership-calculator": {
    shareable: true,
    fields: [
      { id: "horizonYears", label: "Time horizon", type: "select", defaultValue: "3", options: [
        { value: "1", label: "1 year" },
        { value: "3", label: "3 years" },
        { value: "5", label: "5 years" },
      ]},
      { id: "name_a", label: "Option A name", type: "text", defaultValue: "Buy", placeholder: "Buy" },
      { id: "upfront_a", label: "Option A — upfront cost", type: "money", placeholder: "e.g. 899" },
      { id: "monthly_a", label: "Option A — recurring per month", type: "money", placeholder: "e.g. 0" },
      { id: "annual_a", label: "Option A — other annual costs", type: "money", placeholder: "e.g. 49" },
      { id: "name_b", label: "Option B name", type: "text", defaultValue: "Subscribe", placeholder: "Subscribe" },
      { id: "upfront_b", label: "Option B — upfront cost", type: "money", placeholder: "e.g. 0" },
      { id: "monthly_b", label: "Option B — recurring per month", type: "money", placeholder: "e.g. 29.99" },
      { id: "annual_b", label: "Option B — other annual costs", type: "money", placeholder: "e.g. 0" },
      { id: "name_c", label: "Option C name (optional)", type: "text", placeholder: "Leave blank to skip" },
      { id: "upfront_c", label: "Option C — upfront cost", type: "money", placeholder: "0" },
      { id: "monthly_c", label: "Option C — recurring per month", type: "money", placeholder: "0" },
      { id: "annual_c", label: "Option C — other annual costs", type: "money", placeholder: "0" },
    ],
    compute: totalCostOwnershipCompute,
  },
  "fit-clearance-checker": {
    shareable: true,
    fields: [
      { id: "itemW", label: "Item width", type: "number", unit: "cm", placeholder: "e.g. 14.5", min: 0.1, required: true },
      { id: "itemH", label: "Item height", type: "number", unit: "cm", placeholder: "e.g. 7.5", min: 0.1, required: true },
      { id: "itemD", label: "Item depth (optional)", type: "number", unit: "cm", placeholder: "e.g. 0.8", min: 0.1, help: "Leave blank to check width and height only." },
      { id: "spaceW", label: "Space width", type: "number", unit: "cm", placeholder: "e.g. 80", min: 0.1, required: true },
      { id: "spaceH", label: "Space height", type: "number", unit: "cm", placeholder: "e.g. 40", min: 0.1, required: true },
      { id: "spaceD", label: "Space depth (optional)", type: "number", unit: "cm", placeholder: "e.g. 30", min: 0.1 },
      { id: "clearance", label: "Clearance needed per side", type: "number", unit: "cm", defaultValue: 0, min: 0, help: "Room for cables, handles or air flow on each side." },
    ],
    compute: fitClearanceCompute,
  },
};
