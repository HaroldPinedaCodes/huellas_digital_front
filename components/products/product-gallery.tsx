"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImage {
  id: number;
  url: string;
  alternativeText: string | null;
}

// Cambiamos el nombre de la prop para que coincida con la estructura del producto
export function ProductGallery({ image }: { image: ProductImage[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!image || image.length === 0) {
    return (
      <div className="relative bg-gray-100">
        <Image
          src="/no-image-placeholder.png"
          alt="Imagen no disponible"
          width={500}
          height={500}
          className="object-contain p-4"
          priority
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative">
        <Image
          src={image[selectedImage].url}
          alt={image[selectedImage].alternativeText || "Imagen del producto"}
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>

      {/* Miniaturas */}
      {image.length > 1 && (
        <div className="grid grid-cols-4 gap-2 items-center">
          {image.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "flex flex-col items-center relative border-2 rounded overflow-hidden",
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent"
              )}
            >
              <Image
                src={img.url}
                alt={img.alternativeText || `Vista ${index + 1}`}
                width={100}
                height={100}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
