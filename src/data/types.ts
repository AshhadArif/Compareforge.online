// ============================================
// Core Product Types
// ============================================

export type ProductStatus = "available" | "discontinued" | "announced" | "upcoming";

export type SourceConfidence = "verified" | "estimated" | "unconfirmed";

export interface Source {
  field: string;
  url: string;
  siteName: string;
  dateAccessed: string;
  confidence: SourceConfidence;
}

export interface StorageVariant {
  storage: string;
  ram: string;
  price: number | null;
}

export interface PricingInfo {
  msrp: number | null;
  currency: string;
  region: string;
  variants: StorageVariant[];
}

export interface DisplaySpecs {
  size: number | null;
  resolution: string | null;
  panelType: string | null;
  refreshRate: number | null;
  peakBrightness: number | null;
  hdr: boolean | null;
  protection: string | null;
}

export interface PerformanceSpecs {
  chipset: string | null;
  fabrication: string | null;
  cpuCores: number | null;
  gpuModel: string | null;
  ram: number | null;
  ramType: string | null;
}

export interface CameraLens {
  mp: number | null;
  aperture: string | null;
  ois: boolean | null;
  opticalZoom: number | null;
  maxZoom: number | null;
  features: string[];
}

export interface VideoSpecs {
  maxResolution: string | null;
  maxFps: number | null;
  features: string[];
}

export interface CameraSpecs {
  main: CameraLens;
  ultrawide: CameraLens | null;
  telephoto: CameraLens | null;
  front: CameraLens | null;
  video: VideoSpecs | null;
  features: string[];
}

export interface BatterySpecs {
  capacity: number | null;
  type: string | null;
  wiredCharging: number | null;
  wirelessCharging: number | null;
  reverseWireless: boolean | null;
}

export interface Dimensions {
  height: number | null;
  width: number | null;
  depth: number | null;
}

export interface DesignSpecs {
  dimensions: Dimensions | null;
  weight: number | null;
  frameMaterial: string | null;
  backMaterial: string | null;
  waterResistance: string | null;
  colors: string[];
}

export interface StorageSpecs {
  options: string[];
  expandable: boolean | null;
  type: string | null;
}

export interface ConnectivitySpecs {
  fiveG: boolean | null;
  wifi: string | null;
  bluetooth: string | null;
  nfc: boolean | null;
  usb: string | null;
  simType: string | null;
  satellite: boolean | null;
}

export interface SoftwareSpecs {
  osAtLaunch: string | null;
  osSkin: string | null;
  updateCommitment: number | null;
  securityCommitment: number | null;
  aiFeatures: string[];
}

export interface Smartphone {
  id: string;
  brand: string;
  model: string;
  fullName: string;
  slug: string;
  category: string;
  status: ProductStatus;
  releaseDate: string | null;
  pricing: PricingInfo;
  display: DisplaySpecs;
  performance: PerformanceSpecs;
  camera: CameraSpecs;
  battery: BatterySpecs;
  design: DesignSpecs;
  storage: StorageSpecs;
  connectivity: ConnectivitySpecs;
  software: SoftwareSpecs;
  sources: Source[];
  lastUpdated: string;
  lastVerified: string;
  summary: string;
}

// ============================================
// Comparison Types
// ============================================

export type DifferenceSignificance = "high" | "medium" | "low" | "identical";

export type DifferenceType =
  | "higher"
  | "lower"
  | "larger"
  | "smaller"
  | "different"
  | "same"
  | "a_only"
  | "b_only"
  | "both_missing";

export interface KeyDifference {
  feature: string;
  productAValue: string;
  productBValue: string;
  significance: DifferenceSignificance;
  interpretation: string;
}

export interface UseCaseRecommendation {
  scenario: string;
  recommended: string;
  reason: string;
}

export interface Comparison {
  id: string;
  slug: string;
  productIds: string[];
  title: string;
  metaDescription: string;
  category: string;
  intro: string;
  quickVerdict: string;
  keyDifferences: KeyDifference[];
  practicalImplications: string;
  useCaseRecommendations: UseCaseRecommendation[];
  considerations: string[];
  faq: { question: string; answer: string }[];
  relatedComparisonSlugs: string[];
  relatedGuideSlugs: string[];
  isRoundup: boolean;
  lastUpdated: string;
}

// ============================================
// Guide Types
// ============================================

export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  relatedComparisonSlugs: string[];
  relatedProductSlugs: string[];
  lastUpdated: string;
}

// ============================================
// Category Types
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// ============================================
// Brand Types
// ============================================

export interface Brand {
  id: string;
  name: string;
  slug: string;
  website: string;
}

// ============================================
// Comparison Engine Types
// ============================================

export interface SpecValue {
  value: string | number | boolean | null;
  display: string;
}

export interface ComparisonRow {
  spec: string;
  label: string;
  group: string;
  productA: SpecValue;
  productB: SpecValue;
  difference: DifferenceType;
  significance: DifferenceSignificance;
}

export interface ComparisonGroup {
  id: string;
  label: string;
  rows: ComparisonRow[];
}

export interface ComparisonResult {
  groups: ComparisonGroup[];
  hasDifferences: boolean;
}

export interface ComparisonOptions {
  showDifferencesOnly: boolean;
}
