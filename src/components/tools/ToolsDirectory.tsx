"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ToolRegistryEntry,
  ToolType,
  TOOL_TYPE_LABELS,
  searchTools,
} from "@/lib/tools";

interface ToolsDirectoryProps {
  tools: ToolRegistryEntry[];
}

const TYPE_FILTERS: { value: ToolType | "all"; label: string }[] = [
  { value: "all", label: "All tools" },
  { value: "compare", label: "Compare" },
  { value: "calculate", label: "Calculate" },
  { value: "match", label: "Match" },
  { value: "decide", label: "Decide" },
];

const DOMAIN_FILTERS = [
  { value: "all", label: "All categories" },
  { value: "universal", label: "Works on anything" },
  { value: "phones", label: "Phones" },
] as const;

type DomainFilter = (typeof DOMAIN_FILTERS)[number]["value"];

export default function ToolsDirectory({ tools }: ToolsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ToolType | "all">("all");
  const [domain, setDomain] = useState<DomainFilter>("all");

  const filtered = useMemo(() => {
    let list = searchTools(query, tools);
    if (type !== "all") list = list.filter((t) => t.type === type);
    if (domain !== "all") list = list.filter((t) => t.domain === domain);
    return list;
  }, [query, type, domain, tools]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="max-w-xl">
          <label htmlFor="tool-search" className="sr-only">
            Search tools
          </label>
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools — e.g. percentage, subscription, fit…"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setType(f.value)}
              aria-pressed={type === f.value}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                type === f.value
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {DOMAIN_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setDomain(f.value)}
              aria-pressed={domain === f.value}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                domain === f.value
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-white text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-text-secondary" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "tool" : "tools"} found
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 bg-bg-secondary border border-border rounded-xl text-center">
          <p className="text-text-secondary mb-3">
            No tools match “{query}”. Try a broader term like “compare”, “price” or “fit”.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setType("all");
              setDomain("all");
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((tool) => (
            <Link
              key={tool.tool_id}
              href={tool.route.replace(/\/$/, "")}
              className="flex flex-col p-6 bg-white border border-border rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  {TOOL_TYPE_LABELS[tool.type]} tool
                </span>
                <span className="text-xs px-2 py-0.5 bg-bg-secondary border border-border rounded-full text-text-secondary">
                  {tool.domain === "universal" ? "Any category" : "Phones"}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-text">{tool.name}</h2>
              <p className="text-sm text-text mt-1.5 italic">{tool.problem}</p>
              <p className="text-sm text-text-secondary mt-2 flex-1">{tool.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-medium text-text mb-1">You provide</p>
                  <ul className="text-text-secondary space-y-0.5">
                    {tool.inputs.slice(0, 3).map((i) => (
                      <li key={i}>· {i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-text mb-1">You get</p>
                  <ul className="text-text-secondary space-y-0.5">
                    {tool.outputs.slice(0, 3).map((o) => (
                      <li key={o}>· {o}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <span className="inline-block mt-4 text-sm font-medium text-primary">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
