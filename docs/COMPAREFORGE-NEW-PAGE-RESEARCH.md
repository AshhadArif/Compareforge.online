# CompareForge — New Page Research

**Date:** 2026-10-01
**Status:** Complete — precedes implementation (`COMPAREFORGE-NEW-PAGE-IMPLEMENTATION.md`)
**Input:** repository audit (`COMPAREFORGE-EXISTING-SITE-AUDIT.md`) + live SERP observation (2026-10-01).

---

## 0. Data-availability rule for this document

The repository contains exactly one keyword export
(`google_us_best-phones-best-products_overview_2026-09-29_00-11-45.csv`, 47 rows) and it
covers **phones and product-comparison queries only**. There is no Ahrefs/Semrush export, no
SERP-feature log and no volume file for any of the ten candidates below.

Therefore, for every candidate in this document:

> **Search volume / KD / Traffic Potential / CPC / trend: `Not available in current project data.`**

No number has been estimated, recalled or substituted. Where the table reports competition,
it reports **observed ranking domains**, which is a direct observation, not an SEO metric.

---

## 1. Candidate table

| # | Topic | Primary keyword | Related keywords (same intent) | Intent | Existing coverage | New page? | Data available? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | CPU Comparison | `cpu comparison` | cpu compare, compare cpus, processor comparison, cpu comparison tool, cpu specs comparison, compare cpu specifications, cpu vs cpu | Commercial-investigation — side-by-side specs | None (`spec-comparison` is generic; no CPU preset, no CPU records) | **BUILD** | Yes — 4 records, manufacturer/database sourced | SERP is dominated by interactive tools (versus.com, hardwaredb.net, cpu-compare.com); a tool page matches intent |
| 2 | GPU Comparison | `gpu comparison` | compare gpus, graphics card comparison, gpu specs comparison, gpu vs gpu | Commercial-investigation | None | **BUILD** | Yes — 3 records (manufacturer-sourced); 4th candidate dropped for weak sourcing | Same SERP shape as CPUs — interactive tools rank |
| 3 | TV Comparison | `tv comparison` | compare TVs, tv specs comparison, compare televisions, smart tv comparison | Commercial-investigation | None (TVs are a named roadmap candidate) | **BUILD** | Yes — 4 records with region notes | rtings.com and samsung.com already expose compare tools; intent is clearly "compare side by side" |
| 4 | Smartwatch Comparison | `smartwatch comparison` | compare smartwatches, smart watch comparison, smartwatch specs | Commercial-investigation | None (wearables named in roadmap) | **BUILD** | Yes — 4 records | SERP is editorial-heavy with only one multi-way compare tool; a spec tool is still a distinct, useful format |
| 5 | Projector Comparison | `projector comparison` | compare projectors, projector specs, projector comparison tool | Commercial-investigation | None | **BUILD** | Yes — 4 records incl. brightness measurement method | compareprojector.com and rtings.com tools rank; measurement-method caution required (see §3) |
| 6 | Printer Comparison | `printer comparison` | compare printers, printer specs, printer comparison tool | Commercial-investigation (ambiguous SERP) | None | **BUILD** | Yes — 4 records incl. ISO/ESAT yields | SERP is mixed (office printers / 3D printers / services); tool still matches the "compare specs" slice |
| 7 | Earbuds Comparison | `earbuds comparison` | wireless earbuds comparison, compare earbuds, true wireless comparison | Commercial-investigation | `/compare/headphones` already covers driver/ANC/codecs/battery | **DO NOT BUILD** | No dedicated dataset | See §4 — duplicate-risk with headphones, editorial SERP, no data. Documented instead of built |
| 8 | Gaming Monitor | `gaming monitor comparison` | gaming monitor specs, compare gaming monitors | **Listicle** ("best gaming monitor") per observed SERP | `/compare/monitors` (generic preset) | **BUILD — conditional shape** | Preset only (no monitor database) | Allowed by the brief as a *specialized landing page on the same engine*, not a new tool. Fields are gaming-specific (refresh, response, VRR, G-Sync/FreeSync, HDMI 2.1, panel, size). Caveat recorded: observed intent skews listicle, so ranking expectation is lower |
| 9 | Phone Camera | `phone camera comparison` | compare phone cameras, phone camera specs, camera phone comparison | Commercial-investigation + "which has the best camera" | `/compare/phones` has a camera group, but no camera-focused experience | **BUILD** | Yes — derived from the existing 47 verified phone records | Uses the real database; no new data to verify; no photo-quality claims |
| 10 | Phone Battery | `phone battery comparison` | phone battery specs, compare phone battery | Mostly "best battery life" ranking intent | `/compare/phones` → "Compare Phone Specifications" → Battery and charging | **DO NOT BUILD** | Records exist but no test data | See §5 — thin relative to existing coverage; only project metric is volume 30 / TP 300 |

**Result: 8 pages built (6 primary + 2 specialized), 2 refused with reasons.**

---

## 2. Observed SERP landscape (2026-10-01)

| Topic | Ranking page type observed | Interactive tool present? | Top domains observed |
| --- | --- | --- | --- |
| CPU comparison | Interactive tool | Yes | versus.com, hardwaredb.net, cpu-compare.com, cpuranklist.com, pcbench.net, tomshardware.com |
| GPU comparison | Interactive tool | Yes | gpu-monkey.com, gpucomparison.org, cputronic.com, gpuvec.com |
| TV comparison | Mixed (tool + editorial) | Yes | rtings.com (`/tv/tools/compare`), tvcomparepro.com, samsung.com (`/tvs/compare`), flatpanelshd.com |
| Smartwatch comparison | Editorial/listicle (one tool) | Partial | gadgets360.com (4-way compare), pcmag.com, tomsguide.com, techradar.com |
| Projector comparison | Mixed (tool + editorial) | Yes | compareprojector.com, rtings.com (`/projector/tools/compare`), projectorreviews.com |
| Printer comparison | Mixed (ambiguous) | Partial | rtings.com (`/printer/tools/compare`), printertrends.com, canon.co.uk |
| Earbuds comparison | Editorial/listicle | Partial (versus.com only) | versus.com, pcmag.com, macworld.com, pocket-lint.com |
| Gaming monitor | **Listicle** | **No** | displayninja.com, tomshardware.com, pcgamesn.com, wired.com |
| Phone camera | Mixed (blind tests + DB) | Partial | kimovil.com (`/en/compare-cameras`), cnet.com, phonearena.com |
| Phone battery | Editorial/listicle + test DB | Partial | phonearena.com (`/phones/benchmarks/battery`), macworld.com, zdnet.com |

**Implication for the build:** topics 1, 2, 3, 5 are tool-shaped SERPs — an interactive
comparison experience is the format that already ranks. Topics 4 and 6 are workable.
Topic 8 is a listicle SERP, so the gaming-monitor page is built as a *tool with distinct
fields* (real utility) rather than as a bet on ranking for "best gaming monitor".
Topics 7 and 10 do not clear the bar.

---

## 3. Data-quality findings that shaped the design

| Finding | Consequence |
| --- | --- |
| Projector brightness is stated in **different measurement standards** (ANSI lumens vs ISO 21118 vs IDMS colour brightness) and contrast with/without dynamic iris | Brightness and contrast are displayed **verbatim with their stated method**; the page must not rank or "normalise" them |
| TV specs **vary by region, screen size and firmware**; sourced records include a Latin-America Samsung SKU, a US TCL series page and a US Panasonic model | Every TV record carries `regionNote`, shown next to the record |
| Smartwatch battery is a **manufacturer claim**, never a test | Stored as `batteryLifeClaim` and displayed as a quoted claim; no battery-life computation anywhere |
| Printer yields/speeds are **standard-dependent** (ISO/IEC, ESAT, draft vs auto-duplex) and often quoted as ranges | Stored as published strings; never converted, averaged or compared as numbers |
| CPU/GPU clock speeds arrive in **mixed units** (GHz vs MHz) | Clock fields are compared as text, not numbers, so a 2.45 GHz part is never "lower" than a 2970 MHz part |
| Intel Arc B580's only fetched source was Wikipedia — below this project's Tier-2 bar | **Product dropped** rather than published with a weak citation |

---

## 4. Decision: Earbuds Comparison — DO NOT BUILD

Applying the project's own boundary test (`TOOL-CATEGORY-STRATEGY.md` §2) and the
seven-question gate in the brief §32:

1. **Distinct intent?** Partially — TWS earbuds differ from over-ear headphones in form
   factor and in the fields that matter (case battery, codecs, multipoint, fit).
2. **Enough data?** **No.** No earbuds records exist and none were sourced in this pass.
3. **Better than a generic article?** Yes in principle — but `/compare/headphones` already
   offers an earbud-capable attribute set (`Form factor`, `Driver`, `Connectivity`, `ANC`,
   `Battery`, `Codecs`, `Microphone`, `Impedance`).
4. **Real interactive experience?** Only if a dataset exists. It does not.
5. **Avoid duplicate?** The observed SERP is editorial (versus.com aside) and the nearest
   internal page is `/compare/headphones`. Two pages covering `compare headphones` /
   `earbuds comparison` from the same attribute model is exactly the near-duplicate the
   brief forbids.

**Outcome:** not built. If an earbuds dataset with per-field sources is sourced later, the
existing architecture now supports adding it as a `CategoryDataset` without new code.

---

## 5. Decision: Phone Battery Comparison — DO NOT BUILD

1. `/compare/phones` already exposes **Battery and charging** (capacity, wired charging,
   wireless charging, reverse wireless) inside "Compare Phone Specifications".
2. The only project metric for `phone battery comparison` in the Ahrefs export is
   **volume 30 / Traffic Potential 300** — the smallest non-zero row in the file.
3. The observed SERP is *"phones with best battery life"* ranking intent, served by
   **battery test databases** (phonearena.com benchmarks). CompareForge runs **no battery
   tests**, and inferring battery life from mAh is explicitly prohibited.
4. A page that repeats the existing battery group without test data would be thin and would
   cannibalise `/compare/phones`.

**Outcome:** not built. The battery fields stay where they already are, on the phone hub.

---

## 6. What each built page will contain (intent check before building)

| Page | Route | Interactive experience | Data source | Distinct value beyond the article? |
| --- | --- | --- | --- | --- |
| CPU Comparison | `/cpu-comparison` | Searchable 2–3 way CPU picker → grouped spec table → differences → swap/reset/share URL + user-entered fallback rows | 4 records with per-record source URL | Yes — no CompareForge page compares processors today |
| GPU Comparison | `/gpu-comparison` | Same engine | 3 records | Yes |
| TV Comparison | `/tv-comparison` | Same engine | 4 records + region notes | Yes — region/scope made explicit, unlike a generic table |
| Smartwatch Comparison | `/smartwatch-comparison` | Same engine | 4 records | Yes |
| Projector Comparison | `/projector-comparison` | Same engine | 4 records with measurement-method notes | Yes — brightness method shown, which most tables hide |
| Printer Comparison | `/printer-comparison` | Same engine | 4 records with standard-dependent yields | Yes |
| Gaming Monitor Comparison | `/gaming-monitor-comparison` | Gaming-specific attribute preset (user-entered, same `SpecComparison` engine) | None — visitor-entered, stated on the page | Yes — refresh/response/VRR/sync/HDMI 2.1 fields the generic monitor preset lacks |
| Phone Camera Comparison | `/phone-camera-comparison` | Same engine over the **existing 47 phone records**, camera fields only | Existing verified phone database | Yes — camera-focused table from data the site already verifies |

No page in this list is a doorway page: each has its own tool, its own attribute set, its
own FAQ and its own methodology block, and none repeats another page's copy.
