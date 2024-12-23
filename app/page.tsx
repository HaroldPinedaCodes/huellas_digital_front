import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryList } from "@/components/common/CategoryList";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// async function getFeaturedProducts() {
//   const res = await fetch(
//     `${process.env.STRAPI_URL}/api/products?populate=*&filters[featured][$eq]=true`
//   );
//   const data = await res.json();
//   return data.data;
// }

async function getAllProducts() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/products?populate=*`);
  const data = await res.json();
  return data.data;
}

async function getCategories() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/categories?populate=*`
  );
  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const [products, categories] = await Promise.all([
    getAllProducts(),

    getCategories(),
  ]);

  console.log(products, categories);

  return (
    <main className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <section className="py-12">
        <Card className="relative overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold mb-4">Todo para tu mascota</h1>
              <p className="text-lg mb-6">
                Encuentra los mejores productos para el cuidado y diversión de
                tu compañero peludo.
              </p>
              <Button size="lg">Ver productos</Button>
            </div>
            {/* <img
              src="/api/placeholder/600/400"
              alt="Hero"
              className="absolute right-0 top-0 h-full w-1/2 object-cover hidden md:block"
            /> */}
          </CardContent>
        </Card>
      </section>

      {/* Categories */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Categorías</h2>
        <CategoryList categories={categories} />
      </section>

      {/* Featured Products */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Productos destacados</h2>
        <ProductGrid products={products} />
      </section>

      {/* Features */}
      <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Envío Gratis", description: "En pedidos superiores a $50" },
          {
            title: "Atención 24/7",
            description: "Soporte cuando lo necesites",
          },
          {
            title: "Devolución Garantizada",
            description: "30 días de garantía",
          },
        ].map((feature) => (
          <Card key={feature.title}>
            <CardContent className="p-6 text-center">
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
