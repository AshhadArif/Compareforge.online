import { ToolRegistryEntry, ToolStatus, ToolType, ToolDomain, tools } from "@/data/tools/registry";

export type { ToolRegistryEntry, ToolStatus, ToolType, ToolDomain };
export { tools };

export function getBuiltTools(): ToolRegistryEntry[] {
  return tools.filter((t) => t.status === "built");
}

export function getFeaturedTools(): ToolRegistryEntry[] {
  return getBuiltTools().filter((t) => t.featured);
}

export function getToolById(id: string): ToolRegistryEntry | undefined {
  return tools.find((t) => t.tool_id === id);
}

export function getToolByRoute(route: string): ToolRegistryEntry | undefined {
  const normalized = route.endsWith("/") ? route : `${route}/`;
  return tools.find((t) => t.route === normalized);
}

export function getRelatedTools(currentId: string): ToolRegistryEntry[] {
  const current = getToolById(currentId);
  if (!current) return [];
  return current.relatedTools
    .map((id) => getToolById(id))
    .filter((t): t is ToolRegistryEntry => t != null && t.status === "built");
}

export function getBuiltToolRoutes(): string[] {
  return getBuiltTools().map((t) => t.route.replace(/\/$/, ""));
}

export function getBuiltToolsByType(type: ToolType): ToolRegistryEntry[] {
  return getBuiltTools().filter((t) => t.type === type);
}

export function getBuiltToolsByDomain(domain: ToolDomain): ToolRegistryEntry[] {
  return getBuiltTools().filter((t) => t.domain === domain);
}

export const TOOL_TYPE_LABELS: Record<ToolType, string> = {
  compare: "Compare",
  calculate: "Calculate",
  match: "Match",
  decide: "Decide",
};

export const TOOL_TYPE_DESCRIPTIONS: Record<ToolType, string> = {
  compare: "Put two or more options side by side and see the differences that matter.",
  calculate: "Enter your numbers and get a real calculation with the working shown.",
  match: "Check whether something fits, works, or meets a requirement.",
  decide: "Weight what matters to you and get a transparent, adjustable recommendation.",
};

export function searchTools(query: string, list = getBuiltTools()): ToolRegistryEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.problem.toLowerCase().includes(q) ||
      t.searchKeywords.some((k) => k.toLowerCase().includes(q)) ||
      t.type.includes(q) ||
      t.domain.includes(q)
  );
}
