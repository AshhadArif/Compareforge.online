import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "About CompareForge",
  description:
    "Learn about CompareForge — our mission, how we build comparison tools, and our commitment to accuracy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "About" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">About CompareForge</h1>

      <div className="space-y-6 text-text-secondary">
        <p>
          CompareForge is a comparison and decision-tools platform. We build interactive
          tools — side-by-side comparisons, price and percentage calculators, compatibility
          and fit checks, and weighted decision matrices — alongside sourced comparisons and
          buying guides that help you make informed purchasing decisions.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">Our Mission</h2>
          <p>
            Our goal is to help you make informed purchasing decisions. We provide
            clear, structured comparisons that explain what specifications mean in
            practice, analyze trade-offs, and help you understand which product fits
            your specific needs — whether you arrive with two candidates or none.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">Who Runs CompareForge</h2>
          <p>
            CompareForge is published and maintained by <strong className="text-text">Fahad</strong>.
            He owns the site, edits every comparison, guide and tool page, and is responsible for the
            accuracy of what is published here.
          </p>
          <p className="mt-2">
            There is no editorial team behind CompareForge and no sponsored or guest content: one
            person decides what gets published, checks the source behind each specification value,
            and corrects it when something turns out to be wrong. Every product record carries the
            page it came from and the date it was last verified — the full process is documented on
            the Methodology page.
          </p>
          <p className="mt-2">
            Corrections, data suggestions and questions go to{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact@compareforge.online
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">The Experience Behind the Data</h2>
          <p>
            CompareForge is not a copy of a spec aggregator: it is a database someone maintains by
            hand. Every record on this site was entered, cross-checked against a manufacturer page
            or a named independent source, and given a verification date — and when a later check
            disagrees with an earlier one, the record is corrected and the change is logged on the
            Site Updates page.
          </p>
          <p className="mt-2">
            That ongoing work shows up in the content itself. Product pages compare each model
            against medians of the phones we actually publish, so a “large battery” claim is
            tested against our own table rather than repeated from a press release. Tool pages carry
            worked examples built from those same records. Guides that mention numbers use figures
            you can open and verify from a link on the same page.
          </p>
          <p className="mt-2">
            We also know the limits of that experience from the inside: spec sheets contain errors,
            prices move between checks, and a field that looked complete last month can turn out to
            be an estimate at the source. The reporting channel and the correction log exist
            because we have had to fix those things ourselves.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">How Expertise Shows Up Here</h2>
          <p>
            Expertise on CompareForge means knowing which numbers can be compared and which cannot —
            and publishing the rule when the answer is “cannot”. Concretely:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Every calculator publishes its exact formula so the result can be reproduced by hand
            </li>
            <li>
              Rankings state their weights; a close score is reported as close rather than forced
              into a winner
            </li>
            <li>
              Missing values stay missing — “not verified” is a published state, not a failure to
              fill a cell
            </li>
            <li>
              Median and “closest phone” statements are scoped to this database, not dressed up as
              market research
            </li>
            <li>
              The Methodology page documents sourcing, verification and correction rules in full
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">How CompareForge Is Funded</h2>
          <p>
            CompareForge is funded by display advertising served through Google AdSense. That is
            the only commercial relationship the site has with anyone.
          </p>
          <p className="mt-2">
            We do not accept paid placements, sponsored pages or guest posts, we run no affiliate
            links, and no manufacturer can buy a position in a comparison, a ranking or a
            recommendation. Advertisements are kept separate from the tools and the comparison
            tables, and they never change a specification value, a source or a conclusion.
          </p>
          <p className="mt-2">
            Because the tools run entirely in your browser, your inputs stay on your device — see
            the{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            for exactly what is and is not collected.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">How We Create Comparisons</h2>
          <p>
            Every comparison on CompareForge follows a consistent process:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Specifications are sourced from manufacturer official pages and
              cross-referenced with independent sources
            </li>
            <li>
              We explain what specifications mean in practical terms
            </li>
            <li>
              We analyze how differences affect real-world use
            </li>
            <li>
              We provide use-case guidance to help you decide
            </li>
            <li>
              We document all sources and methodology — see our{" "}
              <a href="/methodology" className="text-primary hover:underline">
                Methodology page
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">What We Do Not Do</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>We do not copy product descriptions from manufacturers</li>
            <li>We do not fabricate testing or hands-on experience</li>
            <li>We do not create fake ratings or reviews</li>
            <li>We do not invent prices, benchmarks or keyword metrics</li>
            <li>We do not mass-produce thin comparison pages</li>
            <li>We do not make unsupported &quot;best product&quot; claims</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">Corrections</h2>
          <p>
            If you find an error on CompareForge, please visit our{" "}
            <a href="/report-an-error" className="text-primary hover:underline">
              Report an Error
            </a>{" "}
            page. We review corrections promptly and update content when errors are
            found.
          </p>
          <p className="mt-2">
            Confirmed corrections are logged publicly on the{" "}
            <a href="/site-updates" className="text-primary hover:underline">
              Site Updates
            </a>{" "}
            page, which records what changed and when. We do not silently edit published
            figures: when a specification, price or status moves, the record&apos;s
            last-verified date is refreshed only after the whole page has been re-checked
            against its sources — not because a single field changed.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">What Is on This Site</h2>
          <p>
            CompareForge publishes three kinds of pages, all built on the same sourced
            records:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong className="text-text">Product records</strong> — full specification
              pages with sources, verification dates, pricing variants, and a median
              table showing where the model sits among the phones we publish
            </li>
            <li>
              <strong className="text-text">Side-by-side comparisons</strong> — aligned
              fields from two or more records, with the difference and its significance
              marked, and “Not verified” where a source does not confirm a value
            </li>
            <li>
              <strong className="text-text">Tools and guides</strong> — calculators with
              published formulas, rule-based checkers with stated thresholds, and
              explainer articles whose examples use numbers from our own database
            </li>
          </ul>
          <p className="mt-2">
            The Methodology page documents how each of those is sourced and verified; the
            Disclaimer states what the data is not (live pricing, lab test results,
            professional advice).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-3">Contact</h2>
          <p>
            For questions or inquiries, visit our{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact
            </a>{" "}
            page.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About CompareForge",
            url: "https://compareforge.online/about",
            about: {
              "@type": "Organization",
              name: "CompareForge",
              url: "https://compareforge.online",
              email: "contact@compareforge.online",
              member: {
                "@type": "Person",
                name: "Fahad",
                role: "Founder, editor and publisher",
                url: "https://compareforge.online/about",
              },
            },
          }),
        }}
      />
    </div>
  );
}
