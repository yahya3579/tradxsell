import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import "./SearchResultsPage.css"; // Import the CSS file

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setError(null);
      fetch(`${process.env.REACT_APP_LOCALHOST_URL}/productSearch/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          // Handle the case where the backend returns a message (no products found)
          if (data.message) {
            setError(data.message); // Set the error message from backend
            setProducts([]); // Ensure products is empty if no products found
          } else {
            setProducts(data); // Set the products if they are found
          }
        })
        .catch((err) => {
          setError("Error fetching products.");
          console.error("Error fetching products:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchQuery]);

  if (!searchQuery) {
    return <h2 className="no-query-message">Please enter a search query in the search bar.</h2>;
  }

  return (
    <div className="search-results-container">
      <h2 className="search-heading">Search Results for: "{searchQuery}"</h2>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && products.length === 0 && <p className="no-results-text">No products found for your search.</p>}
      {!loading && !error && products.length > 0 && <ProductList products={products} />}
    </div>
  );
};


export default SearchResultsPage;