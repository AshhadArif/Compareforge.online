import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("upgrade-vs-keep-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "The upgrade path’s net cost is the new device’s price minus any trade-in credit. Spread over the months you would keep it, that becomes an upgrade cost per month.",
      "The keep path has no cash outlay, but your current device’s value declines as you use it — that decline is modeled as its current value spread across the same number of months. The two monthly figures are then compared.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Use your device’s real trade-in or resale estimate rather than the sticker price — the tool is about money you actually spend or forgo.",
      "Set the months-to-keep window to your realistic replacement cycle (24, 36, 48 months are common). The comparison is only meaningful over a fixed horizon that applies to both paths.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The lower monthly cost wins arithmetically. But the tool’s real value is showing the size of the gap: if upgrading costs $8 more per month than keeping, you are paying $8/month for the newer device — the question becomes whether the new features are worth that.",
      "The interpretation frames the difference in plain language, and the warnings remind you that this is arithmetic on estimates, not financial advice.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "Your current phone is worth $350. A new one costs $999 with a $300 trade-in, and you would keep it 36 months. Net upgrade cost is $699 → $19.42 per month. Keeping spreads the $350 current value over 36 months → $9.72 per month.",
      "Upgrading costs $9.69 more per month on this horizon. That is the price of the new device’s improvements — you decide whether they are worth about $10 a month.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Device values are estimates; real trade-in offers vary with condition, storage tier and promotions. The calculator does not predict resale markets.",
      "It does not model the performance advantage of a new device, battery health, warranty, or the risk of keeping an unsupported phone — factors that often decide the question for people.",
      "This is not financial advice. It organizes your own numbers; the decision remains yours.",
    ],
  },
];

const methodology = [
  "Net upgrade cost = upgrade price − trade-in credit (floor 0).",
  "Upgrade per month = net cost ÷ months kept; keep per month = current device value ÷ months kept.",
  "Current value is treated as value consumed by keeping the device rather than cash spent.",
  "All inputs are user-provided estimates; no market data or device values are fetched.",
  "Results are labeled as arithmetic, not financial advice.",
];

const faq = [
  {
    question: "How do I know if my phone upgrade is worth it?",
    answer:
      "Enter the upgrade price, your current device's value, any trade-in, and how long you would keep the new phone. The tool compares the monthly cost of upgrading versus keeping, so you can see exactly what the upgrade costs per month.",
  },
  {
    question: "Should I use resale value or trade-in value?",
    answer:
      "Use whichever you would actually realize. Trade-in is convenient but usually lower; private sale is higher but takes effort. The number only matters as the credit you can really count on.",
  },
  {
    question: "How many months should I choose?",
    answer:
      "Your realistic replacement cycle. If you replace phones every three years, use 36. Stretching the horizon lowers the upgrade’s monthly cost, so use an honest window.",
  },
  {
    question: "Why does keeping a device have a monthly cost?",
    answer:
      "Because the device’s value is declining while you use it — the $350 it is worth today will be less in 36 months. Spreading that consumed value over the period gives a fair comparison against the upgrade’s cash cost.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. It is arithmetic on numbers you provide, with assumptions you control. Decisions about debt, budgeting or timing should consider your full situation.",
  },
];

export default function UpgradeVsKeepPage() {
  return (
    <CalculatorToolPage
      toolId="upgrade-vs-keep-calculator"
      intro="Enter what your current device is worth, what the upgrade costs, and how long you would keep it — then compare the true monthly cost of upgrading versus keeping."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
