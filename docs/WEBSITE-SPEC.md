# Website Specification — CompareForge.online

## Site Purpose

CompareForge.online is an **interactive comparison and decision-tools platform**. The site helps users compare options, find products that fit their needs, check compatibility, and make trade-off decisions through interactive tools — supported by structured, evidence-based content (curated comparisons, guides, category pages). Smartphones are the first category served; the platform architecture is multi-tool and multi-category (see `TOOL-PLATFORM-ARCHITECTURE.md`, `TOOL-REGISTRY.md`).

## Site Structure

### Global Elements

#### Header
- CompareForge logo (text-based, clean)
- Primary navigation
- Search input

#### Primary Navigation
- Home
- Tools
- Comparisons
- Categories
- Guides
- About

#### Footer
- Site links (Home, Tools, About, Contact, Guides, Comparisons, Categories)
- Legal links (Privacy Policy, Terms, Cookie Policy, Disclaimer)
- Corrections/Report an Error
- Copyright notice
- "Last updated" date

### Page Types

#### Homepage (`/`)

**Purpose:** Communicate what CompareForge is, what users can do, and where to go.

**Structure:**
```
Header (global)

Hero section
  - Clear headline explaining the site purpose
  - Brief description of what users can find
  - Search bar or call to action

Featured Categories
  - 3-6 category cards with clear labels
  - Each links to category page

Popular/Recent Comparisons
  - 4-8 comparison cards
  - Each shows: Product A vs Product B, category tag
  - Each links to comparison page

How CompareForge Works
  - Brief explanation of the research process
  - What makes comparisons useful

Methodology/Trust Section
  - How information is gathered
  - Commitment to accuracy
  - No fake testing claims

Featured Guides
  - 2-4 guide cards
  - Each links to guide page

FAQ
  - 3-5 frequently asked questions about the site

Footer (global)
```

#### Tools Hub (`/tools/`)

**Purpose:** Index every built tool; communicate the platform's tool-first identity.

**Structure:**
```
Header (global)
Breadcrumbs: Home > Tools

H1: Comparison & Decision Tools
Brief description of what the platform does

Tool cards (from registry, status: built)
  - Each: tool name, one-sentence purpose, CTA "Open tool"
  - Optional: "coming soon" only if editorially wanted (not indexed stubs)

How CompareForge tools work (short trust/methodology blurb)

Related guides (supporting tools)

Footer (global)
```

#### Tool Landing (`/tools/[tool]/`)

**Purpose:** Indexable entry for one registered tool; useful even before the tool runs.

**Structure:**
```
Header (global)
Breadcrumbs: Home > Tools > [Tool Name]

H1: [Tool Name]
What it does + who it's for (unique content)
How it works (steps)

[ToolShell interactive body — client]
  Input stage → Validation → Result stage
  Result: type-specific panel + explanation + sources
  Related tools (registry) + related guides (in result & below)

Methodology / data sources (static, SEO)
FAQ (genuinely useful)

Footer (global)
```

**Rules:** dynamic tool states are noindex; one landing per registry `purpose`; no duplicate-purpose tool pages (see `SEO-ARCHITECTURE.md`, `TOOL-REGISTRY.md`).

#### Comparison Hub (`/compare/`)

**Purpose:** Show all curated comparisons, filterable by category. (Legacy path `/comparisons/` redirects here.)

**Structure:**
```
Header (global)
Breadcrumbs: Home > Comparisons

Page title: "Product Comparisons"
Brief description
CTA link to comparison tool

Category filter (if categories exist)
Comparison listing (card format)
  - Each card: Product A vs Product B
  - Category tag
  - Brief summary or excerpt
  - Link to full comparison

Pagination if needed

Footer (global)
```

#### Category Page (`/categories/[category-slug]/`)

**Purpose:** Overview of a product category, listing all comparisons within it.

**Structure:**
```
Header (global)
Breadcrumbs: Home > Categories > [Category Name]

Category title
Category description / overview
What this category covers
Buying considerations for this category

Comparisons in this category
  - Card format with Product A vs Product B
  - Brief summary

Related guides for this category

Footer (global)
```

#### Comparison Page (`/comparisons/[comparison-slug]/`)

**Purpose:** Provide a complete, structured comparison of two products.

**Structure:**
```
Header (global)
Breadcrumbs: Home > Comparisons > [Category] > Product A vs Product B

H1: "Product A vs Product B"
  (or appropriate comparison title)

Introduction
  - What products are being compared
  - What this comparison covers
  - Who this comparison is for

Quick Comparison Table
  - Side-by-side summary of key specs
  - Price (if available and sourced)
  - Key differentiators at a glance

Key Differences
  - 3-5 most important differences
  - Plain language explanation
  - What each difference means in practice

Detailed Comparison
  - Feature-by-feature analysis
  - Specification comparison with explanations
  - What each specification means for the user

Specification Table
  - Full specifications side-by-side
  - Responsive format
  - Labeled clearly
  - Technical terms explained where needed

Use-Case Analysis
  - Which product is better suited for which scenario
  - Trade-offs explained
  - No absolute "winner" declarations

Advantages and Disadvantages
  - Honest assessment of each product
  - Based on evidence, not opinion

Important Considerations
  - Things users should know before deciding
  - Caveats, limitations, or factors that may affect the decision

Methodology / Sources
  - Where specifications come from
  - How information was verified
  - Date of last update
  - Limitations of the comparison

FAQ (where genuinely useful)
  - 3-5 questions users might have
  - Clear, helpful answers

Related Comparisons
  - Links to 2-4 related comparisons
  - Within same category or related categories

Related Guides
  - Links to relevant guides

Footer (global)
```

#### Guide Page (`/guides/[guide-slug]/`)

**Purpose:** Provide educational content about features, specifications, or buying considerations.

**Structure:**
```
Header (global)
Breadcrumbs: Home > Guides > [Guide Title]

H1: Guide title

Introduction
  - What this guide covers
  - Who it is for

Main content
  - Organized with clear H2/H3 headings
  - Explains concepts, features, or buying factors
  - Links to relevant comparisons where appropriate

Related comparisons
  - Links to comparisons that illustrate the guide's points

Related guides
  - Links to other guides on similar topics

Footer (global)
```

#### About Page (`/about/`)

**Purpose:** Explain what CompareForge is and how it works.

**Content:**
- What CompareForge is
- Mission: helping users make informed product decisions
- How comparisons are created
- Commitment to accuracy and evidence
- How sources are handled
- Contact information

#### Contact Page (`/contact/`)

**Purpose:** Allow users to contact the site.

**Content:**
- Contact form (name, email, message)
- Or email address
- Response time expectations
- What types of inquiries are accepted

#### Privacy Policy (`/privacy-policy/`)

**Purpose:** Legal disclosure of data practices.

**Content:**
- What data is collected
- How cookies are used
- Third-party services (analytics, advertising if applicable)
- User rights
- Data retention
- Contact for privacy questions

#### Terms of Service (`/terms/`)

**Purpose:** Legal terms for site usage.

**Content:**
- Acceptance of terms
- Use of site
- Intellectual property
- Disclaimer of warranties
- Limitation of liability
- Changes to terms

#### Cookie Policy (`/cookie-policy/`)

**Purpose:** Disclosure of cookie usage.

**Content:**
- What cookies are used
- Purpose of each cookie
- How to manage cookies
- Third-party cookies

#### Disclaimer (`/disclaimer/`)

**Purpose:** Legal disclaimers about content and affiliations.

**Content:**
- Content is for informational purposes
- No guarantee of accuracy (while efforts are made)
- No manufacturer affiliation unless stated
- Affiliate disclosure (when applicable)
- Price and availability changes

#### Corrections/Report an Error (`/report-an-error/`)

**Purpose:** Allow users to report inaccuracies.

**Content:**
- Form to report errors (page URL, description of error, source if available)
- Or email contact
- Commitment to corrections
- How corrections are handled

#### 404 Page

**Purpose:** Handle broken or non-existent URLs.

**Content:**
- Clear message that the page was not found
- Link to homepage
- Link to comparisons
- Link to search
- Helpful navigation options

## Navigation Rules

### Breadcrumbs
- Present on every page except homepage
- Format: Home > Section > Subsection > Page
- Each level is a link
- Current page is not a link

### Related Content
- Every comparison page includes related comparisons and related guides
- Every guide page includes related comparisons and related guides
- Related content is contextually relevant, not random

### Internal Linking
- Comparisons link to their category
- Comparisons link to related comparisons
- Comparisons link to relevant guides
- Guides link to relevant comparisons
- Category pages link to all comparisons in that category
- All sections are reachable within 3 clicks from homepage

## URL Structure

```
/                                    → Homepage
/comparisons/                        → Comparison hub
/comparisons/[comparison-slug]/      → Individual comparison
/categories/[category-slug]/         → Category page
/guides/[guide-slug]/               → Guide page
/about/                              → About
/contact/                            → Contact
/privacy-policy/                     → Privacy Policy
/terms/                              → Terms of Service
/cookie-policy/                      → Cookie Policy
/disclaimer/                         → Disclaimer
/report-an-error/                    → Corrections
/sitemap.xml                         → XML sitemap
/robots.txt                          → Robots
```

### URL Rules
- Lowercase only
- Hyphens for separators
- No trailing slashes (except root)
- Descriptive slugs based on content
- No dynamic query parameters for indexable pages
- No session IDs in URLs

## Responsive Breakpoints

- Mobile: up to 640px
- Tablet: 641px to 1024px
- Desktop: 1025px+

## Page Load Requirements

- Images optimized and lazy-loaded
- Minimal JavaScript
- CSS inlined or critical CSS loaded first
- No render-blocking resources
- Fast First Contentful Paint
- Good Core Web Vitals scores

## Accessibility

- Semantic HTML
- Proper heading hierarchy (H1 > H2 > H3)
- Alt text on images
- Keyboard navigation
- Sufficient color contrast
- ARIA labels where needed
- Screen reader friendly tables