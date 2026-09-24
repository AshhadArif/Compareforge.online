import type { Metadata } from "next";
import { getToolById } from "@/lib/tools";

export function toolPageMetadata(toolId: string): Metadata {
  const tool = getToolById(toolId);
  if (!tool) return { title: "Tool not found" };
  const canonical = tool.route.replace(/\/$/, "");
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://compareforge.online${canonical}`,
      type: "website",
    },
  };
}
