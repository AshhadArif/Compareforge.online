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
| Automated site audit (`scripts/seo-check.mjs`) | Pass — 128 pages, 0 errors, 0 warnings |

---

## 2. Keyword → URL → metadata map

Every row below was verified against the built HTML in `out/`.

**Clusters behind these rows** (full definitions with volume/KD/TP in content map §3,
per-keyword baseline in content map §8): phones, phone size, brand-vs-brand (2),
product comparison, laptops, tablets, monitors, cameras, headphones, best-phones/roundups,
spec matrix, tool pages, guidance/how-to, and the deliberately excluded queries.

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

## 9. Pages audited

Everything below was read before any change was made, so the work extended existing
patterns instead of inventing new ones.

| Area | Files audited | What was found |
| --- | --- | --- |
| Home | `src/app/page.tsx` | Strong tool content, no product-comparison hub block, hard-coded "19" tool count, no link to brand comparisons |
| Comparison hub | `src/app/compare/page.tsx` | Thin page — no H2 sections, no "what is a product comparison tool" copy, no chart guidance |
| Dynamic comparison | `src/app/compare/[slug]/page.tsx` | Working; contained a **duplicate** `BreadcrumbList` JSON-LD block |
| Dynamic product | `src/app/products/[slug]/page.tsx` | Working; also contained a **duplicate** `BreadcrumbList` JSON-LD block |
| Product listing | `src/app/products/page.tsx` | "Compare these phones" block was missing |
| Categories | `src/app/categories/page.tsx`, `src/app/categories/[slug]/page.tsx` | No link to the `/compare/*` hubs |
| Tools | `src/app/tools/page.tsx`, `src/app/tools/product-comparison/page.tsx`, `src/data/tools/registry.ts` | 19 tools registered; `/tools/product-comparison` targeted the wrong keyword; hard-coded counts in three files |
| Guides | `src/app/guides/page.tsx` | No H2 section — cards sat directly under the H1 |
| Layout | `src/components/layout/Header.tsx`, `Footer.tsx`, `Breadcrumbs.tsx` | No Compare entry point; footer had no Compare column; footer column titles were `<h4>` (heading-level jump); `Breadcrumbs` emitted `itemListElement` entries without `@type` |
| Cards | `src/components/ComparisonCard.tsx`, `GuideCard.tsx` | Card titles were `<h2>`, i.e. level with the section headings they sit inside |
| Schema | `src/lib/schema.ts` | `generateFAQSchema` / `generateItemListSchema` already emitted `@type: ListItem`; `generateBreadcrumbSchema` did not and was unused by the two pages that hand-rolled their own |
| Routing | `src/app/sitemap.ts`, `public/robots.txt`, `public/.htaccess` | Sitemap covered existing routes only; query-param tool URLs are `DynamicNoIndex` |
| Data | `src/data/**` | Only smartphones (~47 records) exist — no laptop/tablet/monitor/camera/headphone records |

---

## 10. Pages expanded and content added

| Page | What was added |
| --- | --- |
| `/` | "Compare Products by Category" grid (6 hubs), Popular Phones link row, dynamic tool count |
| `/compare` | "What Is a Product Comparison Tool?", "How to Compare Two Products", "How to Read a Product Comparison Chart", "Product Specifications vs Features", "Related Tools" |
| `/compare/phones` | "Phone Specs Comparison" (targets `phone specs comparison`, TP 11,000), "Compare Phone Features", "Phone Size Comparison", "How to Use the Phone Comparison Tool", "Related Tools and Comparisons" |
| `/compare/tablets` | "How to Use the Tablet Comparison Tool", "Tablet Size / Display / Performance / Storage / Connectivity" |
| `/compare/laptops` | "What Is a Laptop Comparison Tool?", "How to Compare Laptops", "Which Laptop Should I Buy?" decision framework |
| `/compare/{monitors,cameras,headphones}` | Hub intro, use-case section, spec groups, FAQ, methodology, honesty note |
| `/categories` | "Compare by Product Type" grid |
| `/categories/[slug]` | `CompareHubLinks` with the matching hub highlighted |
| `/products` | "Compare These Phones" block |
| `/tools/product-comparison` | Link to the canonical `/compare` hub; metadata retargeted |
| `/tools`, `/categories` | Dynamic tool count; metadata rewritten for the comparison cluster |

---

## 11. Data-quality changes

- **No value was invented.** Every number on a new page comes from an existing JSON record
  or from data the visitor types. Non-phone hubs render the user-entered `SpecComparison`
  tool rather than pretending to have a database.
- **Honesty block on all five non-phone hubs** — `DATA_NOTE` states that the specs shown are
  user-entered and that CompareForge does not sell or ship products.
- **Missing data is labelled, never estimated.** `SpecComparison` shows `Missing` /
  `Incomplete` on mismatched fields; product pages keep `Not available`.
- **Hard-coded "19" tool counts replaced** with `getBuiltTools().length` in
  `src/app/page.tsx`, `src/app/tools/page.tsx`, `src/app/categories/page.tsx` and
  `Footer.tsx`, so the number can never go stale again.
- **`/best-phones` publishes its ranking method** on the page (three computed fields) and
  carries no superlative that the data does not support.
- **260 JSON-LD blocks parsed successfully** after the changes; no FAQ, `ItemList` or
  `Product` block was added to a page that does not really contain that content.

---

## 12. Technical SEO changes

| Change | Detail |
| --- | --- |
| Breadcrumb schema fix (GSC error) | `Breadcrumbs.tsx` now emits `"@type": "ListItem"` on every `itemListElement` entry. Root cause: schema.org types that entry as `ListItem\|Text`, so Google could not coerce the objects; the final crumb omits `item` (allowed) and JSON-LD is suppressed entirely when there are fewer than two crumbs. |
| Duplicate breadcrumb JSON-LD | Hand-rolled `BreadcrumbList` blocks removed from `products/[slug]` and `compare/[slug]`; the shared `Breadcrumbs` component is now the single source. |
| Heading hierarchy | Card titles demoted `h2 → h3` (`ComparisonCard`, `GuideCard`), footer column titles promoted `h4 → h2`, `/guides` given a real H2 — eliminating level jumps site-wide. |
| Canonical / indexability | Every published page has a unique absolute canonical; `404` and `_not-found` deliberately have none. Query-param tool routes stay `DynamicNoIndex`. |
| Titles & descriptions | Unique per page for every new route; `/tools/product-comparison` description retargeted from a generic phrase to `phone comparison tool`. |
| Sitemap | `src/app/sitemap.ts` lists all new routes → 126 URLs, each resolving to a file. |
| Automated site audit | New `scripts/seo-check.mjs` (see §17) now runs as part of verification. |

---

## 13. Duplicate and cannibalisation decisions

| Cluster | Decision | Why |
| --- | --- | --- |
| `phone comparison` / `compare phones` / `smartphone comparison` / `mobile comparison` / `phone specs comparison` / `compare two phones` | One URL: `/compare/phones` | Same intent, same page; keyword variants become sections, not URLs |
| `product comparison` / `compare products` / `compare two products` / `product comparison tool` | Hub `/compare`, tool `/tools/product-comparison` | Hub and tool are genuinely different objects |
| `laptop comparison` / `compare laptops` / `laptop comparison tool` / `compare laptop specs` | One URL: `/compare/laptops` | No `/laptop-comparison` alias |
| `tablet comparison` / `compare tablets` | One URL: `/compare/tablets` | No `/tablet-comparison` alias |
| `monitor comparison`, `camera comparison`, `headphone comparison` | One URL each under `/compare/<category>` | Same pattern |
| `samsung vs iphone` (2,000) | Folded into `/compare/iphone-vs-samsung` | Two URLs for one comparison would split the cluster |
| `iphone 17 vs galaxy s26`, `iphone 17 pro vs galaxy s26 ultra` | Not built | iPhone 17 is absent from the database |
| `which laptop should i buy` (600, KD 54) | Guidance section on `/compare/laptops`, not a verdict page | Per-SKU verdicts cannot be sourced honestly |
| `which phone has better camera` | Not built | Would require camera test data the site does not collect |
| `spec comparison` / `feature comparison` / `compare features` / `compare specifications` | One URL: `/tools/spec-comparison` | Single spec-matrix tool |

Full per-keyword table: content map §8. Full exclusion list: content map §6, plus this
report §15.

---

## 14. Dynamic URL decisions

| Dynamic route | Decision | Indexing treatment |
| --- | --- | --- |
| `/compare/[slug]` | Kept, `generateStaticParams` enumerates real records only | Indexed; each generated comparison page listed in the sitemap |
| `/products/[slug]` | Kept | Indexed |
| `/categories/[slug]` | Kept | Indexed |
| `/guides/[slug]` | Kept | Indexed |
| `/tools/[tool]` | Kept, registry-driven | Indexed via `getBuiltToolRoutes()` |
| Tool query parameters (`?a=…&b=…`) | No new routes added | `DynamicNoIndex` on `ToolShell` and `/compare/phones` |
| `/products?brand=…` etc. | Filter params left as-is, single `/products` canonical | Not canonicalised individually, not submitted |
| Arbitrary `/compare/a-vs-b` combinations | **Not** generated | No combinatorial page explosion; only curated comparisons exist |
| Alias routes (`/phone-comparison`, `/laptop-comparison`, …) | **Not** created | See §13 |

---

## 15. What was deliberately NOT done

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

---

## 16. Compliance with the brief's rules

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

## 17. Tests performed

| # | Test | Command / method | Result |
| --- | --- | --- | --- |
| 1 | Lint | `npm run lint` | 0 errors, 0 warnings |
| 2 | Next.js production build | `npm run build` | 131 routes, no errors |
| 3 | Static export | `npm run build:static` | `out/` written, exit OK |
| 4 | **Automated site audit** | `node scripts/seo-check.mjs` | **128 pages, 0 errors, 0 warnings** |
| 5 | Required H2s present | Extract headings from `out/compare{,/phones,/tablets,/laptops}.html` | All target headings render (e.g. `Phone Specs Comparison`, `Which Laptop Should I Buy?`, `How to Read a Product Comparison Chart`) |
| 6 | JSON-LD validity | `JSON.parse` every `application/ld+json` block | 260 blocks parse; every breadcrumb carries `@type: ListItem`; no multi-crumb page without it |
| 7 | Tool counts | String check across built HTML | "20" rendered dynamically, no stale "19" anywhere |
| 8 | Sitemap | Parsed `out/sitemap.xml` | 126 URLs, each resolves to a file; every page is listed |
| 9 | HTTP status (dev server) | `Invoke-WebRequest` on 21 routes | All `200`, including the six hubs, both brand pages, `/best-phones`, `/tools/spec-comparison`, `/guides`, and dynamic `/compare/<slug>`, `/products/<slug>`, `/categories/<slug>`, `/tools/<tool>` |

**What `scripts/seo-check.mjs` checks on every page of `out/`:**

- exactly one `<h1>`
- heading hierarchy starts at `h1` and never skips a level (`h2 → h4` is an error)
- `<title>` and meta description present
- canonical present, absolute, and unique across the site
- every `application/ld+json` block parses
- every internal `href` resolves to a real file in `out/`
- every `#anchor` exists on its own page; every cross-page `#anchor` exists on the target page
- no empty or relative links
- every `<loc>` in the sitemap resolves, and no published page is missing from it

**Known gap:** no automated browser pass was run (Playwright/Puppeteer are not installed in
this project), so interactive behaviour — product selection, the comparison table updating,
keyboard focus and `Escape` handling in the header menus, and the browser console — has been
verified by code review and by the fact that all client components render in the static
export, but not by an automated UI test. That is the one item from the brief's testing
requirements still outstanding.

---

## 18. Remaining opportunities

### Immediate

1. Deploy `out/` (including `.htaccess`) and submit `https://compareforge.online/sitemap.xml`
   in Search Console.
2. Request indexing for the four P0 URLs first: `/compare/phones`, `/compare`,
   `/compare/iphone-vs-samsung`, `/best-phones`.

### Not yet done, and why

3. **Automated UI test pass.** No browser runner in the project. Adding Playwright would let
   the header menus, product selector and comparison table be tested rather than reviewed.
4. **Real laptop/tablet/monitor/camera/headphone records.** The five non-phone hubs currently
   rely on the visitor-typed tool. Adding records to `src/data/` would let them render real
   tables, unlock per-model comparisons and move the TP 59,000 (`tablet comparison`) cluster.
5. **`iphone 17 vs galaxy s26`** (250 vol) — build only if/when an iPhone 17 record is added
   to the database. Same for `iphone 17 pro vs galaxy s26 ultra` (90).
6. **`laptop comparison tool` (500) / `compare laptop specs` (300)** currently share
   `/compare/laptops`. If the cluster ranks but the tool intent is unmet, a dedicated
   laptop tool page under `/tools/` is the split to make — assess after 90 days.
7. **`product comparison chart` (300, TP 2,700)** is served by a section on `/compare`.
   A printable/downloadable chart view is the natural upgrade if impressions show intent.

### Ongoing

8. Re-run the Ahrefs export in 90 days and compare rankings for the P0/P1 clusters
   (content map §8 has the full baseline).
9. Refresh `lastUpdated` on comparison pages when product records change — freshness is the
   one ranking factor this site fully controls.
