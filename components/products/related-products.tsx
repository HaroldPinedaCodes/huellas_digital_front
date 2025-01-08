import { ProductCard } from "@/components/products/product-card";
import { getRelatedProducts } from "@/services/api/products";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  categoryId: number;
  currentProductId: number;
}

export async function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(
    categoryId,
    currentProductId
  );

  if (!relatedProducts?.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {relatedProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.priceClient}
            slug={product.slug}
            images={product.image}
            isPriority={false}
          />
        ))}
      </div>
    </section>
  );
}
