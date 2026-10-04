# AdSense — Current Policy Sources

Audit date: **4 October 2026**
Site: **https://compareforge.online**
Purpose: record the exact, current Google sources used for `docs/ADSENSE-FINAL-AUDIT.md`, so every requirement in the audit can be traced to a primary source.

## How these sources were retrieved

- `support.google.com` refused direct HTTP fetch during this audit (transport error), so every source below was retrieved through web search result summaries of the canonical Google URLs.
- URLs are the canonical `support.google.com` / `developers.google.com` addresses. Titles and quoted requirements are taken verbatim from the retrieved page content.
- **Nothing in this file is inferred, extrapolated or invented.** Where a page does not state something, this file says so.
- Google publishes **no** approval probability, approval odds, scoring threshold or "site quality score" for AdSense applications. No such figure exists in any source below, and none is asserted anywhere in this audit.

---

## 1. Eligibility to apply

**Source:** [AdSense program eligibility](https://support.google.com/adsense/answer/9724) — *AdSense Help*
**Retrieved:** 4 Oct 2026

Requirements stated by Google for being eligible to apply:

- You must be **18 or older** (or the age of majority in your country).
- You must have a **website** that has been live for some time and complies with Google's [Program policies](https://support.google.com/adsense/answer/48182).
- The site must have **original content** that provides value to users.
- Your site must comply with Google's [Webmaster Quality Guidelines](https://support.google.com/webmasters/answer/35769) (now Google Search Essentials) and the [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies).

**Audit mapping:** Trust & Privacy (10), Policy (20), Content (25).

---

## 2. Are your pages ready for AdSense?

**Source:** [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563) — *AdSense Help*
**Retrieved:** 4 Oct 2026

> "For your site to succeed with AdSense, it needs to have unique content that's relevant to your visitors and provides a great user experience."

Pre-signup checklist Google asks publishers to review:

- What's special about your pages?
- Do your pages have **clear, easy-to-use navigation**?
- Do your pages have **unique and interesting content**?
- Ready for AdSense?

**Audit mapping:** Content (25), UX (15), Originality (15).

---

## 3. Reasons a site is not ready to show ads

**Source:** [What to do when your site is not ready to show ads](https://support.google.com/adsense/answer/12176698) — *AdSense Help*
**Retrieved:** 4 Oct 2026

Google's enumerated reasons a site fails review:

| Google's stated reason | Verbatim key text |
| --- | --- |
| Ad code missing or incomplete | "The code is missing or incomplete" — the code must sit between `<head>` and `</head>` on the site you signed up with; alternatively verify site ownership in Search Console. |
| Site unreachable | "Is your site up and running?" / "Can AdSense access your site without a password?" / "Can the AdSense crawler access your site? Make sure you're not blocking our crawler in your robots.txt file." / "Does your site have a valid SSL Certificate from a recognized certification authority (not a self-signed certificate) and does it also redirect HTTP to HTTPS?" |
| Not enough unique content or good UX | "Before you can start monetizing a site with AdSense, it's important that your site provides enough valuable content to users and has a good user experience and navigational elements." |
| Policy violations | "There are policy violations on your site which need resolving before your site is ready." |
| Not yet submitted | "When you've addressed the above points, submit your site for review through the Sites page in your AdSense account." |

Review timing Google states: *"The review process usually takes a few days, but in some cases can take 2-4 weeks."*

**Audit mapping:** Technical (10) — SSL, robots.txt crawl access, reachability; Content (25) — "enough valuable content"; Policy (20).

---

## 4. Site status values in the AdSense Sites page

**Source:** [Check the status of your AdSense sites](https://support.google.com/adsense/answer/12170222) — *AdSense Help*
**Retrieved:** 4 Oct 2026

| Status | Google's meaning |
| --- | --- |
| Requires review | "Your site hasn't been checked yet." |
| Needs attention | "You need to fix some issues before your site is ready to show ads." |
| Getting ready | "We're running some checks on your site. The review process usually takes a few days, but in some cases can take 2-4 weeks." |
| Ready | "Your site is ready to show ads." |

---

## 5. AdSense Program policies

**Source:** [AdSense Program policies](https://support.google.com/adsense/answer/48182) — *AdSense Help*
**Retrieved:** 4 Oct 2026

Headline requirements (verbatim section names and key text):

- **Invalid clicks and impressions** — "Publishers may not click their own ads or use any means to inflate impressions and/or clicks artificially… Clicks on Google ads must result from genuine user interest."
- **Encouraging clicks or views** — publishers may not ask others to click or view ads or use deceptive implementation methods.
- **Traffic sources** — "Google ads may not be placed on pages receiving traffic from certain sources… publishers using online advertising must ensure that their pages comply with Google's Landing Page Quality Guidelines." Prohibited: paid-to-click, paid-to-surf, autosurf, click-exchange services.
- **Ad behavior / placement** — ad code "may not be placed in inappropriate places such as pop-ups, emails or software"; publishers must follow ad placement policies.
- **Site behavior** — "Sites showing Google ads should be easy for users to navigate. Sites may not change user preferences, redirect users to unwanted websites, initiate downloads, include malware or contain pop-ups or pop-unders that interfere with site navigation."
- **Sensitive events** — restrictions on monetizing content about sensitive events.

**Audit mapping:** Policy (20), UX (15).

---

## 6. Stay compliant with our policies

**Source:** [Stay compliant with our policies](https://support.google.com/adsense/answer/1261929) — *AdSense Help*
**Retrieved:** 4 Oct 2026

Google's numbered overview:

1. Don't click on your own ads.
2. Don't include any content that violates the Google Publisher Policies.
3. Don't modify the AdSense code.
4. **Do follow the Spam policies for Google web search.**
5. Do provide a good user experience.
6. **Don't place more ads than content on any page.**
7. Don't place images near ads in a way that may mislead users into thinking that the images are associated with the ads.

**Audit mapping:** Policy (20), UX (15) — the "more ads than content" and "images near ads" rules are pre-defined constraints for the future ad layout, not for the current audit of a site with no ad code.

---

## 7. Google Publisher Policies

**Source:** [Google Publisher Policies](https://support.google.com/adsense/answer/10502938) — *AdSense Help*
**Retrieved:** 4 Oct 2026

> "When you monetize your content with Google ad code you are required to adhere to the following policies. Failure to comply with these policies may result in Google blocking ads from appearing against your content, or suspending or terminating your account."

Categories Google lists: **Content policies · Behavioral policies · Privacy-related policies · Requirements and other standards.**

Behavioral subsections include *Dishonest declarations*, *Ads interfering* and *Inventory value*.
Privacy subsections include *Privacy disclosures*.

Google notes the policies are being migrated/consolidated into the new Publisher Policies Help Center, and remain viewable in the AdSense Help Center.

**Audit mapping:** Policy (20), Trust & Privacy (10).

---

## 8. Google Publisher Restrictions

**Source:** [Google Publisher Restrictions](https://support.google.com/adsense/answer/10437795) — *AdSense Help*
**Retrieved:** 4 Oct 2026

Content that Google **restricts** (rather than prohibits) is allowed on a publisher site but may receive reduced or no advertising — for example certain adult, violent, healthcare-and-medical, and sensitive-category content, plus content that falls under advertiser preferences. Restricted inventory is disclosed in the [policy issues / advertiser preferences](https://support.google.com/adsense/answer/15689616) taxonomy.

**Audit mapping:** Policy (20) — this site's topic (product comparison and consumer calculators) falls outside every restriction category.

---

## 9. Spam policies for Google web search

**Source:** [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) — *Google Search Central docs*
**Retrieved:** 4 Oct 2026

Referenced by AdSense eligibility (source 1) and by "Stay compliant" rule 5. Relevant subsections for this site type:

- **Keyword stuffing** — "Filling pages with keywords or numbers results in a negative user experience."
- **Doorway pages** — "Doorway pages are created to rank for a very small set of keywords and to funnel users without adding substantive value."
- **Scaled content abuse** — mass-producing content that adds little or no value.
- **Hacked content, expired domain abuse, irrelevant links** — not applicable to this site.
- **AI-generated / automated content** — allowed when it is produced for users with **originality** and value; manipulative use to game rankings is spam.

**Audit mapping:** Content (25), Originality (15).

---

## 10. Helpful content guidance

**Source:** [Create helpful, reliable, people-first content](https://developers.google.com/search/docs/essentials/helpful-content) — *Google Search Central docs*
**Retrieved:** 4 Oct 2026

Self-assessment questions Google publishes (used as a content-quality proxy, not an AdSense rule in itself): Who is the content for? What is the content's purpose? Does it demonstrate first-hand expertise? Will someone leave the site feeling they've learned enough? Is this the kind of page you'd expect to find in a magazine?

**Audit mapping:** Content (25), Originality (15).

---

## 11. AdSense connection / code placement (post-application)

**Source:** [Connect your site to AdSense](https://support.google.com/adsense/answer/7584263) — *AdSense Help*
**Retrieved:** 4 Oct 2026

- "To complete the AdSense activation process you need to connect your site to AdSense. You won't be able to show ads until your site's been approved."
- "We review your entire site to check it complies with the AdSense Program policies. This usually takes a few days, but in some cases it can take 2-4 weeks."
- Code must be pasted into the HTML of the site you signed up with, between `<head>` and `</head>`, on "a page that has content and receives regular visitors."
- Connection issues are commonly: code missing/incomplete, site unreachable, password protection, robots.txt blocking the AdSense crawler, invalid SSL.

**Audit mapping:** Technical (10) — these are post-application steps; the audit checks the *prerequisites* (SSL, robots.txt, no password gate) rather than the code placement itself.

---

## 12. Policy center, issues and ad serving status

**Source:** [Understand policy issues, regulatory issues, advertiser preferences, and ad serving statuses](https://support.google.com/adsense/answer/15689616) — *AdSense Help*
**Retrieved:** 4 Oct 2026

Three issue types: **policy issues** ("You will not receive advertising where there are policy issues"), **regulatory issues** (e.g. GDPR / US state privacy laws), **advertiser preferences**.
Ad serving statuses: *Disabled*, *Restricted*, *Ad serving at risk*, *Limited*, *Confirmed Click on*, *Restricted ad personalization*.

Relevant regulatory note for later: sites serving personalised ads in the EEA, UK and Switzerland need a **Google-certified CMP** implementing the TCF, otherwise they are "not be eligible for personalized ads."

**Audit mapping:** Policy (20) — recorded as a **pre-ad-serving** obligation (CMP/consent), not a prerequisite for submitting an application.

---

## Sources deliberately *not* claimed

- Google does **not** publish a minimum age of a domain, a minimum post count, a minimum word count, or an approval probability. No such threshold is used in this audit.
- Google does **not** require a named human author, bylined articles, or external reputation signals for AdSense. Author identity is treated in the audit as an **advisory E-E-A-T improvement**, not a requirement.
- Google does **not** require a CMP/consent management platform to *apply*; it is required for personalised ad serving in regulated regions once ads are live.
