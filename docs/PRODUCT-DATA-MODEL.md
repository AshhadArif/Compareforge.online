# Product Data Model Specification

**Version:** 1.0
**Date:** September 23, 2026
**Status:** Implementation-Ready

---

## 1. Overview

This document defines the complete data model for CompareForge's smartphone product database. Every field is defined with data type, source requirements, validation rules, and display behavior.

---

## 2. Core Entities

### 2.1 Smartphone

The primary entity. Represents a single smartphone model.

```typescript
interface Smartphone {
  // Identity
  id: string;                    // Required. Unique identifier. e.g., "apple-iphone-18-pro-max"
  brand: string;                 // Required. e.g., "Apple"
  model: string;                 // Required. e.g., "iPhone 18 Pro Max"
  fullName: string;              // Required. e.g., "Apple iPhone 18 Pro Max"
  slug: string;                  // Required. URL-safe. Same as id.
  
  // Status
  status: ProductStatus;         // Required. Current market status
  releaseDate: string | null;    // Optional. ISO 8601 date. null if unconfirmed
  
  // Pricing
  pricing: PricingInfo;          // Required
  
  // Specifications
  display: DisplaySpecs;         // Required
  performance: PerformanceSpecs; // Required
  camera: CameraSpecs;           // Required
  battery: BatterySpecs;         // Required
  design: DesignSpecs;           // Required
  storage: StorageSpecs;         // Required
  connectivity: ConnectivitySpecs; // Required
  software: SoftwareSpecs;       // Required
  
  // Sources
  sources: Source[];             // Required. At least one source per major spec group
  
  // Metadata
  lastUpdated: string;           // Required. ISO 8601 datetime
  lastVerified: string;          // Required. ISO 8601 date
  notes: string | null;          // Optional. Internal notes about data quality
}

type ProductStatus = 'available' | 'discontinued' | 'announced' | 'upcoming';
```

### 2.2 PricingInfo

```typescript
interface PricingInfo {
  msrp: number | null;           // Base MSRP in USD. null if unconfirmed
  currency: string;              // ISO 4217. Always "USD" for now
  region: string;                // Always "US" for now
  variants: StorageVariant[];    // Required. At least one variant
}

interface StorageVariant {
  storage: string;               // e.g., "256GB", "512GB", "1TB"
  ram: string;                   // e.g., "8GB", "12GB"
  price: number | null;          // Price in USD. null if unconfirmed
}
```

### 2.3 DisplaySpecs

```typescript
interface DisplaySpecs {
  size: number | null;           // Inches. e.g., 6.9
  resolution: string | null;     // e.g., "1320 x 2868"
  panelType: string | null;      // e.g., "OLED", "AMOLED", "LCD"
  refreshRate: number | null;    // Hz. e.g., 120
  peakBrightness: number | null; // Nits. e.g., 2800
  hdr: boolean | null;           // null if unknown
  protection: string | null;     // e.g., "Gorilla Glass Armor 2", "Ceramic Shield"
  ppi: number | null;            // Pixels per inch. Calculated or provided
}
```

### 2.4 PerformanceSpecs

```typescript
interface PerformanceSpecs {
  chipset: string | null;        // e.g., "Apple A20 Pro", "Snapdragon 8 Elite Gen 5"
  fabrication: string | null;    // e.g., "2nm", "3nm"
  cpuCores: number | null;       // e.g., 6
  cpuConfig: string | null;      // e.g., "2 performance + 4 efficiency"
  gpuModel: string | null;       // e.g., "Apple 7-core GPU", "Adreno 830"
  ram: number | null;            // GB. e.g., 8
  ramType: string | null;        // e.g., "LPDDR5X"
  antutuScore: number | null;    // Benchmark score. null if not tested
  geekbenchSingle: number | null; // Single-core score
  geekbenchMulti: number | null;  // Multi-core score
}
```

### 2.5 CameraSpecs

```typescript
interface CameraSpecs {
  main: CameraLens;              // Required
  ultrawide: CameraLens | null;  // Optional
  telephoto: CameraLens | null;  // Optional
  front: CameraLens | null;      // Optional
  video: VideoSpecs | null;      // Optional
  features: string[];            // e.g., ["Night Mode", "ProRes", "8K Video"]
}

interface CameraLens {
  mp: number | null;             // Megapixels
  aperture: string | null;       // e.g., "f/1.48-f/4.0"
  ois: boolean | null;           // Optical Image Stabilization
  opticalZoom: number | null;    // e.g., 4 (for 4x optical)
  maxZoom: number | null;        // e.g., 25 (for 25x digital)
  fov: number | null;            // Field of view in degrees
  sensorSize: string | null;     // e.g., "1/1.28""
  features: string[];            // e.g., ["variable aperture", "autofocus"]
}

interface VideoSpecs {
  maxResolution: string | null;  // e.g., "8K", "4K"
  maxFps: number | null;         // e.g., 120
  features: string[];            // e.g., ["Cinematic Mode", "ProRes", "HDR Video"]
}
```

### 2.6 BatterySpecs

```typescript
interface BatterySpecs {
  capacity: number | null;       // mAh. e.g., 5000
  type: string | null;           // e.g., "Li-Po", "Silicon-Carbon"
  wiredCharging: number | null;  // Watts. e.g., 60
  wirelessCharging: number | null; // Watts. e.g., 25
  reverseWireless: boolean | null; // null if unknown
}
```

### 2.7 DesignSpecs

```typescript
interface DesignSpecs {
  dimensions: Dimensions | null;
  weight: number | null;         // Grams. e.g., 227
  frameMaterial: string | null;  // e.g., "Titanium", "Aluminum"
  backMaterial: string | null;   // e.g., "Glass", "Ceramic"
  waterResistance: string | null; // e.g., "IP68", "IPX8"
  dustResistance: string | null; // e.g., "IP6X", "Not rated"
  colors: string[];              // e.g., ["Black", "Silver", "Blue"]
}

interface Dimensions {
  height: number | null;  // mm
  width: number | null;   // mm
  depth: number | null;   // mm
}
```

### 2.8 StorageSpecs

```typescript
interface StorageSpecs {
  options: string[];             // e.g., ["128GB", "256GB", "512GB", "1TB"]
  expandable: boolean | null;    // MicroSD support
  type: string | null;           // e.g., "UFS 4.0", "NVMe"
}
```

### 2.9 ConnectivitySpecs

```typescript
interface ConnectivitySpecs {
  fiveG: boolean | null;
  wifi: string | null;           // e.g., "WiFi 7", "WiFi 6E"
  bluetooth: string | null;      // e.g., "5.4", "5.3"
  nfc: boolean | null;
  usb: string | null;            // e.g., "USB-C 3.2", "USB-C 2.0"
  simType: string | null;        // e.g., "Nano-SIM + eSIM", "Dual eSIM"
  satellite: boolean | null;     // Satellite connectivity
  irBlaster: boolean | null;     // Infrared blaster
}
```

### 2.10 SoftwareSpecs

```typescript
interface SoftwareSpecs {
  osAtLaunch: string | null;     // e.g., "iOS 27", "Android 16"
  osSkin: string | null;         // e.g., "One UI 8.5", "Pixel UI"
  updateCommitment: number | null; // Years of OS updates
  securityCommitment: number | null; // Years of security updates
  aiFeatures: string[];          // e.g., ["Apple Intelligence", "Siri AI"]
}
```

### 2.11 Source

```typescript
interface Source {
  field: string;                 // Which field this source supports. e.g., "display.size"
  url: string;                   // Source URL
  siteName: string;              // e.g., "Apple", "GSMArena"
  dateAccessed: string;          // ISO 8601 date
  confidence: SourceConfidence;
}

type SourceConfidence = 'verified' | 'estimated' | 'unconfirmed';
```

---

## 3. Comparison Entity

```typescript
interface Comparison {
  id: string;                    // e.g., "iphone-18-pro-max-vs-galaxy-s26-ultra"
  products: string[];            // Array of product IDs. [2-4 products]
  category: string;              // "smartphones"
  slug: string;                  // URL-safe. Same as id.
  
  // SEO
  title: string;                 // e.g., "iPhone 18 Pro Max vs Samsung Galaxy S26 Ultra"
  metaDescription: string;       // 150-160 chars
  canonical: string;             // Full canonical URL
  
  // Content
  intro: string;                 // 2-3 sentence introduction
  keyDifferences: KeyDifference[];
  practicalImplications: string; // Paragraph explaining real-world impact
  useCaseRecommendations: UseCaseRecommendation[];
  
  // Related
  relatedComparisons: string[];  // Array of comparison IDs
  relatedGuides: string[];       // Array of guide slugs
  
  // Metadata
  lastUpdated: string;
  isCurated: boolean;            // true = manually created, false = auto-generated
}

interface KeyDifference {
  feature: string;               // e.g., "Main Camera"
  productAValue: string;         // e.g., "48 MP"
  productBValue: string;         // e.g., "200 MP"
  significance: DifferenceSignificance;
  interpretation: string;        // Practical explanation
}

type DifferenceSignificance = 'high' | 'medium' | 'low';

interface UseCaseRecommendation {
  scenario: string;              // e.g., "Video recording"
  recommended: string;           // Product ID
  reason: string;                // Why this product
}
```

---

## 4. Guide Entity

```typescript
interface Guide {
  id: string;                    // e.g., "foldable-phone-buying-guide-2026"
  title: string;                 // e.g., "Foldable Phone Buying Guide 2026"
  slug: string;                  // URL-safe
  metaDescription: string;
  
  // Content
  content: string;               // Markdown content
  
  // Relationships
  relatedComparisons: string[];  // Comparison IDs
  relatedProducts: string[];     // Product IDs
  relatedGuides: string[];       // Other guide IDs
  
  // Metadata
  lastUpdated: string;
  category: string;              // Primary topic category
  tags: string[];                // e.g., ["foldable", "buying guide", "2026"]
}
```

---

## 5. Category Entity

```typescript
interface Category {
  id: string;                    // e.g., "smartphones"
  name: string;                  // e.g., "Smartphones"
  slug: string;                  // URL-safe
  description: string;
  icon: string;                  // Icon identifier or SVG path
  
  // Relationships
  parentCategory: string | null; // For subcategories
  subcategories: string[];
  
  // Stats
  productCount: number;
  comparisonCount: number;
  guideCount: number;
}
```

---

## 6. Brand Entity

```typescript
interface Brand {
  id: string;                    // e.g., "apple"
  name: string;                  // e.g., "Apple"
  slug: string;
  logo: string;                  // Path to logo SVG/PNG
  website: string;               // Official website URL
  
  // Stats
  productCount: number;
}
```

---

## 7. Field Requirements Matrix

| Field | Required | Source | Validation | Update Freq | Display |
|-------|----------|--------|------------|-------------|---------|
| id | YES | Generated | Unique, slug format | Never | Hidden |
| brand | YES | Manufacturer | Known brand | On release | Always |
| model | YES | Manufacturer | Non-empty | On release | Always |
| fullName | YES | Generated | Brand + Model | On release | Always |
| status | YES | Market data | Valid enum | Monthly | Badge |
| releaseDate | NO | Manufacturer | Valid date or null | On release | If available |
| pricing.msrp | NO | Manufacturer/retailer | Positive number or null | Monthly | If available |
| pricing.variants | YES | Manufacturer | At least one | On release | Always |
| display.size | NO | Manufacturer | 4.0-8.5 inches | On release | If available |
| display.resolution | NO | Manufacturer | Valid format | On release | If available |
| display.panelType | NO | Manufacturer | Known type | On release | If available |
| display.refreshRate | NO | Manufacturer | 30-240 Hz | On release | If available |
| display.peakBrightness | NO | Manufacturer/RTINGS | 500-6000 nits | On release | If available |
| performance.chipset | NO | Manufacturer | Non-empty | On release | If available |
| performance.ram | NO | Manufacturer | 1-32 GB | On release | If available |
| camera.main.mp | NO | Manufacturer | 1-400 MP | On release | If available |
| camera.main.aperture | NO | Manufacturer | f/x.x format | On release | If available |
| battery.capacity | NO | Manufacturer | 1000-10000 mAh | On release | If available |
| battery.wiredCharging | NO | Manufacturer | 5-300 W | On release | If available |
| design.weight | NO | Manufacturer | 100-400 g | On release | If available |
| design.dimensions | NO | Manufacturer | Valid mm values | On release | If available |
| design.waterResistance | NO | Manufacturer | IP rating format | On release | If available |
| storage.options | NO | Manufacturer | At least one | On release | If available |
| connectivity.fiveG | NO | Manufacturer | Boolean | On release | If available |
| software.osAtLaunch | NO | Manufacturer | Non-empty | On release | If available |
| software.updateCommitment | NO | Manufacturer | 1-10 years | On release | If available |
| sources | YES | Manual | At least one | On data entry | Methodology page |

---

## 8. Data Storage

### File Structure

```
src/data/
├── smartphones/
│   ├── apple/
│   │   ├── iphone-18-pro-max.json
│   │   ├── iphone-18-pro.json
│   │   ├── iphone-18.json
│   │   ├── iphone-duo.json
│   │   └── iphone-17e.json
│   ├── samsung/
│   │   ├── galaxy-s26-ultra.json
│   │   ├── galaxy-s26.json
│   │   ├── galaxy-z-fold-8.json
│   │   ├── galaxy-z-flip-8.json
│   │   └── galaxy-a17-5g.json
│   ├── google/
│   │   ├── pixel-11-pro-xl.json
│   │   ├── pixel-11-pro.json
│   │   ├── pixel-10a.json
│   │   └── pixel-11-pro-fold.json
│   ├── oneplus/
│   │   └── oneplus-15.json
│   ├── motorola/
│   │   ├── razr-fold.json
│   │   ├── razr-2026.json
│   │   └── moto-g-power-2026.json
│   └── xiaomi/
│       └── xiaomi-17-pro-max.json
├── brands.json
├── categories.json
├── comparisons/
│   ├── iphone-18-pro-max-vs-galaxy-s26-ultra.json
│   └── ...
├── guides/
│   ├── foldable-phone-buying-guide-2026.json
│   └── ...
└── index.json                    # Master index of all products
```

### Index File Structure

```json
{
  "smartphones": {
    "apple": ["iphone-18-pro-max", "iphone-18-pro", "iphone-18", "iphone-duo", "iphone-17e"],
    "samsung": ["galaxy-s26-ultra", "galaxy-s26", "galaxy-z-fold-8", "galaxy-z-flip-8", "galaxy-a17-5g"],
    "google": ["pixel-11-pro-xl", "pixel-11-pro", "pixel-10a", "pixel-11-pro-fold"],
    "oneplus": ["oneplus-15"],
    "motorola": ["razr-fold", "razr-2026", "moto-g-power-2026"],
    "xiaomi": ["xiaomi-17-pro-max"]
  },
  "comparisons": ["iphone-18-pro-max-vs-galaxy-s26-ultra", ...],
  "guides": ["foldable-phone-buying-guide-2026", ...],
  "lastUpdated": "2026-09-23"
}
```

---

## 9. Data Access Patterns

### Load All Products (for product selector)

```typescript
// Build time: Generate from index.json + individual files
// Runtime: Client-side search against pre-built index
const allProducts: Smartphone[] = // loaded at build time
```

### Search Products (for autocomplete)

```typescript
function searchProducts(query: string): Smartphone[] {
  // Search against: fullName, model, brand
  // Case-insensitive, partial match
  // Return top 8 results
  // Sort by: relevance (exact match > partial match > brand match)
}
```

### Load Comparison (for comparison page)

```typescript
async function loadComparison(slug: string): Promise<ComparisonPage> {
  // Load comparison definition
  // Load all product data for comparison
  // Generate comparison result
  // Return complete page data
}
```

### Load Product (for product page)

```typescript
async function loadProduct(slug: string): Promise<Smartphone> {
  // Load single product file
  // Return product data
}
```

---

## 10. Validation Rules

### Product Validation

1. `id` must be unique across all products
2. `brand` must exist in brands.json
3. `model` must be non-empty
4. `fullName` must be `brand + " " + model`
5. `status` must be one of: 'available', 'discontinued', 'announced', 'upcoming'
6. At least one `pricing.variants` entry required
7. At least one source required per major spec group (display, performance, camera, battery, design)

### Specification Validation

1. Numeric values must be positive when not null
2. Display size must be between 4.0 and 8.5 inches
3. Weight must be between 100 and 400 grams
4. Battery capacity must be between 1000 and 10000 mAh
5. RAM must be between 1 and 32 GB
6. Refresh rate must be between 30 and 240 Hz
7. Peak brightness must be between 500 and 6000 nits

### Comparison Validation

1. Must have exactly 2-4 products
2. All product IDs must exist in database
3. No duplicate products in same comparison
4. All products must be in same category
5. `keyDifferences` must have 3-10 entries
6. `useCaseRecommendations` must have 2-5 entries

---

## 11. Source Verification Rules

### Source Priority

1. **Manufacturer official specs** (highest confidence)
2. **GSMArena** (verified specifications database)
3. **Notebookcheck** (independent testing)
4. **RTINGS** (independent testing)
5. **Major tech publications** (Tom's Guide, TechRadar, CNET)
6. **Retailer listings** (for pricing)

### Confidence Levels

- **verified:** Confirmed by manufacturer or multiple reliable sources
- **estimated:** Based on reliable sources but not officially confirmed
- **unconfirmed:** Single source or unverified report

### Conflict Resolution

1. If sources conflict, use manufacturer data as primary
2. Note the discrepancy in the source
3. If unresolvable, mark as "Conflicting reports — see sources"
4. Never silently choose one value over another

### Missing Data Rules

1. Never fill with AI-generated estimates
2. Never fill with "similar" product data
3. Show as null/undefined in data
4. Display as "—" (dash) with tooltip "Not yet verified"
5. Log missing data for future research

---

## 12. Update Frequency

| Data Type | Update Trigger | Process |
|-----------|---------------|---------|
| New product | New phone announced | Manual data entry + source verification |
| Pricing | Monthly check | Verify MSRP, update if changed |
| Availability | Product launch/discontinuation | Update status field |
| Specifications | New information discovered | Verify sources, update fields |
| Benchmarks | New benchmark results | Update if from reliable source |
| Discontinued | Product end-of-life | Update status, add discontinuation date |

---

*This data model defines the complete structure for CompareForge's smartphone product database. It is implementation-ready and should be used as the primary reference for building the data layer.*
