import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Report an Error",
  description: "Report an error or inaccuracy on CompareForge. Help us maintain accurate, trustworthy content.",
  alternates: {
    canonical: "/report-an-error",
  },
};

export default function ReportErrorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Report an Error" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">Report an Error</h1>

      <div className="space-y-6">
        <p className="text-text-secondary">
          If you have found an inaccuracy, outdated information, or error on
          CompareForge, we want to know. Your reports help us maintain accurate,
          trustworthy content.
        </p>

        <div className="bg-bg-secondary rounded-xl p-6">
          <h2 className="font-semibold text-text mb-3">Send Us an Error Report</h2>
          <p className="text-sm text-text-secondary mb-4">
            Use the email below to report errors. Please include as much detail
            as possible.
          </p>
          <a
            href="mailto:contact@compareforge.online?subject=Error%20Report%20-%20CompareForge&body=Page%20URL%3A%0A%0AError%20description%3A%0A%0ASource%20or%20correction%3A"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Report via Email
          </a>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6">
          <h2 className="font-semibold text-text mb-3">What to Include</h2>
          <ul className="text-sm text-text-secondary space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              The page URL where the error appears
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Description of the error
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Source or correction (if available)
            </li>
          </ul>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6">
          <h2 className="font-semibold text-text mb-2">Our Process</h2>
          <p className="text-sm text-text-secondary">
            We review error reports promptly. If the error is confirmed, we correct
            the content and note the correction. We appreciate your help keeping
            CompareForge accurate.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-text mb-4">What Happens After You Report</h2>
          <div className="space-y-4 text-sm text-text-secondary">
            <p>
              Every report is read by the same person who maintains the database — there is no
              ticket queue handed off to a third party. Reports that include a working page URL
              are checked first, because the URL points directly at the specification record and
              the source list attached to it.
            </p>
            <p>
              When a value is wrong, we correct the record, re-check the remaining fields on the
              same page against the linked source, and move the last-verified date forward only
              when the whole record has been re-checked — not merely because one field changed.
              If a source itself has changed (a manufacturer revised a spec sheet, a price moved),
              the source entry and its access date are updated so the page shows what we actually
              looked at.
            </p>
            <p>
              Confirmed corrections are listed on the{" "}
              <a href="/site-updates" className="text-primary hover:underline">
                Site Updates
              </a>{" "}
              page, which records what changed and when. We do not silently edit published
              figures: the changelog is the public trail of every substantive change to the
              database, guides, and tools.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-text mb-4">Common Report Types</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-text">Wrong specification value</dt>
              <dd className="text-sm text-text-secondary mt-1">
                For example: a battery capacity that does not match the manufacturer page, a
                refresh rate listed incorrectly, or a camera sensor attributed to the wrong lens.
                Include the field name and, if you have it, the URL of the manufacturer or
                retailer page that shows the correct figure. We compare both sources side by side
                before changing anything.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Outdated price or status</dt>
              <dd className="text-sm text-text-secondary mt-1">
                Prices in our tables are the last ones we verified against a named source — they
                are not a live feed. If a model has been re-priced, discontinued, or re-listed,
                tell us the page URL and what the current price or status is. We will re-verify
                against the source before updating the record and its verification date.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Broken tool or comparison</dt>
              <dd className="text-sm text-text-secondary mt-1">
                If a calculator returns a result that does not match its published formula, or a
                comparison table fails to load a row, include the inputs you used and the result
                you expected. Tool pages publish their formulas in the Methodology section, so a
                mismatch can usually be reproduced and fixed in one pass.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Missing source or confidence flag</dt>
              <dd className="text-sm text-text-secondary mt-1">
                Each product page lists its sources with links, access dates, and a confidence
                flag (verified, estimated, or unconfirmed). If a value is shown without a source
                you believe should exist, or a source link no longer resolves, report it —
                untraceable values are removed rather than left on the page.
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-xl font-bold text-text mb-4">What We Will Not Change</h2>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              We correct facts; we do not rewrite conclusions on request. If you disagree with
              how a comparison weighs two specifications, say so through{" "}
              <a href="/contact" className="text-primary hover:underline">
                Contact
              </a>{" "}
              and we will explain the rule the tool applied — but a methodology you dislike is
              not the same as an error in the data.
            </p>
            <p>
              We also do not remove accurate but unflattering specifications, add star ratings we
              have not computed from documented differences, or accept replacement text from a
              manufacturer, retailer, or affiliate. The full rules are on the{" "}
              <a href="/methodology" className="text-primary hover:underline">
                Methodology
              </a>{" "}
              page.
            </p>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6">
          <h2 className="font-semibold text-text mb-3">Before You Report</h2>
          <p className="text-sm text-text-secondary mb-3">
            Two quick checks save a round-trip:
          </p>
          <ul className="text-sm text-text-secondary space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Open the product page and scroll to the Sources section — if the field already
              carries a source and a recent verification date, quote that source in your report
              so we can compare it with yours.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Check the Site Updates page for a recent entry on the same record; if the change
              you are reporting is already logged, it is already on the live page.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
