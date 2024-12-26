import ProductCard from "./ProductCard";
import { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={Number(product.id)}
          name={product.name}
          price={product.priceClient} // o priceVet según necesites
          image={product.image[0]}
          slug={product.slug}
          stock={product.stock}
          rating={product.rating}
          brand={product.brand}
          category={product.category}
        />
      ))}
    </div>
  );
};

export { ProductGrid };
