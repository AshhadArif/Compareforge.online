import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import SpecComparison from "@/components/tools/SpecComparison";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("spec-comparison");

const sections = [
  {
    heading: "How the Specification Comparison Tool Works",
    paragraphs: [
      "Choose a category — laptop, tablet, monitor, camera, headphone, phone, processor, graphics card, television, smartwatch, projector, printer, gaming monitor or custom — and the table loads that category's standard specification rows: the attributes that actually distinguish products in that class.",
      "Type each product's values into the two columns. The tool labels every row as identical, higher, lower, different or missing, and the Differences Only switch collapses the rows that match so only the decision-relevant gaps remain.",
      "Nothing you enter leaves your browser. The table is computed locally and is not saved, tracked or sent to a server.",
    ],
  },
  {
    heading: "Why You Enter the Values Yourself",
    paragraphs: [
      "CompareForge publishes verified product records with sources for every specification we claim. For categories where we have not yet published a record, we would rather you transcribe two numbers from the manufacturer's own page than have us guess.",
      "Every value in this tool is user-entered. We do not prefill, estimate or infer specifications, and the tool never presents a value you did not type.",
      "If you want a comparison built entirely from our sourced records instead, use the phone comparison tool or one of the record-backed category pages — they read verified values with a link to the page each one came from.",
    ],
  },
  {
    heading: "Reading the Difference Labels",
    paragraphs: [
      "Numeric rows compare the two values directly: the higher number is labelled higher and the lower one lower, and equal values are labelled identical. Text rows are compared as written — matching strings are identical, anything else is different.",
      "“Missing side” means only one product has a value, which is a data gap rather than a difference. “No data” means neither column is filled yet.",
      "A higher number is not automatically better. A heavier laptop with a larger battery, or a monitor with a faster panel at a lower brightness, is a trade-off — the tool reports the direction of the gap, not a verdict.",
    ],
  },
  {
    heading: "Adding Your Own Specifications",
    paragraphs: [
      "The category templates are a starting point, not a limit. Add any row you need — port selection, warranty length, included accessories — and it joins the comparison with the same difference labelling.",
      "Remove any row that does not matter to your decision. A comparison of eight relevant specifications is more useful than one of thirty irrelevant ones.",
    ],
  },
];

const methodology = [
  "Category templates list attribute names only. No values are prefilled by CompareForge.",
  "Numeric comparison: values are parsed as numbers; higher/lower is assigned by direct comparison.",
  "Text comparison: case-insensitive string equality; anything else is labelled different.",
  "Missing side and no data are reported separately from real differences.",
  "All computation runs client-side; no input values are persisted or transmitted.",
];

const faq = [
  {
    question: "What does a product comparison tool compare?",
    answer:
      "It lays two products' attributes out in a single table so you can see where they match and where they differ. For products we publish records for, the tool reads our sourced data; for everything else, this tool compares the specification values you enter yourself.",
  },
  {
    question: "Which product categories are supported?",
    answer:
      "Laptops, tablets, monitors, cameras, headphones, phones, processors, graphics cards, televisions, smartwatches, projectors, printers and gaming monitors each have a preset specification template, plus a custom option with an empty table. You can add or remove rows in any of them.",
  },
  {
    question: "Does the tool store my comparison?",
    answer:
      "No. Everything is computed in your browser. Closing or refreshing the page clears the table.",
  },
  {
    question: "Is a higher value always better?",
    answer:
      "No. The tool reports whether Product B's value is higher or lower than Product A's — it does not judge which is preferable. Storage, battery size, weight and price all trade against each other.",
  },
  {
    question: "Can I compare two phones instead?",
    answer:
      "Yes. For phones we have verified records for, use the phone comparison tool, which pulls sourced specifications directly and does not require you to type anything.",
  },
  {
    question: "How do I compare features that are not numbers?",
    answer:
      "Add them as text rows. Text values are compared as written: identical strings are marked the same, and anything else is marked different.",
  },
];

export default function SpecComparisonPage() {
  const tool = getToolById("spec-comparison");
  if (!tool) return null;

  return (
    <ToolShell
      tool={tool}
      intro="Enter the specifications of any two products and see them side by side — with every difference labelled and a differences-only view."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <SpecComparison />

      <section className="mt-10 mb-4 p-6 bg-bg-secondary rounded-xl max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-3">
          Already know the two phones?
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          For smartphones in our verified database you do not need to type anything — the
          phone comparison tool reads our sourced records and builds the full table,
          including display, performance, camera, battery, design, storage, connectivity
          and software.
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/tools/product-comparison" className="text-primary hover:underline">
            Phone comparison tool →
          </Link>
          <Link href="/compare/phones" className="text-primary hover:underline">
            Phone comparison hub →
          </Link>
          <Link href="/methodology" className="text-primary hover:underline">
            How we source specifications →
          </Link>
        </div>
      </section>
    </ToolShell>
  );
}
