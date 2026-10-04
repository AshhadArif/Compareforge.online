# AdSense Pre-Application Final Audit — CompareForge.online

**Audit date:** 4 October 2026
**Property:** https://compareforge.online
**Build verified:** `npm run lint` → 0 errors · `npx tsc --noEmit` → 0 errors · `npm run build` → success (139 prerendered routes) · `npm test` → 22/22 engine tests passing
**Policy sources:** all requirements in this document are traced to `docs/ADSENSE-CURRENT-POLICY-SOURCES.md`

---

## Final status

> # READY AFTER MINOR FIXES

**Internal readiness score: 86 / 100**

No blocking issue was found. Every fix that could be made safely in code has been made in this pass. The remaining items are small, several are owner-only (they require facts only the site owner can supply), and none of them is a policy violation.

**This score is an internal consistency check against Google's published, checkable criteria. It is not a prediction.** Google publishes no approval probability, no threshold and no scoring system for AdSense applications — see "What this document does not claim" below.

---

## Scoring rubric and results

Fixed rubric, as specified:

| # | Category | Max | Score | Deduction reason |
| --- | --- | ---: | ---: | --- |
| 1 | Content | 25 | **22** | Hub pages and tool pages each embed the same interactive widget (2 pairs); the pattern is legitimate but is the only remaining near-duplicate surface. |
| 2 | Originality | 15 | **13** | Tools are genuinely functional and results are computed live, but all tool pages share one template (`ToolShell`), so presentation is uniform. |
| 3 | User experience | 15 | **14** | Navigation, breadcrumbs, empty states, validation states and shareable URLs are all in place; parameterised URL states are handled client-side only. |
| 4 | Policy compliance | 20 | **17** | No prohibited content and no ad code to violate anything with; deducted for consent/CMP readiness not yet implemented and for a pre-ad-placement layout plan not yet written. |
| 5 | Trust & privacy | 10 | **8** | Privacy and cookie disclosures match actual behaviour and a named publisher (Fahad) is now identified on `/about` and `/methodology`; deducted for no external trust signals and no publisher biography beyond name and role. |
| 6 | Technical | 10 | **8** | Sitemap, robots, canonical, structured data and 404 all correct; deducted because `noindex` on parameterised URLs is applied client-side (mitigated by `robots.txt`), and HTTPS redirect behaviour needs a final live check. |
| 7 | Mobile & accessibility | 5 | **4** | Labels, `aria-invalid`, `aria-describedby`, `role="alert"`, table `scope`, focus rings and responsive layout are present; a full automated a11y sweep (axe/Lighthouse) has not been run. |
| | **Total** | **100** | **86** | |

---

## 1. Content — 22 / 25

**Measured inventory (from the production build manifest):**

| Type | Count |
| --- | ---: |
| Prerendered routes | 139 |
| URLs in `sitemap.xml` | 134 |
| Product records / pages | 47 |
| Comparison pages (incl. 3 roundups) | 20 |
| Research guides | 12 |
| Working tools | 20 |
| Category comparison hubs | 17 |
| Static/hub/legal pages | 40 |

**Google's bar:** "your site provides enough valuable content to users and has a good user experience and navigational elements" ([source 3](docs/ADSENSE-CURRENT-POLICY-SOURCES.md#3-reasons-a-site-is-not-ready-to-show-ads)).

**Evidence it is met:**

- Every tool is a real, working computation. `scripts/engine.test.ts` pins published page examples to engine output (22 assertions covering percentage difference/change, price difference, unit price incl. per-100 scale, monthly-vs-annual, cost per use, repair-vs-replace, upgrade-vs-keep, fit clearance and NaN safety).
- The three category hubs that were missing long-form guidance (**monitors, cameras, headphones**) now carry four explanatory sections each, matching the depth of the other 14 hubs (`src/data/category-hubs.ts`).
- Index intros on `/guides`, `/products` and `/contact` now state real counts and real behaviour instead of generic filler; `/contact` gained a four-question FAQ that answers the reviewer's likely questions directly.
- Duplicate FAQ questions across pages were removed: "What does a product comparison tool compare?", "How do I compare the size of two phones?" and "Are the prices current?" each appeared on two pages and have been rewritten to be page-specific.
- Legal/trust coverage: `/about`, `/methodology`, `/privacy-policy`, `/cookie-policy`, `/terms`, `/disclaimer`, `/contact`, `/report-an-error`.

**Deduction:** `/compare` ↔ `/tools/spec-comparison` and `/compare/phones` ↔ `/tools/product-comparison` each run the same interactive widget. Titles, descriptions and FAQ sets are now differentiated, but the widgets themselves are shared.

---

## 2. Originality — 13 / 15

**Google's bar:** original content that adds value; no doorway pages, no scaled content abuse, no keyword-stuffed or cookie-cutter pages ([sources 1, 9, 10](docs/ADSENSE-CURRENT-POLICY-SOURCES.md#sources-deliberately-not-claimed)).

**Evidence it is met:**

- Comparison analysis, interpretation copy, methodology and FAQ answers are written for this site; manufacturer product descriptions are not copied in.
- Data is cited: every product record carries a `sources[]` array with URL + `confidence` (`verified` / `estimated` / `unconfirmed`) and a `lastVerified` date, rendered on the product pages (`src/data/types.ts`, `src/data/smartphones/**`).
- Scores and rankings are declared as formula output, not editorial opinion — `/methodology` and `/about` both state "Rankings are rule-based, not editorial".
- Honest negative claims are stated repeatedly and consistently: no lab tests, no photo-quality scores, no benchmark figures, no ratings, no sponsored placement.

**Deduction:** uniform `ToolShell` presentation across 20 tools means the pages look related; the *content* differs but the *shape* does not.

---

## 3. User experience — 14 / 15

**Google's bar:** "clear, easy-to-use navigation" and "a good user experience" ([sources 2, 3, 5](docs/ADSENSE-CURRENT-POLICY-SOURCES.md#2-are-your-pages-ready-for-adsense)).

**Fixed in this pass:**

- `ComparisonTable` keeps its Differences-Only toggle visible in the empty state and now shows distinct messages for "pick two products" vs "no match"; added `<th scope="col">` and removed a redundant `role="table"`.
- `GenericCalculator` now shows a per-field inline error (`role="alert"`, `aria-describedby` → `${id}-error`) with `aria-invalid` on the failing control, a `*` marker on required labels, a `border-warning` focus cue, and query-string parsing that no longer discards legitimate `0` values.
- `ProductSelector` ids are slug-based (no whitespace in `id`/`aria-controls`), selection is announced with `<span>` inside `<label>`.
- `SearchBar` button is `type="button"` with `aria-expanded`; input carries `aria-label`.
- `DimensionComparison` draws both objects on one shared scale (previously each axis had its own floor, which made the drawing lie about proportions).
- `DecisionMatrix` and `AlternativesFinder` had invalid nested interactive markup (`<div>` wrapping `<li>`, duplicate React keys) fixed.

**Remaining:** shareable `?a=&b=` states are excluded from crawling in `robots.txt`, but the client-side `noindex` only applies after JavaScript runs (see §6).

---

## 4. Policy compliance — 17 / 20

**Google's bar:** [AdSense Program policies](https://support.google.com/adsense/answer/48182), [Google Publisher Policies](https://support.google.com/adsense/answer/10502938), [Publisher Restrictions](https://support.google.com/adsense/answer/10437795), and "Do follow the Spam policies for Google web search" ([source 6](docs/ADSENSE-CURRENT-POLICY-SOURCES.md#6-stay-compliant-with-our-policies)).

**Evidence it is met:**

- The site's topic (product comparison and consumer calculators) sits outside every Publisher Restriction category — no adult, violent, medical, hateful or sensitive-event content anywhere in the 139 routes.
- No ad code is present, so no placement, click-encouragement, image-beside-ad or "more ads than content" rule can currently be violated.
- No pop-ups, no pop-unders, no forced redirects, no downloads, no malware, no interstitials, no gated content.
- `robots.txt` allows `*` on everything except `/*?`, `/api/` and `/admin/` — the AdSense crawler is **not** blocked on content pages, which is an explicit Google checklist item ([source 3](docs/ADSENSE-CURRENT-POLICY-SOURCES.md#3-reasons-a-site-is-not-ready-to-show-ads)).
- Keyword stuffing and doorway-page tests pass: titles map one-to-one to distinct intents, and no page exists solely to capture a keyword variation.

**Deductions (both are pre-ad-serving, not pre-application):**

1. No consent management platform (Google-certified CMP / TCF) is implemented — required for personalised ad serving in the EEA, UK and Switzerland once ads are live ([source 12](docs/ADSENSE-CURRENT-POLICY-SOURCES.md#12-policy-center-issues-and-ad-serving-status)).
2. No written ad-placement plan exists yet against the "don't place more ads than content" and "images near ads" rules — this must be authored before ad code is inserted.

---

## 5. Trust & privacy — 8 / 10

**Fixed in this pass — factual accuracy of the disclosures:**

| Page | Problem found | Fix |
| --- | --- | --- |
| `/privacy-policy` | Claimed a **contact form** that does not exist on the site; claimed cookies were used. | Rewritten: no form and no account system (email only), explicit statement that tool inputs never leave the browser and are not stored, and that CompareForge sets no cookies. |
| `/cookie-policy` | Claimed **session cookies** and **preference cookies** were in use. Neither exists. | Rewritten: CompareForge sets no cookies at all; explains that shareable tool state lives in the URL, not in local/session storage; states that blocking cookies does not change how the site works. |
| `/tools/use-case-comparison` | Said "this database of **12 phones**". | Now "the **22** currently listed phones in our database (**47** records in total)". |
| `/tools/product-finder` | Said "**12 models** across six brands", omitting Asus and Nothing. | Now "**22** listed models across **eight** brands (Apple, Asus, Google, Motorola, Nothing, OnePlus, Samsung and Xiaomi)". |
| `/tools/unit-price-calculator` | Example quoted figures the tool does not produce. | Example rewritten to the engine's actual output (`$0.009` vs `$0.008` per ml; `$0.90` vs `$0.80` per 100 ml; `$0.0199` vs `$0.005` per GB → now the clean `$0.05` vs `$0.03` case). |
| `/tools/upgrade-vs-keep-calculator` | Prose said "+$9.70 per month"; the engine outputs `+$9.69`. | Prose corrected. |
| `/tools/product-comparison` | Registry promised outputs the tool does not deliver ("Break-even point", "Diagonal comparison", "Break-even horizon", "Diagonal check"). | Replaced with outputs the tool actually shows. |

**Trust mechanisms that exist:** per-record source URLs with confidence levels and verification dates; a full `/methodology` page; an explicit "what we do not do" list on `/about`; a real mailbox (`contact@compareforge.online`) reachable from `/contact` and `/report-an-error`; an error-reporting page with a pre-filled `mailto:`.

**Trust identity — resolved in this pass:**

- `/about` now carries a **"Who Runs CompareForge"** section naming **Fahad** as owner, editor and the person accountable for accuracy, and stating explicitly that there is no editorial team and no sponsored or guest content.
- `/methodology` now states that Fahad reviews each source and signs off on every record and tool page.
- An `AboutPage` → `Organization` → `Person` (Fahad, "Founder, editor and publisher") JSON-LD graph is emitted on `/about`.
- Visual identity added: `public/logo.svg`, wired as the site icon (`metadata.icons`) and rendered as the brand mark in the header and footer lockups.
- *Optional follow-up (owner): a real photograph and a one-paragraph biography would strengthen this further. Do not invent either.*

**Still outstanding (owner-only):**

1. **No external trust signals** — no verifiable presence elsewhere, no cited third-party mention of CompareForge. *Owner action only; cannot be manufactured.*

---

## 6. Technical — 8 / 10

**Present and verified in the build:**

- `metadataBase = https://compareforge.online`; per-page `alternates.canonical` on every indexable route; title template `%s | CompareForge`.
- `sitemap.xml` generated from live data: 34 static/hub + 21 tool + 20 comparison + 47 product + 12 guide = **134 URLs**.
- `robots.txt` served from `src/app/robots.ts` with `sitemap:` declared.
- Structured data emitted: `FAQPage` (20 tool pages, 5 editorial pages, 17 category hubs), `ItemList` (comparison index), product records.
- `not-found.tsx` exists; static export path (`npm run build:static`) is available for hosts that cannot run the Next server.
- Engine math has a regression suite that fails the build pipeline if a published example drifts.

**Fixed in this pass:**

- `robots.txt` disallow widened from `/tools/*?` to **`/*?`**, so parameterised states on *every* path — `/compare/phones?a=&b=`, category hub `?a=&b=&c=` — are excluded from crawling.
- `DynamicNoIndex` added to `src/components/category-hubs` → `CategoryHubPage`, closing the gap where `CategoryComparisonTool` wrote `?a=&b=&c=` states that were neither noindexed nor disallowed.

**Deductions:**

1. `DynamicNoIndex` mutates `document.head` **after hydration**, so a non-JS crawler that ignores `robots.txt` would still see `index, follow`. The `robots.txt` rule is the primary defence; the meta tag is secondary. Acceptable, but not a server-rendered guarantee.
2. HTTP→HTTPS redirect behaviour and `www`→ apex canonicalisation were not re-verified against the live endpoint in this pass.

---

## 7. Mobile & accessibility — 4 / 5

**Fixed in this pass:**

- `B-16` — calculator validation errors are now associated with their inputs: inline error with `role="alert"`, `aria-describedby` wiring, `aria-invalid`, and a visual `border-warning` state on the failing control.
- `B-17` — `required` metadata is no longer dead code: `required` is emitted on both `<input>` and `<select>` for required fields, so native constraint validation and mobile keyboards engage.
- `B-19` — stale factual claims corrected (see §5).
- `B-22` — noindex coverage gaps closed (see §6).
- Earlier in this pass: table header `scope`, removed nested-interactive markup, React key collisions, whitespace `id`s, `aria-expanded` on the search disclosure, `aria-controls`/`aria-label` on the combobox.

**Not done:** no automated axe-core / Lighthouse accessibility sweep has been run against the built site.

---

## Full list of changes made in this pass

### Engine and calculation correctness
- `src/lib/engine/calc.ts` — `formatMoney` is magnitude-aware: ≥100 → 0 dp, ≥0.01 → 2 dp, smaller → 6 dp, so a unit price of `$0.009` and `$0.004995` never collapses to `$0.00` on both sides of a comparison, while ordinary cents values still read `$0.49`.
- `src/lib/engine/computes.ts` — percentage difference divides by `|average|` (signed-average step shown); percentage-change zero case returns "No change"/"unchanged" instead of `NaN%`; repair-vs-replace ratio guarded by `Number.isFinite`; dead `totalCostOwnershipCompute` removed; `upgradeVsKeepCompute` rejects an empty current value.
- `src/lib/engine/definitions.ts` — TCO emphasis no longer hardcoded to the first row; `currentValue` is `required`.
- `scripts/engine.test.ts` (+ `scripts/ts-resolver.mjs`, `scripts/register-ts.mjs`) — **22 regression tests**, wired to `npm test`.

### Content accuracy and honesty
- `/privacy-policy`, `/cookie-policy` — corrected to match what the site actually does.
- `/tools/use-case-comparison`, `/tools/product-finder` — corrected dataset counts and brand list.
- `/tools/unit-price-calculator`, `/tools/upgrade-vs-keep-calculator` — worked examples now match engine output exactly.
- `/tools/spec-comparison`, `/tools/alternatives-finder`, `/tools/dimension-comparison` — duplicate FAQ questions rewritten to be page-specific.
- `/guides`, `/products`, `/contact` — intros rewritten with real counts; `/contact` gained an FAQ.
- `src/data/tools/registry.ts` — unimplemented output promises removed; `product-comparison` re-titled "Compare Two Phones - Free Specification Tool" to stop competing with `/compare` and `/compare/phones`; schema availability mapping corrected (available→InStock, announced→PreOrder, discontinued→OutOfStock).

### Depth and structure
- `src/data/category-hubs.ts` — four explanatory sections added to each of the **monitors**, **cameras** and **headphones** hubs.

### Accessibility and UX
- `GenericCalculator`, `ComparisonTable`, `DimensionComparison`, `DecisionMatrix`, `AlternativesFinder`, `ProductSelector`, `SearchBar` — as listed in §3 and §7.

### Publisher identity and branding (added 4 October 2026)
- `/about` — new "Who Runs CompareForge" section naming **Fahad** as owner/editor, with the no-sponsored-content and no-guest-posting statement.
- `/methodology` — states that Fahad reviews sources and signs off on every record and tool page.
- `/about` — `AboutPage` / `Organization` / `Person` JSON-LD graph added.
- `public/logo.svg` created (rounded-square mark, two comparison bars on `#1a56db` with a `#059669` baseline); wired through `metadata.icons` and rendered in the header and footer brand lockups.

### Technical SEO
- `src/app/robots.ts` — `Disallow: /*?`.
- `src/components/CategoryHubPage.tsx` — `DynamicNoIndex`.

### Security (added 4 October 2026)
- Hostinger vulnerability scan flagged **GHSA-vcvr-r3jv-pc5j** — Critical RCE in `next/og` `ImageResponse` (`next >=16.2.0 <16.3.6`).
- `next` and `eslint-config-next` upgraded **16.3.5 → 16.3.6** (the patched release, per the Next.js security update of 22 September 2026).
- `npm audit --omit=dev` → **0 vulnerabilities** (all production dependencies clean).
- Remaining `npm audit` noise (5× high, `braces <=3.0.3`) is a **dev-only** transitive dependency of `eslint-config-next`; no fixed `braces` release exists yet (micromatch/braces#70), and `npm audit fix --force` would downgrade to `eslint-config-next@14.2.35`. **Do not run it.** Not shipped to the server, not scanned by Hostinger.

### Verification
- `npm run lint` → clean · `npx tsc --noEmit` → clean · `npm run build` → 139 routes prerendered · `npm test` → 22/22.

---

## Remaining minor fixes (in priority order)

| # | Fix | Owner | Blocks applying? |
| --- | --- | --- | --- |
| 1 | ~~Add a named author/publisher identity~~ — **done**: Fahad on `/about` + `/methodology` + JSON-LD. Optional: add a real photo and biography. | Owner | No |
| 2 | Run an automated accessibility sweep (axe-core / Lighthouse) on the built site and fix anything flagged. | Us, on request | No |
| 3 | Write the ad-placement plan (positions, formats, ad-to-content ratio, image-adjacency rules) **before** inserting any ad code. | Us, on request | No |
| 4 | Implement a Google-certified CMP (TCF) before enabling ads for EEA/UK/Switzerland traffic. | Owner + us | No — required only once ads serve |
| 5 | Create the AdSense account, then add the `ads.txt` line it issues. | Owner | No — post-approval |
| 6 | Re-verify HTTP→HTTPS and `www`→apex redirects on the live domain. | Us, on request | No |
| 7 | Optional: de-duplicate the shared widget between `/compare*` hubs and `/tools/*` pages. | Us, on request | No |

---

## Owner statements recorded at audit time (4 October 2026)

Supplied by the site owner and **not** independently verified by this audit:

| Question | Owner answer | Audit treatment |
| --- | --- | --- |
| Publisher identity | **Fahad** — owner/editor of CompareForge | Published on `/about` and `/methodology`; no credentials, experience or education claimed beyond name and role. |
| Domain / site history | **No** adverse history | Recorded as stated. Google may still check independently. |
| Traffic source | **SEO only** — no paid, exchanged, incentivised or bought traffic | Consistent with [Program policies § Traffic sources](https://support.google.com/adsense/answer/48182); owner must keep it that way after ads are live. |
| Existing AdSense account | **No** — no account exists yet | Account creation, payments profile and `ads.txt` are post-application steps (owner action). |
| Analytics | Not yet chosen; site currently loads none | Privacy and cookie policies already state this correctly and must be updated the day analytics is added. |

---

## Audit files are not published

`docs/` (this file, `ADSENSE-CURRENT-POLICY-SOURCES.md` and all other internal documents) and `scripts/` (`engine.test.ts`, `ts-resolver.mjs`, `register-ts.mjs`, `build-static.mjs`) live **outside** `public/`.

Next.js serves only `public/` static assets and routes defined under `src/app/`. There is no route, rewriter or static export step that copies `docs/` or `scripts/` — `npm run build:static` writes `out/` from the Next build plus `public/` only. **None of these files can be reached at https://compareforge.online/**.

---

## Owner-only facts this audit cannot supply

The owner has since answered the traffic, history and account questions (recorded above). The following still cannot be supplied or verified by this audit:

- The identity, credentials and track record of the person behind CompareForge beyond the published name **Fahad** and the stated role.
- Whether the domain has any history, previous ownership or prior manual actions — *owner states "no"; unverified here*.
- Traffic volume and its actual sources in practice — *owner states SEO only; unverified here*.
- Whether the AdSense account itself (payments profile, tax info, prior standing) is in good order — *no account exists yet*.

---

## What this document does **not** claim

1. **No approval probability.** Google publishes no approval odds, no site-quality threshold, and no scoring system for AdSense applications. None is stated here, and any number presented elsewhere as "chance of approval" would be fabricated.
2. **No guarantee of approval or of revenue.** A site that passes this audit can still be rejected, delayed beyond Google's stated "a few days to 2-4 weeks", or approved and later restricted.
3. **No fabricated trust signals.** No stats, credentials, testimonials, review counts or third-party endorsements are claimed for this site because none were provided or verified.
4. **No fabricated Google requirements.** Every requirement cited traces to `docs/ADSENSE-CURRENT-POLICY-SOURCES.md`; requirements Google does not publish (minimum word count, minimum domain age, minimum post count, named-author mandates) are explicitly excluded from the rubric.
