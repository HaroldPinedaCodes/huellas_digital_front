import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/api/products";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductTabs } from "@/components/products/product-tabs";
import { RelatedProducts } from "@/components/products/related-products";
import { ProductSkeleton } from "@/components/products/product-skeleton";
import { Breadcrumb } from "@/components/common/breadcrumb";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const slug = params.slug;

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent slug={slug} />
    </Suspense>
  );
}

// Componente asíncrono para el contenido
async function ProductContent({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  const breadcrumbItems = [
    { label: "Productos", href: "/products" },
    {
      label: product?.category?.name || "",
      href: `/category/${product?.category?.slug}`,
    },
    { label: product?.name || "" },
  ];

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="my-6 pt-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery image={product.image} />
        <div className="flex flex-col">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
      </div>

      <RelatedProducts
        categoryId={product.category.id}
        currentProductId={product.id}
      />
    </div>
  );
}
