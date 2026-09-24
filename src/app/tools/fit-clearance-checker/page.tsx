import type { Metadata } from "next";
import CalculatorToolPage from "@/components/tools/CalculatorToolPage";
import { toolPageMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolPageMetadata("fit-clearance-checker");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "The checker adds your required clearance to the item’s dimensions, then tests whether the adjusted size fits within the space on every axis you entered. It reports a plain fit verdict plus the remaining clearance on each side.",
      "If the item does not fit, the failure reasons name the exact axis and the amount by which it is too large — so you know whether to look for something narrower, shorter, or shallower.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Measure the item at its widest points, including packaging if it will stay on. Measure the space at its narrowest points — shelves taper, door frames have trim, and racks have cross-bars.",
      "Use the same unit for every field (centimetres shown by default; millimetres or inches work equally as long as you are consistent). Add clearance per side for anything that needs breathing room: 1–2 cm for ventilation behind electronics, a few centimetres for cables, more for handles.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "A fit verdict of ‘Fits’ means the item plus required clearance fits on every measured axis. The remaining-clearance lines show how much slack exists — very tight fits (under ~5 mm) may still be impractical to install.",
      "Depth is optional because many fit questions are two-dimensional (will it fit on this shelf width-wise through this opening). When depth is missing, the tool says only width and height were checked.",
    ],
  },
  {
    heading: "Example",
    paragraphs: [
      "A soundbar 100 cm wide needs to fit under a 95 cm TV stand opening — it fails on width by 5 cm. Adding a requirement of 1 cm clearance per side makes the required width 102 cm, failing by 7 cm.",
      "A router 20 × 15 × 4 cm goes into a cabinet opening 25 × 20 × 30 cm with 1 cm clearance: required 22 × 17 × 6 cm fits everywhere, leaving 5 cm width slack, 3 cm height slack and 26 cm depth slack.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Measure twice. Cables, plugs and ventilation paths add effective depth that rigid measurements miss — that is exactly what the clearance field is for.",
      "The checker tests rectangular fit only. Irregular shapes, diagonal-only openings (some attic hatches), and weight limits are not modeled; for awkward openings, compare the diagonal of the item with the diagonal of the opening manually.",
      "All dimensions must be in the same unit. Mixing millimetres and centimetres is the most common source of false results.",
    ],
  },
];

const methodology = [
  "Required size = item dimension + (clearance × 2) per axis.",
  "Fit = required dimension ≤ space dimension on every entered axis (depth checked only when both depths are provided).",
  "Remaining clearance = space − item per axis.",
  "Units are consistent by user responsibility; only positive dimensions are accepted.",
  "Rectangular prism assumption — no irregular-shape or weight analysis.",
];

const faq = [
  {
    question: "How do I know if something will fit?",
    answer:
      "Compare the item’s width, height and depth against the space, adding clearance for anything that needs room to breathe or plug in. This tool does that arithmetic and reports the exact slack or shortfall per side.",
  },
  {
    question: "What clearance should I leave?",
    answer:
      "Electronics typically want 1–2 cm per side for airflow, more behind where cables plug in. Furniture can often sit flush. When unsure, add a little — the tool will show exactly how much slack remains.",
  },
  {
    question: "The item is round — will the checker still work?",
    answer:
      "Enter its diameter as width and height; a circle fits inside a square of that size. For more complex shapes, compare bounding-box dimensions manually.",
  },
  {
    question: "Should I measure with or without packaging?",
    answer:
      "Measure how it will actually be used. If the packaging stays on (storage), include it. If it comes off (installation), use the unpacked size — but keep packaging dimensions for doorway and lift checks on the way in.",
  },
  {
    question: "Why did the tool ignore depth?",
    answer:
      "Depth is checked only when both item depth and space depth are entered. If either is blank, the tool verifies width and height and tells you depth was skipped.",
  },
];

export default function FitCheckerPage() {
  return (
    <CalculatorToolPage
      toolId="fit-clearance-checker"
      intro="Enter the dimensions of an item and the space it must fit — shelf, doorway, rack, wall mount — and get a clear verdict with clearance on every side."
      sections={sections}
      methodology={methodology}
      faq={faq}
    />
  );
}
