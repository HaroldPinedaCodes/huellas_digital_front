"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageType {
  id: number;
  url: string;
  alternativeText: string | null;
}

interface ProductGalleryProps {
  image: ImageType[];
}

export function ProductGallery({ image }: ProductGalleryProps) {
  console.log("Gallery Images:", image); // Debug log
  const [selectedImage, setSelectedImage] = useState(0);

  // Manejar caso donde no hay imágenes
  if (!image || !Array.isArray(image) || image.length === 0) {
    return (
      <div className="relative bg-gray-100 rounded-lg h-fit">
        <Image
          src="/no-image-placeholder.png"
          alt="No hay imagen disponible"
          width={500}
          height={500}
          className="object-contain p-4"
          priority
        />
      </div>
    );
  }

  // Verificar que la imagen seleccionada existe
  const currentImage = image[selectedImage] || image[0];

  return (
    <div className="flex items-center space-y-4">
      {/* Imagen principal */}
      <div className="flex items-center justify-center relative  bg-white rounded-lg h-fit">
        <Image
          src={currentImage.url}
          alt={currentImage.alternativeText || "Imagen del producto"}
          width={500}
          height={500}
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Miniaturas */}
      {image.length > 1 && (
        <div className="grid grid-rows-3 gap-y-8 mt-8 justify-center items-end h-fit ">
          {image.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative  rounded-md overflow-hidden border-2",
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-gray-200"
              )}
            >
              <Image
                src={img.url}
                alt={img.alternativeText || `Vista ${index + 1}`}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
