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
        <p><em>Last updated: October 2026</em></p>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Information We Collect</h2>
          <p>
            CompareForge is a content-based website. We do not require user accounts and we do not
            collect personal information while you browse.
          </p>
          <p className="mt-2">
            The site has no contact form and no account system. If you email us at
            contact@compareforge.online, we receive whatever you choose to put in that email —
            typically your email address and message — and we use it only to reply.
          </p>
          <p className="mt-2">
            Every tool on this site (calculators, comparisons, checkers and matrices) runs entirely
            in your browser. The numbers you enter are not sent to our servers, are not stored, and
            are cleared when you close or refresh the page. Some tools can encode your inputs into
            the page URL so you can share a result; those values travel inside the link you share.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Cookies and Local Storage</h2>
          <p>
            CompareForge itself does not set first-party cookies and does not write to browser
            local storage or session storage. Your web host may record standard server logs
            (IP address, requested URL, time, user agent) for security and reliability purposes.
          </p>
          <p className="mt-2">
            Advertising cookies set by our advertising partner are separate from the above and are
            described in the next section.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Advertising and Third-Party Services</h2>
          <p>
            This site uses Google AdSense to display advertising. Google, as a third-party vendor,
            uses cookies to serve ads on this site. Google&apos;s use of advertising cookies
            (including the DoubleClick DART cookie) enables it and its partners to serve ads based
            on prior visits to this website or to other websites.
          </p>
          <p className="mt-2">
            You may opt out of personalised advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            . You may also instruct some third-party vendors to stop using cookies for personalised
            advertising at{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              www.aboutads.info/choices
            </a>{" "}
            or{" "}
            <a
              href="https://www.youronlinechoices.com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              www.youronlinechoices.com
            </a>
            .
          </p>
          <p className="mt-2">
            Third parties may be placing and reading cookies on your browser, or using web beacons
            or IP addresses to collect information as a result of ad serving on this website. For
            more detail on how Google uses data when you use our partners&apos; sites or apps, see{" "}
            <a
              href="https://www.google.com/policies/privacy/partners/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              How Google uses data when you use our partners&apos; sites or apps
            </a>
            . Google&apos;s own treatment of information is described in{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              Google&apos;s Advertising Technologies &amp; Privacy Policies
            </a>
            .
          </p>
          <p className="mt-2">
            Fonts used on this site are self-hosted at build time, so loading a page does not
            contact a third-party font provider. CompareForge does not embed third-party analytics,
            social widgets or trackers beyond the advertising service described above.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">How We Use Information</h2>
          <p>
            Information you email us is used solely to respond to your message. We do not sell,
            trade, or share personal information with third parties.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Data Retention</h2>
          <p>
            Emails you send us are kept only as long as needed to respond and to maintain a record
            of the correspondence. Because the tools store nothing, there is no tool input data to
            retain or delete.
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
