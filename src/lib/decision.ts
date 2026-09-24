import { Smartphone } from "@/data/types";
import { products } from "@/lib/products";

// ---------- Use-case comparison ----------

export interface UseCaseProfile {
  id: string;
  label: string;
  question: string;
  attributeLabels: string[];
}

export const USE_CASES: UseCaseProfile[] = [
  {
    id: "camera",
    label: "Camera & zoom",
    question: "Which phones rank highest for photography and zoom?",
    attributeLabels: ["Main camera", "Telephoto", "Video"],
  },
  {
    id: "battery",
    label: "Battery life",
    question: "Which phones rank highest on battery capacity and charging?",
    attributeLabels: ["Capacity", "Wired charging", "Wireless"],
  },
  {
    id: "gaming",
    label: "Gaming & performance",
    question: "Which phones rank highest for performance and sustained loads?",
    attributeLabels: ["Chipset", "RAM", "Display refresh"],
  },
  {
    id: "compact",
    label: "Compact & lightweight",
    question: "Which phones rank highest for one-hand use and low weight?",
    attributeLabels: ["Weight", "Width", "Display size"],
  },
  {
    id: "value",
    label: "Value for money",
    question: "Which phones deliver the most capability per dollar?",
    attributeLabels: ["Starting price", "Core specs"],
  },
  {
    id: "updates",
    label: "Long software support",
    question: "Which phones have the longest update commitments?",
    attributeLabels: ["OS updates", "Security updates"],
  },
  {
    id: "travel",
    label: "Travel & endurance",
    question: "Which phones suit travel — battery, connectivity, durability?",
    attributeLabels: ["Battery", "Weight", "Water resistance"],
  },
];

export interface UseCaseRow {
  product: Smartphone;
  score: number;
  reasons: string[];
}

export function scoreForUseCase(p: Smartphone, useCase: string): UseCaseRow {
  let score = 0;
  const reasons: string[] = [];

  const msrp = p.pricing.msrp ?? Infinity;
  const battery = p.battery.capacity ?? 0;
  const weight = p.design.weight ?? 999;
  const mp = p.camera.main.mp ?? 0;
  const ram = p.performance.ram ?? 0;
  const refresh = p.display.refreshRate ?? 60;
  const updates = p.software.updateCommitment ?? 0;
  const security = p.software.securityCommitment ?? 0;
  const wired = p.battery.wiredCharging ?? 0;
  const chipset = p.performance.chipset ?? "";

  switch (useCase) {
    case "camera":
      score += Math.min(mp, 200) / 5;
      if (p.camera.telephoto) {
        score += 25;
        reasons.push(`Telephoto camera (${p.camera.telephoto.mp ?? "?"} MP)`);
      }
      if (mp >= 48) reasons.push(`${mp} MP main camera`);
      if (p.camera.video?.maxResolution === "8K") {
        score += 10;
        reasons.push("8K video recording");
      }
      if (p.camera.main.ois) {
        score += 8;
        reasons.push("Optical image stabilization");
      }
      break;
    case "battery":
      score += Math.min(battery, 6500) / 40;
      if (battery >= 5000) reasons.push(`${battery} mAh battery`);
      else if (battery >= 4500) reasons.push(`${battery} mAh battery`);
      if (wired >= 45) {
        score += 10;
        reasons.push(`${wired}W fast charging`);
      }
      if (p.battery.wirelessCharging) {
        score += 6;
        reasons.push("Wireless charging");
      }
      break;
    case "gaming":
      score += Math.min(ram, 24) * 3;
      if (chipset) reasons.push(chipset);
      if (ram >= 12) reasons.push(`${ram} GB RAM`);
      if (refresh >= 120) {
        score += 15;
        reasons.push(`${refresh} Hz display`);
      }
      if (p.display.peakBrightness && p.display.peakBrightness >= 1500) score += 5;
      break;
    case "compact":
      score += Math.max(0, (290 - weight) / 3);
      if (weight <= 200) reasons.push(`Lightweight at ${weight} g`);
      if (p.design.dimensions && p.design.dimensions.width && p.design.dimensions.width <= 75) {
        score += 12;
        reasons.push(`${p.design.dimensions.width} mm wide`);
      }
      if (p.display.size && p.display.size <= 6.3) {
        score += 8;
        reasons.push(`${p.display.size}" display`);
      }
      break;
    case "value":
      if (msrp <= 400) {
        score += 40;
        reasons.push(`Starts at $${msrp}`);
      } else if (msrp <= 700) {
        score += 28;
        reasons.push(`Starts at $${msrp}`);
      } else if (msrp <= 1000) {
        score += 14;
        reasons.push(`Starts at $${msrp}`);
      }
      score += Math.min(battery, 5500) / 150;
      if (refresh >= 120) score += 6;
      break;
    case "updates":
      score += Math.min(updates, 7) * 8;
      score += Math.min(security, 7) * 4;
      if (updates >= 5) reasons.push(`${updates} years of OS updates`);
      if (security >= 5) reasons.push(`${security} years of security updates`);
      break;
    case "travel":
      score += Math.min(battery, 6500) / 50;
      if (battery >= 5000) reasons.push(`${battery} mAh battery`);
      if (p.design.waterResistance && p.design.waterResistance.includes("IP68")) {
        score += 15;
        reasons.push("IP68 water resistance");
      } else if (p.design.waterResistance) {
        score += 8;
        reasons.push(p.design.waterResistance);
      }
      if (weight <= 210) score += 8;
      if (p.connectivity.fiveG) score += 4;
      break;
    default:
      score += 10;
  }

  if (p.status === "available") score += 4;
  return { product: p, score, reasons: Array.from(new Set(reasons)) };
}

export function rankForUseCase(useCase: string, limit = 8): UseCaseRow[] {
  return products
    .filter((p) => p.status === "available" || p.status === "announced")
    .map((p) => scoreForUseCase(p, useCase))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// ---------- Alternatives finder ----------

export interface AlternativeRow {
  product: Smartphone;
  priceDiff: number | null;
  pricePct: number | null;
  similarity: number;
  gains: string[];
  tradeoffs: string[];
}

function bigScreen(p: Smartphone): boolean {
  return (p.display.size ?? 0) >= 6.6;
}
function foldable(p: Smartphone): boolean {
  const m = p.model.toLowerCase();
  return m.includes("fold") || m.includes("flip") || m.includes("razr");
}

export function findAlternatives(anchorId: string, limit = 5): AlternativeRow[] {
  const anchor = products.find((p) => p.id === anchorId);
  if (!anchor) return [];
  const anchorPrice = anchor.pricing.msrp;
  const anchorWeight = anchor.design.weight ?? 220;
  const anchorBattery = anchor.battery.capacity ?? 4500;

  const rows: AlternativeRow[] = [];

  for (const p of products) {
    if (p.id === anchor.id) continue;
    if (p.status === "discontinued") continue;

    const price = p.pricing.msrp;
    let priceDiff: number | null = null;
    let pricePct: number | null = null;
    if (anchorPrice != null && price != null) {
      priceDiff = price - anchorPrice;
      if (anchorPrice > 0) pricePct = (priceDiff / anchorPrice) * 100;
    }

    // Similarity: only suggest cheaper or mildly different options + similarity scoring
    let sim = 0;
    const gains: string[] = [];
    const tradeoffs: string[] = [];

    const sameForm = foldable(p) === foldable(anchor);
    if (sameForm) sim += 2;
    else if (foldable(p)) gains.push("Foldable form factor");
    else tradeoffs.push(anchor.model.includes("Fold") ? "Not foldable" : "Different form factor");

    const bothBig = bigScreen(p) === bigScreen(anchor);
    if (bothBig) sim += 1;
    else if (bigScreen(p)) gains.push("Larger display");
    else tradeoffs.push("Smaller display");

    const sizeDelta = Math.abs((p.display.size ?? 0) - (anchor.display.size ?? 0));
    if (sizeDelta <= 0.3) sim += 1;

    const weightDelta = Math.abs((p.design.weight ?? 0) - anchorWeight);
    if (weightDelta <= 15) sim += 1;
    else if (p.design.weight && anchor.design.weight && p.design.weight < anchor.design.weight)
      gains.push(`Lighter by ${anchor.design.weight - p.design.weight} g`);
    else if (p.design.weight && anchor.design.weight && p.design.weight > anchor.design.weight)
      tradeoffs.push(`Heavier by ${p.design.weight - anchor.design.weight} g`);

    const batteryDelta = (p.battery.capacity ?? 0) - anchorBattery;
    if (Math.abs(batteryDelta) <= 300) sim += 1;
    else if (batteryDelta > 300) gains.push(`${batteryDelta} mAh more battery`);
    else tradeoffs.push(`${Math.abs(batteryDelta)} mAh less battery`);

    if ((p.performance.ram ?? 0) >= (anchor.performance.ram ?? 0)) sim += 1;

    if (priceDiff != null) {
      if (priceDiff < -50) {
        gains.push(`$${Math.abs(priceDiff).toLocaleString()} cheaper`);
        sim += 2;
      } else if (priceDiff > 100) {
        tradeoffs.push(`$${priceDiff.toLocaleString()} more expensive`);
      } else {
        sim += 1;
      }
    }

    // Keep only plausible alternatives: cheaper, or similar-priced with high similarity
    if (priceDiff != null && priceDiff > 150 && sim < 5) continue;
    if (priceDiff == null && sim < 4) continue;

    rows.push({ product: p, priceDiff, pricePct, similarity: sim, gains, tradeoffs });
  }

  return rows
    .sort((a, b) => b.similarity - a.similarity || (a.priceDiff ?? 0) - (b.priceDiff ?? 0))
    .slice(0, limit);
}

// ---------- Compatibility checker ----------

export interface CompatRequirement {
  id: string;
  label: string;
  group: string;
  test: (p: Smartphone) => { pass: boolean; reason: string; unknown?: boolean };
}

export const COMPAT_REQUIREMENTS: CompatRequirement[] = [
  {
    id: "wireless-charging",
    label: "Wireless charging pad",
    group: "Charging & power",
    test: (p) =>
      p.battery.wirelessCharging
        ? { pass: true, reason: `Supports ${p.battery.wirelessCharging}W wireless charging.` }
        : { pass: false, reason: "No wireless charging is listed in its specifications." },
  },
  {
    id: "fast-wired-charging",
    label: "Fast charger (45W or more)",
    group: "Charging & power",
    test: (p) =>
      p.battery.wiredCharging && p.battery.wiredCharging >= 45
        ? { pass: true, reason: `Supports up to ${p.battery.wiredCharging}W wired charging.` }
        : p.battery.wiredCharging
          ? {
              pass: false,
              reason: `Lists ${p.battery.wiredCharging}W wired charging — below 45W, so a 45W charger will work but charge at the phone's maximum rate, not the charger's.`,
            }
          : { pass: false, reason: "Wired charging speed is not documented.", unknown: true },
  },
  {
    id: "bluetooth-headphones",
    label: "Bluetooth headphones / earbuds",
    group: "Audio & accessories",
    test: (p) =>
      p.connectivity.bluetooth
        ? { pass: true, reason: `Bluetooth ${p.connectivity.bluetooth} is listed.` }
        : { pass: false, reason: "Bluetooth version is not documented.", unknown: true },
  },
  {
    id: "nfc-payments",
    label: "Contactless payments (NFC terminal)",
    group: "Connectivity",
    test: (p) =>
      p.connectivity.nfc
        ? { pass: true, reason: "NFC is listed — contactless payment terminals are supported." }
        : { pass: false, reason: "NFC is not listed in its specifications." },
  },
  {
    id: "usb-c-cable",
    label: "USB-C cable / dock",
    group: "Ports & storage",
    test: (p) =>
      p.connectivity.usb && p.connectivity.usb.toLowerCase().includes("usb-c")
        ? { pass: true, reason: `Ports listed as ${p.connectivity.usb}.` }
        : p.connectivity.usb
          ? { pass: false, reason: `Port listed as ${p.connectivity.usb} — not USB-C.` }
          : { pass: false, reason: "USB port type is not documented.", unknown: true },
  },
  {
    id: "microsd",
    label: "microSD card (expandable storage)",
    group: "Ports & storage",
    test: (p) =>
      p.storage.expandable
        ? { pass: true, reason: "Expandable storage is listed as supported." }
        : { pass: false, reason: "No expandable storage is listed — microSD cards will not work." },
  },
  {
    id: "esim",
    label: "eSIM activation",
    group: "SIM & network",
    test: (p) => {
      const sim = (p.connectivity.simType ?? "").toLowerCase();
      if (sim.includes("esim")) return { pass: true, reason: `SIM type: ${p.connectivity.simType}.` };
      if (p.connectivity.simType)
        return { pass: false, reason: `SIM type listed as ${p.connectivity.simType} — no eSIM mentioned.` };
      return { pass: false, reason: "SIM type is not documented.", unknown: true };
    },
  },
  {
    id: "5g",
    label: "5G mobile network",
    group: "SIM & network",
    test: (p) =>
      p.connectivity.fiveG
        ? { pass: true, reason: "5G is listed as supported." }
        : { pass: false, reason: "5G is not listed in its specifications." },
  },
  {
    id: "satellite",
    label: "Satellite messaging",
    group: "Connectivity",
    test: (p) =>
      p.connectivity.satellite
        ? { pass: true, reason: "Satellite connectivity is listed." }
        : { pass: false, reason: "Satellite connectivity is not listed." },
  },
  {
    id: "wifi6e-router",
    label: "Wi-Fi 6E router",
    group: "Connectivity",
    test: (p) => {
      const wifi = (p.connectivity.wifi ?? "").toLowerCase();
      if (wifi.includes("6e") || wifi.includes("7")) return { pass: true, reason: `Wi-Fi: ${p.connectivity.wifi}.` };
      if (p.connectivity.wifi)
        return { pass: false, reason: `Wi-Fi listed as ${p.connectivity.wifi} — below Wi-Fi 6E.` };
      return { pass: false, reason: "Wi-Fi version is not documented.", unknown: true };
    },
  },
];

export interface CompatResult {
  requirement: CompatRequirement;
  pass: boolean;
  unknown: boolean;
  reason: string;
}

export function checkCompatibility(product: Smartphone, requirementId: string): CompatResult | null {
  const req = COMPAT_REQUIREMENTS.find((r) => r.id === requirementId);
  if (!req) return null;
  const res = req.test(product);
  return { requirement: req, pass: res.pass, unknown: Boolean(res.unknown), reason: res.reason };
}
