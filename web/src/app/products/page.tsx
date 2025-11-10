import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { listCategories, listProducts } from "@/lib/products";

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    listProducts(),
    listCategories(),
  ]);

  const selectedCategory = typeof params.category === "string" ? params.category : undefined;
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Collections
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Jewelry curated for luminous moments
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Explore engagement rings, gemstone necklaces, and artisan-crafted bracelets finished with meticulous detail.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/products"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !selectedCategory
                  ? "bg-emerald-600 text-white"
                  : "border border-emerald-200 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              All pieces
            </Link>
            {categories.map((category) => {
              const active = category === selectedCategory;
              return (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-emerald-600 text-white"
                      : "border border-emerald-200 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>
        {filteredProducts.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-emerald-100 bg-emerald-50/80 p-12 text-center">
            <p className="text-lg font-semibold text-emerald-900">
              No pieces found in this collection
            </p>
            <p className="mt-2 text-sm text-emerald-700">
              Try exploring another category or check back soon for new arrivals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
