"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/categories", label: "Categories" },
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

const compareGroups = [
  {
    label: "By category",
    links: [
      { href: "/compare/phones", label: "Phone Comparison" },
      { href: "/compare/laptops", label: "Laptop Comparison" },
      { href: "/compare/tablets", label: "Tablet Comparison" },
      { href: "/compare/monitors", label: "Monitor Comparison" },
      { href: "/compare/cameras", label: "Camera Comparison" },
      { href: "/compare/headphones", label: "Headphone Comparison" },
    ],
  },
  {
    label: "Computers",
    links: [
      { href: "/cpu-comparison", label: "CPU Comparison" },
      { href: "/gpu-comparison", label: "GPU Comparison" },
      { href: "/gaming-monitor-comparison", label: "Gaming Monitor" },
    ],
  },
  {
    label: "Home and devices",
    links: [
      { href: "/tv-comparison", label: "TV Comparison" },
      { href: "/smartwatch-comparison", label: "Smartwatch Comparison" },
      { href: "/projector-comparison", label: "Projector Comparison" },
      { href: "/printer-comparison", label: "Printer Comparison" },
    ],
  },
  {
    label: "Phone comparisons",
    links: [
      { href: "/compare/phone-size-comparison", label: "Phone Size Comparison" },
      { href: "/phone-camera-comparison", label: "Phone Camera Comparison" },
      { href: "/compare/iphone-vs-samsung", label: "iPhone vs Samsung" },
      { href: "/compare/pixel-vs-iphone", label: "Pixel vs iPhone" },
    ],
  },
  {
    label: "By attribute",
    links: [
      { href: "/tools/spec-comparison", label: "Specification Comparison" },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison" },
      { href: "/tools/percentage-difference-calculator", label: "Percentage Difference" },
    ],
  },
  {
    label: "Popular",
    links: [
      { href: "/compare", label: "Product Comparison" },
      { href: "/best-phones", label: "Best Phones" },
    ],
  },
];

type Menu = "tools" | "compare" | null;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<Menu>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  function closeMenu() {
    setOpenMenu(null);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-primary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={26} height={26} className="h-[26px] w-[26px] shrink-0" />
            CompareForge
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <div className="relative" ref={navRef}>
              <div className="flex items-center gap-5">
                {(
                  [
                    { id: "compare" as Menu, label: "Compare", groups: compareGroups, wide: false },
                    { id: "tools" as Menu, label: "Tools", groups: toolGroups, wide: true },
                  ]
                ).map((menu) => (
                  <button
                    key={menu.label}
                    type="button"
                    className={`text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                      openMenu === menu.id ? "text-primary" : "text-text-secondary hover:text-primary"
                    }`}
                    onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                    aria-expanded={openMenu === menu.id}
                    aria-haspopup="true"
                  >
                    {menu.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${openMenu === menu.id ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ))}
              </div>

              {openMenu === "compare" && (
                <div className="absolute left-0 top-full mt-2 w-[46rem] bg-white border border-border rounded-xl shadow-lg p-5 grid grid-cols-3 gap-x-5 gap-y-5">
                  {compareGroups.map((group) => (
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
                              onClick={closeMenu}
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
                      href="/compare"
                      className="text-sm font-medium text-primary hover:underline"
                      onClick={closeMenu}
                    >
                      All comparisons and the product comparison tool →
                    </Link>
                  </div>
                </div>
              )}

              {openMenu === "tools" && (
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
                              onClick={closeMenu}
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
                      onClick={closeMenu}
                    >
                      All tools with search →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/compare"
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              Comparisons
            </Link>

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
              href="/compare/phones"
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
              <Link
                href="/compare"
                className="block px-3 py-2.5 text-base font-semibold text-primary hover:bg-bg-secondary rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Compare Products
              </Link>
              {compareGroups.flatMap((g) =>
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
            </div>
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
                href="/compare/phones"
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
