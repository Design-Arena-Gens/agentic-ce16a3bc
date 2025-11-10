"use client";

import { useState } from "react";

interface ImageInput {
  file?: File;
  url?: string;
  alt: string;
}

interface ProductFormState {
  name: string;
  slug: string;
  category: string;
  price: string;
  salePrice: string;
  stock: string;
  description: string;
  materials: string;
  sizes: string;
  colors: string;
  featured: boolean;
}

const initialState: ProductFormState = {
  name: "",
  slug: "",
  category: "",
  price: "",
  salePrice: "",
  stock: "",
  description: "",
  materials: "",
  sizes: "",
  colors: "",
  featured: false,
};

import { useRouter } from "next/navigation";

export function AddProductForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState<ImageInput[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const uploads: ImageInput[] = [];
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      const result: string = await new Promise((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Invalid file reader result"));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      uploads.push({
        file,
        alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        url: result,
      });
    }
    setImages((prev) => [...prev, ...uploads]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const computedSlugRaw =
        form.slug ||
        form.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      const computedSlug =
        computedSlugRaw.length > 0 ? computedSlugRaw : `piece-${Date.now()}`;

      const payload = {
        name: form.name,
        slug: computedSlug,
        category: form.category,
        price: Number(form.price),
        salePrice: form.salePrice ? Number(form.salePrice) : null,
        stock: Number(form.stock),
        description: form.description,
        materials: form.materials.split(",").map((item) => item.trim()).filter(Boolean),
        sizes: form.sizes
          ? form.sizes.split(",").map((item) => item.trim()).filter(Boolean)
          : [],
        colors: form.colors
          ? form.colors.split(",").map((item) => item.trim()).filter(Boolean)
          : [],
        featured: form.featured,
        images: images.map((image, index) => {
          if (image.file) {
            return {
              file: image.url,
              filename: `${computedSlug}-${index}`,
              alt: image.alt,
            };
          }
          return {
            url: image.url!,
            alt: image.alt,
          };
        }),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Failed to create product");
      }

      setStatus("success");
      setForm(initialState);
      setImages([]);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to create product");
    }
  };

  const disabled =
    status === "loading" ||
    !form.name ||
    !form.category ||
    !form.price ||
    !form.description ||
    !images.length;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Add new product</h2>
        <p className="mt-2 text-sm text-slate-500">
          Upload imagery to Cloudinary and sync details with MongoDB in a single submission.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {(
          [
            ["name", "Product name"],
            ["slug", "Slug (optional)"],
            ["category", "Category"],
            ["price", "Price"],
            ["salePrice", "Sale price (optional)"],
            ["stock", "Stock"],
          ] as const
        ).map(([field, label]) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {label}
            </label>
            <input
              value={form[field]}
              onChange={(event) => updateField(field, event.target.value)}
              className="rounded-full border border-emerald-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400"
              placeholder={label}
            />
          </div>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {(
          [
            ["materials", "Materials (comma separated)"],
            ["sizes", "Sizes (comma separated)"],
            ["colors", "Finishes (comma separated)"],
          ] as const
        ).map(([field, label]) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {label}
            </label>
            <input
              value={form[field]}
              onChange={(event) => updateField(field, event.target.value)}
              className="rounded-full border border-emerald-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400"
              placeholder={label}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="min-h-[120px] rounded-3xl border border-emerald-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400"
          placeholder="Detail craftsmanship, inspiration, and notable features."
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          id="featured"
          type="checkbox"
          checked={form.featured}
          onChange={(event) => updateField("featured", event.target.checked)}
          className="size-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="featured" className="text-sm font-semibold text-emerald-700">
          Feature this product
        </label>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          Upload images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="text-sm text-slate-600"
        />
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="aspect-square rounded-2xl border border-emerald-100 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
                <input
                  value={image.alt}
                  onChange={(event) =>
                    setImages((prev) => {
                      const copy = [...prev];
                      copy[index] = {
                        ...copy[index],
                        alt: event.target.value,
                      };
                      return copy;
                    })
                  }
                  className="w-full rounded-full border border-emerald-200 px-3 py-2 text-xs"
                  placeholder="Alt text"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {status === "success" && (
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
          Product created successfully.
        </div>
      )}
      {status === "error" && error && (
        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-200"
      >
        {status === "loading" ? "Publishing..." : "Create product"}
      </button>
    </form>
  );
}
