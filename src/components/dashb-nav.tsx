import { Button } from "./ui/button";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
export default function DashNav() {
  const { user, removeUser } = useUser();
  const navigate = useNavigate();
  function handleLogout() {
    removeUser();
    localStorage.removeItem("token");
    navigate("/admin/auth");
  }
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6 border border-b-gray-300">
      <div className="text-lg font-medium">Hello {user?.UserName}</div>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
