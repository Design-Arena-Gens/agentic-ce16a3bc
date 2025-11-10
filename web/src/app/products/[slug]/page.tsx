import { AddToCartButton } from "@/components/cart/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { listFeaturedProducts, getProductBySlug } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  props: ProductPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      images: product.images.map((image) => image.url),
    },
  };
}

export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = (await listFeaturedProducts(3)).filter(
    (item) => item.slug !== product.slug
  );

  const primaryImage = product.images[0];
  const price = product.salePrice ?? product.price;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <nav className="text-sm text-slate-500">
          <Link href="/products" className="hover:text-emerald-600">
            Collections
          </Link>{" "}
          /{" "}
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-emerald-600"
          >
            {product.category}
          </Link>{" "}
          / <span className="text-slate-700">{product.name}</span>
        </nav>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-emerald-100">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${primaryImage.url})`,
                }}
                aria-label={primaryImage.alt}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image) => (
                <div
                  key={image.url}
                  className="aspect-square overflow-hidden rounded-2xl border border-emerald-100 bg-slate-100"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-label={image.alt}
                />
              ))}
            </div>
          </div>
          <div className="space-y-8 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
                {product.category}
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                {product.name}
              </h1>
              <p className="mt-4 text-sm text-slate-600">{product.description}</p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-emerald-700">
                  {formatCurrency(price)}
                </span>
                {product.salePrice && (
                  <span className="text-sm font-medium text-slate-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-emerald-500">
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </p>
            </div>
            <AddToCartButton
              productId={product._id}
              name={product.name}
              price={price}
              image={primaryImage.url}
              stock={product.stock}
            />
            <div className="border-t border-emerald-100 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Materials &amp; details
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {product.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
                {product.sizes && product.sizes.length > 0 && (
                  <li>Available sizes: {product.sizes.join(", ")}</li>
                )}
                {product.colors && product.colors.length > 0 && (
                  <li>Finishes: {product.colors.join(", ")}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-20 border-t border-emerald-100 pt-12">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                You might also love
              </h3>
              <Link
                href="/products"
                className="text-sm font-semibold text-emerald-600"
              >
                Browse more
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
