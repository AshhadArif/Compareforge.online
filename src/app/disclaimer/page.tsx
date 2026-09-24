import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "CompareForge disclaimer. Read important disclosures about content, affiliates, and limitations.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">Disclaimer</h1>

      <div className="space-y-6 text-text-secondary text-sm">
        <p><em>Last updated: September 2026</em></p>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Informational Purpose</h2>
          <p>
            The content on CompareForge is provided for informational and educational
            purposes only. It should not be considered professional advice.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Accuracy</h2>
          <p>
            While we make reasonable efforts to ensure accuracy, product
            specifications, prices, and availability change over time. We cannot
            guarantee that all information is current or error-free.
          </p>
          <p className="mt-2">
            Always verify product information with the manufacturer or authorized
            retailer before making a purchase decision.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">No Affiliation</h2>
          <p>
            Unless explicitly stated, CompareForge is not affiliated with,
            sponsored by, or endorsed by any product manufacturers or retailers
            mentioned on this website.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Affiliate Links</h2>
          <p>
            Currently, CompareForge does not use affiliate links. If affiliate
            relationships are established in the future, they will be clearly
            disclosed on relevant pages and in this disclaimer.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Product Claims</h2>
          <p>
            Product claims, specifications, and features mentioned on CompareForge
            are based on manufacturer information and independent sources. We do
            not independently verify every claim made by manufacturers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Third-Party Content</h2>
          <p>
            CompareForge may reference or link to third-party websites. We are not
            responsible for the content or practices of these external sites.
          </p>
        </div>
      </div>
    </div>
  );
}
