import axios from "axios";
import { useState, useEffect } from "react";
import { useToast } from "../components/ui/use-toast";
export const useOrder = (id: number, token: string) => {
  const [order, setOrder] = useState<OrderI>({
    OrderId: 0,
    OrderFName: "",
    OrderLName: "",
    OrderAmount: 0,
    OrderPhone: "",
    OrderWilaya: "",
    OrderCommune: "",
    OrderShippingMode: "",
    OrderDate: "",
    OrderStatus: "",
    createdAt: "",
    updatedAt: "",
    OrderDetails: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        toast({
          title: "Error when fetching order",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  return { order, loading, error };
};
