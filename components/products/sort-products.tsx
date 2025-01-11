import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortProductsProps {
  currentSort?: string;
}

export function SortProducts({ currentSort = "newest" }: SortProductsProps) {
  return (
    <Select value={currentSort}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordenar por</SelectLabel>
          <SelectItem value="newest">Más recientes</SelectItem>
          <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
          <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
          <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
          <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
          <SelectItem value="rating-desc">Mejor valorados</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
