export type ToolType = "compare" | "decide" | "match" | "calculate";
export type ToolStatus = "planned" | "in-design" | "built" | "retired";
export type ToolDomain = "universal" | "phones";

export interface ToolRegistryEntry {
  tool_id: string;
  name: string;
  type: ToolType;
  domain: ToolDomain;
  category: string;
  description: string;
  /** The concrete user problem this tool solves (shown on directory cards). */
  problem: string;
  /** What the user provides. */
  inputs: string[];
  /** What the user gets back. */
  outputs: string[];
  purpose: string;
  route: string;
  dataRequirements: string[];
  logic: string;
  seoTitle: string;
  seoDescription: string;
  searchKeywords: string[];
  relatedTools: string[];
  relatedGuideSlugs: string[];
  status: ToolStatus;
  featured?: boolean;
  version: string;
  lastUpdated: string;
}

export const tools: ToolRegistryEntry[] = [
  // ---------- Compare (dataset) ----------
  {
    tool_id: "product-comparison",
    name: "Product Comparison Tool",
    type: "compare",
    domain: "phones",
    category: "smartphones",
    description:
      "Compare any two smartphones side by side across display, camera, battery, performance, design, and software — with differences highlighted and explained.",
    problem: "I know the two phones I’m considering — what actually differs between them?",
    inputs: ["Product A", "Product B"],
    outputs: ["Side-by-side spec table", "Differences-only view", "Significance ratings", "Shareable URL"],
    purpose:
      "Help users who already know their candidate products understand the real differences between them.",
    route: "/tools/product-comparison/",
    dataRequirements: ["entities", "attributes", "sources", "significance-thresholds"],
    logic: "Normalize values → compute per-attribute deltas → classify significance → explain",
    seoTitle: "Product Comparison Tool — Compare Phones Side by Side",
    seoDescription:
      "Free product comparison tool. Pick two smartphones and see a side-by-side comparison of display, camera, battery, performance and software.",
    searchKeywords: [
      "phone comparison tool",
      "compare phones side by side",
      "spec comparison",
      "a vs b phone",
      "phone specs compared",
    ],
    relatedTools: ["product-finder", "use-case-comparison", "percentage-difference-calculator"],
    relatedGuideSlugs: ["how-to-compare-product-specifications", "ai-features-explained"],
    status: "built",
    featured: true,
    version: "2.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "use-case-comparison",
    name: "Use-Case Comparison",
    type: "compare",
    domain: "phones",
    category: "smartphones",
    description:
      "See which smartphones rank highest for a specific need — camera, battery life, gaming, travel, value, updates — scored from documented specifications.",
    problem: "I don’t care about every spec — which phone is best for my specific use?",
    inputs: ["Use case (camera, battery, gaming, …)"],
    outputs: ["Ranked phone list", "Why-they-fit reasons", "Key attributes per phone"],
    purpose:
      "Answer ‘which phone fits this job’ questions with transparent, attribute-based rankings instead of fixed editorial lists.",
    route: "/tools/use-case-comparison/",
    dataRequirements: ["entities", "attributes", "scoring-rules"],
    logic: "Filter by use case → score each entity on documented attributes → rank → explain",
    seoTitle: "Phone Use-Case Comparison — Camera, Battery, Gaming",
    seoDescription:
      "Rank smartphones by the job you need them to do: camera, battery, gaming, travel or value — scored from published specifications.",
    searchKeywords: [
      "best phone for camera",
      "best phone for battery life",
      "best phone for gaming",
      "which phone should I buy",
      "use case comparison",
    ],
    relatedTools: ["product-finder", "product-comparison", "alternatives-finder"],
    relatedGuideSlugs: ["choosing-a-phone-by-use-case", "foldable-phone-buying-guide-2026"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "product-finder",
    name: "Product Finder",
    type: "decide",
    domain: "phones",
    category: "smartphones",
    description:
      "Answer three short questions about your needs and budget and get a shortlist of matching phones with reasons — then compare your top two.",
    problem: "I don’t even know which phones to compare yet.",
    inputs: ["Use case", "Budget band", "Priority"],
    outputs: ["Ranked shortlist", "Why-they-fit reasons", "Hand-off to comparison tool"],
    purpose:
      "Help users who do not yet know which products to compare — the step before comparison.",
    route: "/tools/product-finder/",
    dataRequirements: ["entities", "attributes", "scoring-rules"],
    logic: "Score entities against answers using verifiable attributes → rank → explain",
    seoTitle: "Product Finder — Find the Right Phone for Your Needs",
    seoDescription:
      "Answer three short questions about your needs and budget to get a shortlist of matching phones with reasons and a one-click comparison.",
    searchKeywords: [
      "what phone should i buy",
      "phone finder quiz",
      "find a phone for me",
      "phone recommendation by budget",
      "product finder",
    ],
    relatedTools: ["use-case-comparison", "product-comparison", "alternatives-finder"],
    relatedGuideSlugs: ["choosing-a-phone-by-use-case", "foldable-phone-buying-guide-2026"],
    status: "built",
    featured: true,
    version: "1.1.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "alternatives-finder",
    name: "Alternatives Finder",
    type: "decide",
    domain: "phones",
    category: "smartphones",
    description:
      "Start from a phone you know and find cheaper or better-fitting alternatives from our database, with exact differences in price and specifications.",
    problem: "This phone is too expensive — what else gives me something similar for less?",
    inputs: ["Anchor product", "Priorities (optional)"],
    outputs: ["Ranked alternatives", "Price difference", "What you gain / give up"],
    purpose:
      "Serve the ‘cheaper alternative to X’ and ‘similar but different’ search intent with a product-anchored lookup.",
    route: "/tools/alternatives-finder/",
    dataRequirements: ["entities", "attributes", "scoring-rules"],
    logic: "Compare anchor to peers on price + attribute similarity → rank alternatives → explain trade-offs",
    seoTitle: "Alternatives Finder — Cheaper Alternatives to Any Phone",
    seoDescription:
      "Looking for a cheaper alternative to a specific phone? See ranked alternatives with exact price differences and what you gain or give up on specs.",
    searchKeywords: [
      "alternative to",
      "cheaper alternative",
      "similar phone but cheaper",
      "phone alternatives",
      "alternative finder",
    ],
    relatedTools: ["product-finder", "product-comparison", "use-case-comparison"],
    relatedGuideSlugs: ["how-to-compare-product-specifications", "unit-pricing-guide"],
    status: "built",
    featured: false,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "compatibility-checker",
    name: "Compatibility Checker",
    type: "match",
    domain: "phones",
    category: "smartphones",
    description:
      "Check whether a phone supports what you need — wireless charging, eSIM, 5G, NFC, USB-C, microSD, satellite — from its specifications.",
    problem: "Will this phone work with the accessory, network, or feature I need?",
    inputs: ["Phone", "Requirement (accessory or feature)"],
    outputs: ["Yes / No / Not documented verdict", "Reason from spec sheet", "Source note"],
    purpose:
      "Answer yes/no does-X-work-with-Y questions that side-by-side comparison cannot answer.",
    route: "/tools/compatibility-checker/",
    dataRequirements: ["entities", "relations", "attributes"],
    logic: "Look up required attribute on selected entity → verdict + reason + confidence",
    seoTitle: "Phone Compatibility Checker — Does It Work With…?",
    seoDescription:
      "Free compatibility checker: pick a phone and a requirement — wireless charging, eSIM, 5G, NFC, USB-C, microSD — and see a documented verdict.",
    searchKeywords: [
      "compatibility checker",
      "is compatible with",
      "does phone support esim",
      "wireless charging compatible",
      "will it work with",
    ],
    relatedTools: ["product-comparison", "fit-clearance-checker", "product-finder"],
    relatedGuideSlugs: ["compatibility-checking-before-you-buy", "specs-explained"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },

  // ---------- Calculate (universal math) ----------
  {
    tool_id: "percentage-difference-calculator",
    name: "Percentage Difference Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Calculate the absolute percentage difference between two numbers using the standard symmetric formula, with step-by-step working shown.",
    problem: "How far apart are these two numbers, in percent, without treating one as the baseline?",
    inputs: ["Value A", "Value B"],
    outputs: ["Percentage difference", "Absolute difference", "Step-by-step working"],
    purpose:
      "Provide the symmetric percentage-difference calculation with transparent steps — the version most people need for two measurements.",
    route: "/tools/percentage-difference-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "|A − B| ÷ ((A + B) ÷ 2) × 100",
    seoTitle: "Percentage Difference Calculator (+ Formula & Steps)",
    seoDescription:
      "Free percentage difference calculator. Enter two numbers and see the symmetric percentage difference, absolute difference, formula and step-by-step working.",
    searchKeywords: [
      "percentage difference calculator",
      "percent difference between two numbers",
      "how to calculate percentage difference",
      "what is the percent difference",
      "difference formula",
    ],
    relatedTools: ["percentage-change-calculator", "price-difference-calculator", "dimension-comparison"],
    relatedGuideSlugs: ["how-to-calculate-percentage-difference", "unit-pricing-guide"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "percentage-change-calculator",
    name: "Percentage Change Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Calculate directional percentage increase or decrease from an original value to a new value, with the standard change formula explained.",
    problem: "What percent did this value go up or down compared with where it started?",
    inputs: ["Original value", "New value"],
    outputs: ["Percentage change", "Absolute change", "Increase or decrease label", "Steps"],
    purpose:
      "Serve the directional ‘increase/decrease by %’ intent, which differs from the symmetric percentage-difference formula.",
    route: "/tools/percentage-change-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "(New − Original) ÷ |Original| × 100",
    seoTitle: "Percentage Change Calculator — Increase & Decrease (%)",
    seoDescription:
      "Free percentage change calculator. Enter the original and new values to get percent increase or decrease, the absolute change and the working steps.",
    searchKeywords: [
      "percentage change calculator",
      "percentage increase calculator",
      "percentage decrease calculator",
      "percent change formula",
      "how much did it increase",
    ],
    relatedTools: ["percentage-difference-calculator", "price-difference-calculator", "monthly-vs-annual-calculator"],
    relatedGuideSlugs: ["how-to-calculate-percentage-difference", "unit-pricing-guide"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "price-difference-calculator",
    name: "Price Difference Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Compare two prices: see the cash difference, which is cheaper, the percentage gap, and the saving if you buy several units.",
    problem: "How much more is option A than option B, in dollars and percent?",
    inputs: ["Price A", "Price B", "Optional quantity"],
    outputs: ["Cash difference", "Cheaper option", "% gap", "Bulk saving"],
    purpose:
      "Handle real purchase-price comparisons (quotes, pack sizes, listed prices) as money-specific math distinct from generic percentages.",
    route: "/tools/price-difference-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "Difference = |A − B|; % gap vs cheaper price; optional × quantity",
    seoTitle: "Price Difference Calculator — Compare Two Prices",
    seoDescription:
      "Free price difference calculator. Enter two prices to see the dollar gap, which option is cheaper and the percentage difference.",
    searchKeywords: [
      "price difference calculator",
      "difference between two prices",
      "how much more expensive",
      "price comparison calculator",
      "savings calculator",
    ],
    relatedTools: ["percentage-difference-calculator", "unit-price-calculator", "percentage-change-calculator"],
    relatedGuideSlugs: ["unit-pricing-guide", "how-to-calculate-percentage-difference"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "unit-price-calculator",
    name: "Unit Price Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Compare two products by price per unit — per ounce, ml, gram, gigabyte, metre or any unit — to see which pack is the better deal.",
    problem: "Which size or pack gives me more for my money per unit?",
    inputs: ["Price + quantity (×2)", "Unit name"],
    outputs: ["Unit price A", "Unit price B", "Cheaper per unit", "% savings"],
    purpose:
      "Normalize prices by quantity so pack sizes and subscriptions can be compared fairly.",
    route: "/tools/unit-price-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "Unit price = price ÷ quantity; compare A vs B unit prices",
    seoTitle: "Unit Price Calculator — Compare Price Per Unit",
    seoDescription:
      "Free unit price calculator. Enter price and quantity for two products to compare cost per ounce, gram, ml, gb or any unit and find the better deal.",
    searchKeywords: [
      "unit price calculator",
      "price per ounce calculator",
      "which pack size is better",
      "cost per unit comparison",
      "unit cost calculator",
    ],
    relatedTools: ["price-difference-calculator", "cost-per-use-calculator", "percentage-difference-calculator"],
    relatedGuideSlugs: ["unit-pricing-guide", "how-to-compare-subscription-plans"],
    status: "built",
    featured: false,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "monthly-vs-annual-calculator",
    name: "Monthly vs Annual Savings Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "See how much you save paying yearly instead of monthly — cash saving, percentage saved, and true monthly cost of the annual plan.",
    problem: "Is switching to annual billing actually worth it for me?",
    inputs: ["Monthly price", "Annual price"],
    outputs: ["Cash saving", "% saved", "Effective monthly cost", "Break-even point"],
    purpose:
      "Answer the common billing-frequency question with explicit numbers rather than marketing ‘save 20%’ claims.",
    route: "/tools/monthly-vs-annual-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "Annualized monthly = monthly × 12; saving = annualized − annual; % = saving ÷ annualized",
    seoTitle: "Monthly vs Annual Billing — Savings Calculator",
    seoDescription:
      "Free monthly vs annual calculator. Enter both prices to see your cash saving, percentage saved, effective monthly cost and whether annual billing is worth it.",
    searchKeywords: [
      "monthly vs annual savings",
      "annual billing discount calculator",
      "is annual plan worth it",
      "monthly versus yearly subscription",
      "subscription savings calculator",
    ],
    relatedTools: ["subscription-audit-calculator", "plan-comparison", "total-cost-ownership-calculator"],
    relatedGuideSlugs: ["how-to-compare-subscription-plans", "unit-pricing-guide"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "subscription-audit-calculator",
    name: "Subscription Audit Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "List your recurring subscriptions and see the monthly total, annual total, and biggest line items — then model what cancelling one would save.",
    problem: "How much am I actually spending on subscriptions each year?",
    inputs: ["List of subscriptions (name, price, billing period)"],
    outputs: ["Monthly total", "Annual total", "Per-item annual cost", "Cancellation savings"],
    purpose:
      "Turn a user’s own bills into yearly totals and cancellation trade-offs — an inventory tool with no product catalog required.",
    route: "/tools/subscription-audit-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "Normalize each item to monthly & annual → sum → sort → project savings",
    seoTitle: "Subscription Audit Calculator — Total Recurring Costs",
    seoDescription:
      "Free subscription audit calculator. Add your subscriptions to see monthly and annual totals, biggest line items and cancelling savings.",
    searchKeywords: [
      "subscription calculator",
      "how much am i paying for subscriptions",
      "subscription audit",
      "recurring expenses calculator",
      "yearly cost of subscriptions",
    ],
    relatedTools: ["monthly-vs-annual-calculator", "plan-comparison", "total-cost-ownership-calculator"],
    relatedGuideSlugs: ["how-to-compare-subscription-plans", "building-a-decision-matrix"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "cost-per-use-calculator",
    name: "Cost Per Use Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Turn any purchase price into a true cost per use from how often you actually use it — the number that decides whether something is worth buying.",
    problem: "I use this thing a few times a week — what does each use really cost?",
    inputs: ["Purchase price", "Uses per week", "Weeks per year (optional)", "Time owned (optional)"],
    outputs: ["Cost per use", "Cost per year", "Daily cost"],
    purpose:
      "Frequency-normalized value analysis for purchases and memberships, distinct from unit pricing (per physical unit).",
    route: "/tools/cost-per-use-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "Total uses = uses/week × weeks × years; cost per use = price ÷ total uses",
    seoTitle: "Cost Per Use Calculator — True Cost per Use",
    seoDescription:
      "Free cost per use calculator. Enter price and how often you use something to see the real cost of each use, per year and per day.",
    searchKeywords: [
      "cost per use calculator",
      "cost per wear calculator",
      "how much does each use cost",
      "value per use",
      "is it worth it calculator",
    ],
    relatedTools: ["unit-price-calculator", "repair-vs-replace-calculator", "total-cost-ownership-calculator"],
    relatedGuideSlugs: ["unit-pricing-guide", "repair-or-replace-factors"],
    status: "built",
    featured: false,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "repair-vs-replace-calculator",
    name: "Repair vs Replace Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Compare the cost of repairing your current item against replacing it, using cost per remaining month of life to see which option stretches further.",
    problem: "Is it worth repairing, or should I just buy a new one?",
    inputs: ["Repair cost", "Replacement price", "Expected life after repair", "Expected life of new item", "Current item value"],
    outputs: ["Cost per month (repair)", "Cost per month (replace)", "Better-value option", "Break-even horizon"],
    purpose:
      "Support the repair-or-replace decision with normalized cost per month of remaining life — actions, not product specs.",
    route: "/tools/repair-vs-replace-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "Cost/month = (cost − salvage) ÷ months of life; compare ratios with caveats",
    seoTitle: "Repair vs Replace Calculator — Fix It or Buy New?",
    seoDescription:
      "Free repair vs replace calculator. Compare cost per month of life from repair cost, replacement price and expected lifespans.",
    searchKeywords: [
      "repair or replace calculator",
      "should i repair or buy new",
      "fix vs replace calculator",
      "is it worth repairing",
      "repair cost vs new",
    ],
    relatedTools: ["upgrade-vs-keep-calculator", "cost-per-use-calculator", "total-cost-ownership-calculator"],
    relatedGuideSlugs: ["repair-or-replace-factors", "how-to-calculate-percentage-difference"],
    status: "built",
    featured: false,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "upgrade-vs-keep-calculator",
    name: "Upgrade vs Keep Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Enter what your current device is worth, what the upgrade costs, and how long you’d keep it — see cost per month of upgrading versus keeping what you have.",
    problem: "Should I upgrade my phone now, or keep the one I have?",
    inputs: ["Current device value", "Upgrade price", "Trade-in (optional)", "Months you’d keep the new device"],
    outputs: ["Net upgrade cost", "Cost per month (upgrade)", "Cost per month (keep)", "Clear interpretation"],
    purpose:
      "Support the should-I-upgrade decision with the user’s own numbers and disclosed assumptions — not advice, just arithmetic.",
    route: "/tools/upgrade-vs-keep-calculator/",
    dataRequirements: ["calculation-definition", "optional-msrp-refs"],
    logic: "Net cost = upgrade price − trade-in; cost/month over ownership window vs keep baseline",
    seoTitle: "Upgrade vs Keep Calculator — Should You Upgrade?",
    seoDescription:
      "Free upgrade vs keep calculator. Enter your device value, upgrade cost and trade-in to compare the true cost of upgrading now versus keeping your current phone.",
    searchKeywords: [
      "should i upgrade my phone",
      "upgrade or keep calculator",
      "is it worth upgrading",
      "phone upgrade cost",
      "when to upgrade phone",
    ],
    relatedTools: ["repair-vs-replace-calculator", "total-cost-ownership-calculator", "product-comparison"],
    relatedGuideSlugs: ["repair-or-replace-factors", "choosing-a-phone-by-use-case"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "total-cost-ownership-calculator",
    name: "Total Cost of Ownership Calculator",
    type: "calculate",
    domain: "universal",
    category: "calculators",
    description:
      "Compare buy, subscribe and lease options over 1, 3 or 5 years by totalling upfront cost, recurring fees and periodic costs for each path.",
    problem: "What will this really cost me over time — buying, subscribing or leasing?",
    inputs: ["Option costs (upfront, recurring, periodic)", "Time horizon"],
    outputs: ["Total per option", "Monthly equivalent", "Ranking", "Assumptions listed"],
    purpose:
      "Totalize ownership modes over a time horizon — distinct from plan-vs-plan comparison (same mode, different tiers).",
    route: "/tools/total-cost-ownership-calculator/",
    dataRequirements: ["calculation-definition"],
    logic: "Total = upfront + (recurring × periods) + (periodic × cycles) over chosen horizon",
    seoTitle: "Total Cost of Ownership Calculator — Buy vs Lease",
    seoDescription:
      "Free total cost of ownership calculator. Compare upfront, recurring and periodic costs over 1, 3 or 5 years with monthly equivalents.",
    searchKeywords: [
      "total cost of ownership calculator",
      "buy vs subscribe",
      "tco calculator",
      "ownership cost comparison",
      "lease vs buy calculator",
    ],
    relatedTools: ["plan-comparison", "subscription-audit-calculator", "monthly-vs-annual-calculator"],
    relatedGuideSlugs: ["how-to-compare-subscription-plans", "building-a-decision-matrix"],
    status: "built",
    featured: false,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },

  // ---------- Compare (visual / user-input) ----------
  {
    tool_id: "dimension-comparison",
    name: "Dimension Comparison Tool",
    type: "compare",
    domain: "universal",
    category: "size",
    description:
      "Compare the size of two objects — pick phones from our database or enter your own width, height and depth — and see percentage differences plus a scale drawing.",
    problem: "How much bigger is A than B, really — and will I notice?",
    inputs: ["Two objects: phones from database or custom dimensions"],
    outputs: ["Scale visualization", "Percentage size differences", "Face/side area comparison", "Diagonal comparison"],
    purpose:
      "Serve ‘size comparison’ and ‘dimensions vs’ intent with proportional visuals, not just numbers.",
    route: "/tools/dimension-comparison/",
    dataRequirements: ["entities", "dimensions", "calculation-definition"],
    logic: "Normalize units → compute per-axis deltas + % → draw scaled rectangles",
    seoTitle: "Dimension Comparison Tool — Compare Size Visually",
    seoDescription:
      "Compare dimensions side by side. Pick two phones or enter custom width, height and depth to see percentage differences, area comparison and a to-scale drawing.",
    searchKeywords: [
      "size comparison tool",
      "dimension comparison",
      "how much bigger is",
      "size difference calculator",
      "actual size comparison",
    ],
    relatedTools: ["fit-clearance-checker", "percentage-difference-calculator", "product-comparison"],
    relatedGuideSlugs: ["understanding-product-dimensions", "how-to-compare-product-specifications"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "plan-comparison",
    name: "Plan Comparison Tool",
    type: "compare",
    domain: "universal",
    category: "plans",
    description:
      "Enter two or three plans side by side — price, billing period, allowances and features — and get a normalized cost comparison with a feature matrix.",
    problem: "Which of these plans actually fits my budget and needs?",
    inputs: ["2–3 plans: name, price, period, features, allowances"],
    outputs: ["Monthly/annual cost table", "Feature matrix", "Cheapest plan", "Key trade-offs"],
    purpose:
      "Serve subscription and plan comparison intent with user-entered data so we never publish stale or invented prices.",
    route: "/tools/plan-comparison/",
    dataRequirements: ["calculation-definition", "user-input"],
    logic: "Normalize to monthly & annual cost → diff allowances → feature matrix → explain",
    seoTitle: "Plan Comparison Tool — Compare Subscription Plans",
    seoDescription:
      "Free plan comparison tool. Enter two or three plans with prices and features to see normalized monthly cost, a feature matrix and which plan is the best fit.",
    searchKeywords: [
      "plan comparison",
      "compare subscription plans",
      "plan a vs plan b",
      "which plan should i choose",
      "pricing tier comparison",
    ],
    relatedTools: ["monthly-vs-annual-calculator", "subscription-audit-calculator", "total-cost-ownership-calculator"],
    relatedGuideSlugs: ["how-to-compare-subscription-plans", "building-a-decision-matrix"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },

  // ---------- Match ----------
  {
    tool_id: "fit-clearance-checker",
    name: "Fit & Clearance Checker",
    type: "match",
    domain: "universal",
    category: "fit",
    description:
      "Enter the dimensions of an item and the space it needs to fit — shelf, doorway, wall, rack — and get a clear fit verdict with clearance on every side.",
    problem: "Will this physically fit in the space I have?",
    inputs: ["Item width, height, depth", "Space width, height, depth", "Optional clearance"],
    outputs: ["Fit verdict", "Clearance per side", "Diagonal check", "No-fit reasons"],
    purpose:
      "Answer ‘will it fit’ purchase-safety questions with explicit clearance math instead of guesswork.",
    route: "/tools/fit-clearance-checker/",
    dataRequirements: ["calculation-definition", "user-input"],
    logic: "Item ≤ space − required clearance on each axis → verdict + remaining clearance",
    seoTitle: "Fit & Clearance Checker — Will It Fit?",
    seoDescription:
      "Free fit checker. Enter item and space dimensions to see whether it fits, the clearance on each side, and what to do if it doesn’t.",
    searchKeywords: [
      "will it fit calculator",
      "dimension fit checker",
      "clearance calculator",
      "will it fit through doorway",
      "size fit tool",
    ],
    relatedTools: ["dimension-comparison", "compatibility-checker", "percentage-difference-calculator"],
    relatedGuideSlugs: ["understanding-product-dimensions", "compatibility-checking-before-you-buy"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },

  // ---------- Decide ----------
  {
    tool_id: "decision-matrix",
    name: "Weighted Decision Matrix",
    type: "decide",
    domain: "universal",
    category: "decision",
    description:
      "Add your options and criteria, weight what matters to you, score each option — and get a transparent weighted ranking you can adjust live.",
    problem: "I have several options and several priorities — which one actually wins for me?",
    inputs: ["Options (2–4)", "Criteria (2–8)", "Weights", "Scores"],
    outputs: ["Weighted ranking", "Per-criterion breakdown", "Margin of victory", "Editable matrix"],
    purpose:
      "Give users a transparent, adjustable scoring framework instead of a black-box recommendation.",
    route: "/tools/decision-matrix/",
    dataRequirements: ["calculation-definition", "user-input"],
    logic: "Weighted score = Σ(score × weight) / Σ(weight); normalized 0–100",
    seoTitle: "Weighted Decision Matrix — Rank Your Own Criteria",
    seoDescription:
      "Free weighted decision matrix. Enter options and criteria, set weights and scores, get a transparent ranking you can adjust.",
    searchKeywords: [
      "decision matrix",
      "weighted scoring model",
      "pros and cons calculator",
      "how to decide between options",
      "decision tool",
    ],
    relatedTools: ["product-finder", "plan-comparison", "repair-vs-replace-calculator"],
    relatedGuideSlugs: ["building-a-decision-matrix", "choosing-a-phone-by-use-case"],
    status: "built",
    featured: true,
    version: "1.0.0",
    lastUpdated: "2026-09-24",
  },
  {
    tool_id: "spec-comparison",
    name: "Specification Comparison Tool",
    type: "compare",
    domain: "universal",
    category: "product-specs",
    description:
      "Compare the specifications of any two products side by side - laptops, tablets, monitors, cameras, headphones or phones - with a category template you can edit.",
    problem: "I have two spec sheets and I want the differences laid out for me.",
    inputs: ["Category", "Product A name", "Product B name", "Specification values"],
    outputs: [
      "Side-by-side specification table",
      "Per-row difference labels",
      "Differences-only view",
      "Custom specification rows",
    ],
    purpose:
      "Let users compare any two products on their own verified numbers when we do not publish a product record for that category yet.",
    route: "/tools/spec-comparison/",
    dataRequirements: ["user-input", "attribute-templates"],
    logic:
      "Load category template -> compare entered values per row -> label same/higher/lower/different/missing",
    seoTitle: "Specification Comparison Tool - Compare Any Two Products",
    seoDescription:
      "Free specification comparison tool. Enter the specs of any two products - laptop, tablet, monitor, camera or headphone - and see a side-by-side table with differences highlighted.",
    searchKeywords: [
      "spec comparison",
      "compare specifications",
      "specification comparison",
      "product specs comparison",
      "compare features",
      "feature comparison",
      "compare laptop specs",
      "compare two products",
      "product comparison chart",
    ],
    relatedTools: ["product-comparison", "dimension-comparison", "decision-matrix"],
    relatedGuideSlugs: ["how-to-compare-product-specifications", "specs-explained"],
    status: "built",
    version: "1.0.0",
    lastUpdated: "2026-09-29",
  },
];
