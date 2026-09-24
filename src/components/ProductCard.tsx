import Link from "next/link";
import { Smartphone } from "@/data/types";
import { formatShortDate } from "@/lib/seo";

interface ProductCardProps {
  product: Smartphone;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-3">
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
      <h3 className="text-lg font-semibold text-text mb-1">
        <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
          {product.fullName}
        </Link>
      </h3>
      <p className="text-sm text-text-secondary mb-3 line-clamp-2">{product.summary}</p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-4">
        <div>
          <dt className="text-xs text-text-light">Display</dt>
          <dd className="text-text-secondary">
            {product.display.size}&quot; {product.display.panelType}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-text-light">Chipset</dt>
          <dd className="text-text-secondary">{product.performance.chipset}</dd>
        </div>
        <div>
          <dt className="text-xs text-text-light">Battery</dt>
          <dd className="text-text-secondary">
            {product.battery.capacity?.toLocaleString()} mAh
          </dd>
        </div>
        <div>
          <dt className="text-xs text-text-light">Camera</dt>
          <dd className="text-text-secondary">{product.camera.main.mp} MP</dd>
        </div>
      </dl>
      <div className="flex items-center justify-between pt-3 border-t border-border-light">
        <span className="font-semibold text-text">
          {product.pricing.msrp ? `From $${product.pricing.msrp.toLocaleString()}` : "TBA"}
        </span>
        <span className="text-xs text-text-light">
          {formatShortDate(product.releaseDate)}
        </span>
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="mt-3 block text-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
      >
        View Details →
      </Link>
    </article>
  );
}
