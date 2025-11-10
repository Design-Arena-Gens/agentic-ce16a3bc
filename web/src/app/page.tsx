import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { listCategories, listFeaturedProducts } from "@/lib/products";
import { chunkArray } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const [featured, categories] = await Promise.all([
    listFeaturedProducts(6),
    listCategories(),
  ]);

  const featuredRows = chunkArray(featured, 3);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Hero />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Discover
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Browse by category
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-semibold text-emerald-600"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                key={category}
                className="group rounded-3xl border border-emerald-100 bg-emerald-50/50 px-6 py-10 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                  Collection
                </p>
                <p className="mt-3 text-lg font-semibold text-emerald-900">
                  {category}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-600">
                  Explore pieces
                  <svg
                    className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section id="trending" className="bg-emerald-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Spotlight
              </p>
              <h2 className="text-3xl font-semibold">Featured treasures</h2>
            </div>
            <p className="max-w-xl text-sm text-emerald-100">
              Hand-selected highlights from our artisans featuring limited
              releases and customer favorites.
            </p>
          </div>
          <div className="mt-10 space-y-6">
            {featuredRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid gap-6 md:grid-cols-3"
              >
                {row.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Process
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Ethically sourced, masterfully crafted
              </h2>
              <p className="text-base text-slate-600">
                From the first sketch to the final polish, each piece is created
                by artisans using recycled gold and traceable gemstones. We
                believe in jewelry that respects both the wearer and the world.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Bespoke design",
                    description:
                      "Work with our designers to create custom heirloom pieces that tell your story.",
                  },
                  {
                    title: "Lifetime care",
                    description:
                      "Complimentary cleaning, resizing, and repairs to keep your treasures radiant.",
                  },
                ].map((feature) => (
                  <div key={feature.title}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50">
              <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1580&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="p-10">
                <h3 className="text-xl font-semibold text-emerald-900">
                  Craft workshop
                </h3>
                <p className="mt-3 text-sm text-emerald-700">
                  Step behind the scenes and experience the artistry inside our
                  Brooklyn atelier.
                </p>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-600"
                >
                  Learn more
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
