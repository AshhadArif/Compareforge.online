"use client";

import { useMemo, useState } from "react";

export interface SpecAttribute {
  key: string;
  label: string;
  unit?: string;
  type: "number" | "text";
}

export type SpecCategoryId =
  | "laptops"
  | "tablets"
  | "monitors"
  | "cameras"
  | "headphones"
  | "phones"
  | "custom";

interface SpecCategory {
  id: SpecCategoryId;
  label: string;
  singular: string;
  attributes: SpecAttribute[];
}

export const SPEC_CATEGORIES: SpecCategory[] = [
  {
    id: "laptops",
    label: "Laptops",
    singular: "laptop",
    attributes: [
      { key: "cpu", label: "Processor", type: "text" },
      { key: "cores", label: "CPU cores", type: "number" },
      { key: "ram", label: "RAM", unit: "GB", type: "number" },
      { key: "storage", label: "Storage", unit: "GB", type: "number" },
      { key: "screen", label: "Display size", unit: "in", type: "number" },
      { key: "resolution", label: "Resolution", type: "text" },
      { key: "refresh", label: "Refresh rate", unit: "Hz", type: "number" },
      { key: "gpu", label: "Graphics", type: "text" },
      { key: "battery", label: "Battery", unit: "Wh", type: "number" },
      { key: "weight", label: "Weight", unit: "kg", type: "number" },
      { key: "ports", label: "Ports", type: "text" },
      { key: "os", label: "Operating system", type: "text" },
      { key: "price", label: "Price", unit: "USD", type: "number" },
    ],
  },
  {
    id: "tablets",
    label: "Tablets",
    singular: "tablet",
    attributes: [
      { key: "screen", label: "Display size", unit: "in", type: "number" },
      { key: "resolution", label: "Resolution", type: "text" },
      { key: "refresh", label: "Refresh rate", unit: "Hz", type: "number" },
      { key: "chipset", label: "Chipset", type: "text" },
      { key: "ram", label: "RAM", unit: "GB", type: "number" },
      { key: "storage", label: "Storage", unit: "GB", type: "number" },
      { key: "battery", label: "Battery", unit: "mAh", type: "number" },
      { key: "camera", label: "Rear camera", unit: "MP", type: "number" },
      { key: "weight", label: "Weight", unit: "g", type: "number" },
      { key: "height", label: "Height", unit: "mm", type: "number" },
      { key: "width", label: "Width", unit: "mm", type: "number" },
      { key: "os", label: "Operating system", type: "text" },
      { key: "price", label: "Price", unit: "USD", type: "number" },
    ],
  },
  {
    id: "monitors",
    label: "Monitors",
    singular: "monitor",
    attributes: [
      { key: "screen", label: "Screen size", unit: "in", type: "number" },
      { key: "resolution", label: "Resolution", type: "text" },
      { key: "refresh", label: "Refresh rate", unit: "Hz", type: "number" },
      { key: "panel", label: "Panel type", type: "text" },
      { key: "aspect", label: "Aspect ratio", type: "text" },
      { key: "response", label: "Response time", unit: "ms", type: "number" },
      { key: "brightness", label: "Brightness", unit: "nits", type: "number" },
      { key: "ports", label: "Ports", type: "text" },
      { key: "hdr", label: "HDR", type: "text" },
      { key: "height", label: "Height", unit: "mm", type: "number" },
      { key: "width", label: "Width", unit: "mm", type: "number" },
      { key: "price", label: "Price", unit: "USD", type: "number" },
    ],
  },
  {
    id: "cameras",
    label: "Cameras",
    singular: "camera",
    attributes: [
      { key: "type", label: "Camera type", type: "text" },
      { key: "sensor", label: "Sensor format", type: "text" },
      { key: "mp", label: "Megapixels", unit: "MP", type: "number" },
      { key: "mount", label: "Lens mount", type: "text" },
      { key: "video", label: "Max video", type: "text" },
      { key: "stabilization", label: "Stabilization", type: "text" },
      { key: "iso", label: "ISO range", type: "text" },
      { key: "burst", label: "Burst rate", unit: "fps", type: "number" },
      { key: "weight", label: "Weight", unit: "g", type: "number" },
      { key: "battery", label: "Battery life", unit: "shots", type: "number" },
      { key: "price", label: "Price", unit: "USD", type: "number" },
    ],
  },
  {
    id: "headphones",
    label: "Headphones",
    singular: "headphone",
    attributes: [
      { key: "type", label: "Form factor", type: "text" },
      { key: "driver", label: "Driver", unit: "mm", type: "number" },
      { key: "connectivity", label: "Connectivity", type: "text" },
      { key: "anc", label: "Noise cancelling", type: "text" },
      { key: "battery", label: "Battery", unit: "h", type: "number" },
      { key: "weight", label: "Weight", unit: "g", type: "number" },
      { key: "codecs", label: "Codecs", type: "text" },
      { key: "mic", label: "Microphone", type: "text" },
      { key: "impedance", label: "Impedance", unit: "ohm", type: "number" },
      { key: "price", label: "Price", unit: "USD", type: "number" },
    ],
  },
  {
    id: "phones",
    label: "Phones",
    singular: "phone",
    attributes: [
      { key: "screen", label: "Display size", unit: "in", type: "number" },
      { key: "resolution", label: "Resolution", type: "text" },
      { key: "chipset", label: "Chipset", type: "text" },
      { key: "ram", label: "RAM", unit: "GB", type: "number" },
      { key: "storage", label: "Storage", unit: "GB", type: "number" },
      { key: "camera", label: "Main camera", unit: "MP", type: "number" },
      { key: "battery", label: "Battery", unit: "mAh", type: "number" },
      { key: "weight", label: "Weight", unit: "g", type: "number" },
      { key: "height", label: "Height", unit: "mm", type: "number" },
      { key: "os", label: "Operating system", type: "text" },
      { key: "price", label: "Price", unit: "USD", type: "number" },
    ],
  },
  {
    id: "custom",
    label: "Custom attributes",
    singular: "product",
    attributes: [],
  },
];

export function getCategory(id: SpecCategoryId): SpecCategory {
  return SPEC_CATEGORIES.find((c) => c.id === id) ?? SPEC_CATEGORIES[0];
}

type Diff = "same" | "higher" | "lower" | "different" | "missing" | "incomplete";

function compareValues(
  a: string,
  b: string,
  type: SpecAttribute["type"]
): Diff {
  const av = a.trim();
  const bv = b.trim();
  if (!av && !bv) return "missing";
  if (!av || !bv) return "incomplete";
  if (type === "number") {
    const na = Number(av.replace(/[^0-9.\-]/g, ""));
    const nb = Number(bv.replace(/[^0-9.\-]/g, ""));
    if (!Number.isFinite(na) || !Number.isFinite(nb)) {
      return av === bv ? "same" : "different";
    }
    if (na === nb) return "same";
    return nb > na ? "higher" : "lower";
  }
  return av.toLowerCase() === bv.toLowerCase() ? "same" : "different";
}

const DIFF_LABEL: Record<Diff, string> = {
  same: "Same",
  higher: "B is higher",
  lower: "B is lower",
  different: "Different",
  missing: "No data",
  incomplete: "Missing side",
};

const DIFF_CLASS: Record<Diff, string> = {
  same: "bg-bg-secondary text-text-light",
  higher: "bg-primary-light text-primary",
  lower: "bg-warning-light text-warning",
  different: "bg-accent-light text-accent",
  missing: "bg-bg-secondary text-text-light",
  incomplete: "bg-warning-light text-warning",
};

interface Row {
  key: string;
  label: string;
  unit?: string;
  type: SpecAttribute["type"];
  a: string;
  b: string;
}

function buildRows(attrs: SpecAttribute[]): Row[] {
  return attrs.map((attr) => ({ ...attr, a: "", b: "" }));
}

interface SpecComparisonProps {
  defaultCategory?: SpecCategoryId;
}

export default function SpecComparison({ defaultCategory = "laptops" }: SpecComparisonProps) {
  const [categoryId, setCategoryId] = useState<SpecCategoryId>(defaultCategory);
  const [rows, setRows] = useState<Row[]>(() => buildRows(getCategory(defaultCategory).attributes));
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<SpecAttribute["type"]>("text");

  const category = getCategory(categoryId);

  function switchCategory(next: SpecCategoryId) {
    setCategoryId(next);
    setRows(buildRows(getCategory(next).attributes));
    setDifferencesOnly(false);
  }

  function update(key: string, side: "a" | "b", value: string) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [side]: value } : r)));
  }

  function addCustomRow() {
    const label = newLabel.trim();
    if (!label) return;
    const key = `custom-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${rows.length}`;
    setRows((prev) => [...prev, { key, label, type: newType, a: "", b: "" }]);
    setNewLabel("");
  }

  function removeRow(key: string) {
    setRows((prev) => prev.filter((r) => r.key !== key));
  }

  function reset() {
    setRows(buildRows(category.attributes));
    setNameA("");
    setNameB("");
    setDifferencesOnly(false);
    setNewLabel("");
  }

  const evaluated = useMemo(
    () => rows.map((row) => ({ ...row, diff: compareValues(row.a, row.b, row.type) })),
    [rows]
  );

  const visible = differencesOnly
    ? evaluated.filter((r) => r.diff !== "same" && r.diff !== "missing")
    : evaluated;

  const comparedCount = evaluated.filter(
    (r) => r.diff !== "missing" && r.diff !== "incomplete"
  ).length;
  const sameCount = evaluated.filter((r) => r.diff === "same").length;

  const inputClass =
    "w-full px-3 py-2 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-text">Compare products side by side</h2>
          <p className="text-sm text-text-secondary mt-1">
            Pick a category, then enter the specifications you want to compare. Nothing is
            stored or sent anywhere — the table is computed in your browser.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="px-3 py-1.5 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-bg-secondary transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="mb-5">
        <label
          htmlFor="spec-category"
          className="block text-xs font-medium uppercase tracking-wide text-text-light mb-1.5"
        >
          Product category
        </label>
        <select
          id="spec-category"
          className={`${inputClass} max-w-xs`}
          value={categoryId}
          onChange={(e) => switchCategory(e.target.value as SpecCategoryId)}
        >
          {SPEC_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="spec-name-a"
            className="block text-xs font-medium uppercase tracking-wide text-text-light mb-1.5"
          >
            Product A name
          </label>
          <input
            id="spec-name-a"
            type="text"
            className={inputClass}
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            placeholder="e.g. Model X 14-inch"
          />
        </div>
        <div>
          <label
            htmlFor="spec-name-b"
            className="block text-xs font-medium uppercase tracking-wide text-text-light mb-1.5"
          >
            Product B name
          </label>
          <input
            id="spec-name-b"
            type="text"
            className={inputClass}
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            placeholder="e.g. Model Y 15-inch"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <caption className="sr-only">
            Side-by-side specification comparison for the two products you entered
          </caption>
          <thead>
            <tr className="bg-bg-secondary">
              <th scope="col" className="text-left p-3 font-semibold text-text w-1/4">
                Specification
              </th>
              <th scope="col" className="p-3 font-semibold text-text">
                {nameA.trim() || "Product A"}
              </th>
              <th scope="col" className="p-3 font-semibold text-text">
                {nameB.trim() || "Product B"}
              </th>
              <th scope="col" className="p-3 font-semibold text-text w-28">
                Difference
              </th>
              <th scope="col" className="p-3 w-10">
                <span className="sr-only">Remove row</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr className="border-t border-border">
                <td colSpan={5} className="p-4 text-center text-text-secondary">
                  {rows.length === 0
                    ? "Add a specification below to start comparing."
                    : "Every row matches or has no data. Turn off “Differences only” to see the full table."}
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr key={row.key} className="border-t border-border align-middle">
                  <th scope="row" className="text-left p-3 font-medium text-text">
                    {row.label}
                    {row.unit ? (
                      <span className="block text-xs font-normal text-text-light">
                        in {row.unit}
                      </span>
                    ) : null}
                  </th>
                  <td className="p-2">
                    <label className="sr-only" htmlFor={`${row.key}-a`}>
                      {row.label} for Product A
                    </label>
                    <input
                      id={`${row.key}-a`}
                      type="text"
                      inputMode={row.type === "number" ? "decimal" : undefined}
                      className={inputClass}
                      value={row.a}
                      onChange={(e) => update(row.key, "a", e.target.value)}
                      placeholder={row.type === "number" ? "0" : "—"}
                    />
                  </td>
                  <td className="p-2">
                    <label className="sr-only" htmlFor={`${row.key}-b`}>
                      {row.label} for Product B
                    </label>
                    <input
                      id={`${row.key}-b`}
                      type="text"
                      inputMode={row.type === "number" ? "decimal" : undefined}
                      className={inputClass}
                      value={row.b}
                      onChange={(e) => update(row.key, "b", e.target.value)}
                      placeholder={row.type === "number" ? "0" : "—"}
                    />
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${DIFF_CLASS[row.diff]}`}
                    >
                      {DIFF_LABEL[row.diff]}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(row.key)}
                      className="text-text-light hover:text-error text-xs"
                      aria-label={`Remove ${row.label}`}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <label className="inline-flex items-center gap-2 text-text-secondary">
          <input
            type="checkbox"
            className="rounded border-border text-primary focus:ring-primary"
            checked={differencesOnly}
            onChange={(e) => setDifferencesOnly(e.target.checked)}
          />
          Differences only
        </label>
        <span className="text-text-secondary">
          {comparedCount} specification{comparedCount !== 1 ? "s" : ""} entered ·{" "}
          {sameCount} identical
        </span>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <h3 className="text-sm font-semibold text-text mb-2">Add your own specification</h3>
        <div className="flex flex-wrap gap-2">
          <label className="sr-only" htmlFor="new-spec-label">
            Specification name
          </label>
          <input
            id="new-spec-label"
            type="text"
            className={`${inputClass} flex-1 min-w-[12rem]`}
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Thunderbolt ports"
          />
          <label className="sr-only" htmlFor="new-spec-type">
            Value type
          </label>
          <select
            id="new-spec-type"
            className={`${inputClass} w-auto`}
            value={newType}
            onChange={(e) => setNewType(e.target.value as SpecAttribute["type"])}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
          <button
            type="button"
            onClick={addCustomRow}
            disabled={!newLabel.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        <p className="mt-2 text-xs text-text-secondary">
          Enter values from the manufacturer&apos;s specification page. CompareForge does not
          invent specifications you have not provided.
        </p>
      </div>
    </div>
  );
}
