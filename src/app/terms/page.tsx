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
          <p className="mt-2">
            You may not attempt to disrupt the site, scrape it at a volume that interferes with
            other visitors, misrepresent content from this site as your own, or use our data
            sources and verification dates to imply a relationship with CompareForge that does
            not exist. Linking to individual pages is welcome; republishing whole tables,
            guides, or tool pages is not, without written permission.
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
          <p className="mt-2">
            Tool outputs are computed from the inputs you provide using the formulas published
            on each tool page. They are decision aids, not advice, and they do not account for
            circumstances we cannot see — your budget, your existing accessories, or how a
            retailer actually prices a unit today.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Intellectual Property</h2>
          <p>
            All content on CompareForge, including text, analysis, and design, is our
            original work. You may not reproduce, distribute, or create derivative
            works without our written permission.
          </p>
          <p className="mt-2">
            Manufacturer names, product names, logos and trademarks remain the property of
            their respective owners and appear on this site for identification and comparison
            only. Source links and attributed quotations belong to their original publishers;
            we link to them so you can verify a figure, not so their content can be reused
            through us.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Advertising</h2>
          <p>
            CompareForge is funded by display advertising served through Google AdSense.
            Advertisements are kept separate from specification tables, tool controls and
            comparison results. No advertiser can buy a position in a ranking, change a
            specification value, or influence a methodology rule.
          </p>
          <p className="mt-2">
            Ads are provided by third parties and may set cookies as described in the{" "}
            <a href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </a>
            . We do not endorse the products or services advertised; click an ad only if you
            independently decide the offer is relevant to you.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">External Links</h2>
          <p>
            Pages may link to manufacturer pages, retailers, or other third-party sites for
            source verification. We are not responsible for the availability, accuracy, or
            practices of those destinations. Following an external link leaves CompareForge,
            and that site&apos;s own terms and privacy rules apply from that point onward.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Limitation of Liability</h2>
          <p>
            CompareForge shall not be liable for any damages arising from the use of
            or inability to use this website or its content. This includes, but is
            not limited to, direct, indirect, incidental, or consequential damages.
          </p>
          <p className="mt-2">
            This includes purchase decisions made on the basis of data published here. You are
            responsible for confirming any figure that matters to a transaction — price,
            compatibility, update commitment — with the manufacturer or retailer before you act
            on it.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be
            posted on this page. Continued use of the website after changes
            constitutes acceptance of the modified terms.
          </p>
          <p className="mt-2">
            Substantive updates to how the site is run — advertising, data sourcing, or
            correspondence practices — are also summarised on the{" "}
            <a href="/site-updates" className="text-primary hover:underline">
              Site Updates
            </a>{" "}
            page so returning visitors can see what changed without re-reading this document.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Contact</h2>
          <p>
            Questions about these terms go to contact@compareforge.online. Privacy and cookie
            questions are handled under the Privacy Policy and Cookie Policy; data-correction
            requests use the Report an Error page so they land with the page URL attached.
          </p>
        </div>
      </div>
    </div>
  );
}
