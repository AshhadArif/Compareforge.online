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
    </div>
  );
}
