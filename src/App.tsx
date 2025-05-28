import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import Layout from "./component/layout/Layout";
import ItemTypes from "./pages/ItemTypes";
import ItemManagePage from "./pages/ItemManagePage";
import OrderPage from "./pages/OrderPage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ItemTypes />} />
            <Route path="item-types" element={<ItemTypes />} />
            <Route path="item-manage" element={<ItemManagePage />} />
            <Route path="order-manage" element={<OrderPage/>} />
            <Route path="page-3" element={<h1>ffffffff</h1>} />
            <Route path="page-4" element={<h1>ffffffff</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
