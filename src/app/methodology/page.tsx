import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Methodology & Data Sources | CompareForge",
  description:
    "How CompareForge sources, verifies and presents specification data — and the rules we follow so comparisons and tools never invent numbers.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology & Data Sources | CompareForge",
    description:
      "How we source, verify and present specification data, and the rules our comparisons and tools follow.",
    url: "https://compareforge.online/methodology",
    type: "website",
  },
};

const principles = [
  {
    heading: "We never invent data",
    paragraphs: [
      "Every specification shown on CompareForge comes from a manufacturer specification sheet or another named source. If we cannot verify a value, we do not publish one: missing fields appear as “unavailable” or “not documented”, never as an estimate dressed up as a fact.",
      "This applies to specs, prices, ratings, benchmarks and review scores. We do not run lab tests, we do not fabricate benchmark numbers, and we do not assign star ratings to products.",
    ],
  },
  {
    heading: "Sources are attached to products",
    paragraphs: [
      "Every product page lists its sources with links and a verification date — the last time we checked the record against the manufacturer’s own page. When a source changes (a spec sheet is revised, a price moves), the verification date is what tells you how stale the record might be.",
      "Comparison pages inherit the sources of both products compared, so you can trace any row in a side-by-side table back to where it came from.",
    ],
  },
  {
    heading: "Derived numbers show their formula",
    paragraphs: [
      "Our calculators (percentage difference, unit price, cost per use, total cost of ownership and friends) compute results from numbers you enter. Each tool publishes the exact formula it uses in its Methodology & Data section, so you can reproduce the result with a calculator yourself.",
      "Rule-based tools — the Fit & Clearance Checker, the Compatibility Checker — state their thresholds and pass conditions in plain language before you use them.",
    ],
  },
  {
    heading: "Rankings are rule-based, not editorial",
    paragraphs: [
      "Where we rank products (use-case fit, alternatives similarity, finder scoring), the ranking comes from weights applied to documented specification differences. We explain the weights on the tool page. There is no hand-placed “winner”, no paid placement, and no sponsor can change a score.",
      "If two products are close, the interface says so — a one-point gap in a fit score is noise, and pretending otherwise would be misleading.",
    ],
  },
  {
    heading: "Similarity and compatibility are derived, not rated",
    paragraphs: [
      "The Alternatives Finder measures attribute similarity across documented specification fields (price, size, battery, memory, and similar). It does not read reviews or assign quality scores — it tells you how similar two phones are on paper, and lists the exact fields where they differ.",
      "The Compatibility Checker returns a verdict only when the relevant specification field exists. Missing data produces a “not documented” verdict rather than a guess.",
    ],
  },
  {
    heading: "Corrections are part of the process",
    paragraphs: [
      "Spec sheets contain errors and phones get revised quietly. If you spot a value that disagrees with the manufacturer’s page, use the report link on any product page — corrections are verified against the source before the record is updated.",
    ],
  },
];

const faq = [
  {
    question: "Where does CompareForge get its specification data?",
    answer:
      "Manufacturer specification pages, linked from each product page with a verification date. Where independent sources are used for cross-checking, they are listed alongside.",
  },
  {
    question: "Do you test products yourselves?",
    answer:
      "No. We do not run lab tests or produce review scores. We structure and explain published specifications, and we are explicit about the difference.",
  },
  {
    question: "What happens when a spec is missing?",
    answer:
      "It shows as unavailable or not documented. We never fill a gap with an estimate — an honest blank beats a confident guess.",
  },
  {
    question: "Can a company pay to rank higher?",
    answer:
      "No. Rankings are produced by documented formulas applied to specification data. Sponsored placement does not exist anywhere in the ranking logic.",
  },
  {
    question: "How current are the prices?",
    answer:
      "Prices carry the verification date of their source record. Prices change faster than almost anything else, so always confirm the current price on the retailer or manufacturer page before buying.",
  },
];

export default function MethodologyPage() {
  const faqSchema = generateFAQSchema(faq);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Methodology" }]} />

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">Methodology &amp; Data Sources</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Comparison tools are only as trustworthy as the numbers behind them. This page
          documents exactly how CompareForge sources, verifies, computes and presents data —
          and the rules that keep our tools honest.
        </p>
      </div>

      <div className="space-y-8 mb-10">
        {principles.map((p) => (
          <section key={p.heading} className="max-w-3xl">
            <h2 className="text-xl font-bold text-text mb-3">{p.heading}</h2>
            {p.paragraphs.map((text, i) => (
              <p key={i} className="text-text-secondary leading-relaxed mb-3">
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="max-w-3xl mb-10 p-6 bg-bg-secondary rounded-xl">
        <h2 className="text-xl font-bold text-text mb-3">How to read our data</h2>
        <ul className="space-y-2 text-sm text-text-secondary list-disc pl-5">
          <li>
            <strong className="text-text">Sourced value</strong> — from a named source with a
            verification date.
          </li>
          <li>
            <strong className="text-text">Unavailable / not documented</strong> — the source
            does not state it. We do not guess.
          </li>
          <li>
            <strong className="text-text">Derived result</strong> — computed by a published
            formula from values you or we entered.
          </li>
          <li>
            <strong className="text-text">Rule-based verdict</strong> — a documented pass
            condition, with the reason attached to the result.
          </li>
        </ul>
      </section>

      <section className="max-w-3xl mb-10">
        <h2 className="text-xl font-bold text-text mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text mb-2">{item.question}</h3>
              <p className="text-sm text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm max-w-3xl mb-6">
        Found a value that disagrees with the manufacturer?{" "}
        <Link href="/report-an-error" className="text-primary hover:underline">
          Report it
        </Link>{" "}
        — we verify against the source before updating.
      </p>

      <p className="text-sm max-w-3xl">
        <Link href="/tools" className="text-primary hover:underline">
          ← All tools
        </Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
