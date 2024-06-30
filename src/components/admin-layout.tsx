import { Button } from "./ui/button";
import { useUser } from "../hooks/useUser";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import {
  Package2,
  Menu,
  ShoppingBasket,
  ListCollapse,
  BarChart3,
  LogOut,
} from "lucide-react";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AdminRootLayout({ children }: RootLayoutProps) {
  const { user, removeUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  function handleLogout() {
    removeUser();
    localStorage.removeItem("token");
    navigate("/admin/auth");
  }
  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-4 px-4 py-6">
                  <Link
                    to="/admin/dashboard"
                    className={`flex items-center gap-2 font-medium ${
                      location === "/admin/dashboard"
                        ? "pb-1 border-b-[1px] w-auto border-gray-500"
                        : ""
                    }`}
                  >
                    <ShoppingBasket className="h-5 w-5" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    to="/admin/products"
                    className={`flex items-center gap-2 font-medium ${
                      location === "/admin/products"
                        ? "pb-1 border-b-[1px] w-auto border-gray-500"
                        : ""
                    }`}
                  >
                    <Package2 className="h-5 w-5" />
                    <span>Products</span>
                  </Link>
                  <Link
                    to="/admin/categories"
                    className={`flex items-center gap-2 font-medium ${
                      location === "/admin/categories"
                        ? "pb-1 border-b-[1px] w-auto border-gray-500"
                        : ""
                    }`}
                  >
                    <ListCollapse className="h-5 w-5" />
                    <span>Categories</span>
                  </Link>
                  <Link
                    to="/admin/stats"
                    className={`flex items-center gap-2 font-medium ${
                      location === "/admin/stats"
                        ? "pb-1 border-b-[1px] w-auto border-gray-500"
                        : ""
                    }`}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Stats</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link
              to="/admin/dashboard"
              className={`hidden items-center gap-2 lg:flex ${
                location === "/admin/dashboard"
                  ? "pb-1 border-b-[1px] border-gray-500"
                  : ""
              }`}
            >
              <ShoppingBasket className="h-6 w-6" />
              <span className="text-sm font-medium">Orders</span>
            </Link>
            <Link
              to="/admin/products"
              className={`hidden items-center gap-2 lg:flex ${
                location === "/admin/products"
                  ? "pb-1 border-b-[1px] border-gray-500"
                  : ""
              }`}
            >
              <Package2 className="h-6 w-6" />
              <span className="text-sm font-medium">Products</span>
            </Link>
            <Link
              to="/admin/categories"
              className={`hidden items-center gap-2 lg:flex ${
                location === "/admin/categories"
                  ? "pb-1 border-b-[1px] border-gray-500"
                  : ""
              }`}
            >
              <ListCollapse className="h-6 w-6" />
              <span className="text-sm font-medium">Categories</span>
            </Link>
            <Link
              to="/admin/stats"
              className={`hidden items-center gap-2 lg:flex ${
                location === "/admin/stats"
                  ? "pb-1 border-b-[1px] border-gray-500"
                  : ""
              }`}
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm font-medium">Stats</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 lg:flex">
              <span className="text-base font-semibold">
                Welcome {user?.UserName}!
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
