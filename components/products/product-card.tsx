// components/products/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ProductCardProps } from "@/types/product";

export function ProductCard({
  name,
  price,
  images,
  slug,
  rating = 5,
  stock = 10,
  brand,
  isPriority = true,
}: ProductCardProps) {
  console.log("Images prop:", images);
  // Obtener la URL de la primera imagen o usar placeholder
  const imageUrl =
    images && images.length > 0 ? images[0].url : "/placeholder-product.png";

  console.log("Image URL:", imageUrl); // Debug

  const isOutOfStock = stock === 0;
  const isLowStock = stock <= 5 && stock > 0;

  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <Link href={`/productos/${slug}`}>
          <div className="relative">
            <Image
              src={imageUrl}
              alt={name}
              width={500}
              height={500}
              className="object-contain p-4 transition-transform group-hover:scale-105"
              priority={isPriority}
            />
            {isLowStock && (
              <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                ¡Últimas unidades!
              </span>
            )}
            {isOutOfStock && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Agotado
              </span>
            )}
          </div>
        </Link>

        <div className="p-4">
          {brand && (
            <span className="text-xs text-muted-foreground">{brand}</span>
          )}

          <Link href={`/products/${slug}`}>
            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold">${price.toLocaleString()}</p>
            <Button
              variant="outline"
              size="sm"
              disabled={isOutOfStock}
              // onClick={(e) => {
              //   e.preventDefault();
              // }}
            >
              {isOutOfStock ? "Agotado" : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
