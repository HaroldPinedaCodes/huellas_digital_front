import { Product } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

// export interface Product {
//   id: number;
//   name: string;
//   priceVet?: number;
//   priceClient: number;
//   quantity?: number;
//   image: ProductImage[];
//   slug: string;
//   stock: number;
//   brand: ProductBrand;
//   rating?: number;
// }
