"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  page: number;
  totalPages: number;
  perPage: number;
  total: number;
}

export function Pagination({
  page,
  totalPages,
  perPage,
  total,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generar array de páginas a mostrar
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row items-center justify-between mt-8">
      <div className="text-sm text-muted-foreground">
        {total} resultados - Página {page} de {totalPages}
      </div>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">Mostrar:</span>
          <Select
            defaultValue={perPage.toString()}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);
              params.set("per_page", value);
              params.delete("page");
              window.location.href = `${pathname}?${params.toString()}`;
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent>
              {[12, 24, 36, 48].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page <= 1}
            asChild
          >
            <Link href={createPageURL(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            {generatePages().map((pageNumber, i) => {
              if (pageNumber === "...") {
                return (
                  <Button
                    key={`ellipsis-${i}`}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                );
              }

              return (
                <Button
                  key={pageNumber}
                  variant={page === pageNumber ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  asChild
                >
                  <Link href={createPageURL(pageNumber)}>{pageNumber}</Link>
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page >= totalPages}
            asChild
          >
            <Link href={createPageURL(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
