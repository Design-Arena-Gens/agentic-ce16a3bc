"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export function CartButton() {
  const count = useCartStore((state) => state.totalItems());

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
    >
      <span>Cart</span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-emerald-700">
        {count}
      </span>
    </Link>
  );
}
