import RootLayout from "../layout";
import { useParams } from "react-router-dom";
import { ProductGallery } from "../components/product-gallery";
import { ProductInfo } from "../components/product-info";
import useProduct from "../hooks/useProduct";
export default function ProductPage() {
  const id = useParams().ProductId;
  const { product, isLoading } = useProduct(parseInt(id as string));

  return (
    <RootLayout>
      <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          {!isLoading && (
            <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-x start lg:gap-x-12">
              {/* Product gallery */}
              <ProductGallery product={product} />
              {/* Product info */}
              <ProductInfo product={product} />
            </div>
          )}
        </div>
      </main>
    </RootLayout>
  );
}
