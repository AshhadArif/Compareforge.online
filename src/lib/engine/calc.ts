export interface CalcFieldOption {
  value: string;
  label: string;
}

export interface CalcField {
  id: string;
  label: string;
  type: "number" | "money" | "percent" | "select" | "text";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string;
  placeholder?: string;
  help?: string;
  options?: CalcFieldOption[];
  required?: boolean;
}

export interface CalcResultLine {
  label: string;
  value: string;
  emphasis?: "primary" | "secondary";
  hint?: string;
}

export interface CalcStep {
  label: string;
  expression: string;
  result: string;
}

export interface CalcOutput {
  title: string;
  lines: CalcResultLine[];
  steps?: CalcStep[];
  interpretation?: string;
  warnings?: string[];
}

export type CalcValues = Record<string, number | string>;

export type CalcCompute = (values: CalcValues) =>
  | { ok: true; output: CalcOutput }
  | { ok: false; error: string };

export interface CalcDefinition {
  fields: CalcField[];
  compute: CalcCompute;
  /** URL query params are synced so results are shareable (page gets noindexed by DynamicNoIndex). */
  shareable?: boolean;
}

export function num(values: CalcValues, id: string): number {
  const raw = values[id];
  if (typeof raw === "number") return raw;
  const parsed = parseFloat(String(raw ?? ""));
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function str(values: CalcValues, id: string): string {
  return String(values[id] ?? "");
}

export function fail(error: string): { ok: false; error: string } {
  return { ok: false, error };
}

export function ok(output: CalcOutput): { ok: true; output: CalcOutput } {
  return { ok: true, output };
}

export function formatNumber(n: number, maxDecimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const decimals = abs >= 100 ? Math.min(1, maxDecimals) : maxDecimals;
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

export function formatMoney(n: number, currency = "$"): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  // Magnitude-aware precision: dollars show cents; genuinely sub-cent results
  // (unit prices per ml / per GB) keep enough decimals to stay comparable
  // instead of collapsing to $0.00 on both sides of a comparison.
  const decimals = abs >= 100 ? 0 : abs >= 0.01 ? 2 : 6;
  return `${n < 0 ? "−" : ""}${currency}${abs.toLocaleString("en-US", {
    minimumFractionDigits: Math.min(2, decimals),
    maximumFractionDigits: decimals,
  })}`;
}

export function formatPercent(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}%`;
}
