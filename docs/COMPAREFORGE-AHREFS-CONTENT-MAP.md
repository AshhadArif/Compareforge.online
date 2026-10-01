# CompareForge — Ahrefs Content Map

**Source:** `google_us_best-phones-best-products_overview_2026-09-29_00-11-45.csv`
**Market:** United States · English · 47 keywords exported
**Site:** https://compareforge.online
**Date:** 2026-09-29

This map translates the Ahrefs export into page targets. The companion report of what
actually shipped is `COMPAREFORGE-SEO-IMPLEMENTATION-REPORT.md`.

---

## 1. How the export is structured

| Column | Use in this map |
| --- | --- |
| Keyword | Target query |
| Difficulty (KD) | Effort estimate for a new/incomplete site |
| Volume | US monthly search volume |
| Traffic potential | Traffic the ranking page could also capture from related queries |
| Parent Keyword | Cluster identity (Ahrefs grouping) |
| Intents | Informational / Commercial / Branded |
| SERP Features | What the result page shows (AI Overview, PAA, Shopping, …) |

**Reading note:** `Traffic potential` frequently exceeds `Volume` because Ahrefs adds
traffic from rankable sibling queries. It is used for *prioritisation*, never as a
promised traffic figure.

---

## 2. Full keyword inventory

Sorted by US volume.

| # | Keyword | KD | Volume | Traffic potential | Parent keyword | Intent |
| ---: | --- | ---: | ---: | ---: | --- | --- |
| 1 | phone comparison | 37 | 23,000 | 6,700 | compare phones | Info, Commercial |
| 2 | iphone vs samsung | 1 | 8,200 | 400 | iphone vs samsung comparison | Info, Commercial, Branded |
| 3 | compare phones | 37 | 6,000 | 4,500 | compare phones | Info, Commercial |
| 4 | tablet comparison | 0 | 4,100 | 59,000 | ipad generations | Info, Commercial |
| 5 | phone size comparison | 46 | 3,000 | 1,800 | compare phone sizes | Info, Commercial |
| 6 | best products | 0 | 2,500 | 1,800 | best products | Info, Commercial |
| 7 | best phones | 0 | 2,400 | 81,000 | best smartphones | Info, Commercial |
| 8 | laptop comparison | 8 | 2,200 | 2,700 | laptop comparison | Info, Commercial |
| 9 | samsung vs iphone | 0 | 2,000 | 2,200 | samsung vs iphone | Info, Commercial, Branded |
| 10 | compare laptops | 0 | 1,800 | 2,500 | compare laptops | Info, Commercial |
| 11 | camera comparison | 54 | 1,400 | 1,800 | camera comparison | Info, Commercial |
| 12 | pixel vs iphone | 0 | 1,000 | 2,100 | google pixel vs iphone | Info, Commercial, Branded |
| 13 | monitor comparison | 45 | 800 | 900 | monitor comparison | Info, Commercial |
| 14 | product comparison | 8 | 700 | 2,800 | compare products | Info, Commercial |
| 15 | phone comparison tool | 0 | 600 | 5,400 | phonearena compare | Info, Commercial |
| 16 | which laptop should i buy | 54 | 600 | 800 | what laptop should i buy | Info, Commercial |
| 17 | compare products | 8 | 500 | 2,800 | compare products | Info, Commercial |
| 18 | laptop comparison tool | 13 | 500 | 3,300 | laptop comparison | Info, Commercial |
| 19 | compare monitors | 0 | 500 | 1,000 | monitor comparison | Info, Commercial |
| 20 | compare cameras | 56 | 450 | 2,200 | camera comparison | Info, Commercial |
| 21 | compare tablets | 2 | 400 | 1,100 | tablet comparison | Info, Commercial |
| 22 | headphone comparison | 14 | 400 | 450 | compare headphones | Info, Commercial |
| 23 | compare headphones | 14 | 400 | 450 | compare headphones | Info, Commercial |
| 24 | smartphone comparison | 37 | 350 | 6,900 | compare phones | Info, Commercial |
| 25 | compare laptop specs | 15 | 300 | 3,200 | laptop comparison | Info, Commercial |
| 26 | product comparison chart | 8 | 300 | 2,700 | comparison chart | Info, Commercial |
| 27 | iphone 17 vs galaxy s26 | — | 250 | — | — | Info, Commercial, Branded |
| 28 | compare features | 24 | 150 | 80 | feature compare | Info |
| 29 | mobile comparison | 35 | 150 | 500 | compare mobile | Info, Commercial |
| 30 | product comparison tool | 8 | 100 | 150 | compare products | Info, Commercial |
| 31 | feature comparison | 2 | 100 | 500 | product comparison matrix | Info |
| 32 | phone specs comparison | 7 | 100 | 11,000 | phone comparison | Info, Commercial |
| 33 | iphone 17 pro vs galaxy s26 ultra | — | 90 | — | — | — |
| 34 | spec comparison | 50 | 90 | 8,100 | pc part comparison | Info, Commercial |
| 35 | compare two products | 1 | 70 | 2,500 | compare products | Info, Commercial |
| 36 | compare products side by side | — | 40 | — | — | Info, Commercial |
| 37 | compare two phones | 51 | 40 | 13,000 | phone comparison | Info, Commercial |
| 38 | phone battery comparison | 21 | 30 | 300 | battery life tests | Info, Commercial |
| 39 | which phone has better camera | — | 10 | — | — | — |
| 40 | compare specifications | — | 10 | 40 | — | Info |
| 41 | specification comparison | — | 10 | 40 | — | Info |
| 42 | phone comparison by specs | — | — | — | — | — |
| 43 | compare phone specifications | — | — | 20 | — | Info, Commercial |
| 44 | phone feature comparison | — | — | 10 | — | Info |
| 45 | laptop comparison for gaming | — | — | — | — | — |
| 46 | product specs comparison | — | — | — | — | — |
| 47 | laptop comparison for students | — | — | — | — | — |

Rows 42, 45–47 have no volume and no traffic potential: they are recorded for completeness
and are not page targets.

---

## 3. Clusters

Ahrefs parent keywords collapse the export into 14 usable clusters. One canonical page per
cluster.

| Cluster (parent) | Keywords in cluster | Combined signal | Canonical target |
| --- | --- | --- | --- |
| compare phones | phone comparison, compare phones, smartphone comparison, phone specs comparison, compare two phones | 23,000 + 6,000 + 350 + 100 + 40 | `/compare/phones` |
| iphone vs samsung comparison | iphone vs samsung | 8,200 | `/compare/iphone-vs-samsung` |
| samsung vs iphone | samsung vs iphone | 2,000 | `/compare/iphone-vs-samsung` (consolidated) |
| compare phone sizes | phone size comparison | 3,000 | `/compare/phone-size-comparison` |
| ipad generations / tablet comparison | tablet comparison, compare tablets | 4,100 + 400 | `/compare/tablets` |
| laptop comparison | laptop comparison, laptop comparison tool, compare laptop specs | 2,200 + 500 + 300 | `/compare/laptops` |
| compare laptops | compare laptops | 1,800 | `/compare/laptops` |
| camera comparison | camera comparison, compare cameras | 1,400 + 450 | `/compare/cameras` |
| monitor comparison | monitor comparison, compare monitors | 800 + 500 | `/compare/monitors` |
| compare headphones | headphone comparison, compare headphones | 400 + 400 | `/compare/headphones` |
| google pixel vs iphone | pixel vs iphone | 1,000 | `/compare/pixel-vs-iphone` |
| compare products | product comparison, compare products, product comparison tool, compare two products | 700 + 500 + 100 + 70 | `/compare` |
| comparison chart | product comparison chart | 300 | `/compare` (chart section) |
| best smartphones | best phones (+ best products) | 2,400 (TP 81,000) | `/best-phones` |
| phonearena compare | phone comparison tool | 600 (TP 5,400) | `/tools/product-comparison` |
| pc part comparison | spec comparison | 90 (TP 8,100) | `/tools/spec-comparison` |
| feature compare / product comparison matrix | compare features, feature comparison | 150 + 100 | `/tools/spec-comparison` + `/tools/decision-matrix` |
| what laptop should i buy | which laptop should i buy | 600 | `/compare/laptops` (buyer-guidance section) |

---

## 4. Page targets

| Priority | URL | Primary keyword(s) | Type | Data basis | Status |
| --- | --- | --- | --- | --- | --- |
| P0 | `/compare/phones` | phone comparison, compare phones, smartphone comparison | Category hub + tool | Product DB (47 phones) | **Built** |
| P0 | `/compare` | product comparison, compare products, product comparison chart | Hub + tool | DB + user-entered | **Built (reworked)** |
| P0 | `/compare/iphone-vs-samsung` | iphone vs samsung, samsung vs iphone | Brand comparison | Product DB | **Built** |
| P1 | `/compare/phone-size-comparison` | phone size comparison | Tool hub | Product DB dimensions | **Built** |
| P1 | `/compare/laptops` | laptop comparison, compare laptops, compare laptop specs, laptop comparison tool | Category hub + tool | User-entered (no laptop DB) | **Built** |
| P1 | `/compare/tablets` | tablet comparison, compare tablets | Category hub + tool | User-entered | **Built** |
| P1 | `/best-phones` | best phones (TP 81,000) | Data-driven ranking | Product DB | **Built** |
| P1 | `/tools/spec-comparison` | spec comparison, feature comparison, specification comparison | Tool | User-entered | **Built** |
| P2 | `/compare/cameras` | camera comparison, compare cameras | Category hub + tool | User-entered | **Built** |
| P2 | `/compare/monitors` | monitor comparison, compare monitors | Category hub + tool | User-entered | **Built** |
| P2 | `/compare/headphones` | headphone comparison, compare headphones | Category hub + tool | User-entered | **Built** |
| P2 | `/compare/pixel-vs-iphone` | pixel vs iphone | Brand comparison | Product DB | **Built** |
| P2 | `/tools/product-comparison` | phone comparison tool, product comparison tool | Existing tool | Product DB | **Metadata updated** |
| P3 | `/compare/gaming-laptops` | laptop comparison for gaming | — | Not built (no data) | **Deferred** |
| P3 | `/compare/student-laptops` | laptop comparison for students | — | Not built (no data) | **Deferred** |
| P3 | model-vs-model pages | iphone 17 vs galaxy s26, iphone 17 pro vs galaxy s26 ultra | — | Not built (see §6) | **Excluded** |

---

## 5. Cannibalisation rules

1. **One cluster, one URL.** `samsung vs iphone` was folded into
   `/compare/iphone-vs-samsung` instead of becoming a second page for the same intent.
2. **`product comparison` vs `phone comparison`.** `/compare` owns the generic
   *product* comparison intent (PDP-level, all categories); `/compare/phones` owns the
   *phone* intent. Titles, H1s and descriptions are deliberately distinct.
3. **`phone comparison tool` vs `phone comparison`.** `/tools/product-comparison` keeps the
   tool-intent query; `/compare/phones` keeps the comparison-intent query. The hub links to
   the tool and vice versa, so both reinforce rather than compete.
4. **No `/product-comparison` route** was created — `/compare` already covers it.
5. **No `/laptop-comparison`, `/tablet-comparison` … routes** — the canonical form on this
   site is `/compare/<category>`, which also matches the site's existing URL architecture.
6. **Sibling category pages are separated by product type**, not by thin variations, so
   they cannot collide with each other.

---

## 6. Keywords deliberately not targeted

| Keyword | Volume | Why it was not built |
| --- | ---: | --- |
| iphone 17 vs galaxy s26 | 250 | iPhone 17 is not in the database (only iPhone 17e). Publishing it would require invented specifications. |
| iphone 17 pro vs galaxy s26 ultra | 90 | Same reason — no iPhone 17 Pro record exists. |
| which phone has better camera | 10 | Would require camera test results we do not run and do not publish. |
| which laptop should i buy | 600 | KD 54 and needs editorial buying advice per SKU; covered as a buyer-guidance section on `/compare/laptops` rather than a standalone verdict page. |
| compare features / feature comparison | 150 / 100 | Generic template-style queries; served by `/tools/spec-comparison` and `/tools/decision-matrix` instead of a doorway page. |
| mobile comparison | 150 | Synonym of `phone comparison`; served by `/compare/phones`. |
| laptop comparison for gaming / students | 0 | Zero volume and no laptop data. |
| product comparison chart | 300 | Chart intent served inside `/compare` output (comparison table) rather than a separate chart page. |

---

## 7. Traffic-potential outliers worth watching

These rows have modest volume but large traffic potential, which usually means the page can
rank for many sibling queries:

| Keyword | Volume | Traffic potential | Target |
| --- | ---: | ---: | --- |
| best phones | 2,400 | 81,000 | `/best-phones` |
| tablet comparison | 4,100 | 59,000 | `/compare/tablets` |
| compare two phones | 40 | 13,000 | `/compare/phones` |
| phone specs comparison | 100 | 11,000 | `/compare/phones` |
| spec comparison | 90 | 8,100 | `/tools/spec-comparison` |
| smartphone comparison | 350 | 6,900 | `/compare/phones` |
| phone comparison tool | 600 | 5,400 | `/tools/product-comparison` |
| laptop comparison tool | 500 | 3,300 | `/compare/laptops` |
| compare laptop specs | 300 | 3,200 | `/compare/laptops` |
| product comparison | 700 | 2,800 | `/compare` |

---

## 8. Master keyword → page mapping

One row per keyword in the Ahrefs export. `N/A` is used wherever the export does not carry
the value. "Primary" = the URL that is meant to rank for the query; "Supporting" = a URL
that reinforces the primary page without competing for the headline term.

| Keyword | Volume | KD | Traffic Potential | Parent Topic | Intent | Target Page | Primary/Supporting | Action |
| --- | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| phone comparison | 23,000 | 37 | 6,700 | compare phones | Informational, Commercial | `/compare/phones` | Primary | Built |
| iphone vs samsung | 8,200 | 1 | 400 | iphone vs samsung comparison | Informational, Commercial, Branded | `/compare/iphone-vs-samsung` | Primary | Built |
| compare phones | 6,000 | 37 | 4,500 | compare phones | Informational, Commercial | `/compare/phones` | Primary | Built |
| tablet comparison | 4,100 | 0 | 59,000 | ipad generations | Informational, Commercial | `/compare/tablets` | Primary | Built |
| phone size comparison | 3,000 | 46 | 1,800 | compare phone sizes | Informational, Commercial | `/compare/phone-size-comparison` | Primary | Built |
| best products | 2,500 | 0 | 1,800 | best products | Informational, Commercial | `/best-phones` | Supporting | Built |
| best phones | 2,400 | 0 | 81,000 | best smartphones | Informational, Commercial | `/best-phones` | Primary | Built |
| laptop comparison | 2,200 | 8 | 2,700 | laptop comparison | Informational, Commercial | `/compare/laptops` | Primary | Built |
| samsung vs iphone | 2,000 | 0 | 2,200 | samsung vs iphone | Informational, Commercial, Branded | `/compare/iphone-vs-samsung` | Supporting | Consolidated into one URL |
| compare laptops | 1,800 | 0 | 2,500 | compare laptops | Informational, Commercial | `/compare/laptops` | Primary | Built |
| camera comparison | 1,400 | 54 | 1,800 | camera comparison | Informational, Commercial | `/compare/cameras` | Primary | Built |
| pixel vs iphone | 1,000 | 0 | 2,100 | google pixel vs iphone | Informational, Commercial, Branded | `/compare/pixel-vs-iphone` | Primary | Built |
| monitor comparison | 800 | 45 | 900 | monitor comparison | Informational, Commercial | `/compare/monitors` | Primary | Built |
| product comparison | 700 | 8 | 2,800 | compare products | Informational, Commercial | `/compare` | Primary | Reworked |
| phone comparison tool | 600 | 0 | 5,400 | phonearena compare | Informational, Commercial | `/tools/product-comparison` | Primary | Metadata updated |
| which laptop should i buy | 600 | 54 | 800 | what laptop should i buy | Informational, Commercial | `/compare/laptops` | Supporting | Decision-framework section added |
| compare products | 500 | 8 | 2,800 | compare products | Informational, Commercial | `/compare` | Primary | Reworked |
| laptop comparison tool | 500 | 13 | 3,300 | laptop comparison | Informational, Commercial | `/compare/laptops` | Supporting | Built |
| compare monitors | 500 | 0 | 1,000 | monitor comparison | Informational, Commercial | `/compare/monitors` | Supporting | Built |
| compare cameras | 450 | 56 | 2,200 | camera comparison | Informational, Commercial | `/compare/cameras` | Supporting | Built |
| compare tablets | 400 | 2 | 1,100 | tablet comparison | Informational, Commercial | `/compare/tablets` | Supporting | Built |
| headphone comparison | 400 | 14 | 450 | compare headphones | Informational, Commercial | `/compare/headphones` | Primary | Built |
| compare headphones | 400 | 14 | 450 | compare headphones | Informational, Commercial | `/compare/headphones` | Supporting | Built |
| smartphone comparison | 350 | 37 | 6,900 | compare phones | Informational, Commercial | `/compare/phones` | Supporting | Built |
| compare laptop specs | 300 | 15 | 3,200 | laptop comparison | Informational, Commercial | `/compare/laptops` | Supporting | Built |
| product comparison chart | 300 | 8 | 2,700 | comparison chart | Informational, Commercial | `/compare` | Supporting | "How to Read a Product Comparison Chart" section |
| iphone 17 vs galaxy s26 | 250 | N/A | N/A | N/A | Informational, Commercial, Branded | — | — | Not built: iPhone 17 absent from database |
| compare features | 150 | 24 | 80 | feature compare | Informational | `/tools/spec-comparison` | Supporting | Built |
| mobile comparison | 150 | 35 | 500 | compare mobile | Informational, Commercial | `/compare/phones` | Supporting | Served by canonical phone page |
| product comparison tool | 100 | 8 | 150 | compare products | Informational, Commercial | `/tools/product-comparison` | Supporting | Metadata updated |
| feature comparison | 100 | 2 | 500 | product comparison matrix | Informational | `/tools/spec-comparison` | Supporting | Built |
| phone specs comparison | 100 | 7 | 11,000 | phone comparison | Informational, Commercial | `/compare/phones` | Supporting | "Phone Specs Comparison" section |
| iphone 17 pro vs galaxy s26 ultra | 90 | N/A | N/A | N/A | N/A | — | — | Not built: iPhone 17 Pro absent from database |
| spec comparison | 90 | 50 | 8,100 | pc part comparison | Informational, Commercial | `/tools/spec-comparison` | Primary | Built |
| compare two products | 70 | 1 | 2,500 | compare products | Informational, Commercial | `/compare` | Supporting | Reworked |
| compare products side by side | 40 | N/A | N/A | N/A | Informational, Commercial | `/compare` | Supporting | Reworked |
| compare two phones | 40 | 51 | 13,000 | phone comparison | Informational, Commercial | `/compare/phones` | Supporting | Built |
| phone battery comparison | 30 | 21 | 300 | battery life tests | Informational, Commercial | `/compare/phones` | Supporting | "Battery and charging" spec group |
| which phone has better camera | 10 | N/A | N/A | N/A | N/A | — | — | Not built: would require camera test data |
| compare specifications | 10 | N/A | 40 | N/A | Informational | `/tools/spec-comparison` | Supporting | Built |
| specification comparison | 10 | N/A | 40 | N/A | Informational | `/tools/spec-comparison` | Supporting | Built |
| compare phone specifications | N/A | N/A | 20 | N/A | Informational, Commercial | `/compare/phones` | Supporting | "Phone Specs Comparison" section |
| phone feature comparison | N/A | N/A | 10 | N/A | Informational | `/compare/phones` | Supporting | "Compare Phone Features" section |
| laptop comparison for gaming | N/A | N/A | N/A | N/A | N/A | `/compare/laptops` | Supporting | Use-case section; zero volume |
| laptop comparison for students | N/A | N/A | N/A | N/A | N/A | `/compare/laptops` | Supporting | Use-case section; zero volume |
| phone comparison by specs | N/A | N/A | N/A | N/A | N/A | `/compare/phones` | Supporting | Covered by "Phone Specs Comparison" |
| compare mobile | N/A | N/A | N/A | compare mobile | Informational, Commercial | `/compare/phones` | Supporting | Served by canonical phone page |

**Routes deliberately not created** (would have been thin, duplicate or unfabricatable):
`/phone-comparison`, `/laptop-comparison`, `/tablet-comparison`, `/product-comparison`,
`/samsung-vs-iphone`, `/compare/iphone-17-vs-galaxy-s26`. See §6.

---

## 9. Related documentation

- `KEYWORD-RESEARCH.md` — original keyword research for the phone vertical
- `INTERNAL-LINKING-PLAN.md` — link architecture
- `URL-SEO-MAP.md` / `URL-ARCHITECTURE.md` — URL rules
- `EDITORIAL-GUIDELINES.md` — claims and sourcing rules applied here
- `COMPAREFORGE-SEO-IMPLEMENTATION-REPORT.md` — what shipped against this map
