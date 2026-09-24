import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CompareForge privacy policy. Learn how we handle data, cookies, and third-party services.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-text-secondary text-sm">
        <p><em>Last updated: September 2026</em></p>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Information We Collect</h2>
          <p>
            CompareForge is a content-based website. We do not require user accounts
            or collect personal information for basic browsing.
          </p>
          <p className="mt-2">
            When you contact us via our contact form, we collect the information you
            provide (name, email, and message) solely to respond to your inquiry.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Cookies</h2>
          <p>
            CompareForge uses only essential cookies required for the website to
            function. We do not use tracking cookies or advertising cookies at this
            time.
          </p>
          <p className="mt-2">
            If third-party services (such as analytics or advertising) are added in
            the future, this policy will be updated to reflect their cookie usage.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Third-Party Services</h2>
          <p>
            Currently, CompareForge does not use third-party analytics or advertising
            services. If such services are added, this policy will be updated
            accordingly.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">How We Use Information</h2>
          <p>
            Information collected through contact forms is used solely to respond to
            your inquiry. We do not sell, trade, or share personal information with
            third parties.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Data Retention</h2>
          <p>
            Contact form submissions are retained only as long as necessary to
            respond to your inquiry and maintain a record of correspondence.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of
            any personal information we hold about you. To exercise these rights,
            contact us at contact@compareforge.online.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Changes to This Policy</h2>
          <p>
            We may update this privacy policy when our practices change. Changes will
            be posted on this page with an updated date.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Contact</h2>
          <p>
            For privacy-related questions, contact us at contact@compareforge.online.
          </p>
        </div>
      </div>
    </div>
  );
}
