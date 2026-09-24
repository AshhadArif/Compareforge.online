import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import DimensionComparison from "@/components/tools/DimensionComparison";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("dimension-comparison");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Object A defaults to a phone from our database (official millimetre dimensions); Object B can be another phone or any custom item you measure yourself. The tool draws both shapes to the same scale, then computes the symmetric percentage difference for width, height, depth and front-face area.",
      "Scale drawing does the perceptual work numbers cannot: a 6% width difference looks like a hairline on screen; a 40% difference looks like a different class of device. Use the drawing for intuition and the percentages for precision.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "For phone-vs-phone, select a model on both sides. For anything else — a laptop sleeve vs a laptop, a TV vs a wall space, two smartwatches — switch a side to Enter dimensions and type width, height and depth in millimetres (any consistent unit works; the drawing is unitless-ratio based).",
      "Depth is optional; width and height drive the drawing and the primary differences. All dimensions should use the same unit.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "Percentages use the symmetric formula (|A − B| ÷ average × 100), so neither object is treated as the baseline — consistent with our Percentage Difference Calculator.",
      "Front-face area multiplies width × height for both objects and compares the products: useful for ‘how much bigger does the screen face look’ questions where both dimensions grow together.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Phone dimensions come from manufacturer specification records (sources and verification dates on each product page). Custom dimensions are yours — measure at the widest points.",
      "The drawing is 2D and proportional; it ignores weight, thickness perception beyond the depth number, bezels vs body, and curved edges.",
      "If you are checking whether something fits a space rather than comparing two objects, the Fit & Clearance Checker answers that directly.",
    ],
  },
];

const methodology = [
  "Database dimensions: design.dimensions {height, width, depth} in mm from manufacturer spec sheets.",
  "Percentage difference: |A − B| ÷ ((|A| + |B|) ÷ 2) × 100 per axis; area uses width × height products.",
  "Scale drawing: each axis normalized to the larger of the two objects (min 24 px rendering).",
  "Custom inputs accept any positive numbers in a consistent unit; invalid/missing values block the comparison with an explicit message.",
];

const faq = [
  {
    question: "How do I compare the size of two phones?",
    answer:
      "Select both phones (or enter dimensions manually). The tool draws them to scale and gives percentage differences for width, height, depth and face area.",
  },
  {
    question: "How much bigger is A than B in percent?",
    answer:
      "The tool computes the symmetric percentage difference per axis: the gap divided by the average of both values. Neither object is treated as the baseline.",
  },
  {
    question: "Can I compare non-phone items?",
    answer:
      "Yes — switch either side to Enter dimensions and type your own measurements in millimetres (or any unit, as long as both sides match).",
  },
  {
    question: "What unit should I use?",
    answer:
      "Millimetres are shown by default and match our phone records. Inches work for custom entries as long as both objects use the same unit — the math is unit-agnostic.",
  },
  {
    question: "Will this tell me if something fits my shelf?",
    answer:
      "Not directly — this tool compares two objects to each other. The Fit & Clearance Checker compares an object against a space with clearance requirements.",
  },
];

export default function DimensionComparisonPage() {
  const tool = getToolById("dimension-comparison");
  if (!tool) return null;
  return (
    <ToolShell
      tool={tool}
      intro="Compare the size of two objects visually and numerically — pick phones from our database or enter your own dimensions — with a to-scale drawing and percentage differences per axis."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <DimensionComparison />
    </ToolShell>
  );
}
