import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  products: ProductI[];
}

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
        <div>
          <XCircle className="mx-auto h-10 w-10 text-gray-500 dark:text-gray-200" />
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            Aucun produit trouvé
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8">
      {products.map((product) => {
        return (
          <Link
            key={product.ProductId}
            to={`/products/${product.ProductId}`}
            className="group text-sm"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
              <img
                src={product.ProductGallery[0]?.ProductImagePath}
                alt={product.ProductName}
                width={225}
                height={280}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-4 font-medium">{product.ProductName}</h3>
            <p className="mt-2 font-medium">
              {product.ProductPrice} {"DZD"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
