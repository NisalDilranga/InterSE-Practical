import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import Layout from "./component/layout/Layout";
import ItemTypes from "./pages/ItemTypes";
import ItemManagePage from "./pages/ItemManagePage";
import OrderPage from "./pages/OrderPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<ItemTypes />} />
              <Route path="item-types" element={<ItemTypes />} />
              <Route path="item-manage" element={<ItemManagePage />} />
              <Route path="order-manage" element={<OrderPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </>
  );
}

export default App;
