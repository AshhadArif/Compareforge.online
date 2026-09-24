import { Smartphone } from "@/data/types";

export interface ProductSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  brand: { "@type": string; name: string };
  offers?: {
    "@type": string;
    priceCurrency: string;
    price: string;
    availability: string;
  };
  url: string;
}

export function generateProductSchema(product: Smartphone): ProductSchema {
  const schema: ProductSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    description: product.summary,
    brand: { "@type": "Brand", name: product.brand },
    url: `https://compareforge.online/products/${product.slug}`,
  };
  if (product.pricing.msrp !== null) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: product.pricing.currency,
      price: String(product.pricing.msrp),
      availability:
        product.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
    };
  }
  return schema;
}

export function generateBreadcrumbSchema(
  items: { name: string; url?: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: `https://compareforge.online${item.url}` } : {}),
    })),
  };
}

export function generateFAQSchema(
  faq: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function generateArticleSchema(input: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `https://compareforge.online${input.url}`,
    dateModified: input.dateModified,
    publisher: {
      "@type": "Organization",
      name: "CompareForge",
      url: "https://compareforge.online",
    },
  };
}

export function generateItemListSchema(
  items: { name: string; url: string }[],
  name: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `https://compareforge.online${item.url}`,
    })),
  };
}
