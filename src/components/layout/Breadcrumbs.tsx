import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const base = "https://compareforge.online";

  // Google requires each entry in itemListElement to be an explicit ListItem;
  // `item` may be omitted on the final crumb (Google then uses the page URL).
  const itemListElement = [
    { "@type": "ListItem" as const, position: 1, name: "Home", item: `${base}/` },
    ...items.map((item, i) => ({
      "@type": "ListItem" as const,
      position: i + 2,
      name: item.label,
      ...(item.href
        ? { item: `${base}${item.href}` }
        : i === items.length - 1
          ? {}
          : { item: `${base}/` }),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-text-secondary">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <span className="text-text-light">›</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-text font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
      {itemListElement.length >= 2 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement,
            }),
          }}
        />
      )}
    </nav>
  );
}
