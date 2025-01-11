import { Suspense } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { SearchBar } from "@/components/common/search-bar";
import { BreadCrumb } from "@/components/common/breadcrumb";
import { getFilteredProducts } from "@/services/api/products";
import { SortProducts } from "@/components/products/sort-products";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";
import { mockBrands } from "@/mocks/brands";
import { mockCategories } from "@/mocks/categories";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { Pagination } from "@/components/custom/pagination";

interface PageProps {
  searchParams: {
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    q?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const { data: products, meta } = await getFilteredProducts({
    category: searchParams.category,
    brand: searchParams.brand,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sort: searchParams.sort,
    search: searchParams.q,
    page: page,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadCrumb />

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <ProductFilters
            brands={mockBrands}
            categories={mockCategories}
            maxPrice={200000}
          />
        </aside>

        <main className="flex-1">
          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Productos</h1>
              <p className="text-sm text-muted-foreground">
                {meta.pagination.total} productos encontrados
              </p>
            </div>

            <SearchBar placeholder="Buscar productos..." />

            <div className="flex items-center justify-between">
              <SortProducts currentSort={searchParams.sort} />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Vista de grid"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Vista de lista"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* <SortProducts currentSort={searchParams.sort} /> */}
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={products} />
            <Pagination
              page={page}
              totalPages={meta.pagination.pageCount}
              perPage={meta.pagination.pageSize}
              total={meta.pagination.total}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
