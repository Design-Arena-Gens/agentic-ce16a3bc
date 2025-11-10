import "dotenv/config";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";

async function seed() {
  await connectToDatabase();

  const products = [
    {
      name: "Celestia Diamond Ring",
      slug: "celestia-diamond-ring",
      category: "Rings",
      price: 1450,
      salePrice: 1290,
      stock: 12,
      description:
        "A brilliant-cut diamond halo set in recycled 18k gold, inspired by the orbit of celestial bodies.",
      materials: ["18k recycled gold", "0.8ct conflict-free diamond"],
      sizes: ["5", "6", "7", "8"],
      colors: ["Yellow Gold", "Platinum"],
      images: [
        {
          url: "https://res.cloudinary.com/demo/image/upload/v1723560000/jewelry/celestia-ring.jpg",
          alt: "Celestia Diamond Ring",
        },
      ],
      featured: true,
    },
    {
      name: "Luna Pearl Drop Earrings",
      slug: "luna-pearl-drop-earrings",
      category: "Earrings",
      price: 420,
      stock: 24,
      description:
        "Hand-selected freshwater pearls suspended from sculpted silver arcs, capturing the glow of moonlight.",
      materials: ["Sterling silver", "Freshwater pearls"],
      colors: ["Polished Silver"],
      images: [
        {
          url: "https://res.cloudinary.com/demo/image/upload/v1723560000/jewelry/luna-earrings.jpg",
          alt: "Luna Pearl Drop Earrings",
        },
      ],
      featured: true,
    },
    {
      name: "Aurora Sapphire Necklace",
      slug: "aurora-sapphire-necklace",
      category: "Necklaces",
      price: 980,
      stock: 8,
      description:
        "A cascade of ethically sourced sapphires in gradient hues that echo the northern lights.",
      materials: ["14k recycled gold", "Sapphire"],
      images: [
        {
          url: "https://res.cloudinary.com/demo/image/upload/v1723560000/jewelry/aurora-necklace.jpg",
          alt: "Aurora Sapphire Necklace",
        },
      ],
      featured: true,
    },
    {
      name: "Seren Quartz Bracelet",
      slug: "seren-quartz-bracelet",
      category: "Bracelets",
      price: 260,
      stock: 35,
      description:
        "Faceted rose quartz gemstones hand-strung with brushed gold spacers for everyday radiance.",
      materials: ["14k gold vermeil", "Rose quartz"],
      images: [
        {
          url: "https://res.cloudinary.com/demo/image/upload/v1723560000/jewelry/seren-bracelet.jpg",
          alt: "Seren Quartz Bracelet",
        },
      ],
      featured: false,
    },
  ];

  await ProductModel.deleteMany({});
  await ProductModel.insertMany(products);

  console.log("Database seeded with sample jewelry products.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
