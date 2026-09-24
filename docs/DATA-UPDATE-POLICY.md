# Data Update Policy

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Implementation-Ready

---

## 1. Overview

This document defines how CompareForge maintains accurate, up-to-date product data.

---

## 2. Update Triggers

### 2.1 Immediate Updates (Within 48 hours)

| Trigger | Action | Responsible |
|---------|--------|-------------|
| New phone announced | Create product entry (status: announced) | Content manager |
| New phone released | Update status to available, verify all specs | Content manager |
| Phone discontinued | Update status to discontinued | Content manager |
| Major spec error discovered | Correct immediately, note in changelog | Any team member |
| Pricing significantly changed | Update pricing data | Content manager |

### 2.2 Scheduled Updates

| Frequency | Task | Responsible |
|-----------|------|-------------|
| Monthly | Verify pricing for all products | Automated + manual review |
| Monthly | Check for new product announcements | Content manager |
| Quarterly | Full data audit (all products) | Content manager |
| Quarterly | Verify source URLs still active | Automated check |
| Annually | Complete data refresh | Full team |

### 2.3 Event-Driven Updates

| Event | Action |
|-------|--------|
| Apple keynote | Update all Apple products |
| Samsung Unpacked | Update all Samsung products |
| Google I/O / Pixel launch | Update all Google products |
| Major tech publication review | Cross-reference benchmark data |
| Manufacturer spec page changes | Re-verify affected specs |

---

## 3. Update Process

### 3.1 New Product Entry

```
1. Verify announcement from manufacturer website
2. Create product JSON file with all available specs
3. Mark unconfirmed specs as null
4. Add source URLs for every confirmed spec
5. Set status to 'announced' or 'available'
6. Set lastUpdated and lastVerified to today
7. Add to index.json
8. Create product page
9. Add to relevant comparison pages (if applicable)
```

### 3.2 Spec Update

```
1. Identify changed specification
2. Verify new value from manufacturer or reliable source
3. Update product JSON file
4. Update source entry with new URL and dateAccessed
5. Update lastUpdated timestamp
6. Do NOT change lastVerified unless full audit performed
7. If critical spec changed, regenerate affected comparison pages
```

### 3.3 Pricing Update

```
1. Check manufacturer website for current MSRP
2. Check major retailers (Amazon, Best Buy, carrier stores)
3. Update pricing if MSRP has changed
4. Note regional differences if applicable
5. Update lastUpdated timestamp
```

---

## 4. Data Freshness Requirements

| Data Type | Maximum Age | Action if Stale |
|-----------|-------------|-----------------|
| Product status | 30 days | Re-verify |
| Pricing | 30 days | Re-verify |
| Specifications | 90 days | Re-verify |
| Source URLs | 180 days | Check still active |
| Benchmark scores | 180 days | Cross-reference |

---

## 5. Source Verification

### 5.1 Source Priority

1. Manufacturer official specs page (highest)
2. GSMArena (verified database)
3. Notebookcheck (independent testing)
4. RTINGS (independent testing)
5. Major tech publications
6. Retailer listings (for pricing only)

### 5.2 Source Recording

Every source entry includes:

```json
{
  "field": "display.size",
  "url": "https://www.apple.com/iphone-18-pro/specs/",
  "siteName": "Apple",
  "dateAccessed": "2026-09-20",
  "confidence": "verified"
}
```

### 5.3 Conflicting Sources

1. Use manufacturer data as primary
2. Note discrepancy in notes field
3. If unresolvable, mark as "Conflicting reports"
4. Never silently choose one value

### 5.4 Missing Data

1. Set field to null
2. Display as "—" with tooltip "Not yet verified"
3. Log in missing data tracker
4. Research when possible
5. NEVER fill with AI estimates

---

## 6. Changelog

Every data change is logged:

```json
{
  "date": "2026-09-23",
  "product": "apple-iphone-18-pro-max",
  "field": "pricing.msrp",
  "oldValue": null,
  "newValue": 1299,
  "source": "https://www.apple.com/iphone-18-pro/",
  "reason": "Official pricing confirmed at launch"
}
```

---

## 7. Quality Assurance

### 7.1 Pre-Publish Checklist

Before any product page goes live:

- [ ] All required fields populated (or null with reason)
- [ ] At least one source per major spec group
- [ ] No fabricated data
- [ ] Pricing verified from manufacturer
- [ ] Status accurately reflects market status
- [ ] lastUpdated and lastVerified set correctly
- [ ] Product page generates correctly
- [ ] Comparison pages update correctly

### 7.2 Monthly Audit

- [ ] All product statuses current
- [ ] All pricing verified
- [ ] All source URLs accessible
- [ ] No missing data超过30天
- [ ] Changelog reviewed

### 7.3 Quarterly Full Audit

- [ ] Complete re-verification of all products
- [ ] Source quality assessment
- [ ] Missing data research
- [ ] Comparison page freshness check
- [ ] Guide content relevance check

---

## 8. Error Correction

### 8.1 User-Reported Errors

1. User submits error via /report-an-error/
2. Content manager reviews within 48 hours
3. If valid, correct data and log change
4. Notify user if email provided
5. Update lastUpdated timestamp

### 8.2 Internal Discovered Errors

1. Log error in changelog
2. Correct immediately
3. Re-verify related data
4. Update affected pages

---

## 9. Discontinued Products

When a product is discontinued:

1. Update status to 'discontinued'
2. Add discontinuation date if known
3. Keep product page live (still useful for comparison)
4. Add "Discontinued" badge
5. Note in changelog
6. Update comparisons to note availability

---

*This policy defines how CompareForge maintains data accuracy. It is implementation-ready and should be followed by all content managers.*
