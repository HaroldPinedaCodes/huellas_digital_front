import { ProductCard } from "@/components/products/product-card";
import { Product } from "../../types/product";
// import { getStrapiURL } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          priceClient={product.priceClient}
          rating={product.rating}
          image={product.image}
          slug={product.slug}
          isPriority={false}
          stock={product.stock}
          brand={product.brand}
        />
      ))}
    </div>
  );
};

export { ProductGrid };
