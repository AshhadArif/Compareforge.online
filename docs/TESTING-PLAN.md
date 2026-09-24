# Testing Plan

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Implementation-Ready

---

## 1. Overview

This document defines acceptance tests for CompareForge's implementation.

---

## 2. Product Search Tests

### 2.1 Autocomplete Search

| Test | Input | Expected Result |
|------|-------|-----------------|
| Exact match | "iPhone 18 Pro Max" | Shows iPhone 18 Pro Max as first result |
| Partial match | "iPhone 18" | Shows all iPhone 18 variants |
| Brand match | "Samsung" | Shows all Samsung phones |
| Fuzzy match | "galxy s26" | Corrects to "Galaxy S26" |
| No match | "iPhone 19" | Shows "No phones found" |
| Empty input | "" | Shows recent/popular products |
| Case insensitive | "iphone" | Matches "iPhone" |

### 2.2 Product Selection

| Test | Action | Expected Result |
|------|--------|-----------------|
| Select product | Click result | Product appears in selector |
| Clear product | Click X | Product removed, selector empty |
| Change product | Select different | Old product replaced |
| Max products | Try to add 5th | Prevented, max 4 shown |

---

## 3. Comparison Tests

### 3.1 Basic Comparison

| Test | Action | Expected Result |
|------|--------|-----------------|
| Compare 2 products | Select A and B, click Compare | Comparison result shown |
| Compare 3 products | Select A, B, C | Three-column comparison |
| Compare 4 products | Select A, B, C, D | Four-column comparison |
| Same product | Select same for A and B | Error: "Please select different phones" |
| Different categories | Select phone + tablet | Prevented or warning |

### 3.2 Comparison Display

| Test | Action | Expected Result |
|------|--------|-----------------|
| Show all specs | Default view | All spec groups shown |
| Show differences only | Toggle on | Only different specs shown |
| Hide differences | Toggle off | All specs shown again |
| Spec groups | Click group header | Group collapses/expands |
| Missing data | Spec not available | Shows "—" with tooltip |

### 3.3 Comparison Calculations

| Test | Input | Expected Result |
|------|-------|-----------------|
| Battery difference | 5000mAh vs 4685mAh | Shows "6.7% more" |
| Weight difference | 227g vs 232g | Shows "2.2% heavier" |
| Price difference | $1299 vs $1300 | Shows "Similar" |
| Same spec | 6.9" vs 6.9" | Shows "Same" |
| Missing spec | null vs 5000mAh | Shows "Not verified" for A |

---

## 4. Mobile Layout Tests

| Test | Device | Expected Result |
|------|--------|-----------------|
| Responsive layout | <768px | Cards stacked, not side-by-side |
| Touch targets | Mobile | Minimum 44x44px |
| Font size | Mobile | Minimum 16px |
| No horizontal scroll | Mobile | Content fits viewport |
| Autocomplete | Mobile | Full-width overlay |
| Toggle switch | Mobile | Large touch target |

---

## 5. Desktop Layout Tests

| Test | Viewport | Expected Result |
|------|----------|-----------------|
| Max width | >1200px | Content centered, max 1200px |
| Sticky header | Scroll past 64px | Product names stick |
| Sticky first column | Wide table | Spec labels stick |
| Comparison table | Desktop | Side-by-side columns |
| Hover states | Desktop | Row highlight on hover |

---

## 6. Navigation Tests

| Test | Action | Expected Result |
|------|--------|-----------------|
| Homepage | Click logo | Navigate to / |
| Comparison hub | Click "Comparisons" | Navigate to /compare/ |
| Product hub | Click "Products" | Navigate to /products/ |
| Guide hub | Click "Guides" | Navigate to /guides/ |
| Breadcrumbs | Click parent | Navigate to parent page |
| Back button | Browser back | Correct previous page |
| 404 | Visit /nonexistent | Shows 404 page |

---

## 7. SEO Tests

### 7.1 Meta Tags

| Page | Title | H1 | Meta Description |
|------|-------|----|-----------------|
| Homepage | CompareForge — Phone Comparison Tool | Same | Present, <160 chars |
| Comparison | [A] vs [B] — Specs & Differences | [A] vs [B] | Present, <160 chars |
| Product | [Name] — Specs, Features & Comparisons | [Name] | Present, <160 chars |
| Guide | [Title] | [Title] | Present, <160 chars |

### 7.2 Structured Data

| Page | Schema | Valid |
|------|--------|-------|
| Homepage | WebSite, Organization, FAQPage | Valid JSON-LD |
| Comparison | Product (×2), BreadcrumbList, FAQPage | Valid JSON-LD |
| Product | Product, BreadcrumbList | Valid JSON-LD |
| Guide | Article, BreadcrumbList, FAQPage | Valid JSON-LD |

### 7.3 Canonical URLs

| Page | Canonical | Self-referencing |
|------|-----------|-----------------|
| All indexable pages | Same as URL | Yes |
| Non-indexed tool URLs | /tools/phone-comparison/ | No |

### 7.4 robots.txt

| Path | Allowed |
|------|---------|
| / | Allow |
| /api/ | Disallow |
| /admin/ | Disallow |

### 7.5 Sitemap

| Test | Expected |
|------|----------|
| All indexable pages included | Yes |
| No non-indexed pages | Correct |
| URLs match canonicals | Yes |
| Valid XML | Yes |

---

## 8. Internal Linking Tests

| Test | Expected |
|------|----------|
| Comparison → both products | Links exist |
| Comparison → related comparisons | 2-3 links |
| Comparison → related guides | 1-2 links |
| Product → all comparisons | Links exist |
| Guide → related comparisons | Links exist |
| All pages → homepage | Link exists |
| No orphan pages | Every page reachable |

---

## 9. Data Integrity Tests

| Test | Expected |
|------|----------|
| Product IDs unique | Yes |
| All products in index | Yes |
| All comparisons reference valid products | Yes |
| All sources have valid URLs | Yes |
| No null required fields | Correct |
| Pricing format correct | USD, positive numbers |
| Dates format correct | ISO 8601 |

---

## 10. Performance Tests

| Metric | Target |
|--------|--------|
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |
| Interaction to Next Paint | <200ms |
| Cumulative Layout Shift | <0.1 |
| Total page weight | <500KB |
| JavaScript bundle | <150KB gzipped |

---

## 11. Accessibility Tests

| Test | Expected |
|------|----------|
| Keyboard navigation | All elements reachable |
| Focus visible | 2px solid outline |
| ARIA labels | All interactive elements labeled |
| Color contrast | WCAG 2.1 AA (4.5:1) |
| Screen reader | Content announced correctly |
| Skip navigation | Link at top of page |

---

## 12. Build Tests

| Test | Expected |
|------|----------|
| `npm run build` | Completes without errors |
| `npm run dev` | Starts without errors |
| All pages generate | No 500 errors |
| Static generation | All comparison pages pre-built |
| Dynamic routes | All slugs resolve |

---

## 13. Error Handling Tests

| Test | Expected |
|------|----------|
| Invalid product slug | 404 page shown |
| Missing product data | Graceful fallback |
| Network error | Error message shown |
| Same product comparison | Clear error message |
| Empty search | Helpful suggestions |

---

## 14. Tool Platform & Registry Tests (Phase 1+)

### 14.1 Registry / Architecture

| Test | Expected |
|------|----------|
| Registry file matches `TOOL-REGISTRY.md` fields | All required metadata present |
| `status: built` tools only | Routes exist; sitemap contains only these tools |
| `status: planned` tools | No live route (or stub per pipeline); not in sitemap |
| RelatedTools links | Resolve only to registered `tool_id`s; no broken links |
| Duplicate `type` + `purpose` check | Fails build/lint when two active tools collide |
| Tool landing thin-content check | H1, how-it-works, methodology, FAQ, related blocks present |
| Dynamic tool state HTML | `noindex` present; canonical → tool landing |
| Tools hub | Lists every `built` tool; links work |

### 14.2 Product Finder

| Test | Action | Expected |
|------|--------|----------|
| Wizard completes | Answer all required Qs | Shortlist 2–4 with reasons |
| Skip optional | Leave optional blank | Still completes; default disclosed |
| No match | Conflicting answers | Graceful broadened results + message |
| Hand-off | Click "Compare your top two" | Lands on comparison tool with entities pre-selected |
| Restart | Reset action | Answers cleared |
| Share URL | Copy result URL | Restores state or lands correctly; noindex |

### 14.3 Compatibility Checker

| Test | Action | Expected |
|------|--------|----------|
| Known pair | Select verified compatible pair | Yes + reason + sources + date |
| Known incompatible | Select incompatible pair | No + reason |
| Partial | Pair with caveats | Partial + caveats shown |
| Unverified pair | Valid but no relation | "Not verified" (never guessed) |
| Unsupported domain | Pair outside relation types | Clear "not supported" message |

### 14.4 Upgrade Calculator

| Test | Action | Expected |
|------|--------|----------|
| Defaults | Accept all defaults | Totals compute; assumptions labeled + dated |
| Custom inputs | Change price/date/usage | Totals update; validation errors in-range |
| Future date | Enter future purchase date | Blocked with message |
| Extreme values | Above max input | Clamp or warn |
| Disclaimer | View result | Interpretation present; no advice claims |
| Hand-off | Compare replacements | Opens comparison tool |

### 14.5 Cross-tool linking

| Test | Expected |
|------|----------|
| Loop paths in `INTERNAL-LINKING-PLAN.md` | Present on live pages |
| Orphan tool check | Every built tool linked from hub + ≥1 content page |
| Sitemap vs registry | Set equality for tools |

---

## 15. Regression Gates (every release)

| Test | Expected |
|------|----------|
| `tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npx next build --webpack` | Pass; page count matches expectations |
| Route smoke (200/308/404 matrix) | Pass |
| Data integrity script | 0 errors |
| Sitemap contains no dynamic tool states | Pass |
| Homepage/tool title positioning | Platform wording, not phone-only brand lock where specified |

---

*This plan defines all acceptance tests for CompareForge. Sections 1–13 cover the shipped comparison MVP; sections 14–15 cover the tool platform. Execute before launch and after any major change.*
