# Tool & Category Strategy — CompareForge.online

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Strategy

---

## 1. The Relationship Between Tools and Categories

CompareForge is a **tool platform organized by decision categories** (starting with smartphones).

- **Tools** are reusable jobs (`compare`, `decide`, `match`, `calculate`).
- **Categories** are the domains those jobs run in (smartphones first; later candidates below).
- A **category instance** of a tool = the same tool_id serving a new category via attribute modules — not a new tool.

This is how the site grows multi-tool and multi-category without becoming a random general-tools site: every tool must serve at least one live category, and every category must be served by the core loop (not by orphan one-off utilities).

---

## 2. Site Boundary Rule (what qualifies as a CompareForge tool)

**Include** a tool only if its primary output helps users **compare, evaluate, calculate, match, filter, or understand differences between two or more comparable options** in a decision the site covers.

**Exclude:**
- Random/name/quote generators
- Standalone unit converters and generic single-purpose calculators (e.g., BMI, tip, loan payment alone)
- Weather, horoscopes, entertainment, novelty
- Developer/debug utilities
- Any tool added only because a keyword exists (SEO-churn)

**Boundary test (all must pass):**
1. Output compares or evaluates ≥2 options (or two states of one option, e.g., upgrade vs keep).
2. Serves a live category and links into the core loop.
3. Has a distinct `purpose` from every existing registry entry.
4. Can be explained in one sentence to a user.
5. Has data/logic we can source or compute without fabrication.

---

## 3. Initial Tool Portfolio & Why (multi-factor — NOT SEO volume alone)

Selection weighed: user value, search intent quality, data readiness, build feasibility (reuse), expansion leverage, maintenance cost, topical authority, AdSense suitability, internal-linking value.

### Build first: `product-comparison` (type: compare)

| Factor | Assessment |
|--------|------------|
| User value | Core decision job; existing engine already solves it for phones |
| Intent | "X vs Y" = explicit commercial-decision intent; validated by research |
| Data | 12 entities + attributes + sources already exist |
| Feasibility | Highest — engine, tables, selectors already built and verified |
| Expansion | Foundation every other tool links into |
| Maintenance | Moderate — attribute updates per product cycle |
| AdSense | Strong — decision-stage pages, substantial unique content |
| Linking | Central hub; receives and distributes links |

### Build second: `product-finder` (type: decide)

| Factor | Assessment |
|--------|------------|
| User value | Solves the upstream problem: "I don't know what to compare" |
| Intent | Captures "which/product for me/best for use case" without thin listicles — it's a tool |
| Data | Reuses same entities + use-case tags/flags (moderate tagging work) |
| Feasibility | Medium — scoring rules + wizard UI; no new data domain |
| Expansion | Proves registry with a second type; feeds comparison ("compare your top 2") |
| Maintenance | Low once rules are set; revisit per product generation |
| AdSense | Tool landing + guide support = compliant if landing has real substance |
| Linking | Bridges guides ("best for X") → finder → comparison |

### Build third (Phase 2): `compatibility-checker` (type: match)

| Factor | Assessment |
|--------|------------|
| User value | Distinct problem shape (binary/partial verdict) comparison can't serve |
| Intent | "does X work with Y" / compatible queries are concrete and verified competitor demand exists (FrequencyCheck, Works With Checker) |
| Data | New relation layer — but scoped (accessories/networks/software), sources definable |
| Feasibility | Medium — relation records + rules; verdict logic simpler than scoring |
| Expansion | Exercises generic Relation model; extends same category |
| Maintenance | Relation pairs grow deliberately, not infinitely (curated) |
| AdSense | Fine on landing; dynamic states noindex |
| Linking | From product pages ("works with") → checker → comparisons |

### Build fourth (Phase 2): `upgrade-calculator` (type: calculate)

| Factor | Assessment |
|--------|------------|
| User value | Answers "should I upgrade?" with the user's own numbers |
| Intent | Decision-stage; calculator + comparison framing (precedent: build-vs-buy calculators) |
| Data | Mostly user inputs + disclosed assumptions; optional MSRP reuse |
| Feasibility | High — arithmetic + explanation; small surface |
| Expansion | Template for future `calculate` tools that compare two options |
| Maintenance | Low — formulas stable; assumptions dated and sourced |
| AdSense | Decision pages with explanations are fine; avoid pretending to be financial advice |
| Linking | Result → product-comparison for candidate upgrades |

### Deferred (not first)

- **Plan/service comparison:** pricing-churn conflicts with MSRP-only rules (Decisions 8/14); revisit only with stable, sourced tier data.
- **Visual/dimension comparison:** asset-heavy; Phase 3 after core loop proven.
- **New categories:** only after smartphone instances of the first two tools are stable (gates in §5).

---

## 4. Tool Family Research Summary (A–H)

| Family | Verdict | Disposition |
|--------|---------|-------------|
| A. Product comparison | Core | `product-comparison` |
| B. Specification comparison | Duplicate of A (same purpose) | Merged into A's spec table |
| C. Decision/finder | Include | `product-finder` |
| D. Compatibility | Include | `compatibility-checker` |
| E. Calculator-based | Include only when comparing options/states | `upgrade-calculator` |
| F. Plan/service | Defer | Backlog, gated on stable data |
| G. Visual comparison | Defer | Phase 3 |
| H. "Specialized engines" | Not a family | Instantiate concrete tools mapped to C/D/E |

Research observations used (not metrics claims): Baymard documents chronic UX failure in e-commerce compare tools (inconsistent specs, jargon without explanation) — our differentiator is normalized data + plain-language interpretation; finder/quiz patterns are well established (Samsung/Look Fantastic-style quizzes, product-finder products); compatibility search has dedicated independents; calculator-comparison tools (build-vs-buy/TCO) demonstrate the `calculate` pattern with transparent assumptions.

---

## 5. Category Expansion Gates

Do not open a second category until **all** hold for smartphones:

1. `product-comparison` and `product-finder` built on the generic model and registry.
2. Entity set and attributes maintained through at least one product-cycle update.
3. No unresolved data-integrity or SEO-architecture issues.
4. Editorial capacity exists to source a new category's entities (sources per Decision 7).

**Future category candidates (evaluation criteria only — no commitment):** laptops, TVs, wearables/audio — chosen only if they pass the boundary test, data-hierarchy sourcing, meaningful-difference test, and AdSense suitability. Not chosen by keyword volume alone.

---

## 6. Content's Role (tool-first)

Content (guides, explanation pages, curated comparison pages) exists to:

1. Bring users in (search → landing/guide → tool).
2. Explain results (methodology, spec explainers linked from results).
3. Bridge tools (related guides/tools on every result).

Content never exists solely to capture a keyword, and never replaces a tool with a static article where a tool is the right answer (Decision 11).

---

## 7. Anti-Goals (keep this from becoming a random tools site)

- No tool outside the boundary test.
- No second tool with an existing `purpose`.
- No category without the core loop.
- No indexable page for arbitrary tool outputs (Decision 12).
- No utility calculators that don't compare options.
