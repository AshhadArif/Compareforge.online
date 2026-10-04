import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "CompareForge cookie policy. Learn about the cookies we use and how to manage them.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">Cookie Policy</h1>

      <div className="space-y-6 text-text-secondary text-sm">
        <p><em>Last updated: September 2026</em></p>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help the website function properly and provide
            information to the site owners.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Cookies We Use</h2>
          <p>
            CompareForge sets no cookies — no session cookie, no preference cookie, no analytics
            cookie and no advertising cookie. The site is static, there is no login and there is no
            saved state, so there is nothing for a cookie to carry.
          </p>
          <p className="mt-2">
            The tools do not use browser local storage or session storage either. Some calculators
            and comparisons can put your entered values into the page URL so you can share or revisit
            a result; those values travel inside the link itself and are not written to your browser.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Third-Party Cookies</h2>
          <p>
            Currently, CompareForge does not use third-party cookies and loads no third-party
            analytics, social widgets or advertising. If analytics or advertising services are added
            in the future, this policy will be updated to disclose their cookie usage before they go
            live.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings, and most browsers let
            you block or delete them site by site. Because CompareForge sets none, blocking cookies
            does not change how this site works — the tools keep functioning exactly the same way.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Changes to This Policy</h2>
          <p>
            We may update this cookie policy when our practices change. Changes will
            be posted on this page with an updated date.
          </p>
        </div>
      </div>
    </div>
  );
}
