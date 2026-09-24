# Tool Registry — CompareForge.online

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Strategy — entries below are the planned portfolio; `status` tracks build readiness.

---

## 1. Purpose

Single source of truth for every tool CompareForge ships or plans. If a tool is not in this registry, it does not exist on the site. The registry prevents SEO-churn duplicates and drives routes, RelatedTools links, and the tools hub.

---

## 2. Required Metadata (every entry)

| Field | Description |
|-------|-------------|
| `tool_id` | Stable machine ID (kebab-case) |
| `name` | Human display name |
| `type` | `compare` \| `decide` \| `match` \| `calculate` |
| `category` | Primary site category it serves (e.g., `smartphones`) |
| `description` | One sentence: what it does |
| `purpose` | The distinct user problem it solves (uniqueness check) |
| `route` | `/tools/[slug]/` |
| `inputs` | What the user provides |
| `outputs` | What the user gets |
| `dataRequirements` | Entities/attributes/relations/formulas needed |
| `logic` | Calculation/matching/scoring description (high level) |
| `seoPage` | Landing page target (title/H1 intent) |
| `relatedTools` | `tool_id[]` via registry only |
| `relatedGuides` | guide slugs or topics |
| `status` | `planned` \| `in-design` \| `built` \| `retired` |
| `version` | Semver of tool behavior |
| `lastUpdated` | ISO date |

**Uniqueness rule:** no two non-retired entries may share the same `type` + `purpose`. Review on every addition.

---

## 3. Registry Entries

### 3.1 product-comparison

```yaml
tool_id: product-comparison
name: Product Comparison Tool
type: compare
category: smartphones            # first category; architecture is multi-category
description: Select two to four products and see a structured side-by-side
  comparison with differences highlighted and explained.
purpose: Help users who already know their candidate products understand the
  real differences between them.
route: /tools/product-comparison/
inputs: 2–4 entity selections (same category)
outputs: Comparison table, differences-only view, key differences,
  practical implications, use-case routing, shareable URL
dataRequirements: Entity records, attribute values, units, sources,
  significance thresholds
logic: Normalize values → compute per-attribute deltas → classify
  identical/minor/significant → generate difference list + explanations
seoPage: "Product Comparison Tool — Compare Specs Side by Side"
relatedTools: [product-finder, upgrade-calculator]
relatedGuides: specification-explainers, buying-guides
status: built                    # engine exists for phones; generalize later
version: 1.0.0
lastUpdated: 2026-09-23
```

**Note:** current production implementation is the phone instance at `/tools/phone-comparison/` plus `/compare/[slug]/` curated pages. Generalization to the platform contract happens in the build phase; the registry name is the target.

### 3.2 product-finder

```yaml
tool_id: product-finder
name: Product Finder
type: decide
category: smartphones
description: Answer a few questions about your needs and budget and get a
  shortlist of matching products with reasons.
purpose: Help users who do not yet know which products to compare — the step
  before comparison.
route: /tools/product-finder/
inputs: Answers to 5–8 weighted questions (use case, budget, priorities)
outputs: Ranked shortlist (2–4 products), why-they-fit explanations,
  link into comparison for the top two
dataRequirements: Entities, use-case tags, feature flags, price bands,
  scoring rules per question
logic: Score entities against answers → filter to category constraints →
  rank → explain top matches; never a universal "best"
seoPage: "Product Finder — Find the Right Product for Your Needs"
relatedTools: [product-comparison, upgrade-calculator]
relatedGuides: buying-guides, use-case-guides
status: planned
version: 0.1.0
lastUpdated: 2026-09-23
```

### 3.3 compatibility-checker

```yaml
tool_id: compatibility-checker
name: Compatibility Checker
type: match
category: smartphones
description: Check whether two things work together — device with accessory,
  device with network/plan requirement, or device with software requirement.
purpose: Answer yes/no/partial "does A work with B" questions that side-by-side
  comparison cannot answer.
route: /tools/compatibility-checker/
inputs: Entity A + Entity B (or entity + requirement), same relation domain
outputs: Verdict (Yes / No / Partial), plain-language reason, caveats,
  related compatible options
dataRequirements: Relation records (pair/rules), entity profiles,
  requirement definitions (bands, ports, versions), source per relation
logic: Look up or evaluate relation rules → verdict + reason; missing
  relation = "Not verified", never guessed
seoPage: "Compatibility Checker — Does It Work Together?"
relatedTools: [product-comparison, product-finder]
relatedGuides: accessory-guides, connectivity-explainers
status: planned
version: 0.1.0
lastUpdated: 2026-09-23
```

### 3.4 upgrade-calculator

```yaml
tool_id: upgrade-calculator
name: Upgrade vs Keep Calculator
type: calculate
category: smartphones
description: Enter what you paid, what you'd pay to upgrade, and how you use
  your device; see a computed cost comparison of upgrading now vs keeping.
purpose: Support the "should I upgrade?" decision by comparing two options/states
  with the user's own numbers — not a generic single-purpose calculator.
route: /tools/upgrade-calculator/
inputs: Purchase price/date of current device, upgrade price, trade-in
  (optional), usage intensity
outputs: Cost-per-month style comparison of upgrade-now vs keep,
  break-even style framing, explanation of assumptions, next-step links
  (comparison of candidate upgrades)
dataRequirements: Optional entity MSRP reference (already in data model);
  formulas and clearly labeled default assumptions with sources/dates
logic: User inputs + disclosed assumptions → totals for each option →
  difference + plain-language interpretation; no financial advice claims
seoPage: "Upgrade Calculator — Should You Upgrade or Keep Your Phone?"
relatedTools: [product-comparison, product-finder]
relatedGuides: upgrade-guides, longevity-guides
status: planned
version: 0.1.0
lastUpdated: 2026-09-23
```

---

## 4. Pipeline (status → route)

| status | Tools hub | Route | Sitemap |
|--------|-----------|-------|---------|
| planned | listed as "coming soon" (optional) | none | no |
| in-design | listed | stub or none | no |
| built | listed with link | live SSG | yes |
| retired | removed | 301 to closest tool or hub | no |

---

## 5. Candidate backlog (NOT approved — evaluation required before entry)

These are ideas only. Each needs intent/data/feasibility review before becoming a registry entry:

- Plan/service tier comparison (`compare` type; blocked by pricing-churn rules — see Decision 8/14)
- Visual size/dimension comparison (`compare` type; needs image assets)
- Accessory finder (`decide` type; only if purpose differs from product-finder scope)
- Second-category instances of the four core tools (new category, same tool_ids)

**Rejected families (do not add):** generic utility calculators, converters, generators, weather, random pickers, or any tool whose output is not a comparison/evaluation/match of ≥2 comparable options.

---

## 6. Maintenance

- Update this file in the same change that adds/alters a tool.
- `version` bumps when logic/outputs change; `lastUpdated` on every edit.
- Quarterly review: retire tools with no use; refuse additions that duplicate an existing `purpose`.
