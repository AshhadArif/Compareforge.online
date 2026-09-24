# Product Requirements Document — CompareForge.online

## Product

CompareForge.online is an **interactive comparison and decision-tools platform**. It helps users make informed decisions through runnable tools: comparing options side by side, finding products that fit their needs, checking compatibility, and weighing choices with clear calculations — backed by structured, evidence-based data and plain-language explanations.

**The tool is the product.** Content (guides, curated comparison pages, category pages) exists to bring users into tools, explain results, and connect related decisions. Phones/smartphones are the first **category the platform serves**, not the site's identity.

CompareForge is NOT a store, a review aggregation site, a generic product directory, or a random collection of utilities. It is a tool-first decision platform.

### Core user loop

```
SEARCH → LANDING PAGE → TOOL → INPUT → RESULT → EXPLANATION
       → RELATED TOOLS → GUIDES → (back to tools)
```

## Problem

People making decisions between options face recurring difficulties:

- Specifications and facts are scattered across manufacturer sites, retailers, and forums
- Many comparison sources are thin affiliate pages designed to drive clicks, not inform
- Users struggle to understand what specifications and differences actually mean in practice
- Feature differences are buried in marketing language
- It is hard to know which characteristics matter for a specific use case
- Some questions are not "A vs B tables" at all: *Which one fits me? Does X work with Y? Should I upgrade?*
- Conflicting information across sources creates confusion
- Time spent researching is wasted when comparisons lack depth or originality

CompareForge solves this with interactive tools that structure the decision, explain results in plain language, and cite sources — instead of another static article.

## Target Users

- People actively deciding between two or more options before a purchase
- Buyers who do not yet know which options to consider (need a finder, not a table)
- Users verifying whether two things work together (compatibility)
- People weighing whether to keep, replace, or upgrade what they already own
- Anyone who wants feature-by-feature or criteria-by-criteria comparison without marketing spin

No invented demographics. No assumed age ranges or income brackets. The audience is anyone who needs to compare, choose, or verify compatibility.

## Primary User Journeys

### Journey 1: Direct Comparison (tool-first)

```
Google search ("X vs Y" / "compare …")
    → Landing page (curated compare page OR tool landing)
    → Run comparison tool (select options)
    → Structured result: table, key differences, explanation, sources
    → Related tools / related guides
```

### Journey 2: Discovery → Decision (finder)

```
Google search ("which … / best … for …") or homepage
    → Guide or Product Finder landing
    → Answer questions
    → Shortlist with reasons
    → Compare top candidates in comparison tool
```

### Journey 3: Verification (compatibility)

```
Search ("does X work with Y")
    → Compatibility Checker landing
    → Select both sides
    → Verdict + reason + caveats + sources
    → Related entity pages / comparison tool
```

### Journey 4: Trade-off Calculation

```
Search ("should I upgrade / is it worth it")
    → Upgrade Calculator landing
    → Enter personal numbers
    → Computed comparison of options + explanation of assumptions
    → Comparison tool for candidate replacements
```

### Journey 5: Hub / Homepage Discovery

```
Direct visit → Homepage or /tools/ hub → Pick a tool → Follow a tool journey
```

## Core Features (MVP / Phase 1 platform scope)

### Tools (registry-driven)

- **Product Comparison Tool** — select 2–4 options; side-by-side table; differences-only view; practical interpretation; sources
- **Product Finder** — guided questions; ranked shortlist with reasons; hand-off to comparison tool
- Tool landing pages under `/tools/[tool]/` with how-it-works, methodology, FAQ, related tools/guides
- Tools hub at `/tools/`
- Tool registry as single source of truth for routes and related-tool links

### Supporting content

- Curated comparison pages for pairs with demonstrated demand (editorial, not mass-generated)
- Category/entity pages for structured data browsing
- Guides that explain specifications and decisions, each supporting a live tool
- Homepage communicating the platform (tools-first)

### Site infrastructure (unchanged)

- Search, breadcrumbs, About, Contact, Privacy, Terms, Cookie Policy, Disclaimer, Corrections, 404, sitemap, robots

### Technical

- Static-first (SSG) landing/content pages; client-side interactivity
- Responsive, fast, accessible, SEO-correct structure (two-layer indexation model)
- Structured data per page type (no fake ratings/reviews)

## Future Features (Post-Phase-1)

- Compatibility Checker (`match` type) — Phase 2
- Upgrade vs Keep Calculator (`calculate` type) — Phase 2
- Additional category instances of core tools (after expansion gates)
- Visual/plan comparison tools — only if they pass boundary + data gates
- User accounts / saved results, newsletter, RSS — only with proven need
- Affiliate links with disclosure (editorial firewall required)
- Multi-category entity browsing

These are explicitly NOT part of Phase 1 and should not be built until the core platform is proven (`EXPANSION-ROADMAP.md`).

## Out of Scope

CompareForge should NOT become:

- An online store or marketplace
- A review aggregation site or UGC platform
- A product directory with thin pages for every product ever made
- A coupon or deal site
- A real-time price comparison engine (prices change too fast; see pricing decisions)
- A site that mass-generates pages for every keyword or tool-output combination
- A site that fabricates testing, ratings, or hands-on experience
- A site that recommends options based on affiliate commissions rather than evidence
- A content farm of low-value pages
- **A random general-tools site** (generators, converters, weather, novelty, single-purpose utilities that don't compare or evaluate ≥2 options)
- **A home for duplicate-purpose tool variants** built for SEO churn

Boundary and anti-goals: `TOOL-CATEGORY-STRATEGY.md`, `EXPANSION-ROADMAP.md`.

## Business Model

### Phase 1
No monetization. Priority is a useful, trustworthy platform with real tools and content.

### Future Monetization (when appropriate)

- **Google AdSense** on tool landings, curated pages, and guides (policy-compliant placement; tool usefulness independent of ads)
- **Affiliate partnerships** with disclosure; must not influence editorial or tool logic
- **Sponsored content** only if clearly labeled and editorially independent
- **Premium features** only if genuine user demand

Advertising and affiliate revenue support the site; they do not define it.

## Success Criteria

### Product Quality
- Every tool solves a real decision problem better than a static article or manufacturer page alone
- Results are explained in plain language, not just raw output
- Data is sourced; missing data is shown as missing, never invented
- Users can go from result → deeper research (related tools/guides) without dead ends

### Content Quality
- No page exists without a clear purpose and search intent
- No page is thin, duplicated, auto-generated without review, or a doorway page
- All claims evidence-based and sourced; original analysis required
- Guides and curated pages support tools rather than cannibalize them

### Technical Quality
- Fast, accessible, clear navigation; no broken links
- Sitemap matches registry (`built` tools + curated/indexable pages only)
- Dynamic tool states correctly noindexed
- SEO structure and structured data correct per page type

### User Value
- Users leave understanding something they did not know and with a clearer decision path
- Tools save time versus visiting multiple manufacturer sites
- Site feels trustworthy and professional

### NOT Success Criteria
- No promised rankings, traffic levels, or AdSense revenue
- Success is defined by quality, usefulness, and policy compliance — not volume