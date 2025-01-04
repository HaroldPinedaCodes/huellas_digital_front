import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { ProductCardProps } from "@/types/product"; // Asegúrate de tener esta importación

const ProductCard = ({
  name,
  price,
  image,
  stock,
  rating,
  brand,
  category,
}: ProductCardProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_URL || "";
  const imageUrl = image ? `${baseUrl}${image.url}` : "/placeholder.png";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
  };

  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className="object-contain p-4 transition-transform group-hover:scale-105"
            priority
          />
          {stock <= 5 && stock > 0 && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
              ¡Últimas unidades!
            </span>
          )}
          {stock === 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Agotado
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-muted-foreground">{brand.name}</span>
            <h3 className="line-clamp-2 h-12 text-sm font-medium">{name}</h3>
          </div>

          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div>
              <p className="text-lg font-bold">{formatPrice(price)}</p>
              <p className="text-xs text-muted-foreground">{category.name}</p>
            </div>
            <Button variant="outline" size="sm" disabled={stock === 0}>
              {stock === 0 ? "Agotado" : "Añadir al carrito"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
