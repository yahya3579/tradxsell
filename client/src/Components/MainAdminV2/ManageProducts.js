import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ProductDetailsPopup from "../ProductDetailspopup";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [remarksProduct, setRemarksProduct] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
    const sellersPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/products/all/x`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // const handleStatusChange = async (id, currentStatus) => {
  //   const newStatus =
  //     currentStatus === "approved" ? "not approved" : "approved";
  //   try {
  //     await axios.patch(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/products/updatestatus/${id}`,
  //       { status: newStatus }
  //     );
  //     if (newStatus === "not approved") {
  //       setRemarksProduct(products.find((product) => product._id === id));
  //     } else {
  //       setProducts((prevProducts) =>
  //         prevProducts.map((product) =>
  //           product._id === id ? { ...product, status: newStatus } : product
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error updating product status:", error);
  //   }
  // };


  const handleStatusChange = async (id, currentStatus) => {
  const newStatus = currentStatus === "approved" ? "not approved" : "approved";
  try {
    await axios.patch(
      `${process.env.REACT_APP_LOCALHOST_URL}/products/updatestatus?id=${id}`,
      { status: newStatus }
    );
    if (newStatus === "not approved") {
      setRemarksProduct(products.find((product) => product._id === id));
    } else {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, status: newStatus } : product
        )
      );
    }
  } catch (error) {
    console.error("Error updating product status:", error);
  }
};




  // const handleRemarksSubmitted = async (id) => {
  //   try {
  //     await axios.patch(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/products/remarks/${id}`,
  //       { remarks }
  //     );
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product._id === id ? { ...product, remarks } : product
  //       )
  //     );
  //     setRemarks("");
  //     setRemarksProduct(null);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error submitting remarks:", error);
  //   }
  // };

  const handleRemarksSubmitted = async (id) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_LOCALHOST_URL}/products/remarks`,
      { remarks },
      {
        params: { id }
      }
    );

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, remarks } : product
      )
    );
    setRemarks("");
    setRemarksProduct(null);
    window.location.reload();
  } catch (error) {
    console.error("Error submitting remarks:", error);
  }
};


  // const handleDeleteProduct = async (productId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this product?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/products/${productId}`
  //     );
  //     setProducts((prevProducts) =>
  //       prevProducts.filter((product) => product._id !== productId)
  //     );
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     alert("There was an error deleting the product. Please try again.");
  //     window.location.reload();
  //   }
  // };

  const handleDeleteProduct = async (productId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`${process.env.REACT_APP_LOCALHOST_URL}/products`, {
      params: { id: productId },
    });

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("There was an error deleting the product. Please try again.");
    window.location.reload();
  }
};


  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setRemarksProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? product.status === statusFilter : true)
  );

  const totalPages = Math.ceil(filteredProducts.length / sellersPerPage);
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredProducts.slice(indexOfFirstSeller, indexOfLastSeller);

  const styles = {
    datetime: {
      fontSize: "0.75rem",
    },
    cellStyle: {
      padding: "5px",
    },
    tableResponsive: {
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
    },
    popup: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    popupContent: {
      backgroundColor: '#2c2c2c',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      width: '400px',
      animation: 'fadeIn 0.3s'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #333333',
      marginBottom: '20px',
      resize: 'none',
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    },
    submitButton: {
      backgroundColor: '#ef5b2b',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      marginRight: '10px',
      cursor: 'pointer'
    },
    cancelButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
  };

  return (
    <div>
      <style>
        {`
        @media (max-width: 776px) {
          .responsive-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem;
          }
        }

        @media (max-width: 576px) {
          .filter-group {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem;
          }
          .responsive-text-sm {
            font-size: 0.8rem;
          }
          .responsive-text-md {
            font-size: 0.9rem;
          }
        }

        @media (min-width: 577px) {
          .responsive-text-sm {
            font-size: 0.95rem;
          }
          .responsive-text-md {
            font-size: 1.05rem;
          }
        }
      `}
      </style>

      <div
        style={{
          backgroundColor: "white",
          margin: "25px",
          borderRadius: "30px",
        }}
      >
        <div className="container p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 responsive-header">
            <h4 className="mb-0 fw-bold responsive-text-md">All Products</h4>

            <div className="d-flex align-items-center gap-2 filter-group">
              <InputGroup
                className="p-2 rounded bg-light"
                style={{ maxWidth: "300px" }}
              >
                <InputGroup.Text className="bg-transparent border-0">
                  <FaSearch style={{ color: "gray" }} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 bg-transparent shadow-none responsive-text-sm"
                  style={{ marginBottom: "0" }}
                />
              </InputGroup>
              <InputGroup
                className="p-2 rounded bg-light"
                style={{ maxWidth: "300px" }}
              >
                <select
                  id="statusFilter"
                  className="form-select responsive-text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    width: "150px",
                    border: "0",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="not approved">Not Approved</option>
                </select>
              </InputGroup>
            </div>
          </div>

          <div style={styles.tableResponsive}>
            <table className="table table-hover align-middle shadow-sm rounded bg-white">
              <thead>
                <tr>
                  <th
                    className="responsive-text-sm"
                    style={{ color: "#b5b7c0" }}
                  >
                    Image
                  </th>
                  <th
                    className="responsive-text-sm"
                    style={{ color: "#b5b7c0" }}
                  >
                    Product Name
                  </th>
                  <th
                    className="responsive-text-sm"
                    style={{ color: "#b5b7c0" }}
                  >
                    Email
                  </th>
                  <th
                    className="responsive-text-sm"
                    style={{ color: "#b5b7c0" }}
                  >
                    Date & Time
                  </th>
                  <th
                    className="responsive-text-sm"
                    style={{ color: "#b5b7c0" }}
                  >
                    Price
                  </th>
                  <th
                    className="responsive-text-sm"
                    style={{ color: "#b5b7c0" }}
                  >
                    Status
                  </th>
                  <th
                    className="responsive-text-sm"
                    style={{ color: "#b5b7c0" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSellers.map((product, index) => (
                  <tr key={index} className="responsive-text-sm">
                    <td style={styles.cellStyle}>
                      <img
                        src={`${process.env.REACT_APP_LOCALHOST_URL}${product?.imageUrl}`}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </td>
                    <td style={styles.cellStyle}>{product.name}</td>
                    <td style={styles.cellStyle}>{product.sellerEmail}</td>
                    <td style={{ ...styles.datetime, ...styles.cellStyle }}>
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleString()
                        : ""}
                    </td>
                    <td style={styles.cellStyle}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td style={styles.cellStyle}>
                      <span
                        className={`badge px-3 py-2 ${
                          product.status === "approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td style={{ verticalAlign: "middle", minWidth: "220px" }}>
                      <div className="d-flex flex-nowrap gap-1">
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() =>
                            handleStatusChange(product._id, product.status)
                          }
                          style={{width: "115px"}}
                        >
                          Change Status
                        </button>
                        <Link
                          className="btn btn-outline-info btn-sm"
                          to={`/adminproducts/${product.id}`}
                        >
                          Details
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteProduct(product.id)} 
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
            <small className="text-muted responsive-text-sm text-center text-md-start">
              Showing {indexOfFirstSeller + 1} to {Math.min(indexOfLastSeller, filteredProducts.length)} of{" "}
              {filteredProducts.length} entries
            </small>

            <nav>
              <ul className="pagination mb-0 justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    &laquo;
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {selectedProduct && (
          <ProductDetailsPopup product={selectedProduct} onClose={handleClosePopup} />
        )}

        {remarksProduct && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2 style={{ marginBottom: '20px',color: 'white' }}>Input Remarks for {remarksProduct.name}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleRemarksSubmitted(remarksProduct._id); }}>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks..."
                rows="4"
                required
                style={styles.textarea}
              />
              <div>
                <button type="submit" style={styles.submitButton}>
                  Submit Remarks
                </button>
                <button type="button" onClick={() => setRemarksProduct(null)} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ManageProducts;
