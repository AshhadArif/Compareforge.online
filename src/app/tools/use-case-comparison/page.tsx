import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import UseCaseComparison from "@/components/tools/UseCaseComparison";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("use-case-comparison");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Pick the job you need a phone for and the tool ranks our database against the specifications that actually drive that job. Camera rankings weigh megapixel counts, telephoto hardware, stabilization and video capabilities. Battery rankings weigh capacity and charging speed. Compact rankings weigh weight, width and screen size.",
      "Each phone shows the reasons it scored the way it did — the specific attributes behind its position — so you can challenge the ranking instead of trusting it blindly. The relative-fit bar visualizes how far apart the field is; a crowded bar means the top phones are close together.",
    ],
  },
  {
    heading: "Why Use-Case Ranking Beats a Generic Top-10",
    paragraphs: [
      "A fixed ‘best phones’ list answers one editorial team’s priorities. A camera-focused buyer and a battery-focused buyer need opposite things from the same dataset: telephoto hardware and video modes matter for one, milliamp-hours and charging wattage matter for the other.",
      "This tool lets the use case drive the scoring model. That is also why there is no single permanent winner — change the use case and the leaderboard reorders, because the weights behind the score changed.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "Positions reflect our published scoring rules, not hands-on testing. The tool never claims a phone ‘takes the best photos’ — it says which phone has the strongest documented camera hardware for photography-focused use.",
      "Attribute chips under each result show what earned points. If two phones score closely, their chips will look similar: then the decision should come down to price, brand preference or software — use the Product Comparison Tool for that final step.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Only currently listed phones are ranked — discontinued models are excluded from the pool entirely, never shown as a fallback.",
      "Scores are relative within the 22 currently listed phones in our database (47 records in total) — not a universal score across the whole market. A phone absent from our database cannot appear.",
      "Software quality, camera processing and real-world battery life are not modeled because they require testing we have not performed. Spec-sheet hardware is the limit of what we claim.",
    ],
  },
];

const methodology = [
  "Each use case defines a transparent scoring rule over published attributes (documented in src/lib/decision.ts).",
  "Inputs: camera hardware, battery capacity, charging wattage, weight, dimensions, display refresh rate, RAM, chipset, update commitments, water resistance and price.",
  "Scores are editorial fit scores relative to this database — not lab tests, benchmarks or review averages.",
  "Availability status filters the pool; available phones receive a small baseline bonus.",
  "Missing attributes score zero for that component rather than being guessed.",
];

const faq = [
  {
    question: "How does the ranking decide which phone is best for me?",
    answer:
      "It scores every phone in our database on the attributes that matter for the use case you selected — for example battery capacity and charging speed for the battery use case — then sorts by total score and shows the reasons.",
  },
  {
    question: "Are these rankings based on tests?",
    answer:
      "No. They are computed from published specifications only. We do not claim lab testing. The chips under each phone show exactly which documented attributes contributed.",
  },
  {
    question: "Why did the order change when I picked a different use case?",
    answer:
      "Each use case uses a different scoring formula. Camera rewards telephoto and video hardware; compact rewards low weight and narrow width. Different priorities produce different leaders.",
  },
  {
    question: "Can a phone rank first here and last somewhere else?",
    answer:
      "Yes — that is expected. Rankings are purpose-specific. After shortlisting, compare your top two directly with the Product Comparison Tool.",
  },
  {
    question: "How do I compare two phones from the results?",
    answer:
      "Open either phone’s details page and use the links, or go to the Product Comparison Tool and select both phones side by side.",
  },
];

export default function UseCasePage() {
  const tool = getToolById("use-case-comparison");
  if (!tool) return null;
  return (
    <ToolShell
      tool={tool}
      intro="Choose a need — camera, battery, gaming, travel, value — and see which smartphones rank highest for that job, scored transparently from published specifications."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <UseCaseComparison />
    </ToolShell>
  );
}
