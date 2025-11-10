import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">
        The page you were looking for has slipped away
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-600">
        We might have moved the content or the URL contains a typo. Discover our latest pieces instead.
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Return home
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
        >
          Shop collections
        </Link>
      </div>
    </div>
  );
}
