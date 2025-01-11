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

interface FilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  search?: string;
  page?: number;
}

export async function getFilteredProducts(params: FilterParams) {
  const queryParams = new URLSearchParams();

  // Configuración básica de paginación y populate
  queryParams.set("pagination[page]", (params.page || 1).toString());
  queryParams.set("pagination[pageSize]", "12");
  queryParams.set("populate", "*");

  // Filtros
  if (params.category) {
    queryParams.set("filters[category][slug][$eq]", params.category);
  }
  if (params.brand) {
    queryParams.set("filters[brand][slug][$eq]", params.brand);
  }
  if (params.minPrice) {
    queryParams.set("filters[priceClient][$gte]", params.minPrice.toString());
  }
  if (params.maxPrice) {
    queryParams.set("filters[priceClient][$lte]", params.maxPrice.toString());
  }
  if (params.search) {
    queryParams.set("filters[name][$containsi]", params.search);
  }
  if (params.sort) {
    switch (params.sort) {
      case "price-asc":
        queryParams.set("sort[0]", "priceClient:asc");
        break;
      case "price-desc":
        queryParams.set("sort[0]", "priceClient:desc");
        break;
      case "name-asc":
        queryParams.set("sort[0]", "name:asc");
        break;
      case "name-desc":
        queryParams.set("sort[0]", "name:desc");
        break;
      default:
        queryParams.set("sort[0]", "createdAt:desc");
    }
  }

  // Construir URL completa usando getStrapiURL
  const url = `${getStrapiURL("/api/products")}?${queryParams}`;

  console.log("Fetching URL:", url); // Debug

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 12,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}
