# Page Templates Specification

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Implementation-Ready

---

## 1. Overview

This document defines the templates for every page type on CompareForge. Each template specifies the exact structure, content sections, SEO elements, and interactive components.

---

## 2. Page Types

| Template | URL Pattern | Purpose | Indexable |
|----------|-------------|---------|-----------|
| Homepage | `/` | Entry point, featured content | Yes |
| Comparison Hub | `/compare/` | Browse all comparisons | Yes |
| Comparison Page | `/compare/[slug]/` | Specific product comparison | Yes |
| Product Explorer | `/products/` | Browse all products | Yes |
| Product Page | `/products/[slug]/` | Individual product details | Yes |
| Guide Hub | `/guides/` | Browse all guides | Yes |
| Guide Page | `/guides/[slug]/` | Individual guide content | Yes |
| Category Page | `/categories/[slug]/` | Category overview | Yes |
| Tool: Comparison | `/tools/phone-comparison/` | Interactive comparison tool | Yes |
| About | `/about/` | About CompareForge | Yes |
| Contact | `/contact/` | Contact information | Yes |
| Privacy Policy | `/privacy-policy/` | Legal | Yes |
| Terms | `/terms/` | Legal | Yes |
| Cookie Policy | `/cookie-policy/` | Legal | Yes |
| Disclaimer | `/disclaimer/` | Legal | Yes |
| Report an Error | `/report-an-error/` | Error reporting | Yes |
| 404 | `/404` | Not found | No |

---

## 3. Homepage Template

### URL: `/`

### Structure

```
Breadcrumbs: Home

H1: CompareForge — Phone Comparison Tool

Hero Section
├── Headline: "Compare Phones. Make Confident Decisions."
├── Subhead: "Structured specs, practical analysis, and interactive tools."
├── [Comparison Tool Input]
│   ├── Search Product A
│   └── Search Product B
│   └── [Compare Now]
└── Popular Comparisons (3-4 links)

How It Works Section
├── H2: "How CompareForge Works"
├── Step 1: "Select Phones"
├── Step 2: "See Differences"
└── Step 3: "Make a Decision"

Featured Comparisons Section
├── H2: "Latest Comparisons"
├── ComparisonCard × 6
└── [View All Comparisons]

Featured Guides Section
├── H2: "Research Guides"
├── GuideCard × 3
└── [View All Guides]

Why CompareForge Section
├── H2: "Why CompareForge?"
├── Verified Data
├── Interactive Comparison
├── Practical Analysis
└── No Fluff

FAQ Section
├── H2: "Frequently Asked Questions"
└── FAQ items × 5-8
```

### SEO Elements

```
Title: CompareForge — Phone Comparison Tool | Compare Specs Side by Side
Meta Description: Compare smartphones side by side. Verified specs, practical analysis, and interactive tools to help you choose the right phone.
H1: CompareForge — Phone Comparison Tool
Canonical: /
Structured Data: WebSite, Organization, FAQPage
```

---

## 4. Comparison Hub Template

### URL: `/compare/`

### Structure

```
Breadcrumbs: Home > Comparisons

H1: Phone Comparisons

Introduction (2-3 sentences)

Filter Bar
├── Filter by Brand
├── Filter by Category
└── Sort by: Latest | Popular | A-Z

Comparison Grid
├── ComparisonCard × N
└── Pagination (if needed)

Related Guides
├── H2: "Guides to Help You Compare"
└── GuideCard × 3
```

### SEO Elements

```
Title: Phone Comparisons 2026 — Side-by-Side Specs | CompareForge
Meta Description: Browse smartphone comparisons. See verified specs, key differences, and practical analysis for every phone.
H1: Phone Comparisons
Canonical: /compare/
Structured Data: BreadcrumbList, ItemList
```

---

## 5. Comparison Page Template

### URL: `/compare/[slug]/`

This is the most important template. It combines static SEO content with the interactive comparison tool.

### Structure

```
Breadcrumbs: Home > Comparisons > [Product A] vs [Product B]

H1: [Product A] vs [Product B]

Introduction (2-3 sentences)
"Compare the [Product A] and [Product B] — two [category] released in [year].
This comparison covers display, performance, camera, battery, and key differences."

┌─────────────────────────────────────────────────────────────────┐
│ Interactive Comparison Tool (pre-populated)                     │
│                                                                 │
│ Product A: [Selected ▼]  vs  Product B: [Selected ▼]          │
│                                                                 │
│ [Show Differences Only] toggle                                  │
└─────────────────────────────────────────────────────────────────┘

H2: Quick Verdict
"Both phones are strong flagships. [Product A] excels in [X], while
[Product B] offers [Y]. For [use case], [Product A] may be more suitable."

H2: Key Differences
• [Difference 1 with practical interpretation]
• [Difference 2 with practical interpretation]
• [Difference 3 with practical interpretation]
• [Difference 4 with practical interpretation]
• [Difference 5 with practical interpretation]

H2: Compare [Product A] and [Product B]
[Specification comparison table - all groups]

H2: Display and Design
H3: Display
[Detailed display comparison]
H3: Design and Build
[Detailed design comparison]

H2: Camera
H3: Main Camera
H3: Telephoto
H3: Front Camera
H3: Video
[Detailed camera comparison]

H2: Battery and Charging
[Detailed battery comparison]

H2: Performance
[Detailed performance comparison]

H2: Software and AI Features
[Detailed software comparison]

H2: Which Phone Fits Which Use Case?
[Use-case recommendations table]

H2: Important Considerations
• [Consideration 1]
• [Consideration 2]
• [Consideration 3]

H2: Specifications and Sources
[Expandable spec sections with source links]

H2: Related Comparisons
• [Related Comparison 1]
• [Related Comparison 2]
• [Related Comparison 3]

H2: Related Guides
• [Related Guide 1]
• [Related Guide 2]

H2: Frequently Asked Questions
[FAQ items with structured data]
```

### SEO Elements

```
Title: [Product A] vs [Product B] — Specs & Differences | CompareForge
Meta Description: Compare [Product A] and [Product B] side by side. Display, camera, battery, performance specs with practical analysis.
H1: [Product A] vs [Product B]
Canonical: /compare/[slug]/
Structured Data: Product (×2), BreadcrumbList, FAQPage
```

---

## 6. Product Page Template

### URL: `/products/[slug]/`

### Structure

```
Breadcrumbs: Home > Products > [Product Name]

H1: [Product Name]

Quick Facts
├── Brand: [Brand]
├── Release: [Date]
├── Status: [Status badge]
├── Starting Price: [Price]
└── Category: [Category]

Hero Image (if available)

Key Specifications (summary)
├── Display: [Size] [Type]
├── Chipset: [Chipset]
├── Camera: [Main MP]
├── Battery: [Capacity]
└── Price: [Starting price]

H2: Full Specifications
[Complete specification table grouped by category]

H2: Key Features
[Highlights of what makes this phone notable]

H2: Available Colors
[Color options]

H2: Price and Variants
[All storage/RAM variants with prices]

H2: Comparisons
[List of comparisons involving this phone]

H2: Related Guides
[Guides mentioning this phone]

H2: Sources and Methodology
[Source links, last verified date]
```

### SEO Elements

```
Title: [Product Name] — Specs, Features & Comparisons | CompareForge
Meta Description: [Product Name] specifications, features, and comparisons. Verified data with practical analysis.
H1: [Product Name]
Canonical: /products/[slug]/
Structured Data: Product, BreadcrumbList
```

---

## 7. Guide Page Template

### URL: `/guides/[slug]/`

### Structure

```
Breadcrumbs: Home > Guides > [Guide Title]

H1: [Guide Title]

Article meta
├── Last updated: [Date]
├── Category: [Category]
└── Reading time: [X] min

[Markdown content]

H2: Related Comparisons
[Comparison cards]

H2: Related Products
[Product cards]

H2: Frequently Asked Questions
[FAQ items]
```

### SEO Elements

```
Title: [Guide Title] | CompareForge
Meta Description: [150-160 char description]
H1: [Guide Title]
Canonical: /guides/[slug]/
Structured Data: Article, BreadcrumbList, FAQPage
```

---

## 8. Product Explorer Template

### URL: `/products/`

### Structure

```
Breadcrumbs: Home > Products

H1: Smartphone Database

Introduction

Filter Bar
├── Filter by Brand
├── Filter by Status
├── Filter by Price Range
└── Sort by: Latest | Price | Name

Product Grid
├── ProductCard × N
└── Pagination

Browse by Brand
├── Apple (X phones)
├── Samsung (X phones)
├── Google (X phones)
├── OnePlus (X phones)
├── Motorola (X phones)
└── Xiaomi (X phones)
```

### SEO Elements

```
Title: Smartphone Database — All Phone Specs | CompareForge
Meta Description: Browse our database of smartphones. Compare specs, features, and prices across all major brands.
H1: Smartphone Database
Canonical: /products/
Structured Data: BreadcrumbList, ItemList
```

---

## 9. Category Page Template

### URL: `/categories/[slug]/`

### Structure

```
Breadcrumbs: Home > Categories > [Category Name]

H1: [Category Name]

Introduction

H2: Latest [Category] Comparisons
[Comparison cards]

H2: Browse [Category] Products
[Product cards]

H2: Guides About [Category]
[Guide cards]

H2: Related Categories
[Category cards]
```

### SEO Elements

```
Title: [Category Name] — Comparisons & Guides | CompareForge
Meta Description: [Category] comparisons, product database, and buying guides. Compare specs and find the right [category] for you.
H1: [Category Name]
Canonical: /categories/[slug]/
Structured Data: BreadcrumbList, ItemList
```

---

## 10. Tool Landing Page Template

### URL: `/tools/phone-comparison/`

### Structure

```
Breadcrumbs: Home > Tools > Phone Comparison

H1: Phone Comparison Tool

Introduction (2-3 sentences)

Interactive Comparison Tool (full functionality)
├── Product A selector
├── Product B selector
├── Optional Product C/D
├── [Compare Now]
└── Comparison Result

H2: How to Use This Tool
[Instructions]

H2: Popular Comparisons
[Links to curated comparisons]

H2: Tips for Comparing Phones
[Educational content]

H2: About Our Data
[Methodology, sources, last updated]
```

### SEO Elements

```
Title: Phone Comparison Tool — Compare Smartphones Side by Side | CompareForge
Meta Description: Compare any two smartphones side by side. Verified specs, practical differences, and interactive analysis.
H1: Phone Comparison Tool
Canonical: /tools/phone-comparison/
Structured Data: WebApplication, BreadcrumbList
```

---

## 11. Legal Pages Template

### URLs: `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/cookie-policy/`, `/disclaimer/`, `/report-an-error/`

### Structure (Common)

```
Breadcrumbs: Home > [Page Name]

H1: [Page Name]

[Content]

Last updated: [Date]
```

### Report an Error Page (Special)

```
Breadcrumbs: Home > Report an Error

H1: Report an Error

Introduction

Error Report Form
├── Comparison/Product URL
├── Error Type (dropdown)
├── Description
├── Your Email (optional)
└── [Submit]

Alternative:mailto:compareforge@domain.com

What happens next
```

---

## 12. 404 Page Template

### URL: `/404`

### Structure

```
H1: Page Not Found

"The page you're looking for doesn't exist or has been moved."

Search Bar

Popular Pages
├── Latest Comparisons
├── Phone Comparison Tool
├── Smartphone Database
└── Guides

[Go Home]
```

---

*This specification defines all page templates for CompareForge. It is implementation-ready and should be used as the primary reference for building page layouts.*
