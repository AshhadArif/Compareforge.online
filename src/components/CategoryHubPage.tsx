import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SpecComparison from "@/components/tools/SpecComparison";
import CompareHubLinks from "@/components/CompareHubLinks";
import { CategoryHubConfig, DATA_NOTE } from "@/data/category-hubs";
import { generateFAQSchema } from "@/lib/schema";

export default function CategoryHubPage({ hub }: { hub: CategoryHubConfig }) {
  const faqSchema = generateFAQSchema(hub.faq);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[{ label: "Comparisons", href: "/compare" }, { label: hub.h1 }]}
      />

      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">{hub.h1}</h1>
        <p className="mt-3 text-lg text-text-secondary">{hub.intro}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">{hub.toolHeading}</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          {hub.toolIntro}
        </p>
        <SpecComparison defaultCategory={hub.specCategory} />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">
          {hub.specificationsHeading}
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          {hub.specificationsIntro}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {hub.specGroups.map((group) => (
            <div key={group.title} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{group.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{group.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-3">{hub.focusHeading}</h2>
        <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
          {hub.focusIntro}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {hub.focusItems.map((item) => (
            <div key={item.title} className="bg-bg-secondary border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {hub.useCaseHeading && hub.useCases && hub.useCases.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-3">{hub.useCaseHeading}</h2>
          <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
            {hub.useCaseIntro}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {hub.useCases.map((useCase) => (
              <div key={useCase.title} className="bg-white border border-border rounded-xl p-5">
                <h3 className="font-semibold text-text mb-2">{useCase.title}</h3>
                <ul className="space-y-1.5">
                  {useCase.criteria.map((criterion) => (
                    <li
                      key={criterion}
                      className="text-sm text-text-secondary flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">›</span>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-12 p-6 bg-primary-light border border-primary/20 rounded-xl max-w-3xl">
        <h2 className="text-lg font-bold text-text mb-2">About product data on this page</h2>
        <p className="text-sm text-text-secondary">{DATA_NOTE}</p>
        <p className="text-sm text-text-secondary mt-3">
          What a database-driven comparison looks like:{" "}
          <Link href="/compare/phones" className="text-primary hover:underline">
            Phone Comparison
          </Link>
          . Browse every published record on the{" "}
          <Link href="/products" className="text-primary hover:underline">
            product database
          </Link>
          , or read how we decide what to publish on the{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            methodology page
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Related Tools and Comparisons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hub.related.map((item) => (
            <Link
              key={`${hub.slug}-${item.href}-${item.label}`}
              href={item.href}
              className="block p-5 bg-white border border-border rounded-xl hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-text">{item.label}</span>
              <span className="block text-sm text-text-secondary mt-1">{item.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      <CompareHubLinks highlight={`/compare/${hub.slug}`} />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl">
          {hub.faq.map((item) => (
            <div key={item.question} className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-text mb-2">{item.question}</h3>
              <p className="text-sm text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-5 bg-bg-secondary rounded-xl max-w-3xl">
        <h2 className="text-lg font-semibold text-text mb-2">Methodology</h2>
        <p className="text-sm text-text-secondary">
          Specification values in the tool above are entered by you and are not stored.
          Where CompareForge publishes a product record, every field carries a source and a
          verification date, and unverified fields are left empty rather than estimated. We
          do not run lab tests, do not assign scores, and do not publish rankings without a
          stated method.{" "}
          <Link href="/methodology" className="text-primary hover:underline">
            Read the full methodology →
          </Link>
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
