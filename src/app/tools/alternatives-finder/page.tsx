import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import AlternativesFinder from "@/components/tools/AlternativesFinder";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("alternatives-finder");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Select the phone you are considering as your anchor. The tool compares every other phone in our database against it on price, form factor, display size, weight, battery capacity and RAM, then keeps only plausible alternatives — cheaper options, or similarly priced phones that match closely on the attributes that matter.",
      "Each alternative shows exactly how it differs: dollars cheaper (and by what percentage), larger or smaller screen, more or less battery, lighter or heavier. Green chips are gains relative to your anchor; orange chips are trade-offs.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Start with the phone you want but find too expensive (or simply want to shop around for). If you have not chosen an anchor yet, the Product Finder is the right first step instead.",
      "Work down the list using the Compare links to open any alternative directly against your anchor in the Product Comparison Tool — that final side-by-side shows every specification difference, not just the summary chips.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "Similarity is an editorial score: matching form factor, close screen size, similar weight and battery, equal or better RAM, and a lower price all add points. Higher similarity means a closer substitute.",
      "A cheaper alternative is not automatically better — the trade-off chips tell you what you give up (smaller screen, less battery, different form factor). The right choice is the one whose trade-offs you can live with.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Prices are manufacturer suggested retail prices recorded in our database and verified on the dates shown on each product page — street prices fluctuate and may be lower.",
      "Only phones in our current database can appear. If the alternative you hoped for is not listed, compare manually with the Product Comparison Tool once you know its name.",
      "Similarity does not evaluate camera quality beyond hardware presence, software experience, or brand ecosystem fit.",
    ],
  },
];

const methodology = [
  "Anchor products are compared against all available/announced phones on: price delta, form factor (foldable vs bar), display size, weight, battery capacity and RAM.",
  "Similarity points are assigned per matching attribute; alternatives below a minimum similarity or far above the anchor’s price are filtered out.",
  "Price differences use listed MSRP from our records (see each product page for source and verification date).",
  "Gains and trade-offs are derived from direct attribute comparisons only — no review scores or opinions are involved.",
];

const faq = [
  {
    question: "How do I find a cheaper alternative to a phone?",
    answer:
      "Select it as the anchor here. The tool ranks other phones in our database by specification similarity and price, showing exactly how many dollars and percent you would save and what differs.",
  },
  {
    question: "How is the dollar saving calculated?",
    answer:
      "Savings are the anchor phone's MSRP minus the alternative's MSRP, and the percentage is that gap divided by the anchor price. Both prices are manufacturer suggested retail prices from our records, each with a verification date on its product page — retail prices move, so treat MSRP as a reference and check live listings before buying.",
  },
  {
    question: "Why isn’t a specific phone in the results?",
    answer:
      "Our database currently covers a focused set of phones. Alternatives are also filtered when they are too dissimilar or more expensive without justification. The Product Finder covers the full database from a needs-first angle.",
  },
  {
    question: "What does the similarity score mean?",
    answer:
      "An editorial score counting matching attributes: form factor, screen size, weight, battery and RAM proximity, plus a lower price. It measures how close a substitute is on specs — not how good the phone is overall.",
  },
  {
    question: "Can I compare an alternative against the anchor?",
    answer:
      "Yes — every alternative has a Compare link that opens the Product Comparison Tool with both phones pre-loaded.",
  },
];

export default function AlternativesFinderPage() {
  const tool = getToolById("alternatives-finder");
  if (!tool) return null;
  return (
    <ToolShell
      tool={tool}
      intro="Start from a phone you know and discover cheaper or better-fitting alternatives — ranked by specification similarity with exact price differences and trade-offs."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <AlternativesFinder />
    </ToolShell>
  );
}
