"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@/lib/utils";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  notes: string;
}

const initialForm: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  notes: "",
};

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear, totalItems, totalPrice } =
    useCartStore();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckout = async () => {
    setStatus("loading");
    setError(null);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            country: form.country,
            postalCode: form.postalCode,
          },
          notes: form.notes,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? "Failed to place order");
      }

      setStatus("success");
      clear();
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to place order");
    }
  };

  const isCheckoutDisabled =
    !items.length ||
    !form.name ||
    !form.email ||
    !form.address ||
    !form.city ||
    !form.country ||
    !form.postalCode ||
    status === "loading";

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Your cart
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              {items.length ? "Review and complete your order" : "Your cart is empty"}
            </h1>
            {items.length > 0 && (
              <p className="mt-3 text-sm text-slate-600">
                {totalItems()} items · {formatCurrency(totalPrice())}
              </p>
            )}
          </div>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {items.length ? (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 md:flex-row md:items-center"
                >
                  <div
                    className="h-40 w-full rounded-2xl bg-cover bg-center md:w-36"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-emerald-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-emerald-600">
                          {formatCurrency(item.price)} ·{" "}
                          <span className="text-emerald-500">
                            Qty {item.quantity}
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="h-9 w-9 rounded-full border border-emerald-200 text-lg font-semibold text-emerald-600 hover:bg-emerald-100"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-emerald-700">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="h-9 w-9 rounded-full border border-emerald-200 text-lg font-semibold text-emerald-600 hover:bg-emerald-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-12 text-center">
                <p className="text-lg font-semibold text-emerald-900">
                  Your cart is empty
                </p>
                <p className="mt-2 text-sm text-emerald-700">
                  Explore our latest arrivals and add pieces you love.
                </p>
                <Link
                  href="/products"
                  className="mt-5 inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Browse collections
                </Link>
              </div>
            )}
          </div>
          <div className="space-y-6 rounded-3xl border border-emerald-100 bg-emerald-900 p-10 text-white">
            <div>
              <h2 className="text-xl font-semibold">Delivery details</h2>
              <p className="mt-2 text-sm text-emerald-100">
                Orders ship within 2 business days. Complimentary insured shipping worldwide.
              </p>
            </div>
            <div className="space-y-4">
              {(
                [
                  ["name", "Full name"],
                  ["email", "Email address"],
                  ["phone", "Phone number"],
                  ["address", "Street address"],
                  ["city", "City"],
                  ["country", "Country"],
                  ["postalCode", "Postal code"],
                ] as Array<[keyof CheckoutForm, string]>
              ).map(([field, label]) => (
                <div key={field} className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                    {label}
                  </label>
                  <input
                    value={form[field]}
                    onChange={(event) =>
                      handleFormChange(field, event.target.value)
                    }
                    className="rounded-full border border-emerald-500/40 bg-emerald-900/30 px-4 py-3 text-sm outline-none transition focus:border-emerald-200"
                    placeholder={label}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                  Gift note / instructions
                </label>
                <textarea
                  value={form.notes}
                  onChange={(event) => handleFormChange("notes", event.target.value)}
                  className="min-h-[100px] rounded-3xl border border-emerald-500/40 bg-emerald-900/30 px-4 py-3 text-sm outline-none transition focus:border-emerald-200"
                  placeholder="Share engraving details, delivery preferences, or a gift message."
                />
              </div>
            </div>
            <div className="space-y-2 border-t border-emerald-700 pt-6 text-sm">
              <div className="flex items-center justify-between text-emerald-100">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice())}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-100">
                <span>Complimentary shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-white">
                <span>Total</span>
                <span>{formatCurrency(totalPrice())}</span>
              </div>
            </div>
            {status === "success" && (
              <div className="rounded-2xl bg-emerald-800 px-4 py-3 text-sm text-emerald-100">
                Order received! Our concierge will confirm your purchase shortly.
              </div>
            )}
            {status === "error" && error && (
              <div className="rounded-2xl bg-rose-500/20 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckoutDisabled}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:bg-emerald-700/60 disabled:text-emerald-200"
            >
              {status === "loading" ? "Processing..." : "Place order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
