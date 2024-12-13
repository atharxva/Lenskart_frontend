import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Addtocart from "../components/Addtocart";

function ProductView() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

  return (
    <div>
      {product ? product.name : "loading..."}
      <div>
        <Addtocart productId={params.id} />
      </div>
    </div>
  );
}

export default ProductView;
