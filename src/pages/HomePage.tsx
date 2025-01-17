import RootLayout from "../layout";
import useProductStore from "../store/useProducts";
import { ProductFilters } from "../components/product-filters";
import { ProductGrid } from "../components/product-grid";
import { ProductSort } from "../components/product-sort";
import { cn } from "../lib/utils";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const { products, addProducts } = useProductStore();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`${BACKEND_URL}/products`);
      addProducts(res.data);
    };
    getProducts();
  }, []);

  return (
    <RootLayout>
      <div>
        <div className="px-4 pt-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-normal">Your shop</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base">
            Your shop the best f sog
          </p>
        </div>
        <div>
          <main className="mx-auto max-w-6xl px-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {products.length} résultat{products.length > 1 ? "s" : ""}
              </h1>
              {/* Product Sort */}
              <ProductSort />
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div
                className={cn(
                  "grid grid-cols-1 gap-x-8 gap-y-10",
                  products.length > 0
                    ? "lg:grid-cols-4"
                    : "lg:grid-cols-[1fr_3fr] "
                )}
              >
                <div className="hidden lg:block">
                  {/* Product filters */}
                  <ProductFilters />
                </div>
                {/* Product grid */}
                <ProductGrid products={products} />
              </div>
            </section>
          </main>
        </div>
      </div>
    </RootLayout>
  );
}
