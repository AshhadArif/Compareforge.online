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
        <p><em>Last updated: October 2026</em></p>

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
            CompareForge sets no first-party cookies — no session cookie, no preference cookie and
            no analytics cookie. The site is static, there is no login and there is no saved state,
            so there is nothing for a first-party cookie to carry.
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
            This site displays advertising through Google AdSense. Google, as a third-party vendor,
            uses cookies to serve ads. Google&apos;s use of advertising cookies (including the
            DoubleClick DART cookie) enables it and its partners to serve ads based on prior visits
            to this website or other websites. These are third-party cookies: they are set and read
            by Google, not by CompareForge, and we cannot read or control them.
          </p>
          <p className="mt-2">
            You can manage personalised advertising in{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            , or opt out of many advertisers&apos; cookies at{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              www.aboutads.info/choices
            </a>{" "}
            and{" "}
            <a
              href="https://www.youronlinechoices.com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              www.youronlinechoices.com
            </a>
            . How Google uses data when you use our partners&apos; sites or apps is explained at{" "}
            <a
              href="https://www.google.com/policies/privacy/partners/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              google.com/policies/privacy/partners
            </a>
            .
          </p>
          <p className="mt-2">
            Apart from advertising, CompareForge loads no third-party analytics, social widgets or
            trackers. Fonts are self-hosted at build time.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text mb-2">Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings, and most browsers let
            you block or delete them site by site. Blocking cookies does not change how the
            comparison tools work — they keep functioning exactly the same way, because none of
            their calculations depend on cookies.
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
