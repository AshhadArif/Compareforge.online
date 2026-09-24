# Tool Platform Architecture — CompareForge.online

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Strategy/Architecture — NOT YET IMPLEMENTED (build deferred to BUILD PROMPT)

---

## 1. Purpose

This document defines the multi-tool platform architecture that lets CompareForge host multiple interactive decision tools under one coherent system. It is the technical counterpart to `TOOL-REGISTRY.md`, `TOOL-CATEGORY-STRATEGY.md`, and `DATA-MODEL.md`.

**Constraint honored by this phase:** no components, routes, or product-DB changes are specified for immediate coding. Everything here is design-for-later.

---

## 2. Platform Principles

1. **Tool-first:** the runnable tool is the product; pages exist to route users into and out of tools.
2. **One shell, many tools:** every tool renders inside a shared `ToolShell` so navigation, SEO blocks, and related-links behave identically.
3. **Registry-driven:** tools are declared in a registry, never hard-coded into layouts ad hoc. A tool that is not in the registry does not ship.
4. **Shared data layer:** all tools read the same generic entity store (`DATA-MODEL.md`); tools may add category-specific attribute modules but never fork the core model.
5. **Purpose uniqueness:** each registry entry must solve a distinct user problem (no same-purpose variants).
6. **Static-first:** landing pages and curated results are statically generated; dynamic tool states are client-side and `noindex`.

---

## 3. System Components

```
┌─────────────────────────────────────────────────────────┐
│  Tool Registry (docs/TOOL-REGISTRY.md → src/data/tools) │
│  tool_id · type · route · inputs · outputs · status     │
└──────────────────────────┬──────────────────────────────┘
                           │ resolves
┌──────────────────────────▼──────────────────────────────┐
│  Route Layer: /tools/[tool]/ (SSG landing)              │
│  ToolShell → ToolHeader → tool-specific Interactive     │
└──────────────────────────┬──────────────────────────────┘
                           │ reads
┌──────────────────────────▼──────────────────────────────┐
│  Data Layer (generic)                                   │
│  Entity · Attribute · Value · Source · Relation         │
│  + category modules (e.g., smartphone spec profile)     │
└──────────────────────────┬──────────────────────────────┘
                           │ feeds
┌──────────────────────────▼──────────────────────────────┐
│  Shared UI Components                                   │
│  ToolHeader, EntitySelector, ResultPanel,               │
│  ComparisonTable, DifferenceIndicator, CalculationPanel,│
│  RecommendationPanel, CompatibilityResult, SourcePanel, │
│  MethodologyPanel, RelatedTools, RelatedGuides, FAQ     │
└──────────────────────────┬──────────────────────────────┘
                           │ produces
┌──────────────────────────▼──────────────────────────────┐
│  Outputs                                                │
│  Tool result (client state) · shareable URL             │
│  Curated indexable page (editorial) · noindex dynamic   │
└─────────────────────────────────────────────────────────┘
```

### 3.1 Tool types (canonical enum)

| type | Job | Canonical output |
|------|-----|------------------|
| `compare` | Side-by-side of 2–4 entities | Structured comparison + differences |
| `decide` | Guided questions → recommendation | Shortlist + reasoning |
| `match` | Compatibility/fitness of A with B | Yes / No / Partial + reason |
| `calculate` | Numbers in → computed comparison of options/states | Calculated totals + explanation |

Every tool in the registry must declare exactly one primary type. This is the anti-duplication key: two tools with the same type AND same purpose cannot coexist.

---

## 4. ToolShell Contract

Every tool page is composed as:

```
ToolShell (server)
├── Breadcrumbs (server, SEO)
├── ToolHeader: H1 + purpose + how-it-works (server, SEO)
├── Tool-specific Interactive (client)
│     ├── Input stage (selector / wizard / form)
│     ├── Validation stage
│     └── Result stage
├── Explanation/Methodology block (server, SEO)
├── SourcePanel (server, SEO)
├── RelatedTools (server, SEO, from registry links)
├── RelatedGuides (server, SEO)
└── FAQSection (server, SEO + FAQPage schema)
```

**Rendering rules:**

- Shell chrome (H1, intro, methodology, FAQ, related links): static generation at build.
- Interactive body: client component, hydrated after load.
- Result computed client-side from bundled JSON where possible; no API dependency for MVP-class tools.

---

## 5. Data Flow (per tool)

```
1. User lands on /tools/[tool]/ (static HTML)
2. Client hydrates Interactive
3. INPUT → user selects entities or answers questions / enters numbers
4. VALIDATION → entity exists? same category? inputs in range?
5. RETRIEVAL → read entity records + attributes + relations from bundled data
6. NORMALIZATION → units, value types, missing-data rules ("—" never guessed)
7. LOGIC → tool-specific step (diff calc / scoring / match rules / arithmetic)
8. RESULT → ResultPanel variant for the tool type
9. EXPLANATION → why this result (plain language, significance)
10. SOURCES → SourcePanel with field-level citations
11. RELATED → RelatedTools (registry) + RelatedGuides (content graph)
12. URL → state encoded for share; noindex unless curated
```

---

## 6. URL & Rendering Strategy (summary)

Full detail in `URL-ARCHITECTURE.md` and `SEO-ARCHITECTURE.md`.

| Page | Route | Render | Index |
|------|-------|--------|-------|
| Tools hub | `/tools/` | SSG | index |
| Tool landing | `/tools/[tool]/` | SSG | index |
| Dynamic tool state | `/tools/[tool]/?…` or path state | client | **noindex** |
| Curated result/compare page | `/compare/[slug]/` (etc.) | SSG | index (editorial only) |
| Entity pages | `/products/[slug]/`, future `/entities/…` | SSG | index |

Rule: **landing pages are the SEO asset; dynamic states are the product.** Never generate indexable URLs for arbitrary tool combinations without editorial curation (Decision 12).

---

## 7. Component Library (planned, not built yet)

Shared, tool-agnostic where possible:

**Shell/SEO:** ToolShell, ToolHeader, Breadcrumbs, FAQSection, MethodologyPanel, SourcePanel, RelatedTools, RelatedGuides.

**Input:** ToolInput, EntitySelector (evolves current ProductSelector), SearchSelector, ComparisonSelector, FilterPanel, WizardSteps (for `decide`).

**Output:** ResultPanel (dispatcher by type), ComparisonTable, DifferenceIndicator, SpecificationRow, CalculationPanel, RecommendationPanel, CompatibilityResult.

Ownership rule: a component is shared only if ≥2 tools in the registry use it; otherwise it lives under the tool.

---

## 8. Registry Integration

- Machine-readable mirror of `docs/TOOL-REGISTRY.md` lives in the data layer when built (`src/data/tools/`).
- Route generation reads the registry: a tool with `status: planned` renders no route.
- RelatedTools links resolve only through registry `relatedTools` fields — no hand-wired cross-links in JSX.
- Registry fields are mandatory; incomplete entries fail validation at build (when implemented).

---

## 9. Category Modules

The generic data model stays lean; categories plug in **attribute modules** (e.g., `smartphone-specs`: display/camera/battery groups). Tools declare which modules they consume. This keeps the platform multi-category without a giant hard-coded spec table and without per-category forks of the tool shell.

---

## 10. Performance & Quality Budgets (carried forward)

Same budgets as the existing comparison engine spec: FCP < 1.5s, LCP < 2.5s, INP < 200ms, CLS < 0.1, JS bundle < 150KB gzipped per tool page where feasible. Tool landing pages must remain useful (static explanation, methodology, FAQ) even before JS hydrates.

---

## 11. What This Architecture Explicitly Avoids

- One mega-tool with modes (confusing, unmaintainable).
- Same-purpose tool variants for SEO (`…-tool`, `…-calculator`, `…-checker` duplicates).
- Per-category rewriting of the shell.
- Server APIs in MVP tools (bundle data instead).
- Programmatic indexable pages for dynamic tool outputs.

---

*Companion docs: `TOOL-REGISTRY.md`, `TOOL-CATEGORY-STRATEGY.md`, `DATA-MODEL.md`, `URL-ARCHITECTURE.md`, `SEO-ARCHITECTURE.md`.*
