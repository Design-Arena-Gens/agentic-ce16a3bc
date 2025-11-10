export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-emerald-700">Luminous Gems</h3>
            <p className="mt-3 text-sm text-slate-600">
              Crafted with passion, designed with elegance. Discover timeless jewelry pieces for every occasion.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Customer Service
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Shipping &amp; Returns</li>
              <li>Care Instructions</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Visit Us
            </h4>
            <p className="mt-3 text-sm text-slate-600">
              1289 Artisan Avenue
              <br />
              New York, NY 10001
              <br />
              +1 (212) 555-0198
            </p>
          </div>
        </div>
        <p className="mt-10 text-xs text-slate-500">
          © {new Date().getFullYear()} Luminous Gems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
