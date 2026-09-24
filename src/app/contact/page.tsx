import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CompareForge. Report errors, ask questions, or provide feedback.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">Contact Us</h1>

      <div className="space-y-6">
        <p className="text-text-secondary">
          We welcome your questions, feedback, and error reports.
        </p>

        <div className="bg-bg-secondary rounded-xl p-6">
          <h2 className="font-semibold text-text mb-3">Send Us a Message</h2>
          <p className="text-sm text-text-secondary mb-4">
            Use the email below to reach us. Please include the subject line that
            best describes your inquiry.
          </p>
          <a
            href="mailto:contact@compareforge.online?subject=Inquiry%20from%20CompareForge"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@compareforge.online
          </a>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6">
          <h2 className="font-semibold text-text mb-3">What to Include</h2>
          <ul className="text-sm text-text-secondary space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Your name (optional)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              A clear subject line
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Your message or question
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              For error reports: the page URL and description of the issue
            </li>
          </ul>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6">
          <h2 className="font-semibold text-text mb-2">Response Time</h2>
          <p className="text-sm text-text-secondary">
            We aim to respond to inquiries within 5 business days. Error reports
            are reviewed as quickly as possible.
          </p>
        </div>
      </div>
    </div>
  );
}
