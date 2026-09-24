# Internal Linking Plan — CompareForge.online

## Purpose

A strong internal linking structure helps users navigate the site, discover relevant content, and understand the relationship between pages. It also helps search engines understand the site's structure and content relationships.

## Linking Principles

1. **Natural and contextual:** Links must make sense in context
2. **User-first:** Links should help the user, not just SEO
3. **Descriptive anchor text:** Link text should describe the destination
4. **No artificial patterns:** Avoid repetitive, keyword-heavy linking
5. **Bidirectional:** Content links to related content, and related content links back

---

## Page-Level Linking Rules

### Homepage

**Links to:**
- Category pages (all active categories)
- Featured comparisons (3-8 recent or popular)
- Featured guides (2-4 guides)
- About, Contact, and legal pages (via footer)

### Comparison Pages

**Links to:**
- Category page (the comparison's category)
- Related comparisons (2-4 within the same category or related)
- Related guides (1-2 relevant guides)
- Breadcrumbs (navigational)

**Receives links from:**
- Category page
- Other comparison pages (as "related comparison")
- Guide pages (where relevant)
- Homepage (if featured)

### Category Pages

**Links to:**
- All comparisons within the category
- Related categories (if applicable)
- Relevant guides
- Breadcrumbs (navigational)

**Receives links from:**
- Homepage
- Comparison pages (within the category)
- Other category pages (if related)

### Product Pages

**Links to:**
- All comparisons involving this product
- Related products (same brand, similar price)
- Relevant guides
- Breadcrumbs (navigational)

**Receives links from:**
- Comparison pages (product links)
- Product hub page
- Other product pages (related products)
- Guide pages (where product is mentioned)

### Guide Pages

**Links to:**
- Relevant comparisons (2-4)
- Products mentioned
- Related guides (1-2)
- Relevant category pages
- Breadcrumbs (navigational)

**Receives links from:**
- Homepage (if featured)
- Comparison pages (as "related guide")
- Other guide pages (as "related guide")
- Product pages (where guide is relevant)

### Tool Landing Page

**Links to:**
- How-it-works / methodology (in-page anchors)
- Related tools (registry `relatedTools` only — no hand-wired cross-links)
- Related guides (1-3 supporting the tool's job)
- Popular curated comparisons (for compare-type tools)
- Breadcrumbs (navigational)

**Receives links from:**
- Homepage (tools section / tool input)
- Tools hub (`/tools/`)
- Other tool landings (registry-related)
- Curated comparison pages ("compare any other pair")
- Guides whose primary tool is this tool
- Category/entity pages where the tool is the natural next step
- Footer (tools section)

### Tool Result / Dynamic State

Dynamic states are **noindex** and do not need inbound SEO links. In-session linking still applies:

- Result → RelatedTools, RelatedGuides, SourcePanel, methodology anchors
- Result → curated compare page when one exists for the shown pair
- Result → entity pages for each side of the decision

---

## Cross-Tool Linking Rules (platform)

1. **Registry-driven only:** every tool↔tool link resolves through `relatedTools` in `TOOL-REGISTRY.md`.
2. **Loop-preserving paths (required):**
   - `product-finder` result → `product-comparison` ("Compare your top two")
   - `upgrade-calculator` result → `product-comparison` ("Compare replacement options")
   - `compatibility-checker` result → entity pages → `product-comparison`
   - `product-comparison` result → `product-finder` ("Not sure what to compare?") and `upgrade-calculator` where relevant
3. **One primary guide→tool mapping** per guide; guides may mention a second tool only when genuinely useful.
4. **No random cross-links** between unrelated tools or categories (boundary: same category or registry-declared relationship).
5. **Anchor text** describes the tool's job ("open the Product Finder"), not keyword stuffing.

---

### About / Contact / Legal Pages

**Links to:**
- Homepage
- Main content sections (comparisons, categories, guides)

**Receives links from:**
- Footer (all pages)
- Homepage

---

## Anchor Text Guidelines

### Good Anchor Text

- "iPhone 18 Pro Max vs Galaxy S26 Ultra" (for a comparison page)
- "Smartphone comparisons" (for a category page)
- "Foldable Phone Buying Guide 2026" (for a guide page)
- "AI Features Explained" (for a guide page)

### Bad Anchor Text

- "Click here"
- "This comparison"
- "Read more"
- "Best smartphone 2026" (keyword-stuffed)
- "Top phone comparison" (keyword-stuffed)

### Rules

- Anchor text should describe the destination page
- Use the destination page's topic as anchor text
- Do not use the same anchor text for different destinations
- Do not over-optimize anchor text with keywords

---

## Link Density

### Guidelines

- Each comparison page: 3-8 internal links (related comparisons, guides, category)
- Each guide page: 3-6 internal links (comparisons, related guides)
- Each category page: all comparisons in the category + related guides
- Homepage: all categories + featured content

### Rules

- Do not overload pages with links
- Links must be contextually relevant
- Do not add links just to increase link count
- Every link must provide value to the user

---

## Orphan Page Prevention

### Rule

Every page must be reachable within 3 clicks from the homepage.

### Implementation

- Homepage links to categories and featured content
- Categories link to all comparisons in the category
- Comparisons link to related comparisons and guides
- Guides link to relevant comparisons
- All pages linked from footer (legal, about, contact)

### Verification

- Regularly audit for orphan pages
- Ensure sitemap includes all indexable pages
- Check that all pages are linked from at least one other page

---

## Category Linking Structure

### Within a Category

```
Category Page
    → Comparison A
    → Comparison B
    → Comparison C
    → Guide X

Comparison A
    → Category Page
    → Comparison B (related)
    → Comparison C (related)
    → Guide X (related)

Guide X
    → Category Page
    → Comparison A (relevant)
    → Comparison B (relevant)
```

### Cross-Category Linking

Only link across categories when genuinely relevant:
- "If you're also interested in [related category], see [comparison]"

Do NOT link randomly across unrelated categories.

---

## Product-to-Comparison Linking

### Rules

- Each product page links to ALL comparisons involving that product
- Comparisons listed by recency or relevance
- Include both head-to-head and roundup comparisons

### Good Example

Product: "Apple iPhone 18 Pro Max"
Links to:
- "iPhone 18 Pro Max vs Galaxy S26 Ultra" (head-to-head)
- "iPhone 18 Pro Max vs Pixel 11 Pro XL" (head-to-head)
- "Best Flagship Phones 2026" (roundup)
- "Apple Intelligence vs Galaxy AI vs Gemini" (feature comparison)

---

## Comparison-to-Comparison Linking

### Rules

- Each comparison links to 2-4 related comparisons
- Related comparisons should be:
  - In the same category
  - Comparing one of the same products
  - Relevant to the user's likely next question

### Good Examples

- "iPhone 18 Pro Max vs Galaxy S26 Ultra" links to:
  - "iPhone 18 Pro Max vs Pixel 11 Pro XL" (same product, different competitor)
  - "Galaxy S26 Ultra vs Pixel 11 Pro XL" (same category)
  - "Best Flagship Phones 2026" (roundup)
  - "Apple Intelligence vs Galaxy AI vs Gemini" (related topic)

### Bad Examples

- "iPhone 18 Pro Max vs Galaxy S26 Ultra" links to:
  - "Best laptops 2026" (unrelated category)
  - "iPhone 18 Pro Max vs iPhone 17" (too similar, may confuse users)
  - Random unrelated comparison

---

## Guide-to-Comparison Linking

### Rules

- Guides link to comparisons that illustrate the guide's points
- Links should be contextually relevant
- Do not force links where they don't belong

### Good Example

Guide: "What is OLED?"
Links to:
- "iPhone 15 vs Samsung Galaxy S24" (both use OLED)
- "Budget Smartphone Comparison" (some use LCD, some OLED)

### Bad Example

Guide: "What is OLED?"
Links to:
- "Best wireless earbuds" (unrelated)

---

## Breadcrumb Linking

### Implementation

- Every page except homepage has breadcrumbs
- Breadcrumbs are navigational links
- Current page is not a link

### Format

```
Home > Comparisons > Smartphones > iPhone 15 vs Samsung Galaxy S24
```

### Rules

- Breadcrumbs match URL structure
- Each level is a clickable link
- Current page is displayed but not linked

---

## Footer Linking

### Links Present on Every Page (via footer)

- Home
- Comparisons
- Categories
- Guides
- About
- Contact
- Privacy Policy
- Terms of Service
- Cookie Policy
- Disclaimer
- Report an Error

### Rules

- Footer links are consistent across all pages
- Footer links provide fallback navigation
- Do not overload footer with links
- Keep footer clean and organized

---

## Link Maintenance

### Regular Checks

- Monthly: Check for broken internal links
- When pages are added: Ensure proper cross-linking
- When pages are removed: Update all links pointing to removed pages
- When URLs change: Implement redirects and update internal links

### Redirect Rules

- When a page URL changes, implement a 301 redirect
- Update all internal links to point to the new URL
- Do not leave broken links after URL changes