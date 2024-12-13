import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, products]);

  const fetchData = () => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const applyFilter = () => {
    if (filter === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === filter
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("Sunglasses")}>Sunglasses</button>
        <button onClick={() => setFilter("Eyeglasses")}>Eyeglasses</button>
        <button onClick={() => setFilter("Contact Lenses")}>
          Contact Lenses
        </button>
      </div>

      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Link key={index} to={`/products/${product._id} `}>
              <div
                style={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <h2>{product.name}</h2>
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
                <p>Type: {product.type}</p>
                <img src={product.imageUrl}></img>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
