function Addtocart({ productId }) {
  const addToCart = () => {
    fetch("http://localhost:8000/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.getItem("userId"),
        product: productId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart data:", data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  };

  return <button onClick={addToCart}>Add to cart</button>;
}

export default Addtocart;
