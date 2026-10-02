# CompareForge — Existing Site Audit

**Date:** 2026-10-01
**Status:** Complete — prerequisite for `COMPAREFORGE-NEW-PAGE-RESEARCH.md`
**Scope:** read-only inspection of the repository before any expansion work.

---

## 1. Existing architecture

| Layer | Implementation |
| --- | --- |
| Framework | Next.js 16.3.5 App Router, React 19.2.8, TypeScript 5, Tailwind v4 |
| Routing | `src/app/**/page.tsx`; static export via `next build --webpack` + `scripts/build-static.mjs` → `out/` (128 HTML pages) |
| Build scripts | `npm run dev`, `npm run build`, `npm run build:static`, `npm run lint`; **no test suite exists** |
| Component architecture | Presentational server components + `"use client"` interactive islands (`SpecComparison`, `ProductSelector`, `InteractiveComparison`, `Header` menus, tool components) |
| Data architecture | JSON files under `src/data/`, statically imported by `src/lib/products.ts`, `comparisons.ts`, `guides.ts`. Only **smartphones** (~47 records) carry a product database |
| Comparison architecture | Two distinct engines (see §1.2) |
| SEO architecture | Per-route `metadata` exports, `src/app/sitemap.ts` (registry-driven), `src/app/robots.ts`, `src/lib/seo.ts`, `src/lib/schema.ts`, `src/components/layout/Breadcrumbs.tsx` (single `BreadcrumbList` source) |
| Content architecture | Curated `comparisons/*.json` (21), `guides/*.json` (10), hub configs in `src/data/category-hubs.ts` (6) |
| Testing architecture | None automated. Manual: lint, `next build`, static export, plus `scripts/seo-check.mjs` (structural audit of `out/`: H1 count, heading order, titles, descriptions, canonical uniqueness, JSON-LD validity, internal links, anchors, sitemap coverage) |
| Trust pages | `/about`, `/contact`, `/methodology`, `/privacy-policy`, `/terms`, `/cookie-policy`, `/disclaimer`, `/report-an-error` — all present |

### 1.1 Component reuse map (what already exists)

| Component | Purpose | Reused for new work? |
| --- | --- | --- |
| `SpecComparison` | Two-column, **user-entered** spec comparison with per-category attribute presets | Yes — extend `SPEC_CATEGORIES` with new presets |
| `CategoryHubPage` + `CategoryHubPage` config | Hub landing page: H1, tool, spec groups, focus items, use cases, extra sections, honesty note, related links, hub grid, FAQ + `FAQPage` schema, methodology | Yes — add new hub configs |
| `CompareHubLinks` / `COMPARE_HUBS` | Shared 6-up category grid, `highlight` prop | Yes — add new entries |
| `ProductSelector` / `ProductSelectorSection` | Search + select two phones → `?a=&b=` | Phone-only (`Smartphone` type) |
| `InteractiveComparison` / `ComparisonTable` | Dataset-driven side-by-side table with significance | Phone-only today; the pattern to generalise |
| `ToolShell` / `DynamicNoIndex` | Tool landing chrome + query-param noindex | Reusable |
| `Breadcrumbs` | `BreadcrumbList` JSON-LD with explicit `ListItem` | Reuse as-is |
| `seo.ts` / `schema.ts` | metadata + FAQ/ItemList/Breadcrumb builders | Reuse as-is |

### 1.2 Comparison architecture (the important fork)

CompareForge has **two** comparison mechanisms, and any expansion must pick the right one:

1. **Dataset-driven** — `ProductSelectorSection` + `InteractiveComparison`, reads `src/lib/products.ts`. Search/select real records, navigate to `?a=&b=`, highlight differences, significance ratings. **Works only for smartphones.**
2. **User-entered** — `SpecComparison` inside `CategoryHubPage`. Category attribute preset preloaded; the visitor types values from the manufacturer's page; nothing is stored or sent. **This is how every non-phone category (laptops, tablets, monitors, cameras, headphones) is served today**, with an explicit `DATA_NOTE` honesty block.

There is no third mechanism yet: no category-generic dataset model (`Product` with `id/brand/category/specifications/sources/region/lastVerified` for non-phone entities) and no searchable multi-product selector outside the phone engine.

---

## 2. Existing tools (registry — 20 built)

All entries: `status: "built"`, route `/tools/<slug>/`.

| Tool | URL | Category | Existing functionality | Main search intent | Keep/Modify |
| --- | --- | --- | --- | --- | --- |
| Product Comparison Tool | `/tools/product-comparison` | smartphones | Two-phone selector → side-by-side table | phone comparison tool | Keep — metadata retargeted to `phone comparison tool` |
| Use-Case Comparison | `/tools/use-case-comparison` | smartphones | Rank phones by use case from documented specs | best phone for… | Keep |
| Product Finder | `/tools/product-finder` | smartphones | Question-driven shortlist | find a phone | Keep |
| Alternatives Finder | `/tools/alternatives-finder` | smartphones | Alternatives to a chosen phone | alternatives to X | Keep |
| Compatibility Checker | `/tools/compatibility-checker` | smartphones | Accessory/network/software relation checks | is X compatible with Y | Keep |
| Percentage Difference | `/tools/percentage-difference-calculator` | universal | Two-number % difference | percentage difference | Keep |
| Percentage Change | `/tools/percentage-change-calculator` | universal | % change | percentage change | Keep |
| Price Difference | `/tools/price-difference-calculator` | universal | Price gap in % and absolute | price difference | Keep |
| Unit Price | `/tools/unit-price-calculator` | universal | Normalised cost per unit | unit price | Keep |
| Monthly vs Annual | `/tools/monthly-vs-annual-calculator` | universal | Billing-cycle comparison | monthly vs annual | Keep |
| Subscription Audit | `/tools/subscription-audit-calculator` | universal | Portfolio of subscriptions | subscription audit | Keep |
| Cost Per Use | `/tools/cost-per-use-calculator` | universal | Amortised cost | cost per use | Keep |
| Repair vs Replace | `/tools/repair-vs-replace-calculator` | universal | Repair decision threshold | repair or replace | Keep |
| Upgrade vs Keep | `/tools/upgrade-vs-keep-calculator` | universal | Upgrade decision threshold | upgrade or keep | Keep |
| Total Cost of Ownership | `/tools/total-cost-ownership-calculator` | universal | Lifetime cost | TCO | Keep |
| Dimension Comparison | `/tools/dimension-comparison` | universal | Two dimensions side by side | dimension comparison | Keep |
| Plan Comparison | `/tools/plan-comparison` | universal | Two service plans | plan comparison | Keep |
| Fit & Clearance | `/tools/fit-clearance-checker` | universal | Physical fit check | will it fit | Keep |
| Weighted Decision Matrix | `/tools/decision-matrix` | universal | Weighted scoring across options | decision matrix | Keep |
| Specification Comparison | `/tools/spec-comparison` | universal | Two arbitrary products, custom spec rows | spec comparison | Keep — extended with new presets |

**Not present:** any CPU, GPU, TV, smartwatch, projector, printer, earbuds, gaming-monitor or phone-camera/battery specific tool.

---

## 3. Existing categories

`src/data/categories.json` — 3 entries, all phone-derived:

| Category | Slug | Note |
| --- | --- | --- |
| Smartphones | `smartphones` | The only entity database |
| Foldable Phones | `foldable-phones` | Filter view of the phone DB |
| Budget Phones | `budget-phones` | Filter view of the phone DB |

Comparison hub pages (`CategoryHubPage`) exist for 6 categories: `phones`, `laptops`, `tablets`, `monitors`, `cameras`, `headphones` — five of which have **no database** and run on `SpecComparison` presets.

---

## 4. Existing indexable pages (128 HTML files, 126 sitemap URLs)

| Group | Count | Routes |
| --- | --- | --- |
| Static | 28 | `/`, `/compare`, `/compare/{phones,phone-size-comparison,laptops,tablets,monitors,cameras,headphones,iphone-vs-samsung,pixel-vs-iphone}`, `/best-phones`, `/products`, `/categories` + 3, `/guides`, `/methodology`, `/about`, `/contact`, 5 legal/trust |
| Tools | 21 | `/tools` + 20 registry tools |
| Curated comparisons | 21 | `/compare/<slug>` |
| Products | 47 | `/products/<slug>` |
| Guides | 10 | `/guides/<slug>` |
| Not indexed | 2 | `404`, `_not-found` (deliberately no canonical) |

Query-parameter states are `DynamicNoIndex` (`ToolShell`, `/compare/phones`) and `/tools/*?` is disallowed in `robots.ts`.

---

## 5. Existing keyword coverage

| Research file | Coverage |
| --- | --- |
| `docs/COMPAREFORGE-AHREFS-CONTENT-MAP.md` | 47-keyword Ahrefs export (US) — phones, product comparison, laptops/tablets/monitors/cameras/headphones, spec matrix |
| Ahrefs CSV (`google_us_best-phones-best-products_overview_2026-09-29…`) | Only phone/product-adjacent queries |
| `docs/KEYWORD-RESEARCH.md` | 100+ long-tail smartphone clusters |
| `docs/long-tail-keyword-research.md` | Calculator/match/comparison/decision intents for existing tools |

**Coverage gap:** the repository contains **no keyword research, no Ahrefs export and no SERP data for CPU, GPU, TV, smartwatch, projector, printer, earbuds, gaming monitors or phone camera/battery queries.** For all expansion candidates the honest entry for volume / KD / Traffic Potential is:

> `Not available in current project data.`

`docs/EXPANSION-ROADMAP.md` §5 names the documented category candidates as **laptops → TVs → wearables/audio**, evaluated on "meaningful differences, data availability, intent quality, maintenance load — not raw search volume". CPUs/GPUs/projectors/printers are not in the existing roadmap; they are new candidates introduced by this expansion brief.

---

## 6. Duplication risks (do NOT create new pages for these)

| Risk | Why | Existing page that already satisfies the intent |
| --- | --- | --- |
| `/phone-comparison`, `/smartphone-comparison`, `/mobile-comparison` | Same intent | `/compare/phones` |
| `/product-comparison`, `/compare-products` | Same intent | `/compare` |
| `/laptop-comparison`, `/compare-laptops` | Alias of the hub | `/compare/laptops` |
| `/tablet-comparison`, `/monitor-comparison`, `/camera-comparison`, `/headphone-comparison` | Alias of the hub | `/compare/<category>` |
| Generic `/gpu-comparison` as a *second* general-purpose compare tool | Would duplicate `spec-comparison` + `product-comparison` | `/tools/spec-comparison` already compares any two products |
| Per-model CPU/GPU/TV model-vs-model pages | Model-vs-model doorway pages are excluded by standing rule | — (do not generate) |
| `/earbuds-comparison` **if** it reuses the headphones attribute set unchanged | Near-duplicate of `/compare/headphones` | `/compare/headphones` |
| `/phone-battery-comparison` as a thin wrapper | `/compare/phones` already exposes a battery group; query volume in the only export is 30 (TP 300) | `/compare/phones` → "Compare Phone Specifications" |
| A second "gaming monitor" *tool* | Duplicate-purpose tool variant (roadmap §7.3) | Must be an attribute-module landing page on the monitor engine, not a new tool |

---

## 7. Standing rules inherited from the repo's own docs

- `TOOL-CATEGORY-STRATEGY.md` §2 boundary test — every tool must compare ≥2 options, serve a live category, have a distinct `purpose`, be explainable in one sentence, and use **logic we can source or compute without fabrication**.
- `EXPANSION-ROADMAP.md` §7 — no duplicate-purpose tool variants for SEO; no programmatic indexable pages for arbitrary tool outputs; no fake ratings/testing; no AI bulk content.
- `DATA-SOURCES.md` — never invent data/specs/prices/ratings/features; cite sources; Tier 1 manufacturer → Tier 2 authoritative third-party → Tier 3 retailer.
- `DATA-UPDATE-POLICY.md` — every published field carries a verification date; unverified fields are left empty rather than estimated.

---

## 8. Audit conclusion

1. The site is a **multi-tool platform on one real category** (smartphones) plus **five preset-driven hub pages** with no database.
2. The reusable pieces needed for expansion already exist (`CategoryHubPage`, `SpecComparison` presets, hub grids, registry, sitemap, SEO helpers) — but there is **no category-generic dataset model and no searchable non-phone selector**.
3. There is **no keyword data in the repository** for any expansion candidate, so no volume/KD/TP may be quoted.
4. The honest, architecture-consistent expansion is: add a **category dataset model + reusable category comparison tool**, extend the **attribute presets**, and add hub pages — reusing `CategoryHubPage` and the existing link/SEO machinery, while refusing pages whose data or intent is not there.
