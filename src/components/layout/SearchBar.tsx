"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { comparisons } from "@/lib/comparisons";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return comparisons.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.metaDescription.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-text-secondary hover:text-primary"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setOpen(false)}>
          <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search comparisons..."
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {query.trim() && (
              <div className="mt-3 max-h-80 overflow-y-auto">
                {results.length === 0 ? (
                  <p className="text-sm text-text-secondary py-3">No comparisons found.</p>
                ) : (
                  <ul className="space-y-2">
                    {results.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/compare/${c.slug}`}
                          className="block p-3 rounded-lg hover:bg-bg-secondary transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setQuery("");
                          }}
                        >
                          <span className="text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded-full">
                            {c.category}
                          </span>
                          <p className="text-sm font-medium text-text mt-1">{c.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
