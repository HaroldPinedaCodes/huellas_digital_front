"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FilterProps {
  brands: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  maxPrice: number;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  brands: number[];
  categories: number[];
  priceRange: [number, number];
  sort: string;
}

export function ProductFilters({
  brands,
  categories,
  maxPrice,
  onFilterChange,
}: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    priceRange: [0, maxPrice],
    sort: "newest",
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-64 space-y-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categorías</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => {
                      const newCategories = checked
                        ? [...filters.categories, category.id]
                        : filters.categories.filter((id) => id !== category.id);
                      handleFilterChange({ categories: newCategories });
                    }}
                  />
                  <label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Marcas</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={(checked) => {
                      const newBrands = checked
                        ? [...filters.brands, brand.id]
                        : filters.brands.filter((id) => id !== brand.id);
                      handleFilterChange({ brands: newBrands });
                    }}
                  />
                  <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={1000}
                onValueChange={(value) =>
                  handleFilterChange({ priceRange: value as [number, number] })
                }
              />
              <div className="flex justify-between text-sm">
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-2">
        <h3 className="font-medium">Ordenar por</h3>
        <select
          className="w-full rounded-md border p-2"
          value={filters.sort}
          onChange={(e) => handleFilterChange({ sort: e.target.value })}
        >
          <option value="newest">Más recientes</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setFilters({
            brands: [],
            categories: [],
            priceRange: [0, maxPrice],
            sort: "newest",
          });
        }}
      >
        Limpiar filtros
      </Button>
    </div>
  );
}
