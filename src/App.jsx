import "./App.css";
import Landing from "../components/Auth.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyForm from "../pages/MyForm.jsx";
import Searchbar from "../components/searchbar.jsx";
import Products from "../pages/Products.jsx";
import ProductView from "../pages/ProductView.jsx";
import Header from "../components/Header.jsx";
import Cart from "../pages/Cart.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Checkout from "../pages/Checkout.jsx";
import Address from "../pages/Address.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/form" element={<MyForm />} />
        <Route path="/search" element={<Searchbar />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
