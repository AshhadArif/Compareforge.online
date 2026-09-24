# Comparison Engine Specification

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Implementation-Ready

---

## 1. Overview

The Comparison Engine is the core of CompareForge. It takes product data and produces structured comparison results with practical analysis.

---

## 2. Engine Architecture

```
Product Data (JSON)
        ↓
Comparison Request (product IDs)
        ↓
┌───────────────────────────────┐
│      Comparison Engine        │
│                               │
│  1. Load product data         │
│  2. Normalize units           │
│  3. Calculate differences     │
│  4. Determine significance    │
│  5. Generate interpretation   │
│  6. Build comparison result   │
│  7. Generate SEO metadata     │
│                               │
└───────────────────────────────┘
        ↓
Comparison Result
```

---

## 3. Comparison Logic

### 3.1 Unit Normalization

All specifications are stored in consistent units. No conversion needed at comparison time.

| Spec | Stored Unit | Display Format |
|------|-------------|----------------|
| Battery | mAh | "5,000 mAh" |
| Weight | grams | "232 g" |
| Screen size | inches | "6.9"" |
| RAM | GB | "12 GB" |
| Storage | GB/number | "256GB" |
| Price | USD | "$1,299" |
| Brightness | nits | "2,800 nits" |
| Dimensions | mm | "163.0 x 77.6 x 8.3 mm" |
| Refresh rate | Hz | "120 Hz" |

### 3.2 Difference Calculation

For each specification pair (Product A vs Product B):

```typescript
interface ComparisonResult {
  spec: string;
  productA: SpecValue;
  productB: SpecValue;
  difference: DifferenceType;
  significance: 'high' | 'medium' | 'low' | 'identical';
  interpretation: string | null;
}

type SpecValue = {
  value: string | number | boolean | null;
  display: string;              // Formatted for display
  unit: string | null;
}

type DifferenceType = 
  | 'higher'      // B is higher than A
  | 'lower'       // B is lower than A
  | 'larger'      // B is larger than A
  | 'smaller'     // B is smaller than A
  | 'different'   // Values differ but not comparable numerically
  | 'same'        // Values are the same
  | 'a_only'      // Only A has this value
  | 'b_only'      // Only B has this value
  | 'both_missing' // Neither has this value
```

### 3.3 Significance Thresholds

| Spec Type | High | Medium | Low | Identical |
|-----------|------|--------|-----|-----------|
| Battery (mAh) | >15% diff | 5-15% diff | 1-5% diff | <1% diff |
| Weight (g) | >15% diff | 5-15% diff | 1-5% diff | <1% diff |
| Screen size (inches) | >0.5" diff | 0.2-0.5" diff | 0.05-0.2" diff | <0.05" diff |
| Price (USD) | >$200 diff | $50-$200 diff | $10-$50 diff | <$10 diff |
| RAM (GB) | >4 GB diff | 2-4 GB diff | 1 GB diff | Same |
| Storage (GB) | >256 GB diff | 64-256 GB diff | 32-64 GB diff | Same |
| Brightness (nits) | >500 nits diff | 100-500 nits diff | 20-100 nits diff | <20 nits diff |
| Refresh rate (Hz) | >60 Hz diff | 30-60 Hz diff | 10-30 Hz diff | Same |
| Chipset | Always high | - | - | Same model |
| Camera MP | >100 MP diff | 20-100 MP diff | 5-20 MP diff | Same |

### 3.4 Interpretation Rules

The engine does NOT auto-generate interpretations. Interpretations are written per comparison pair.

**What the engine provides:**
- Raw values
- Difference calculations
- Significance ratings

**What humans write:**
- Practical interpretations
- Use-case recommendations
- Key differences narrative

---

## 4. Comparison Groups

Specifications are grouped into logical sections:

```typescript
const COMPARISON_GROUPS = [
  {
    id: 'overview',
    label: 'At a Glance',
    specs: ['releaseDate', 'status', 'msrp']
  },
  {
    id: 'display',
    label: 'Display',
    specs: [
      'display.size',
      'display.resolution',
      'display.panelType',
      'display.refreshRate',
      'display.peakBrightness',
      'display.hdr',
      'display.protection'
    ]
  },
  {
    id: 'performance',
    label: 'Performance',
    specs: [
      'performance.chipset',
      'performance.fabrication',
      'performance.ram',
      'performance.ramType',
      'performance.gpuModel',
      'performance.antutuScore',
      'performance.geekbenchSingle',
      'performance.geekbenchMulti'
    ]
  },
  {
    id: 'camera',
    label: 'Camera',
    specs: [
      'camera.main.mp',
      'camera.main.aperture',
      'camera.main.ois',
      'camera.main.features',
      'camera.ultrawide.mp',
      'camera.telephoto.mp',
      'camera.telephoto.opticalZoom',
      'camera.front.mp',
      'camera.video.maxResolution',
      'camera.video.maxFps',
      'camera.features'
    ]
  },
  {
    id: 'battery',
    label: 'Battery & Charging',
    specs: [
      'battery.capacity',
      'battery.type',
      'battery.wiredCharging',
      'battery.wirelessCharging',
      'battery.reverseWireless'
    ]
  },
  {
    id: 'design',
    label: 'Design & Build',
    specs: [
      'design.dimensions',
      'design.weight',
      'design.frameMaterial',
      'design.backMaterial',
      'design.waterResistance',
      'design.colors'
    ]
  },
  {
    id: 'storage',
    label: 'Storage',
    specs: [
      'storage.options',
      'storage.expandable',
      'storage.type'
    ]
  },
  {
    id: 'connectivity',
    label: 'Connectivity',
    specs: [
      'connectivity.fiveG',
      'connectivity.wifi',
      'connectivity.bluetooth',
      'connectivity.nfc',
      'connectivity.usb',
      'connectivity.simType',
      'connectivity.satellite'
    ]
  },
  {
    id: 'software',
    label: 'Software & AI',
    specs: [
      'software.osAtLaunch',
      'software.osSkin',
      'software.updateCommitment',
      'software.securityCommitment',
      'software.aiFeatures'
    ]
  }
];
```

---

## 5. Comparison Generation

### 5.1 Build-Time Generation (Static Pages)

For curated, indexable comparison pages:

```typescript
async function generateComparisonPage(
  comparisonSlug: string
): Promise<ComparisonPage> {
  // 1. Load comparison definition from comparisons/[slug].json
  // 2. Load all product data
  // 3. Run comparison engine
  // 4. Generate static HTML with embedded data
  // 5. Return complete page for SSG
}
```

### 5.2 Client-Side Generation (Interactive Tool)

For dynamic comparison tool:

```typescript
function generateComparisonResult(
  productA: Smartphone,
  productB: Smartphone,
  options: ComparisonOptions
): ComparisonResult {
  // 1. Compare each spec
  // 2. Calculate differences
  // 3. Determine significance
  // 4. Filter based on options (differences only)
  // 5. Return structured result
}
```

---

## 6. Comparison Options

```typescript
interface ComparisonOptions {
  showDifferencesOnly: boolean;  // Filter to only show significant differences
  groups: string[];               // Which spec groups to show
  highlightAdvantage: boolean;    // Color-code advantages
}
```

---

## 7. Comparison Result Output

```typescript
interface ComparisonPage {
  // SEO
  slug: string;
  title: string;
  metaDescription: string;
  canonical: string;
  
  // Products
  products: Smartphone[];
  
  // Comparison data
  groups: ComparisonGroup[];
  keyDifferences: KeyDifference[];
  practicalImplications: string;
  useCaseRecommendations: UseCaseRecommendation[];
  
  // Related
  relatedComparisons: ComparisonSummary[];
  relatedGuides: GuideSummary[];
  
  // Metadata
  lastUpdated: string;
  sources: Source[];
}

interface ComparisonGroup {
  id: string;
  label: string;
  specs: ComparisonRow[];
}

interface ComparisonRow {
  spec: string;
  label: string;
  productA: SpecDisplayValue;
  productB: SpecDisplayValue;
  difference: DifferenceType;
  significance: 'high' | 'medium' | 'low' | 'identical';
}

interface SpecDisplayValue {
  value: string | number | boolean | null;
  display: string;
  confidence: 'verified' | 'estimated' | 'unconfirmed';
  source: Source | null;
}
```

---

## 8. Differences-Only Filter

When `showDifferencesOnly` is true:

1. Iterate through all comparison rows
2. Filter out rows where `significance === 'identical'`
3. Keep rows where `significance` is 'high', 'medium', or 'low'
4. Sort by significance (high first)
5. Return filtered result

---

## 9. SEO Generation

For each curated comparison, the engine generates:

```typescript
interface ComparisonSEO {
  title: string;           // "[Product A] vs [Product B] — Specs & Differences | CompareForge"
  metaDescription: string; // 150-160 chars describing the comparison
  h1: string;              // "[Product A] vs [Product B]"
  ogTitle: string;         // Same as title
  ogDescription: string;   // Same as meta description
  ogImage: string;         // Comparison-specific OG image path
  structuredData: object;  // Product + BreadcrumbList + FAQPage
  canonical: string;       // Full canonical URL
  robots: string;          // "index, follow"
}
```

---

## 10. Edge Cases

### Same Product Selected

```typescript
if (productA.id === productB.id) {
  return {
    error: 'duplicate_product',
    message: 'Please select two different phones to compare.'
  };
}
```

### Different Categories

```typescript
if (productA.category !== productB.category) {
  return {
    error: 'different_categories',
    message: 'These phones cannot be compared as they are in different categories.'
  };
}
```

### Missing Data

```typescript
if (specA === null && specB === null) {
  return {
    value: null,
    display: '—',
    confidence: 'unconfirmed',
    source: null
  };
}
```

### One Value Missing

```typescript
if (specA !== null && specB === null) {
  return {
    value: specA,
    display: specADisplay,
    note: 'Only available for ' + productA.name,
    confidence: 'verified',
    source: sourceA
  };
}
```

---

*This specification defines the comparison engine logic for CompareForge. It is implementation-ready and should be used as the primary reference for building the comparison engine.*
