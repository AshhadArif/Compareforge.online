"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryDataset, CategoryProduct, CategorySpecField } from "@/data/category-datasets";

const URL_KEYS = ["a", "b", "c"] as const;
const NOT_VERIFIED = "Not verified";

interface CustomRow {
  key: string;
  label: string;
  type: "number" | "text";
  values: Record<string, string>;
}

function unique(ids: string[]): string[] {
  return [...new Set(ids)];
}

function toDisplay(field: CategorySpecField, value: unknown): { text: string; missing: boolean } {
  if (value === null || value === undefined || value === "") {
    return { text: NOT_VERIFIED, missing: true };
  }
  if (typeof value === "boolean") {
    return { text: value ? "Yes" : "No", missing: false };
  }
  if (typeof value === "number") {
    return { text: field.unit ? `${value} ${field.unit}` : String(value), missing: false };
  }
  return { text: String(value), missing: false };
}

function rowKey(field: CategorySpecField, products: CategoryProduct[]): string {
  const values = products.map((p) => {
    const raw = p.specs[field.key];
    return raw === null || raw === undefined ? "" : String(raw);
  });
  const present = values.filter((v) => v !== "");
  if (present.length < 2) return "unknown";
  return present.every((v) => v === present[0]) ? "same" : "different";
}

const CONFIDENCE_CLASS: Record<string, string> = {
  verified: "bg-primary-light text-primary",
  estimated: "bg-warning-light text-warning",
  unconfirmed: "bg-error-light text-error",
};

export default function CategoryComparisonTool({ dataset }: { dataset: CategoryDataset }) {
  const max = dataset.maxCompare;
  const [selected, setSelected] = useState<string[]>(() =>
    dataset.products.slice(0, Math.min(2, dataset.products.length)).map((p) => p.id)
  );
  const [query, setQuery] = useState("");
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customRows, setCustomRows] = useState<CustomRow[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<CustomRow["type"]>("text");
  const didReadUrl = useRef(false);
  const canWriteUrl = useRef(false);

  // Read ?a=&b=&c= once, deferred past hydration so the server-rendered
  // default table stays in the static HTML and the address bar stays shareable.
  useEffect(() => {
    if (didReadUrl.current) return;
    didReadUrl.current = true;
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = URL_KEYS.map((k) => params.get(k)).filter((v): v is string => Boolean(v));
      const valid = unique(fromUrl).filter((id) => dataset.products.some((p) => p.id === id));
      if (valid.length > 0) setSelected(valid.slice(0, max));
      canWriteUrl.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, [dataset.products, max]);

  useEffect(() => {
    if (!canWriteUrl.current) return;
    const params = new URLSearchParams();
    selected.forEach((id, i) => {
      if (URL_KEYS[i]) params.set(URL_KEYS[i], id);
    });
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      `${dataset.route}${qs ? `?${qs}` : ""}`
    );
  }, [selected, dataset.route]);

  const selectedProducts = useMemo(
    () =>
      selected
        .map((id) => dataset.products.find((p) => p.id === id))
        .filter((p): p is CategoryProduct => Boolean(p)),
    [selected, dataset.products]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dataset.products;
    return dataset.products.filter((p) =>
      `${p.brand} ${p.model} ${p.fullName}`.toLowerCase().includes(q)
    );
  }, [query, dataset.products]);

  const grouped = useMemo(() => {
    const groups: { name: string; fields: CategorySpecField[] }[] = [];
    dataset.fields.forEach((field) => {
      const last = groups[groups.length - 1];
      if (last && last.name === field.group) last.fields.push(field);
      else groups.push({ name: field.group, fields: [field] });
    });
    return groups;
  }, [dataset.fields]);

  const sameCount = useMemo(
    () => dataset.fields.filter((f) => rowKey(f, selectedProducts) === "same").length,
    [dataset.fields, selectedProducts]
  );

  const visibleGroups = useMemo(() => {
    if (!differencesOnly) return grouped;
    return grouped
      .map((g) => ({
        ...g,
        fields: g.fields.filter((f) => rowKey(f, selectedProducts) !== "same"),
      }))
      .filter((g) => g.fields.length > 0);
  }, [grouped, differencesOnly, selectedProducts]);

  const visibleCustomRows =
    differencesOnly && selectedProducts.length >= 2
      ? customRows.filter((r) => customRowState(r) !== "same")
      : customRows;
  const showCustomGroup = visibleCustomRows.length > 0;

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= max) return prev;
      return [...prev, id];
    });
  }

  function remove(id: string) {
    setSelected((prev) => prev.filter((x) => x !== id));
  }

  function reset() {
    setSelected(dataset.products.slice(0, Math.min(2, dataset.products.length)).map((p) => p.id));
    setQuery("");
    setDifferencesOnly(false);
    setCustomRows([]);
    setNewLabel("");
    setNewType("text");
  }

  function swapFirstTwo() {
    setSelected((prev) => {
      if (prev.length < 2) return prev;
      const next = [...prev];
      [next[0], next[1]] = [next[1], next[0]];
      return next;
    });
  }

  function addCustomRow() {
    const label = newLabel.trim();
    if (!label) return;
    setCustomRows((prev) => [
      ...prev,
      {
        key: `${prev.length}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        label,
        type: newType,
        values: {},
      },
    ]);
    setNewLabel("");
    setNewType("text");
  }

  function updateCustomValue(key: string, productId: string, value: string) {
    setCustomRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, values: { ...r.values, [productId]: value } } : r))
    );
  }

  function removeCustomRow(key: string) {
    setCustomRows((prev) => prev.filter((r) => r.key !== key));
  }

  function customRowState(row: CustomRow): "same" | "different" | "unknown" {
    const present = selectedProducts
      .map((p) => (row.values[p.id] ?? "").trim())
      .filter((v) => v !== "");
    if (present.length < 2) return "unknown";
    return present.every((v) => v === present[0]) ? "same" : "different";
  }

  async function copyLink() {
    const params = new URLSearchParams();
    selected.forEach((id, i) => {
      if (URL_KEYS[i]) params.set(URL_KEYS[i], id);
    });
    const qs = params.toString();
    const url = `${window.location.origin}${dataset.route}${qs ? `?${qs}` : ""}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

  const compareLabel =
    selectedProducts.length >= 2
      ? selectedProducts.map((p) => p.fullName).join(" vs ")
      : selectedProducts[0]?.fullName ?? "";

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-text">
            Compare {dataset.label} side by side
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {dataset.products.length} verified {dataset.label.toLowerCase()} records · up to{" "}
            {max} at a time · every value carries a source.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={swapFirstTwo}
            disabled={selectedProducts.length < 2}
            className="px-3 py-1.5 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Swap first two
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-3 py-1.5 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-bg-secondary transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="category-dataset-search"
          className="block text-xs font-medium uppercase tracking-wide text-text-light mb-1.5"
        >
          Search {dataset.label.toLowerCase()}
        </label>
        <input
          id="category-dataset-search"
          type="search"
          className={inputClass}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Filter by brand or model, e.g. "${dataset.products[0]?.brand ?? "brand"}"`}
        />
      </div>

      <div className="mb-4">
        <p
          id="selected-heading"
          className="text-xs font-medium uppercase tracking-wide text-text-light mb-2"
        >
          Selected for comparison ({selectedProducts.length}/{max})
        </p>
        <ul
          className="flex flex-wrap gap-2"
          aria-labelledby="selected-heading"
        >
          {selectedProducts.length === 0 ? (
            <li className="text-sm text-text-secondary">Nothing selected yet.</li>
          ) : (
            selectedProducts.map((p) => (
              <li key={p.id}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-light border border-primary/20 rounded-full text-sm text-text">
                  {p.fullName}
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    className="text-text-light hover:text-error"
                    aria-label={`Remove ${p.fullName} from the comparison`}
                  >
                    ✕
                  </button>
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mb-5 max-h-56 overflow-y-auto border border-border rounded-lg divide-y divide-border">
        {filtered.length === 0 ? (
          <p className="p-4 text-sm text-text-secondary">
            No record matches “{query}”. Clear the search to see all {dataset.products.length}{" "}
            records.
          </p>
        ) : (
          filtered.map((p) => {
            const isSelected = selected.includes(p.id);
            const atLimit = selected.length >= max && !isSelected;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                disabled={atLimit}
                aria-pressed={isSelected}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 text-sm transition-colors ${
                  isSelected
                    ? "bg-primary-light text-text"
                    : atLimit
                      ? "text-text-light cursor-not-allowed bg-white"
                      : "text-text-secondary hover:bg-bg-secondary"
                }`}
              >
                <span>
                  <span className={isSelected ? "font-semibold text-text" : "font-medium text-text"}>
                    {p.fullName}
                  </span>
                  {p.regionNote ? (
                    <span className="block text-xs text-text-light">{p.regionNote}</span>
                  ) : null}
                </span>
                <span className="text-xs font-medium shrink-0">
                  {isSelected ? "Selected" : atLimit ? "Limit reached" : "Add"}
                </span>
              </button>
            );
          })
        )}
      </div>

      {selectedProducts.length === 0 ? (
        <p className="p-4 border border-dashed border-border rounded-lg text-sm text-text-secondary">
          Select at least one record above to build the comparison table.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <caption className="sr-only">
                {compareLabel} — published specification comparison for {dataset.label}
              </caption>
              <thead>
                <tr className="bg-bg-secondary">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-bg-secondary text-left p-3 font-semibold text-text whitespace-nowrap"
                  >
                    Specification
                  </th>
                  {selectedProducts.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className="p-3 font-semibold text-text text-center min-w-[11rem]"
                    >
                      {p.fullName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleGroups.map((group) => (
                  <GroupRows
                    key={group.name}
                    groupName={group.name}
                    fields={group.fields}
                    products={selectedProducts}
                  />
                ))}
                {showCustomGroup && (
                  <>
                    <tr className="bg-bg-secondary">
                      <th
                        scope="colgroup"
                        colSpan={selectedProducts.length + 1}
                        className="text-left p-2.5 text-xs font-semibold uppercase tracking-wide text-text-light"
                      >
                        Your own rows
                      </th>
                    </tr>
                    {visibleCustomRows.map((row) => (
                      <tr key={row.key} className="border-t border-border align-top">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-white text-left p-3 font-medium text-text min-w-[13rem]"
                        >
                          <span className="flex items-start justify-between gap-2">
                            <span>
                              {row.label}
                              <span className="block text-xs font-normal text-text-light">
                                entered by you
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => removeCustomRow(row.key)}
                              className="text-text-light hover:text-error text-xs"
                              aria-label={`Remove ${row.label}`}
                            >
                              ✕
                            </button>
                          </span>
                        </th>
                        {selectedProducts.map((p) => (
                          <td key={p.id} className="p-2">
                            <label className="sr-only" htmlFor={`${row.key}-${p.id}`}>
                              {row.label} for {p.fullName}
                            </label>
                            <input
                              id={`${row.key}-${p.id}`}
                              type="text"
                              inputMode={row.type === "number" ? "decimal" : undefined}
                              className="w-full px-3 py-2 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                              value={row.values[p.id] ?? ""}
                              onChange={(e) => updateCustomValue(row.key, p.id, e.target.value)}
                              placeholder="—"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
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
                disabled={selectedProducts.length < 2}
              />
              Differences only
            </label>
            <span className="text-text-secondary" aria-live="polite">
              {dataset.fields.length + customRows.length} specifications
              {selectedProducts.length >= 2 ? ` · ${sameCount} identical across all selected` : ""}
              {differencesOnly ? " · identical rows hidden" : ""}
            </span>
            <button
              type="button"
              onClick={copyLink}
              className="px-3 py-1.5 text-sm font-medium text-primary border border-primary/40 rounded-lg hover:bg-primary-light transition-colors"
            >
              {copied ? "Link copied" : "Copy shareable link"}
            </button>
          </div>
        </>
      )}

      <div className="mt-5 pt-5 border-t border-border">
        <h3 className="text-sm font-semibold text-text mb-2">Add your own specification</h3>
        <div className="flex flex-wrap gap-2">
          <label className="sr-only" htmlFor="custom-row-label">
            Specification name
          </label>
          <input
            id="custom-row-label"
            type="text"
            className={`${inputClass} flex-1 min-w-[12rem]`}
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Warranty length"
          />
          <label className="sr-only" htmlFor="custom-row-type">
            Value type
          </label>
          <select
            id="custom-row-type"
            className={`${inputClass} w-auto`}
            value={newType}
            onChange={(e) => setNewType(e.target.value as CustomRow["type"])}
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
          Rows you add appear as “Your own rows” in the table above and are filled in by you.
          Nothing is stored or transmitted — the table is computed in your browser.
          CompareForge does not invent specifications you have not provided.
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <h3 className="text-sm font-semibold text-text mb-3">
          Sources for the selected {dataset.products.length === 1 ? "record" : "records"}
        </h3>
        {selectedProducts.length === 0 ? (
          <p className="text-sm text-text-secondary">Select a record to see its sources.</p>
        ) : (
          <ul className="space-y-3">
            {selectedProducts.map((p) => (
              <li key={p.id} className="text-sm">
                <span className="font-medium text-text">{p.fullName}</span>
                {p.regionNote ? (
                  <span className="block text-xs text-text-light">{p.regionNote}</span>
                ) : null}
                <ul className="mt-1 space-y-1">
                  {p.sources.map((s) => (
                    <li key={`${p.id}-${s.url}-${s.field}`} className="text-xs text-text-secondary">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary hover:underline break-all"
                      >
                        {s.siteName}
                      </a>{" "}
                      <span className="text-text-light">
                        ({s.field === "*" ? "all fields" : s.field}, accessed {s.dateAccessed})
                      </span>{" "}
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-medium ${CONFIDENCE_CLASS[s.confidence] ?? ""}`}
                      >
                        {s.confidence}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function GroupRows({
  groupName,
  fields,
  products,
}: {
  groupName: string;
  fields: CategorySpecField[];
  products: CategoryProduct[];
}) {
  return (
    <>
      <tr className="bg-bg-secondary">
        <th
          scope="colgroup"
          colSpan={products.length + 1}
          className="text-left p-2.5 text-xs font-semibold uppercase tracking-wide text-text-light"
        >
          {groupName}
        </th>
      </tr>
      {fields.map((field) => {
        const state = products.length >= 2 ? rowKey(field, products) : "unknown";
        return (
          <tr
            key={field.key}
            className={`border-t border-border align-top ${
              state === "same" ? "bg-bg-secondary/60" : ""
            }`}
          >
            <th
              scope="row"
              className="sticky left-0 z-10 bg-white text-left p-3 font-medium text-text min-w-[13rem]"
            >
              {field.label}
              {field.unit ? (
                <span className="block text-xs font-normal text-text-light">
                  in {field.unit}
                </span>
              ) : null}
              {field.note ? (
                <span className="block text-xs font-normal text-text-light mt-0.5 normal-case font-normal">
                  {field.note}
                </span>
              ) : null}
            </th>
            {products.map((p) => {
              const cell = toDisplay(field, p.specs[field.key]);
              return (
                <td key={p.id} className="p-3 text-center text-text">
                  {cell.missing ? (
                    <span className="text-text-light">{cell.text}</span>
                  ) : (
                    cell.text
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
