// components/common/breadcrumb.tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

// Mapeo de rutas para nombres más amigables
const routeMap: Record<string, string> = {
  productos: "Productos",
  categorias: "Categorías",
  carrito: "Carrito",
  cuenta: "Mi Cuenta",
  // Agrega más mapeos según necesites
};

export function BreadCrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((path) => path);

  const formatSegmentName = (segment: string) => {
    // Primero buscar en el mapeo
    if (routeMap[segment.toLowerCase()]) {
      return routeMap[segment.toLowerCase()];
    }

    // Si no está en el mapeo, formatear el string
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const segmentName = formatSegmentName(segment);

          return (
            <BreadcrumbItem key={href}>
              {!isLast ? (
                <BreadcrumbLink asChild>
                  <Link href={href}>{segmentName}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{segmentName}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
