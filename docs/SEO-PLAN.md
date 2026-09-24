# SEO Plan — CompareForge.online

> **Status note (Sept 2026):** For tool-platform structure (what is indexed, tool landings vs dynamic states, intent mapping), the canonical doc is `SEO-ARCHITECTURE.md`. For URL paths, see `URL-ARCHITECTURE.md`. This file remains valid for on-page mechanics (title/meta patterns, markup detail) where it does not conflict.

## URL Architecture

### Primary Structure

```
/                                    → Homepage (index)
/comparisons/                        → Comparison hub
/comparisons/[product-a]-vs-[product-b]/  → Comparison page
/categories/[category-slug]/         → Category page
/guides/[guide-slug]/               → Guide page
/about/                              → About
/contact/                            → Contact
/privacy-policy/                     → Privacy Policy
/terms/                              → Terms of Service
/cookie-policy/                      → Cookie Policy
/disclaimer/                         → Disclaimer
/report-an-error/                    → Corrections
```

### URL Rules

- All lowercase
- Hyphens for word separators
- No trailing slashes (except root `/`)
- Descriptive, human-readable slugs
- No dynamic parameters for indexable pages
- No session IDs in URLs
- No unnecessary path segments

### URL Examples

```
/comparisons/iphone-15-vs-samsung-galaxy-s24/
/comparisons/canon-eos-r6-vs-sony-a7-iv/
/categories/smartphones/
/guides/what-is-oled/
```

---

## Page Titles

### Format

```
[Primary Keyword] | CompareForge
```

Or

```
[Primary Keyword] - CompareForge
```

### Rules

- Include primary keyword near the beginning
- Include brand name "CompareForge"
- Keep under 60 characters where possible
- Must accurately describe page content
- No keyword stuffing
- Unique for every page

### Examples

```
iPhone 15 vs Samsung Galaxy S24 | CompareForge
Smartphone Comparisons | CompareForge
What is OLED? | CompareForge
```

---

## Meta Descriptions

### Format

- 150-160 characters
- Unique for every page
- Must accurately describe the page content
- Include relevant keywords naturally
- Must entice users to click (honest, not clickbait)
- Must match page content

### Examples

```
Compare iPhone 15 and Samsung Galaxy S24 specifications, features, and differences. Find out which smartphone suits your needs.

Learn what OLED means, how it differs from LCD, and which display technology matters for your next device purchase.
```

---

## Heading Hierarchy

### Rules

- One H1 per page
- H1 must be the page title or comparison title
- H2 for major sections
- H3 for subsections within H2
- No skipped levels
- Headings must be descriptive and meaningful
- No keyword-stuffed headings

### Structure

```
H1: Product A vs Product B
  H2: Key Differences
  H2: Detailed Comparison
    H3: Feature 1
    H3: Feature 2
  H2: Specification Table
  H2: Use-Case Analysis
  H2: Advantages and Disadvantages
  H2: Methodology and Sources
  H2: FAQ
```

---

## Canonical URLs

### Implementation

- Every page must have a canonical URL tag
- Self-referencing canonicals on all pages
- Canonical format: `https://compareforge.online/[path]/`

### Rules

- No trailing slash inconsistency
- No duplicate canonical targets
- No canonical chains
- Canonical must match the actual URL

---

## Breadcrumbs

### Implementation

- Every page except homepage
- Visible breadcrumb navigation
- Schema markup (BreadcrumbList JSON-LD)

### Format

```
Home > Comparisons > Category > Product A vs Product B
```

### Rules

- Each level is a clickable link
- Current page is not a link
- Matches URL structure

---

## Internal Linking

### Rules

- Every comparison links to its category
- Every comparison links to 2-4 related comparisons
- Every comparison links to 1-2 related guides
- Every guide links to relevant comparisons
- Category pages link to all comparisons in that category
- Homepage links to categories and featured comparisons
- No orphan pages (every page reachable within 3 clicks)
- No artificial keyword-heavy anchor text

### Anchor Text

- Use natural, descriptive anchor text
- No "click here" links
- No keyword-stuffed anchor text
- Match the destination page's topic

---

## XML Sitemap

### Location

`/sitemap.xml`

### Rules

- Include all indexable pages
- Exclude noindex pages
- Exclude non-canonical URLs
- Update automatically when pages are added
- Proper lastmod dates
- Proper changefreq and priority (where useful)

### Sections

- Homepage
- All comparisons
- All categories
- All guides
- About, Contact, Privacy, Terms, Cookie Policy, Disclaimer, Corrections

---

## robots.txt

### Location

`/robots.txt`

### Rules

- Allow all crawlers
- Block admin areas if any
- Point to sitemap
- Block any non-public paths

### Default

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://compareforge.online/sitemap.xml
```

---

## Structured Data

### Implementation

Use JSON-LD structured data on relevant pages.

### Comparison Pages

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Product A vs Product B",
  "description": "...",
  "url": "https://compareforge.online/comparisons/product-a-vs-product-b/",
  "breadcrumb": { ... },
  "mainEntity": {
    "@type": "ProductComparison",
    "name": "Product A vs Product B"
  }
}
```

### FAQ Sections

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the main difference between Product A and Product B?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://compareforge.online/" },
    { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://compareforge.online/comparisons/" },
    { "@type": "ListItem", "position": 3, "name": "Product A vs Product B" }
  ]
}
```

### Guide Pages

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guide Title",
  "description": "...",
  "url": "...",
  "datePublished": "...",
  "dateModified": "...",
  "publisher": { "@type": "Organization", "name": "CompareForge" }
}
```

---

## Open Graph

### Implementation

Every page should include Open Graph meta tags.

### Tags

```html
<meta property="og:title" content="Page Title | CompareForge" />
<meta property="og:description" content="Meta description" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://compareforge.online/path/" />
<meta property="og:site_name" content="CompareForge" />
<meta property="og:image" content="https://compareforge.online/og-image.png" />
```

### Rules

- Every page must have og:title and og:description
- og:image should be a relevant, high-quality image
- og:url must match canonical URL
- og:type is "website" for most pages, "article" for guides

---

## Index/Noindex Rules

### Indexable Pages

- Homepage
- All comparison pages
- All category pages
- All guide pages
- About, Contact, Privacy, Terms, Cookie Policy, Disclaimer, Corrections

### Noindex Pages

- Search result pages
- Filter/sort result pages
- Tag pages (if any)
- Any page with duplicate or near-duplicate content
- Any page that doesn't provide unique value

### Rules

- Noindex any page that would be considered duplicate
- Noindex any page generated by search/filter functionality
- Never block indexable pages via robots.txt
- Use canonical URLs for duplicate content

---

## Pagination

### Approach

- No infinite scroll for indexable content
- Comparison hub uses page-based pagination
- Each paginated page must be indexable
- Use rel="next" and rel="prev" if applicable
- Or use a flat structure with category filters

---

## Duplicate URL Prevention

### Rules

- One URL per comparison (no duplicate pages)
- No query parameter variations of the same page
- No case-sensitive URL variations
- No trailing slash variations
- Canonical URLs on every page
- Proper redirects for old URLs if structure changes

### When Multiple URLs Might Exist

```
/comparisons/product-a-vs-product-b/
/comparisons/PRODUCT-A-vs-PRODUCT-B/    → redirect to lowercase
/comparisons/product-a-vs-product-b    → same as above (no trailing slash)
```

---

## Image SEO

### Rules

- Descriptive file names (e.g., `iphone-15-vs-galaxy-s24-comparison.jpg`)
- Alt text that describes the image
- Compressed file sizes
- Lazy loading
- Responsive images (srcset)
- WebP format where possible
- No stock photo watermarks

---

## Page Speed

### Targets

- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

### Implementation

- Critical CSS inlined
- Non-critical CSS deferred
- JavaScript deferred
- Images lazy-loaded
- Minimal third-party scripts
- Efficient data loading
- No render-blocking resources