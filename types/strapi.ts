export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: Array<{
    id: number;
    attributes: Omit<T, "id">;
  }>;
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: Omit<T, "id">;
  };
  meta: StrapiMeta;
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}
