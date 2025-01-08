"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { ProductDetail } from "@/types/product";
import { Star } from "lucide-react";

export function ProductTabs({ product }: { product: ProductDetail }) {
  return (
    <Tabs defaultValue="description" className="mt-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Descripción</TabsTrigger>
        <TabsTrigger value="specs">Especificaciones</TabsTrigger>
        <TabsTrigger value="reviews">Reseñas</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          {product.description.map((block, index) => (
            <p key={index}>
              {block.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Marca</TableCell>
              <TableCell>{product.brand.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Categoría</TableCell>
              <TableCell>{product.category.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Peso</TableCell>
              <TableCell>{product.weight} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Stock</TableCell>
              <TableCell>{product.stock} unidades</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">
              {product.rating.toFixed(1)}
            </div>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Basado en reseñas verificadas
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default ProductTabs;
