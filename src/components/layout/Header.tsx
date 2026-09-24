"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/compare", label: "Comparisons" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

const toolGroups = [
  {
    label: "Compare",
    links: [
      { href: "/tools/product-comparison", label: "Product Comparison" },
      { href: "/tools/use-case-comparison", label: "Use-Case Comparison" },
      { href: "/tools/plan-comparison", label: "Plan Comparison" },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison" },
    ],
  },
  {
    label: "Calculate",
    links: [
      { href: "/tools/percentage-difference-calculator", label: "Percentage Difference" },
      { href: "/tools/unit-price-calculator", label: "Unit Price" },
      { href: "/tools/monthly-vs-annual-calculator", label: "Monthly vs Annual" },
      { href: "/tools/subscription-audit-calculator", label: "Subscription Audit" },
    ],
  },
  {
    label: "Match & Decide",
    links: [
      { href: "/tools/compatibility-checker", label: "Compatibility Checker" },
      { href: "/tools/fit-clearance-checker", label: "Fit & Clearance" },
      { href: "/tools/product-finder", label: "Product Finder" },
      { href: "/tools/decision-matrix", label: "Decision Matrix" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toolsOpen) return;
    function onClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setToolsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [toolsOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            CompareForge
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <div className="relative" ref={toolsRef}>
              <button
                type="button"
                className={`text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  toolsOpen ? "text-primary" : "text-text-secondary hover:text-primary"
                }`}
                onClick={() => setToolsOpen((o) => !o)}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
              >
                Tools
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {toolsOpen && (
                <div className="absolute left-0 top-full mt-2 w-[34rem] bg-white border border-border rounded-xl shadow-lg p-5 grid grid-cols-3 gap-5">
                  {toolGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-light mb-2">
                        {group.label}
                      </p>
                      <ul className="space-y-1.5">
                        {group.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              className="text-sm text-text-secondary hover:text-primary"
                              onClick={() => setToolsOpen(false)}
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 pt-3 border-t border-border">
                    <Link
                      href="/tools"
                      className="text-sm font-medium text-primary hover:underline"
                      onClick={() => setToolsOpen(false)}
                    >
                      All tools with search →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/tools/product-comparison"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
            >
              Compare Phones
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 md:hidden">
            <SearchBar />
            <button
              className="p-2 -mr-2 text-text-secondary hover:text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-white" aria-label="Mobile navigation">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            <Link
              href="/tools"
              className="block px-3 py-2.5 text-base font-semibold text-primary hover:bg-bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              All Tools
            </Link>
            {toolGroups.flatMap((g) =>
              g.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-2 pl-6 text-sm text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              )),
            )}
            <div className="pt-2 border-t border-border mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-base font-medium text-text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-3 border-t border-border">
              <Link
                href="/tools/product-comparison"
                className="block text-center px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Compare Phones
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
