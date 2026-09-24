import Link from "next/link";
import { Comparison } from "@/data/types";

interface ComparisonCardProps {
  comparison: Comparison;
}

export default function ComparisonCard({ comparison }: ComparisonCardProps) {
  const isRoundup = comparison.isRoundup;
  return (
    <article className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <Link
          href={`/categories/${comparison.category}`}
          className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
        >
          {comparison.category === "smartphones" ? "Smartphones" : comparison.category}
        </Link>
        {isRoundup && (
          <span className="text-xs font-medium text-accent bg-accent-light px-2 py-1 rounded-full">
            Roundup
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">
        <Link href={`/compare/${comparison.slug}`} className="hover:text-primary transition-colors">
          {comparison.title}
        </Link>
      </h3>
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {comparison.metaDescription}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-light">Updated {comparison.lastUpdated}</span>
        <Link
          href={`/compare/${comparison.slug}`}
          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View Comparison →
        </Link>
      </div>
    </article>
  );
}
