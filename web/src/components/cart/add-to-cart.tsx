"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";

interface AddToCartProps {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
}: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const disabled = stock === 0;

  const handleAdd = () => {
    addItem({
      productId,
      name,
      price,
      image,
      quantity,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-emerald-200 bg-white">
        <button
          type="button"
          className="h-10 w-10 text-lg font-semibold text-emerald-700 hover:bg-emerald-50"
          onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
          disabled={disabled}
        >
          -
        </button>
        <span className="w-10 text-center text-sm font-semibold text-emerald-700">
          {quantity}
        </span>
        <button
          type="button"
          className="h-10 w-10 text-lg font-semibold text-emerald-700 hover:bg-emerald-50"
          onClick={() => setQuantity((qty) => Math.min(stock, qty + 1))}
          disabled={disabled || quantity >= stock}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-200"
      >
        {disabled ? "Out of stock" : "Add to cart"}
      </button>
    </div>
  );
}
