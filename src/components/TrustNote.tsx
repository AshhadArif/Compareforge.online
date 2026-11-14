import Link from "next/link";

export type TrustVariant = "guide" | "product" | "comparison" | "tool" | "page";

interface TrustNoteProps {
  variant: TrustVariant;
  /** Product: number of sources on the record. */
  sourceCount?: number;
  /** Product: last-verified date (YYYY-MM-DD). */
  verified?: string;
  /** Guide/comparison: last updated (YYYY-MM-DD). */
  updated?: string;
}

const HEADINGS: Record<TrustVariant, string> = {
  guide: "How this guide was written",
  product: "How this record was assembled",
  comparison: "How this comparison was built",
  tool: "How this tool stays honest",
  page: "How we keep this page accurate",
};

/**
 * Trust block: first-hand experience of the site's own data process,
 * expertise signals (methodology, formulas), and the correction path.
 * Claims are limited to what the site actually does — no hands-on testing.
 */
export default function TrustNote({
  variant,
  sourceCount,
  verified,
  updated,
}: TrustNoteProps) {
  const body: Record<TrustVariant, React.ReactNode> = {
    guide: (
      <>
        <p>
          This guide was written and reviewed by Fahad, who edits every page on
          CompareForge. Where it uses numbers, they come from records in our own
          database — the same sourced specification pages you can open from the
          related products and comparisons below — not from stock figures or
          manufacturer marketing copy.
        </p>
        <p>
          We do not run lab tests or hands-on reviews. What we do is structure
          published specifications, state the formula behind every derived
          number, and correct a record when a source disagrees with it. The
          full rules are on the{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            Methodology page
          </Link>
          {updated ? ` — this guide was last updated ${updated}.` : "."}
        </p>
      </>
    ),
    product: (
      <>
        <p>
          Every field on this page comes from a named source with an access date
          and a confidence flag, listed in the Sources section
          {typeof sourceCount === "number" && sourceCount > 0
            ? ` (${sourceCount} sources on this record)`
            : ""}
          . Where a manufacturer does not document a value, the cell stays empty
          rather than being filled with an estimate.
        </p>
        <p>
          Median figures are computed only from the phones we publish in this
          database — not a market survey. The editorial sections above are
          assembled from this record&apos;s own fields at build time, so no two
          product pages share body text.
          {verified ? ` Last verified against sources: ${verified}.` : ""}
          {" "}Something wrong?{" "}
          <Link href="/report-an-error" className="text-primary hover:underline">
            Report it
          </Link>{" "}
          and we re-check the record before changing anything.
        </p>
      </>
    ),
    comparison: (
      <>
        <p>
          This comparison aligns fields from the product records themselves —
          the same sourced pages linked above — and marks each difference and
          its significance. Values that no source confirms appear as
          “Not verified”; we do not fill gaps to make a table look complete.
        </p>
        <p>
          There is no hand-placed winner: the quick verdict and any rankings
          follow the documented rules on the{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            Methodology page
          </Link>
          . {updated ? `Last updated ${updated}.` : null}{" "}
          <Link href="/report-an-error" className="text-primary hover:underline">
            Report a disagreement
          </Link>{" "}
          if a figure no longer matches the manufacturer&apos;s page.
        </p>
      </>
    ),
    tool: (
      <>
        <p>
          Every calculator on this site publishes the exact formula it applies,
          so you can reproduce the result by hand. Rule-based checkers state
          their thresholds before you use them. Tool inputs stay in your
          browser — nothing you type is sent to a server or stored.
        </p>
        <p>
          Rankings and similarity scores are weights applied to documented
          specification differences; there is no paid placement and no
          hand-placed winner. The full sourcing rules live on the{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            Methodology page
          </Link>
          .
        </p>
      </>
    ),
    page: (
      <>
        <p>
          This page is edited by Fahad, founder and publisher of CompareForge.
          Corrections are verified against the original source before anything
          is changed, and substantive edits are logged on the{" "}
          <Link href="/site-updates" className="text-primary hover:underline">
            Site Updates
          </Link>{" "}
          page.
        </p>
        <p>
          Find something wrong?{" "}
          <Link href="/report-an-error" className="text-primary hover:underline">
            Report an error
          </Link>{" "}
          — include the page URL and the source that shows the correct value.
        </p>
      </>
    ),
  };

  return (
    <aside
      aria-label={HEADINGS[variant]}
      className="mt-8 p-5 bg-bg-secondary border border-border-light rounded-xl max-w-3xl"
    >
      <h2 className="text-sm font-semibold text-text uppercase tracking-wide mb-3">
        {HEADINGS[variant]}
      </h2>
      <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
        {body[variant]}
      </div>
    </aside>
  );
}
