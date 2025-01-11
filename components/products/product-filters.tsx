import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@radix-ui/react-slider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FilterProps {
  brands: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  maxPrice: number;
}

export function ProductFilters({ brands, categories, maxPrice }: FilterProps) {
  return (
    <div className="space-y-6">
      {/* Título de Filtros */}
      <h2 className="font-semibold">Filtros</h2>

      {/* Categorías con contador */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Checkbox id={`category-${category.id}`} />
                <label
                  className="ml-2 text-sm"
                  htmlFor={`category-${category.id}`}
                >
                  {category.name}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">()</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marcas con búsqueda */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Marcas</h3>
        <Input placeholder="Buscar marca..." className="mb-2" />
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id={`brand-${brand.id}`} />
                <label className="ml-2 text-sm" htmlFor={`brand-${brand.id}`}>
                  {brand.name}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">(8)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rango de precio */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Precio</h3>
        <div className="pt-2">
          <Slider
            defaultValue={[0, maxPrice]}
            max={maxPrice}
            step={1000}
            className="mt-6"
          />
          <div className="flex items-center justify-between mt-2">
            <Input type="number" placeholder="Min" className="w-20" />
            <span className="text-muted-foreground mx-2">-</span>
            <Input type="number" placeholder="Max" className="w-20" />
          </div>
        </div>
      </div>

      <Button className="w-full">Aplicar filtros</Button>
      <Button variant="outline" className="w-full">
        Limpiar filtros
      </Button>
    </div>
  );
}
