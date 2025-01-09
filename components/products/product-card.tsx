"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store";
import type { Product } from "@/types/product";

interface ProductCardProps extends Product {
  isPriority?: boolean;
}

export function ProductCard({
  id,
  name,
  priceClient,
  image,
  slug,
  rating = 5,
  stock = 10,
  brand,
  isPriority = true,
}: ProductCardProps) {
  const { items, addItem } = useCart();

  const isOutOfStock = stock === 0;
  const isLowStock = stock <= 5 && stock > 0;
  const itemInCart = items.find((item) => item.product.id === id);

  const productData: Product = {
    id,
    name,
    priceClient,
    rating,
    image,
    slug,
    stock,
    brand,
  };

  console.log(image);

  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <Link href={`/productos/${slug}`}>
          <div className="relative aspect-square">
            <Image
              src={image[0].url}
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
            {itemInCart && (
              <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                En carrito: {itemInCart.quantity}
              </span>
            )}
          </div>
        </Link>

        <div className="p-4">
          {brand && (
            <span className="text-xs text-muted-foreground">{brand.name}</span>
          )}

          <Link href={`/productos/${slug}`}>
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
            <p className="text-lg font-bold">${priceClient.toLocaleString()}</p>
            <Button
              onClick={() => addItem(productData)}
              disabled={isOutOfStock || !!itemInCart}
              variant="outline"
              size="sm"
            >
              {isOutOfStock ? "Agotado" : itemInCart ? "En carrito" : "Agregar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
