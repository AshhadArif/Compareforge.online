# Interactive Tool Specification — CompareForge.online

**Version:** 2.0 (platform-generalized)
**Date:** September 23, 2026
**Status:** Strategy/Architecture — reference for the multi-tool platform; phone-specific build already exists (v1) and is being generalized in the build phase

**Supersedes for platform purposes:** v1.0 phone-only spec content (selector/table behavior below remains authoritative where marked "engine behavior — built").

---

## 1. Platform Positioning

### What CompareForge is

An **interactive comparison and decision-tools platform**. Core loop:

```
SEARCH → LANDING → TOOL → INPUT → RESULT → EXPLANATION → RELATED TOOLS → GUIDES
```

### What it is not

- Not a phone-only site (phones = first **category**, not identity)
- Not an article farm with widgets
- Not a random general-tools collection (see boundary test in `TOOL-CATEGORY-STRATEGY.md`)
- Not a store, review aggregator, or real-time price engine

### Target users (generic)

1. Deciding between known options (compare)
2. Unsure what to consider (finder/decide)
3. Verifying two things work together (match/compatibility)
4. Weighing keep/replace/upgrade trade-offs (calculate)
5. Reading specs without marketing spin (any tool + guides)

### User problems served

1. "I'm deciding between X and Y — what actually differs?"
2. "I don't know which options to compare."
3. "Will A work with B?"
4. "Is it worth upgrading / switching given my situation?"
5. "What do these specs mean in practice?"

### Where CompareForge adds value

1. Interactive tools (user drives input → structured result)
2. Plain-language interpretation, not raw spec dumps
3. Differences-first and explanation-first result design
4. Verified data with sources; missing data stays missing
5. Tools linked into one loop (no dead-end utilities)

---

## 2. Tool Types & Depth Contract

Every registered tool implements the full depth chain:

```
INPUT → VALIDATION → DATA RETRIEVAL → NORMALIZATION → LOGIC
→ RESULT → EXPLANATION → SOURCES → RELATED TOOLS / GUIDES
```

| type | Logic | Result panel |
|------|-------|--------------|
| `compare` | Attribute diffs + significance thresholds | Table + differences + implications |
| `decide` | Weighted scoring vs answers/constraints | Shortlist + why-fit |
| `match` | Relation lookup/rules | Verdict + reason + caveats |
| `calculate` | Formulas + labeled assumptions | Totals + difference + interpretation |

Registry metadata requirements: `TOOL-REGISTRY.md` §2.

---

## 3. Shared ToolShell (all tools)

```
Breadcrumbs (server, SEO)
ToolHeader: H1 + purpose + who-for (server, SEO)
Interactive body (client): input → validation → result
Explanation/Methodology (server, SEO)
SourcePanel (server + result)
RelatedTools (registry) / RelatedGuides
FAQSection (server, SEO + FAQPage)
```

Landing must be useful **before** hydration (thin-page guard: `SEO-ARCHITECTURE.md` §3.2).

---

## 4. Engine Behavior — Comparison Tool (built; generalized contract)

The following defines the **product-comparison** tool instance (category example: smartphones). Category modules supply attribute groups; behavior is category-agnostic.

### 4.1 User flow

```
1. Arrive at /tools/product-comparison/ or curated /compare/ page
2. Select Product/Entity A (search/autocomplete)
3. Select Product/Entity B (required)
4. Optionally add up to 4 total (same category)
5. Submit → structured comparison result
6. Toggle differences-only; expand groups; read interpretation
7. Share via URL (state noindex unless curated)
8. Explore related tools/guides
```

### 4.2 Selector behavior (engine behavior — built)

- Autocomplete after 2 characters; matches name/brand case-insensitively; top 8 suggestions
- Empty input: recent/popular suggestions
- Duplicate prevention: same entity twice → error; max 4; cross-category blocked
- Missing entity: "not in database" + request path; discontinued/announced badges
- Missing attribute: "—" + "Not yet verified"; never guessed
- Fuzzy tolerance for typos; explicit no-match message

### 4.3 Result sections

1. Breadcrumbs · 2. H1 ([A] vs [B]) · 3. Intro (2–3 sentences) · 4. Selector (editable) · 5. Quick verdict (contextual, **no universal winner**) · 6. Spec/attribute table (HTML, grouped) · 7. Key differences (5–8) · 8. Practical implications · 9. Use-case routing · 10. Full specs + sources · 11. Related comparisons · 12. Related tools/guides

Mobile: stacked cards, accordion groups, sticky names only; 44px targets.

### 4.4 Differences-only thresholds

| Spec type | Threshold | Example |
|-----------|-----------|---------|
| Numeric (general) | >5% | 5000 vs 4685 mAh |
| Screen size | >0.1" | 6.9 vs 6.7 |
| Price (MSRP) | >$50 | $1299 vs $1300 → same |
| Text | always different | chipset names |
| Boolean/list | value/set inequality | IP68 vs IP67 |

Rows carry `data-difference` states; toggle is client-side, keyboard accessible, contrast-safe (color + icon).

### 4.5 Rendering split

| Component | Render |
|-----------|--------|
| Shell, H1, intro, verdict, table (default), methodology, FAQ | Server/SSG |
| Selector, toggle, accordion, search | Client |
| Dynamic pair not curated | Client + **noindex** |

---

## 5. Tool Specs — Planned Instances

### 5.1 Product Finder (`decide`) — Phase 1

- **Inputs:** 5–8 questions (use case, budget band, priorities); required vs optional marked
- **Logic:** score `UseCaseProfile` + tags + price constraints → rank → top 2–4
- **Result:** shortlist with per-item reasons; **no single "best" without criteria**
- **Hand-off:** "Compare your top two" → comparison tool pre-filled
- **Edge cases:** zero matches → broadened set + honest message; optional skips → disclosed defaults
- **SEO:** landing indexes; result state noindex; guides map to this tool for "which X" intents

### 5.2 Compatibility Checker (`match`) — Phase 2

- **Inputs:** entity A + entity B (or requirement), within a supported relation domain
- **Logic:** Relation record / rules → `yes` | `no` | `partial` | **not verified**
- **Result:** verdict + plain reason + caveats + sources + last verified date
- **Hard rule:** never invent verdicts; unsupported domain → clear message
- **SEO:** landing indexes for "does X work with Y" job; dynamic state noindex

### 5.3 Upgrade vs Keep Calculator (`calculate`) — Phase 2

- **Inputs:** current price/date, upgrade price, optional trade-in, usage intensity
- **Logic:** documented formulas + labeled assumptions → totals for each option → delta
- **Result:** totals, difference, interpretation, assumptions panel, disclaimer (not financial advice)
- **Hard rules:** validation ranges; no hidden math; user inputs never silently rewritten
- **SEO:** landing indexes; result noindex; hand-off to comparison for replacements

---

## 6. Loading, Empty, Error States (platform)

- **Loading:** skeletons/spinners per tool; never fabricate partial results
- **Empty:** explain the job + examples + path into related tools
- **Errors:** invalid selection, unsupported pair, out-of-range inputs, no data — each with recovery action
- **Missing data:** "—" / "Not verified" with tooltip; log for research

---

## 7. Accessibility (all tools)

- Full keyboard path; visible focus; ARIA labels per selector/toggle/step
- Tables header-associated; results announced; toggle state announced
- WCAG 2.1 AA contrast; difference cues = color + icon/text
- Mobile reflow; 44px targets; ≥16px body text

---

## 8. Performance Budget (all tools)

FCP <1.5s · LCP <2.5s · INP <200ms · CLS <0.1 · JS <150KB gzipped target · page weight <500KB excluding images.

---

## 9. Reusable Component Inventory (build later)

ToolShell, ToolHeader, ToolInput, EntitySelector/ProductSelector, SearchSelector, ComparisonSelector, FilterPanel, WizardSteps, ResultPanel (type dispatcher), ComparisonTable, DifferenceIndicator, SpecificationRow, CalculationPanel, RecommendationPanel, CompatibilityResult, SourcePanel, MethodologyPanel, RelatedTools, RelatedGuides, FAQSection, Breadcrumbs.

Shared only if used by ≥2 registry tools; otherwise tool-local (`TOOL-PLATFORM-ARCHITECTURE.md` §7).

---

## 10. Non-Goals (this spec)

- No implementation code in this phase (Decision 22)
- No new phone hard-coding; category data stays in modules
- No duplicate tool variants; no indexable dynamic outputs
- No fabricated testing/ratings/advice in any result
