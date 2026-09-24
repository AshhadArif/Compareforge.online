"use client";

import { useState } from "react";
import { products } from "@/lib/products";

type Side = { source: "db" | "custom"; productId: string; w: string; h: string; d: string; label: string };

function sideDims(side: Side): { w: number | null; h: number | null; d: number | null } {
  if (side.source === "db") {
    const p = products.find((x) => x.id === side.productId);
    if (!p?.design.dimensions) return { w: null, h: null, d: null };
    return {
      w: p.design.dimensions.width,
      h: p.design.dimensions.height,
      d: p.design.dimensions.depth,
    };
  }
  const parse = (v: string) => {
    const n = parseFloat(v);
    return Number.isFinite(n) && n > 0 ? n : null;
  };
  return { w: parse(side.w), h: parse(side.h), d: parse(side.d) };
}

function pctDiff(a: number, b: number): string | null {
  if (a == null || b == null) return null;
  const avg = (Math.abs(a) + Math.abs(b)) / 2;
  if (avg === 0) return null;
  return `${(((Math.abs(a) - Math.abs(b)) / avg) * 100).toFixed(1)}%`;
}

export default function DimensionComparison() {
  const [sideA, setSideA] = useState<Side>({ source: "db", productId: products[0]?.id ?? "", w: "", h: "", d: "", label: "" });
  const [sideB, setSideB] = useState<Side>({ source: "custom", productId: "", w: "15", h: "7.5", d: "0.8", label: "" });

  const dimsA = sideDims(sideA);
  const dimsB = sideDims(sideB);

  const nameOf = (side: Side) =>
    side.source === "db"
      ? products.find((p) => p.id === side.productId)?.fullName ?? "Not selected"
      : side.label.trim() || "Custom item";

  const maxW = Math.max(dimsA.w ?? 0, dimsB.w ?? 0, 1);
  const maxH = Math.max(dimsA.h ?? 0, dimsB.h ?? 0, 1);

  const valid = dimsA.w != null && dimsA.h != null && dimsB.w != null && dimsB.h != null;

  const widthDiff = valid ? pctDiff(dimsB.w!, dimsA.w!) : null;
  const heightDiff = valid ? pctDiff(dimsB.h!, dimsA.h!) : null;
  const depthDiff = dimsA.d != null && dimsB.d != null ? pctDiff(dimsB.d, dimsA.d) : null;
  const faceA = valid ? dimsA.w! * dimsA.h! : null;
  const faceB = valid ? dimsB.w! * dimsB.h! : null;
  const faceDiff = faceA != null && faceB != null ? pctDiff(faceB, faceA) : null;

  const selector = (side: Side, set: (s: Side) => void, idPrefix: string) => (
    <div className="space-y-3">
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-wide text-primary mb-2">
          {idPrefix === "a" ? "Object A (reference)" : "Object B"}
        </legend>
        <div className="flex gap-2 mb-2">
          {(["db", "custom"] as const).map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => set({ ...side, source: src })}
              aria-pressed={side.source === src}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                side.source === src
                  ? "border-primary bg-primary text-white"
                  : "border-border text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {src === "db" ? "From our phones" : "Enter dimensions" }
            </button>
          ))}
        </div>
      </fieldset>

      {side.source === "db" ? (
        <div>
          <label htmlFor={`${idPrefix}-product`} className="block text-sm font-medium text-text mb-1.5">
            Phone
          </label>
          <select
            id={`${idPrefix}-product`}
            className="w-full px-3 py-2.5 bg-white border border-border rounded-lg text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={side.productId}
            onChange={(e) => set({ ...side, productId: e.target.value })}
          >
            <option value="">Select a phone…</option>
            {[...products].sort((a, b) => a.fullName.localeCompare(b.fullName)).map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label htmlFor={`${idPrefix}-label`} className="block text-sm font-medium text-text mb-1.5">
              Label (optional)
            </label>
            <input
              id={`${idPrefix}-label`}
              type="text"
              className="w-full px-3 py-2.5 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="e.g. My TV stand"
              value={side.label}
              onChange={(e) => set({ ...side, label: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["w", "h", "d"] as const).map((axis) => (
              <div key={axis}>
                <label htmlFor={`${idPrefix}-${axis}`} className="block text-xs font-medium text-text-secondary mb-1">
                  {axis === "w" ? "Width" : axis === "h" ? "Height" : "Depth"} (mm)
                </label>
                <input
                  id={`${idPrefix}-${axis}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  className="w-full px-2 py-2 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={axis === "w" ? "75.6" : axis === "h" ? "146.7" : "8.3"}
                  value={side[axis]}
                  onChange={(e) => set({ ...side, [axis]: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {selector(sideA, setSideA, "a")}
        {selector(sideB, setSideB, "b")}
      </div>

      {!valid ? (
        <div className="p-4 bg-bg-secondary border border-border rounded-lg text-sm text-text-secondary">
          Select a phone (or enter width and height) for both objects to see the size comparison.
        </div>
      ) : (
        <div>
          {/* Scale drawing */}
          <div className="p-4 bg-bg-secondary rounded-lg mb-5">
            <h2 className="text-sm font-semibold text-text mb-3">Relative size (to scale)</h2>
            <div className="flex items-end gap-6 flex-wrap" role="img" aria-label={`Scale drawing: ${nameOf(sideA)} vs ${nameOf(sideB)}`}>
              {[
                { name: nameOf(sideA), dims: dimsA, color: "border-primary bg-primary/20" },
                { name: nameOf(sideB), dims: dimsB, color: "border-accent bg-accent/20" },
              ].map((item) => (
                <div key={item.name} className="text-center">
                  <div
                    className={`${item.color} border-2 rounded-md transition-all`}
                    style={{
                      width: `${Math.max(24, ((item.dims.w ?? 0) / maxW) * 180)}px`,
                      height: `${Math.max(24, ((item.dims.h ?? 0) / maxH) * 180)}px`,
                    }}
                  />
                  <p className="text-xs text-text-secondary mt-2 max-w-[140px] break-words">{item.name}</p>
                  <p className="text-[11px] text-text-light">
                    {item.dims.w} × {item.dims.h} mm
                    {item.dims.d != null ? ` × ${item.dims.d}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Numbers */}
          <dl className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Width difference", value: widthDiff, a: dimsA.w, b: dimsB.w },
              { label: "Height difference", value: heightDiff, a: dimsA.h, b: dimsB.h },
              { label: "Depth difference", value: depthDiff, a: dimsA.d, b: dimsB.d },
              { label: "Front-face area difference", value: faceDiff, a: faceA, b: faceB },
            ].map((row) => (
              <div key={row.label} className="p-3 bg-white border border-border rounded-lg">
                <dt className="text-sm text-text-secondary">{row.label}</dt>
                <dd className="mt-1">
                  <span className="text-lg font-bold text-primary">{row.value ?? "—"}</span>
                  <span className="block text-xs text-text-light mt-0.5">
                    {row.a != null && row.b != null
                      ? `${row.a.toLocaleString()} vs ${row.b.toLocaleString()}`
                      : "Missing a dimension"}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-sm text-text-secondary">
            {nameOf(sideB)} is{" "}
            <strong>
              {widthDiff && parseFloat(widthDiff) > 0 ? `${widthDiff.replace("-", "")} wider` : ""}
              {widthDiff && parseFloat(widthDiff) < 0 ? `${widthDiff} narrower` : ""}
            </strong>{" "}
            than {nameOf(sideA)} on width. Percentages use the symmetric difference formula (divided
            by the average of both values).
          </p>
        </div>
      )}
    </div>
  );
}
