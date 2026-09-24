# Information Architecture — CompareForge.online

## Site Hierarchy

```
Home (/)
│
├── Comparisons (/comparisons/)
│   ├── [Comparison] (/comparisons/product-a-vs-product-b/)
│   ├── [Comparison] (/comparisons/product-c-vs-product-d/)
│   └── ...
│
├── Categories (/categories/)
│   ├── [Category] (/categories/smartphones/)
│   │   ├── [Comparison] (linked from category page)
│   │   └── ...
│   └── ...
│
├── Guides (/guides/)
│   ├── [Guide] (/guides/what-is-oled/)
│   ├── [Guide] (/guides/how-to-choose-a-smartphone/)
│   └── ...
│
├── About (/about/)
│
├── Contact (/contact/)
│
├── Privacy Policy (/privacy-policy/)
│
├── Terms of Service (/terms/)
│
├── Cookie Policy (/cookie-policy/)
│
├── Disclaimer (/disclaimer/)
│
├── Report an Error (/report-an-error/)
│
├── Sitemap (/sitemap.xml)
│
└── Robots (/robots.txt)
```

---

## Navigation Structure

### Primary Navigation (Header)

```
Home | Comparisons | Categories | Guides | About
```

### Footer Navigation

```
Site
├── Home
├── Comparisons
├── Categories
├── Guides
└── About

Legal
├── Privacy Policy
├── Terms of Service
├── Cookie Policy
├── Disclaimer
└── Report an Error
```

### Breadcrumbs

```
Home > [Section] > [Subsection] > [Page]
```

---

## Content Relationships

### Comparison → Category

Every comparison belongs to exactly one category.

```
Comparison: iPhone 15 vs Samsung Galaxy S24
    → Category: Smartphones
```

### Comparison → Related Comparisons

Each comparison links to 2-4 related comparisons.

```
iPhone 15 vs Samsung Galaxy S24
    → iPhone 15 vs Google Pixel 8
    → Samsung Galaxy S24 vs Google Pixel 8
    → iPhone 15 Pro vs Samsung Galaxy S24 Ultra
```

### Comparison → Related Guides

Each comparison links to 1-2 related guides.

```
iPhone 15 vs Samsung Galaxy S24
    → What is OLED?
    → Smartphone Camera Specifications Explained
```

### Guide → Comparisons

Each guide links to relevant comparisons.

```
What is OLED?
    → iPhone 15 vs Samsung Galaxy S24
    → Budget Smartphone Comparison
```

### Guide → Related Guides

Each guide links to 1-2 related guides.

```
What is OLED?
    → What is Refresh Rate?
    → LCD vs OLED vs AMOLED
```

### Category → Comparisons

Each category page links to all comparisons in that category.

```
Smartphones
    → iPhone 15 vs Samsung Galaxy S24
    → iPhone 15 vs Google Pixel 8
    → Samsung Galaxy S24 vs Google Pixel 8
    → ...
```

### Category → Related Guides

Each category page links to relevant guides.

```
Smartphones
    → How to Choose a Smartphone
    → Smartphone Specifications Explained
```

---

## URL Mapping

### All URLs

| Page Type | URL Pattern | Example |
|-----------|-------------|---------|
| Homepage | `/` | `/` |
| Comparison Hub | `/comparisons/` | `/comparisons/` |
| Comparison | `/comparisons/[slug]/` | `/comparisons/iphone-15-vs-samsung-galaxy-s24/` |
| Category | `/categories/[slug]/` | `/categories/smartphones/` |
| Guide | `/guides/[slug]/` | `/guides/what-is-oled/` |
| About | `/about/` | `/about/` |
| Contact | `/contact/` | `/contact/` |
| Privacy | `/privacy-policy/` | `/privacy-policy/` |
| Terms | `/terms/` | `/terms/` |
| Cookie Policy | `/cookie-policy/` | `/cookie-policy/` |
| Disclaimer | `/disclaimer/` | `/disclaimer/` |
| Report Error | `/report-an-error/` | `/report-an-error/` |
| Sitemap | `/sitemap.xml` | `/sitemap.xml` |
| Robots | `/robots.txt` | `/robots.txt` |

---

## Page Inventory (MVP)

### Required Pages

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Site overview and navigation |
| Comparison Hub | `/comparisons/` | List all comparisons |
| Category: Smartphones | `/categories/smartphones/` | Smartphone category overview |
| Comparison: iPhone 15 vs Galaxy S24 | `/comparisons/iphone-15-vs-samsung-galaxy-s24/` | Comparison |
| Comparison: iPhone 15 vs Pixel 8 | `/comparisons/iphone-15-vs-google-pixel-8/` | Comparison |
| Comparison: Galaxy S24 vs Pixel 8 | `/comparisons/samsung-galaxy-s24-vs-google-pixel-8/` | Comparison |
| Comparison: iPhone 15 Pro vs Galaxy S24 Ultra | `/comparisons/iphone-15-pro-vs-samsung-galaxy-s24-ultra/` | Comparison |
| Comparison: Budget Smartphones | `/comparisons/best-budget-smartphones/` | Comparison |
| Guide: What is OLED? | `/guides/what-is-oled/` | Feature explanation |
| Guide: How to Choose a Smartphone | `/guides/how-to-choose-a-smartphone/` | Buying guide |
| About | `/about/` | About the site |
| Contact | `/contact/` | Contact information |
| Privacy Policy | `/privacy-policy/` | Legal |
| Terms of Service | `/terms/` | Legal |
| Cookie Policy | `/cookie-policy/` | Legal |
| Disclaimer | `/disclaimer/` | Legal |
| Report an Error | `/report-an-error/` | Corrections |

### Total MVP Pages: 17

---

## Depth Rules

### Maximum Depth

No page should be more than 3 clicks from the homepage.

```
Homepage (0)
    → Category (1)
        → Comparison (2)

Homepage (0)
    → Comparisons Hub (1)
        → Comparison (2)

Homepage (0)
    → Guide (1)
```

### Orphan Prevention

- Every page must be linked from at least one other page
- Sitemap includes all indexable pages
- Footer provides fallback navigation to key sections

---

## Scalability

### When Adding New Categories

1. Create category page
2. Add to primary navigation
3. Add to homepage category listing
4. Add to footer if needed
5. Create initial comparisons for the category
6. Create relevant guides

### When Adding New Comparisons

1. Create comparison page
2. Add to relevant category page
3. Add to comparison hub
4. Link to related comparisons
5. Link from related guides
6. Add to sitemap

### When Adding New Guides

1. Create guide page
2. Add to guide hub (if exists)
3. Link to relevant comparisons
4. Link from relevant comparisons
5. Add to sitemap

---

## Search and Filter

### Comparison Hub Filtering

If filtering is implemented:

- Filter by category
- Sort by date, name, or relevance

### URL Handling for Filters

- Filter results should NOT be indexable
- Use noindex or robots.txt for filter URLs
- Canonical URLs should point to the main comparisons page
- Do not create indexable pages for every filter combination

### Search

- Search results should NOT be indexable
- Use noindex for search result pages
- Search helps users find specific comparisons
- Search does not create indexable URLs