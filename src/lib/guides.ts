import { Guide } from "@/data/types";

import foldableGuide from "@/data/guides/foldable-phone-buying-guide-2026.json";
import aiGuide from "@/data/guides/ai-features-explained.json";
import compareSpecsGuide from "@/data/guides/how-to-compare-product-specifications.json";
import useCaseGuide from "@/data/guides/choosing-a-phone-by-use-case.json";
import compatibilityGuide from "@/data/guides/compatibility-checking-before-you-buy.json";
import specsExplainedGuide from "@/data/guides/specs-explained.json";
import percentageDiffGuide from "@/data/guides/how-to-calculate-percentage-difference.json";
import unitPricingGuide from "@/data/guides/unit-pricing-guide.json";
import dimensionsGuide from "@/data/guides/understanding-product-dimensions.json";
import subscriptionPlansGuide from "@/data/guides/how-to-compare-subscription-plans.json";
import decisionMatrixGuide from "@/data/guides/building-a-decision-matrix.json";
import repairReplaceGuide from "@/data/guides/repair-or-replace-factors.json";

export const guides: Guide[] = [
  foldableGuide as Guide,
  aiGuide as Guide,
  compareSpecsGuide as Guide,
  useCaseGuide as Guide,
  compatibilityGuide as Guide,
  specsExplainedGuide as Guide,
  percentageDiffGuide as Guide,
  unitPricingGuide as Guide,
  dimensionsGuide as Guide,
  subscriptionPlansGuide as Guide,
  decisionMatrixGuide as Guide,
  repairReplaceGuide as Guide,
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((g) => g.category === category);
}

export function getRelatedGuides(currentSlug: string, limit = 3): Guide[] {
  const current = getGuideBySlug(currentSlug);
  if (!current) return guides.slice(0, limit);
  const currentTags = new Set(current.tags);
  const scored = guides
    .filter((g) => g.slug !== currentSlug)
    .map((g) => {
      let score = g.category === current.category ? 2 : 0;
      for (const tag of g.tags) {
        if (currentTags.has(tag)) score += 1;
      }
      const sharedComparisons = g.relatedComparisonSlugs.filter((s) =>
        current.relatedComparisonSlugs.includes(s),
      ).length;
      score += sharedComparisons;
      return { guide: g, score };
    })
    .sort((a, b) => b.score - a.score || a.guide.title.localeCompare(b.guide.title));
  return scored.slice(0, limit).map((s) => s.guide);
}
