import React, { useState, useEffect } from "react";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const cartData = await fetch(
          `http://localhost:8000/checkout/${userId}`
        );
        const cartItems = await cartData.json();
        console.log("Cart items:", cartItems);
        setCartItems(cartItems);

        setTotalAmount( cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
        console.log("Total Amount:", totalAmount);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    console.log("Checkout initiated. Cart data:", cartItems);
  };

  return (
    <div>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h3>Cart Items:</h3>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.name} /> {}
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <p>Price: {item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p></p>
                </div>
              </div>
            ))}
          </div>
          <h4>total Amount : {totalAmount}</h4>

          <button onClick={handleCheckout}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
}

export default Checkout;
