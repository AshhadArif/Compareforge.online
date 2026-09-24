import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import CompatibilityChecker from "@/components/tools/CompatibilityChecker";
import { toolPageMetadata } from "@/lib/tool-meta";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = toolPageMetadata("compatibility-checker");

const sections = [
  {
    heading: "How This Tool Works",
    paragraphs: [
      "Pick a phone from our database and a requirement — a wireless charging pad, Bluetooth headphones, an eSIM activation, a 5G plan, contactless payment terminals, USB-C docks, microSD cards, Wi-Fi 6E routers and more. The tool reads the relevant field from that phone’s specification record and returns a verdict with the reason attached.",
      "Below the verdict, every requirement is listed with its status at once, so you can audit a phone against a whole checklist in one screen — useful before buying a phone for a specific accessory you already own.",
    ],
  },
  {
    heading: "Understanding the Results",
    paragraphs: [
      "Compatible means the specification sheet explicitly supports it (for example, wireless charging wattage is listed). Not compatible means the sheet explicitly rules it out (for example, expandable storage is listed as false).",
      "Not documented means the field is missing from our record — we report that honestly instead of guessing. Missing data is common for secondary specifications on budget models; check the manufacturer’s official page when a verdict matters.",
    ],
  },
  {
    heading: "How to Use It",
    paragraphs: [
      "Start with the requirement, not the phone: choose the accessory or feature you cannot live without, then cycle through phones you are considering and watch the verdicts change. The bottom checklist updates with every selection.",
      "For purchase decisions, treat any ‘not documented’ verdict as a research task: open the product page, follow the source links, and confirm with the manufacturer before assuming either way.",
    ],
  },
  {
    heading: "Important Considerations",
    paragraphs: [
      "Compatibility here means specification-level support — it does not guarantee performance (a phone may support 45W charging yet ship without a 45W charger) or regional availability of services like eSIM from a particular carrier.",
      "Carrier compatibility (bands, plan requirements) and app-level compatibility (specific software versions) are not modeled; our data covers device specifications only.",
      "Accessory third-party certifications (Made for iPhone, Qi2 logos) are not tracked — verify those with the accessory maker.",
    ],
  },
];

const methodology = [
  "Verdicts read directly from fields in our smartphone specification records: battery.wirelessCharging, battery.wiredCharging, connectivity.bluetooth/nfc/usb/fiveG/satellite/simType/wifi, storage.expandable.",
  "Each requirement maps to one field with a documented pass condition; the reason string quotes the field’s value.",
  "Missing fields return ‘not documented’ — we never infer absence from missing data.",
  "Sources and verification dates appear on every product page; no compatibility claims are made beyond the published spec sheet.",
];

const faq = [
  {
    question: "How does the compatibility checker work?",
    answer:
      "Choose a phone and a requirement. The tool looks up the relevant specification field — wireless charging wattage, Bluetooth version, SIM type, and so on — and returns a yes, no, or not-documented verdict with the field value as the reason.",
  },
  {
    question: "What does ‘not documented’ mean?",
    answer:
      "Our specification record for that phone does not include the field. We do not guess. Check the manufacturer’s official spec page to confirm.",
  },
  {
    question: "Does compatible mean it will work perfectly?",
    answer:
      "It means the phone’s published specifications support the feature or standard. Real-world factors — included accessories, carrier support, regional services — are outside the spec sheet and should be verified separately.",
  },
  {
    question: "Can I check if a specific accessory works?",
    answer:
      "The tool checks requirement categories (for example, ‘Bluetooth headphones’) rather than individual product SKUs. Check the accessory’s own documentation for its standard (Bluetooth version, Qi generation) and match it against the phone’s verdict.",
  },
  {
    question: "Why can’t I check laptop or headphone compatibility?",
    answer:
      "Our compatibility data currently covers our smartphone database. The architecture supports adding relation data for other categories as we source it.",
  },
];

export default function CompatibilityCheckerPage() {
  const tool = getToolById("compatibility-checker");
  if (!tool) return null;
  return (
    <ToolShell
      tool={tool}
      intro="Pick a phone and a requirement — wireless charging, eSIM, 5G, NFC, USB-C, Bluetooth, microSD — and get a documented yes/no/not-documented verdict straight from its specification record."
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={generateFAQSchema(faq)}
    >
      <CompatibilityChecker />
    </ToolShell>
  );
}
