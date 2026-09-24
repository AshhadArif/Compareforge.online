import Link from "next/link";

interface GuideCardProps {
  title: string;
  slug: string;
  description: string;
}

export default function GuideCard({ title, slug, description }: GuideCardProps) {
  return (
    <article className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <span className="text-xs font-medium text-accent bg-accent-light px-2 py-1 rounded-full">
        Guide
      </span>
      <h3 className="text-lg font-semibold text-text mt-3 mb-2">
        <Link href={`/guides/${slug}`} className="hover:text-primary transition-colors">
          {title}
        </Link>
      </h3>
      <p className="text-sm text-text-secondary line-clamp-2">
        {description}
      </p>
    </article>
  );
}
