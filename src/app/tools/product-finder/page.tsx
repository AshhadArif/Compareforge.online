import type { Metadata } from "next";
import Link from "next/link";
import ProductFinder from "@/components/tools/ProductFinder";
import ToolShell from "@/components/tools/ToolShell";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Product Finder — Find the Right Phone for Your Needs | CompareForge",
  description:
    "Answer a few questions about your budget and priorities and get a shortlist of smartphones that fit — with reasons and a one-click side-by-side comparison.",
  alternates: {
    canonical: "/tools/product-finder",
  },
  openGraph: {
    title: "Product Finder | CompareForge",
    description:
      "Not sure which phone to compare? Answer a few questions and get a shortlist with reasons.",
    url: "https://compareforge.online/tools/product-finder",
    type: "website",
  },
};

const faq = [
  {
    question: "How does the Product Finder work?",
    answer:
      "You answer three short questions about what matters most, your budget, and any extra priority. The tool scores currently listed phones using published specifications — camera hardware, battery capacity, price, weight, update commitment, and similar attributes — then returns a shortlist with reasons.",
  },
  {
    question: "Is the Product Finder free?",
    answer:
      "Yes. It is free, requires no account, and runs in your browser.",
  },
  {
    question: "Does the finder claim one phone is the best for everyone?",
    answer:
      "No. Results are ranked against your answers only. There is no universal winner — different priorities produce different shortlists. You can always compare the top two side by side.",
  },
  {
    question: "Are the recommendations based on hands-on testing?",
    answer:
      "No. Scores are derived from verified specification data already documented on our product pages. We do not claim lab testing we have not conducted.",
  },
  {
    question: "What can I do after getting a shortlist?",
    answer:
      "Open any phone's detail page, or compare your top two in the Product Comparison Tool to see exactly where they differ.",
  },
];

const methodology = [
  "Fit scores use only attributes already in our database: MSRP, battery capacity, camera hardware, weight, display size, RAM, charging wattage, storage options, water-resistance rating, and software update commitment.",
  "Budget filters drop phones outside your band when enough matches remain; otherwise the closest options are shown with context.",
  "Foldable questions prioritize fold/flip form factors when that use case is selected.",
  "Scores are editorial fit ratings for your inputs — not benchmark tests or user-satisfaction ratings.",
  "Missing attributes contribute neutrally rather than being guessed.",
];

const sections = [
  {
    heading: "How the Shortlist Is Built",
    paragraphs: [
      "Each answer maps to weights on documented specification fields. Choosing “camera” raises the weight on camera hardware attributes; a budget answer constrains the pool to phones whose MSRP falls in your band (or flags the closest ones when nothing fits exactly).",
      "Scoring happens in your browser against the phones in our database — currently 12 models across Apple, Samsung, Google, Motorola, OnePlus and Xiaomi. The result is ordered by fit for your answers, with the reasons each phone ranked where it did.",
      "Missing attributes contribute neutrally: a phone with an unpublished charging speed is not penalized for it, and we do not substitute a guess to fill the gap.",
    ],
  },
  {
    heading: "From Shortlist to Decision",
    paragraphs: [
      "The shortlist is a starting point, not an answer. Open any result's product page to inspect its full record and sources, or take the top two into the Product Comparison Tool — the side-by-side view shows exactly which specifications separate them.",
      "If the top three sit within a few points of each other, the finder is telling you they are close on your stated priorities: the deciding factor is probably something you did not ask about (size in hand, design, ecosystem). Adjust your answers and see what moves.",
    ],
  },
  {
    heading: "What the Finder Will Not Do",
    paragraphs: [
      "It will not declare one phone best for everyone, and it will not invent test results to break ties. Fit scores come from published specifications already documented on our product pages; there is no hands-on testing behind them and no user-satisfaction data.",
      "It also will not rank phones outside its database — coverage is explicit rather than padded. If your budget or region puts a model outside our records, use the comparison tool with the model pages you find elsewhere, or check our methodology for how records get added.",
    ],
  },
];

export default function ProductFinderPage() {
  const tool = getToolById("product-finder");
  if (!tool) return null;
  const faqSchema = generateFAQSchema(faq);

  return (
    <ToolShell
      tool={tool}
      crumbs={[{ label: "Tools", href: "/tools" }, { label: "Product Finder" }]}
      intro="Not sure which phones to compare? Answer three short questions and get a shortlist that fits your needs — with reasons and a one-click hand-off to the comparison tool."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={faqSchema}
    >
      <ProductFinder />

      <section className="mb-8 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-4">How It Works</h2>
        <ol className="grid sm:grid-cols-3 gap-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </span>
            <span className="text-text-secondary">
              Answer what matters, your budget, and any priority
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </span>
            <span className="text-text-secondary">
              Get a shortlist scored from published specifications
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </span>
            <span className="text-text-secondary">
              Compare your top two side by side in one click
            </span>
          </li>
        </ol>
      </section>

      <p className="text-sm text-text-secondary">
        Already know your candidates?{" "}
        <Link href="/tools/product-comparison" className="text-primary hover:underline">
          Open the Product Comparison Tool →
        </Link>
      </p>
    </ToolShell>
  );
}
