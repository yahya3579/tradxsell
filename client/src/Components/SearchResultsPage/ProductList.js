import React from "react";
import "./ProductList.css"; // Import the CSS file
import { useNavigate,Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <Link 
            to={`/productoverview/${product._id}`} // Adjust the URL based on your route setup
            key={product._id}
            style={{ textDecoration: 'none' }} // Remove underline from the link
          >
          <div key={product.id} className="productCard-Detail">
            <img
              src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
              alt={product.name}
              className="product-image"
            />
            <div className="padding-card">
            <h3 className="productName">{product.name}</h3>
          
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            </div>
          </div>
          </Link>
        ))
      ) : (
        <p className="no-products-message">No products found</p>
      )}
    </div>
  );
};

export default ProductList;
