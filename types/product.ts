interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Image {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface Description {
  // Ajusta según la estructura real de tu descripción
  type: string;
  content: string;
}

interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: Description[];
  priceClient: number;
  priceVet: number;
  stock: number;
  weight: number;
  rating: number;
  condition: "active" | "inactive";
  features: Record<string, unknown> | null;
  review: Record<string, unknown> | null;
  image: Image[];
  brand: Brand;
  category: Category;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: Image;
  slug: string;
  stock: number;
  rating: number;
  brand: Brand;
  category: Category;
}

export type { Brand, Category, Image, Product, Description, ProductCardProps };
