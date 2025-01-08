// components/products/product-info.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./quantity-selector";
import { Star } from "lucide-react";

interface Description {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

interface ProductInfoProps {
  product: {
    name: string;
    priceClient: number;
    priceVet?: number;
    stock: number;
    brand: {
      name: string;
    };
    rating: number;
    description: Description[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  // Función para renderizar la descripción
  const renderDescription = (description: Description[]) => {
    return description.map((block, index) => {
      if (block.children) {
        return (
          <p key={index} className="text-gray-600">
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-muted-foreground">por {product.brand.name}</p>
      </div>

      <div className="flex items-center gap-2">
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
        <span className="text-sm text-muted-foreground">
          ({product.rating} de 5)
        </span>
      </div>

      <div>
        <p className="text-3xl font-bold">
          ${product.priceClient.toLocaleString()}
        </p>
        {product.priceVet && (
          <p className="text-sm text-muted-foreground">
            Precio veterinario: ${product.priceVet.toLocaleString()}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={product.stock}
        />
        <Button
          className="flex-1"
          onClick={() => console.log("Adding to cart:", { product, quantity })}
          disabled={product.stock === 0}
        >
          Agregar al carrito
        </Button>
      </div>

      <div className="prose prose-sm">
        {renderDescription(product.description)}
      </div>
    </div>
  );
}
