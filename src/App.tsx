import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:ProductId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}
