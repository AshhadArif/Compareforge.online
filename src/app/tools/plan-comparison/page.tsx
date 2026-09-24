import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import PlanComparison from "@/components/tools/PlanComparison";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("plan-comparison");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "You enter the plans — their names, prices, billing periods and features — because plan pricing changes too often for any website to publish reliably. The tool normalizes every plan to a monthly and annual cost, ranks them, and builds a feature matrix from the allowances you list.",
      "Normalization is the whole point: a $99/year plan and a $11.99/month plan look incomparable on their face, but annualized they are $8.25/month versus $11.99 — the annual option is 31% cheaper per month.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Open the provider’s pricing page next to this tool and transcribe each tier: price, whether it bills monthly or annually, and a comma-separated list of the features that matter to you (seats, storage, quality tiers, downloads, offline access).",
      "The feature matrix only includes features you typed — leaving a feature out of one plan’s list marks it absent there. Be strict: only mark a feature if that plan actually includes it.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The normalized cost cards show monthly equivalent, yearly total and which plan is cheapest per month. The lowest monthly cost is not automatically the right plan — the feature matrix shows what you sacrifice for it.",
      "When the cheapest plan lacks features you need, the right comparison is between the plans that have them: delete plans from the input until only viable candidates remain.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Prices you enter are assumed accurate and current. We do not store or verify them — always confirm on the provider’s site before purchase.",
      "The tool does not model taxes, regional pricing, introductory rates that increase later, or per-seat scaling. For multi-seat pricing, enter the full multi-seat price directly.",
      "Annual plans are compared on cost only; lock-in and refund terms are your judgment call.",
    ],
  },
];

const methodology = [
  "Monthly equivalent = price ÷ 12 for annual plans, price for monthly plans; annual total = monthly × 12.",
  "Feature matrix: features are split on commas/newlines, unioned across plans, and checked per plan as exact string matches.",
  "Cheapest plan = lowest normalized monthly cost among plans with valid prices (≥ 0).",
  "All data is user-entered at request time; nothing is persisted server-side.",
];

const faq = [
  {
    question: "How do I compare two subscription plans?",
    answer:
      "Enter each plan’s price, billing period and features. The tool normalizes both to monthly and annual costs, shows which is cheaper, and builds a side-by-side feature matrix.",
  },
  {
    question: "Why not use your built-in plan prices?",
    answer:
      "Subscription pricing changes constantly and varies by region and promotion. User-entered prices are always current — we would rather you type two numbers than trust a stale table.",
  },
  {
    question: "How is the cheapest plan determined?",
    answer:
      "By normalized monthly cost: annual prices are divided by 12 and compared directly against monthly prices. The lowest monthly equivalent is flagged.",
  },
  {
    question: "Can I compare three plans?",
    answer:
      "Yes — up to three plans. Add the third with the Add plan button; it joins the cost cards and the feature matrix automatically.",
  },
  {
    question: "What should I list as features?",
    answer:
      "The differentiators you care about: seats, storage limits, video quality, offline mode, support level. The matrix only includes what you enter, so keep the list to true decision factors.",
  },
];

export default function PlanComparisonPage() {
  const tool = getToolById("plan-comparison");
  if (!tool) return null;
  return (
    <ToolShell
      tool={tool}
      intro="Enter two or three plans with their prices and features — get normalized monthly and annual costs, a feature matrix, and the cheapest option per month."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <PlanComparison />
    </ToolShell>
  );
}
