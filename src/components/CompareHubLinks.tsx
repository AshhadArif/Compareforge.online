import Link from "next/link";

export const COMPARE_HUBS: {
  href: string;
  label: string;
  blurb: string;
}[] = [
  {
    href: "/compare/phones",
    label: "Phone Comparison",
    blurb: "Compare any two phones from our verified database.",
  },
  {
    href: "/compare/laptops",
    label: "Laptop Comparison",
    blurb: "Put two laptops' specifications side by side.",
  },
  {
    href: "/compare/tablets",
    label: "Tablet Comparison",
    blurb: "Compare tablet displays, chips, storage and size.",
  },
  {
    href: "/compare/monitors",
    label: "Monitor Comparison",
    blurb: "Compare size, resolution, refresh rate and panel type.",
  },
  {
    href: "/compare/cameras",
    label: "Camera Comparison",
    blurb: "Compare sensor, resolution, video and weight.",
  },
  {
    href: "/compare/headphones",
    label: "Headphone Comparison",
    blurb: "Compare driver, connectivity, ANC and battery life.",
  },
];

export default function CompareHubLinks({
  title = "Compare Products by Category",
  highlight,
}: {
  title?: string;
  highlight?: string;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-text mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPARE_HUBS.map((hub) => {
          const active = hub.href === highlight;
          return (
            <Link
              key={hub.href}
              href={hub.href}
              className={`block p-5 rounded-xl border transition-shadow hover:shadow-md ${
                active
                  ? "border-primary bg-primary-light"
                  : "bg-white border-border"
              }`}
            >
              <span className="font-semibold text-text">{hub.label}</span>
              <span className="block text-sm text-text-secondary mt-1">
                {hub.blurb}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
