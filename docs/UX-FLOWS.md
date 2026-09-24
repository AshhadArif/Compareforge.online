# UX Flows Specification

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Implementation-Ready

---

## 1. Overview

This document defines the complete user experience flows for CompareForge.

---

## 2. Flow 1: Comparison from Homepage

```
User arrives at homepage
        ↓
Sees hero with comparison tool input
        ↓
Types "iPhone 18" in Product A field
        ↓
Autocomplete shows: iPhone 18 Pro Max, iPhone 18 Pro, iPhone 18
        ↓
Selects "iPhone 18 Pro Max"
        ↓
Types "Galaxy S26" in Product B field
        ↓
Autocomplete shows: Galaxy S26 Ultra, Galaxy S26
        ↓
Selects "Galaxy S26 Ultra"
        ↓
Clicks [Compare Now]
        ↓
Redirects to /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
        ↓
Sees full comparison result
```

---

## 3. Flow 2: Comparison from Comparison Hub

```
User arrives at /compare/
        ↓
Sees list of curated comparisons
        ↓
Clicks "iPhone 18 Pro Max vs Galaxy S26 Ultra"
        ↓
Redirects to comparison page
        ↓
Sees full comparison result
```

---

## 4. Flow 3: Product Research

```
User arrives at /products/
        ↓
Sees product grid with filters
        ↓
Filters by "Samsung" brand
        ↓
Sees Samsung phones
        ↓
Clicks "Galaxy S26 Ultra"
        ↓
Redirects to /products/samsung-galaxy-s26-ultra/
        ↓
Sees product details, specifications, comparisons
        ↓
Clicks "Compare with iPhone 18 Pro Max"
        ↓
Redirects to comparison page
```

---

## 5. Flow 4: Guide Discovery

```
User arrives at /guides/
        ↓
Sees list of guides
        ↓
Clicks "Foldable Phone Buying Guide 2026"
        ↓
Redirects to guide page
        ↓
Reads guide content
        ↓
Clicks "See foldable phones compared"
        ↓
Redirects to /compare/best-foldable-phones-2026/
```

---

## 6. Flow 5: Mobile Comparison

```
User arrives at comparison page on mobile
        ↓
Sees H1 and introduction
        ↓
Scrolls to comparison cards (stacked)
        ↓
Sees iPhone 18 Pro Max card
        ↓
Sees Galaxy S26 Ultra card
        ↓
Taps "Show Differences Only"
        ↓
Cards update to show only different specs
        ↓
Scrolls to Key Differences section
        ↓
Reads practical implications
        ↓
Taps "Related Comparisons"
        ↓
Navigates to related comparison
```

---

## 7. Flow 6: Tool-Only Comparison

```
User arrives at /tools/phone-comparison/
        ↓
Sees empty comparison tool
        ↓
Selects Product A: "OnePlus 15"
        ↓
Selects Product B: "Pixel 10a"
        ↓
Clicks [Compare]
        ↓
URL updates to /compare/oneplus-15-vs-google-pixel-10a/
        ↓
Sees comparison result (tool-generated, not curated)
        ↓
Page has noindex (not in sitemap)
        ↓
Still fully functional for user
```

---

## 8. Flow 7: Search for Specific Comparison

```
User searches Google: "iphone 18 pro max vs galaxy s26 ultra"
        ↓
Clicks CompareForge result
        ↓
Lands on /compare/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra/
        ↓
Sees pre-populated comparison
        ↓
Can change products using selector
        ↓
Can toggle "Show Differences Only"
        ↓
Can explore detailed specs
        ↓
Can see related comparisons
```

---

## 9. Flow 8: Error Reporting

```
User notices incorrect data
        ↓
Scrolls to footer
        ↓
Clicks "Report an Error"
        ↓
Redirects to /report-an-error/
        ↓
Fills form:
  - URL of page with error
  - Type of error
  - Description
  - Email (optional)
        ↓
Clicks [Submit]
        ↓
Sees confirmation message
```

---

## 10. Flow 9: Product Not Found

```
User types "iPhone 19" in product selector
        ↓
Autocomplete shows: "No phones found matching 'iPhone 19'"
        ↓
Shows suggestion: "iPhone 19 is not yet in our database"
        ↓
Shows link: "Browse all Apple phones →"
        ↓
User can browse Apple products or try different search
```

---

## 11. Flow 10: Duplicate Selection Prevention

```
User selects Product A: "iPhone 18 Pro Max"
        ↓
User tries to select Product B: "iPhone 18 Pro Max"
        ↓
Autocomplete shows "iPhone 18 Pro Max" with "Already selected" badge
        ↓
User cannot select same product
        ↓
Tooltip: "Please select a different phone to compare"
```

---

## 12. Desktop Interaction Details

### Product Selector

- Click input → opens dropdown
- Type → filters results
- Arrow keys → navigate results
- Enter → select highlighted result
- Escape → close dropdown
- Click outside → close dropdown

### Comparison Table

- Sticky header (product names) after 64px scroll
- Sticky first column (spec labels) on wide tables
- Rows have hover state (subtle highlight)
- Toggle switch for "Show Differences Only"

### Internal Links

- Standard link navigation
- Breadcrumbs clickable
- Related comparisons as cards with hover state

---

## 13. Mobile Interaction Details

### Product Selector

- Full-width input
- Autocomplete overlay (full width)
- Touch to select
- X button to clear

### Comparison Cards

- Stacked vertically
- Each card shows product name + key specs
- Differences highlighted with color
- Swipe not required

### Navigation

- Hamburger menu for main navigation
- Back button to return
- Breadcrumbs truncated (Home > ... > Current)

---

## 14. Accessibility Flows

### Keyboard Navigation

```
Tab → Product A input
Tab → Product B input
Tab → Compare Now button
Tab → Show Differences Only toggle
Tab → Related comparison links
Tab → Footer links
```

### Screen Reader

```
"Phone Comparison Tool"
"Product A: Apple iPhone 18 Pro Max"
"Product B: Samsung Galaxy S26 Ultra"
"Comparison result: iPhone 18 Pro Max vs Galaxy S26 Ultra"
"Display: iPhone 18 Pro Max 6.9 inches, Galaxy S26 Ultra 6.9 inches"
"Key differences: Galaxy has 200MP camera vs iPhone 48MP"
```

---

## 15. Platform Tool Flows (multi-tool — planned, Phase 1/2)

These flows define the additional registered tools beyond the comparison engine. Implementation is deferred to the build phase; see `TOOL-REGISTRY.md` for status.

### Flow A: Product Finder (`decide`)

```
User arrives at /tools/product-finder/ (or guide CTA)
        ↓
Reads landing: what it does, how it works (static SEO block)
        ↓
Starts wizard: Q1..Q5–Q8 (use case, budget band, priorities)
        ↓
Each answer validated (required, in-range)
        ↓
Client scores entities (UseCaseProfile + tags + constraints)
        ↓
Result: ranked shortlist (2–4) with why-they-fit reasons
        ↓
CTA: "Compare your top two" → /tools/product-comparison/ pre-filled
        ↓
Related guides shown; URL shareable; state noindex
```

**Edge cases:** no entity meets constraints → relax messaging + broadest matches + "browse all"; user skips optional question → default weight disclosed; user restarts → clear answers.

### Flow B: Compatibility Checker (`match`)

```
User arrives at /tools/compatibility-checker/
        ↓
Selects side A (entity) and side B (entity or requirement)
        ↓
Validation: pair in supported relation domain? else "not supported yet"
        ↓
Lookup/evaluate Relation → verdict Yes / No / Partial / Not verified
        ↓
Result: verdict + plain-language reason + caveats + sources + date verified
        ↓
Links: entity pages, related tools; state noindex
```

**Edge cases:** missing relation → "Not verified" (never guessed); multiple regional variants → ask/show variant caveat; discontinued entity → show with badge, still resolvable.

### Flow C: Upgrade vs Keep Calculator (`calculate`)

```
User arrives at /tools/upgrade-calculator/
        ↓
Enters inputs (paid price/date, upgrade price, optional trade-in, usage)
        ↓
Validation: ranges, dates not in future, consistent units
        ↓
Assumptions panel visible (defaults labeled + date checked + source if any)
        ↓
Compute option totals (upgrade now vs keep) + difference
        ↓
Result: totals, difference, plain-language interpretation, disclaimer
        ↓
CTA: compare candidate upgrades → product-comparison; related guides
        ↓
State noindex; formulas documented in methodology
```

**Edge cases:** missing optional input → assumption applied and disclosed; extreme inputs → clamp/warn; never phrased as financial advice.

### Cross-tool loop (canonical)

```
Guide/Landing → Finder → shortlist → Comparison → result
                     ↘ Upgrade Calculator → comparison of replacements
Comparison (uncertain user) → Finder
Entity page → Compatibility Checker → Entity/Comparison
```

All cross-links follow `INTERNAL-LINKING-PLAN.md` registry rules.

---

## 16. Loading & Empty States (platform patterns)

| Tool | Empty | Loading | Error |
|------|-------|---------|-------|
| Finder | Explain questions + privacy (no account needed) | Skeleton per step | Retry step; preserve answers |
| Compatibility | Two clear selectors + examples | Spinner on lookup | "Couldn't verify — try another pair" |
| Calculator | Inputs + assumptions summary | Instant (client) | Highlight invalid fields |

Never show fabricated partial results while loading.

---

*This document defines all user experience flows for CompareForge. Flows 1–14 cover the comparison engine (built); Flow 15+ cover planned registry tools and are implementation-ready when those tools enter build.*
