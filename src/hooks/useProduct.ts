import { useState, useEffect } from "react";
import axios from "axios";

export default function useProduct(id: number) {
  const [product, setProduct] = useState<ProductI>({} as ProductI);
  const [isLoading, setIsLoading] = useState(true);
  const getProduct = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product/${id}`
    );

    if (res.status !== 200) {
      return;
    }
    setProduct(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return { product, isLoading };
}
