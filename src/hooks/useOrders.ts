import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./useUser";
import { useToast } from "../components/ui/use-toast";
export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUser();
  const { toast } = useToast();
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    };
    fetchOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        toast({
          title: "Error when fetching orders",
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { orders, loading };
};
