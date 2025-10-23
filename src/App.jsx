import "./styles/theme.css";
import "./styles/global.css";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { Route, Routes } from "react-router";
import { CartProvider } from "./context/CartContext";
import { User } from "./components/User";
import { Login } from "./components/Login";

export default function App() {
  return (
    // React Fragment
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/signin" element={<Login value="signin" />} />
          <Route path="/register" element={<Login value="register" />} />
          {/* Add more routes as needed */}
        </Routes>
      </CartProvider>
    </>
  );
}
