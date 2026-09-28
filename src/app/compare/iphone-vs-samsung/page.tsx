import type { Metadata } from "next";
import BrandVsBrandPage from "@/components/BrandVsBrandPage";

export const metadata: Metadata = {
  title: "iPhone vs Samsung — Side-by-Side Comparison",
  description:
    "iPhone vs Samsung compared side by side: operating system, update commitment, specifications, model ranges and form factors — with a free tool to compare any two phones.",
  alternates: {
    canonical: "/compare/iphone-vs-samsung",
  },
  openGraph: {
    title: "iPhone vs Samsung — Side-by-Side Comparison",
    description:
      "Compare iPhone and Samsung phones side by side on specifications, software and model ranges.",
    url: "https://compareforge.online/compare/iphone-vs-samsung",
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
  slug: "iphone-vs-samsung",
  h1: "iPhone vs Samsung",
  intro:
    "Apple's iPhone and Samsung's Galaxy line are the two largest phone ranges in this database. This page compares them on the specifications and software commitments we can source — and gives you a tool to compare any individual pair.",
  aliasNote:
    "This page also answers “Samsung vs iPhone” and “iPhone or Samsung”: it is the same comparison from the other direction, and the tool below works either way.",
  brandA: "Apple",
  brandB: "Samsung",
  labelA: "iPhone",
  labelB: "Samsung",
  flagshipA: "apple-iphone-18-pro-max",
  flagshipB: "samsung-galaxy-s26-ultra",
  keyDifferences: [
    {
      title: "Operating system",
      body: "iPhones run iOS — the current flagship record lists iOS 27 with no manufacturer skin over it. Samsung Galaxy phones run Android with Samsung's own One UI interface on top (One UI 8.5 on the Galaxy S26 Ultra record). This is a platform difference, not a specification gap: it affects which apps and accessories work with the device.",
    },
    {
      title: "Software update commitment",
      body: "The current Apple flagship record lists six years of OS and security updates from launch. The current Samsung Galaxy S and Z records list seven. Commitments are stated by the manufacturers and compared directly here — one of the few specifications where higher is unambiguously better.",
    },
    {
      title: "Form factors",
      body: "Samsung publishes book-style foldables (Galaxy Z Fold) and clamshell foldables (Galaxy Z Flip) in this database. Apple's published lineup contains no foldable. If a folding screen matters to you, that difference decides the comparison before any other row does.",
    },
    {
      title: "Documented memory",
      body: "The iPhone 18 Pro Max record lists 8 GB of RAM; the Galaxy S26 Ultra record lists 12 GB. iOS and Android manage memory differently, so the raw figures are not directly equivalent — treat them as documented facts about each device rather than a head-to-head score.",
    },
    {
      title: "On-device AI features",
      body: "Apple's records list the Apple Intelligence suite (Siri AI, Visual Intelligence, Writing Tools, Clean Up). Samsung's records list Galaxy AI alongside Gemini, Circle to Search, Live Translate and Generative Edit. The overlap is real and the differences are mostly in which tools ship on which device.",
    },
    {
      title: "Starting price of the flagships",
      body: "Both current flagships carry the same manufacturer suggested retail price in our records — $1,299. Price is therefore not a differentiator at the top of these two ranges; it separates them further down, where the models differ in specification.",
    },
  ],
  preferA: [
    "You want iOS. The platform itself is the difference, and no specification table can weigh that for you.",
    "You prefer a phone with no manufacturer interface layered over the OS — Apple's records show iOS with an empty skin field.",
    "You are already invested in Apple's ecosystem, where accessories, file transfer and watch pairing are built around the iPhone.",
    "A six-year OS and security update commitment is enough for your replacement cycle (current flagship record).",
  ],
  preferB: [
    "You want Android with Samsung's One UI interface and the Galaxy AI feature list on the record.",
    "A longer stated update commitment matters: seven years on the current Galaxy records, versus six on the current iPhone record.",
    "You want a foldable — Samsung publishes book-style and clamshell models in this database, and Apple does not.",
    "You want more documented RAM: 12 GB on the Galaxy S26 Ultra record versus 8 GB on the iPhone 18 Pro Max record.",
    "You prefer a stylus option: the Ultra records list S Pen support.",
  ],
  faq: [
    {
      question: "What is the difference between iPhone and Samsung?",
      answer:
        "The differences we can document are platform (iOS versus Android with One UI), stated update commitment (six years on the current Apple flagship record versus seven on the current Samsung Galaxy records), available form factors including foldables, and the per-model specifications shown in the tables on this page.",
    },
    {
      question: "Which is better, iPhone or Samsung?",
      answer:
        "CompareForge does not rank them. The right answer depends on which platform you want, whether you need a foldable, how long you keep a phone, and which specifications you weight most — all of which differ between buyers. Use the tool above to see the numbers and decide against your own criteria.",
    },
    {
      question: "Is “Samsung vs iPhone” a different comparison?",
      answer:
        "No. It is the same two product ranges in the opposite order, so it is answered on this page. The comparison tool works whichever way round you enter the two phones.",
    },
    {
      question: "Can I compare any iPhone with any Samsung phone?",
      answer:
        "Yes. Pick one model from each brand in the selectors above. Any pair in the database can be compared across display, performance, camera, battery, design, storage, connectivity and software.",
    },
    {
      question: "Do you compare iPhone and Samsung cameras?",
      answer:
        "We compare documented camera specifications: sensor resolution, aperture, lens configuration, optical zoom and video capability. We do not run camera tests and do not claim one produces better photographs than the other.",
    },
    {
      question: "How many models do you cover?",
      answer:
        "Both brand sections above show the live count, along with the price, display, battery, weight and update-commitment ranges computed from those records. Every model links to its own page with sources.",
    },
  ],
};

export default function IphoneVsSamsungPage() {
  return <BrandVsBrandPage config={config} />;
}
