import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import axios from "axios";
import useUserStore from "../store/useUser";

export const useUser = () => {
  const token = localStorage.getItem("token");
  const { user, setUser, removeUser } = useUserStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const verifyToken = async (token: string | null) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      navigate("/admin/auth");
      toast({
        title: "Unauthorized",
        description: "Redirecting to login page.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    verifyToken(token).then((data) => {
      if (!user) {
        setUser({
          UserEmail: data.UserEmail,
          UserName: data.UserName,
        });
      }
    });
    return;
  }, []);

  return { user, setUser, removeUser, token };
};
