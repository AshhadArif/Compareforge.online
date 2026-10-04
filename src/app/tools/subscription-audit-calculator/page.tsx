import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import SubscriptionAudit from "@/components/tools/SubscriptionAudit";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("subscription-audit-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Add every recurring charge you pay — streaming, software, storage, memberships, boxes — with its price and billing period. Monthly-billed items add directly; yearly-billed items are divided by 12 so everything lands on one monthly baseline.",
      "The tool totals your monthly and annual spend, sorts line items by annual cost so the biggest leaks are visible, and lets you model the savings of cancelling any single subscription as a share of your total.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Pull up your bank or card statement for the last two months and transcribe every recurring charge, including annual ones that only appear occasionally. Family or shared plans: enter your share if that is what you pay, or the full price if you cover it.",
      "Use the cancel simulator after the totals: selecting a subscription shows its annual cost and what percentage of your total it represents — often a number people have never seen stated plainly.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The annual total is the number that shocks most people: small monthly charges compound. $47/month across a handful of services is $564/year — visible at a glance in the summary cards.",
      "The largest line items sorted by annual cost show where a cancellation actually matters. Cutting a $60/year service barely dents the total; cutting a $240/year one does.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "The tool records what you enter — it does not connect to your accounts or verify prices. Accuracy depends on your transcription.",
      "Shared family plans look large if you enter the full price; consider entering your portion for a truer picture of personal spend, and note which convention you used.",
      "Before cancelling anything, check for annual commitments already paid, shared-use dependencies, and whether a cheaper tier exists — the Plan Comparison Tool can model tier alternatives.",
    ],
  },
];

const methodology = [
  "Monthly cost = price for monthly billing, price ÷ 12 for annual billing; annual = monthly × 12.",
  "Totals sum only items with a valid name and non-negative price; invalid rows are ignored until fixed.",
  "Cancel savings = that item’s annual cost and its percentage of the summed annual total.",
  "Client-side only — subscription data never leaves the browser.",
];

const faq = [
  {
    question: "How do I calculate my total subscription cost?",
    answer:
      "List each subscription with its price and billing period. This tool converts annual charges to monthly equivalents, sums everything, and shows both monthly and annual totals plus the largest line items.",
  },
  {
    question: "How much are most people spending on subscriptions?",
    answer:
      "It varies enormously by household. The honest answer for you comes from your own statement — that is exactly what this audit is for. Common findings: several small charges nobody remembers approving.",
  },
  {
    question: "Should I enter annual subscriptions as their yearly price?",
    answer:
      "Yes — set the period to ‘year’. The tool divides by 12 internally so annual and monthly items total correctly on the same baseline.",
  },
  {
    question: "What do I do after seeing the total?",
    answer:
      "Review the biggest line items first, cancel what you do not use, and renegotiate or downgrade what you do. For alternatives or tier changes, the Plan Comparison Tool compares specific plans side by side.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. Everything runs in your browser tab and is cleared when you close or refresh the page. This tool does not write your entries into the URL, and nothing you type is stored or transmitted.",
  },
];

export default function SubscriptionAuditPage() {
  const tool = getToolById("subscription-audit-calculator");
  if (!tool) return null;
  return (
    <ToolShell
      tool={tool}
      intro="List your recurring subscriptions and see monthly totals, annual totals, biggest line items, and exactly how much you would save by cancelling any one of them."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <SubscriptionAudit />
    </ToolShell>
  );
}
