# URL Architecture — CompareForge.online

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Strategy/Architecture — canonical for the multi-tool platform.

**Supersedes:** `URL-SEO-MAP.md` (retained as historical reference for the phone-only MVP; this file is authoritative going forward).

---

## 1. URL Rules (unchanged)

1. Lowercase only
2. Hyphen-separated
3. Descriptive — tells you what's on the page
4. Stable — no IDs, random strings, or dates
5. Short — clarity over exhaustiveness
6. Consistent trailing slash

---

## 2. Platform URL Patterns

### 2.1 Tools (the product)

```
/tools/                          Tools hub (indexable)
/tools/[tool]/                   Tool landing (indexable, registry-driven)
                                 e.g. /tools/product-comparison/
                                      /tools/product-finder/
                                      /tools/compatibility-checker/
                                      /tools/upgrade-calculator/
```

Dynamic tool states use query params or client state on the landing URL and are **noindex** (see §4).

### 2.2 Curated decision content (indexable, editorial only)

```
/compare/                        Comparison hub
/compare/[slug]/                 Curated comparison (e.g., a-vs-b pages)
/products/                       Entity hub (smartphones today)
/products/[slug]/                Entity page
/guides/ + /guides/[slug]/       Guides
/categories/ + /categories/[slug]/
```

### 2.3 Hubs, legal, utility (unchanged)

```
/  /about/  /contact/  /privacy-policy/  /terms/  /cookie-policy/
/disclaimer/  /report-an-error/  /404  /sitemap.xml  /robots.txt
```

### 2.4 Legacy redirects (already in production config)

```
/comparisons/*  → 308 → /compare/*
/tools/phone-comparison/?a=&b= → tool state, noindex (existing behavior)
```

Future renames (e.g., `/tools/phone-comparison/` → `/tools/product-comparison/`) must ship with 308 redirects and updated internal links in the same change.

---

## 3. Indexation Matrix

| URL type | Render | Robots | Sitemap | Canonical |
|----------|--------|--------|---------|-----------|
| Homepage, hubs | SSG | index,follow | yes | self |
| Tool landing `/tools/[tool]/` | SSG | index,follow | yes | self |
| Curated `/compare/[slug]/` | SSG | index,follow | yes | self |
| Entity/guide/category pages | SSG | index,follow | yes | self |
| Dynamic tool state (`?a=…&b=…`, wizard state, calc state) | client | **noindex,follow** | **no** | tool landing |
| Non-curated comparison combos | client | **noindex** | **no** | tool landing or hub |
| Legal/utility | SSG | per page | as existing | self |

---

## 4. Dynamic State Strategy

**Rule:** landing pages are the SEO asset; dynamic states are the product.

1. Tool landing `/tools/[tool]/` is static, unique URL/title/H1/canonical, carries methodology + FAQ + related links.
2. When the user runs the tool, state is reflected in the URL for sharing (query params) but the page emits `noindex,follow` and canonicalizes to the landing.
3. If an editorial team later curates a specific result (e.g., a popular A-vs-B pair with demonstrated demand), that becomes a **separate SSG page** under `/compare/[slug]/` with its own unique content — never by promoting a raw dynamic URL to index.
4. No parameter combinations are submitted to the sitemap.

---

## 5. Canonical & Cannibalization Rules

- Every page self-canonical except dynamic states (canonical → landing).
- Opposite-order "B vs A" queries 301/308 to the canonical alphabetical slug (existing rule).
- One primary intent per URL: tool landing targets the tool query; curated compare targets the "A vs B" query; guide targets explanatory queries. No URL tries to rank for all three.
- When adding a tool, check no existing URL already owns its `purpose` query set (registry uniqueness + URL check together).

---

## 6. Sitemap Structure (target)

```xml
<urlset>
  <!-- Static, indexable -->
  /  /tools/  /tools/[each built tool]/
  /compare/  /compare/[curated slugs]/
  /products/  /products/[slugs]/
  /guides/  /guides/[slugs]/
  /categories/  /categories/[slugs]/
  legal/utility per current policy
</urlset>
```

Tool entries added only when `status: built` in the registry; removed on `retired`.

---

## 7. robots.txt (target)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://compareforge.online/sitemap.xml
```

Noindex on dynamic states is handled per-page meta (robots.txt cannot noindex). Existing disallow rules for `?a=`/`?b=` tool params may be simplified to meta noindex when the platform refactor lands — decide at build time, not now.

---

## 8. Internal URL Linking (summary)

Full rules: `INTERNAL-LINKING-PLAN.md`.

- Hub → all built tools and sections.
- Tool landing ↔ related tools (registry `relatedTools` only).
- Curated results → entity pages, related comparisons, relevant tools.
- Guides → the tool they support (one primary tool per guide where possible).
- Every indexable page within 3 clicks of homepage.

---

*See also: `SEO-ARCHITECTURE.md`, `TOOL-REGISTRY.md`, `TOOL-PLATFORM-ARCHITECTURE.md`.*
