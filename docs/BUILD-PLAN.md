# Build Plan

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Implementation-Ready

---

## 1. Overview

This document defines the implementation phases for building CompareForge's interactive comparison platform.

---

## 2. Tech Stack (Confirmed)

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Data:** JSON files (no database)
- **Deployment:** Vercel/Netlify (static generation)
- **Build:** `npx next build --webpack`

---

## 3. Phase 1: Data Foundation (Days 1-3)

### 3.1 Create Product Database

**Tasks:**
1. Create `/src/data/smartphones/` directory structure
2. Create brand directories (apple, samsung, google, oneplus, motorola, xiaomi)
3. Create 10 product JSON files with full specifications
4. Create `/src/data/brands.json`
5. Create `/src/data/categories.json`
6. Create `/src/data/index.json` (master index)

**Deliverables:**
- 10 product files with complete data
- Index file for fast lookups
- Brand and category metadata

### 3.2 Create Comparison Database

**Tasks:**
1. Create `/src/data/comparisons/` directory
2. Create 10 comparison JSON files
3. Each file includes: products, keyDifferences, practicalImplications, useCaseRecommendations, faq

**Deliverables:**
- 10 comparison definitions
- Structured comparison data

### 3.3 Create Guide Database

**Tasks:**
1. Create `/src/data/guides/` directory
2. Create 2 guide JSON files (or update existing)

**Deliverables:**
- 2 guide definitions

---

## 4. Phase 2: Core Components (Days 4-7)

### 4.1 Product Selector Component

**Tasks:**
1. Create `/src/components/ProductSelector.tsx`
2. Implement search input with autocomplete
3. Implement product matching logic
4. Implement duplicate prevention
5. Implement recent/popular suggestions
6. Style with Tailwind

**Deliverables:**
- Working product selector with search
- Autocomplete dropdown
- Duplicate prevention

### 4.2 Comparison Table Component

**Tasks:**
1. Create `/src/components/ComparisonTable.tsx`
2. Implement spec group rendering
3. Implement differences-only toggle
4. Implement sticky headers
5. Implement mobile card layout
6. Style with Tailwind

**Deliverables:**
- Interactive comparison table
- Differences-only filter
- Responsive layout

### 4.3 Product Card Component

**Tasks:**
1. Create `/src/components/ProductCard.tsx`
2. Display product summary (name, brand, price, key specs)
3. Link to product page
4. Style with Tailwind

**Deliverables:**
- Reusable product card

### 4.4 Comparison Card Component

**Tasks:**
1. Update `/src/components/ComparisonCard.tsx`
2. Display comparison summary (products, key difference)
3. Link to comparison page
4. Style with Tailwind

**Deliverables:**
- Updated comparison card

---

## 5. Phase 3: Comparison Engine (Days 8-10)

### 5.1 Data Loading Utilities

**Tasks:**
1. Create `/src/lib/products.ts` (load all products, search, get by slug)
2. Create `/src/lib/comparisons.ts` (load comparisons, generate comparison result)
3. Create `/src/lib/guides.ts` (load guides)
4. Implement build-time data generation

**Deliverables:**
- Product data loading functions
- Comparison generation functions
- Guide loading functions

### 5.2 Comparison Generation

**Tasks:**
1. Implement spec comparison logic
2. Implement difference calculation
3. Implement significance determination
4. Implement unit normalization
5. Implement differences-only filtering

**Deliverables:**
- Comparison engine
- Difference calculator
- Significance classifier

---

## 6. Phase 4: Page Templates (Days 11-16)

### 6.1 Homepage

**Tasks:**
1. Update `/src/app/page.tsx`
2. Add hero with comparison tool input
3. Add featured comparisons section
4. Add guides section
5. Add FAQ section
6. Add structured data

**Deliverables:**
- Updated homepage with comparison tool

### 6.2 Comparison Hub

**Tasks:**
1. Update `/src/app/compare/page.tsx`
2. Add comparison grid
3. Add filters (brand, category)
4. Add pagination

**Deliverables:**
- Comparison hub page

### 6.3 Comparison Page

**Tasks:**
1. Update `/src/app/compare/[slug]/page.tsx`
2. Integrate comparison tool (pre-populated)
3. Add all content sections (verdict, key differences, specs, etc.)
4. Add structured data
5. Add internal links

**Deliverables:**
- Full comparison page template

### 6.4 Product Hub

**Tasks:**
1. Create `/src/app/products/page.tsx`
2. Add product grid
3. Add filters (brand, status)
4. Add brand browsing

**Deliverables:**
- Product hub page

### 6.5 Product Page

**Tasks:**
1. Create `/src/app/products/[slug]/page.tsx`
2. Add product details
3. Add specifications table
4. Add related comparisons
5. Add structured data

**Deliverables:**
- Product page template

### 6.6 Guide Pages

**Tasks:**
1. Update `/src/app/guides/[slug]/page.tsx`
2. Add markdown rendering
3. Add related comparisons
4. Add structured data

**Deliverables:**
- Guide page template

### 6.7 Tool Landing Page

**Tasks:**
1. Create `/src/app/tools/phone-comparison/page.tsx`
2. Add full comparison tool (empty state)
3. Add instructions
4. Add popular comparisons

**Deliverables:**
- Tool landing page

---

## 7. Phase 5: SEO Implementation (Days 17-19)

### 7.1 Metadata

**Tasks:**
1. Implement dynamic title tags
2. Implement meta descriptions
3. Implement canonical URLs
4. Implement Open Graph tags
5. Implement robots directives

**Deliverables:**
- SEO metadata for all pages

### 7.2 Structured Data

**Tasks:**
1. Implement Product schema
2. Implement BreadcrumbList schema
3. Implement FAQPage schema
4. Implement Article schema
5. Validate all structured data

**Deliverables:**
- Structured data for all pages

### 7.3 Sitemap & robots.txt

**Tasks:**
1. Update `/src/app/sitemap.ts`
2. Update `/src/app/robots.ts`
3. Include only indexable pages
4. Test generation

**Deliverables:**
- Dynamic sitemap
- Correct robots.txt

---

## 8. Phase 6: Internal Linking (Days 20-21)

### 8.1 Link Implementation

**Tasks:**
1. Add product links from comparison pages
2. Add comparison links from product pages
3. Add guide links from comparison pages
4. Add related comparisons to all comparison pages
5. Add breadcrumbs to all pages

**Deliverables:**
- Complete internal linking graph

---

## 9. Phase 7: Legal Pages (Days 22-23)

### 9.1 Legal Content

**Tasks:**
1. Update About page
2. Update Contact page
3. Update Privacy Policy
4. Update Terms
5. Update Cookie Policy
6. Update Disclaimer
7. Update Report an Error
8. Create 404 page

**Deliverables:**
- All legal/utility pages

---

## 10. Phase 8: Testing & Launch (Days 24-28)

### 10.1 Testing

**Tasks:**
1. Execute all tests from TESTING-PLAN.md
2. Fix any failing tests
3. Performance optimization
4. Accessibility audit
5. SEO audit

**Deliverables:**
- All tests passing
- Performance targets met

### 10.2 Launch

**Tasks:**
1. Build production (`npx next build --webpack`)
2. Deploy to hosting
3. Verify all pages live
4. Submit sitemap to Google Search Console
5. Monitor for errors

**Deliverables:**
- Live website
- Google Search Console setup

---

## 11. File Structure (Final)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    (Homepage)
│   ├── not-found.tsx               (404)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── globals.css
│   ├── compare/
│   │   ├── page.tsx                (Comparison hub)
│   │   └── [slug]/
│   │       └── page.tsx            (Comparison page)
│   ├── products/
│   │   ├── page.tsx                (Product hub)
│   │   └── [slug]/
│   │       └── page.tsx            (Product page)
│   ├── guides/
│   │   ├── page.tsx                (Guide hub)
│   │   └── [slug]/
│   │       └── page.tsx            (Guide page)
│   ├── tools/
│   │   └── phone-comparison/
│   │       └── page.tsx            (Tool landing)
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx            (Category page)
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── cookie-policy/
│   │   └── page.tsx
│   ├── disclaimer/
│   │   └── page.tsx
│   └── report-an-error/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumbs.tsx
│   ├── ProductSelector.tsx
│   ├── ComparisonTable.tsx
│   ├── ComparisonCard.tsx
│   ├── ProductCard.tsx
│   ├── GuideCard.tsx
│   └── SearchBar.tsx
├── data/
│   ├── index.json
│   ├── brands.json
│   ├── categories.json
│   ├── smartphones/
│   │   ├── apple/
│   │   │   ├── iphone-18-pro-max.json
│   │   │   └── ...
│   │   ├── samsung/
│   │   ├── google/
│   │   ├── oneplus/
│   │   ├── motorola/
│   │   └── xiaomi/
│   ├── comparisons/
│   │   ├── apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra.json
│   │   └── ...
│   └── guides/
│       ├── foldable-phone-buying-guide-2026.json
│       └── ai-features-explained.json
├── lib/
│   ├── products.ts
│   ├── comparisons.ts
│   └── guides.ts
└── types/
    └── index.ts
```

---

## 12. Estimated Timeline

| Phase | Days | Deliverable |
|-------|------|-------------|
| 1: Data Foundation | 1-3 | Product database |
| 2: Core Components | 4-7 | UI components |
| 3: Comparison Engine | 8-10 | Comparison logic |
| 4: Page Templates | 11-16 | All page types |
| 5: SEO Implementation | 17-19 | SEO metadata |
| 6: Internal Linking | 20-21 | Link graph |
| 7: Legal Pages | 22-23 | Legal content |
| 8: Testing & Launch | 24-28 | Live site |
| **Total** | **28 days** | **MVP launch** |

---

## 13. Success Criteria

### Launch Checklist

- [ ] 10 products with complete data
- [ ] 10 curated comparisons
- [ ] 2 guides
- [ ] Interactive comparison tool working
- [ ] All pages generate without errors
- [ ] All SEO metadata correct
- [ ] All structured data valid
- [ ] Sitemap generated correctly
- [ ] robots.txt correct
- [ ] All internal links working
- [ ] Mobile responsive
- [ ] Desktop responsive
- [ ] Keyboard navigation working
- [ ] Performance targets met
- [ ] Legal pages complete
- [ ] 404 page working
- [ ] Build completes successfully

---

*This plan defines the complete implementation roadmap for CompareForge. It is implementation-ready and should be used as the primary reference for development.*
