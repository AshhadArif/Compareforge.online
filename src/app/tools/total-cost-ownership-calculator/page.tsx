import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("total-cost-ownership-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Each option is totaled over the horizon you choose: upfront cost, plus monthly recurring × months, plus annual one-offs × years. The totals are ranked and converted to monthly equivalents so you can compare cash-flow shapes as well as bottom lines.",
      "Common setups are buy versus subscribe (purchase price against a monthly fee) versus lease (upfront deposit plus monthly payments). A third option can model a hybrid path such as buying refurbished.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Name each path, then enter its real numbers. A pure purchase typically has a large upfront cost and small recurring amounts (insurance, accessories). A subscription flips that shape: little or nothing up front, steady monthly cost.",
      "Pick the horizon that matches how long you would actually use the thing — 1 year for a trial period, 3 years for typical electronics, 5 years for appliances or vehicles.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The cheapest total wins over your chosen horizon, but the horizon is a lever: a subscription that beats a purchase over one year may lose over five. Run the tool at multiple horizons to see where the lines cross.",
      "Monthly equivalents matter for budgeting — an option with the lowest total but a heavy upfront payment can still be the wrong choice if cash flow is tight.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "Software that can be bought outright for $899 with $49/year updates, or subscribed at $29.99/month with no upfront cost, over 3 years (36 months).",
      "Buy: $899 + ($49 × 3) = $1,046. Subscribe: $29.99 × 36 = $1,079.64. Buying is $33.64 cheaper over three years — but the subscription needed only $0 up front and can be cancelled. Extend the horizon to 5 years and buying pulls clearly ahead.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "The model assumes prices stay flat. Subscriptions often rise; purchases rarely do — if you know a planned increase, model it manually by adjusting the monthly figure to an average.",
      "Interest, financing fees, resale value and tax differences are not included. Subtract expected resale from a purchase’s upfront cost if you will sell at the end.",
      "This is a cost model, not advice. Convenience, flexibility and ownership benefits are yours to weigh.",
    ],
  },
];

const methodology = [
  "Total = upfront + (monthly × months) + (annual × years) per option over the selected horizon.",
  "Monthly equivalent = total ÷ months. Options are ranked by total cost.",
  "Options with no entered costs are skipped; at least two options are required.",
  "Costs are assumed constant over the horizon; no inflation, interest or resale modeling.",
  "All figures come from user inputs — no live pricing is fetched.",
];

const faq = [
  {
    question: "What does total cost of ownership mean?",
    answer:
      "It is the full cost of an option over a period of time: the upfront price plus every recurring and periodic cost you incur while owning or using it.",
  },
  {
    question: "How do I compare buying versus subscribing?",
    answer:
      "Enter the purchase price and its ongoing costs as one option, and the subscription’s upfront and monthly fees as the other, then choose a horizon. The tool totals and ranks both.",
  },
  {
    question: "What horizon should I choose?",
    answer:
      "How long you would genuinely use the thing. Short horizons favor subscriptions; long horizons usually favor purchases. Testing 1, 3 and 5 years shows where the balance tips.",
  },
  {
    question: "Does the calculator include interest or financing?",
    answer:
      "No. Enter cash prices. If you are financing, add the interest to the upfront cost or spread it into the monthly figure so it is included in the total.",
  },
  {
    question: "Can I model resale value?",
    answer:
      "Yes — subtract the expected resale amount from the purchase option’s upfront cost before entering it, since that money returns to you at the end of the horizon.",
  },
];

export default function TcoPage() {
  return (
    <CalculatorToolPage
      toolId="total-cost-ownership-calculator"
      intro="Compare buy, subscribe and lease options over 1, 3 or 5 years by totalling upfront, recurring and periodic costs for each path."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
