import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("percentage-change-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Percentage change measures movement from an original value to a new value. The tool subtracts the original from the new value to get the absolute change, divides that change by the original (using its absolute value so negative baselines behave correctly), and multiplies by 100.",
      "The result is labelled as an increase or a decrease automatically, because the sign of the change tells you the direction. A negative change is reported as a percentage decrease with its magnitude.",
    ],
  },
  {
    heading: "When to Use Change Instead of Difference",
    paragraphs: [
      "Use percentage change whenever one of your numbers is a starting point: a price that moved, a value that grew or shrank, a measurement taken before and after. The original value is the baseline, so it alone is the denominator.",
      "If neither value is a starting point — two independent measurements compared side by side — percentage difference is the correct formula instead. Our Percentage Difference Calculator covers that case.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "A subscription costs $799 per year and the new price is $899. The change is +100. Dividing 100 by the original 799 gives 0.1252, so the price increased by 12.52%.",
      "Run the same pair in reverse — original $899, new $799 — and you get −11.12%. The asymmetry is the point: a 12.5% rise and an 11.1% fall are the two halves of the same price move, which is why the formulas differ.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Percentage change is undefined when the original value is 0 — anything divided by zero has no meaningful percentage. The calculator flags this instead of inventing a number.",
      "Large percentages from small bases are easy to misread: a change from 1 to 2 is a 100% increase, but the absolute move is 1. Always keep the absolute change next to the percentage.",
      "The tool does not adjust for inflation, seasonality, or compounding. For recurring price changes over time, chain the changes yourself or model them with our Monthly vs Annual or Subscription Audit calculators.",
    ],
  },
];

const methodology = [
  "Formula: (New − Original) ÷ |Original| × 100 — the standard percentage-change definition.",
  "Direction is derived from the sign of the change; decreases are shown as positive magnitudes with a decrease label.",
  "Original value of 0 returns an explicit error.",
  "All computation happens client-side; no data leaves the browser.",
];

const faq = [
  {
    question: "What is the percentage change formula?",
    answer:
      "Percentage change = (New Value − Original Value) ÷ |Original Value| × 100. A positive result is an increase; a negative result is a decrease.",
  },
  {
    question: "What is the percentage increase from 799 to 899?",
    answer: "12.52%. The change is 100, and 100 ÷ 799 × 100 = 12.52%.",
  },
  {
    question: "Percentage change vs percentage difference — which should I use?",
    answer:
      "If one value is a baseline (a price you paid, a starting measurement), use percentage change. If you are comparing two peer values with no baseline, use percentage difference — it divides by the average instead.",
  },
  {
    question: "Why is the decrease percentage different when I swap the values?",
    answer:
      "Because each calculation divides by its own original. Going from 100 to 80 is −20%; going from 80 to 100 is +25%. The absolute move is the same; the reference point is not.",
  },
  {
    question: "How do I calculate a percentage decrease?",
    answer:
      "Enter the higher number as the original value and the lower number as the new value. The calculator reports the magnitude as a percentage decrease automatically.",
  },
];

export default function PercentageChangePage() {
  return (
    <CalculatorToolPage
      toolId="percentage-change-calculator"
      intro="Enter an original and a new value to get the percentage increase or decrease, the absolute change, and each step of the working."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
