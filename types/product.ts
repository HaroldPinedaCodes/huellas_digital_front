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

// interface Product {
//   id: number;
//   documentId: string;
//   name: string;
//   slug: string;
//   description: Description[];
//   priceClient: number;
//   priceVet: number;
//   stock: number;
//   weight: number;
//   rating: number;
//   condition: "active" | "inactive";
//   features: Record<string, unknown> | null;
//   review: Record<string, unknown> | null;
//   image: Image[];
//   brand: Brand;
//   category: Category;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

export interface Product {
  id: number;
  name: string;
  slug: string;
  priceClient: number;
  priceVet: number;
  stock: number;
  image: {
    id: number;
    url: string;
    alternativeText: string | null;
  }[];
  brand: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  rating: number;
}

interface ProductImage {
  id: number;
  url: string;
  alternativeText: string | null;
}

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  images?: ProductImage[];
  slug: string;
  rating?: number;
  stock?: number;
  brand?: string;
  isPriority?: boolean;
  category?: Category;
}

// interface ProductCardProps {
//   id: number;
//   name: string;
//   price: number;
//   image: Image;
//   slug: string;
//   stock: number;
//   rating: number;
//   brand: Brand;
//   category: Category;
// }

export interface Description {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: Description[];
  priceClient: number;
  priceVet: number;
  stock: number;
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  };
  images: {
    id: number;
    url: string;
    alternativeText: string | null;
  }[];
  features: string[] | null;
  weight: number;
  rating: number;
}

export type { Brand, Category, Image };
