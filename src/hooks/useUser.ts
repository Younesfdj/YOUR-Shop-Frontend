import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

export const useUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const { toast } = useToast();
  useEffect(() => {
    if (!token || !user) {
      navigate("/admin/auth");
      toast({
        title: "Unauthorized",
        description: "Redirecting to login page.",
        variant: "destructive",
      });
    }
    return;
  }, []);

  return { user, token };
};
