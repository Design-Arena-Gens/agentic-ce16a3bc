import mongoose, { Schema } from "mongoose";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product extends mongoose.Document {
  name: string;
  slug: string;
  category: string;
  price: number;
  salePrice?: number | null;
  stock: number;
  description: string;
  materials: string[];
  sizes?: string[];
  colors?: string[];
  images: ProductImage[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    materials: [{ type: String }],
    sizes: [{ type: String }],
    colors: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ProductModel =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);
