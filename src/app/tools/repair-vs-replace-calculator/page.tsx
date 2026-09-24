import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("repair-vs-replace-calculator");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Both paths are converted to cost per month of usable life. The repair path’s cost per month is (repair cost − salvage value) ÷ months you expect the repair to last. The replace path’s cost per month is the replacement price ÷ expected life of the new item.",
      "Comparing monthly costs puts a $250 repair lasting two years ($10.42/month) against an $899 replacement lasting four years ($18.73/month) — on the arithmetic, repairing stretches further per dollar of life.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Get a real repair quote rather than a guess, and be honest about how long the repaired item will actually last. For the replacement, use the full price including tax and any mandatory accessories.",
      "If the broken item still has salvage value (parts, trade-in, selling it as-is), enter it — it reduces the effective repair cost.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The lower cost per month is the better value on a pure dollar basis. The gap between the two figures shows how much more or less one path costs for each month of continued use.",
      "The interpretation text translates the ratio into plain language, and the tool always restates the assumptions — because the lifespan estimates drive the entire result.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "A two-year-old laptop needs a $250 battery and board repair, expected to last 24 more months. A replacement costs $1,100 and is expected to last 48 months.",
      "Repair path: $250 ÷ 24 = $10.42 per month. Replacement: $1,100 ÷ 48 = $22.92 per month. Repairing costs about 55% less per month of life — unless you expect the repair to fail sooner than 24 months.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "This is arithmetic, not advice. Downtime, data loss risk, warranty coverage, environmental impact and the satisfaction of having something new are real factors the numbers cannot capture.",
      "Lifespan estimates are the weakest input. If you are unsure, run the calculation twice — once pessimistically for the repair (12 months) and once optimistically — and see whether the answer flips.",
      "If the manufacturer offers an extended warranty or refurbishment program with a known price, include it as another scenario.",
    ],
  },
];

const methodology = [
  "Repair cost per month = (repair cost − salvage) ÷ repair life months (salvage never makes the result negative).",
  "Replace cost per month = replacement price ÷ new life months.",
  "Both lifespans must be greater than 0; costs cannot be negative.",
  "Results are estimates that depend entirely on user-entered lifespans; no failure-rate data is used.",
  "Explicitly labeled as arithmetic, not financial or repair advice.",
];

const faq = [
  {
    question: "How do I decide between repairing and replacing?",
    answer:
      "Compare the cost per month of remaining life for each path. The option with the lower monthly cost gives you more usable time per dollar — then factor in warranty, downtime and reliability.",
  },
  {
    question: "Is it worth repairing something that costs half of a new one?",
    answer:
      "Often yes if the repair restores a comparable lifespan, because the repair usually does not reset the clock to zero for the device itself — but it depends on the remaining life of every other component. Estimate conservatively.",
  },
  {
    question: "What if I don't know how long the repair will last?",
    answer:
      "Run the calculator with a pessimistic estimate (for example 12 months) and an optimistic one (24–36 months). If repair wins under both, it is a robust choice; if the answer flips, get a second opinion on expected lifespan.",
  },
  {
    question: "Does this account for the environmental impact?",
    answer:
      "No. Extending a device's life usually avoids manufacturing emissions, which favors repair — but that is outside the scope of this cost calculator.",
  },
  {
    question: "Should I include the hassle of being without the device?",
    answer:
      "If downtime matters (work laptop, only phone), consider adding a rental or backup cost to the repair path's cost. The calculator only uses the numbers you provide.",
  },
];

export default function RepairVsReplacePage() {
  return (
    <CalculatorToolPage
      toolId="repair-vs-replace-calculator"
      intro="Compare repairing what you have against buying new, using cost per month of remaining life — the only basis on which the two options are truly comparable."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
