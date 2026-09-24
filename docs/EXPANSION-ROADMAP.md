# Expansion Roadmap — CompareForge.online

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Strategy

---

## 1. Roadmap Philosophy

- Tools first; content supports tools; categories expand only through the core loop.
- Each phase gates on the previous phase's stability — no parallel sprawl.
- Phases describe **scope**, not calendar commitments.

---

## 2. Phase 1 — Platform Foundation (current → next build)

**Goal:** ship the multi-tool architecture with two proven tool types.

| Item | Scope |
|------|-------|
| Generic data model | Loaders/adapters over existing smartphone JSON (`DATA-MODEL.md` migration) |
| Tool registry | Machine-readable mirror of `TOOL-REGISTRY.md` driving routes + related links |
| ToolShell + shared components | Landing chrome, selectors, result panels per type |
| `product-comparison` | Generalize existing phone engine to platform contract (keep phone instance working; optional route alias) |
| `product-finder` | New `decide` tool — questions, scoring, shortlist → link into comparison |
| URL/SEO | `/tools/` hub, tool landings SSG, dynamic states noindex, sitemap from registry |
| Content | Guides/curated pages re-pointed to tools; no new page types |

**Exit criteria:** both tools pass acceptance tests; registry drives sitemap; no phone-only assumptions left in shared shell code; existing 45-page site still green (lint/tsc/build/route checks).

**Explicitly out of Phase 1:** new categories, compatibility data, calculators, visual tools, plan comparison.

---

## 3. Phase 2 — Second & Third Tool Types

**Goal:** prove `match` and `calculate` types on the same category.

| Tool | Added work |
|------|------------|
| `compatibility-checker` | Relation data layer + curated relation sets (accessories/network/software — scope decided in build prompt); verdict UI; sources per relation |
| `upgrade-calculator` | `CalculationDefinition` + inputs + assumptions panel + explanation output |

**Exit criteria:** four registry tools built; RelatedTools graph coherent; each tool distinct `purpose` reviewed; dynamic states noindex verified in production HTML.

---

## 4. Phase 3 — Depth & Optional Families

Candidates (each re-passes boundary test + registry review before approval):

| Candidate | Family | Precondition |
|-----------|--------|--------------|
| Visual/dimension comparison | G (`compare`) | Stable image assets; category module support |
| Plan/service tier comparison | F (`compare`) | Solves Decision 8/14 pricing-churn: stable, sourced tier data; else stays backlog |
| Accessory-focused finder variant | only if distinct from `product-finder` | Proven purpose uniqueness (likely merge, not add) |
| Additional `calculate` tools comparing two options | E | Clear two-option framing; no generic utilities |

---

## 5. Category Expansion

**Gate (all required):** Phase 1 exit + maintained entity data through one product cycle + editorial capacity for new category sourcing (Decision 7) + AdSense/vertical suitability.

**Process:** new category = attribute module + entity set + guides + category instance of existing tools (same `tool_id`s, `category` field updates) — **not** new tools.

**Candidates (evaluation order only):** laptops → TVs → wearables/audio. Each evaluated on meaningful differences, data availability, intent quality, maintenance load — not raw search volume.

---

## 6. Content Expansion Rules (any phase)

- New curated page: demonstrated demand + SERP format validation + unique editorial value (Decision 12).
- New guide: attaches to a live tool or category; no orphan keyword pages.
- Volume follows data/editorial capacity, never templates alone (Decision 10).

---

## 7. What NOT to Build (standing list)

1. Random generators, novelty tools, unrelated utilities
2. Generic single-purpose calculators that don't compare options/states
3. Duplicate-purpose tool variants for SEO (`…-tool` / `…-calculator` / `…-checker` same job)
4. One mega-tool with hidden modes instead of registered tools
5. Programmatic indexable pages for arbitrary tool outputs
6. Real-time price tracking (Decisions 8/14) unless data policy formally revisited
7. Fake ratings, fake testing, UGC without moderation strategy (Decisions 2/3/15)
8. User accounts/auth in MVP phases (add only with proven retention need)
9. Affiliate-driven "winners" (Decision 5 — revisit only with disclosure + editorial firewall)
10. Second category before Phase 1 exit criteria
11. AI bulk content without review (Decision 10, AdSense scaled-content rules)
12. Anything failing the five-part boundary test in `TOOL-CATEGORY-STRATEGY.md`

---

## 8. Risk Register (expansion-specific)

| Risk | Mitigation |
|------|------------|
| Tool sprawl → random tools site | Boundary test + registry uniqueness review |
| Thin tool landings | Landing content requirements in `SEO-ARCHITECTURE.md` |
| Data maintenance overload with categories | Category gates; MSRP-only; curated relations only |
| Phone identity lock-in in branding | Platform-positioned titles; category as instance |
| Dynamic URL index bloat | Two-layer SEO model; sitemap from registry only |
| Duplicate tools for keywords | `type`+`purpose` uniqueness rule |

---

## 9. Success Signals (no invented targets)

Track qualitatively/observationally until real data exists: tool completion (input→result), return to related tools, curated page engagement, GSC query mix matching intent mapping, zero manual actions, no thin-content flags. **Do not promise traffic/revenue/ranking numbers** (PRD success criteria).
