import Link from "next/link";
import { EDITOR } from "@/lib/editorial";

interface AuthorBylineProps {
  /** Published date shown before the modified date (YYYY-MM-DD or display string). */
  published?: string;
  /** Last substantive edit or verification (YYYY-MM-DD or display string). */
  modified?: string;
  /** Extra label, e.g. "Specification record" or "Comparison". */
  kind?: string;
  /** Show the methodology link (default true). */
  showMethodology?: boolean;
}

function formatDate(value: string): string {
  // Already a display string (e.g. "4 November 2026") — pass through.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Visible E-E-A-T byline: named editor, role, dates, and links to the
 * methodology and about pages. Used on guides, products, comparisons and tools.
 */
export default function AuthorByline({
  published,
  modified,
  kind,
  showMethodology = true,
}: AuthorBylineProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-text-secondary border-b border-border-light pb-4 mb-6">
      <span className="inline-flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-primary text-xs font-bold"
        >
          {EDITOR.name.slice(0, 1)}
        </span>
        <span>
          {kind ? <span className="text-text font-medium">{kind}</span> : null}
          {kind ? " · " : null}
          Written and reviewed by{" "}
          <Link href="/about" className="text-primary font-medium hover:underline">
            {EDITOR.name}
          </Link>
          , {EDITOR.bylineRole}
        </span>
      </span>
      {published ? (
        <span className="text-text-light">
          Published {formatDate(published)}
        </span>
      ) : null}
      {modified ? (
        <span className="text-text-light">
          Last updated {formatDate(modified)}
        </span>
      ) : null}
      {showMethodology ? (
        <Link href="/methodology" className="text-primary hover:underline">
          How we source data
        </Link>
      ) : null}
      <Link href="/report-an-error" className="text-primary hover:underline">
        Report an error
      </Link>
    </div>
  );
}
