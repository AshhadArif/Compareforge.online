import Link from "next/link";

const footerSections = [
  {
    title: "Tools",
    links: [
      { href: "/tools", label: "All Tools" },
      { href: "/tools/product-comparison", label: "Compare Products" },
      { href: "/tools/product-finder", label: "Product Finder" },
      { href: "/tools/decision-matrix", label: "Decision Matrix" },
      { href: "/tools/percentage-difference-calculator", label: "Percentage Calculator" },
      { href: "/tools/subscription-audit-calculator", label: "Subscription Audit" },
      { href: "/tools/compatibility-checker", label: "Compatibility Checker" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/categories", label: "Categories" },
      { href: "/compare", label: "Comparisons" },
      { href: "/products", label: "Phone Database" },
      { href: "/guides", label: "Guides" },
      { href: "/methodology", label: "Methodology" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About CompareForge" },
      { href: "/contact", label: "Contact" },
      { href: "/report-an-error", label: "Report an Error" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-lg font-bold text-primary">
              CompareForge
            </Link>
            <p className="mt-2 text-sm text-text-secondary">
              19 free comparison, calculator and decision tools — with sourced data and
              published formulas.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-text uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-text-light text-center">
            &copy; {new Date().getFullYear()} CompareForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
