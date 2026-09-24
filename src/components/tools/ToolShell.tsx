import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import RelatedTools from "@/components/tools/RelatedTools";
import DynamicNoIndex from "@/components/tools/DynamicNoIndex";
import { ToolRegistryEntry } from "@/lib/tools";
import { getGuideBySlug } from "@/lib/guides";

export interface Crumb {
  label: string;
  href?: string;
}

export interface ToolContentSection {
  heading: string;
  paragraphs: string[];
}

interface ToolShellProps {
  tool: ToolRegistryEntry;
  crumbs?: Crumb[];
  intro: string;
  children: React.ReactNode;
  sections?: ToolContentSection[];
  methodology: string[];
  faq: { question: string; answer: string }[];
  faqSchema?: object;
}

export default function ToolShell({
  tool,
  crumbs,
  intro,
  children,
  sections = [],
  methodology,
  faq,
  faqSchema,
}: ToolShellProps) {
  const items: Crumb[] = crumbs ?? [
    { label: "Tools", href: "/tools" },
    { label: tool.name },
  ];
  const relatedGuides = tool.relatedGuideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DynamicNoIndex />
      <Breadcrumbs items={items} />

      <div className="max-w-3xl mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-primary mb-2">
          {tool.type} tool
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-text">{tool.name}</h1>
        <p className="mt-3 text-lg text-text-secondary">{intro}</p>
      </div>

      <div id="tool-ui" className="mb-10">
        {children}
      </div>

      {sections.map((section) => (
        <section key={section.heading} className="max-w-3xl mb-8">
          <h2 className="text-xl font-bold text-text mb-3">{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-3">
              {p}
            </p>
          ))}
        </section>
      ))}

      <section className="mb-8 p-6 bg-bg-secondary rounded-xl max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-3">Methodology &amp; Data</h2>
        <ul className="space-y-2 text-sm text-text-secondary list-disc pl-5">
          {methodology.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <Link href="/methodology" className="text-primary hover:underline">
            How we source and verify data →
          </Link>
        </p>
      </section>

      <RelatedTools currentToolId={tool.tool_id} />

      {relatedGuides.length > 0 ? (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-bold text-text mb-4">Related Guides</h2>
          <ul className="space-y-2">
            {relatedGuides.map((g) => (
              <li key={g.slug} className="bg-white border border-border rounded-xl p-4">
                <Link href={`/guides/${g.slug}`} className="font-medium text-primary hover:underline">
                  {g.title}
                </Link>
                <p className="text-sm text-text-secondary mt-1">{g.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-4">Common Questions</h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text mb-2">{item.question}</h3>
              <p className="text-sm text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <p className="mt-8 text-sm max-w-3xl">
        <Link href="/tools" className="text-primary hover:underline">
          ← All tools
        </Link>
      </p>
    </div>
  );
}
