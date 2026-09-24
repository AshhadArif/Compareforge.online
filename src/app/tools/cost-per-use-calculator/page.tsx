import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("cost-per-use-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Cost per use divides the full price of something by the number of times you will realistically use it over its life. Total uses come from your weekly frequency, the weeks per year you actually use it, and how long you keep it.",
      "The tool also reports cost per year and cost per day, which are the same total spread over different denominators — useful for comparing against daily habits like coffee or streaming.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Enter what you paid (or would pay), then estimate honest usage. The result is only as accurate as that frequency number — overestimating how often you will use something is the classic way to talk yourself into a bad purchase.",
      "For memberships, enter the membership price and your real visit frequency, not the ‘unlimited’ label. For equipment, enter the purchase price and how many times per week it actually comes out of the cupboard.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "Cost per use is the number to compare against alternatives: if a $400 camera gets used 100 times over three years it costs $4 per use; a $120 instant camera used 40 times costs $3 per use — cheaper per use, even though the per-use gap is smaller than the sticker gap suggests.",
      "Compare that per-use cost to what the same activity costs otherwise — renting, going out, hiring — to judge whether the purchase is good value for your actual habits.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "A $180 gym annual plan, used 3 times a week for 45 weeks a year over one year: total uses are 135, so each visit costs $1.33. As a daily figure it is $0.49.",
      "A $900 laptop used every workday (5 days × 48 weeks) for four years: 960 uses, about $0.94 per use. The absolute price disappears into the usage pattern — which is the point.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "This measures cost, not quality or satisfaction. A low cost per use can still be a bad purchase if the item is unpleasant to use — the number is one input to the decision, not the decision itself.",
      "Resale value is not deducted. If you plan to sell the item afterwards, subtract a realistic resale amount from the price before calculating.",
      "Seasonal usage matters: set weeks per year to the weeks you truly use it (a holiday item might be 4 weeks, not 52).",
    ],
  },
];

const methodology = [
  "Total uses = uses per week × weeks per year × years kept.",
  "Cost per use = price ÷ total uses; cost per year = price ÷ years; cost per day = price ÷ (years × 365).",
  "Inputs are validated: price ≥ 0, usage and durations > 0.",
  "Pure arithmetic on your inputs — no benchmarks or external data are applied.",
];

const faq = [
  {
    question: "What does cost per use mean?",
    answer:
      "It is the total price of an item divided by how many times you will use it over its lifetime. It translates an upfront price into the price of each actual use.",
  },
  {
    question: "How do I decide how often I use something?",
    answer:
      "Be conservative. Track it for a week if you can, or recall honestly how often similar items get used. Lower, realistic frequency gives a higher (more truthful) cost per use.",
  },
  {
    question: "Is a low cost per use always a good deal?",
    answer:
      "No. It measures efficiency of spend, not usefulness. Something you use constantly but hate still has a low cost per use — weigh enjoyment, quality and need alongside the number.",
  },
  {
    question: "Should I include resale value?",
    answer:
      "If you plan to sell the item, subtract a realistic resale amount from the price first. The calculator uses the price you enter as the net cost.",
  },
  {
    question: "What is the difference between cost per use and unit price?",
    answer:
      "Unit price normalizes by physical quantity (per ounce, per GB). Cost per use normalizes by your personal usage frequency — the same unit price can yield very different cost per use for different people.",
  },
];

export default function CostPerPage() {
  return (
    <CalculatorToolPage
      toolId="cost-per-use-calculator"
      intro="Turn any price into a true cost per use from how often you actually use it — the number that shows whether something is worth buying."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
