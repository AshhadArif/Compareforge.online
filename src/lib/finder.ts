import { Smartphone } from "@/data/types";
import { products } from "@/lib/products";

export type FinderUseCase =
  | "camera"
  | "battery"
  | "value"
  | "performance"
  | "compact"
  | "foldable";

export type BudgetBand = "under-400" | "400-799" | "800-plus" | "any";

export type FinderPriority =
  | "updates"
  | "charging"
  | "storage"
  | "water-resistance"
  | "none";

export interface FinderAnswers {
  useCase: FinderUseCase | null;
  budget: BudgetBand | null;
  priority: FinderPriority | null;
}

export interface FinderMatch {
  product: Smartphone;
  score: number;
  reasons: string[];
}

const BUDGET_RANGES: Record<BudgetBand, { min: number; max: number }> = {
  "under-400": { min: 0, max: 399 },
  "400-799": { min: 400, max: 799 },
  "800-plus": { min: 800, max: Infinity },
  any: { min: 0, max: Infinity },
};

function isFoldable(p: Smartphone): boolean {
  return (
    p.model.toLowerCase().includes("fold") ||
    p.model.toLowerCase().includes("flip") ||
    p.model.toLowerCase().includes("razr")
  );
}

function msrp(p: Smartphone): number {
  return p.pricing.msrp ?? Infinity;
}

function inBudget(p: Smartphone, budget: BudgetBand): boolean {
  const range = BUDGET_RANGES[budget];
  const price = msrp(p);
  if (price === Infinity) return budget === "any";
  return price >= range.min && price <= range.max;
}

/**
 * Scoring uses only verifiable product attributes already in the data model
 * (price, battery capacity, camera hardware, weight, update commitment, etc.).
 * These are editorial fit scores, not lab test results.
 */
export function scoreProduct(p: Smartphone, answers: FinderAnswers): FinderMatch {
  let score = 0;
  const reasons: string[] = [];

  const price = p.pricing.msrp;
  const battery = p.battery.capacity ?? 0;
  const weight = p.design.weight ?? 999;
  const mainMp = p.camera.main.mp ?? 0;
  const hasTele = Boolean(p.camera.telephoto);
  const ram = p.performance.ram ?? 0;
  const updates = p.software.updateCommitment ?? 0;
  const storageOptions = p.storage.options.length;
  const maxStorageNum = storageOptions > 0 ? parseInt(p.storage.options[storageOptions - 1], 10) : 0;
  const wired = p.battery.wiredCharging ?? 0;
  const water = p.design.waterResistance ?? "";

  switch (answers.useCase) {
    case "camera":
      score += Math.min(mainMp, 200) / 10;
      if (hasTele) {
        score += 20;
        reasons.push("Telephoto hardware for optical zoom");
      }
      if (mainMp >= 48) reasons.push(`${mainMp} MP main camera`);
      if (p.camera.video?.maxResolution === "8K") {
        score += 10;
        reasons.push("8K video capture");
      }
      break;
    case "battery":
      score += Math.min(battery, 6000) / 50;
      if (battery >= 5000) reasons.push(`${battery} mAh battery capacity`);
      else if (battery >= 4500) reasons.push(`Large ${battery} mAh battery`);
      if (wired >= 45) {
        score += 8;
        reasons.push(`${wired}W wired charging`);
      }
      break;
    case "value":
      if (price != null && price < 400) {
        score += 30;
        reasons.push(`Lower starting price ($${price.toLocaleString()})`);
      } else if (price != null && price < 800) {
        score += 20;
        reasons.push(`Mid-range starting price ($${price.toLocaleString()})`);
      } else if (price != null) {
        score += 8;
      }
      score += Math.min(battery, 5500) / 100;
      break;
    case "performance":
      score += Math.min(ram, 16) * 4;
      if (ram >= 12) reasons.push(`${ram} GB RAM`);
      if (p.performance.chipset) reasons.push(p.performance.chipset);
      score += 10;
      break;
    case "compact":
      score += Math.max(0, (280 - weight) / 4);
      if (weight > 0 && weight <= 200) reasons.push(`Lightweight (${weight} g)`);
      if (p.display.size && p.display.size <= 6.4) {
        score += 10;
        reasons.push(`${p.display.size}" display`);
      }
      break;
    case "foldable":
      if (isFoldable(p)) {
        score += 50;
        reasons.push("Foldable form factor");
      }
      break;
    default:
      score += 10;
  }

  switch (answers.priority) {
    case "updates":
      score += Math.min(updates, 7) * 5;
      if (updates >= 5) reasons.push(`${updates} years of OS updates`);
      break;
    case "charging":
      score += Math.min(wired, 120) / 4;
      if (wired >= 45) reasons.push(`${wired}W charging`);
      if (p.battery.wirelessCharging) {
        score += 8;
        reasons.push("Wireless charging");
      }
      break;
    case "storage":
      score += Math.min(maxStorageNum, 1000) / 25;
      if (maxStorageNum >= 256) reasons.push(`Up to ${p.storage.options[storageOptions - 1]}`);
      break;
    case "water-resistance":
      if (water.includes("IP68")) {
        score += 25;
        reasons.push("IP68 water resistance");
      } else if (water.includes("IP")) {
        score += 12;
        reasons.push(`${water} rating`);
      }
      break;
    case "none":
    default:
      break;
  }

  // Baseline: prefer available, recently relevant devices slightly
  if (p.status === "available") score += 5;
  if (price != null) score += Math.max(0, 15 - price / 100);

  return { product: p, score, reasons };
}

export function findMatches(answers: FinderAnswers, limit = 4): FinderMatch[] {
  let pool = products.filter((p) => p.status === "available" || p.status === "announced");

  if (answers.budget && answers.budget !== "any") {
    const budgeted = pool.filter((p) => inBudget(p, answers.budget as BudgetBand));
    if (budgeted.length >= 2) pool = budgeted;
  }

  if (answers.useCase === "foldable") {
    const foldables = pool.filter(isFoldable);
    if (foldables.length >= 1) pool = foldables;
  }

  const scored = pool
    .map((p) => scoreProduct(p, answers))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

export const FINDER_QUESTIONS = [
  {
    key: "useCase" as const,
    question: "What matters most to you?",
    options: [
      { value: "camera", label: "Camera & zoom" },
      { value: "battery", label: "Battery life" },
      { value: "value", label: "Everyday value" },
      { value: "performance", label: "Performance & gaming" },
      { value: "compact", label: "Compact & lightweight" },
      { value: "foldable", label: "Foldable design" },
    ],
  },
  {
    key: "budget" as const,
    question: "What is your budget (starting price)?",
    options: [
      { value: "under-400", label: "Under $400" },
      { value: "400-799", label: "$400 – $799" },
      { value: "800-plus", label: "$800 and above" },
      { value: "any", label: "No preference" },
    ],
  },
  {
    key: "priority" as const,
    question: "Any other priority?",
    options: [
      { value: "updates", label: "Long software support" },
      { value: "charging", label: "Fast charging" },
      { value: "storage", label: "More storage" },
      { value: "water-resistance", label: "Water resistance" },
      { value: "none", label: "No preference" },
    ],
  },
] as const;
