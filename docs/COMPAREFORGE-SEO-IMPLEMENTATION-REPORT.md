# CompareForge — Ahrefs SEO Implementation Report

**Project:** https://compareforge.online (Next.js 16 App Router, static export)
**Keyword source:** `google_us_best-phones-best-products_overview_2026-09-29_00-11-45.csv`
**Companion doc:** `COMPAREFORGE-AHREFS-CONTENT-MAP.md`
**Date:** 2026-09-29

---

## 1. Outcome at a glance

| Check | Result |
| --- | --- |
| `npm run lint` | Pass, no errors or warnings |
| `npm run build` | Pass — 131 routes |
| `npm run build:static` | Pass — `out/` written (deploy contents of `out/`) |
| `out/sitemap.xml` | 126 URLs; all 11 new routes present |
| New indexable pages | 11 |
| New tool | 1 (`/tools/spec-comparison`) |
| Existing functionality | Preserved (comparison engine, all 19 prior tools, product DB) |
| Fabricated data | None |

---

## 2. Keyword → URL → metadata map

Every row below was verified against the built HTML in `out/`.

| Keyword cluster | URL | `<title>` | `<h1>` | Status |
| --- | --- | --- | --- | --- |
| phone comparison, compare phones, smartphone comparison | `/compare/phones` | Phone Comparison — Compare Phones Side by Side \| CompareForge | Phone Comparison | New |
| phone size comparison | `/compare/phone-size-comparison` | Phone Size Comparison — Compare Phone Dimensions \| CompareForge | Phone Size Comparison | New |
| product comparison, compare products, product comparison chart | `/compare` | Product Comparison — Compare Products Side by Side \| CompareForge | Product Comparison | Reworked |
| iphone vs samsung, samsung vs iphone | `/compare/iphone-vs-samsung` | iPhone vs Samsung — Side-by-Side Comparison \| CompareForge | iPhone vs Samsung | New |
| pixel vs iphone | `/compare/pixel-vs-iphone` | Pixel vs iPhone — Side-by-Side Comparison \| CompareForge | Pixel vs iPhone | New |
| laptop comparison, compare laptops, compare laptop specs, laptop comparison tool | `/compare/laptops` | Laptop Comparison — Compare Laptop Specs Side by Side \| CompareForge | Laptop Comparison | New |
| tablet comparison, compare tablets | `/compare/tablets` | Tablet Comparison — Compare Tablets Side by Side \| CompareForge | Tablet Comparison | New |
| monitor comparison, compare monitors | `/compare/monitors` | Monitor Comparison — Compare Monitors Side by Side \| CompareForge | Monitor Comparison | New |
| camera comparison, compare cameras | `/compare/cameras` | Camera Comparison — Compare Cameras Side by Side \| CompareForge | Camera Comparison | New |
| headphone comparison, compare headphones | `/compare/headphones` | Headphone Comparison — Compare Headphones Side by Side \| CompareForge | Headphone Comparison | New |
| best phones (TP 81,000) | `/best-phones` | Best Phones — Compare Specifications, Features and Prices \| CompareForge | Best Phones | New |
| spec comparison, feature comparison | `/tools/spec-comparison` | Specification Comparison Tool - Compare Any Two Products \| CompareForge | Specification Comparison Tool | New tool |
| phone comparison tool, product comparison tool | `/tools/product-comparison` | Product Comparison Tool — Compare Phones Side by Side \| CompareForge | Product Comparison Tool | Metadata only |
| (site-wide) | `/` | CompareForge — Compare Products, Phones & Specs Side by Side | Compare. Decide. With Better Tools | Metadata only |
| (directory) | `/categories` | Product Comparison Categories — Browse by Product Type \| CompareForge | Categories | Metadata only |
| (directory) | `/tools` | Interactive Comparison & Decision Tools \| CompareForge | Comparison & Decision Tools | Count made dynamic |

Meta descriptions were rewritten in the same pass so that each target page states its
primary keyword naturally and does not repeat another page's description.

---

## 3. Pages built

### 3.1 Phone comparison hub — `/compare/phones`

Highest-value target (23,000 / KD 37). Tool-first layout:

- `ProductSelectorSection` (basePath `/compare/phones`) + `InteractiveComparison`
- Spec group explainer, dimensions & weight, size comparison link, buying-use sections
- Popular phone comparisons and related guides
- FAQ block + `FAQPage` JSON-LD
- `DynamicNoIndex` so query-string variants of the comparison are not indexed
- Canonical `https://compareforge.online/compare/phones`

### 3.2 Phone size comparison — `/compare/phone-size-comparison`

Embeds the existing `DimensionComparison` tool with `basePath` support, plus height /
width / thickness / weight explanation sections, FAQ + `FAQPage` schema.

### 3.3 Product comparison hub — `/compare` (reworked)

Reframed from a plain list page into the "Product Comparison" hub:

- H1 `Product Comparison`, title/description targeting `product comparison` / `compare products`
- `SpecComparison` tool embedded by default (laptops preset)
- How-it-works, specification groups, feature categories, what-to-compare guidance
- Existing published comparison list preserved and linked
- `ItemList` + `FAQPage` JSON-LD preserved

### 3.4 Non-phone category hubs (5 pages)

`/compare/laptops`, `/compare/tablets`, `/compare/monitors`, `/compare/cameras`,
`/compare/headphones`.

**Data problem:** the site database only contains smartphones (~47 records). Publishing
laptop/tablet/monitor/camera/headphone comparison pages populated with invented
specifications would violate the project's sourcing rules.

**Solution:** each hub is rendered by a shared `CategoryHubPage` component driven by
`src/data/category-hubs.ts`, and embeds the new user-entered `SpecComparison` tool. Every
page carries an explicit note:

> **About product data on this page** — this site's verified product database covers
> smartphones. For this category, enter the specifications yourself; the tool computes the
> comparison from your input.

Content on these pages is limited to category-level guidance (what specifications matter,
how to read them, common trade-offs) — never per-model numbers.

### 3.5 Brand comparison pages

| Page | Keywords | Built from |
| --- | --- | --- |
| `/compare/iphone-vs-samsung` | 8,200 + 2,000 | `src/lib/brand-compare.ts` aggregations over real product records |
| `/compare/pixel-vs-iphone` | 1,000 | same |

Shared renderer `src/components/BrandVsBrandPage.tsx`: tool, key differences, flagship
`ComparisonTable`, brand stats and model lists, "who might prefer each", related
comparisons, FAQ + `FAQPage` schema.

All assertions are derived from database fields (OS, update commitment, battery capacity,
weight, memory, price, form factor). The methodology block on both pages states plainly
that no lab tests or scores are published.

`samsung vs iphone` (2,000) is consolidated into `/compare/iphone-vs-samsung` rather than
a second page.

### 3.6 `/best-phones`

Targets `best phones` (2,400, **traffic potential 81,000**). Because we do not run tests or
publish scores, the page uses transparent, computed rankings:

- Longest battery capacity / fastest wired charging / longest update commitment
- Leaderboards computed from the product DB at build time
- `UseCaseComparison` embed, published roundup links, hub links
- FAQ + `FAQPage` schema explaining the methodology

No "Editor's choice", no score, no unverifiable superlative.

### 3.7 New tool — `/tools/spec-comparison`

| Field | Value |
| --- | --- |
| tool_id | `spec-comparison` |
| route | `/tools/spec-comparison/` |
| type | compare |
| status | built |
| Registry | `src/data/tools/registry.ts` |

`src/components/tools/SpecComparison.tsx` (client component):

- Spec templates: laptops, tablets, monitors, cameras, headphones, phones, custom
- Two product columns, custom rows, add/remove/reset
- Per-row diff labels: same / higher / lower / different / missing / incomplete
- "Show differences only" toggle
- Empty-state guidance; no default or example values are presented as real products

This gives the site an on-topic, genuinely useful page for `spec comparison`
(traffic potential 8,100) without needing a non-phone product database.

---

## 4. Tool registry changes

`src/data/tools/registry.ts` — added `spec-comparison`. The registry drives:

- `/tools` directory listing (now 20 tools)
- Sitemap tool routes
- Tool metadata generation
- Related-tool blocks (`getRelatedTools`)

Counts across the site were hardcoded as "19 tools" in four places and are now computed
from `getBuiltTools().length`:

| File | Change |
| --- | --- |
| `src/app/page.tsx` | FAQ answer + hero + "Search All N Tools" CTA dynamic |
| `src/app/tools/page.tsx` | meta description, H1 subline, FAQ answer dynamic |
| `src/app/categories/page.tsx` | "Browse all N tools" dynamic |
| `src/components/layout/Footer.tsx` | footer blurb dynamic |

---

## 5. Internal linking

### 5.1 Navigation

`src/components/layout/Header.tsx` — rewritten:

- New **Compare** dropdown (grouped: By category / By attribute / Popular) covering all
  six category hubs, the size comparison, brand comparisons and `/compare`
- Existing **Tools** dropdown retained
- Unified `openMenu` state, Escape key and outside-click closing, `aria-expanded`
- "Compare Phones" primary CTA → `/compare/phones`
- Mobile panel includes the same comparison links
- Desktop nav trimmed to avoid crowding: Compare ▾ · Tools ▾ · Comparisons · Categories ·
  Guides · About

### 5.2 Footer

`src/components/layout/Footer.tsx` — new **Compare** column (9 links to every hub and
comparison), **Tools** column extended with `spec-comparison`, **Explore** column gains
`/best-phones`, `/compare/iphone-vs-samsung`, `/compare/pixel-vs-iphone`.

### 5.3 Shared hub component

`src/components/CompareHubLinks.tsx` exports `COMPARE_HUBS` and a grid component with a
`highlight` prop. Rendered on:

| Location | Placement |
| --- | --- |
| `/` | "Compare Products by Category" section |
| `/compare` | after tool + guidance sections |
| `/compare/phones` | highlight self |
| `/compare/phone-size-comparison` | highlight `/compare/phones` |
| `/categories` | "Compare by Product Type" grid |
| `/categories/[slug]` | after the buying-considerations block |
| `/best-phones` | "Compare Phones and Other Products" |
| each of the 5 category hubs | highlight self |

### 5.4 Page-level links added

- `/` — link row under Popular Phones (phone comparison, size comparison, best phones, DB)
- `/products` — "Compare These Phones" block linking to 5 comparison destinations
- `/tools/product-comparison` — "Phone comparison hub →" link beside Popular Phones
- `/categories/[slug]` — hub grid
- Brand comparison pages — already link to `/compare/phones`, `/compare/phone-size-comparison`,
  `/best-phones`, `/products`, `/methodology`, `/report-an-error`

---

## 6. Metadata changes

| File | Before | After |
| --- | --- | --- |
| `src/app/page.tsx` | canonical only (layout default) | Own title, description and OpenGraph |
| `src/app/categories/page.tsx` | "Categories" | "Product Comparison Categories — Browse by Product Type" |
| `src/app/tools/page.tsx` | "19 free comparison…" | Count computed at module scope |
| `src/app/tools/product-comparison/page.tsx` | generic tool description | "Free phone comparison tool…" (captures `phone comparison tool`, TP 5,400) |
| `src/app/compare/page.tsx` | list-page metadata | Product Comparison hub metadata |
| 11 new routes | — | Unique title, description, canonical |

Canonical tags verified on the built HTML (e.g. `https://compareforge.online/compare/laptops`,
`https://compareforge.online/compare/phones`). No page ships `noindex` except the
query-parameter variants handled by `DynamicNoIndex`.

---

## 7. Schema

| Schema | Pages |
| --- | --- |
| `WebSite` + `SearchAction` | `/` |
| `FAQPage` | `/`, `/tools`, `/compare`, `/compare/phones`, `/compare/phone-size-comparison`, `/compare/<5 categories>`, both brand pages, `/best-phones`, `/tools/product-comparison` |
| `ItemList` | `/compare` (published comparison list) |
| `Breadcrumb` | via `Breadcrumbs` component on hub/tool pages |

No `AggregateRating`, no `Review`, no `Offer` schema — the site publishes no ratings,
reviews or prices-as-offers, so none were added.

---

## 8. Sitemap & routes

`src/app/sitemap.ts` extended with:

```
/best-phones
/compare/phones
/compare/phone-size-comparison
/compare/laptops
/compare/tablets
/compare/monitors
/compare/cameras
/compare/headphones
/compare/iphone-vs-samsung
/compare/pixel-vs-iphone
/tools/spec-comparison   (via registry route)
```

Verified in the built `out/sitemap.xml`: **126 URLs**, all 11 new routes present.

Build route output (excerpt):

```
○ /best-phones
○ /compare            (hub)
○ /compare/cameras
○ /compare/headphones
○ /compare/iphone-vs-samsung
○ /compare/laptops
○ /compare/monitors
○ /compare/phone-size-comparison
○ /compare/phones
○ /compare/pixel-vs-iphone
○ /compare/tablets
○ /tools/spec-comparison
```

---

## 9. What was deliberately NOT done

| Omission | Reason |
| --- | --- |
| `/compare/iphone-17-vs-galaxy-s26` (250 vol) | iPhone 17 is not in the database — only iPhone 17e. Publishing it would require invented specs. |
| `/compare/iphone-17-pro-vs-galaxy-s26-ultra` (90) | Same. |
| Per-model non-phone comparisons | No laptop/tablet/monitor/camera/headphone records exist. |
| New `/product-comparison` route | Would cannibalise `/compare`. |
| `/laptop-comparison`, `/tablet-comparison` … alias routes | Would cannibalise `/compare/<category>` and break URL consistency. |
| `samsung vs iphone` as a separate page | Consolidated into `/compare/iphone-vs-samsung`. |
| "Which laptop should I buy" verdict page | KD 54, requires editorial per-SKU verdicts we cannot source; covered as a guidance section on `/compare/laptops`. |
| "Which phone has better camera" | Would require camera test results the site does not run. |
| Roundup/"best" pages per category for non-phones | Would require product data we do not have. |
| Model-vs-model doorway pages | Explicitly excluded by the brief. |
| Ratings, review scores, prices | Not published anywhere; nothing was fabricated to chase these queries. |
| Committing to git | Repo had pre-existing uncommitted work; no commits were made. |

---

## 10. Compliance with the brief's rules

- **No fabricated specs, prices, tests, ratings or reviews.** Non-phone hubs use
  user-entered data and say so; brand-page numbers come from product JSON records.
- **No "best"/superlative claims without a published basis.** `/best-phones` ranks by
  three objectively computed fields and states the method on the page.
- **Missing data stated as unavailable.** The `DATA_NOTE` block appears on all five
  category hubs (verified in `out/compare/laptops.html`).
- **Existing comparison functionality preserved.** Product comparison tool, dimension
  comparison, all 19 prior tools and the published comparison set still build and route.
- **No thin doorway pages.** Each new page has a distinct H1, description, tool or data
  payload, and its own FAQ/methodology content.
- **No cannibalisation.** One cluster → one URL; rules documented in the content map §5.

---

## 11. Verification performed

| Step | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Clean |
| Build | `npm run build` | 131 routes, no errors |
| Static export | `npm run build:static` | `out/` written, exit OK |
| Titles/H1/descriptions | Read `<title>`, `<meta description>`, `<h1>` from `out/*.html` | Match the map in §2 |
| Sitemap | Parsed `out/sitemap.xml` | 126 URLs, all new routes present |
| Canonical | Parsed `<link rel="canonical">` | Correct absolute URLs |
| Internal links | Inspect header/footer/hub markup in `out/index.html` | Compare dropdown, footer Compare column, hub grid present |
| Schema | String check for `FAQPage` / `ItemList` | Present on target pages |
| Tool counts | String check | "20" rendered dynamically (no stale "19") |

No browser runtime pass was run; the site is statically exported with no client-side data
fetching, and all new client components (`SpecComparison`, `Header` menus, `DynamicNoIndex`)
compile and render in the static output.

---

## 12. Suggested next steps

1. Deploy `out/` (including `.htaccess`) and submit `https://compareforge.online/sitemap.xml`
   in Search Console.
2. Request indexing for the four P0 URLs first: `/compare/phones`, `/compare`,
   `/compare/iphone-vs-samsung`, `/best-phones`.
3. If laptop/tablet data becomes available, populate `src/data/category-hubs.ts` records and
   swap the user-entered tool for DB-driven comparisons on those hubs.
4. Re-run the Ahrefs export in 90 days and compare rankings for the P0/P1 clusters.
5. Build the `iphone 17 vs galaxy s26` pair **only** if/when an iPhone 17 record is added to
   the database.
