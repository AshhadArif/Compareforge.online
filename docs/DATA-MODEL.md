# Generic Data Model — CompareForge.online

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Strategy/Architecture — design target for the multi-tool platform

**Relationship to existing spec:** `PRODUCT-DATA-MODEL.md` defines the **smartphone attribute profile** (the first category module) and remains authoritative for those field-level rules. This document defines the **category-agnostic core** every tool reads.

---

## 1. Design Goals

1. Support `compare`, `decide`, `match`, and `calculate` tools without per-tool data forks.
2. Stay flexible across categories without over-engineering (no graph DB, no ontology stack — JSON remains the store).
3. Keep category-specific attributes in **modules**, not in one giant hard-coded table.
4. Preserve sourcing, verification, and missing-data honesty rules from existing decisions.

---

## 2. Core Entities

### 2.1 Entity (generic product/option)

```typescript
interface Entity {
  id: string;                  // unique, slug form
  category: string;            // e.g., "smartphones"
  brand: string;
  name: string;                // model/name
  fullName: string;
  slug: string;
  status: 'available' | 'discontinued' | 'announced' | 'upcoming';
  releaseDate: string | null;  // ISO 8601
  price: PriceInfo | null;     // MSRP-only (Decisions 8/14)
  attributes: AttributeValue[];// instance values (see 2.3)
  moduleData: Record<string, unknown>; // category module payload (e.g., smartphone specs)
  tags: string[];              // use-case tags for `decide` tools, e.g., "camera-first"
  sources: Source[];
  lastUpdated: string;
  lastVerified: string;
}
```

### 2.2 Brand & Category

```typescript
interface Brand { id: string; name: string; slug: string; logo?: string; website?: string; }

interface Category {
  id: string;                  // "smartphones"
  name: string;
  slug: string;
  description: string;
  modules: string[];           // attribute module ids this category loads
  tools: string[];             // registry tool_ids serving this category
  parent: string | null;
  entityCount: number;         // maintained count, not scraped
}
```

### 2.3 AttributeValue (typed, comparable)

```typescript
interface AttributeValue {
  attributeId: string;         // e.g., "battery.capacity"
  value: number | string | boolean | string[] | null; // null = unknown, never guessed
  unit?: string;               // "mAh", "inches", "GB"
  display?: string;            // pre-formatted display string
  confidence: 'verified' | 'estimated' | 'unconfirmed';
}
```

### 2.4 AttributeDefinition (per module)

```typescript
interface AttributeDefinition {
  attributeId: string;
  module: string;              // "smartphone-specs", "pricing", ...
  label: string;
  type: 'number' | 'text' | 'boolean' | 'list';
  unit?: string;
  group: string;               // display group e.g., "Display"
  comparable: boolean;         // include in compare tables
  // significance rules for differences-only (from INTERACTIVE-TOOL-SPEC):
  diffRule?: { kind: 'percent' | 'absolute' | 'text' | 'boolean'; threshold?: number };
  explainable?: boolean;       // show plain-language interpretation
}
```

### 2.5 Source (unchanged principles)

```typescript
interface Source {
  field: string;               // attributeId or relationId or "formula"
  url: string;
  siteName: string;
  dateAccessed: string;
  confidence: 'verified' | 'estimated' | 'unconfirmed';
}
```

Rules from `DATA-SOURCES.md` and Decisions 2/3/7 apply unchanged: no invented data/ratings/features; conflicts disclosed; missing = `null` → display "—".

### 2.6 Relation (for `match` tools)

```typescript
interface Relation {
  id: string;
  type: string;                // "device-accessory", "device-network", "device-software"
  a: string;                   // entity id or requirement id
  b: string;
  verdict: 'yes' | 'no' | 'partial';
  reason: string;              // plain language
  caveats?: string[];
  sources: Source[];
  lastVerified: string;
}
```

### 2.7 UseCaseProfile (for `decide` tools)

```typescript
interface UseCaseProfile {
  entityId: string;
  scores: Record<string, number>;   // useCaseKey → 0–1 fit (editorial, documented)
  flags: Record<string, boolean>;   // e.g., "supportsESim"
  notes?: string;
}
```

Scoring is editorial and documented in methodology — never fabricated user testing (Decision 2).

### 2.8 PriceInfo (unchanged policy)

MSRP, USD, region US, variants list — per Decisions 8/14. No real-time retail.

### 2.9 CalculationDefinition (for `calculate` tools)

```typescript
interface CalculationDefinition {
  id: string;                  // "upgrade-vs-keep"
  inputs: CalcInput[];         // user-entered fields w/ validation ranges
  assumptions: Assumption[];   // labeled defaults with source + date
  formulas: string[];          // human-readable formula documentation
  outputs: CalcOutput[];       // totals, difference, interpretation keys
  disclaimer: string;          // e.g., not financial advice
}
interface Assumption { key: string; label: string; value: number | string; source?: Source; dateChecked: string; }
```

---

## 3. Module System

- **Core entities** (Entity, Brand, Category, AttributeValue, Source, Relation, UseCaseProfile, CalculationDefinition) are shared.
- **Modules** (`smartphone-specs`, future `laptop-specs`, …) provide `AttributeDefinition[]` and any extra typed payloads stored under `moduleData`.
- A tool declares the modules it consumes (registry `dataRequirements`). The shell never hard-codes category fields.

Existing smartphone interfaces in `PRODUCT-DATA-MODEL.md` (DisplaySpecs, CameraSpecs, …) are the payload shape for `moduleData['smartphone-specs']` during migration; field validation rules there still apply.

---

## 4. Storage Layout (target)

```
src/data/
├── core/                      # generic (future migration)
│   ├── entities/              # or keep category folders pre-migration
│   ├── attributes/            # attribute definitions per module
│   ├── relations/
│   ├── usecases/
│   └── calculations/
├── smartphones/               # existing entity files (category module data)
├── comparisons/               # curated compare content
├── guides/
├── tools/                     # registry mirror (when built)
├── brands.json
├── categories.json
└── index.json
```

Migration note: current smartphone JSON stays in place until the build phase moves it behind the generic loaders — **no data migration in this strategy phase.**

---

## 5. Validation Rules (platform-level)

1. `id` unique across entities in a category; slugs lowercase-hyphen.
2. Every `AttributeValue.comparable` field used in a compare must have a definition (unit + diffRule) or display as non-comparable text.
3. `null` values never replaced by estimates (missing-data rules).
4. Relations require ≥1 source and a `lastVerified` date.
5. `UseCaseProfile.scores` must be justified in methodology docs (editorial origin, not "tested").
6. `CalculationDefinition.assumptions` require `dateChecked`; formulas documented.
7. Cross-category compare is blocked at selection (same `category` requirement) unless a future explicit cross-category tool is registered (none today).

---

## 6. Access Patterns (per tool type)

| Tool | Reads |
|------|-------|
| compare | Entities + comparable AttributeValues + definitions → normalize → diff |
| decide | Entities + UseCaseProfile + tags + price bands → score → rank |
| match | Entities + Relation (+ requirement defs) → verdict |
| calculate | CalculationDefinition + optional Entity price refs + user inputs → totals |

---

## 7. What We Deliberately Do Not Model

- User accounts, personalization server-side, UGC (Decision 15)
- Real-time prices (Decisions 8/14)
- Star ratings/reviews aggregates (Decisions 3/15)
- Infinite relation graphs (relations are curated per need)
- AI-generated attribute values (Decision 2; missing stays missing)
