import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import DecisionMatrix from "@/components/tools/DecisionMatrix";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("decision-matrix");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "A weighted decision matrix turns a fuzzy multi-factor choice into arithmetic you can audit. You list the options (2–4), the criteria that matter (2–8), how strongly each criterion matters (weight 1–5), and how each option performs on each criterion (score 1–5).",
      "Each score is multiplied by its criterion weight, summed per option, and normalized to 0–100 by dividing by the maximum possible (total weight × 5). The ranking, per-criterion contributions and margin of victory are all visible — nothing is hidden in a black box.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Write criteria as questions you can actually score: ‘under $500’, ‘gets 5+ years of updates’, ‘fits in my pocket’. Vague criteria like ‘quality’ produce vague scores — decompose them into something measurable.",
      "Score honestly, not aspirationally. A weight of 5 means ‘cannot compromise’; if everything is a 5, nothing is. Typical setups put 2–3 criteria at weight 4–5 and the rest at 1–2.",
      "The ranking updates live — adjust any score or weight and watch the bars move. Small margins (under 5 points) are flagged as close calls.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "The percentage is relative: it measures how well each option fits YOUR criteria, not objective quality. A 92 means the option captures 92% of the weighted maximum you defined.",
      "The contribution chips show where each option earned its points. If the top two options score differently on a criterion you weighted heavily, that criterion is the real decision axis — dig into it with a dedicated comparison tool.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Garbage in, garbage out: the matrix is only as good as your scores. Where possible, replace opinion scores with facts (measured size, listed price) before scoring.",
      "The model assumes criteria are independent. Overlapping criteria (‘price’ and ‘value for money’) double-count the same factor — keep them distinct.",
      "Ties and near-ties are information: a 2-point margin means the options are interchangeable on your stated priorities, so choose on factors you left out.",
    ],
  },
];

const methodology = [
  "Weighted score = Σ(score × weight) per option; normalized = weighted ÷ (Σweights × 5) × 100.",
  "Scores clamped to 1–5, weights clamped to 1–5; options 2–4, criteria 2–8.",
  "Ranking sorted by normalized score descending; margin = top score − second score.",
  "Pure client-side computation — nothing is transmitted or stored.",
];

const faq = [
  {
    question: "What is a weighted decision matrix?",
    answer:
      "A table where you score each option against each criterion, weight the criteria by importance, and sum weighted scores to rank the options transparently. This tool computes and visualizes that model in real time.",
  },
  {
    question: "How do I choose weights?",
    answer:
      "1 = minor consideration, 3 = important, 5 = deal-breaker. Only one or two criteria should be 5s — if everything is critical the weights stop discriminating.",
  },
  {
    question: "What scale should I score options on?",
    answer:
      "1–5 works for most decisions: 1 = poor fit, 3 = acceptable, 5 = excellent fit. Score each option against the same standard, ideally using facts rather than feelings.",
  },
  {
    question: "Is a score over 90 a good result?",
    answer:
      "It means the option captures over 90% of the weighted maximum you defined — but the absolute number depends entirely on how generously you scored. Compare options against each other, not against an abstract scale.",
  },
  {
    question: "Can I use this for non-product decisions?",
    answer:
      "Yes — job offers, service providers, schools, travel plans. Any decision with multiple options and multiple criteria works; that is the point of a general-purpose matrix.",
  },
];

export default function DecisionMatrixPage() {
  const tool = getToolById("decision-matrix");
  if (!tool) return null;
  return (
    <ToolShell
      tool={tool}
      intro="List your options and criteria, weight what matters, score each option — and get a transparent weighted ranking you can adjust live. Works for any decision, not just products."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <DecisionMatrix />
    </ToolShell>
  );
}
