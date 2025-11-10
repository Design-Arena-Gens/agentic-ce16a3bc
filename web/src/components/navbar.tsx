"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartButton } from "./cart/cart-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collections" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-emerald-700">
            Luminous Gems
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-emerald-600 ${
                pathname === link.href ? "text-emerald-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 md:inline-flex"
          >
            Admin
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
