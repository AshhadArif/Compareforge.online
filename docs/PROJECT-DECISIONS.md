# Project Decisions — CompareForge.online

This document records all major strategic decisions made during the project.

---

## Decision 1: Initial Category Selection

**Date:** September 2026

**Decision:** Start with smartphones as the initial product category.

**Reason:**
- High and consistent search demand for smartphone comparisons
- Clear comparison intent in search queries
- Rich specification data available from manufacturers
- Meaningful differences between products
- Opportunity for original analysis and use-case guidance
- Reasonable product lifecycle (12-18 months)
- Advertiser interest in smartphone content
- Sufficient content depth for detailed comparisons

**Alternatives considered:**
- Laptops: Too many variants, complex configuration options, longer research cycle
- Headphones: Lower price points, less specification complexity, fewer meaningful comparisons
- Cameras: Highly specialized, niche audience, complex feature set
- TVs: Large specification sets but fewer meaningful comparison scenarios
- Home appliances: Lower search volume for comparisons, less commercial intent

**Why rejected:**
- Laptops: Complexity makes initial comparisons harder to execute well
- Headphones: Less opportunity for deep specification comparison
- Cameras: Too niche for initial category
- TVs: Less search demand for direct comparisons
- Appliances: Lower commercial intent

**Impact:**
- Initial content focuses on smartphone comparisons
- Site structure designed for smartphone category first
- Guides focused on smartphone features and buying
- Expansion to other categories after smartphone content is established

---

## Decision 2: No Fabricated Testing Claims

**Date:** September 2026

**Decision:** Never claim to have tested products unless actual testing was conducted.

**Reason:**
- Maintain editorial integrity
- Avoid misleading users
- Comply with Google AdSense policies against deceptive content
- Build long-term trust
- Avoid legal risks from false claims

**Alternatives considered:**
- Write as if we tested products (common in affiliate sites)
- Use vague language to imply testing
- Partner with reviewers for hands-on content

**Why rejected:**
- Writing as if we tested products is dishonest
- Vague language is still misleading
- Partnerships require resources not available in MVP

**Impact:**
- All comparison content based on sourced specifications and independent reviews
- Language uses evidence-based phrasing
- Content explains what specifications mean without claiming hands-on experience
- Sets editorial tone for the entire site

---

## Decision 3: No Fake Ratings or Reviews

**Date:** September 2026

**Decision:** Never fabricate star ratings, review counts, or user satisfaction scores.

**Reason:**
- Fake ratings are deceptive
- Google AdSense policies prohibit misleading content
- Users deserve accurate information
- Fabricated ratings undermine trust

**Alternatives considered:**
- Aggregate ratings from public sources
- Display manufacturer-provided ratings
- Create internal rating systems

**Why rejected:**
- Aggregating ratings without proper licensing may violate terms
- Manufacturer ratings are marketing, not independent assessment
- Internal rating systems require testing methodology we don't have

**Impact:**
- No star ratings on comparison pages in MVP
- If ratings are added later, they must come from verifiable public sources
- Content focuses on specification comparison rather than subjective ratings

---

## Decision 4: Small, Focused MVP

**Date:** September 2026

**Decision:** Start with 5-8 comparison pages, 1 category, and 2 guides for the MVP.

**Reason:**
- Quality over quantity
- Easier to maintain high standards with fewer pages
- Allows thorough review of each page
- Sets precedent for content quality
- Reduces risk of thin content
- Aligns with Google's scaled content abuse guidance

**Alternatives considered:**
- Start with 50+ pages covering multiple categories
- Start with 20+ pages in one category
- Start with a product directory structure

**Why rejected:**
- 50+ pages cannot be thoroughly reviewed and quality-checked
- 20+ pages in one category is still too many for initial launch
- Product directory structure encourages thin pages

**Impact:**
- Launch with focused, high-quality content
- Expand only after initial content is proven
- Sets quality standard for all future content
- Reduces development and content creation time for MVP

---

## Decision 5: No Affiliate Links in MVP

**Date:** September 2026

**Decision:** Do not include affiliate links in the MVP version of the site.

**Reason:**
- Eliminates conflict of interest during content creation
- Focuses content on user value, not commission
- Simplifies legal and disclosure requirements
- Avoids potential AdSense policy issues with mixed monetization
- Sets precedent for editorial independence

**Alternatives considered:**
- Include affiliate links from the start
- Use affiliate links with clear disclosure
- Use affiliate links only in certain sections

**Why rejected:**
- Affiliate links from the start may influence content priorities
- Disclosure is additional complexity for MVP
- AdSense and affiliate together requires careful policy compliance

**Impact:**
- MVP content is purely editorial
- Affiliate links may be added later with proper disclosure
- Editorial independence established as a core value
- Simplifies initial legal requirements

---

## Decision 6: Comparison Page Structure

**Date:** September 2026

**Decision:** Use a standardized comparison page structure with introduction, quick comparison, key differences, detailed comparison, specifications, use-case analysis, advantages/disadvantages, methodology, FAQ, and related content.

**Reason:**
- Provides consistent user experience
- Ensures all comparisons include essential elements
- Supports SEO with clear heading hierarchy
- Includes methodology section for transparency
- Includes use-case analysis for practical value

**Alternatives considered:**
- Free-form comparison pages with no template
- Simple specification listing format
- Listicle-style "top 10" format

**Why rejected:**
- Free-form pages may miss important elements
- Specification listing adds no original value
- Listicle format doesn't help users compare specific products

**Impact:**
- All comparisons follow a predictable structure
- Users know what to expect on each page
- Content quality is easier to maintain
- Template can be adapted based on specific comparison needs

---

## Decision 7: Source Documentation Requirement

**Date:** September 2026

**Decision:** Every comparison must include a methodology/sources section documenting where information comes from.

**Reason:**
- Transparency builds trust
- Allows users to verify information
- Supports editorial accountability
- Complies with Google's original content guidance
- Differentiates from sites that copy without sourcing

**Alternatives considered:**
- No source documentation
- Sources only where controversy exists
- Inline citations only

**Why rejected:**
- No sources makes claims unverifiable
- Selective sourcing is inconsistent
- Inline only may not provide enough context

**Impact:**
- All comparisons include source documentation
- Content is more credible
- Users can verify information independently
- Sets standard for editorial transparency

---

## Decision 8: No Price Comparison

**Date:** September 2026

**Decision:** Do not implement real-time price comparison in the MVP.

**Reason:**
- Prices change too quickly to maintain accurately
- Real-time price data requires API integrations
- Price comparison is a different product category
- Editorial comparison is more valuable than price aggregation
- Price data accuracy is hard to verify

**Alternatives considered:**
- Real-time price comparison with API integration
- Static price ranges checked periodically
- Links to retailers without price display

**Why rejected:**
- API integrations add complexity and potential failure points
- Static prices become outdated quickly
- Links without prices still require maintenance

**Impact:**
- MVP focuses on feature and specification comparison
- Prices may be mentioned generally (e.g., "similar price range") without specific numbers
- Price comparison may be added later if data sources are reliable
- Content remains valuable even without price information

---

## Decision 9: Mobile-First Design

**Date:** September 2026

**Decision:** Design for mobile first, then enhance for desktop.

**Reason:**
- Majority of comparison searches happen on mobile
- Google uses mobile-first indexing
- Responsive design is required for AdSense
- Mobile-first ensures core content works on all devices

**Alternatives considered:**
- Desktop-first design
- Separate mobile and desktop versions
- App-based approach

**Why rejected:**
- Desktop-first may not work well on mobile
- Separate versions are harder to maintain
- App-based is not suitable for comparison content

**Impact:**
- All layouts designed for mobile first
- Comparison tables are responsive
- Navigation works on touch devices
- Performance optimized for mobile networks

---

## Decision 10: No Programmatic Page Generation

**Date:** September 2026

**Decision:** Do not programmatically generate comparison pages from product databases without editorial review.

**Reason:**
- Prevents thin, low-value pages
- Ensures each page has genuine purpose
- Complies with Google's scaled content abuse policy
- Maintains quality standards
- Prevents duplicate content issues

**Alternatives considered:**
- Generate pages programmatically from product databases
- Use templates with product name substitution
- Auto-generate from API data

**Why rejected:**
- Programmatic generation produces thin content
- Template substitution creates near-duplicate pages
- Auto-generation without review violates content quality standards

**Impact:**
- Every page is editorially reviewed before publication
- Pages are created for specific, justified comparisons
- Content quality is maintained
- Risk of scaled content abuse is eliminated

---

## Decision 11: Interactive Comparison Engine

**Date:** September 2026

**Decision:** Transform CompareForge from a static comparison article website into an interactive product comparison platform with a comparison engine as the core product.

**Reason:**
- Static comparison articles provide no unique value over AI chatbots
- Interactive comparison tools provide genuine user utility
- Comparison engines have proven market fit (GSMArena, PhoneArena)
- Interactive tools increase user engagement and return visits
- Structured data enables programmatic comparison generation
- SEO landing pages can drive traffic into the interactive tool

**Alternatives considered:**
- Continue as static comparison article site
- Build only a product database without interactive tools
- Build a review site with hands-on testing

**Why rejected:**
- Static articles don't justify visiting CompareForge over AI
- Product database without tools is just a reference, not a product
- Review site requires resources and testing infrastructure not available

**Impact:**
- Core product is the comparison engine, not articles
- SEO pages bring users into the tool
- Product database is the foundation
- Interactive experience is the differentiator

---

## Decision 12: Curated Comparison Pages Only

**Date:** September 2026

**Decision:** Only create indexable comparison pages for pairs with demonstrated search demand. The interactive tool can compare any products, but not every combination becomes an indexable URL.

**Reason:**
- Prevents index bloat from thousands of thin comparison pages
- Complies with Google's scaled content abuse guidance
- Focuses SEO effort on high-value pages
- Each indexable page must have unique content and clear purpose
- Tool-generated comparisons still work, just not indexed

**Alternatives considered:**
- Index all possible product combinations
- Generate comparison pages programmatically
- Use canonical URLs for all combinations

**Why rejected:**
- Indexing all combinations creates thousands of thin pages
- Programmatic generation without editorial review is scaled content abuse
- Canonical URLs still create crawl burden

**Impact:**
- Only 10 curated comparisons in MVP
- Interactive tool supports any product pair
- Non-indexed comparisons still functional for users
- SEO focused on high-value pages

---

## Decision 13: Product Database as Foundation

**Date:** September 2026

**Decision:** Build a structured product database (JSON files) as the foundation for all comparison and product pages.

**Reason:**
- Structured data enables consistent comparison generation
- JSON files are simple, versionable, and不需要 database server
- Build-time generation ensures fast page loads
- Data can be verified and sourced at the field level
- Easy to update and maintain

**Alternatives considered:**
- Use a database (PostgreSQL, MongoDB)
- Store data in page components
- Use a headless CMS

**Why rejected:**
- Database adds infrastructure complexity
- Page-embedded data is hard to maintain
- Headless CMS adds cost and dependency

**Impact:**
- All product data in `/src/data/smartphones/`
- All comparison data in `/src/data/comparisons/`
- Build-time generation from JSON
- Simple, maintainable architecture

---

## Decision 14: Price as MSRP Only

**Date:** September 2026

**Decision:** Show MSRP (manufacturer suggested retail price) only. Do not track real-time pricing from retailers.

**Reason:**
- MSRP is stable and verifiable from manufacturer
- Real-time pricing requires API integrations and constant maintenance
- Prices vary by region, retailer, and time
- MSRP is sufficient for comparison purposes
- Avoids potential advertising issues with price claims

**Alternatives considered:**
- Real-time price tracking from retailers
- Price ranges from multiple sources
- Affiliate-linked pricing

**Why rejected:**
- Real-time tracking is maintenance-heavy
- Price ranges are vague
- Affiliate links add complexity and potential bias

**Impact:**
- All prices shown as "From $X,XXX"
- Prices marked as MSRP
- Users directed to retailers for current pricing
- Simple, verifiable pricing data

---

## Decision 15: No User-Generated Content

**Date:** September 2026

**Decision:** No user reviews, ratings, comments, or other user-generated content in MVP.

**Reason:**
- Prevents fake reviews and spam
- Simplifies moderation requirements
- Avoids potential legal issues
- Focuses on verified, sourced data
- Reduces maintenance burden

**Alternatives considered:**
- User reviews with moderation
- User ratings
- Comments on comparisons

**Why rejected:**
- Moderation requires resources
- Fake reviews undermine trust
- Comments require ongoing moderation

**Impact:**
- All content editorially created
- Error reporting via form (not comments)
- Clean, controlled content quality
- Simple maintenance model

---

## Decision 16: Repositioning — Comparison & Decision-Tools Platform

**Date:** September 2026

**Decision:** Reposition CompareForge from a phone-comparison site to an **interactive comparison and decision-tools platform**. The tool is the product; content/SEO supports tools. Smartphones remain the first category instance, not the site identity.

**Reason:**
- Static comparison pages alone are weakly differentiated from AI answers and manufacturer pages
- A tool-first loop (search → landing → tool → result → explanation → related tools/guides) creates durable utility
- Platform positioning avoids locking the domain to one category's lifecycle
- Multi-tool architecture allows distinct user jobs (compare, decide, match, calculate) under one brand

**Alternatives considered:**
- Stay phone-comparison-only
- Stay article-led with interactive features as add-ons
- Launch as a general-tools site (many unrelated utilities)

**Why rejected:**
- Phone-only locks brand, titles, and expansion
- Article-led fails the "why visit here?" test versus AI/affiliates
- General-tools becomes random, unfocused, and AdSense-risky

**Impact:**
- Homepage, titles, nav, and docs updated to platform positioning
- Tool registry, ToolShell, and generic data model become architectural requirements
- Build work deferred until a dedicated BUILD PROMPT (strategy/architecture phase only)

---

## Decision 17: Tool Families & Site Boundary

**Date:** September 2026

**Decision:** Adopt four canonical tool types — `compare`, `decide`, `match`, `calculate`. A tool qualifies only if its primary output helps users compare, evaluate, calculate, match, filter, or understand differences between **≥2 comparable options** (or two states of one option). Exclude generators, standalone converters, weather, novelty, and generic single-purpose calculators.

**Reason:**
- Keeps the site coherent ("decision tools") rather than a random utility grab bag
- Boundary test is enforceable at registry review
- Research (tool families A–H) showed "spec comparison" duplicates `compare`, and "specialized engines" are instances of other types — avoids SEO-churn variants

**Impact:**
- `TOOL-CATEGORY-STRATEGY.md` boundary test (5 parts) required for every candidate tool
- Duplicate `type` + `purpose` entries forbidden
- Backlog ideas (plan comparison, visual comparison) stay gated

---

## Decision 18: Initial Tool Portfolio

**Date:** September 2026

**Decision:** Build/ship tools in this order: (1) `product-comparison`, (2) `product-finder`, (3) `compatibility-checker`, (4) `upgrade-calculator`. Selection weighted by user value, intent quality, data readiness, feasibility/reuse, expansion leverage, maintenance, authority, AdSense suitability, and internal-linking value — **not SEO volume alone**.

**Reason:**
- Comparison already exists (engine + data) and is the loop's hub
- Finder solves the upstream "I don't know what to compare" problem on the same data, proving a second tool type
- Compatibility is a distinct problem shape (verdict) exercising the relation model
- Upgrade calculator is logic-heavy, data-light, compares two states (fits boundary)

**Alternatives considered:**
- Ship many tools at once
- Prioritize tools purely by keyword volume
- Start with plan/service comparison

**Why rejected:**
- Many tools at once spreads quality and violates small-MVP discipline (Decision 4)
- Volume-only selection ignores data/maintenance/fit
- Plan comparison conflicts with MSRP-only pricing rules (Decisions 8/14) until stable tier data exists

**Impact:**
- `TOOL-REGISTRY.md` entries and phase gates in `EXPANSION-ROADMAP.md`
- Phase 1 = comparison generalization + finder; Phase 2 = compatibility + calculator

---

## Decision 19: Tool Registry as Single Source of Truth

**Date:** September 2026

**Decision:** Every tool must be declared in `TOOL-REGISTRY.md` with full metadata (type, purpose, route, inputs/outputs, data requirements, related links, status, version). Routes, sitemap tool entries, and RelatedTools links resolve only through the registry.

**Reason:**
- Prevents ad hoc tools and orphan pages
- Enforces purpose uniqueness (anti-duplicate rule)
- Keeps sitemap aligned with `status: built`
- Makes retirement explicit

**Impact:**
- Machine-readable registry mirror in data layer at build time
- Incomplete entries fail validation when implemented
- Docs updated whenever a tool changes

---

## Decision 20: Generic Data Model with Category Modules

**Date:** September 2026

**Decision:** Define a category-agnostic core (Entity, AttributeValue, AttributeDefinition, Source, Relation, UseCaseProfile, PriceInfo, CalculationDefinition) in `DATA-MODEL.md`. Category-specific fields live in attribute modules (smartphone specs = first module; `PRODUCT-DATA-MODEL.md` remains the smartphone profile).

**Reason:**
- Enables multiple tools and future categories without forking models
- Avoids one giant hard-coded spec table
- Preserves existing sourcing, missing-data, and pricing honesty rules

**Impact:**
- Future build adapters load existing smartphone JSON behind the generic interfaces (no migration in strategy phase)
- Tools declare consumed modules via registry `dataRequirements`

---

## Decision 21: Two-Layer SEO Model (Landing vs Dynamic State)

**Date:** September 2026

**Decision:** Index only static, editorially justified pages: tool landings, hubs, curated comparisons, entities, guides. All dynamic tool states (selector/wizard/calculator outputs) are `noindex` and excluded from the sitemap; canonical to the tool landing. Curated indexable pages are created only via editorial process with demonstrated demand.

**Reason:**
- Prevents index bloat and scaled-content/doorway issues (Decisions 10/12; AdSense)
- Tool landings carry unique value (methodology, FAQ) — not thin stubs
- Matches the platform architecture (static shell, client interactivity)

**Impact:**
- `URL-ARCHITECTURE.md` + `SEO-ARCHITECTURE.md` are canonical (superseding phone-only maps with pointers left in place)
- Sitemap generated from registry `built` tools + curated/entities/guides/hubs

---

## Decision 22: Strategy/Architecture Phase Before Build

**Date:** September 2026

**Decision:** This phase produces strategy and documentation only — no frontend build, components, production routes, generated pages, product-DB expansion, or hard-coded phone data changes — until the multi-tool architecture is accepted and a separate BUILD PROMPT is issued.

**Reason:**
- Locks positioning, boundaries, registry, data model, URL/SEO, and phase gates before code
- Avoids rework and accidental scope creep during repositioning
- Existing verified phone implementation stays untouched until instructed

**Impact:**
- Deliverables: updated/created docs under `docs/` + this decision log + 27-point strategy summary
- Implementation resumes only with explicit build instructions