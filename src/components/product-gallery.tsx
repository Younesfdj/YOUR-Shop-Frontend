import { useState } from "react";

interface Props {
  product: ProductI;
}

export function ProductGallery({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="flex flex-col-reverse">
      {/* Image Grid */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <ul className="grid grid-cols-4 gap-6">
          {product.ProductGallery.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50"
            >
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <img
                  src={image.ProductImagePath}
                  width={200}
                  height={200}
                  alt={product.ProductName}
                  className="h-full w-full object-cover object-center"
                />
              </span>
              {index === selectedImage && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-indigo-700 ring-offset-2"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Main Image */}
      <div className="aspect-h-1 aspect-w-1  w-full">
        <img
          src={product.ProductGallery[selectedImage].ProductImagePath}
          alt={`Main ${product.ProductName} image`}
          width={600}
          height={750}
          className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
        />
      </div>
    </div>
  );
}
