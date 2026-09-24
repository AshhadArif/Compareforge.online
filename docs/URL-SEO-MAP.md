# URL Architecture & SEO Map

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Historical reference (phone-only MVP)

> **Superseded (Sept 2026):** `URL-ARCHITECTURE.md` is canonical for the multi-tool platform (tool URLs, dynamic-state noindex, indexation matrix). Page-level SEO specs below remain useful where consistent with `SEO-ARCHITECTURE.md`.

---

## 1. URL Rules

All URLs must follow these rules:

1. **Lowercase only** — no uppercase letters
2. **Hyphen-separated** — no underscores, no spaces
3. **Descriptive** — every URL tells you what's on the page
4. **Stable** — no IDs, no random strings, no dates
5. **Short** — prefer clarity over exhaustiveness
6. **Trailing slash** — consistent trailing slash

---

## 2. URL Patterns

### 2.1 Comparison Pages

**Pattern:** `/compare/[product-a]-vs-[product-b]/`

**Examples:**
```
/compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
/compare/apple-iphone-18-pro-max-vs-google-pixel-11-pro-xl/
/compare/samsung-galaxy-s26-ultra-vs-google-pixel-11-pro-xl/
/compare/pixel-10a-vs-iphone-17e/
```

**Rules:**
- Product names use full model names (no abbreviations)
- Products listed alphabetically by brand for consistency
- "vs" separates products
- Trailing slash

### 2.2 Roundup Comparisons

**Pattern:** `/compare/[topic]-[year]/`

**Examples:**
```
/compare/best-phones-under-500-2026/
/compare/best-flagship-phones-2026/
/compare/best-foldable-phones-2026/
/compare/best-camera-phones-2026/
/compare/best-budget-phones-2026/
```

### 2.3 Product Pages

**Pattern:** `/products/[brand]-[model]/`

**Examples:**
```
/products/apple-iphone-18-pro-max/
/products/samsung-galaxy-s26-ultra/
/products/google-pixel-10a/
/products/oneplus-15/
/products/motorola-razr-fold/
```

### 2.4 Guide Pages

**Pattern:** `/guides/[guide-slug]/`

**Examples:**
```
/guides/foldable-phone-buying-guide-2026/
/guides/ai-features-explained/
/guides/how-long-do-smartphones-last/
/guides/what-is-silicon-carbon-battery/
/guides/amoled-vs-lcd-explained/
```

### 2.5 Category Pages

**Pattern:** `/categories/[category]/`

**Examples:**
```
/categories/smartphones/
/categories/foldable-phones/
/categories/budget-phones/
```

### 2.6 Tool Pages

**Pattern:** `/tools/[tool-name]/`

**Examples:**
```
/tools/phone-comparison/
/tools/phone-finder/
```

### 2.7 Hub Pages

**Pattern:** `/[section]/`

**Examples:**
```
/compare/        (comparison hub)
/products/       (product hub)
/guides/         (guide hub)
```

---

## 3. Page-by-Page SEO Specification

### 3.1 Homepage

```
URL: /
Title: CompareForge — Phone Comparison Tool | Compare Specs Side by Side
H1: CompareForge — Phone Comparison Tool
Meta Description: Compare smartphones side by side. Verified specs, practical analysis, and interactive tools to help you choose the right phone.
Canonical: /
Robots: index, follow
Breadcrumb: Home
Structured Data: WebSite, Organization, FAQPage
OG Image: /og-image.png
```

### 3.2 Comparison Hub

```
URL: /compare/
Title: Phone Comparisons 2026 — Side-by-Side Specs | CompareForge
H1: Phone Comparisons
Meta Description: Browse smartphone comparisons. See verified specs, key differences, and practical analysis for every phone.
Canonical: /compare/
Robots: index, follow
Breadcrumb: Home > Comparisons
Structured Data: BreadcrumbList, ItemList
OG Image: /og-image.png
```

### 3.3 Comparison Page (Example)

```
URL: /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
Title: iPhone 18 Pro Max vs Samsung Galaxy S26 Ultra — Specs & Differences | CompareForge
H1: iPhone 18 Pro Max vs Samsung Galaxy S26 Ultra
Meta Description: Compare iPhone 18 Pro Max and Samsung Galaxy S26 Ultra side by side. Display, camera, battery, performance specs with practical analysis.
Canonical: /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
Robots: index, follow
Breadcrumb: Home > Comparisons > iPhone 18 Pro Max vs Galaxy S26 Ultra
Structured Data: Product (×2), BreadcrumbList, FAQPage
OG Image: /og-image.png
```

### 3.4 Product Hub

```
URL: /products/
Title: Smartphone Database — All Phone Specs | CompareForge
H1: Smartphone Database
Meta Description: Browse our database of smartphones. Compare specs, features, and prices across all major brands.
Canonical: /products/
Robots: index, follow
Breadcrumb: Home > Products
Structured Data: BreadcrumbList, ItemList
```

### 3.5 Product Page (Example)

```
URL: /products/apple-iphone-18-pro-max/
Title: Apple iPhone 18 Pro Max — Specs, Features & Comparisons | CompareForge
H1: Apple iPhone 18 Pro Max
Meta Description: Apple iPhone 18 Pro Max specifications, features, and comparisons. Verified data with practical analysis.
Canonical: /products/apple-iphone-18-pro-max/
Robots: index, follow
Breadcrumb: Home > Products > Apple iPhone 18 Pro Max
Structured Data: Product, BreadcrumbList
```

### 3.6 Guide Hub

```
URL: /guides/
Title: Phone Buying Guides & Research | CompareForge
H1: Phone Buying Guides
Meta Description: Research guides to help you understand phone specifications, features, and make informed purchasing decisions.
Canonical: /guides/
Robots: index, follow
Breadcrumb: Home > Guides
Structured Data: BreadcrumbList, ItemList
```

### 3.7 Guide Page (Example)

```
URL: /guides/foldable-phone-buying-guide-2026/
Title: Foldable Phone Buying Guide 2026 — Is a Foldable Worth It? | CompareForge
H1: Foldable Phone Buying Guide 2026
Meta Description: Everything you need to know before buying a foldable phone in 2026. Compare durability, cost, and productivity.
Canonical: /guides/foldable-phone-buying-guide-2026/
Robots: index, follow
Breadcrumb: Home > Guides > Foldable Phone Buying Guide 2026
Structured Data: Article, BreadcrumbList, FAQPage
```

### 3.8 Tool Page

```
URL: /tools/phone-comparison/
Title: Phone Comparison Tool — Compare Smartphones Side by Side | CompareForge
H1: Phone Comparison Tool
Meta Description: Compare any two smartphones side by side. Verified specs, practical differences, and interactive analysis.
Canonical: /tools/phone-comparison/
Robots: index, follow
Breadcrumb: Home > Tools > Phone Comparison
Structured Data: WebApplication, BreadcrumbList
```

---

## 4. Dynamic URL Strategy

### 4.1 Interactive Tool URLs

The comparison tool generates URLs when users select products. These URLs follow the same pattern as curated comparisons:

```
Tool URL: /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
Curated URL: /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
```

**If the comparison is curated (indexable):**
- URL is the same
- Page is pre-generated at build time
- Full SEO content present

**If the comparison is NOT curated (tool-only):**
- URL still works (client-side routing)
- But page is NOT pre-generated
- Robots: noindex
- No structured data
- Minimal SEO content

### 4.2 Indexation Rules

| Scenario | Index? | Rationale |
|----------|--------|-----------|
| Curated comparison (manual) | YES | Has unique content, search demand |
| Tool-generated comparison (popular) | YES | If search demand exists |
| Tool-generated comparison (rare) | NO | No search demand, thin content |
| Product page | YES | All products get pages |
| Guide page | YES | All guides get pages |
| Hub pages | YES | Navigation pages |
| Tool landing page | YES | Primary tool entry |

### 4.3 Canonical Rules

1. Every page has a self-referencing canonical
2. Dynamic tool URLs canonical to themselves only if curated
3. Non-indexed tool URLs: `robots: noindex, canonical: /tools/phone-comparison/`

### 4.4 Sitemap Strategy

```xml
<!-- Include in sitemap -->
<url>
  <loc>https://compareforge.online/compare/</loc>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://compareforge.online/compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://compareforge.online/products/apple-iphone-18-pro-max/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>

<!-- Do NOT include in sitemap -->
<!-- Tool-only comparison URLs -->
<!-- Non-indexed pages -->
```

---

## 5. Internal Linking Rules

### 5.1 From Comparison Pages

Every comparison page links to:
- Both product pages
- 2-3 related comparisons
- 1-2 related guides
- The comparison tool

### 5.2 From Product Pages

Every product page links to:
- All comparisons involving that product
- Related products (same brand, similar price)
- Relevant guides

### 5.3 From Guide Pages

Every guide links to:
- Related comparisons
- Products mentioned
- Other guides on related topics

### 5.4 From Hub Pages

Hub pages link to:
- All items in that section
- Related sections

---

## 6. Keyword Cannibalization Prevention

### 6.1 Canonical Pairings

| Query Variations | Canonical URL |
|-----------------|---------------|
| "iPhone 18 Pro Max vs Galaxy S26 Ultra" | /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/ |
| "iPhone 18 Pro Max compared to Galaxy S26 Ultra" | Same |
| "Galaxy S26 Ultra vs iPhone 18 Pro Max" | Same (canonical redirect) |
| "difference between iPhone 18 Pro Max and Galaxy S26 Ultra" | Same |
| "iPhone 18 vs Galaxy S26" | /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/ (if that's the intent) |

### 6.2 Redirect Rules

If a product name order differs from canonical:
```
/samsung-galaxy-s26-ultra-vs-apple-iphone-18-pro-max/ 
→ 301 → /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
```

### 6.3 Cannibalization Monitoring

Monitor in Google Search Console:
- Pages with same queries
- Impression/click distribution
- Position fluctuations

---

## 7. Structured Data Strategy

### 7.1 Product Schema

On comparison pages and product pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Apple iPhone 18 Pro Max",
  "brand": {
    "@type": "Brand",
    "name": "Apple"
  },
  "description": "Apple iPhone 18 Pro Max specifications and features",
  "offers": {
    "@type": "Offer",
    "price": "1299",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
```

**Note:** No fake AggregateRating or Review. Only include if genuine ratings exist.

### 7.2 FAQPage Schema

On comparison pages and guide pages with FAQ sections:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which phone has a better camera?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### 7.3 BreadcrumbList Schema

On all pages except homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://compareforge.online/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Comparisons",
      "item": "https://compareforge.online/compare/"
    }
  ]
}
```

---

## 8. robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://compareforge.online/sitemap.xml
```

---

## 9. Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://compareforge.online/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Hub pages -->
  <url>
    <loc>https://compareforge.online/compare/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://compareforge.online/products/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://compareforge.online/guides/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Comparison pages (curated only) -->
  <!-- Each curated comparison -->
  
  <!-- Product pages -->
  <!-- Each product -->
  
  <!-- Guide pages -->
  <!-- Each guide -->
  
  <!-- Tool pages -->
  <url>
    <loc>https://compareforge.online/tools/phone-comparison/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

*This specification defines the URL architecture and SEO strategy for CompareForge. It is implementation-ready and should be used as the primary reference for URL structure and SEO implementation.*
