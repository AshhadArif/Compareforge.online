/**
 * Engine regression tests. Run with: node --test scripts/engine.test.ts
 * (Node >= 22 runs TypeScript directly via type stripping.)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
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
} from "../src/lib/engine/computes";
import { formatMoney, formatNumber, formatPercent } from "../src/lib/engine/calc";

function output(result: { ok: boolean; output?: unknown; error?: string }) {
  assert.equal(result.ok, true, `expected ok, got error: ${result.error}`);
  return result.output as {
    title: string;
    lines: { label: string; value: string }[];
    steps?: { label: string; expression: string; result: string }[];
    interpretation?: string;
  };
}

function valueOf(o: { lines: { label: string; value: string }[] }, label: string) {
  const line = o.lines.find((l) => l.label === label);
  assert.ok(line, `missing line "${label}"`);
  return line!.value;
}

test("formatMoney keeps sub-cent precision", () => {
  assert.equal(formatMoney(0.009), "$0.009");
  assert.equal(formatMoney(0.0199), "$0.02");
  assert.equal(formatMoney(0.004995), "$0.004995");
  assert.equal(formatMoney(0.49315), "$0.49");
  assert.equal(formatMoney(0.5), "$0.50");
  assert.equal(formatMoney(19.42), "$19.42");
  assert.equal(formatMoney(1299), "$1,299");
  assert.equal(formatMoney(0), "$0.00");
  assert.equal(formatMoney(NaN), "—");
});

test("percentage difference uses the symmetric formula", () => {
  const o = output(percentageDifferenceCompute({ a: 45, b: 60 }));
  assert.equal(valueOf(o, "Percentage difference"), "28.57%");
  assert.equal(valueOf(o, "Absolute difference"), "15");
  assert.equal(valueOf(o, "Average of the two values"), "52.5");
  const step3 = o.steps!.find((s) => s.label.startsWith("Step 3"))!;
  assert.equal(step3.expression, "15 ÷ |52.5| × 100");
});

test("percentage difference guards zero cases", () => {
  assert.equal(percentageDifferenceCompute({ a: 0, b: 0 }).ok, false);
  assert.equal(percentageDifferenceCompute({ a: -50, b: 50 }).ok, false);
  assert.equal(percentageDifferenceCompute({ a: "", b: 5 }).ok, false);
});

test("percentage difference prints a signed average correctly in steps", () => {
  const o = output(percentageDifferenceCompute({ a: -10, b: -20 }));
  const step3 = o.steps!.find((s) => s.label.startsWith("Step 3"))!;
  assert.equal(step3.expression, "10 ÷ |-15| × 100");
  assert.equal(step3.result, "66.67%");
});

test("percentage change is directional and guards a zero original", () => {
  const o = output(percentageChangeCompute({ original: 799, newValue: 899 }));
  assert.equal(o.title, "Percentage increase");
  assert.equal(valueOf(o, "Percentage increase"), "12.52%");
  assert.equal(percentageChangeCompute({ original: 0, newValue: 5 }).ok, false);
  const down = output(percentageChangeCompute({ original: 100, newValue: 80 }));
  assert.equal(down.title, "Percentage decrease");
  assert.equal(valueOf(down, "Percentage decrease"), "20%");
});

test("percentage change of zero reports no change, not an increase", () => {
  const o = output(percentageChangeCompute({ original: 50, newValue: 50 }));
  assert.equal(o.title, "No change");
  assert.equal(valueOf(o, "Change"), "0%");
  assert.match(o.interpretation!, /no change from 50/);
});

test("price difference reports the gap, the cheaper option and the bulk saving", () => {
  const o = output(priceDifferenceCompute({ priceA: 699, priceB: 799, quantity: 3 }));
  assert.equal(valueOf(o, "Cash difference"), "$100");
  assert.equal(valueOf(o, "Which is cheaper"), "Price A");
  assert.equal(valueOf(o, "Gap vs cheaper price"), "14.31%");
  assert.equal(valueOf(o, "Saving on 3 units"), "$300");
});

test("price difference with a zero price still reads as a sentence", () => {
  const o = output(priceDifferenceCompute({ priceA: 0, priceB: 100 }));
  assert.match(o.interpretation!, /Price B is \$100 more expensive than the cheaper option \(\$0\.00\)\./);
  assert.doesNotMatch(o.interpretation!, /\s\s/);
});

test("price difference rejects negative prices", () => {
  assert.equal(priceDifferenceCompute({ priceA: -1, priceB: 5 }).ok, false);
});

test("unit price keeps sub-cent values visible", () => {
  const o = output(unitPriceCompute({ priceA: 4.5, quantityA: 500, priceB: 8, quantityB: 1000, unit: "ml" }));
  assert.equal(valueOf(o, "Option A per ml"), "$0.009");
  assert.equal(valueOf(o, "Option B per ml"), "$0.008");
  assert.equal(valueOf(o, "Unit-price gap"), "$0.001");
  assert.equal(valueOf(o, "Savings vs higher unit price"), "11.11%");
  assert.equal(valueOf(o, "Better deal"), "Option B");
});

test("unit price handles the per-100 scale", () => {
  const o = output(unitPriceCompute({ priceA: 4.5, quantityA: 5, priceB: 8, quantityB: 10, unit: "100 ml" }));
  assert.equal(valueOf(o, "Option A per 100 ml"), "$0.90");
  assert.equal(valueOf(o, "Option B per 100 ml"), "$0.80");
});

test("unit price rejects zero or negative quantities", () => {
  assert.equal(unitPriceCompute({ priceA: 1, quantityA: 0, priceB: 1, quantityB: 1, unit: "u" }).ok, false);
  assert.equal(unitPriceCompute({ priceA: -1, quantityA: 1, priceB: 1, quantityB: 1, unit: "u" }).ok, false);
});

test("monthly vs annual matches its published example", () => {
  const o = output(monthlyVsAnnualCompute({ monthly: 12.99, annual: 119 }));
  assert.equal(valueOf(o, "Saving with annual billing"), "$36.88");
  assert.equal(valueOf(o, "% saved paying yearly"), "23.66%");
  assert.equal(valueOf(o, "Effective monthly cost of annual plan"), "$9.92");
});

test("monthly vs annual warns when yearly is more expensive", () => {
  const o = output(monthlyVsAnnualCompute({ monthly: 10, annual: 150 }));
  assert.equal(valueOf(o, "Saving with annual billing"), "−$30.00");
  assert.ok(o.interpretation!);
});

test("cost per use matches its published example", () => {
  const o = output(costPerUseCompute({ price: 180, usesPerWeek: 3, weeksPerYear: 45, years: 1 }));
  assert.equal(valueOf(o, "Cost per use"), "$1.33");
  assert.equal(valueOf(o, "Uses over the period"), "135");
  assert.equal(valueOf(o, "Cost per day"), "$0.49");
});

test("cost per use rejects zero uses per week", () => {
  assert.equal(costPerUseCompute({ price: 10, usesPerWeek: 0 }).ok, false);
});

test("repair vs replace matches its published example", () => {
  const o = output(repairVsReplaceCompute({ repairCost: 250, replacementPrice: 1100, repairLifeMonths: 24, newLifeMonths: 48 }));
  assert.equal(valueOf(o, "Cost per month (repair path)"), "$10.42");
  assert.equal(valueOf(o, "Cost per month (replace path)"), "$22.92");
  assert.equal(valueOf(o, "Better value"), "Repair");
  assert.match(o.interpretation!, /less per month/);
});

test("repair vs replace never prints a bare em dash inside a sentence", () => {
  const o = output(repairVsReplaceCompute({ repairCost: 0, replacementPrice: 0, repairLifeMonths: 12, newLifeMonths: 12 }));
  assert.doesNotMatch(o.interpretation!, /\s—\s/);
});

test("upgrade vs keep requires the current device value", () => {
  const missing = upgradeVsKeepCompute({ upgradePrice: 999, monthsToKeep: 36, currentValue: "" });
  assert.equal(missing.ok, false);
  assert.match((missing as { error: string }).error, /current device/i);
});

test("upgrade vs keep matches its published example", () => {
  const o = output(upgradeVsKeepCompute({ upgradePrice: 999, currentValue: 350, tradeIn: 300, monthsToKeep: 36 }));
  assert.equal(valueOf(o, "Net upgrade cost (after trade-in)"), "$699");
  assert.equal(valueOf(o, "Upgrade cost per month"), "$19.42");
  assert.equal(valueOf(o, "Value at risk per month (keep)"), "$9.72");
  assert.equal(valueOf(o, "Monthly difference"), "+$9.69");
  assert.equal(valueOf(o, "Lower monthly cost"), "Keeping");
});

test("fit clearance checks width, height and depth with clearance", () => {
  const fits = output(fitClearanceCompute({ itemW: 75, itemH: 10, spaceW: 80, spaceH: 40, clearance: 2 }));
  assert.equal(valueOf(fits, "Verdict"), "Fits ✓");
  const noFit = output(fitClearanceCompute({ itemW: 90, itemH: 10, spaceW: 80, spaceH: 40, clearance: 2 }));
  assert.equal(valueOf(noFit, "Verdict"), "Does not fit ✗");
  assert.match(noFit.interpretation!, /width is/);
  assert.equal(fitClearanceCompute({ itemW: 0, itemH: 1, spaceW: 1, spaceH: 1, clearance: 0 }).ok, false);
});

test("format helpers never emit NaN", () => {
  assert.equal(formatNumber(NaN), "—");
  assert.equal(formatPercent(NaN), "—");
  assert.equal(formatPercent(66.6666), "66.67%");
});
