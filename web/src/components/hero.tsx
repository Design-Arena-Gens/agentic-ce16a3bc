import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600">
              New arrivals
            </p>
            <h1 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
              Fine jewelry for moments that deserve to shine
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Explore artisan-crafted pieces made with ethically sourced gemstones and precious metals.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Shop Collections
              </Link>
              <Link
                href="#trending"
                className="rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
              >
                View Featured
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-emerald-200/70 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-300/40 blur-3xl" />
            <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl">
              <div className="aspect-[3/4] bg-[url('https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1080&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="p-6">
                <p className="text-sm font-medium uppercase text-emerald-500">
                  Luna Collection
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  Moonstone Halo Necklace
                </p>
                <p className="mt-2 text-sm text-slate-600">$165.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
