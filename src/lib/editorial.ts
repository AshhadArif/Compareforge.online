/**
 * Editorial identity used for visible bylines and schema.org author fields.
 * Single source of truth so every page names the same person for the same role.
 */
export const EDITOR = {
  name: "Fahad",
  role: "Founder, editor and publisher",
  /** Human-readable role line for bylines. */
  bylineRole: "founder, editor and publisher of CompareForge",
  aboutUrl: "https://compareforge.online/about",
  email: "contact@compareforge.online",
} as const;

export const SITE = {
  name: "CompareForge",
  url: "https://compareforge.online",
  logo: "https://compareforge.online/og-image.png",
} as const;

/** schema.org Person for the editor — used in Article/WebPage author fields. */
export function editorPersonSchema() {
  return {
    "@type": "Person" as const,
    name: EDITOR.name,
    url: EDITOR.aboutUrl,
    jobTitle: "Founder, editor and publisher",
    worksFor: {
      "@type": "Organization" as const,
      name: SITE.name,
      url: SITE.url,
    },
  };
}

/** schema.org Organization for CompareForge — publisher of all content. */
export function organizationSchema() {
  return {
    "@type": "Organization" as const,
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject" as const,
      url: SITE.logo,
    },
    email: EDITOR.email,
    founder: editorPersonSchema(),
    member: [editorPersonSchema()],
  };
}

/** Adds author + publisher to an Article/WebPage-style schema object. */
export function withEditorial<T extends object>(schema: T): T & {
  author: ReturnType<typeof editorPersonSchema>;
  publisher: ReturnType<typeof organizationSchema>;
} {
  return {
    ...schema,
    author: editorPersonSchema(),
    publisher: organizationSchema(),
  };
}
