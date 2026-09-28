import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ComparisonCard from "@/components/ComparisonCard";
import { products, getProductBySlug } from "@/lib/products";
import { comparisons } from "@/lib/comparisons";
import { generateProductSEO, formatReleaseDate } from "@/lib/seo";
import { generateProductSchema } from "@/lib/schema";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  const seo = generateProductSEO(product);
  return {
    title: seo.title,
    description: seo.metaDescription,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: `${seo.title} | CompareForge`,
      description: seo.metaDescription,
      url: `https://compareforge.online${seo.canonical}`,
      type: "website",
      siteName: "CompareForge",
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${product.fullName} — specs on CompareForge`,
        },
      ],
    },
  };
}

function SpecRow({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  const display =
    value === null || value === undefined
      ? "—"
      : typeof value === "boolean"
        ? value
          ? "Yes"
          : "No"
        : String(value);
  return (
    <div className="flex justify-between py-2 border-b border-border-light last:border-b-0">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="text-sm text-text font-medium text-right">{display}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedComparisons = comparisons
    .filter((c) => c.productIds.includes(product.id))
    .slice(0, 4);

  const productSchema = generateProductSchema(product);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: product.brand, href: `/products?brand=${product.brand.toLowerCase()}` },
          { label: product.fullName },
        ]}
      />

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded-full">
              {product.brand}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                product.status === "available"
                  ? "bg-accent-light text-accent"
                  : product.status === "announced"
                    ? "bg-warning-light text-warning"
                    : "bg-bg-secondary text-text-light"
              }`}
            >
              {product.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text">{product.fullName}</h1>
          <p className="mt-2 text-text-secondary">{product.summary}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-text">
            {product.pricing.msrp ? `$${product.pricing.msrp.toLocaleString()}` : "TBA"}
          </div>
          <div className="text-sm text-text-light">
            Released {formatReleaseDate(product.releaseDate)}
          </div>
        </div>
      </div>

      {/* Storage variants */}
      {product.pricing.variants.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">Pricing</h2>
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-secondary">
                  <th className="text-left py-3 px-4 font-semibold text-text">Storage</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">RAM</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {product.pricing.variants.map((v, i) => (
                  <tr key={i} className="border-b border-border-light last:border-b-0">
                    <td className="py-3 px-4 text-text-secondary">{v.storage}</td>
                    <td className="py-3 px-4 text-text-secondary">{v.ram}</td>
                    <td className="py-3 px-4 text-text font-medium">
                      {v.price !== null ? `$${v.price.toLocaleString()}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-6">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Display</h3>
            <dl>
              <SpecRow label="Size" value={product.display.size ? `${product.display.size}"` : null} />
              <SpecRow label="Resolution" value={product.display.resolution} />
              <SpecRow label="Panel" value={product.display.panelType} />
              <SpecRow label="Refresh Rate" value={product.display.refreshRate ? `${product.display.refreshRate} Hz` : null} />
              <SpecRow label="Peak Brightness" value={product.display.peakBrightness ? `${product.display.peakBrightness.toLocaleString()} nits` : null} />
              <SpecRow label="HDR" value={product.display.hdr} />
              <SpecRow label="Protection" value={product.display.protection} />
            </dl>
          </div>

          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Performance</h3>
            <dl>
              <SpecRow label="Chipset" value={product.performance.chipset} />
              <SpecRow label="Fabrication" value={product.performance.fabrication} />
              <SpecRow label="CPU Cores" value={product.performance.cpuCores} />
              <SpecRow label="GPU" value={product.performance.gpuModel} />
              <SpecRow label="RAM" value={product.performance.ram ? `${product.performance.ram} GB` : null} />
              <SpecRow label="RAM Type" value={product.performance.ramType} />
            </dl>
          </div>

          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Camera</h3>
            <dl>
              <SpecRow label="Main" value={product.camera.main.mp ? `${product.camera.main.mp} MP` : null} />
              <SpecRow label="Main Aperture" value={product.camera.main.aperture} />
              <SpecRow label="Ultrawide" value={product.camera.ultrawide?.mp ? `${product.camera.ultrawide.mp} MP` : null} />
              <SpecRow label="Telephoto" value={product.camera.telephoto?.mp ? `${product.camera.telephoto.mp} MP` : null} />
              <SpecRow label="Optical Zoom" value={product.camera.telephoto?.opticalZoom ? `${product.camera.telephoto.opticalZoom}x` : null} />
              <SpecRow label="Front" value={product.camera.front?.mp ? `${product.camera.front.mp} MP` : null} />
              <SpecRow label="Max Video" value={product.camera.video ? `${product.camera.video.maxResolution} @ ${product.camera.video.maxFps}fps` : null} />
            </dl>
          </div>

          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Battery & Charging</h3>
            <dl>
              <SpecRow label="Capacity" value={product.battery.capacity ? `${product.battery.capacity.toLocaleString()} mAh` : null} />
              <SpecRow label="Type" value={product.battery.type} />
              <SpecRow label="Wired Charging" value={product.battery.wiredCharging ? `${product.battery.wiredCharging}W` : null} />
              <SpecRow label="Wireless Charging" value={product.battery.wirelessCharging ? `${product.battery.wirelessCharging}W` : null} />
              <SpecRow label="Reverse Wireless" value={product.battery.reverseWireless} />
            </dl>
          </div>

          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Design & Build</h3>
            <dl>
              <SpecRow label="Weight" value={product.design.weight ? `${product.design.weight} g` : null} />
              <SpecRow label="Frame" value={product.design.frameMaterial} />
              <SpecRow label="Back" value={product.design.backMaterial} />
              <SpecRow label="Water Resistance" value={product.design.waterResistance} />
              <SpecRow label="Colors" value={product.design.colors.join(", ")} />
            </dl>
          </div>

          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Software</h3>
            <dl>
              <SpecRow label="OS at Launch" value={product.software.osAtLaunch} />
              <SpecRow label="UI Skin" value={product.software.osSkin} />
              <SpecRow label="OS Updates" value={product.software.updateCommitment ? `${product.software.updateCommitment} years` : null} />
              <SpecRow label="Security Updates" value={product.software.securityCommitment ? `${product.software.securityCommitment} years` : null} />
              <SpecRow label="AI Features" value={product.software.aiFeatures.join(", ")} />
            </dl>
          </div>

          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Storage</h3>
            <dl>
              <SpecRow label="Options" value={product.storage.options.join(", ")} />
              <SpecRow label="Expandable" value={product.storage.expandable} />
              <SpecRow label="Type" value={product.storage.type} />
            </dl>
          </div>

          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-3">Connectivity</h3>
            <dl>
              <SpecRow label="5G" value={product.connectivity.fiveG} />
              <SpecRow label="Wi-Fi" value={product.connectivity.wifi} />
              <SpecRow label="Bluetooth" value={product.connectivity.bluetooth} />
              <SpecRow label="NFC" value={product.connectivity.nfc} />
              <SpecRow label="USB" value={product.connectivity.usb} />
              <SpecRow label="SIM" value={product.connectivity.simType} />
              <SpecRow label="Satellite" value={product.connectivity.satellite} />
            </dl>
          </div>
        </div>
      </section>

      {/* Sources */}
      {product.sources.length > 0 && (
        <section className="mb-12 p-5 bg-bg-secondary rounded-xl">
          <h2 className="text-lg font-semibold text-text mb-3">Sources</h2>
          <ul className="space-y-2">
            {product.sources.map((source, i) => (
              <li key={i} className="text-sm">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {source.siteName} — {source.field}
                </a>
                <span className="text-text-light ml-2">
                  (accessed {source.dateAccessed}, {source.confidence})
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-text-light mt-3">
            Last verified: {product.lastVerified}
          </p>
        </section>
      )}

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">
            Comparisons Featuring {product.model}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedComparisons.map((c) => (
              <ComparisonCard key={c.slug} comparison={c} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="p-6 bg-primary-light rounded-xl text-center">
        <h2 className="font-semibold text-text mb-2">Compare This Phone</h2>
        <p className="text-sm text-text-secondary mb-4">
          See how {product.model} stacks up against the competition.
        </p>
        <Link
          href="/compare"
          className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
        >
          Start a Comparison
        </Link>
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </div>
  );
}
