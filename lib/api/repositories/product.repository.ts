// lib/api/repositories/product.repository.ts
import { Product } from "@/types/model";
import { BaseRepository } from "./base.repository";
import { StrapiResponse } from "@/types/api";
import apiClient from "../apiClient";

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  async getByCategory(categorySlug: string): Promise<Product[]> {
    const { data } = await apiClient.get<StrapiResponse<Product>>(
      `/api/${this.endpoint}`,
      {
        params: {
          "filters[category][slug][$eq]": categorySlug,
          populate: "*",
        },
      }
    );
    return data.data.map(
      (item) =>
        ({
          id: item.id,
          ...item.attributes,
        } as Product)
    );
  }

  async getByAnimal(animalSlug: string): Promise<Product[]> {
    const { data } = await apiClient.get<StrapiResponse<Product>>(
      `/api/${this.endpoint}`,
      {
        params: {
          "filters[animal][slug][$eq]": animalSlug,
          populate: "*",
        },
      }
    );
    return data.data.map(
      (item) =>
        ({
          id: item.id,
          ...item.attributes,
        } as Product)
    );
  }
}
