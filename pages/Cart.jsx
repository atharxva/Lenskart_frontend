import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/cart/" + localStorage.getItem("userId"))
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart data:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.product.name}
          <img src={product.product.imageUrl} alt={product.product.name} />
          </li>
        ))}
      </ul>
      <div className="checkout">
        <Link to="/checkout">
          <button>checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
