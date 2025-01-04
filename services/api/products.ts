import { getStrapiURL } from "@/lib/utils";

export async function getAllProducts() {
  const res = await fetch(getStrapiURL("/api/products?populate=*"));
  const data = await res.json();
  return data.data;
}
