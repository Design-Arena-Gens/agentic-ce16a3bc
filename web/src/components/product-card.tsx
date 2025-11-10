import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number | null;
    images: { url: string; alt: string }[];
    category: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  const imageUrl =
    image?.url ??
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1080&auto=format&fit=crop";
  const displayPrice = product.salePrice ?? product.price;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="relative aspect-[3/4] bg-slate-100 transition group-hover:scale-[1.02]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label={image?.alt ?? product.name}
      />
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-500">
          {product.category}
        </p>
        <p className="mt-2 text-lg font-semibold text-slate-900">
          {product.name}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-semibold text-emerald-600">
            {formatCurrency(displayPrice)}
          </span>
          {product.salePrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
