import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:ProductId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/auth" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
