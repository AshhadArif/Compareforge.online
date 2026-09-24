import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("price-difference-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "The calculator takes two prices and reports the cash gap between them, which option is cheaper, and the percentage gap measured against the cheaper price (so a $100 gap on a $150 item reads as a bigger deal than a $100 gap on a $2,000 item).",
      "If you enter a quantity, it also multiplies the per-unit gap — useful when comparing pack prices or buying several units at once. Everything runs in your browser with the steps shown so the arithmetic is auditable.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Enter the two prices exactly as listed, ignoring currency symbols — the tool works in whatever currency you think in (default display is $). Add a quantity only when you are buying multiples of the same offer.",
      "Read the result panel top to bottom: cash difference first (the number that hits your wallet), then which option is cheaper, then the percentage gap for context, then the bulk saving if you entered a quantity.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The percentage gap is calculated against the cheaper price, not the average. That framing answers the practical question: “how much more does the expensive option add relative to the cheapest way to get the thing?”",
      "When both prices are equal the gap is zero and the tool says so plainly. When one price is zero (a free item), the percentage gap is undefined — the cash difference still applies and the tool avoids dividing by zero.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "Two retailers list the same laptop at $699 and $799. The cash difference is $100. Measured against the cheaper price of $699, the expensive one is 14.3% more. If your team is buying 5 units, the bulk saving versus the pricier seller is $500.",
      "Switching to pack sizes: a 500 g bag at $4.50 and a 1,000 g bag at $8.00. The price difference calculator shows a $3.50 cash gap — but the Unit Price Calculator shows the larger bag is also cheaper per 100 g. Use this tool for the cash gap, unit pricing for the deal quality.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Listed prices exclude tax, shipping, membership requirements and time-limited promos unless you have typed them in. Include those costs yourself when they apply.",
      "A larger percentage gap is not automatically a worse deal — cheaper options can be smaller, older, or missing features. Pair this calculator with our Product Comparison or Plan Comparison tools to see what the price difference buys.",
      "MSRP figures shown elsewhere on CompareForge are manufacturer suggested prices for reference; they may differ from street prices at any moment. This calculator only uses numbers you enter.",
    ],
  },
];

const methodology = [
  "Cash difference = |Price A − Price B|.",
  "Percentage gap = difference ÷ cheaper price × 100 (undefined if the cheaper price is 0).",
  "Bulk saving = cash difference × quantity, when quantity ≥ 1.",
  "The calculator uses only the numbers you enter — no live price feeds, no stored price data.",
  "Negative prices are rejected; comparison prices should never be negative.",
];

const faq = [
  {
    question: "How do I calculate the difference between two prices?",
    answer:
      "Subtract one price from the other and take the absolute value for the cash gap. For a percentage, divide that gap by the cheaper price and multiply by 100.",
  },
  {
    question: "How much more expensive is A than B in percent?",
    answer:
      "Enter both prices. The tool divides the difference by the cheaper price — so “how much more is A than B” is read relative to B when B is the cheaper option.",
  },
  {
    question: "Does the calculator include tax and shipping?",
    answer:
      "No. It compares exactly the numbers you enter. If tax or shipping differs between options, add them to the prices first so the comparison reflects your real total.",
  },
  {
    question: "Can I compare prices in currencies other than dollars?",
    answer:
      "Yes. The math is currency-agnostic — enter both prices in the same currency and the difference and percentage are correct. The $ symbol is only a display label.",
  },
  {
    question: "What if one price is a subscription and the other is a one-off?",
    answer:
      "Normalize them first. Use our Monthly vs Annual Savings Calculator or Total Cost of Ownership Calculator to convert recurring prices into comparable totals, then compare.",
  },
];

export default function PriceDifferencePage() {
  return (
    <CalculatorToolPage
      toolId="price-difference-calculator"
      intro="Compare two prices side by side: cash difference, which is cheaper, the percentage gap, and your saving when buying multiple units."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
