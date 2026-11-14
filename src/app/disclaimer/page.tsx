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
          <p className="mt-2">
            Nothing on this site is a recommendation to buy, sell, or hold any product, and
            nothing on this site substitutes for your own judgement about what you need.
            Specifications describe what a manufacturer documented at the time we recorded
            them — they do not predict real-world battery life, camera quality, or software
            support beyond what the vendor itself has committed to in writing.
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
          <p className="mt-2">
            Each product page carries a last-verified date and a list of the sources we
            consulted, with the date each source was accessed. That date tells you how
            old our check is; it is not a guarantee that the manufacturer has not changed
            the figure since. Prices in particular move without notice, and the figures in
            our tables are the last ones we confirmed against a named source — they are not
            a live quote from a retailer.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">No Affiliation</h2>
          <p>
            Unless explicitly stated, CompareForge is not affiliated with,
            sponsored by, or endorsed by any product manufacturers or retailers
            mentioned on this website.
          </p>
          <p className="mt-2">
            Brand names, product names, logos and trademarks appearing on this site are the
            property of their respective owners. Their use here is for identification and
            comparison only and does not imply any affiliation, endorsement, or sponsorship.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Affiliate Links</h2>
          <p>
            Currently, CompareForge does not use affiliate links. If affiliate
            relationships are established in the future, they will be clearly
            disclosed on relevant pages and in this disclaimer.
          </p>
          <p className="mt-2">
            Because there are no affiliate links today, no specification value, comparison
            ranking, tool result, or guide conclusion on this site is influenced by a
            commercial relationship with a retailer or manufacturer. The only commercial
            relationship the site has is display advertising — see the About page for how
            that is kept separate from the content.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Product Claims</h2>
          <p>
            Product claims, specifications, and features mentioned on CompareForge
            are based on manufacturer information and independent sources. We do
            not independently verify every claim made by manufacturers.
          </p>
          <p className="mt-2">
            Where a figure is a manufacturer claim (for example, a stated battery-life
            estimate or a peak-brightness measurement taken under lab conditions), we record
            it as documented rather than as a tested result. CompareForge does not run
            hardware tests, does not publish benchmark scores we have not sourced, and does
            not assign star ratings to products.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Third-Party Content</h2>
          <p>
            CompareForge may reference or link to third-party websites. We are not
            responsible for the content or practices of these external sites.
          </p>
          <p className="mt-2">
            External links are provided for source traceability — so you can check a figure
            against the page we relied on. A link does not mean we endorse the destination,
            and the destination may have changed since the access date shown next to it.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Tool Results</h2>
          <p>
            Calculators and decision tools on this site compute results from inputs you
            provide, using formulas published on each tool page. A result is only as good as
            the numbers entered and the formula applied — we do not validate whether your
            inputs describe a real product or a real situation.
          </p>
          <p className="mt-2">
            Weighted tools (decision matrices, fit scores, similarity rankings) state their
            weights and thresholds openly. Different weights produce different rankings; if a
            tool does not match your priorities, adjust the weights rather than treating the
            default output as a verdict.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Limitations of This Database</h2>
          <p>
            CompareForge publishes a curated set of product records, not an exhaustive
            catalogue of everything on sale. Median figures, price rankings and “closest
            phone” suggestions are computed only against the records we actually publish —
            they describe this database, not the whole market. A phone we do not track may
            change the picture entirely; we say so on the pages where the comparison is made.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Corrections</h2>
          <p>
            Errors, once confirmed, are corrected and logged on the Site Updates page. If you
            find something wrong, use the Report an Error page — include the page URL and the
            source that shows the correct value, and we will re-check the record against it.
          </p>
        </div>
      </div>
    </div>
  );
}
