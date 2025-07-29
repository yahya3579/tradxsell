import React from "react";

const ProductDetailsPopup = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-index-1050">
      <div
        className="popup p-3 rounded shadow-lg bg-white w-100 w-md-75 w-lg-50"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2>{product.name}</h2>
        <img
          src={`${process.env.REACT_APP_LOCALHOST_URL}${product?.imageUrl}`}
          alt={product.name}
          className="img-fluid rounded mb-3"
          style={{ width: "200px", height: "200px" }}
        />
        <p>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Sizes:</strong> {product.sizes.join(", ")}
        </p>
        <p>
          <strong>Colors:</strong> {product.colors.join(", ")}
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <button onClick={onClose} className="btn btn-danger w-100 mt-3">
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
