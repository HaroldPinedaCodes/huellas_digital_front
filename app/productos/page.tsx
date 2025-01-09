"use client";

import { mockBrands } from "@/mocks/brands";
import { mockCategories } from "@/mocks/categories";
import { ProductFilters } from "@/components/common/product-filters";
import { SearchBar } from "@/components/common/search-bar";
import { ProductGrid } from "@/components/products/product-grid";

export default function ProductsPage({}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Usar datos simulados
  const brands = mockBrands;
  const categories = mockCategories;
  const maxPrice = 200000; // Precio máximo simulado

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mt-20">
        {/* Sidebar con filtros */}
        <aside className="w-full md:w-64">
          <ProductFilters
            brands={brands}
            categories={categories}
            maxPrice={maxPrice}
            onFilterChange={(filters) => {
              console.log("Filtros aplicados:", filters);
              // Aquí iría la lógica de filtrado
            }}
          />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1">
          <div className="mb-6">
            <SearchBar
              onSearch={(query) => {
                console.log("Búsqueda:", query);
                // Aquí iría la lógica de búsqueda
              }}
            />
          </div>
          <ProductGrid products={[]} /> {/* Ajustar según tus datos */}
        </main>
      </div>
    </div>
  );
}
