export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  slug: string;
  images: StrapiImage[];
  category: Category;
  animal: Animal;
  statusProduct: "active" | "out_of_stock";
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  image?: StrapiImage;
  parent?: Category;
}

export interface Animal {
  name: string;
  slug: string;
  image?: StrapiImage;
}

export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}
