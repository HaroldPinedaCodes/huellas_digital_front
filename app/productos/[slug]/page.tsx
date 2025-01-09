import { BreadCrumb } from "@/components/common/breadcrumb";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductTabs } from "@/components/products/product-tabs";
import { RelatedProducts } from "@/components/products/related-products";
import { getProductBySlug } from "@/services/api/products";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const slug = await params.slug;

  try {
    const product = await getProductBySlug(slug);
    console.log("Product data:", product); // Debug log

    if (!product) {
      notFound();
    }

    // Verificar que el producto tiene imágenes
    if (!product.image || !Array.isArray(product.image)) {
      console.warn("Product has no valid images array");
    }

    return (
      <div className="container mx-auto px-4 pb-16">
        <BreadCrumb />
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Suspense
              fallback={
                <div className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
              }
            >
              <ProductGallery
                // Asegurar que siempre pasamos un array
                image={Array.isArray(product.image) ? product.image : []}
              />
            </Suspense>

            <div className="flex flex-col space-y-6">
              <ProductInfo product={product} />
              <ProductTabs product={product} />
            </div>
          </div>

          <div className="mt-16">
            <RelatedProducts
              categoryId={product.category.id}
              currentProductId={product.id}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }
}
