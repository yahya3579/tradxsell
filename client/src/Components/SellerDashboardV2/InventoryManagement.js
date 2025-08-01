import React, { useState, useContext, useEffect } from "react";
import styles from "./InventoryManagement.module.css";
import axios from "axios";
import { AuthContext } from "../../AuthContext.js";
import { Link } from "react-router-dom";
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
      await axios.delete(`${process.env.REACT_APP_LOCALHOST_URL}/products/${productId}`);
      setproductsInventory(prev => prev.filter(product => product.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    }
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
                            e.target.src = '/api/placeholder/300/200';
                          }}
                        />
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
                          <Link
                            to={`/adminproducts/${product.id}`}
                            style={modernStyles.viewButton}
                          >
                            <Eye size={14} />
                            View Details
                          </Link>
                          <button
                            style={modernStyles.deleteButton}
                            onClick={() => handleDeleteProduct(product.id)}
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
                            e.target.src = '/api/placeholder/300/200';
                          }}
                        />
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
                          <Link
                            to={`/adminproducts/${product.id}`}
                            style={modernStyles.viewButton}
                          >
                            <Eye size={14} />
                            View Details
                          </Link>
                          <button
                            style={modernStyles.deleteButton}
                            onClick={() => handleDeleteProduct(product.id)}
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
                            e.target.src = '/api/placeholder/300/200';
                          }}
                        />
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
                          <Link
                            to={`/adminproducts/${product.id}`}
                            style={modernStyles.viewButton}
                          >
                            <Eye size={14} />
                            View Details
                          </Link>
                          <button
                            style={modernStyles.deleteButton}
                            onClick={() => handleDeleteProduct(product.id)}
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


