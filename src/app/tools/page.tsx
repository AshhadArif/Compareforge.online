import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ToolsDirectory from "@/components/tools/ToolsDirectory";
import {
  getBuiltTools,
  getBuiltToolsByType,
  TOOL_TYPE_LABELS,
  TOOL_TYPE_DESCRIPTIONS,
} from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

const builtToolCount = getBuiltTools().length;

export const metadata: Metadata = {
  title: "Interactive Comparison & Decision Tools",
  description:
    `${builtToolCount} free comparison, calculator, matching and decision tools. Compare products, calculate price differences, check compatibility and decide with sourced data.`,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Comparison & Decision Tools | CompareForge",
    description:
      "Free interactive tools to compare products, calculate differences, check fit and decide with confidence.",
    url: "https://compareforge.online/tools",
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

const TYPE_ORDER = ["compare", "calculate", "match", "decide"] as const;

const faq = [
  {
    question: "What tools does CompareForge offer?",
    answer:
      `${builtToolCount} free tools across four families: Compare (side-by-side products, specifications, use cases, plans and dimensions), Calculate (percentage, price, unit cost, subscription and repair-or-replace calculators), Match (compatibility, fit and clearance checks) and Decide (alternatives finder, product finder and weighted decision matrix).`,
  },
  {
    question: "Are the tools free to use?",
    answer:
      "Yes. All CompareForge tools are free, require no account, and run entirely in your browser. Calculator inputs are never sent to our servers.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "Specifications and attributes are sourced from manufacturer pages and cross-checked against independent sources, with a verification date on every product page. Missing data is shown as missing — we never invent values, ratings, or test results.",
  },
  {
    question: "Which tool should I start with?",
    answer:
      "If you know the two candidates, use the Product Comparison Tool. If you know your needs but not the product, use the Product Finder or Use-Case Comparison. If you are weighing options against your own priorities, the Decision Matrix is the right starting point.",
  },
  {
    question: "How is this different from a static comparison article?",
    answer:
      "Tools let you choose what to compare or answer questions about your needs, then return a structured result with explanations and sources — instead of a fixed article about one pairing.",
  },
];

export default function ToolsHubPage() {
  const built = getBuiltTools();
  const faqSchema = generateFAQSchema(faq);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Tools" }]} />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">Comparison &amp; Decision Tools</h1>
        <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
          {builtToolCount} free tools to compare options, calculate real differences, check
          fit and compatibility, and decide with clarity — backed by sourced data and
          plain-language explanations.
        </p>
      </div>

      <div className="mb-12">
        <ToolsDirectory tools={built} />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-5">Browse by tool type</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {TYPE_ORDER.map((type) => {
            const ofType = getBuiltToolsByType(type);
            if (ofType.length === 0) return null;
            return (
              <div key={type} className="p-5 bg-bg-secondary border border-border rounded-xl">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-text">{TOOL_TYPE_LABELS[type]}</h3>
                  <span className="text-xs text-text-light">{ofType.length} tools</span>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  {TOOL_TYPE_DESCRIPTIONS[type]}
                </p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  {ofType.map((t) => (
                    <li key={t.tool_id}>
                      <Link
                        href={t.route.replace(/\/$/, "")}
                        className="text-primary hover:underline"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-12 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-4">How CompareForge Tools Work</h2>
        <ol className="grid sm:grid-cols-3 gap-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </span>
            <span className="text-text-secondary">
              You provide input — select products, enter numbers, or answer a few questions
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </span>
            <span className="text-text-secondary">
              The tool computes a structured result with differences, formulas or verdicts
              explained
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </span>
            <span className="text-text-secondary">
              Methodology, sources and related tools help you verify and go deeper
            </span>
          </li>
        </ol>
        <p className="mt-4 text-sm">
          <Link href="/methodology" className="text-primary hover:underline">
            Read our data methodology →
          </Link>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text mb-2">{item.question}</h3>
              <p className="text-sm text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
