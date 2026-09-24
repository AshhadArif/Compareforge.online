"use client";

import { Fragment } from "react";
import { useState, useMemo } from "react";
import { Smartphone, ComparisonResult } from "@/data/types";
import { generateComparisonResult } from "@/lib/comparisons";

interface ComparisonTableProps {
  productA: Smartphone;
  productB: Smartphone;
}

export default function ComparisonTable({ productA, productB }: ComparisonTableProps) {
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set());

  const result: ComparisonResult = useMemo(
    () => generateComparisonResult(productA, productB, { showDifferencesOnly: differencesOnly }),
    [productA, productB, differencesOnly]
  );

  function toggleGroup(groupId: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  }

  const significanceBadge = (sig: string) => {
    if (sig === "identical") return null;
    if (sig === "high")
      return (
        <span className="text-xs font-medium text-error bg-error-light px-1.5 py-0.5 rounded ml-2">
          Key
        </span>
      );
    if (sig === "medium")
      return (
        <span className="text-xs font-medium text-warning bg-warning-light px-1.5 py-0.5 rounded ml-2">
          Notable
        </span>
      );
    return null;
  };

  if (result.groups.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No differences found between these products.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text">Specifications</h2>
        <button
          type="button"
          role="switch"
          aria-checked={differencesOnly}
          aria-label="Show differences only"
          onClick={() => setDifferencesOnly(!differencesOnly)}
          className={`relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            differencesOnly
              ? "bg-primary text-white"
              : "bg-bg-secondary text-text-secondary border border-border hover:border-primary"
          }`}
        >
          <span
            className={`inline-block w-8 h-4 rounded-full transition-colors ${
              differencesOnly ? "bg-white/30" : "bg-border"
            }`}
          >
            <span
              className={`block w-3 h-3 rounded-full bg-white shadow transition-transform mt-0.5 ${
                differencesOnly ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </span>
          Differences only
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto border border-border rounded-xl">
        <table
          className="w-full text-sm"
          role="table"
          aria-label={`Comparison of ${productA.fullName} and ${productB.fullName}`}
        >
          <thead>
            <tr className="border-b border-border bg-bg-secondary">
              <th className="text-left py-3 px-4 font-semibold text-text w-1/4 sticky left-0 bg-bg-secondary">
                Specification
              </th>
              <th className="text-left py-3 px-4 font-semibold text-text w-[37.5%]">
                {productA.fullName}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-text w-[37.5%]">
                {productB.fullName}
              </th>
            </tr>
          </thead>
          <tbody>
            {result.groups.map((group) => (
              <Fragment key={group.id}>
                <tr className="border-b border-border bg-primary-light/50">
                  <td colSpan={3} className="py-2.5 px-4 font-semibold text-primary text-sm">
                    {group.label}
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr
                    key={row.spec}
                    className={`border-b border-border-light hover:bg-bg-secondary/50 ${
                      row.significance === "high" ? "bg-error-light/30" : ""
                    }`}
                  >
                    <td className="py-2.5 px-4 font-medium text-text">
                      {row.label}
                      {significanceBadge(row.significance)}
                    </td>
                    <td className="py-2.5 px-4 text-text-secondary">{row.productA.display}</td>
                    <td className="py-2.5 px-4 text-text-secondary">{row.productB.display}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {result.groups.map((group) => {
          const isExpanded = expandedGroups.has(group.id);
          return (
            <div key={group.id} className="border border-border rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between px-4 py-3 bg-primary-light text-left"
              >
                <span className="font-semibold text-primary">{group.label}</span>
                <svg
                  className={`w-4 h-4 text-primary transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isExpanded && (
                <div className="divide-y divide-border-light">
                  {group.rows.map((row) => (
                    <div key={row.spec} className="px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text text-sm">{row.label}</span>
                        {significanceBadge(row.significance)}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="block text-xs text-text-light">{productA.model}</span>
                          <span className="text-text-secondary">{row.productA.display}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-text-light">{productB.model}</span>
                          <span className="text-text-secondary">{row.productB.display}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
