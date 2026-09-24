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
      </div>
    </div>
  );
}
