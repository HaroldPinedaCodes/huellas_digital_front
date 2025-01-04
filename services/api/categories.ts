import { getStrapiURL } from "@/lib/utils";

export async function getCategories() {
  const res = await fetch(getStrapiURL("/api/categories?populate=*"));
  const data = await res.json();
  return data.data;
}
