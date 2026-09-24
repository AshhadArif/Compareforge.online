import { Suspense } from "react";
import ToolShell, { ToolContentSection } from "@/components/tools/ToolShell";
import GenericCalculator from "@/components/tools/GenericCalculator";
import { getToolById } from "@/lib/tools";
import { generateFAQSchema } from "@/lib/schema";

interface CalculatorToolPageProps {
  toolId: string;
  intro: string;
  sections: ToolContentSection[];
  methodology: string[];
  faq: { question: string; answer: string }[];
}

export default function CalculatorToolPage({
  toolId,
  intro,
  sections,
  methodology,
  faq,
}: CalculatorToolPageProps) {
  const tool = getToolById(toolId);
  if (!tool) return null;
  const faqSchema = generateFAQSchema(faq);

  return (
    <ToolShell
      tool={tool}
      intro={intro}
      sections={sections}
      methodology={methodology}
      faq={faq}
      faqSchema={faqSchema}
    >
      <Suspense fallback={null}>
        <GenericCalculator definitionId={toolId} />
      </Suspense>
    </ToolShell>
  );
}
