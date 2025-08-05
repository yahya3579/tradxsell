import React, { useState, useContext, useEffect } from "react";
import styles from "./InventoryManagement.module.css";
import axios from "axios";
import { AuthContext } from "../../AuthContext.js";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Trash2, 
  DollarSign,
  Box,
  Layers,
  BarChart3
} from "lucide-react";

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("inStock");
  const { email: sellerEmail, username: sellerusername } = useContext(AuthContext);
  const [productsInventory, setproductsInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [showProductDetailsPopup, setShowProductDetailsPopup] = useState(false);

  // (Before May 20)
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       // const response = await axios.get(`/api/seller/${sellerEmail}`); 
  //       const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/seller/${sellerEmail}`); 
  //       setproductsInventory(response.data); // Store the fetched products in state
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //     }
  //   };

  //   if (sellerEmail) {
  //     fetchProducts();
  //   }
  // }, [sellerEmail])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/products/seller`,
          {
            params: { email: sellerEmail }
          }
        );
        setproductsInventory(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (sellerEmail) {
      fetchProducts();
    }
  }, [sellerEmail]);


  const totalQuantity = productsInventory.reduce((total, product) => {
    return total + product.quantity; // Accumulate the quantity
  }, 0);

  const ApprovedProducts = productsInventory.filter((product)=> product.status === "approved");
  const InPindingProducts = productsInventory.filter((product)=> product.status === "pending");

  const approvedProductsCount = ApprovedProducts.reduce((total, product)=>{
    return total + product.quantity;
  }, 0)

  const inPindingPoductsCount = InPindingProducts.reduce((total, product)=>{
    return total + product.quantity;
  },0)

  const handleDeleteProduct = async (productId) => {
    try {
      // Show confirmation toast
      const confirmed = await new Promise((resolve) => {
        toast((t) => (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              textAlign: 'center'
            }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </div>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                style={{
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ), {
          duration: 0, // No auto-dismiss
          position: "top-center",
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '500',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
            minWidth: '350px'
          },
        });
      });

      if (confirmed) {
        await axios.delete(`${process.env.REACT_APP_LOCALHOST_URL}/products?id=${productId}`);
        
        // Remove the product from state using both id and _id
        setproductsInventory(prev => prev.filter(product => 
          product.id !== productId && product._id !== productId
        ));
        
        // Show success toast
        toast.success("Product deleted successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: '#4CAF50',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '500',
            padding: '16px 20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#4CAF50',
          },
        });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
      
      // Show error toast
      toast.error("Failed to delete product. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });
    }
  };

  const handleViewProductDetails = (product) => {
    setSelectedProductDetails(product);
    setShowProductDetailsPopup(true);
  };

  const closeProductDetailsPopup = () => {
    setSelectedProductDetails(null);
    setShowProductDetailsPopup(false);
  };

  if (error) {
    return (
      <div style={modernStyles.container}>
        <div style={modernStyles.errorContainer}>
          <AlertCircle size={48} color="#ef4444" />
          <h3 style={modernStyles.errorTitle}>Error Loading Inventory</h3>
          <p style={modernStyles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={modernStyles.container}>
        <div style={modernStyles.loadingContainer}>
          <div style={modernStyles.spinner}></div>
          <h3 style={modernStyles.loadingTitle}>Loading Inventory...</h3>
          <p style={modernStyles.loadingMessage}>Please wait while we fetch your product data</p>
        </div>
      </div>
    );
  }

  return (
    <div style={modernStyles.container}>
      {/* Toast Container */}
      <Toaster />
      
      <div style={modernStyles.content}>
        {/* Header Section */}
        <div style={modernStyles.header}>
          <div style={modernStyles.headerLeft}>
            <h1 style={modernStyles.pageTitle}>
              <Package size={28} style={modernStyles.titleIcon} />
              Inventory Management
            </h1>
            <p style={modernStyles.subtitle}>
              Monitor and manage your product inventory across all categories
            </p>
          </div>
          <div style={modernStyles.userInfo}>
            <span style={modernStyles.username}>{sellerusername}</span>
            <div style={modernStyles.avatar}>
              {sellerusername.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={modernStyles.statsContainer}>
          <div style={modernStyles.statCard}>
            <div style={modernStyles.statIcon}>
              <Box size={24} color="#f2582c" />
            </div>
            <div style={modernStyles.statContent}>
              <h3 style={modernStyles.statNumber}>{totalQuantity}</h3>
              <p style={modernStyles.statLabel}>Total Items</p>
            </div>
          </div>
          <div style={modernStyles.statCard}>
            <div style={modernStyles.statIcon}>
              <CheckCircle size={24} color="#10b981" />
            </div>
            <div style={modernStyles.statContent}>
              <h3 style={modernStyles.statNumber}>{approvedProductsCount}</h3>
              <p style={modernStyles.statLabel}>Approved</p>
            </div>
          </div>
          <div style={modernStyles.statCard}>
            <div style={modernStyles.statIcon}>
              <Clock size={24} color="#f59e0b" />
            </div>
            <div style={modernStyles.statContent}>
              <h3 style={modernStyles.statNumber}>{inPindingPoductsCount}</h3>
              <p style={modernStyles.statLabel}>Pending</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={modernStyles.tabContainer}>
          <div style={modernStyles.tabNavigation}>
            <button
              style={{
                ...modernStyles.tabButton,
                ...(activeTab === "inStock" ? modernStyles.activeTabButton : {})
              }}
              onClick={() => setActiveTab("inStock")}
            >
              <Layers size={16} />
              All Products
            </button>
            <button
              style={{
                ...modernStyles.tabButton,
                ...(activeTab === "inPending" ? modernStyles.activeTabButton : {})
              }}
              onClick={() => setActiveTab("inPending")}
            >
              <Clock size={16} />
              Pending Approval
            </button>
            <button
              style={{
                ...modernStyles.tabButton,
                ...(activeTab === "approved" ? modernStyles.activeTabButton : {})
              }}
              onClick={() => setActiveTab("approved")}
            >
              <CheckCircle size={16} />
              Approved Products
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div style={modernStyles.tabContent}>
          {activeTab === "inStock" && (
            <div>
              {productsInventory.length === 0 ? (
                <div style={modernStyles.emptyState}>
                  <Package size={64} color="#9ca3af" />
                  <h3 style={modernStyles.emptyTitle}>No Products Found</h3>
                  <p style={modernStyles.emptyMessage}>
                    You haven't added any products yet. Start by adding your first product to get started.
                  </p>
                </div>
              ) : (
                <div style={modernStyles.productsGrid}>
                  {productsInventory.map((product) => (
                    <div key={product.id} style={modernStyles.productCard}>
                      <div style={modernStyles.productImageContainer}>
                        <img
                          src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                          alt={product.name}
                          style={modernStyles.productImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div style={{
                          ...modernStyles.productImage,
                          ...modernStyles.imagePlaceholder,
                          display: 'none'
                        }}>
                          <Package size={48} color="#9ca3af" />
                          <span style={modernStyles.placeholderText}>No Image</span>
                        </div>
                        <div style={modernStyles.quantityBadge}>
                          <Box size={14} />
                          <span>{product?.quantity || 0}</span>
                        </div>
                      </div>
                      
                      <div style={modernStyles.productDetails}>
                        <h4 style={modernStyles.productName}>{product.name}</h4>
                        <p style={modernStyles.productDescription}>
                          {product.description}
                        </p>
                        
                        <div style={modernStyles.productMeta}>
                          <div style={modernStyles.price}>
                            <DollarSign size={16} />
                            <span>{product.price}</span>
                          </div>
                          <div style={{
                            ...modernStyles.statusBadge,
                            ...(product.status === "approved" ? modernStyles.statusApproved :
                                product.status === "pending" ? modernStyles.statusPending : 
                                modernStyles.statusRejected)
                          }}>
                            {product.status === "approved" ? (
                              <CheckCircle size={12} />
                            ) : product.status === "pending" ? (
                              <Clock size={12} />
                            ) : (
                              <AlertCircle size={12} />
                            )}
                            <span>{product.status}</span>
                          </div>
                        </div>

                        <div style={modernStyles.productActions}>
                          <button
                            onClick={() => handleViewProductDetails(product)}
                            style={modernStyles.viewButton}
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            style={modernStyles.deleteButton}
                            onClick={() => handleDeleteProduct(product._id || product.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === "inPending" && (
            <div>
              {InPindingProducts.length === 0 ? (
                <div style={modernStyles.emptyState}>
                  <Clock size={64} color="#9ca3af" />
                  <h3 style={modernStyles.emptyTitle}>No Pending Products</h3>
                  <p style={modernStyles.emptyMessage}>
                    All your products have been reviewed. Check back later for any products awaiting approval.
                  </p>
                </div>
              ) : (
                <div style={modernStyles.productsGrid}>
                  {InPindingProducts.map((product) => (
                    <div key={product.id} style={modernStyles.productCard}>
                      <div style={modernStyles.productImageContainer}>
                        <img
                          src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                          alt={product.name}
                          style={modernStyles.productImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div style={{
                          ...modernStyles.productImage,
                          ...modernStyles.imagePlaceholder,
                          display: 'none'
                        }}>
                          <Package size={48} color="#9ca3af" />
                          <span style={modernStyles.placeholderText}>No Image</span>
                        </div>
                        <div style={modernStyles.quantityBadge}>
                          <Box size={14} />
                          <span>{product?.quantity || 0}</span>
                        </div>
                      </div>
                      
                      <div style={modernStyles.productDetails}>
                        <h4 style={modernStyles.productName}>{product.name}</h4>
                        <p style={modernStyles.productDescription}>
                          {product.description}
                        </p>
                        
                        <div style={modernStyles.productMeta}>
                          <div style={modernStyles.price}>
                            <DollarSign size={16} />
                            <span>{product.price}</span>
                          </div>
                          <div style={{
                            ...modernStyles.statusBadge,
                            ...modernStyles.statusPending
                          }}>
                            <Clock size={12} />
                            <span>{product.status}</span>
                          </div>
                        </div>

                        <div style={modernStyles.productActions}>
                          <button
                            onClick={() => handleViewProductDetails(product)}
                            style={modernStyles.viewButton}
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            style={modernStyles.deleteButton}
                            onClick={() => handleDeleteProduct(product._id || product.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === "approved" && (
            <div>
              {ApprovedProducts.length === 0 ? (
                <div style={modernStyles.emptyState}>
                  <CheckCircle size={64} color="#9ca3af" />
                  <h3 style={modernStyles.emptyTitle}>No Approved Products</h3>
                  <p style={modernStyles.emptyMessage}>
                    You don't have any approved products yet. Once your products are approved, they'll appear here.
                  </p>
                </div>
              ) : (
                <div style={modernStyles.productsGrid}>
                  {ApprovedProducts.map((product) => (
                    <div key={product.id} style={modernStyles.productCard}>
                      <div style={modernStyles.productImageContainer}>
                        <img
                          src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                          alt={product.name}
                          style={modernStyles.productImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div style={{
                          ...modernStyles.productImage,
                          ...modernStyles.imagePlaceholder,
                          display: 'none'
                        }}>
                          <Package size={48} color="#9ca3af" />
                          <span style={modernStyles.placeholderText}>No Image</span>
                        </div>
                        <div style={modernStyles.quantityBadge}>
                          <Box size={14} />
                          <span>{product?.quantity || 0}</span>
                        </div>
                      </div>
                      
                      <div style={modernStyles.productDetails}>
                        <h4 style={modernStyles.productName}>{product.name}</h4>
                        <p style={modernStyles.productDescription}>
                          {product.description}
                        </p>
                        
                        <div style={modernStyles.productMeta}>
                          <div style={modernStyles.price}>
                            <DollarSign size={16} />
                            <span>{product.price}</span>
                          </div>
                          <div style={{
                            ...modernStyles.statusBadge,
                            ...modernStyles.statusApproved
                          }}>
                            <CheckCircle size={12} />
                            <span>{product.status}</span>
                          </div>
                        </div>

                        <div style={modernStyles.productActions}>
                          <button
                            onClick={() => handleViewProductDetails(product)}
                            style={modernStyles.viewButton}
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            style={modernStyles.deleteButton}
                            onClick={() => handleDeleteProduct(product._id || product.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Popup */}
      {showProductDetailsPopup && selectedProductDetails && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={closeProductDetailsPopup}
        >
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            padding: "30px",
            maxWidth: "800px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#f2582c",
                margin: 0,
              }}>
                Product Details
              </h3>
              <button
                onClick={closeProductDetailsPopup}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999",
                  padding: "0",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ padding: "20px" }}>
              {/* Product Image */}
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <img
                  src={`${process.env.REACT_APP_LOCALHOST_URL}${selectedProductDetails.imageUrl}`}
                  alt={selectedProductDetails.name}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    border: '2px solid #f2582c'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.35em' fill='%23999' font-family='Arial, sans-serif' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Product Information */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h4 style={{ 
                    marginBottom: "15px", 
                    color: "#f2582c",
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    {selectedProductDetails.name}
                  </h4>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#333' }}>Price:</strong>
                    <span style={{ 
                      color: '#f2582c', 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold',
                      marginLeft: '10px'
                    }}>
                      USD {selectedProductDetails.price}
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Category:</strong>
                    <span style={{ marginLeft: '10px', color: '#666' }}>
                      {selectedProductDetails.category}
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Sub-Category:</strong>
                    <span style={{ marginLeft: '10px', color: '#666' }}>
                      {selectedProductDetails.subCategory || 'N/A'}
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Type:</strong>
                    <span style={{ 
                      marginLeft: '10px', 
                      color: selectedProductDetails.type === 'international' ? '#28a745' : '#007bff',
                      fontWeight: 'bold'
                    }}>
                      {selectedProductDetails.type}
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Quantity:</strong>
                    <span style={{ marginLeft: '10px', color: '#666' }}>
                      {selectedProductDetails.quantity}
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Product ID:</strong>
                    <span style={{ marginLeft: '10px', color: '#666' }}>
                      {selectedProductDetails.id || selectedProductDetails._id}
                    </span>
                  </div>
                </div>

                <div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Status:</strong>
                    <span style={{ 
                      marginLeft: '10px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: selectedProductDetails.status === 'approved' ? '#28a745' :
                                     selectedProductDetails.status === 'pending' ? '#ffc107' : '#dc3545',
                      color: '#fff'
                    }}>
                      {selectedProductDetails.status ? 
                        selectedProductDetails.status.charAt(0).toUpperCase() + selectedProductDetails.status.slice(1) : 
                        'Unknown'
                      }
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Seller Email:</strong>
                    <span style={{ marginLeft: '10px', color: '#666' }}>
                      {selectedProductDetails.sellerEmail}
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Created:</strong>
                    <span style={{ marginLeft: '10px', color: '#666' }}>
                      {new Date(selectedProductDetails.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Updated:</strong>
                    <span style={{ marginLeft: '10px', color: '#666' }}>
                      {new Date(selectedProductDetails.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {selectedProductDetails.sizes && selectedProductDetails.sizes.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ color: '#333' }}>Sizes:</strong>
                      <span style={{ marginLeft: '10px', color: '#666' }}>
                        {selectedProductDetails.sizes.join(", ")}
                      </span>
                    </div>
                  )}

                  {selectedProductDetails.colors && selectedProductDetails.colors.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ color: '#333' }}>Colors:</strong>
                      <span style={{ marginLeft: '10px', color: '#666' }}>
                        {selectedProductDetails.colors.join(", ")}
                      </span>
                    </div>
                  )}

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>Features:</strong>
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      {selectedProductDetails.latest && (
                        <span style={{ 
                          display: 'inline-block',
                          backgroundColor: '#17a2b8',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          marginRight: '5px',
                          marginBottom: '5px'
                        }}>
                          Latest
                        </span>
                      )}
                      {selectedProductDetails.featured && (
                        <span style={{ 
                          display: 'inline-block',
                          backgroundColor: '#ffc107',
                          color: '#000',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          marginRight: '5px',
                          marginBottom: '5px'
                        }}>
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginTop: '20px' }}>
                <strong style={{ color: '#333', display: 'block', marginBottom: '10px' }}>
                  Description:
                </strong>
                <div style={{ 
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '8px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {selectedProductDetails.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const modernStyles = {
  container: {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },

  // Header Styles
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  headerLeft: {
    flex: 1,
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "4px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  titleIcon: {
    color: "#f2582c",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    margin: 0,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  username: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#374151",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f2582c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
  },

  // Loading & Error States
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    textAlign: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #f3f4f6",
    borderTop: "3px solid #f2582c",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  loadingTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  loadingMessage: {
    fontSize: "16px",
    color: "#6b7280",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    textAlign: "center",
  },
  errorTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#374151",
    marginTop: "16px",
    marginBottom: "8px",
  },
  errorMessage: {
    fontSize: "16px",
    color: "#6b7280",
  },

  // Stats Container
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },

  // Tab Styles
  tabContainer: {
    marginBottom: "32px",
  },
  tabNavigation: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "6px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    gap: "4px",
  },
  tabButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  activeTabButton: {
    backgroundColor: "#f2582c",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(242, 88, 44, 0.2)",
  },

  // Tab Content
  tabContent: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },

  // Empty State
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#374151",
    marginTop: "16px",
    marginBottom: "8px",
  },
  emptyMessage: {
    fontSize: "16px",
    color: "#6b7280",
    maxWidth: "400px",
  },

  // Products Grid
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },

  // Product Card
  productCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  productImageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#f9fafb",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.2s ease",
  },
  imagePlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
  },
  placeholderText: {
    marginTop: "8px",
    fontSize: "12px",
  },
  quantityBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  // Product Details
  productDetails: {
    padding: "20px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
    lineHeight: "1.4",
  },
  productDescription: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "16px",
    lineHeight: "1.5",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },

  // Product Meta
  productMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  price: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#f2582c",
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
  },
  statusApproved: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  statusPending: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  statusRejected: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },

  // Product Actions
  productActions: {
    display: "flex",
    gap: "8px",
  },
  viewButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px 16px",
    backgroundColor: "#f2582c",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s ease",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },

  // Responsive Design
  "@media (max-width: 768px)": {
    header: {
      flexDirection: "column",
      gap: "16px",
      alignItems: "flex-start",
    },
    productsGrid: {
      gridTemplateColumns: "1fr",
    },
    statsContainer: {
      gridTemplateColumns: "1fr",
    },
    tabNavigation: {
      flexDirection: "column",
      gap: "4px",
    },
    content: {
      padding: "12px",
    },
  },
};
export default InventoryManagement;


