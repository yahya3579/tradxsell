import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { CurrencyContext } from "../CurrencyContext";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, rates } = useContext(CurrencyContext);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     setProducts([]);
  //     try {
  //       const formattedCategoryName = categoryName
  //         .toLowerCase()
  //         .replace(/\s+/g, "");
  //       const response = await fetch(
  //         `${process.env.REACT_APP_LOCALHOST_URL}/products/category/${formattedCategoryName}`
  //       );
  //       console.log("Response:", response); // Log the response object
  //       if (!response.ok) throw new Error("Network response was not ok");
  //       const data = await response.json();
  
  //       // Check if data is empty, if so, set an empty array or handle as needed
  //       if (data.length === 0) {
  //         setProducts([]); // or set a message like 'No products found'
  //       } else {
  //         setProducts(data); // Update products state with the new data
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchProducts();
  // }, [categoryName]);


  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    setProducts([]);
    try {
      const formattedCategoryName = categoryName
        .toLowerCase()
        .replace(/\s+/g, "");
      
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_URL}/products/category?name=${formattedCategoryName}`
      );

      console.log("Response:", response); // Log the response object
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();

      // Check if data is empty
      if (data.length === 0) {
        setProducts([]); // or set a message like 'No products found'
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [categoryName]);


  if (loading)
    return (
      <p style={{ textAlign: "center" }}>
        <Loader />
      </p>
    );

    if (products.length === 0) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 className="mt-3 mb-3">{categoryName}</h3>
          <p style={{ textAlign: "center" }}>No products found for this category.</p>
        </div>
      );
    }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        {categoryName}
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products && products.length > 0 ? (
          products.map((product) => {
            const convertedPrice = (product.price * (rates[currency] || 1)).toFixed(2);
          
            return(
            <Link
              to={`/productoverview/${product._id}`} // Adjust the URL based on your route setup
              key={product._id}
              style={{ textDecoration: "none" }} // Remove underline from the link
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                />
                <div style={{ padding: "15px" }}>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "10px 0",
                      color: "#333",
                    }}
                  >
                    {product.name}
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#28a745", // Green color for price
                      margin: "5px 0",
                    }}
                  >{`${currency} ${convertedPrice}`}</p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      margin: "5px 0",
                      height: "40px", // Fixed height for consistency
                      overflow: "hidden", // Hide overflow
                      textOverflow: "ellipsis", // Ellipsis for overflowed text
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "2", // Show only 2 lines
                    }}
                  >
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          )})
        ) : (
         <div>
          <p style={{ textAlign: "center", color: "#555" }}>
            No products available in this category.
          </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
