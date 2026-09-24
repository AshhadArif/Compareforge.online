import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("monthly-vs-annual-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "The calculator annualizes the monthly price (monthly × 12), subtracts the annual price to find the cash saving, and divides that saving by the annualized monthly total to give the percentage saved. It also reports the effective monthly cost of the annual plan (annual ÷ 12) so you can compare it against the monthly sticker price directly.",
      "If the annual plan works out more expensive, the tool says so — some ‘annual’ offers are not discounted at all, and a few are priced above twelve monthly payments once fees are included.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Enter the exact monthly price and the exact annual price for the same service and tier. Comparing a basic monthly tier against a premium annual tier will produce nonsense — match the tiers.",
      "The result panel shows four things: the cash saving over one year, the percentage saved, the annualized cost of paying monthly, and the effective monthly price of the annual plan.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "Percentage saved is measured against the annualized monthly total, which answers ‘what share of my yearly spend does switching save?’ The effective monthly cost answers the cash-flow question: ‘what does the annual plan cost me per month in real terms?’",
      "A saving under about 5% may not be worth locking in a year of payments up front, especially if you might cancel. A saving above 15–20% usually is — but that judgment depends on how confident you are about staying subscribed.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "A service costs $12.99 per month or $119 per year. Twelve monthly payments total $155.88. The annual plan saves $36.88 — 23.7% less — and its effective monthly cost is $9.92.",
      "Another service quotes $9.99 monthly or $119.99 yearly. Monthly annualized is $119.88, so the annual plan saves only $0.11 (0.09%). In that case paying monthly preserves flexibility at almost no cost.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "This calculator compares list prices only. Trials, intro rates that jump after 12 months, and taxes are not modeled — include them manually if they apply.",
      "Annual billing means money leaves your account up front and refunds after cancellation are often pro-rata at best. The percentage saving should be weighed against lock-in risk.",
      "For auditing many subscriptions at once, use the Subscription Audit Calculator; for choosing between full plan tiers, use the Plan Comparison Tool.",
    ],
  },
];

const methodology = [
  "Annualized monthly = monthly price × 12; saving = annualized monthly − annual price.",
  "Percentage saved = saving ÷ annualized monthly × 100.",
  "Effective monthly cost of annual plan = annual ÷ 12.",
  "Negative savings are reported honestly (annual costs more).",
  "Only the prices you enter are used — no third-party pricing data.",
];

const faq = [
  {
    question: "How do I calculate if annual billing is worth it?",
    answer:
      "Multiply the monthly price by 12 and subtract the annual price. Divide the saving by the 12-month total for the percentage. If the result is positive you save; if negative, the annual plan costs more.",
  },
  {
    question: "What is a typical annual billing discount?",
    answer:
      "Discounts vary widely by service — roughly 10–20% is common where a discount exists, but many plans offer none. Always calculate rather than trusting a ‘save 20%’ badge.",
  },
  {
    question: "Should I pay annually just to save money?",
    answer:
      "Not automatically. Consider how likely you are to cancel, whether the upfront cash flow is comfortable, and refund terms. A 5% saving may not justify lock-in; a 25% saving usually does.",
  },
  {
    question: "Why is the effective monthly cost of the annual plan useful?",
    answer:
      "It puts both options on a per-month scale so you can compare against budgeting figures — the annual plan’s effective monthly cost is what it really costs you each month, even though you pay it up front.",
  },
  {
    question: "Does this work for gym memberships and insurance?",
    answer:
      "Yes, any service with a monthly and an annual price works. Enter the real quoted prices including mandatory fees for the most accurate comparison.",
  },
];

export default function MonthlyVsAnnualPage() {
  return (
    <CalculatorToolPage
      toolId="monthly-vs-annual-calculator"
      intro="See exactly how much you save paying yearly instead of monthly — cash saving, percentage saved, and the effective monthly cost of the annual plan."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
