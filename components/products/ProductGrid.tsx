import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: { url: string }[];
    slug: string;
  }>;
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export { ProductGrid };
