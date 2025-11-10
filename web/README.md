## Luminous Gems — Jewelry Commerce Experience

Modern jewelry storefront built with Next.js App Router, MongoDB, and Cloudinary.

### Features

- Rich landing page with featured collections, editorial storytelling, and dynamic categories
- Product catalog with category filters, detail pages, and related product recommendations
- Client-side cart powered by Zustand with persistent storage
- Checkout flow that captures customer details and submits orders to MongoDB
- Admin dashboard for publishing products and pushing imagery to Cloudinary
- Type-safe APIs with validation via Zod

### Tech Stack

- Next.js 16 (App Router, server actions, route handlers)
- MongoDB + Mongoose
- Cloudinary v2 SDK for asset uploads
- Tailwind CSS 4 (via `@import "tailwindcss"`)
- Zustand for cart state management

### Prerequisites

Create a `.env` file based on `.env.example` and provide values for:

```
MONGODB_URI=
MONGODB_DB=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_FOLDER=
```

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the storefront, `/admin` for the publishing console, and `/cart` to test the checkout experience.

### Seed Sample Data

Populate MongoDB with curated seed products:

```bash
npm run seed
```

### Production Build

```bash
npm run build
npm start
```

### Deployment

The project is optimized for Vercel. Ensure the required environment variables are configured within the Vercel dashboard (`MONGODB_URI`, `MONGODB_DB`, `CLOUDINARY_*`).
