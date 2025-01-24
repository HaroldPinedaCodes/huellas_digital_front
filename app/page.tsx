import { Suspense } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { CategoryList } from "@/components/common/category-list";
import { getAllProducts } from "@/services/api/products";
import { getCategories } from "@/services/api/categories";
// import { getStrapiData } from "@/services/strapi/dynamic-sections";
import { HeroSection } from "@/components/custom/hero-section";
import { FeatureSection } from "@/components/custom/features-section";
import { getHomePageData } from "@/data/loaders";
import type { Block } from "@/types/blocks";

function BlockRenderer({ block }: { block: Block }) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection data={block} />;
    case "layout.feactures-section":
      return <FeatureSection data={block} />;
    default:
      return null;
  }
}

async function getDynamicData() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getHomePageData(),
    // getStrapiData("/api/home-page"),
  ]);

  const strapiData = await getHomePageData();
  console.log("strapiData...", strapiData);

  return {
    products,
    categories,
    blocks: strapiData?.data?.blocks || [],
  };
}

export default async function Home() {
  const { products, categories, blocks } = await getDynamicData();

  // console.log("products...", products);

  return (
    <main>
      {/* Hero siempre visible primero */}
      {blocks[0]?.__component === "layout.hero-section" && (
        <HeroSection data={blocks[0]} />
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* Secciones estáticas */}
        <Suspense fallback={<div>Cargando categorías...</div>}>
          <section className="py-8">
            <CategoryList title="Categorías" categories={categories} />
          </section>
        </Suspense>

        <Suspense fallback={<div>Cargando productos...</div>}>
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-6">Productos destacados</h2>
            <ProductGrid products={products} />
          </section>
        </Suspense>

        {/* Bloques dinámicos */}
        {blocks.slice(1).map((block: Block) => (
          <Suspense key={block.id} fallback={<div>Cargando sección...</div>}>
            <BlockRenderer block={block} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}
