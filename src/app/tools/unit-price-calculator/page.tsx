import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("unit-price-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Unit price divides each option’s price by its quantity, putting both offers on a common per-unit scale. The tool then compares the two unit prices, identifies the better deal, and expresses the gap as a percentage of the higher unit price.",
      "That normalization is what makes differently sized packs comparable. A bigger package often has a lower unit price, but not always — bundle pricing, promo sizes and import premiums break the assumption often enough that checking is worth ten seconds.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Type a unit name first (oz, ml, g, GB, metres, servings — anything consistent), then enter price and quantity for both options. Quantities must be in the same unit for the comparison to mean anything.",
      "For groceries use weight or volume; for storage use gigabytes; for cable use metres; for subscriptions use months of service. If the two options use different units, convert them first.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The two unit prices are the core numbers — lower is cheaper per unit. The savings percentage is measured against the higher unit price, telling you how much of a premium the worse deal carries.",
      "For everyday shopping, most regions require unit pricing on shelf labels; this tool lets you redo that math at home for online offers, bulk orders, or multi-packs where the label is missing.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "A 500 ml bottle costs $4.50; a 1,000 ml bottle costs $8.00. Entered as 500 and 1,000 ml, the tool returns $0.009 versus $0.008 per millilitre — the larger bottle is 11.1% cheaper per millilitre even though its sticker price is higher. Set the unit to “100 ml” and enter 5 and 10 instead, and you get $0.90 versus $0.80 per 100 ml: the percentage gap is identical either way, only the scale changes.",
      "Storage edition: 100 GB at $5.00/month versus 500 GB at $15.00/month. Per GB that is $0.05 versus $0.03 — the bigger tier is 40% cheaper per GB, but only worth it if you actually use the space. Unit price measures the deal, not your needs.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "A better unit price only matters if you will consume the quantity. Buying double the size to ‘save’ 10% is a loss if half expires or goes unused — pair this with the Cost Per Use Calculator for usage-based value.",
      "Watch for hidden differences: concentrated formulas, different concentrations, membership-only prices, or included features. Unit price normalizes quantity, not quality.",
      "The tool does not fetch live store prices. Enter the numbers you actually see at checkout.",
    ],
  },
];

const methodology = [
  "Unit price = price ÷ quantity, computed separately for both options.",
  "Savings % = (higher unit price − lower unit price) ÷ higher unit price × 100.",
  "Quantities must be greater than zero and expressed in the same unit.",
  "All math is client-side; no prices or inputs are stored or transmitted.",
];

const faq = [
  {
    question: "What is a unit price?",
    answer:
      "Unit price is the cost for one standard unit of measure — per ounce, per 100 ml, per gigabyte, per metre. It is calculated as price divided by quantity.",
  },
  {
    question: "How do I compare two different pack sizes?",
    answer:
      "Enter each pack’s price and quantity in the same unit. The tool returns both unit prices and tells you which pack is cheaper per unit and by how much.",
  },
  {
    question: "Is the bigger size always the better deal?",
    answer:
      "No. Unit price often falls as size grows, but promos, small-pack discounts and premium products break the pattern. The calculator shows the real numbers rather than assuming.",
  },
  {
    question: "Can I use this for subscriptions?",
    answer:
      "Yes — treat months of service as the quantity. For comparing monthly versus annual billing specifically, the Monthly vs Annual Savings Calculator gives a fuller picture including cash flow.",
  },
  {
    question: "Does this work for currencies other than dollars?",
    answer:
      "Yes. The math is currency-agnostic as long as both prices are in the same currency. The $ sign is only a label.",
  },
];

export default function UnitPricePage() {
  return (
    <CalculatorToolPage
      toolId="unit-price-calculator"
      intro="Enter price and quantity for two options to compare cost per unit — per ounce, gram, ml, GB or any unit — and see which pack is the better deal."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
