# Data Sources — CompareForge.online

## Purpose

This document defines how CompareForge sources, verifies, and presents product data. Accuracy and transparency are critical for user trust and editorial integrity.

## Core Rules

1. **Never invent data.** If a specification cannot be verified, state that it is unverified.
2. **Never invent prices.** Prices change constantly. If shown, note the date checked and that prices may vary.
3. **Never invent ratings.** No fabricated star ratings, review counts, or scores.
4. **Never invent features.** Only claim a product has a feature if it can be verified.
5. **Always cite sources.** Every specification should have a source reference.
6. **Acknowledge uncertainty.** If data is uncertain, say so.

---

## Data Hierarchy

When multiple sources provide different information, use this hierarchy:

### Tier 1: Manufacturer Official Sources
- Official product pages
- Official specification sheets
- Official press releases
- Official documentation

**Use when:** Available and specific to the product being compared.

### Tier 2: Authoritative Third-Party Sources
- Established tech publications (e.g., GSMArena, AnandTech, Notebookcheck)
- Regulatory filings
- Standards organizations
- Independent testing organizations

**Use when:** Manufacturer data is incomplete or unavailable, or to verify manufacturer claims.

### Tier 3: Retailer Sources
- Major retailers (Amazon, Best Buy, etc.)
- Pricing aggregators
- Availability information

**Use when:** Checking pricing and availability. Note that retailer data may change quickly.

### Tier 4: Community/Forum Sources
- User-reported specifications
- Community databases

**Use when:** Only to identify potential discrepancies for further verification. Do not use as primary source.

---

## Data Types and Sourcing

### Specifications

**Source:** Manufacturer official specifications, verified against independent sources where possible.

**Process:**
1. Check manufacturer product page
2. Cross-reference with at least one independent source
3. If sources conflict, note the discrepancy
4. Include source reference

**Examples:**
- Display size: Manufacturer spec sheet
- Processor: Manufacturer spec sheet, verified by benchmark databases
- Battery capacity: Manufacturer spec sheet
- Weight: Manufacturer spec sheet, verified by independent reviews

### Features

**Source:** Manufacturer official feature lists, verified by independent reviews.

**Process:**
1. Check manufacturer feature list
2. Verify feature exists through independent reviews or hands-on reports
3. Note any limitations or caveats
4. Include source reference

**Important:** Do not claim a feature exists unless it can be verified. "Up to" claims from manufacturers should be qualified.

### Pricing

**Source:** Major retailers, checked at specific dates.

**Process:**
1. Check multiple retailers for current pricing
2. Note the date prices were checked
3. Note that prices vary by region and time
4. Use price ranges if prices vary significantly
5. Do not include affiliate-marked-up prices as "normal" prices

**Rules:**
- Always note when prices were last checked
- Always note that prices may vary
- Do not claim "lowest price"
- Do not invent historical prices
- Do not claim price drops without evidence

### Availability

**Source:** Retailer websites, manufacturer websites.

**Process:**
1. Check if product is currently available
2. Note regional availability differences
3. Note if product has been discontinued

**Rules:**
- Do not claim a product is available if it may not be
- Note regional differences
- Update when products are discontinued

### Review Aggregations

**Source:** Only from verifiable, established sources.

**Process:**
1. If aggregating review scores, only use public, verifiable scores
2. Note the source and date
3. Do not invent review counts or average scores

**Rules:**
- Do not fabricate review scores
- Do not invent user satisfaction metrics
- Only use publicly available, verifiable data

---

## Source Documentation

### On-Page Sources

Every comparison page should include a "Methodology / Sources" section that explains:

- Where specifications come from
- How information was verified
- Date of last update
- Any limitations or caveats

### Source Format

Sources can be referenced as:
- Inline: "(Source: Manufacturer specification sheet)"
- Footnote: "[1]" with a references section
- Linked: Direct link to source where appropriate

### Source Examples

```
Specifications sourced from Apple's official iPhone 15 product page and Samsung's official Galaxy S24 product page, 
cross-referenced with GSMArena database. Prices checked on Amazon and Best Buy, [DATE]. Prices may vary.
```

---

## Handling Conflicting Data

When sources disagree on a specification:

1. **Note the discrepancy** in the comparison
2. **Present the most reliable source** as primary
3. **Acknowledge the alternative data** if relevant
4. **Do not average conflicting data** unless there is a good reason
5. **Update when resolution is found**

Example:
```
Battery capacity: 4,585 mAh (per Apple) / 4,000 mAh (per Samsung)
Note: Apple and Samsung measure battery capacity differently.
```

---

## Data Currency

### When to Update

- When a product is discontinued
- When a manufacturer issues a correction
- When prices change significantly (more than 20%)
- When new information becomes available
- When a user reports an error
- When a product specification is corrected by the manufacturer

### Staleness Indicators

- Note "Last updated: [DATE]" on every comparison
- Products more than 12 months old should be flagged as potentially outdated
- Discontinued products should be clearly marked

---

## Specific Product Category: Smartphones

### Data Sources

| Data Type | Primary Source | Secondary Source | Notes |
|-----------|---------------|-----------------|-------|
| Display specs | Manufacturer | GSMArena | Size, resolution, type, refresh rate |
| Processor | Manufacturer | Benchmark databases | Model, cores, clock speed |
| RAM | Manufacturer | GSMArena | Amount, type |
| Storage | Manufacturer | GSMArena | Capacity, expandability |
| Camera specs | Manufacturer | Independent reviews | Megapixels, aperture, features |
| Battery | Manufacturer | Independent tests | Capacity, charging speed |
| Dimensions | Manufacturer | GSMArena | Height, width, depth, weight |
| OS | Manufacturer | — | Version at launch, update policy |
| Price | Retailers | Price aggregators | Date-checked, region-specific |
| Connectivity | Manufacturer | — | 5G, WiFi, Bluetooth, etc. |

### Smartphone-Specific Rules

- Do not claim a camera is "better" without evidence
- Do not compare camera quality without noting the source
- Do not invent benchmark scores
- Do not claim waterproof ratings without manufacturer specification
- Note regional variant differences (e.g., processor variants)
- Note carrier-locked vs unlocked pricing differences

---

## Price Handling

### Display Rules

- Show price as a range if it varies by retailer
- Always note when prices were last checked
- Always note that prices may vary by region and time
- Do not show "sale" prices as regular prices
- Do not invent historical prices

### Format

```
Price (checked [DATE]): $X - $Y
Note: Prices vary by retailer and region. Last verified [DATE].
```

---

## Regional Differences

### Handling

- Note when specifications differ by region
- Note when pricing differs by region
- Note when availability differs by region
- Use US pricing as default unless otherwise specified

---

## Updates and Corrections

### User-Reported Corrections

- Provide a way for users to report errors
- Review reports promptly
- Correct errors and note the correction
- Thank reporters where appropriate

### Self-Correction Process

- Regularly check for outdated information
- Update when manufacturers correct specifications
- Update when prices change significantly
- Note all corrections made

---

## Platform Data Sourcing (multi-tool)

These rules extend the hierarchy above to the generic model in `DATA-MODEL.md`.

### Entities (any category)

- Same hierarchy: manufacturer → authoritative third-party → retailer (price/availability only)
- Every entity needs `lastVerified` and sources for major attribute groups
- Never fill unknown attributes with estimates or similar-product data (display "—")

### Relations (compatibility `match` tools)

- Each relation requires at least one citable source (manufacturer support docs, standards bodies, carrier compatibility pages, official accessory specs)
- Store `dateAccessed` / `lastVerified`; re-check periodically and on user reports
- Verdict confidence follows the same verified/estimated/unconfirmed scale
- **Missing relation → "Not verified"**, never inferred from vibes or adjacent products
- Partial verdicts must list explicit caveats sourced or clearly framed as general limitations

### Use-case scores (`decide` tools)

- Scores/flags are **editorial judgments documented in methodology**, not lab measurements
- Origin must be traceable to observable attributes or published criteria — never "we tested" (Decision 2)
- Revisit scores when product attributes change materially

### Calculator assumptions (`calculate` tools)

- Every default assumption carries a label, value, and `dateChecked`
- Prefer public, citable references (e.g., published fee schedules, official pricing) where applicable
- User-entered values are user data — do not silently overwrite or "correct" them; only validate ranges
- Formulas are documented in plain language in methodology; no hidden math
- Distinguish clearly: sourced assumption vs illustrative default vs user input

### Price policy (all tools)

- MSRP-only display remains the default (Decisions 8/14)
- Calculator outputs derived from user-entered prices are labeled as user-provided, not "current market price"
- No real-time retail scraping/APIs without a formal policy revision

---

## Data Maintenance Triggers by Tool Type

| Tool type | Check when |
|-----------|------------|
| compare | New/updated entities; attribute corrections; annual model cycles |
| decide | Attribute changes affecting scores; new entities entering shortlist eligibility |
| match | New relations; manufacturer/carrier policy changes; user-reported errors |
| calculate | Formula review; assumption date staleness; policy/pricing changes affecting defaults |