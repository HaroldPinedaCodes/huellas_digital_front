import apiClient from "../apiClient";
import { StrapiResponse, StrapiSingleResponse } from "@/types/api";

export abstract class BaseRepository<T> {
  constructor(protected readonly endpoint: string) {}

  async getAll(params = {}): Promise<T[]> {
    const { data } = await apiClient.get<StrapiResponse<T>>(
      `/api/${this.endpoint}`,
      { params: { populate: "*", ...params } }
    );
    return data.data.map(
      (item) =>
        ({
          id: item.id,
          ...item.attributes,
        } as unknown as T)
    );
  }

  async getById(id: number): Promise<T> {
    const { data } = await apiClient.get<StrapiSingleResponse<T>>(
      `/api/${this.endpoint}/${id}`,
      { params: { populate: "*" } }
    );
    return {
      id: data.data.id,
      ...data.data.attributes,
    } as unknown as T;
  }

  async getBySlug(slug: string): Promise<T> {
    const { data } = await apiClient.get<StrapiResponse<T>>(
      `/api/${this.endpoint}`,
      {
        params: {
          "filters[slug][$eq]": slug,
          populate: "*",
        },
      }
    );
    const item = data.data[0];
    return {
      id: item.id,
      ...item.attributes,
    } as unknown as T;
  }
}
