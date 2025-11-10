import { AddProductForm } from "@/components/admin/add-product-form";
import { ProductCard } from "@/components/product-card";
import { listProducts } from "@/lib/products";

export default async function AdminPage() {
  const products = await listProducts();

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Studio dashboard
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Manage your jewelry collection
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Upload high fidelity imagery to Cloudinary and sync product data to MongoDB without leaving the browser.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <AddProductForm />
          <div className="space-y-4">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Existing pieces
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {products.length
                  ? "Recently added jewelry displayed below."
                  : "No products yet. Create your first piece to get started."}
              </p>
            </div>
            {products.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
