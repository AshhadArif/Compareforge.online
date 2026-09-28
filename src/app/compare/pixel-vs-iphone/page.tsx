import type { Metadata } from "next";
import BrandVsBrandPage from "@/components/BrandVsBrandPage";

export const metadata: Metadata = {
  title: "Pixel vs iPhone — Side-by-Side Comparison",
  description:
    "Google Pixel vs iPhone compared side by side: software, update commitment, chipset, memory, AI features and full specifications for any two models.",
  alternates: {
    canonical: "/compare/pixel-vs-iphone",
  },
  openGraph: {
    title: "Pixel vs iPhone — Side-by-Side Comparison",
    description:
      "Compare Google Pixel and Apple iPhone phones side by side on specifications, software and model ranges.",
    url: "https://compareforge.online/compare/pixel-vs-iphone",
    type: "website",
    siteName: "CompareForge",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CompareForge — Comparison & Decision Tools",
      },
    ],
  },
};

const config = {
  slug: "pixel-vs-iphone",
  h1: "Pixel vs iPhone",
  intro:
    "Google's Pixel range and Apple's iPhone range overlap closely in price and size. This page compares them on the specifications and software commitments we can source, and lets you compare any individual pair directly.",
  aliasNote:
    "Also answers “Google Pixel vs iPhone” and “iPhone vs Pixel”. The same comparison, whichever order you search it in.",
  brandA: "Google",
  brandB: "Apple",
  labelA: "Pixel",
  labelB: "iPhone",
  flagshipA: "google-pixel-11-pro-xl",
  flagshipB: "apple-iphone-18-pro-max",
  keyDifferences: [
    {
      title: "Operating system",
      body: "Pixels run Android with Google's own interface layer (Pixel UI on the current flagship record). iPhones run iOS with no manufacturer skin. Both receive updates directly from their respective platform owners, which is why the update rows below are the cleanest comparison on this page.",
    },
    {
      title: "Software update commitment",
      body: "The current Pixel flagship record lists seven years of OS and security updates from launch. The current iPhone flagship record lists six. These are the manufacturers' own published commitments, stated in years so they compare directly.",
    },
    {
      title: "Chipset",
      body: "Pixels use Google's own Tensor chips (Google Tensor G6 on the Pixel 11 Pro XL record); iPhones use Apple's A-series silicon (Apple A20 Pro on the iPhone 18 Pro Max record). Both are designed in-house, and benchmark figures are deliberately not published here because we do not run them.",
    },
    {
      title: "Documented memory",
      body: "The Pixel 11 Pro XL record lists 16 GB of RAM; the iPhone 18 Pro Max record lists 8 GB. The two platforms manage memory differently, so the figures describe each device rather than declaring a winner.",
    },
    {
      title: "Price of the flagships",
      body: "In our records the Pixel 11 Pro XL carries a manufacturer suggested retail price of $1,199 and the iPhone 18 Pro Max $1,299 — a $100 gap at launch. Street prices move faster than any database, so verify before buying.",
    },
    {
      title: "On-device AI features",
      body: "Pixel records list Google's Gemini-based feature set — Magic Eraser, Magic Editor, Best Take, Call Screen, Live Translate. Apple records list Apple Intelligence — Siri AI, Visual Intelligence, Writing Tools, Clean Up. There is genuine overlap; the difference is which tools ship on which device.",
    },
  ],
  preferA: [
    "You want Android with Google's own interface and direct updates from Google — the current flagship record commits to seven years of OS and security updates.",
    "Google's AI features (Gemini, Magic Editor, Call Screen, Live Translate) are on your must-have list.",
    "A lower flagship price matters: $1,199 on the Pixel record versus $1,299 on the iPhone record.",
    "You prefer Google's Tensor platform over Apple's A-series silicon.",
    "You want more documented RAM: 16 GB on the Pixel 11 Pro XL record versus 8 GB on the iPhone 18 Pro Max record.",
  ],
  preferB: [
    "You want iOS — the platform difference is the decision, and no specification table can weigh it for you.",
    "You are already in Apple's ecosystem, where accessories, file transfer and watch pairing are built around the iPhone.",
    "You prefer Apple's A-series silicon as the platform, with iOS and the phone's hardware designed together.",
    "A six-year OS and security update commitment covers your replacement cycle (current flagship record).",
    "You want a wider spread of iPhone options — the Apple section below lists every model we publish.",
  ],
  faq: [
    {
      question: "What is the difference between Pixel and iPhone?",
      answer:
        "The documented differences are platform (Android with Pixel UI versus iOS), stated update commitment (seven years on the current Pixel record versus six on the current iPhone record), chipset (Google Tensor versus Apple A-series), documented memory, flagship price and the AI feature lists shown above.",
    },
    {
      question: "Which is better, Pixel or iPhone?",
      answer:
        "CompareForge does not rank them. The answer depends on whether you want Android or iOS, how long you keep a phone, and which specifications you weight — all of which differ between buyers. Use the tool above and compare against your own criteria.",
    },
    {
      question: "Is “iPhone vs Pixel” a different page?",
      answer:
        "No — it is the same comparison in the opposite order, answered here. The tool works whichever way round you enter the two phones.",
    },
    {
      question: "Can I compare any Pixel with any iPhone?",
      answer:
        "Yes. Pick one model from each brand in the selectors above and the full specification table is built from our records: display, performance, camera, battery, design, storage, connectivity and software.",
    },
    {
      question: "Do you compare Pixel and iPhone cameras?",
      answer:
        "We compare documented camera specifications — resolution, aperture, lens configuration, optical zoom and video capability. We do not run camera tests and do not claim which takes better photos.",
    },
    {
      question: "Where do these numbers come from?",
      answer:
        "Every figure comes from the product records in the database, each of which documents its sources and verification date on the product page. Ranges are computed from those records, not from estimates.",
    },
  ],
};

export default function PixelVsIphonePage() {
  return <BrandVsBrandPage config={config} />;
}
