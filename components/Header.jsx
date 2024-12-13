import React from "react";
import Searchbar from "./searchbar";
import Cart from "../pages/Cart";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">Sight-Shop</div>
      <Searchbar />

      <div className="cart-container">
        <Link to="/cart">
          <div className="cart">cart</div>
        </Link>
      </div>

      <Link to="/profile">
        <div className="profile">profile</div>
      </Link>
      <div className="idk"></div>
    </header>
  );
}

export default Header;
