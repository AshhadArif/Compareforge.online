import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("percentage-difference-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Percentage difference measures the gap between two numbers relative to their average. Unlike percentage change, it does not treat either value as the starting point — both numbers contribute equally. That makes it the right formula when you are comparing two measurements, two quotes, or two specifications and neither one is a baseline.",
      "The formula is: take the absolute difference |A − B|, divide it by the average of the two values (A + B) ÷ 2, then multiply by 100. Our calculator shows each of those steps so you can follow or reproduce the working yourself.",
    ],
  },
  {
    heading: "Percentage Difference vs Percentage Change",
    paragraphs: [
      "These two calculations are commonly confused because they both produce a percentage, but they answer different questions. Percentage difference asks “how far apart are these two values?” and divides by the average. Percentage change asks “how much did something move from where it started?” and divides by the original value only.",
      "If your values are 45 and 60, the percentage difference is 28.6% (divided by their average of 52.5). The percentage change from 45 to 60 is 33.3% (divided by 45). Neither answer is wrong — they respond to different questions. If one of your numbers is a baseline or starting value, use our Percentage Change Calculator instead.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "A phone battery is listed as 4,500 mAh on one model and 5,000 mAh on another. The absolute difference is 500 mAh. The average of the two values is 4,750 mAh. Dividing 500 by 4,750 gives 0.1053, so the percentage difference is 10.5%.",
      "Notice the result is modest — even though the larger battery looks ‘much bigger’ in marketing material, the two values are within about 10% of each other. That is exactly the context percentage difference provides.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Percentage difference is undefined when both values are zero, and the average of the two values is zero (for example, −50 and +50). The calculator will flag these cases instead of returning a misleading number.",
      "Because the formula divides by the average, small inputs produce large percentages: a difference between 1 and 2 is 66.7%, while the difference between 100 and 101 is 1%. Always read a percentage together with the absolute numbers it came from.",
      "This tool performs arithmetic only. It does not judge whether a difference is significant — a 10% gap in battery capacity may matter more to you than a 10% gap in weight. Our Product Comparison Tool adds significance ratings for that purpose.",
    ],
  },
];

const methodology = [
  "Formula: |A − B| ÷ ((A + B) ÷ 2) × 100 — the standard symmetric percentage-difference definition used in statistics and science.",
  "The calculator runs entirely in your browser; nothing you enter is transmitted or stored.",
  "Inputs accept negative numbers and decimals. Both-zero and zero-average cases return an explicit error instead of NaN.",
  "No external data, prices, or benchmarks are involved — this is a pure calculation.",
];

const faq = [
  {
    question: "What is the formula for percentage difference?",
    answer:
      "Percentage difference = |A − B| ÷ ((A + B) ÷ 2) × 100. Subtract the two values, take the absolute value, divide by their average, and multiply by 100.",
  },
  {
    question: "What is the percentage difference between 45 and 60?",
    answer:
      "28.57%. The absolute difference is 15, the average is 52.5, and 15 ÷ 52.5 × 100 = 28.57%.",
  },
  {
    question: "Is percentage difference the same as percentage change?",
    answer:
      "No. Percentage difference divides by the average of both values and treats them equally. Percentage change divides by the original value only and is directional (increase or decrease). Use difference when neither value is a baseline; use change when one is.",
  },
  {
    question: "Why divide by the average instead of one of the values?",
    answer:
      "Dividing by a single value privileges that value as the reference point. When you are comparing two peer measurements — two prices, two specifications — neither is the baseline, so the average is the fair denominator.",
  },
  {
    question: "Does this tool store my numbers?",
    answer:
      "No. The calculation runs in your browser. If you share the result URL, the query parameters travel with the link — those are the values you typed, and such URLs are marked noindex so they do not compete with this page in search.",
  },
];

export default function PercentageDifferencePage() {
  return (
    <CalculatorToolPage
      toolId="percentage-difference-calculator"
      intro="Enter two numbers to get the symmetric percentage difference, the absolute gap, and the full working — with no baseline bias in either direction."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
