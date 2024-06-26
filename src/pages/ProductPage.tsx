import RootLayout from "../layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductGallery } from "../components/product-gallery";
import { ProductInfo } from "../components/product-info";

interface ProductInfoI extends ProductI {
  ProductImages: string[];
  sizes: string[];
}

export default function ProductPage() {
  const id = useParams().ProductId;
  const [product, setProduct] = useState<ProductInfoI>({
    ProductId: parseInt(id as string),
    ProductName: "string",
    ProductSKU: "string",
    ProductPrice: 12,
    ProductDesc: "string",
    ProductQuantity: 12,
    ProductCategoryId: 12,
    ProductImagePath: "string",
    ProductImages: ["string"],
    sizes: ["string"],
  });
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/${id}`
      );
      const product = {
        ...res.data,
        sizes: ["s", "m", "l", "xl"],
        ProductImages: [
          res.data.ProductImagePath,
          res.data.ProductImagePath,
          res.data.ProductImagePath,
        ],
      };
      setProduct(product);
    };
    getProduct();
  });
  return (
    <RootLayout>
      <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
            {/* Product gallery */}
            <ProductGallery product={product} />
            {/* Product info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
