# CompareForge — New Comparison Tools & New SEO Pages: Implementation Report

Project: COMPAREFORGE.ONLINE (Next.js 16.3.5 / React 19 / TypeScript / Tailwind v4)
Companion documents:

- `docs/COMPAREFORGE-EXISTING-SITE-AUDIT.md` — audit of the site as it stood before this work
- `docs/COMPAREFORGE-NEW-PAGE-RESEARCH.md` — candidate research, intent mapping, data-quality findings
- this document — what was actually built, and the quality gate (section 39)

---

## 1. Outcome at a glance

| Measure | Before | After |
| --- | --- | --- |
| Indexable HTML pages in `out/` | 128 | **136** |
| `sitemap.xml` URLs | 126 | **134** |
| `npm run lint` | 0 errors / 0 warnings | **0 / 0** |
| `node scripts/seo-check.mjs` | 128 pages, 0 errors, 0 warnings | **136 pages, 0 errors, 0 warnings** |
| New comparison routes (HTTP 200, unique H1, unique canonical) | — | **8** |
| New reusable comparison engine | — | **1** (`CategoryComparisonTool`) |
| New datasets (published + derived) | — | **6 + 1** |
| New records carrying sourced specs | — | **23** (plus 47 existing phone records re-exposed) |
| Categories in `SpecComparison` | 7 | **14** |
| Compare hubs (`COMPARE_HUBS`) | 6 | **14** |
| Compare hub config objects (`categoryHubs`) | 5 | **13** |

Nothing already on the site was removed, renamed, or left pointing at a dead URL.

---

## 2. Decisions carried over from the research doc

1. **Six categories get standalone pages**: CPU, GPU, TV, smartwatch, projector, printer.
2. **Two derived pages get standalone pages**: gaming monitor, phone camera.
3. **Two candidates are refused** (`docs/COMPAREFORGE-NEW-PAGE-RESEARCH.md` §4 and §5): wireless earbuds, phone battery. They have no differentiated intent and the project has no battery or earbud measurement data to make them honest.
4. **No SEO metrics are invented.** Every candidate in the research matrix reports `Not available in current project data.` The only keyword source in the project is the 47-row Ahrefs phone CSV; nothing was extrapolated from it.
5. **No testing claims.** CompareForge runs no lab tests, so no page uses the words "tested", "measured", "verified by us", "our results", or any benchmark, rating, review, price, or "best" label.

---

## 3. Pages built (8) and refused (2)

| Route | Slug used in hub config | Dataset | Records | Spec fields |
| --- | --- | --- | --- | --- |
| `/cpu-comparison` | `cpus` | `cpus` | 4 | 13 |
| `/gpu-comparison` | `gpus` | `gpus` | 3 | 11 |
| `/tv-comparison` | `tvs` | `tvs` | 4 | 12 |
| `/smartwatch-comparison` | `smartwatches` | `smartwatches` | 4 | 15 |
| `/projector-comparison` | `projectors` | `projectors` | 4 | 15 |
| `/printer-comparison` | `printers` | `printers` | 4 | 15 |
| `/gaming-monitor-comparison` | `gaming-monitors` | *(SpecComparison preset)* | 7 attributes | — |
| `/phone-camera-comparison` | `phone-cameras` | `phone-cameras` (derived) | 47 | 17 |

Refused: `/earbuds-comparison`, `/phone-battery-comparison`. Also deliberately not created: a standalone page for each phone brand, per-SKU TV pages, and any "best <category> 2026" page (the site has no testing, reviews, prices, or rankings to support one).

---

## 4. Shared architecture — why one engine, not eight

Eight pages built as eight bespoke React tables would have been eight copies of the same selection logic, URL state, differences-only toggle, source rendering, and accessibility work — with eight places to fix a bug.

Instead:

```
CategoryHubPage  ──┬── has datasetId? ──> CategoryComparisonTool (engine, one implementation)
                   └── otherwise        ──> SpecComparison with defaultCategory preset
```

`SpecComparison` keeps its role: manual / attribute-first comparison (the gaming-monitor page uses it, because its fields are sync and response-time comparisons that are expressed as fixed attribute rows rather than per-product records). `CategoryComparisonTool` is new and record-driven: pick up to three records from a dataset, get a sourced table.

Both are rendered by the same `CategoryHubPage` that already served `/compare/phones`, `/compare/laptops`, etc., so the how-to steps, focus sections, methodology block, FAQ, and related links are written once.

---

## 5. The category dataset model (`src/data/category-datasets.ts`)

```ts
type SpecFieldType = "text" | "number" | "list";

interface CategorySpecField {
  key: string;        // matches the key used in product.specs
  label: string;      // display label, e.g. "Base clock"
  group: string;      // section heading in the table
  type: SpecFieldType;
  unit?: string;      // rendered after the value, e.g. "mm", "W", "GHz"
  note?: string;      // shown as small print under the label (measurement standard)
}

interface CategoryProduct {
  id: string;
  brand: string;
  model: string;
  fullName: string;   // "Intel Core i9-14900K"
  regionNote?: string; // SKU / region caveat
  specs: Record<string, string | null>;
  sources: Source[];  // existing `Source` type from src/data/types.ts
}

interface CategoryDataset {
  id: string;
  label: string;
  singular: string;
  route: string;      // canonical route for shareable links
  fields: CategorySpecField[];
  products: CategoryProduct[];
  maxCompare: number; // 3 everywhere
}
```

`specs[key] === null` renders as the literal string `Not verified`. There is no other sentinel value, so no page can accidentally display an empty cell as if it were zero or `0`.

Exported helpers: `categoryDatasets`, `getCategoryDataset(id)`, `datasetNote(dataset)` (the methodology sentence used by every dataset page).

The `Source` type is reused unchanged, so the confidence badge vocabulary (`verified` / `estimated` / `unconfirmed`) stays consistent with the rest of the site.

---

## 6. Dataset registry and routes

| `datasetId` | Dataset object | `route` |
| --- | --- | --- |
| `cpus` | 4 records × 13 fields | `/cpu-comparison` |
| `gpus` | 3 records × 11 fields | `/gpu-comparison` |
| `tvs` | 4 records × 12 fields | `/tv-comparison` |
| `smartwatches` | 4 records × 15 fields | `/smartwatch-comparison` |
| `projectors` | 4 records × 15 fields | `/projector-comparison` |
| `printers` | 4 records × 15 fields | `/printer-comparison` |
| `phone-cameras` | 47 records × 17 fields (derived) | `/phone-camera-comparison` |

`maxCompare: 3` on all six. The derived phone-camera dataset is defined in `src/lib/phone-camera-dataset.ts`, not in `category-datasets.ts`, precisely so it stays derived from `src/data/products.ts` rather than being a second copy.

---

## 7. CPU dataset — records and sources

Records: AMD Ryzen 7 9800X3D, AMD Ryzen 9 9950X, Intel Core Ultra 9 285K, Intel Core i9-14900K.
Fields (13): architecture, release date, process node, cores, threads, base clock, boost clock, cache, socket, memory support, PCIe support, integrated graphics, TDP.

Sources: `techpowerup.com/cpu-specs/core-i9-14900k.c3269`, `techpowerup.com/cpu-specs/core-ultra-9-285k.c3773`, and the AMD product specification pages for the two Ryzen parts. Both TechPowerUp URLs were fetched and checked field-by-field before being cited (title `Intel Core i9-14900K Specs`; every field quoted matched).

---

## 8. GPU dataset — records and sources

Records: NVIDIA GeForce RTX 5070 Ti, NVIDIA GeForce RTX 5060, AMD Radeon RX 9070 XT.
Fields (11): architecture, VRAM, memory type, memory bus, memory bandwidth, cores, boost clock, TDP, interface, ray tracing, outputs.

Sources: `nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/`, `.../rtx-5060-family/`, `nvidia.com/en-us/geforce/graphics-cards/compare`, and `amd.com/.../radeon-9070xt.html`.

---

## 9. TV dataset — records and sources

Records: Samsung OLED S95F 65″, TCL QM7K 65, VIZIO V4K65M, Panasonic Z95B 65.
Fields (12): release year, screen size, resolution, panel type, refresh rate, HDR formats, HDMI ports, HDMI 2.1, VRR, smart platform, dimensions, weight.

Sources: Samsung product page, TCL product page, VIZIO product page, Panasonic newsroom/product specification pages.

---

## 10. Smartwatch dataset — records and sources

Records: Apple Watch Series 12, Samsung Galaxy Watch8 Classic 46 mm, Garmin fēnix 8 47 AMOLED, Google Pixel Watch 5.
Fields (15): case size, display type, display size, resolution, weight, OS, compatibility, manufacturer battery claim, charging, GPS, cellular, NFC, Bluetooth, water resistance, sensors.

Sources: `apple.com/apple-watch-series-12/specs`, `samsung.com` product page, `garmin.com.sg` product page, `support.google.com/googlepixelwatch/answer/12651869`.

Battery values are labelled **manufacturer claim** in the field label and in the field note, never presented as measured runtime.

---

## 11. Projector dataset — records and sources

Records: BenQ TK705STi, Optoma UHD55, XGIMI Horizon Ultra, Epson Home Cinema LS6000.
Fields (15): native resolution, technology, brightness (ANSI lumens), brightness note, contrast, throw ratio, projection size, refresh rate, HDR support, inputs, built-in speakers, dimensions, weight, light source, light source life.

Every brightness value carries its measurement standard in a `note` or in the value itself (ISO 21118 for the Epson laser unit, ANSI lumens otherwise) — see section 15.

---

## 12. Printer dataset — records and sources

Records: HP OfficeJet Pro 9015E, Epson EcoTank ET-2850, Brother HL-L2480DW, Canon PIXMA TR4720.
Fields (15): printer type, technology, colour capability, print speed, print resolution, paper sizes, duplex, scanner, ADF, connectivity, mobile printing, dimensions, weight, ink/toner, official page yield.

Print speeds and page yields are quoted exactly as the manufacturers state them (ISO/IEC 24734 / 24719 context retained), never converted, averaged, or compared to a value a different standard produced.

---

## 13. Phone camera dataset — derived, not new data

`src/lib/phone-camera-dataset.ts` builds the dataset from the existing `products` array (`Smartphone[]`, 47 records). Nothing about a phone is re-typed; the file maps existing fields into camera groups:

| Group | Fields |
| --- | --- |
| Main camera | main sensor MP, aperture, OIS |
| Zoom cameras | telephoto MP, aperture, optical zoom, max zoom |
| Ultrawide | ultrawide MP, aperture |
| Front camera | front MP, aperture, OIS |
| Video and features | video resolution, video frame rates, video features, camera features |

`pickCameraSources()` filters each phone's existing `sources` to entries whose `field` is `"camera"` or `"*"`, so the page cites only camera-relevant sources rather than pretending a display spec page supports a camera claim.

---

## 14. How null values are handled

- `specs[key] === null` → literal `Not verified` in the cell.
- Field absent from a record's `specs` object → also `Not verified` (same code path).
- No value is ever defaulted to `0`, `—` displayed as data, or `"unknown"` in prose.
- The differences-only algorithm treats `Not verified` cells as **unknown**, not as "identical": a row of four `Not verified` cells is `unknown` and is shown even in differences-only mode, rather than being silently hidden as a match.
- The counts line reads `<n> specifications · <m> identical across all selected`, where `m` counts only rows whose values are genuinely equal and known.

---

## 15. Measurement-standard handling

Measurement standards are the easiest place to fabricate a comparison. Each is either stated with its standard or omitted:

| Domain | Handling |
| --- | --- |
| Projector brightness | Field label says "Brightness"; `note` or value carries ANSI lumens vs ISO 21118. Never summed across lenses. |
| Printer speed | Quoted with the ISO/IEC standard the manufacturer used; not normalised across manufacturers. |
| Printer page yield | Official yield only, with its standard, never "real-world" or "estimated monthly volume". |
| TV brightness / contrast | Omitted entirely where the manufacturer publishes a number under an undefined internal test — the field simply reads `Not verified`. |
| CPU/GPU clocks | Base and boost as published; no overclocking figures. |
| Battery life | Manufacturer claim only, labelled as such. |
| Awards / HDR certifications | Listed as published badges only ("supports HDR10, HDR10+, HLG"); never reduced to a score. |
| Camera zoom | Optical zoom and digital max zoom are separate fields; never combined into one "zoom" number. |

---

## 16. Region and SKU caveats

Region-specific SKUs are flagged in `regionNote` and rendered as small print under the product name in the table header and in the sources block. Examples: the Samsung TV cited from `samsung.com/latin_en`, the Panasonic specification from `help.na.panasonic.com`, the Garmin unit from `garmin.com.sg`, the HP printer specification from `hp.com/ph-en`, the UK-sourced Samsung Galaxy Watch SKU. The caveat is visible on the page, not buried in the source URL.

---

## 17. The reusable comparison tool (`src/components/tools/CategoryComparisonTool.tsx`)

One client component, `"use client"`, used by all six dataset pages plus the phone-camera page:

- **Searchable picker** — free-text filter over brand + model, results in a scrollable list (`max-h-56`), each row `aria-pressed`, disabled once `maxCompare` is reached.
- **Selected chips** — remove without clearing the other selections.
- **Grouped spec table** — groups from `fields[].group`, each group as a `scope="colgroup"` header row, each row a `scope="row"` header cell.
- **Differences-only toggle** — hides rows that are identical across all selected records; disabled until two records are selected.
- **Identical / different / unknown states** — computed by `rowKey()`; identical rows are visually highlighted.
- **Copy shareable link** — serialises the current selection to the URL.
- **Swap first two** — exchanges the first two selected records (§6 of the research doc), disabled until two are selected.
- **Reset** — restores the default two records, clears search, clears differences-only, and clears every user-entered row.
- **Add your own specification** — see section 20.
- **Sources block** — per selected record, each source as an external `nofollow noopener` link with its `field`, `dateAccessed`, and confidence badge.

---

## 18. Shareable URL state (`?a=&b=&c=`) and hydration safety

`URL_KEYS = ["a", "b", "c"]`. On first render the tool reads the query string, so a shared link opens with the same records selected.

Two guards prevent real bugs:

1. `didReadUrl` + `window.setTimeout(..., 0)` defers the initial URL read to an effect, because setting state synchronously inside `useEffect` is flagged by `react-hooks/set-state-in-effect` and causes a render-phase warning.
2. `canWriteUrl` stays `false` until that read has happened, so `history.replaceState` cannot overwrite a deep link before it has been applied. This is the URL read/write race fixed during integration.

Writes always target `dataset.route` (e.g. `/tv-comparison?a=…&b=…`), so the canonical URL never gains a query string.

---

## 19. Accessible table markup

- Exactly one `<caption>`, visually hidden, naming the category and the fact that it is a published-specification comparison.
- Column headers `scope="col"`, row headers `scope="row"`, group headers `scope="colgroup"`.
- `sameCount` line is `aria-live="polite"` so toggling differences-only is announced.
- Product-name inputs in the picker carry `aria-pressed`; every icon-only control (`✕` remove) has an `aria-label`.
- Inputs in the custom rows get `<label className="sr-only">` naming both the specification and the product.
- Sticky first column is `z-10` with an opaque background so it never shows table content bleeding through while scrolling.
- Heading order on each page: `h1` (page title) → `h2` (sections) → `h3` (sub-sections). Verified by `scripts/seo-check.mjs`.

---

## 20. User-entered fallback rows

The research doc §6 promised "user-entered fallback rows", because a category page with three manufacturer records cannot cover the specification a particular reader cares about (Warranty length, Energy rating, Colour, Mount pattern, Weight without stand).

Implemented as `CustomRow[]` state on the tool:

- **Add form**: specification name + type (`text` / `number`) + Add button (disabled while the name is empty).
- **Rendered as a separate "Your own rows" group** at the bottom of the table, each row marked `entered by you` so a reader cannot mistake it for sourced data.
- **Cells are inputs**, prefilled nowhere, defaulted to nothing (`—` placeholder only).
- **Differences-aware**: a custom row is `unknown` until at least two cells contain a value, then `same` / `different` like any other row, so it obeys the differences-only toggle.
- **Removable** per row (✕ in the row header), and **cleared by Reset**.
- **Never persisted and never sent anywhere** — stated in the copy directly under the form: the table is computed in the browser.

This is the one place a reader can put text into the page, so the copy explicitly separates it from sourced content.

---

## 21. `SpecComparison` preset additions

Seven presets added to the existing seven (`laptops`, `tablet`, `monitors`, `cameras`, `headphones`, `phones`, `custom`):

`cpus`, `gpus`, `tvs`, `smartwatches`, `projectors`, `printers`, `gaming-monitors` — **14 categories total**.

Each preset is a list of attribute names with `attributeGroups` grouping them (e.g. `gaming-monitors`: panel / speed / sync / ports). Only attributes are listed; no values are attached, because `SpecComparison` does not store records — it builds a comparison form the reader fills in. No attribute was added that the reader cannot answer from a manufacturer page.

---

## 22. `CategoryHubPage` changes

- Imports `CategoryComparisonTool`, `categoryDatasets`, `datasetNote`, `phoneCameraDataset`, `hubPath`.
- Builds `DATASET_LOOKUP` from `categoryDatasets` plus the derived phone-camera dataset.
- If `hub.datasetId` resolves → render `CategoryComparisonTool` (dataset, label, route, fields, products, maxCompare).
- Else → render `SpecComparison` with `defaultCategory={hub.specCategory ?? "laptops"}`.
- Methodology paragraph is dataset-aware: it names the number of records and the number of fields instead of a generic sentence.
- `<CompareHubLinks highlight={hubPath(hub)} />` so the current page's entry in the hub grid is marked.
- Removed an unused `isDatasetHub` variable that appeared during the refactor (lint would otherwise fail).

---

## 23. `CategoryHubConfig` / `hubPath` changes

- Added optional `path?`, optional `datasetId?`.
- `specCategory` became **optional**, because dataset-driven hubs have no `SpecComparison` preset.
- Added `hubPath(hub)` → returns `hub.path ?? "/compare/" + hub.slug`, so every internal link resolves to a real route regardless of which kind of hub it is.
- Rewrote `DATA_NOTE` — the previous text claimed the site's structured specs cover smartphones only, which was already wrong for the phones/laptops/monitors hubs. It now states coverage includes smartphones plus a small set of processors, graphics cards, televisions, smartwatches, projectors and printers, and that some entries read `Not verified`.
- Fixed the same stale claim inside the laptops, tablets, monitors, cameras, headphones and gaming FAQ entries.
- Added the eight hub configs (slugs `cpus`, `gpus`, `tvs`, `smartwatches`, `projectors`, `printers`, `gaming-monitors`, `phone-cameras`), each with `path`, `toolHeading` / `toolIntro`, 7–8 `specGroups`, `focusHeading` / `focusIntro` + 4 focus items, sections (how-to steps + 2 prose sections), 6 FAQs, and 8 `related` links.

`categoryHubs`: 5 → **13**.

---

## 24. The eight route files

`src/app/<route>/page.tsx` for each route, each exporting:

```ts
export function generateMetadata() {
  const hub = getCategoryHub("<slug>");
  // title, description, alternates.canonical from hubPath(hub)
}
export default function XComparisonPage() {
  return <CategoryHubPage hub={getCategoryHub("<slug>")!} />;
}
```

A slug typo was caught and corrected before verification: `gaming_monitors` → `gaming-monitors` and `phone_cameras` → `phone-cameras`. Had it shipped, both pages would have thrown at render (the hub lookup returns `undefined`).

---

## 25. Metadata and canonicals

Verified live on all eight routes:

| Route | Title | Canonical |
| --- | --- | --- |
| `/cpu-comparison` | CPU Comparison - Compare Processor Specs Side by Side \| CompareForge | `https://compareforge.online/cpu-comparison` |
| `/gpu-comparison` | GPU Comparison - Compare Graphics Card Specs Side by Side \| CompareForge | `https://compareforge.online/gpu-comparison` |
| `/tv-comparison` | TV Comparison - Compare Television Specs Side by Side \| CompareForge | `https://compareforge.online/tv-comparison` |
| `/smartwatch-comparison` | Smartwatch Comparison - Compare Wearables Side by Side \| CompareForge | `https://compareforge.online/smartwatch-comparison` |
| `/projector-comparison` | Projector Comparison - Compare Projector Specs Side by Side \| CompareForge | `https://compareforge.online/projector-comparison` |
| `/printer-comparison` | Printer Comparison - Compare Printer Specs Side by Side \| CompareForge | `https://compareforge.online/printer-comparison` |
| `/gaming-monitor-comparison` | Gaming Monitor Comparison - Refresh Rate, Response Time and Sync \| CompareForge | `https://compareforge.online/gaming-monitor-comparison` |
| `/phone-camera-comparison` | Phone Camera Comparison - Compare Camera Specs Side by Side \| CompareForge | `https://compareforge.online/phone-camera-comparison` |

Each canonical is unique site-wide (checked by seo-check, which fails on duplicates). Each page has one `<meta name="description">`. Each `<h1>` is unique: `CPU Comparison`, `GPU Comparison`, `TV Comparison`, `Smartwatch Comparison`, `Projector Comparison`, `Printer Comparison`, `Gaming Monitor Comparison`, `Phone Camera Comparison`.

---

## 26. Structured data

Every new page carries:

- One `BreadcrumbList` (`ListItem` chain) — **3 items**: Home → Compare → `<category>`.
- One `FAQPage` with the hub's 6 questions.
- The existing `WebApplication` / `SoftwareApplication` blocks are **not** duplicated onto these pages; the hub schema lives on `/compare`.

Spot-checked: `out/cpu-comparison.html` contains 3 `ListItem` objects and 6 FAQ questions, and seo-check parses every JSON-LD block successfully (0 unparsable-JSON-LD errors).

---

## 27. Heading hierarchy on new pages

`h1` (page title) → `h2` for each hub section → `h3` inside them. No page starts at a non-`h1` heading and no level jumps from `h1` to `h3` — both conditions are hard errors in `scripts/seo-check.mjs`, and the run after these pages were added returned 0 errors across 136 pages.

---

## 28. Header navigation

`src/components/layout/Header.tsx` — `compareGroups` restructured from 3 groups to 6:

1. **By category** — laptops, tablets, phones, monitors, cameras, headphones
2. **Computers** — CPU, GPU, gaming monitor
3. **Home and devices** — TV, smartwatch, projector, printer
4. **Phone comparisons** — phone camera, phone size, iPhone vs Samsung, Pixel vs iPhone
5. **By attribute** — spec comparison, dimension comparison, phone size
6. **Popular** — best phones, compare hub, categories

Mega-menu width raised to `w-[46rem]` so six groups fit without clipping. No existing link was removed; every pre-existing target was re-tested (section 38).

---

## 29. Footer navigation

`src/components/layout/Footer.tsx` — new **"Compare more"** section listing all eight new routes alongside the existing **Compare** group. No existing footer link was dropped.

---

## 30. Compare hub grid and `/categories`

- `CompareHubLinks.COMPARE_HUBS`: 6 → **14** entries (8 added), grid `lg:grid-cols-4`.
- `/categories` page: description updated to mention the new categories; grid moved to `lg:grid-cols-4`.
- `/compare` hub: intro list extended with the eight new categories, plus a paragraph explaining that the general-purpose `SpecComparison` tool is available for anything not covered by a category page.

---

## 31. Accuracy fixes to standing data notes

Any copy that made a factual claim about coverage was corrected rather than left to be contradicted by the new pages:

- `DATA_NOTE` and six hub FAQs (see section 23).
- `/compare` intro — previously implied all comparisons were phone-shaped.
- `/categories` page description — previously listed only the original categories.
- `/tools/spec-comparison` — the three places that listed "supported categories" now list all 14 (heading copy, intro copy, and the category-picker helper text).

---

## 32. Sitemap

`src/app/sitemap.ts` extended by 8 URLs → **134 `<loc>` entries** in `out/sitemap.xml`.

seo-check confirms: every sitemap URL has a corresponding file in `out/`, every sitemap URL is an absolute site URL, and no indexable page is missing from the sitemap (0 warnings).

---

## 33. Component and style conventions followed

- Reused `Source`, `CONFIDENCE_CLASS`, the existing button/input/card classes, and the `CategoryHubPage` section layout rather than introducing a new visual pattern.
- Tailwind v4 utility classes only; no new CSS files, no new dependencies, no icon library additions.
- Client component boundaries kept minimal — only the comparison tool is `"use client"`; the eight routes stay server components with `generateMetadata`, so all page copy is in the static HTML (confirmed: the full table, prose, FAQ and links are present in `out/*.html`).

---

## 34. What was deliberately NOT done

1. **No earbuds or phone-battery pages** (research §4, §5).
2. **No invented data of any kind** — no specs, prices, benchmarks, ratings, reviews, test results, battery-life measurements, awards, or "best" labels. The word "best" appears only where an existing site URL already contains it (`/best-phones`).
3. **No SEO metrics invented** — all ten candidates report `Not available in current project data.`
4. **No fake testing claims** — the methodology text says explicitly that CompareForge runs no lab tests and that values are copied from published pages on the date shown.
5. **No doorway or thin pages** — each of the eight has a distinct query intent, a full how-to, two prose sections, four focus items, six FAQs, eight related links, and a real table of sourced records.
6. **No scaled/templated content** — the hub copy was written per category (its fields, its measurement standards, its traps), not produced by re-labelling one paragraph.
7. **No prices, no affiliate links, no reviews, no scores.**
8. **No changes to existing routes' URLs**, titles, or canonicals other than the accuracy fixes in section 31.
9. **No breaking change to `SpecComparison`** — its public props are unchanged; existing `/compare/*` pages render it exactly as before.

---

## 35. Duplicate and cannibalisation decisions

| Temptation | Decision |
| --- | --- |
| Gaming monitor page vs existing `/compare/monitors` | **Both kept, different intents.** Monitors hub = pick a record and compare general specs. Gaming-monitor page = attribute-first pick of refresh rate, response time, sync standard, HDR, ports. Cross-linked, not duplicated. |
| Phone camera page vs existing `/compare/phones` | **Both kept.** Phones hub compares whole phones; camera page exposes the camera fields as their own 5 groups with camera-only sources. The camera dataset is derived from the same records, so there is one source of truth. |
| CPU page vs a future "best CPU" page | No "best" page exists or was created — no testing data to support one. |
| Per-SKU TV / printer pages | Not created. Four records per category is a comparison tool, not a content farm. |
| Re-labelling `/tools/spec-comparison` with a category URL | Not done — the tool URL is unchanged so existing inbound links keep working. |

---

## 36. Dynamic URL decisions

- Shareable state uses query parameters (`?a=&b=&c=`), never path segments, so there is one indexable URL per category.
- `history.replaceState` writes only to `dataset.route`, so a shared link's canonical is still the bare route.
- No facet/filter URLs are crawlable or in the sitemap (the search box and differences toggle are client state only).
- No URL removed or redirected in this change.

---

## 37. Internal-linking map for the new pages

```
Header mega-menu (6 groups)
Footer "Compare more"
Home (/) — CompareHubLinks grid
/compare — CompareHubLinks grid + prose list
/categories — category grid
/tools/spec-comparison — category list copy
```

Plus `CompareHubLinks` on every hub page, with the current hub highlighted (`highlight={hubPath(hub)}`). Every one of these links is resolved to a real file by seo-check (`broken site link` / `broken internal link` checks) — 0 errors.

---

## 38. Tests performed

All run after the final code change (custom rows + swap button):

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | **clean** (0 errors, 0 warnings) |
| Static build | `npm run build:static` | **OK** — `out/` regenerated, 136 HTML files |
| Structural SEO audit | `node scripts/seo-check.mjs` | **136 pages, 0 errors, 0 warnings** |
| Sitemap | `Select-String out\sitemap.xml "<loc>"` | **134 URLs** |
| New routes live | `Invoke-WebRequest http://localhost:3000/<route>` | **all 8 → HTTP 200** with the correct H1, title and canonical (table in section 25) |
| Regression routes | same | `/`, `/best-phones`, `/categories`, `/compare`, `/compare/phones`, `/compare/laptops`, `/compare/tablets`, `/compare/monitors`, `/compare/cameras`, `/compare/headphones`, `/compare/phone-size-comparison`, `/tools/spec-comparison` → **all HTTP 200** |
| Dev server log | `compareforge-dev.log` tail | no React errors, no hydration warnings; the only 404 in the log is a pre-existing non-existent comparison slug hit by an external/previous request (`/compare/samsung-galaxy-s26-ultra-vs-apple-iphone-18-pro-max`), which returns 200 for the reverse order and is unrelated to this change |
| Static content spot-check | grep on `out/*.html` | `cpu-comparison.html` (107,931 B): 18 `<tr>`, 6 source links, 8 `Not verified`, 3 `ListItem`, 6 FAQ · `phone-camera-comparison.html` (160,850 B): 23 `<tr>` · `gaming-monitor-comparison.html` (111,473 B): 32 inputs |
| Colour-encoding sanity | written through the Write tool, read back | no mojibake; em dashes and `✕` render as intended |

**Google Search Console — URLs to submit (suggested order, domain property `sc-domain:compareforge.online`):**

```
https://compareforge.online/cpu-comparison
https://compareforge.online/gpu-comparison
https://compareforge.online/tv-comparison
https://compareforge.online/smartwatch-comparison
https://compareforge.online/projector-comparison
https://compareforge.online/printer-comparison
https://compareforge.online/gaming-monitor-comparison
https://compareforge.online/phone-camera-comparison
```

Also worth resubmitting the sitemap (`https://compareforge.online/sitemap.xml`) after deploying the contents of `out/`.

---

## 39. Quality gate

Every line below is either **verified by a command that was actually run** or is an explicit statement of what was **not** claimed.

### 39.1 What was built

- **8 new pages**, each with its own H1, title, description, canonical, 3-item breadcrumb, 6-question FAQ, how-to, 2 prose sections, 4 focus items, and 8 related links.
- **1 new reusable comparison engine** (`CategoryComparisonTool`) covering search, 3-way selection, grouped table, differences-only, swap, reset, shareable URL, custom rows, and a per-record sources block with confidence badges.
- **6 published datasets + 1 derived dataset**: 23 sourced records with 11–15 fields each, plus 47 phone records exposed through 17 camera fields.
- **7 new `SpecComparison` presets** (14 total).
- **8 hub configs** (13 total), **14 compare-hub entries**, **6 header groups**, a new footer section.
- **+8 sitemap URLs**, **+8 indexable pages** (126 → 134, 128 → 136).

### 39.2 What was NOT built, and why

| Not built | Reason |
| --- | --- |
| Earbuds comparison page | No differentiated intent; no source-backed dataset (research §4). |
| Phone battery comparison page | Manufacturer claims only, no measured data; would be a fabricated comparison (research §5). |
| Any "best <category> 2026" page | No lab tests, no reviews, no prices, no rankings exist. |
| Prices, deals, affiliate or "where to buy" blocks | Not in scope and would imply commercial testing. |
| Per-SKU / per-model content pages | Would be scaled thin content. |
| Invented SEO metrics for any candidate | Reported honestly as `Not available in current project data.` |
| Fake testing/verification claims | CompareForge runs no tests; every page says so. |

### 39.3 Data sources and provenance

- Every spec value traces to a manufacturer or publisher page listed in the record's `sources` array, with `field`, `siteName`, `dateAccessed`, and a `confidence` value.
- The two TechPowerUp CPU sources were fetched and matched field-by-field before citation.
- `dateAccessed` values are real dates from the fetch, not placeholders.
- Manufacturer claims (battery life, print speed, page yield) are labelled as claims, with their measurement standard, and are never converted between standards.
- `Not verified` is the single representation of "we do not have a sourced value" — it appears in cells, in methodology copy, and in the data note.
- The phone-camera dataset contains no new values; it only regroups existing `products` data.

### 39.4 Honesty of the copy

- No page claims that CompareForge tested, measured, benchmarked, reviewed, scored, or rated anything.
- No page uses "best", "top", "editor's choice", "#1", star ratings, or scores.
- No page states a price, discount, deal, or availability.
- The methodology block on every dataset page states: values are copied from published pages, entries with no sourced value read `Not verified`, and CompareForge runs no lab tests.
- The custom-row section states that reader-entered values are computed in the browser and are not stored or transmitted.

### 39.5 Compliance with the brief's rules

| Rule | Status |
| --- | --- |
| Never invent specs / prices / benchmarks / ratings / reviews / test results / "best" labels / battery life | **Held.** Unknown → `Not verified` or field omitted. |
| No fabricated SEO metrics | **Held.** All candidates `Not available in current project data.` |
| No doorway / thin / scaled pages | **Held.** 8 pages, distinct intents, each fully written. |
| Reuse components, do not rebuild | **Held.** `CategoryHubPage` + `CategoryHubLinks` + `Source` + `SpecComparison` reused; one new engine instead of eight. |
| Preserve all existing functionality | **Held.** 12 regression routes 200; `SpecComparison` public API unchanged; no route, canonical, or internal link removed. |
| Never break existing URLs | **Held.** Only additions; no redirects, no deletions. |
| Two docs (audit + research) plus this implementation report | **Held.** All three in `docs/`. |

### 39.6 Automated gate (must be all green)

```
npm run lint            → 0 errors, 0 warnings
npm run build           → OK
npm run build:static    → OK, 136 HTML files in out/
node scripts/seo-check.mjs → 136 pages, 0 errors, 0 warnings
out/sitemap.xml         → 134 <loc>, every URL has a file, no page missing
```

**Current state: all five green.**

### 39.7 Manual gate

- 8/8 new routes HTTP 200 with correct H1 + unique title + unique canonical (section 25).
- 12/12 pre-existing routes HTTP 200 (section 38).
- Every header, footer, hub-grid and prose internal link resolves to a static file (seo-check `broken site link` / `broken internal link` → 0).
- No React errors or hydration warnings in the dev server log.
- Full table content present in the static HTML, so it is indexable without JavaScript.

### 39.8 Known limits (stated, not hidden)

- The datasets are small (3–4 records per published category) — deliberately, because only that many records could be sourced to manufacturer pages without inventing anything. The comparison still works with 1–3 records selected.
- Reader-entered rows are local to the browser session and are not shared through the URL.
- The gaming-monitor page is attribute-based (reader enters values) rather than record-based, since no gaming-monitor record set could be sourced for this change.
- `Not verified` cells are shown as unknown rather than treated as equal, so differences-only mode may show more rows than a reader expects; this is intentional and stated in the counts line.
- No GSC submission has been made from this environment; the URL list in section 38 is prepared for it.

### 39.9 Deployment note

Deploy the **contents** of `out/` (including `.htaccess`) to `public_html`. Nothing outside `out/` is required at runtime. After deployment, resubmit `https://compareforge.online/sitemap.xml` and inspect the eight URLs in Search Console.

---

**Document status:** final for this change set. If any page URL, title, or dataset record changes, update sections 3, 6, 25 and 32 and re-run the gate in 39.6.
