import {
  CalcValues,
  fail,
  formatMoney,
  formatNumber,
  formatPercent,
  num,
  ok,
  str,
} from "./calc";

function requireFinite(values: CalcValues, ids: string[]): number[] | null {
  const out: number[] = [];
  for (const id of ids) {
    const n = num(values, id);
    if (!Number.isFinite(n)) return null;
    out.push(n);
  }
  return out;
}

// ---------- Percentage difference (symmetric) ----------
export function percentageDifferenceCompute(values: CalcValues) {
  const pair = requireFinite(values, ["a", "b"]);
  if (!pair) return fail("Enter both values to calculate the percentage difference.");
  const [a, b] = pair;
  if (a === 0 && b === 0) return fail("Percentage difference is undefined when both values are 0.");
  const absDiff = Math.abs(a - b);
  const average = (a + b) / 2;
  if (average === 0) return fail("Percentage difference is undefined when the average of the two values is 0.");
  const pct = (absDiff / Math.abs(average)) * 100;
  return ok({
    title: "Percentage difference",
    lines: [
      { label: "Percentage difference", value: formatPercent(pct), emphasis: "primary" },
      { label: "Absolute difference", value: formatNumber(absDiff) },
      { label: "Average of the two values", value: formatNumber(average) },
    ],
    steps: [
      { label: "Step 1 — absolute difference", expression: `|${formatNumber(a)} − ${formatNumber(b)}|`, result: formatNumber(absDiff) },
      { label: "Step 2 — average", expression: `(${formatNumber(a)} + ${formatNumber(b)}) ÷ 2`, result: formatNumber(average) },
      { label: "Step 3 — percentage difference", expression: `${formatNumber(absDiff)} ÷ ${formatNumber(average)} × 100`, result: formatPercent(pct) },
    ],
    interpretation: `${formatNumber(a)} and ${formatNumber(b)} differ by ${formatPercent(pct)} when measured against their average. This formula treats both values equally — neither is the baseline.`,
  });
}

// ---------- Percentage change (directional) ----------
export function percentageChangeCompute(values: CalcValues) {
  const pair = requireFinite(values, ["original", "newValue"]);
  if (!pair) return fail("Enter both the original value and the new value.");
  const [original, newValue] = pair;
  if (original === 0) return fail("Percentage change is undefined when the original value is 0.");
  const change = newValue - original;
  const pct = (change / Math.abs(original)) * 100;
  const direction = change === 0 ? "unchanged" : change > 0 ? "increased" : "decreased";
  return ok({
    title: pct >= 0 ? "Percentage increase" : "Percentage decrease",
    lines: [
      {
        label: change >= 0 ? "Percentage increase" : "Percentage decrease",
        value: formatPercent(Math.abs(pct)),
        emphasis: "primary",
      },
      { label: "Absolute change", value: `${change > 0 ? "+" : change < 0 ? "−" : ""}${formatNumber(Math.abs(change))}` },
      { label: "New value", value: formatNumber(newValue) },
    ],
    steps: [
      { label: "Step 1 — change", expression: `${formatNumber(newValue)} − ${formatNumber(original)}`, result: formatNumber(change) },
      { label: "Step 2 — percentage change", expression: `${formatNumber(change)} ÷ ${formatNumber(Math.abs(original))} × 100`, result: formatPercent(pct) },
    ],
    interpretation: `The value ${direction} by ${formatPercent(Math.abs(pct))} from ${formatNumber(original)} to ${formatNumber(newValue)}.`,
  });
}

// ---------- Price difference ----------
export function priceDifferenceCompute(values: CalcValues) {
  const pair = requireFinite(values, ["priceA", "priceB"]);
  if (!pair) return fail("Enter both prices.");
  const [priceA, priceB] = pair;
  if (priceA < 0 || priceB < 0) return fail("Prices cannot be negative.");
  const qtyRaw = num(values, "quantity");
  const quantity = Number.isFinite(qtyRaw) && qtyRaw > 0 ? Math.floor(qtyRaw) : 1;
  const diff = Math.abs(priceA - priceB);
  const cheaper = Math.min(priceA, priceB);
  const pctVsCheaper = cheaper > 0 ? (diff / cheaper) * 100 : null;
  const higher = priceA === priceB ? null : priceA > priceB ? "Price A" : "Price B";
  const lines = [
    { label: "Cash difference", value: formatMoney(diff), emphasis: "primary" as const },
    {
      label: "Which is cheaper",
      value: priceA === priceB ? "Same price" : (higher === "Price A" ? "Price B" : "Price A"),
    },
    {
      label: "Gap vs cheaper price",
      value: pctVsCheaper == null ? "—" : formatPercent(pctVsCheaper),
    },
  ];
  if (quantity > 1) {
    lines.push({ label: `Saving on ${quantity} units`, value: formatMoney(diff * quantity) });
  }
  const steps = [
    { label: "Step 1 — difference", expression: `|${formatMoney(priceA)} − ${formatMoney(priceB)}|`, result: formatMoney(diff) },
    ...(pctVsCheaper != null && cheaper > 0
      ? [
          {
            label: "Step 2 — percentage gap",
            expression: `${formatMoney(diff)} ÷ ${formatMoney(cheaper)} × 100`,
            result: formatPercent(pctVsCheaper),
          },
        ]
      : []),
  ];
  return ok({
    title: "Price difference",
    lines,
    steps,
    interpretation:
      priceA === priceB
        ? `Both options cost ${formatMoney(priceA)}.`
        : `${higher} is ${formatMoney(diff)} more expensive — ${pctVsCheaper != null ? `${formatPercent(pctVsCheaper)} above` : ""} the cheaper option (${formatMoney(cheaper)}).`,
  });
}

// ---------- Unit price ----------
export function unitPriceCompute(values: CalcValues) {
  const pair = requireFinite(values, ["priceA", "quantityA", "priceB", "quantityB"]);
  if (!pair) return fail("Enter price and quantity for both options.");
  const [priceA, quantityA, priceB, quantityB] = pair;
  if (priceA < 0 || priceB < 0) return fail("Prices cannot be negative.");
  if (quantityA <= 0 || quantityB <= 0) return fail("Quantities must be greater than 0.");
  const unit = str(values, "unit").trim() || "unit";
  const upA = priceA / quantityA;
  const upB = priceB / quantityB;
  const cheaperIsA = upA <= upB;
  const gap = Math.abs(upA - upB);
  const higherUp = Math.max(upA, upB);
  const savingsPct = higherUp > 0 ? (gap / higherUp) * 100 : 0;
  return ok({
    title: "Unit price comparison",
    lines: [
      { label: `Option A per ${unit}`, value: formatMoney(upA), emphasis: cheaperIsA ? "primary" : "secondary" },
      { label: `Option B per ${unit}`, value: formatMoney(upB), emphasis: !cheaperIsA ? "primary" : "secondary" },
      { label: "Better deal", value: `Option ${cheaperIsA ? "A" : "B"}` },
      { label: "Unit-price gap", value: formatMoney(gap) },
      { label: "Savings vs higher unit price", value: formatPercent(savingsPct) },
    ],
    steps: [
      { label: "Option A unit price", expression: `${formatMoney(priceA)} ÷ ${formatNumber(quantityA)}`, result: formatMoney(upA) },
      { label: "Option B unit price", expression: `${formatMoney(priceB)} ÷ ${formatNumber(quantityB)}`, result: formatMoney(upB) },
    ],
    interpretation: `Option ${cheaperIsA ? "A" : "B"} costs ${formatMoney(gap)} less per ${unit} — ${formatPercent(savingsPct)} below the higher unit price.`,
  });
}

// ---------- Monthly vs annual ----------
export function monthlyVsAnnualCompute(values: CalcValues) {
  const pair = requireFinite(values, ["monthly", "annual"]);
  if (!pair) return fail("Enter both the monthly price and the annual price.");
  const [monthly, annual] = pair;
  if (monthly < 0 || annual < 0) return fail("Prices cannot be negative.");
  const annualizedMonthly = monthly * 12;
  const saving = annualizedMonthly - annual;
  const pct = annualizedMonthly > 0 ? (saving / annualizedMonthly) * 100 : 0;
  const effectiveMonthly = annual / 12;
  return ok({
    title: "Monthly vs annual",
    lines: [
      {
        label: "Saving with annual billing",
        value: formatMoney(saving),
        emphasis: "primary",
      },
      { label: saving >= 0 ? "% saved paying yearly" : "% more paying yearly", value: formatPercent(Math.abs(pct)) },
      { label: "12 months paid monthly", value: formatMoney(annualizedMonthly) },
      { label: "Annual plan", value: formatMoney(annual) },
      { label: "Effective monthly cost of annual plan", value: formatMoney(effectiveMonthly) },
    ],
    steps: [
      { label: "Step 1 — annualized monthly", expression: `${formatMoney(monthly)} × 12`, result: formatMoney(annualizedMonthly) },
      { label: "Step 2 — saving", expression: `${formatMoney(annualizedMonthly)} − ${formatMoney(annual)}`, result: formatMoney(saving) },
      { label: "Step 3 — percent saved", expression: `${formatMoney(saving)} ÷ ${formatMoney(annualizedMonthly)} × 100`, result: formatPercent(pct) },
    ],
    interpretation:
      saving > 0
        ? `Paying yearly saves ${formatMoney(saving)} (${formatPercent(pct)}) versus monthly billing.`
        : saving === 0
          ? "Both options cost the same over a year."
          : `Annual billing costs ${formatMoney(Math.abs(saving))} more over a year than paying monthly.`,
    warnings: saving < 0 ? ["Annual billing is not always cheaper — this pair costs more yearly."] : undefined,
  });
}

// ---------- Cost per use ----------
export function costPerUseCompute(values: CalcValues) {
  const inputs = requireFinite(values, ["price", "usesPerWeek"]);
  if (!inputs) return fail("Enter the purchase price and how often you use it.");
  const [price, usesPerWeek] = inputs;
  if (price < 0) return fail("Price cannot be negative.");
  if (usesPerWeek <= 0) return fail("Uses per week must be greater than 0.");
  const weeksRaw = num(values, "weeksPerYear");
  const weeksPerYear = Number.isFinite(weeksRaw) && weeksRaw > 0 ? weeksRaw : 52;
  const yearsRaw = num(values, "years");
  const years = Number.isFinite(yearsRaw) && yearsRaw > 0 ? yearsRaw : 1;
  const usesPerYear = usesPerWeek * weeksPerYear;
  const totalUses = usesPerYear * years;
  const perUse = totalUses > 0 ? price / totalUses : NaN;
  const perYear = price / years;
  const perDay = price / (years * 365);
  return ok({
    title: "Cost per use",
    lines: [
      { label: "Cost per use", value: formatMoney(perUse), emphasis: "primary" },
      { label: "Uses over the period", value: formatNumber(totalUses, 0) },
      { label: "Cost per year", value: formatMoney(perYear) },
      { label: "Cost per day", value: formatMoney(perDay) },
    ],
    steps: [
      { label: "Total uses", expression: `${formatNumber(usesPerWeek)} uses/week × ${formatNumber(weeksPerYear, 0)} weeks × ${formatNumber(years, 1)} year(s)`, result: formatNumber(totalUses, 0) },
      { label: "Cost per use", expression: `${formatMoney(price)} ÷ ${formatNumber(totalUses, 0)} uses`, result: formatMoney(perUse) },
    ],
    interpretation: `Used about ${formatNumber(usesPerWeek, 1)} time(s) per week for ${formatNumber(years, 1)} year(s), each use costs ${formatMoney(perUse)}.`,
  });
}

// ---------- Repair vs replace ----------
export function repairVsReplaceCompute(values: CalcValues) {
  const inputs = requireFinite(values, ["repairCost", "replacementPrice", "repairLifeMonths", "newLifeMonths"]);
  if (!inputs) return fail("Enter repair cost, replacement price, and both expected lifespans in months.");
  const [repairCost, replacementPrice, repairLifeMonths, newLifeMonths] = inputs;
  if (repairCost < 0 || replacementPrice < 0) return fail("Costs cannot be negative.");
  if (repairLifeMonths <= 0 || newLifeMonths <= 0) return fail("Lifespans must be greater than 0 months.");
  const salvageRaw = num(values, "currentValue");
  const salvage = Number.isFinite(salvageRaw) && salvageRaw > 0 ? salvageRaw : 0;
  const repairNet = Math.max(repairCost - salvage, 0);
  const repairPerMonth = repairNet / repairLifeMonths;
  const replacePerMonth = replacementPrice / newLifeMonths;
  const repairWins = repairPerMonth <= replacePerMonth;
  const ratio = replacePerMonth > 0 ? repairPerMonth / replacePerMonth : NaN;
  return ok({
    title: "Repair vs replace",
    lines: [
      {
        label: "Better value",
        value: repairWins ? "Repair" : "Replace",
        emphasis: "primary",
      },
      { label: "Cost per month (repair path)", value: formatMoney(repairPerMonth) },
      { label: "Cost per month (replace path)", value: formatMoney(replacePerMonth) },
      { label: "Repair path total", value: formatMoney(repairNet) },
      { label: "Replace path total", value: formatMoney(replacementPrice) },
    ],
    steps: [
      { label: "Repair cost per month", expression: `${formatMoney(repairNet)} ÷ ${formatNumber(repairLifeMonths, 0)} months`, result: formatMoney(repairPerMonth) },
      { label: "Replacement cost per month", expression: `${formatMoney(replacementPrice)} ÷ ${formatNumber(newLifeMonths, 0)} months`, result: formatMoney(replacePerMonth) },
    ],
    interpretation: repairWins
      ? `Repairing costs ${formatMoney(repairPerMonth)} per month of life versus ${formatMoney(replacePerMonth)} for a new one — about ${formatPercent((1 - ratio) * 100)} less per month.`
      : `Replacing costs ${formatMoney(replacePerMonth)} per month of life versus ${formatMoney(repairPerMonth)} for the repair — the new item stretches further per dollar.`,
    warnings: [
      "Estimates only — lifespans you enter drive the result. Emotion, downtime, and warranty are not included.",
    ],
  });
}

// ---------- Upgrade vs keep ----------
export function upgradeVsKeepCompute(values: CalcValues) {
  const inputs = requireFinite(values, ["upgradePrice", "monthsToKeep"]);
  if (!inputs) return fail("Enter the upgrade price and how many months you would keep the new device.");
  const [upgradePrice, monthsToKeep] = inputs;
  if (upgradePrice < 0) return fail("Upgrade price cannot be negative.");
  if (monthsToKeep <= 0) return fail("Months to keep must be greater than 0.");
  const currentValueRaw = num(values, "currentValue");
  const currentValue = Number.isFinite(currentValueRaw) && currentValueRaw > 0 ? currentValueRaw : 0;
  const tradeInRaw = num(values, "tradeIn");
  const tradeIn = Number.isFinite(tradeInRaw) && tradeInRaw > 0 ? tradeInRaw : 0;
  const netCost = Math.max(upgradePrice - tradeIn, 0);
  const upgradePerMonth = netCost / monthsToKeep;
  const keepPerMonth = currentValue / monthsToKeep;
  const diffPerMonth = upgradePerMonth - keepPerMonth;
  const upgradeWins = diffPerMonth < 0;
  return ok({
    title: "Upgrade vs keep",
    lines: [
      { label: "Net upgrade cost (after trade-in)", value: formatMoney(netCost), emphasis: "primary" },
      { label: "Upgrade cost per month", value: formatMoney(upgradePerMonth) },
      { label: "Value at risk per month (keep)", value: formatMoney(keepPerMonth) },
      { label: "Monthly difference", value: `${diffPerMonth > 0 ? "+" : diffPerMonth < 0 ? "−" : ""}${formatMoney(Math.abs(diffPerMonth))}` },
      {
        label: "Lower monthly cost",
        value: Math.abs(diffPerMonth) < 0.005 ? "Roughly equal" : upgradeWins ? "Upgrading" : "Keeping",
      },
    ],
    steps: [
      { label: "Step 1 — net upgrade cost", expression: `${formatMoney(upgradePrice)}${tradeIn > 0 ? ` − ${formatMoney(tradeIn)} trade-in` : ""}`, result: formatMoney(netCost) },
      { label: "Step 2 — upgrade per month", expression: `${formatMoney(netCost)} ÷ ${formatNumber(monthsToKeep, 0)} months`, result: formatMoney(upgradePerMonth) },
      { label: "Step 3 — keep per month", expression: `${formatMoney(currentValue)} ÷ ${formatNumber(monthsToKeep, 0)} months`, result: formatMoney(keepPerMonth) },
    ],
    interpretation:
      Math.abs(diffPerMonth) < 0.005
        ? `Over ${formatNumber(monthsToKeep, 0)} months the two paths cost about the same per month — decide on features, not arithmetic.`
        : upgradeWins
          ? `Upgrading costs ${formatMoney(Math.abs(diffPerMonth))} less per month than letting your current device’s value drain over the same period.`
          : `Keeping your device is ${formatMoney(Math.abs(diffPerMonth))} cheaper per month than the net upgrade cost spread over ${formatNumber(monthsToKeep, 0)} months.`,
    warnings: [
      "This is arithmetic on the numbers you entered, not financial advice. Device values are estimates only.",
    ],
  });
}

// ---------- Total cost of ownership ----------
interface TcoOptionInput {
  name: string;
  upfront: number;
  recurring: number;
  recurringPeriod: "month" | "year";
  periodic: number;
  periodicPer: number;
}

export function totalCostOwnershipCompute(values: CalcValues) {
  const horizonRaw = num(values, "horizonYears");
  const horizonYears = Number.isFinite(horizonRaw) && horizonRaw > 0 ? horizonRaw : 1;
  const options: TcoOptionInput[] = [];
  for (const key of ["a", "b", "c"] as const) {
    const name = str(values, `name_${key}`).trim() || `Option ${key.toUpperCase()}`;
    const upfront = num(values, `upfront_${key}`);
    const recurring = num(values, `recurring_${key}`);
    const periodic = num(values, `periodic_${key}`);
    const periodicPer = num(values, `periodicPer_${key}`);
    const hasAny =
      (Number.isFinite(upfront) && upfront !== 0) ||
      (Number.isFinite(recurring) && recurring !== 0) ||
      (Number.isFinite(periodic) && periodic !== 0);
    if (!hasAny && key === "c" && !str(values, "name_c").trim()) continue;
    options.push({
      name,
      upfront: Number.isFinite(upfront) ? Math.max(upfront, 0) : 0,
      recurring: Number.isFinite(recurring) ? Math.max(recurring, 0) : 0,
      recurringPeriod: str(values, `recurringPeriod_${key}`) === "year" ? "year" : "month",
      periodic: Number.isFinite(periodic) ? Math.max(periodic, 0) : 0,
      periodicPer: Number.isFinite(periodicPer) && periodicPer > 0 ? periodicPer : 12,
    });
  }
  if (options.length < 2) return fail("Enter costs for at least two options.");

  const months = horizonYears * 12;
  const results = options.map((o) => {
    const recurringTotal =
      o.recurringPeriod === "month" ? o.recurring * months : o.recurring * horizonYears;
    const cycles = months / o.periodicPer;
    const periodicTotal = o.periodic * cycles;
    const total = o.upfront + recurringTotal + periodicTotal;
    return { ...o, recurringTotal, periodicTotal, total, perMonth: total / months };
  });
  const ranked = [...results].sort((x, y) => x.total - y.total);
  const cheapest = ranked[0];
  const priciest = ranked[ranked.length - 1];
  const gap = priciest.total - cheapest.total;
  return ok({
    title: `Total cost over ${formatNumber(horizonYears, 1)} year(s)`,
    lines: results.map((r, i) => ({
      label: r.name,
      value: formatMoney(r.total),
      emphasis: i === 0 ? undefined : undefined,
      hint: `≈ ${formatMoney(r.perMonth)}/month`,
    })),
    steps: [
      { label: "Time horizon", expression: `${formatNumber(horizonYears, 1)} year(s)`, result: `${formatNumber(months, 0)} months` },
      { label: "Cheapest option", expression: ranked.map((r) => r.name).join(" vs "), result: `${cheapest.name} — ${formatMoney(cheapest.total)}` },
    ],
    interpretation: `${cheapest.name} is cheapest over the horizon at ${formatMoney(cheapest.total)}; ${priciest.name} costs ${formatMoney(gap)} more.`,
    warnings: [
      "Assumes costs stay constant over the horizon — price rises, discounts and switching costs are not modeled.",
    ],
  });
}

// ---------- Fit & clearance ----------
export function fitClearanceCompute(values: CalcValues) {
  const dims = requireFinite(values, ["itemW", "itemH", "spaceW", "spaceH"]);
  if (!dims) return fail("Enter width and height for both the item and the space.");
  const [itemW, itemH, spaceW, spaceH] = dims;
  const itemDRaw = num(values, "itemD");
  const spaceDRaw = num(values, "spaceD");
  const itemD = Number.isFinite(itemDRaw) && itemDRaw > 0 ? itemDRaw : null;
  const spaceD = Number.isFinite(spaceDRaw) && spaceDRaw > 0 ? spaceDRaw : null;
  const clearanceRaw = num(values, "clearance");
  const clearance = Number.isFinite(clearanceRaw) && clearanceRaw >= 0 ? clearanceRaw : 0;
  if ([itemW, itemH, spaceW, spaceH].some((n) => n <= 0)) return fail("All dimensions must be greater than 0.");

  const needW = itemW + clearance * 2;
  const needH = itemH + clearance * 2;
  const needD = itemD != null ? itemD + clearance * 2 : null;
  const fitsW = needW <= spaceW;
  const fitsH = needH <= spaceH;
  const fitsD = needD == null || spaceD == null ? null : needD <= spaceD;
  const fits = fitsW && fitsH && (fitsD === null || fitsD);
  const remaining = {
    width: spaceW - itemW,
    height: spaceH - itemH,
    depth: spaceD != null && itemD != null ? spaceD - itemD : null,
  };
  const fails: string[] = [];
  if (!fitsW) fails.push(`width is ${formatNumber(needW - spaceW)} too wide for the space (incl. clearance)`);
  if (!fitsH) fails.push(`height is ${formatNumber(needH - spaceH)} too tall for the space (incl. clearance)`);
  if (fitsD === false && needD != null && spaceD != null) fails.push(`depth is ${formatNumber(needD - spaceD)} too deep for the space (incl. clearance)`);

  return ok({
    title: fits ? "It fits" : "It does not fit",
    lines: [
      { label: "Verdict", value: fits ? "Fits ✓" : "Does not fit ✗", emphasis: "primary" },
      { label: "Clearance left (width)", value: `${formatNumber(remaining.width)} left` },
      { label: "Clearance left (height)", value: `${formatNumber(remaining.height)} left` },
      ...(remaining.depth != null ? [{ label: "Clearance left (depth)", value: `${formatNumber(remaining.depth)} left` }] : []),
      ...(clearance > 0
        ? [{ label: "Required clearance per side", value: formatNumber(clearance) }]
        : [{ label: "Recommended clearance", value: "0 — add clearance for handles/cables" }]),
    ],
    steps: [
      { label: "Required width", expression: `${formatNumber(itemW)}${clearance > 0 ? ` + ${formatNumber(clearance)} × 2` : ""}`, result: `${formatNumber(needW)} (space: ${formatNumber(spaceW)})` },
      { label: "Required height", expression: `${formatNumber(itemH)}${clearance > 0 ? ` + ${formatNumber(clearance)} × 2` : ""}`, result: `${formatNumber(needH)} (space: ${formatNumber(spaceH)})` },
      ...(needD != null && spaceD != null
        ? [{ label: "Required depth", expression: `${formatNumber(itemD!)}${clearance > 0 ? ` + ${formatNumber(clearance)} × 2` : ""}`, result: `${formatNumber(needD)} (space: ${formatNumber(spaceD)})` }]
        : []),
    ],
    interpretation: fits
      ? `The item fits with ${formatNumber(remaining.width)} of width and ${formatNumber(remaining.height)} of height to spare${remaining.depth != null ? ` and ${formatNumber(remaining.depth)} of depth` : ""}. Keep some clearance for cables, handles or air flow.`
      : `The item does not fit: ${fails.join("; ")}. Measure again or look for a smaller option.`,
    warnings: fitsD === null || spaceD == null || itemD == null ? ["Depth was not entered — only width and height were checked."] : undefined,
  });
}
