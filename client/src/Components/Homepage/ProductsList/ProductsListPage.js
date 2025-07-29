import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react"; // Assuming react-bootstrap-icons is installed
import { CurrencyContext } from "../../../CurrencyContext";
import { useLocation } from "react-router-dom";
import Categories from "../categories/Categories";
import "./ProductListPage.css"; // Import your CSS file for styling

const ProductsListPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { currency, rates } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LOCALHOST_URL}/products/all/random`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const failedImageUrls = new Set();
  useEffect(() => {
    if (location.state?.filter) {
      setTypeFilter(location.state.filter);
    }
  }, [location.state]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "" || product.type === typeFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "" || product.status === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "white" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="mt-3 mb-3">All Products</h3>
        <p style={{ textAlign: "center" }}>No products found.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
          padding: "20px",
        }}
      >
        All Products
      </h1>

      {/* Search and Filter Bar */}
      <div style={{ backgroundColor: "white", paddingTop: "1px" }}>
        <Categories />
      </div>
      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => {
          const convertedPrice = (
            product.price * (rates[currency] || 1)
          ).toFixed(2);

          // Define these variables outside the JSX
          const fullImageUrl = product?.imageUrl
            ? `${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`
            : null;

          const imageUrl =
            !fullImageUrl || failedImageUrls.has(fullImageUrl)
              ? "https://via.placeholder.com/250x180?text=No+Image+Available"
              : fullImageUrl;
          return (
            <Link
              to={`/productoverview/${product._id}`}
              key={product._id}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",

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
                  src={imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/250x180?text=No+Image+Available";
                    // Remember this URL as a failed one to avoid future attempts
                    if (fullImageUrl) failedImageUrls.add(fullImageUrl);
                  }}
                  style={{
                    width: "100%",
                    height: "290px",
                    objectFit: "cover",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "2px 0",
                      color: "#FB5420",
                    }}
                  >
                    {product.name}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 20px 10px 0px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#9A9797",
                        margin: "5px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "2",
                      }}
                    >
                      MOQ: {product.quantity}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#1E1E1E",
                        margin: "5px 0",
                      }}
                    >{`${currency} ${convertedPrice}`}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsListPage;
