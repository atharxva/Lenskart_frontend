import React, { useState } from "react";
import "./searchbar.css";

function Searchbar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8000/search")
      .then((response) => response.json())
      .then((json) => {
        const filteredResults = json.filter((product) => {
          return (
            product &&
            product.name &&
            product.name.toLowerCase().includes(input.toLowerCase())
          );
        });
        setResults(filteredResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (event) => {
    setInput(event.target.value);
    fetchData();
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search EyeWear"
        className="input"
      />
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
        ) : (
          input && <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
