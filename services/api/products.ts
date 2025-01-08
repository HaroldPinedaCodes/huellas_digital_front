import { getStrapiURL } from "@/lib/utils";
import type { Product } from "@/types/product";

export async function getAllProducts() {
  const res = await fetch(getStrapiURL("/api/products?populate=*"));
  const data = await res.json();
  return data.data;
}

// getProductBySlug

export async function getProductBySlug(slug: string) {
  const res = await fetch(
    getStrapiURL(`/api/products?filters[slug][$eq]=${slug}&populate=*`)
  );
  const data = await res.json();
  return data.data[0];
}

export async function getRelatedProducts(
  categoryId: number,
  currentProductId: number
): Promise<Product[]> {
  const res = await fetch(
    getStrapiURL(
      `/api/products?filters[category][id][$eq]=${categoryId}&filters[id][$ne]=${currentProductId}&populate=*&pagination[limit]=4`
    )
  );
  const data = await res.json();
  return data.data;
}
