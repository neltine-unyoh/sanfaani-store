export type ProductCondition =
  | "New"
  | "Refurbished"
  | "Used";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Laptops" | "Phones" | "Tablets" | "Accessories";
  condition: ProductCondition;
  price: number;
  currency: "XAF";
  imageLabel: string;
  shortDescription: string;
  stockStatus: "In stock" | "Limited" | "Unavailable";
  warranty: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "premium-laptop",
    name: "Premium Laptop",
    brand: "Sanfaani",
    category: "Laptops",
    condition: "Refurbished",
    price: 185000,
    currency: "XAF",
    imageLabel: "LAPTOP",
    shortDescription:
      "A reliable laptop for work, study, and everyday productivity.",
    stockStatus: "In stock",
    warranty: "Warranty available",
    featured: true,
  },
  {
    id: "everyday-smartphone",
    name: "Everyday Smartphone",
    brand: "Sanfaani",
    category: "Phones",
    condition: "New",
    price: 125000,
    currency: "XAF",
    imageLabel: "PHONE",
    shortDescription:
      "A practical smartphone for communication and everyday use.",
    stockStatus: "In stock",
    warranty: "Warranty available",
    featured: true,
  },
  {
    id: "productivity-tablet",
    name: "Productivity Tablet",
    brand: "Sanfaani",
    category: "Tablets",
    condition: "New",
    price: 165000,
    currency: "XAF",
    imageLabel: "TABLET",
    shortDescription:
      "A portable device for learning, productivity, and entertainment.",
    stockStatus: "Limited",
    warranty: "Warranty available",
    featured: true,
  },
  {
    id: "work-laptop",
    name: "Work Laptop",
    brand: "Sanfaani",
    category: "Laptops",
    condition: "Used",
    price: 145000,
    currency: "XAF",
    imageLabel: "LAPTOP",
    shortDescription:
      "A practical option for office work, browsing, and study.",
    stockStatus: "In stock",
    warranty: "Warranty available",
    featured: false,
  },
  {
    id: "performance-smartphone",
    name: "Performance Smartphone",
    brand: "Sanfaani",
    category: "Phones",
    condition: "Refurbished",
    price: 210000,
    currency: "XAF",
    imageLabel: "PHONE",
    shortDescription:
      "A higher-performance smartphone for demanding everyday use.",
    stockStatus: "Limited",
    warranty: "Warranty available",
    featured: false,
  },
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    brand: "Sanfaani",
    category: "Accessories",
    condition: "New",
    price: 45000,
    currency: "XAF",
    imageLabel: "AUDIO",
    shortDescription:
      "Wireless audio for work, travel, and entertainment.",
    stockStatus: "In stock",
    warranty: "Warranty available",
    featured: false,
  },
];

export const featuredProducts = products.filter(
  (product) => product.featured
);