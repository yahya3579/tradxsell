import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./featureProducts.css";
import { CurrencyContext } from "../../../CurrencyContext";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [productsPerRow, setProductsPerRow] = useState(5); // Default to 4 for large screens
  const { currency, rates } = useContext(CurrencyContext);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST_URL}/products/approved/xx`
      );
      console.log("Fetched products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1666) {
        setProductsPerRow(5); // 4 products per row on very large screens
        setVisibleProducts(11); // 3 rows of 4 products
      }else if (width > 1340) {
        setProductsPerRow(4); // 3 products per row on regular desktop
        setVisibleProducts(9); // 3 rows of 3 products
      } else if (width > 992) {
        setProductsPerRow(4); // 3 products per row on regular desktop
        setVisibleProducts(7); // 3 rows of 3 products
      } else if (width > 768) {
        setProductsPerRow(2); // 2 products per row on tablets
        setVisibleProducts(5); // 3 rows of 2 products
      } else {
        setProductsPerRow(1); // 1 product per row on mobile
        setVisibleProducts(4); // 4 rows of 1 product
      }
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showMoreProducts = useCallback(() => {
    // Add one full row of products each time
    setVisibleProducts(prev => prev + productsPerRow);
  }, [productsPerRow]);
  const failedImageUrls = new Set();


  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <section className="featured-products fp-outer">
        <h1 style={{ textAlign:"center", paddingTop:"40px"}}>Featured <span style={{color:"#FB5420"}}>products</span></h1>
        <div
          className="container-fluid"
          style={{ paddingTop: "40px", width: "80%" }}
        >
          <div className=" product-list-custom" style={{ width: "100%" }}>
            {products.length > 0 ? (
              products.slice(0, visibleProducts -1 ).map((product) => { 
                const convertedPrice = (product.price * (rates[currency] || 1)).toFixed(2);
                
                const fullImageUrl = product?.imageUrl 
                ? `${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`
                : null;
                
              const imageUrl = (!fullImageUrl || failedImageUrls.has(fullImageUrl)) 
                ? "https://placehold.co/250x180?text=No+Image+Available"
                : fullImageUrl;

                return(
                <div className=" product-card-custom " key={product.id}>
                  <img
          src={imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src ="https://placehold.co/250x180?text=No+Image+Available";
            // Remember this URL as a failed one to avoid future attempts
            if (fullImageUrl) failedImageUrls.add(fullImageUrl);
          }}
                    className="product-img"
                  />
                  <div className="product-details">
                    <Link
                      to={`/productoverview/${product._id}`}
                      className="nameLink"
                     
                    >
                      <h3  style={{ color: "#FB5420", fontSize:"19px" }}>{product.name}</h3>
                    </Link>
                    <div className="d-flex align-items-center justify-content-between" style={{paddingTop:"20px"}}>
  <p style={{color:"#9A9797", fontSize:"15px"}}>MOQS: {product.quantity}</p>
  <p style={{color:"#1E1E1E", textAlign:"right", fontSize:"16px"}}>{`${currency} ${convertedPrice}`}</p>  
</div>

                    
                    {/* <Link
                      to={`/productoverview/${product._id}`}
                      className="btn  view-details-btn"
                      style={{ backgroundColor: "#EF5B2B", }}
                    >
                      View Details
                    </Link> */}
                  </div>
                </div>
              )})
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 40px",
                  color: "#EF5B2B",
                }}
              >
                <h2>No Products Available</h2>
                <p>
                  Sorry, we couldn't find any products that match your criteria.
                </p>
              </div>
            )}
          </div>
          {visibleProducts < products.length && (
            <div className="d-flex justify-content-center mt-4">
              <button onClick={showMoreProducts} className="btn m-3" style={{background: "linear-gradient(90deg, #FB5420 44.4%, #C52F03 100%)", color: "white"}}>
                See More Products
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FeatureProducts;
