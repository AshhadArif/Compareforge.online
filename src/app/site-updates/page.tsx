import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Site Updates",
  description:
    "A factual record of what has changed on CompareForge: new comparison tools, new pages, data verifications, accuracy fixes and policy updates.",
  alternates: {
    canonical: "/site-updates",
  },
};

interface Update {
  date: string;
  title: string;
  body: string;
}

const updates: Update[] = [
  {
    date: "14 November 2026",
    title: "E-E-A-T pass: named bylines, trust notes and editorial schema on every content page",
    body:
      "Added a visible byline (written and reviewed by Fahad, founder and editor) to guides, product records, comparisons and tools, with published/updated dates and links to the methodology and error-report pages. Each content type gained a trust note explaining how the page is assembled from sourced records — first-hand experience of maintaining the database, not a claim of hands-on testing. Article and Product structured data now carry author, publisher and reviewedBy fields; the site head publishes Organization, WebSite and Person schema sitewide. The About page gained Experience and Expertise sections, the Methodology page defines what experience means here, and the homepage now shows a four-point trust strip.",
  },
  {
    date: "14 November 2026",
    title: "Full low-value-content pass: product editorial, utility pages and guide depth",
    body:
      "After a second policy review, audited every generated page for thin and near-duplicate content. Each of the 47 product pages gained a unique Overview plus Display, Performance, Camera, Battery, Software, Design, Storage and Trade-offs sections built only from that record's own fields and medians of our database, a price-ladder commentary, a category position note, and a Closest phones section linking three neighbouring records with real deltas. Product pages now average about 1,250 words (previously about 500) with no page under 800. Expanded Report an Error, Disclaimer, Contact, Terms and Cookie Policy with process detail and scope statements, and added new data-anchored sections to six guides (spec glossary, unit pricing, compatibility checks, repair-or-replace, use-case selection and spec comparison method).",
  },
  {
    date: "4 November 2026",
    title: "Deeper guides, five new explainer articles and worked examples on tools",
    body:
      "Expanded six existing guides with new sections - common mistakes, worked examples, comparison-against-a-group methods and pre-purchase checklists - and published five new articles on panel types, refresh rate, IP ratings, phone storage and camera specifications. Each new article is built on numbers from our own database rather than general claims. Ten tool pages gained a worked example with real figures, and guide pages now link their related tools and products as well as their related comparisons.",
  },
  {
    date: "25 October 2026",
    title: "Advertising disclosure, ads.txt and publisher identity",
    body:
      "Added the advertising disclosure to the Privacy Policy and Cookie Policy, published an ads.txt file listing Google as our authorised seller, and added a funding statement to the About page. The advertising code is now part of the site source rather than a post-build patch, so it is present in every page on every build path.",
  },
  {
    date: "7 October 2026",
    title: "Canonical host fixed across every page",
    body:
      "All http:// and http://www. URLs now resolve to a single canonical host, https://compareforge.online. This collapsed duplicate versions of the site that had been recorded separately in Search Console and removed a redirect loop that affected trailing-slash URLs.",
  },
  {
    date: "4 October 2026",
    title: "Publisher identity, logo and framework security patch",
    body:
      "Added publisher identity and logo assets, fixed issues found in an internal audit of ad placement and page structure, and upgraded Next.js to 16.3.6 for a published security fix.",
  },
  {
    date: "2 October 2026",
    title: "Eight new category comparison pages",
    body:
      "Published CPU, GPU, TV, smartwatch, projector, printer, gaming monitor and phone camera comparison pages. Each one runs on a reusable comparison engine that shows the source and verification date beside every specification, and marks values that could not be verified as “Not verified” rather than guessing. The phone camera page is built from the existing phone database rather than a second copy of the data.",
  },
  {
    date: "1 October 2026",
    title: "Heading structure and keyword sections cleaned up",
    body:
      "Fixed heading-level jumps on the tablet and laptop comparison pages, added keyword sections where they were missing, and added the site audit script that now checks every generated page for a single H1, unique titles, unique canonicals, valid structured data and working internal links.",
  },
  {
    date: "29 September 2026",
    title: "Comparison hubs, brand pages and the specification tool",
    body:
      "Expanded the site around the keyword clusters we had actually researched, rebuilt the comparison hubs so each one explains when to use which tool, and fixed breadcrumb markup so search engines see the page hierarchy that is on screen.",
  },
  {
    date: "25 September 2026",
    title: "CompareForge launched",
    body:
      "First public version: 19 comparison, calculation and decision tools, a phone database with sources on every record, comparison guides, and the methodology page that explains how specification values are sourced and verified.",
  },
];

export default function SiteUpdatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Site Updates" }]} />

      <h1 className="text-3xl font-bold text-text mb-6">Site Updates</h1>

      <div className="space-y-6 text-text-secondary text-sm">
        <p>
          This page is a factual record of what has changed on CompareForge — new tools, new
          pages, corrections, and infrastructure work. It is only updated when something has
          actually changed, so the dates below are the dates the work went live rather than a
          routine refresh.
        </p>
        <p>
          Data changes are a separate matter: every product record carries the date it was last
          checked against its source, shown on the record itself, so you can see how current a
          specification is without consulting this page. The full sourcing and verification rules
          are on the{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            Methodology page
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-text pt-2">November 2026</h2>
        <ul className="space-y-5">
          {updates
            .filter((u) => u.date.includes("November"))
            .map((u) => (
              <li key={u.date + u.title} className="border-l-2 border-border pl-4">
                <p className="text-xs uppercase tracking-wide text-text-light">{u.date}</p>
                <h3 className="text-base font-semibold text-text mt-1">{u.title}</h3>
                <p className="mt-1">{u.body}</p>
              </li>
            ))}
        </ul>

        <h2 className="text-xl font-semibold text-text pt-2">October 2026</h2>
        <ul className="space-y-5">
          {updates
            .filter((u) => u.date.includes("October"))
            .map((u) => (
              <li key={u.date + u.title} className="border-l-2 border-border pl-4">
                <p className="text-xs uppercase tracking-wide text-text-light">{u.date}</p>
                <h3 className="text-base font-semibold text-text mt-1">{u.title}</h3>
                <p className="mt-1">{u.body}</p>
              </li>
            ))}
        </ul>

        <h2 className="text-xl font-semibold text-text pt-2">September 2026</h2>
        <ul className="space-y-5">
          {updates
            .filter((u) => u.date.includes("September"))
            .map((u) => (
              <li key={u.date + u.title} className="border-l-2 border-border pl-4">
                <p className="text-xs uppercase tracking-wide text-text-light">{u.date}</p>
                <h3 className="text-base font-semibold text-text mt-1">{u.title}</h3>
                <p className="mt-1">{u.body}</p>
              </li>
            ))}
        </ul>

        <h2 className="text-xl font-semibold text-text pt-2">What we do not do</h2>
        <p>
          We do not rewrite publication dates to make pages look fresh, and we do not republish
          unchanged content to create activity. A page is edited when its data or its explanation
          genuinely needs editing — not on a schedule.
        </p>

        <h2 className="text-xl font-semibold text-text pt-2">How to report a change you think is wrong</h2>
        <p>
          If a specification is out of date, a source link is dead, or a tool gives a result you
          believe is incorrect, use the{" "}
          <Link href="/report-an-error" className="text-primary hover:underline">
            report form
          </Link>{" "}
          or email{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact@compareforge.online
          </Link>
          . Corrections are checked against the original source and published with the record&apos;s
          verification date updated.
        </p>

        <h2 className="text-xl font-semibold text-text pt-2">Related</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <Link href="/methodology" className="text-primary hover:underline">
              How we source and verify data
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-primary hover:underline">
              Who runs CompareForge and how it is funded
            </Link>
          </li>
          <li>
            <Link href="/tools" className="text-primary hover:underline">
              All comparison and decision tools
            </Link>
          </li>
          <li>
            <Link href="/guides" className="text-primary hover:underline">
              Buying guides and explainer articles
            </Link>
          </li>
          <li>
            <Link href="/report-an-error" className="text-primary hover:underline">
              Report an error
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
