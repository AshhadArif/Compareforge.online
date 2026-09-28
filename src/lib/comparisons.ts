import {
  Comparison,
  ComparisonGroup,
  ComparisonResult,
  ComparisonRow,
  ComparisonOptions,
  DifferenceSignificance,
  DifferenceType,
  Smartphone,
  SpecValue,
} from "@/data/types";

import cmpIphoneGalaxy from "@/data/comparisons/apple-iphone-18-pro-max-vs-samsung-galaxy-s26-ultra.json";
import cmpIphonePixel from "@/data/comparisons/apple-iphone-18-pro-max-vs-google-pixel-11-pro-xl.json";
import cmpGalaxyPixel from "@/data/comparisons/samsung-galaxy-s26-ultra-vs-google-pixel-11-pro-xl.json";
import cmpPixelIphone from "@/data/comparisons/google-pixel-10a-vs-apple-iphone-17e.json";
import cmpDuoFold from "@/data/comparisons/apple-iphone-duo-vs-samsung-galaxy-z-fold-8.json";
import cmpFoldRazr from "@/data/comparisons/samsung-galaxy-z-fold-8-vs-motorola-razr-fold.json";
import cmpBestBudget from "@/data/comparisons/best-phones-under-500-2026.json";
import cmpBestFoldable from "@/data/comparisons/best-foldable-phones-2026.json";
import cmpBestFlagship from "@/data/comparisons/best-flagship-phones-2026.json";
import cmpAiSystems from "@/data/comparisons/apple-intelligence-vs-galaxy-ai-vs-gemini.json";
import cmpAppleIphone16ProMaxVsAppleIphone18ProMax from "@/data/comparisons/apple-iphone-16-pro-max-vs-apple-iphone-18-pro-max.json";
import cmpAppleIphone16eVsGooglePixel9a from "@/data/comparisons/apple-iphone-16e-vs-google-pixel-9a.json";
import cmpGooglePixel9ProVsAppleIphone16ProMax from "@/data/comparisons/google-pixel-9-pro-vs-apple-iphone-16-pro-max.json";
import cmpGooglePixel9ProVsSamsungGalaxyS25 from "@/data/comparisons/google-pixel-9-pro-vs-samsung-galaxy-s25.json";
import cmpNothingPhone3aVsGooglePixel9a from "@/data/comparisons/nothing-phone-3a-vs-google-pixel-9a.json";
import cmpOneplus13VsSamsungGalaxyS25Ultra from "@/data/comparisons/oneplus-13-vs-samsung-galaxy-s25-ultra.json";
import cmpSamsungGalaxyA565gVsGooglePixel9a from "@/data/comparisons/samsung-galaxy-a56-5g-vs-google-pixel-9a.json";
import cmpSamsungGalaxyS25UltraVsAppleIphone16ProMax from "@/data/comparisons/samsung-galaxy-s25-ultra-vs-apple-iphone-16-pro-max.json";
import cmpSamsungGalaxyZFlip6VsMotorolaMotoRazrPlus2024 from "@/data/comparisons/samsung-galaxy-z-flip-6-vs-motorola-moto-razr-plus-2024.json";
import cmpSamsungGalaxyZFold6VsOneplusOpen from "@/data/comparisons/samsung-galaxy-z-fold-6-vs-oneplus-open.json";

export const comparisons: Comparison[] = [
  cmpIphoneGalaxy as Comparison,
  cmpIphonePixel as Comparison,
  cmpGalaxyPixel as Comparison,
  cmpPixelIphone as Comparison,
  cmpDuoFold as Comparison,
  cmpFoldRazr as Comparison,
  cmpBestBudget as Comparison,
  cmpBestFoldable as Comparison,
  cmpBestFlagship as Comparison,
  cmpAiSystems as Comparison,
  cmpAppleIphone16ProMaxVsAppleIphone18ProMax as Comparison,
  cmpAppleIphone16eVsGooglePixel9a as Comparison,
  cmpGooglePixel9ProVsAppleIphone16ProMax as Comparison,
  cmpGooglePixel9ProVsSamsungGalaxyS25 as Comparison,
  cmpNothingPhone3aVsGooglePixel9a as Comparison,
  cmpOneplus13VsSamsungGalaxyS25Ultra as Comparison,
  cmpSamsungGalaxyA565gVsGooglePixel9a as Comparison,
  cmpSamsungGalaxyS25UltraVsAppleIphone16ProMax as Comparison,
  cmpSamsungGalaxyZFlip6VsMotorolaMotoRazrPlus2024 as Comparison,
  cmpSamsungGalaxyZFold6VsOneplusOpen as Comparison,
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonsByCategory(categorySlug: string): Comparison[] {
  return comparisons.filter((c) => c.category === categorySlug);
}

export function getRelatedComparisons(currentSlug: string, limit = 3): Comparison[] {
  const current = getComparisonBySlug(currentSlug);
  if (!current) return [];
  const related = current.relatedComparisonSlugs
    .map((slug) => getComparisonBySlug(slug))
    .filter((c): c is Comparison => Boolean(c) && c!.slug !== currentSlug);
  if (related.length >= limit) return related.slice(0, limit);
  const sameCategory = comparisons
    .filter(
      (c) =>
        c.slug !== currentSlug &&
        c.category === current.category &&
        !related.some((r) => r.slug === c.slug)
    )
    .slice(0, limit - related.length);
  return [...related, ...sameCategory].slice(0, limit);
}

// ============================================
// Comparison Engine
// ============================================

interface SpecDefinition {
  key: string;
  label: string;
  group: string;
  type: "number" | "text" | "boolean" | "list";
  unit?: string;
  higherIsBetter?: boolean;
}

const SPEC_DEFINITIONS: SpecDefinition[] = [
  { key: "releaseDate", label: "Release Date", group: "overview", type: "text" },
  { key: "status", label: "Status", group: "overview", type: "text" },
  { key: "msrp", label: "Starting Price", group: "overview", type: "number", unit: "USD" },
  { key: "display.size", label: "Display Size", group: "display", type: "number", unit: "inches" },
  { key: "display.resolution", label: "Resolution", group: "display", type: "text" },
  { key: "display.panelType", label: "Panel Type", group: "display", type: "text" },
  { key: "display.refreshRate", label: "Refresh Rate", group: "display", type: "number", unit: "Hz", higherIsBetter: true },
  { key: "display.peakBrightness", label: "Peak Brightness", group: "display", type: "number", unit: "nits", higherIsBetter: true },
  { key: "display.hdr", label: "HDR", group: "display", type: "boolean" },
  { key: "display.protection", label: "Protection", group: "display", type: "text" },
  { key: "performance.chipset", label: "Chipset", group: "performance", type: "text" },
  { key: "performance.fabrication", label: "Fabrication", group: "performance", type: "text" },
  { key: "performance.cpuCores", label: "CPU Cores", group: "performance", type: "number", higherIsBetter: true },
  { key: "performance.gpuModel", label: "GPU", group: "performance", type: "text" },
  { key: "performance.ram", label: "RAM", group: "performance", type: "number", unit: "GB", higherIsBetter: true },
  { key: "performance.ramType", label: "RAM Type", group: "performance", type: "text" },
  { key: "camera.main.mp", label: "Main Camera", group: "camera", type: "number", unit: "MP", higherIsBetter: true },
  { key: "camera.main.aperture", label: "Main Aperture", group: "camera", type: "text" },
  { key: "camera.ultrawide.mp", label: "Ultrawide", group: "camera", type: "number", unit: "MP" },
  { key: "camera.telephoto.mp", label: "Telephoto", group: "camera", type: "number", unit: "MP" },
  { key: "camera.telephoto.opticalZoom", label: "Optical Zoom", group: "camera", type: "number", unit: "x", higherIsBetter: true },
  { key: "camera.front.mp", label: "Front Camera", group: "camera", type: "number", unit: "MP", higherIsBetter: true },
  { key: "camera.video.maxResolution", label: "Max Video", group: "camera", type: "text" },
  { key: "camera.video.maxFps", label: "Max FPS", group: "camera", type: "number", higherIsBetter: true },
  { key: "battery.capacity", label: "Battery Capacity", group: "battery", type: "number", unit: "mAh", higherIsBetter: true },
  { key: "battery.wiredCharging", label: "Wired Charging", group: "battery", type: "number", unit: "W", higherIsBetter: true },
  { key: "battery.wirelessCharging", label: "Wireless Charging", group: "battery", type: "number", unit: "W", higherIsBetter: true },
  { key: "battery.reverseWireless", label: "Reverse Wireless", group: "battery", type: "boolean" },
  { key: "design.weight", label: "Weight", group: "design", type: "number", unit: "g" },
  { key: "design.frameMaterial", label: "Frame", group: "design", type: "text" },
  { key: "design.backMaterial", label: "Back", group: "design", type: "text" },
  { key: "design.waterResistance", label: "Water Resistance", group: "design", type: "text" },
  { key: "design.colors", label: "Colors", group: "design", type: "list" },
  { key: "storage.options", label: "Storage Options", group: "storage", type: "list" },
  { key: "storage.expandable", label: "Expandable", group: "storage", type: "boolean" },
  { key: "storage.type", label: "Storage Type", group: "storage", type: "text" },
  { key: "connectivity.fiveG", label: "5G", group: "connectivity", type: "boolean" },
  { key: "connectivity.wifi", label: "Wi-Fi", group: "connectivity", type: "text" },
  { key: "connectivity.bluetooth", label: "Bluetooth", group: "connectivity", type: "text" },
  { key: "connectivity.nfc", label: "NFC", group: "connectivity", type: "boolean" },
  { key: "connectivity.usb", label: "USB", group: "connectivity", type: "text" },
  { key: "connectivity.satellite", label: "Satellite", group: "connectivity", type: "boolean" },
  { key: "software.osAtLaunch", label: "OS at Launch", group: "software", type: "text" },
  { key: "software.osSkin", label: "UI Skin", group: "software", type: "text" },
  { key: "software.updateCommitment", label: "OS Updates", group: "software", type: "number", unit: "years", higherIsBetter: true },
  { key: "software.securityCommitment", label: "Security Updates", group: "software", type: "number", unit: "years", higherIsBetter: true },
  { key: "software.aiFeatures", label: "AI Features", group: "software", type: "list" },
];

const GROUP_LABELS: Record<string, string> = {
  overview: "At a Glance",
  display: "Display",
  performance: "Performance",
  camera: "Camera",
  battery: "Battery & Charging",
  design: "Design & Build",
  storage: "Storage",
  connectivity: "Connectivity",
  software: "Software & AI",
};

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

function formatValue(
  value: unknown,
  type: SpecDefinition["type"],
  unit?: string
): string {
  if (value === null || value === undefined) return "—";
  if (type === "boolean") return value ? "Yes" : "No";
  if (type === "list") {
    const arr = value as string[];
    if (!Array.isArray(arr) || arr.length === 0) return "—";
    return arr.join(", ");
  }
  if (type === "number") {
    const n = value as number;
    if (unit === "USD") return `$${n.toLocaleString()}`;
    if (unit === "inches") return `${n}"`;
    return `${n.toLocaleString()}${unit ? ` ${unit}` : ""}`;
  }
  return String(value);
}

function getSpecValue(product: Smartphone, def: SpecDefinition): SpecValue {
  let raw: unknown;
  if (def.key === "releaseDate") raw = product.releaseDate;
  else if (def.key === "status") raw = product.status;
  else if (def.key === "msrp") raw = product.pricing.msrp;
  else raw = getNestedValue(product, def.key);

  return {
    value: (raw ?? null) as SpecValue["value"],
    display: formatValue(raw, def.type, def.unit),
  };
}

function calculateDifference(
  a: SpecValue,
  b: SpecValue,
  def: SpecDefinition
): { difference: DifferenceType; significance: DifferenceSignificance } {
  if (a.value === null && b.value === null) {
    return { difference: "both_missing", significance: "identical" };
  }
  if (a.value === null) return { difference: "b_only", significance: "high" };
  if (b.value === null) return { difference: "a_only", significance: "high" };

  if (def.type === "number" && typeof a.value === "number" && typeof b.value === "number") {
    const diff = Math.abs(b.value - a.value);
    const avg = (Math.abs(a.value) + Math.abs(b.value)) / 2;
    const pct = avg > 0 ? (diff / avg) * 100 : 0;

    if (b.value === a.value) {
      return { difference: "same", significance: "identical" };
    }

    let significance: DifferenceSignificance;
    if (def.key === "msrp") {
      if (diff > 200) significance = "high";
      else if (diff >= 50) significance = "medium";
      else if (diff >= 10) significance = "low";
      else significance = "identical";
    } else if (def.key === "display.size") {
      if (diff > 0.5) significance = "high";
      else if (diff >= 0.2) significance = "medium";
      else if (diff >= 0.05) significance = "low";
      else significance = "identical";
    } else if (def.key === "performance.ram") {
      if (diff > 4) significance = "high";
      else if (diff >= 2) significance = "medium";
      else if (diff >= 1) significance = "low";
      else significance = "identical";
    } else if (def.key === "display.peakBrightness") {
      if (diff > 500) significance = "high";
      else if (diff >= 100) significance = "medium";
      else if (diff >= 20) significance = "low";
      else significance = "identical";
    } else if (def.key === "design.weight") {
      if (pct > 15) significance = "high";
      else if (pct >= 5) significance = "medium";
      else if (pct >= 1) significance = "low";
      else significance = "identical";
    } else if (def.key === "battery.capacity") {
      if (pct > 15) significance = "high";
      else if (pct >= 5) significance = "medium";
      else if (pct >= 1) significance = "low";
      else significance = "identical";
    } else if (def.key === "camera.main.mp") {
      if (diff > 100) significance = "high";
      else if (diff >= 20) significance = "medium";
      else if (diff >= 5) significance = "low";
      else significance = "identical";
    } else {
      if (pct > 15) significance = "high";
      else if (pct >= 5) significance = "medium";
      else if (pct > 0) significance = "low";
      else significance = "identical";
    }

    if (significance === "identical") {
      return { difference: "same", significance: "identical" };
    }
    const isHigher = b.value > a.value;
    const diffType: DifferenceType =
      def.key === "display.size"
        ? isHigher
          ? "larger"
          : "smaller"
        : isHigher
          ? "higher"
          : "lower";
    return { difference: diffType, significance };
  }

  const aStr = JSON.stringify(a.value);
  const bStr = JSON.stringify(b.value);
  if (aStr === bStr) {
    return { difference: "same", significance: "identical" };
  }
  return { difference: "different", significance: "high" };
}

export function generateComparisonResult(
  productA: Smartphone,
  productB: Smartphone,
  options: ComparisonOptions = { showDifferencesOnly: false }
): ComparisonResult {
  const groups: ComparisonGroup[] = [];
  const groupMap = new Map<string, ComparisonRow[]>();

  for (const def of SPEC_DEFINITIONS) {
    const valueA = getSpecValue(productA, def);
    const valueB = getSpecValue(productB, def);
    const { difference, significance } = calculateDifference(valueA, valueB, def);

    if (options.showDifferencesOnly && significance === "identical") continue;

    const row: ComparisonRow = {
      spec: def.key,
      label: def.label,
      group: def.group,
      productA: valueA,
      productB: valueB,
      difference,
      significance,
    };

    if (!groupMap.has(def.group)) groupMap.set(def.group, []);
    groupMap.get(def.group)!.push(row);
  }

  for (const [groupId, rows] of groupMap) {
    if (rows.length > 0) {
      groups.push({ id: groupId, label: GROUP_LABELS[groupId] ?? groupId, rows });
    }
  }

  return {
    groups,
    hasDifferences: groups.some((g) => g.rows.some((r) => r.significance !== "identical")),
  };
}

export function validateComparison(
  productA: Smartphone,
  productB: Smartphone
): { valid: boolean; error?: string } {
  if (productA.id === productB.id) {
    return { valid: false, error: "Please select two different phones to compare." };
  }
  return { valid: true };
}
