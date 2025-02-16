"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store";
import type { Product } from "@/types/product";
import { ProductGuaranteeTag } from "@/components/products/product-guarantee-tag";

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
  weight,
  features,
  isPriority = true,
}: ProductCardProps) {
  const { items, addItem } = useCart();

  const isOutOfStock = stock === 0;
  const isLowStock = stock <= 5 && stock > 0;
  const itemInCart = items.find((item) => item.product.id === id);

  const productWeight = weight || null;

  const productData: Product = {
    id,
    name,
    priceClient,
    rating,
    image,
    slug,
    stock,
    brand,
    weight,
    features,
  };

  return (
    <div className="relative w-full">
      <Card className="group transition-all hover:shadow-lg h-[400px] flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Tags Container */}
          <div className="absolute top-2 left-2 right-2 z-10 flex justify-between">
            <div className="flex gap-2">
              {itemInCart && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                  En carrito: {itemInCart.quantity}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {isLowStock && (
                <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded">
                  ¡Últimas unidades!
                </span>
              )}
              {isOutOfStock && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Agotado
                </span>
              )}
              {features?.features?.feeding_guide && (
                <ProductGuaranteeTag guarantee={features.features.guarantee} />
              )}
            </div>
          </div>

          {/* Image Container - Maximized size */}
          <Link href={`/productos/${slug}`} className="block h-60 relative">
            <div className="h-full w-full flex items-center justify-center p-3">
              <Image
                src={image[0].url}
                alt={name}
                width={280}
                height={280}
                className="object-contain h-full w-auto transition-transform group-hover:scale-105"
                priority={isPriority}
              />
            </div>
          </Link>

          {/* Content Container */}
          <div className="px-3 pb-3 flex flex-col place-content-end flex-grow">
            {/* Brand */}
            {brand && (
              <span className="text-xs text-muted-foreground">
                {brand.name}
              </span>
            )}

            {/* Product Name with Weight */}
            <Link href={`/productos/${slug}`}>
              <div className="flex flex-col">
                <h3 className="font-medium text-black line-clamp-2 hover:text-primary transition-colors mt-0.5">
                  {name}
                </h3>
              </div>
            </Link>

            {/* Rating */}
            <div className="mt-1.5 flex justify-between items-center gap-2">
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
              {productWeight && (
                <span className="text-sm font-medium text-primary">
                  {productWeight}kg
                </span>
              )}
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-2 flex items-center justify-between">
              <p className="text-lg font-bold">
                ${priceClient.toLocaleString()}
              </p>
              <Button
                onClick={() => addItem(productData)}
                disabled={isOutOfStock || !!itemInCart}
                variant="ghost"
                className={`${
                  isOutOfStock || itemInCart
                    ? "cursor-not-allowed"
                    : "bg-primary-500 text-white hover:bg-primary-700"
                }`}
                size="sm"
              >
                {isOutOfStock
                  ? "Agotado"
                  : itemInCart
                  ? "En carrito"
                  : "Agregar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
