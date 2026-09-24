import Link from "next/link";
import { getRelatedTools } from "@/lib/tools";

interface RelatedToolsProps {
  currentToolId: string;
}

const typeLabel: Record<string, string> = {
  compare: "Compare",
  decide: "Decide",
  match: "Match",
  calculate: "Calculate",
};

export default function RelatedTools({ currentToolId }: RelatedToolsProps) {
  const related = getRelatedTools(currentToolId);
  if (related.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-text mb-4">Related Tools</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.tool_id}
            href={tool.route.replace(/\/$/, "")}
            className="block p-5 bg-white border border-border rounded-xl hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-primary">
              {typeLabel[tool.type] ?? tool.type}
            </span>
            <span className="block font-semibold text-text mt-1">{tool.name}</span>
            <span className="block text-sm text-text-secondary mt-1">{tool.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
