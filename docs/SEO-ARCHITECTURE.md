# SEO Architecture — CompareForge.online

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Strategy/Architecture — canonical for the multi-tool platform.

**Relationship to other docs:** `SEO-PLAN.md` retains on-page mechanics (title patterns, meta rules, detailed markup examples) where they don't conflict; this file governs **tool-platform structure**: what gets indexed, how tools and content divide intent, and schema per page type. `URL-ARCHITECTURE.md` governs paths.

---

## 1. Positioning for Search

**Site identity:** interactive comparison and decision-tools platform.

- Brand/head terms should map to "comparison tools / compare products" intent — not to a single category identity ("phone comparison site" is a subset, not the brand).
- Phones remain the first **category instance**; site-level titles/H1 must not lock the domain to phones forever (e.g., homepage may lead with tools + current category).
- Every indexable page must answer a real query with a clear job; tools are the differentiated asset that content alone can't match.

---

## 2. The Two-Layer SEO Model

```
LAYER 1 — INDEXABLE (static, editorial, unique)
  Tool landings · Curated comparisons · Entity pages · Guides · Hubs
        │
        │  routes users in (serp → landing) and down (landing → tool)
        ▼
LAYER 2 — PRODUCT (dynamic, client, noindex)
  Tool runs: selectors, wizard answers, calculator state
        │
        │  may produce curated Layer-1 pages later (editorial only)
        ▼
```

**Never invert the layers:** dynamic output does not become an indexable URL without editorial curation (Decision 12).

---

## 3. Page Type SEO Specs (tool platform)

### 3.1 Tools hub `/tools/`

```
Title: Interactive Comparison & Decision Tools | CompareForge
H1: Comparison & Decision Tools
Meta: Use CompareForge tools to compare products, find the right match,
  check compatibility, and weigh upgrade decisions.
Index: yes
Schema: ItemList (of Tool/WebApplication), BreadcrumbList
Job: navigational + tool discovery; links every built tool
```

### 3.2 Tool landing `/tools/[tool]/`

```
URL:    /tools/product-comparison/
Title:  Product Comparison Tool — Compare Side by Side | CompareForge
H1:     Product Comparison Tool
Meta:   Select two or four products and compare specs, features, and
        differences in one interactive view. Sources and methodology included.
Index:  yes (unique title/H1/canonical/meta per tool)
Schema: WebApplication (or SoftwareApplication), BreadcrumbList,
        FAQPage (if FAQ present)
Content requirements (thin-page guard):
  - What the tool does + who it's for (≥1 unique block)
  - How it works (steps)
  - Methodology / data sources
  - FAQ (genuinely useful, not filler)
  - Related tools + related guides
  → landing must be useful even without running the tool
```

### 3.3 Curated comparison `/compare/[slug]/`

Unchanged intent: "A vs B" decision queries. Verdict-first structure, spec table, key differences, use-case routing, sources, FAQ. Product + Breadcrumb + FAQ schema (no fake ratings — Decision 3). Cross-links to `product-comparison` tool ("compare any other pair").

### 3.4 Dynamic tool state

```
Robots: noindex,follow
Canonical: /tools/[tool]/
Schema: none beyond what landing provides
Sitemap: excluded
```

### 3.5 Entity / guide / category pages

As previously specified in `URL-SEO-MAP.md` / `SEO-PLAN.md`, with internal links added to relevant tools (e.g., entity page → compatibility checker, upgrade calculator where genuinely relevant).

### 3.6 Homepage

Communicates **platform** positioning: tools-first hero (comparison tool entry), category scope, methodology trust block. Avoid phone-only H1 if it contradicts multi-tool identity; current-category mention is fine.

---

## 4. Intent → Page Type Mapping

| Query pattern | Page type | Not |
|---------------|-----------|-----|
| "X vs Y" / difference between | Curated `/compare/` (if demand) or tool state (noindex) | Random listicle |
| "compare [category] / comparison tool" | Tool landing + hub | Thin tool variants |
| "which [product] should I buy / best for [use case]" | Guide → product-finder tool | Fake "top 10" auto-pages |
| "does X work with Y / compatible" | compatibility-checker landing + curated relation explainers | Unsupported verdict pages |
| "should I upgrade / is it worth it" | upgrade-calculator landing + upgrade guides | Single-option generic calculators |
| Specification explainers ("what is …") | Guides | Duplicating tool landings |

**SERP validation rule (carry into editorial process):** before creating a curated page, confirm top results match the intended format (commercial investigation for vs-pages, etc.). Intent decides format — documented process, not volume-chasing.

---

## 5. Long-Tail → Tool Strategy

1. Long-tail "vs", "for [use case]", "compatible", "worth it" queries are served by:
   - curated pages where demand is demonstrated and editorially justified, and
   - tools that handle the infinite combinations (noindex).
2. Guides capture informational variants and funnel into the matching tool (one primary tool per guide).
3. No mass-produced doorway pages per keyword variation (Decision 10 + AdSense scaled-content rules).
4. Every new long-tail cluster must attach to an existing registry tool or a registered new tool — never a one-off page with no tool behind it unless it's genuinely editorial.

---

## 6. Structured Data Summary

| Page | Schema |
|------|--------|
| Tool landing | WebApplication, BreadcrumbList, FAQPage |
| Tools hub | ItemList, BreadcrumbList |
| Curated compare | Product ×N, BreadcrumbList, FAQPage, Article where editorial |
| Entity | Product, BreadcrumbList |
| Guide | Article, BreadcrumbList, FAQPage |
| Dynamic state | none |

Never: fake AggregateRating, fake Review, unsupported offers (Decisions 2/3).

---

## 7. Internal Linking & Topical Authority

See `INTERNAL-LINKING-PLAN.md` for rules. Architecture-level requirements:

- Registry-driven RelatedTools on every tool landing and result view.
- Guides state their supporting tool explicitly.
- Curated comparisons link to the comparison tool (generic capability) and sibling curated pages.
- Cross-tool paths defined in UX flows (finder → compare, upgrade calc → compare, compat → entity → compare).
- Hubs (tools, compare, guides, categories, products) all reachable ≤3 clicks.

---

## 8. Indexation Health Checks (ongoing)

- Sitemap URLs ⊆ registry `built` tools + curated pages + entities/guides/hubs.
- No dynamic tool URLs in sitemap or submitted as linked.
- One primary query intent per URL (cannibalization review in GSC quarterly).
- Tool landing pages: watch for "thin" risk — every landing has methodology + FAQ + unique explanation.
- Retired tools: 301 + sitemap removal in same release.

---

## 9. What We Refuse (SEO anti-patterns)

- Programmatic indexable pages for arbitrary tool outputs (Decision 12)
- Near-duplicate tool variants (`x-calculator` vs `x-checker` vs `x-tool` same purpose)
- Scaling pages without editorial review (Decision 10)
- Fake testing/ratings to win snippets (Decisions 2/3)
- Chasing keyword volume without intent/format validation

---

*See also: `URL-ARCHITECTURE.md`, `TOOL-REGISTRY.md`, `CONTENT-STRATEGY.md`, `ADSENSE-COMPLIANCE.md`.*
