import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CompareForge terms of service. Read the terms governing your use of this website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">Terms of Service</h1>

      <div className="space-y-6 text-text-secondary text-sm">
        <p><em>Last updated: September 2026</em></p>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Acceptance of Terms</h2>
          <p>
            By accessing and using CompareForge.online, you accept and agree to be
            bound by these terms of service. If you do not agree to these terms, do
            not use this website.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Use of the Website</h2>
          <p>
            You may use CompareForge for lawful purposes and in accordance with these
            terms. You agree not to use the website in any way that violates
            applicable laws or regulations.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Content</h2>
          <p>
            The content on CompareForge is provided for informational purposes only.
            While we strive for accuracy, we make no warranties about the
            completeness, reliability, or suitability of the information.
          </p>
          <p className="mt-2">
            Product specifications, prices, and availability change over time. Always
            verify current information with manufacturers or retailers before making
            purchasing decisions.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Intellectual Property</h2>
          <p>
            All content on CompareForge, including text, analysis, and design, is our
            original work. You may not reproduce, distribute, or create derivative
            works without our written permission.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Limitation of Liability</h2>
          <p>
            CompareForge shall not be liable for any damages arising from the use of
            or inability to use this website or its content. This includes, but is
            not limited to, direct, indirect, incidental, or consequential damages.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be
            posted on this page. Continued use of the website after changes
            constitutes acceptance of the modified terms.
          </p>
        </div>
      </div>
    </div>
  );
}
