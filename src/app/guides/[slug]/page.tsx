import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { guides, getGuideBySlug } from "@/lib/guides";
import { getComparisonBySlug } from "@/lib/comparisons";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: `${guide.title} | CompareForge`,
      description: guide.description,
      url: `https://compareforge.online/guides/${slug}`,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedComparisons = guide.relatedComparisonSlugs
    .map((s) => getComparisonBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />

      <article>
        <header className="mb-8">
          <span className="text-xs font-medium text-accent bg-accent-light px-2 py-1 rounded-full">
            Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-text mt-3">
            {guide.title}
          </h1>
          <p className="mt-3 text-text-secondary">{guide.description}</p>
        </header>

        <div className="prose prose-gray max-w-none">
          {guide.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-bold text-text mt-10 mb-4">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3 key={i} className="text-xl font-semibold text-text mt-8 mb-3">
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("| ")) {
              const rows = block.split("\n").filter((r) => r.trim());
              const headers = rows[0]
                .split("|")
                .filter(Boolean)
                .map((h) => h.trim());
              const dataRows = rows.slice(2).map((r) =>
                r
                  .split("|")
                  .filter(Boolean)
                  .map((c) => c.trim())
              );
              return (
                <div key={i} className="overflow-x-auto my-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        {headers.map((h, j) => (
                          <th
                            key={j}
                            className="text-left py-2 px-3 font-semibold text-text bg-bg-secondary"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataRows.map((row, j) => (
                        <tr key={j} className="border-b border-border-light">
                          {row.map((cell, k) => (
                            <td key={k} className="py-2 px-3 text-text-secondary">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.startsWith("- **")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="my-4 space-y-2">
                  {items.map((item, j) => {
                    const text = item.replace("- ", "");
                    const boldMatch = text.match(/^\*\*(.*?)\*\*(.*)/);
                    if (boldMatch) {
                      return (
                        <li key={j} className="text-text-secondary text-sm flex">
                          <span className="font-semibold text-text mr-1">
                            {boldMatch[1]}
                          </span>
                          {boldMatch[2]}
                        </li>
                      );
                    }
                    return (
                      <li key={j} className="text-text-secondary text-sm">
                        {text}
                      </li>
                    );
                  })}
                </ul>
              );
            }
            if (block.trim()) {
              return (
                <p key={i} className="text-text-secondary text-sm leading-relaxed my-4">
                  {block}
                </p>
              );
            }
            return null;
          })}
        </div>
      </article>

      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.description,
            url: `https://compareforge.online/guides/${guide.slug}`,
            datePublished: "2026-09-22",
            dateModified: "2026-09-22",
            publisher: {
              "@type": "Organization",
              name: "CompareForge",
              url: "https://compareforge.online",
            },
          }),
        }}
      />

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold text-text mb-4">Related Comparisons</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="block bg-white border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded-full">
                  {c.category}
                </span>
                <h3 className="font-semibold text-text mt-2 text-sm">{c.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
