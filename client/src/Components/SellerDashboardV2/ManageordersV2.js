import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext.js";
import "./ManageOrders.css";
import style from "./Ordercard.module.css";
import { Link } from "react-router-dom";
import { Package, User, Mail, Eye, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";
function ManageOrdersV2() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const { email: sellerEmail } = useContext(AuthContext);
  const [productSellerEmails, setProductSellerEmails] = useState({});
  const [productOrders, setProductOrders] = useState({});
  const { username: sellerusername } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Helper function to get item status from order
  const getItemStatus = (order, productId) => {
    const item = order.items.find(item => item.productId === productId);
    return item ? item.status : 'Pending';
  };

  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock size={14} />;
      case 'Approved':
        return <Package size={14} />;
      case 'Cancelled':
        return <CheckCircle size={14} />;
      case 'Delivered':
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  // Helper function to get status styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return styles.statusPending;
      case 'Approved':
        return styles.statusProcessing;
      case 'Cancelled':
        return styles.statusCancelled;
      case 'Delivered':
        return styles.statusDelivered;
      default:
        return styles.statusPending;
    }
  };

  // Helper to fetch product details and add sellerEmail to items if missing
  async function enrichOrderItemsWithSellerEmail(order) {
    const enrichedItems = await Promise.all(order.items.map(async (item) => {
      if (!item.sellerEmail) {
        // Fetch product details to get sellerEmail
        try {
          const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/products/${item.productId}`);
          const product = response.data;
          return { ...item, sellerEmail: product.sellerEmail || '' };
        } catch (err) {
          return { ...item, sellerEmail: '' };
        }
      }
      return item;
    }));
    return { ...order, items: enrichedItems };
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders from the API
        const response = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/orders`
        );
        const ordersData = response.data;
        // Enrich all orders with sellerEmail in items
        const enrichedOrders = await Promise.all(ordersData.map(enrichOrderItemsWithSellerEmail));
        // Filter orders to only those containing items with this seller's email
        const sellerOrders = enrichedOrders.filter(order =>
          order.items.some(item => item.sellerEmail === sellerEmail)
        );
        setOrders(sellerOrders);
        fetchProductSellerEmails(sellerOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [sellerEmail]);

  const fetchProductSellerEmails = async (orders) => {
    try {
      // Extract unique productIds from all items in orders
      const productIds = [
        ...new Set(
          orders.flatMap((order) => order.items.map((item) => item.productId))
        ),
      ];
      console.log("Product IDs:", productIds);

      const orderResults = [];
      for (const productId of productIds) {
        // Fetch orders for each productId
        const response = await axios.post(
          `${process.env.REACT_APP_LOCALHOST_URL}/orders/product?productId=${productId}`
        );
        orderResults.push({ productId, orders: response.data });
      }

      // Accumulate productId and orders mapping into an object
      const orderData = orderResults.reduce((acc, { productId, orders }) => {
        acc[productId] = orders;
        return acc;
      }, {});

      // Update the state with the accumulated data
      setProductOrders(orderData);

      console.log("All product orders:", orderData); // Optional: Log to verify structure
    } catch (error) {
      console.error("Error fetching product seller emails:", error);
    }
  };

  console.log("orders", productOrders);
  // const calculateDeliveryDate = (orderDate) => {
  //     const deliveryDate = new Date(orderDate);
  //     deliveryDate.setDate(deliveryDate.getDate() + 5);
  //     return deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  // };

  const calculateTotalCost = (items) => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleItemStatusUpdate = async (orderId, productId, status) => {
    try {
      console.log('Updating status:', { orderId, productId, status });
      
      // Update the order status in the backend using the correct route
      const updateResponse = await axios.put(
        `${process.env.REACT_APP_LOCALHOST_URL}/orders/item/status`,
        { status },
        {
          params: {
            orderId: orderId,
            productId: productId
          }
        }
      );
      
      console.log('Update response:', updateResponse.data);
      
      // Update the local state immediately for better UX
      setProductOrders(prevProductOrders => {
        const updated = { ...prevProductOrders };
        if (updated[productId]) {
          updated[productId] = updated[productId].map(order => {
            if (order._id === orderId) {
              // Update the specific item's status within the order
              const updatedItems = order.items.map(item => {
                if (item.productId === productId) {
                  return { ...item, status: status };
                }
                return item;
              });
              return { ...order, items: updatedItems };
            }
            return order;
          });
        }
        return updated;
      });
      
      // Also refresh from backend to ensure consistency
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_LOCALHOST_URL}/orders`
          );
          const ordersData = response.data;
          
          // Re-enrich and filter orders
          const enrichedOrders = await Promise.all(ordersData.map(enrichOrderItemsWithSellerEmail));
          const sellerOrders = enrichedOrders.filter(order =>
            order.items.some(item => item.sellerEmail === sellerEmail)
          );
          setOrders(sellerOrders);
          
          // Refresh product orders data
          fetchProductSellerEmails(sellerOrders);
        } catch (refreshError) {
          console.error("Error refreshing orders:", refreshError);
        }
      }, 500);
      
    } catch (error) {
      console.error("Error updating item status:", error);
      setError("Failed to update item status");
    }
  };

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <AlertCircle size={48} color="#ef4444" />
          <h3 style={styles.errorTitle}>Error Loading Orders</h3>
          <p style={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <h3 style={styles.loadingTitle}>Loading Orders...</h3>
          <p style={styles.loadingMessage}>Please wait while we fetch your order data</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.pageTitle}>
              <Package size={28} style={styles.titleIcon} />
              Manage Orders
            </h1>
            <p style={styles.subtitle}>
              Track and manage your product orders
            </p>
          </div>
          <div style={styles.userInfo}>
            <span style={styles.username}>{sellerusername}</span>
            <div style={styles.avatar}>
              {sellerusername.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Orders Content */}
        {Object.keys(productOrders).length === 0 ? (
          <div style={styles.emptyState}>
            <Package size={64} color="#9ca3af" />
            <h3 style={styles.emptyTitle}>No Orders Found</h3>
            <p style={styles.emptyMessage}>
              You don't have any orders yet. When customers purchase your products, they'll appear here.
            </p>
          </div>
        ) : (
          <div style={styles.ordersContainer}>
            {Object.keys(productOrders).map((productId) => (
              <div key={productId} style={styles.productSection}>
                <div style={styles.productHeader}>
                  {/* <h3 style={styles.productTitle}>
                    Product ID: <span style={styles.productId}>{productId}</span>
                  </h3> */}
                  <span style={styles.orderCount}>
                    {productOrders[productId].length} order{productOrders[productId].length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div style={styles.ordersGrid}>
                  {productOrders[productId].map((order) => (
                    <div key={order._id} style={styles.orderCard}>
                      {/* Product Image */}
                      <div style={styles.productImage}>
                        <img
                          src={`${process.env.REACT_APP_LOCALHOST_URL}${order.items[0]?.imageUrl}`}
                          alt={order.items[0]?.name || "Product Image"}
                          style={styles.productImg}
                          onError={(e) => {
                            e.target.src = '/api/placeholder/200/200';
                          }}
                        />
                      </div>

                      {/* Order Details */}
                      <div style={styles.orderDetails}>
                        <h4 style={styles.productName}>
                          {order.items[0]?.name || "Product Name"}
                        </h4>
                        
                        <div style={styles.orderInfo}>
                          <div style={styles.infoRow}>
                            <User size={16} color="#6b7280" />
                            <span style={styles.infoText}>{order.username}</span>
                          </div>
                          <div style={styles.infoRow}>
                            <Mail size={16} color="#6b7280" />
                            <span style={styles.infoText}>{order.email}</span>
                          </div>
                          <div style={styles.infoRow}>
                            <Calendar size={16} color="#6b7280" />
                            <span style={styles.infoText}>
                              {new Date(order.orderDate || order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Status and Price */}
                        <div style={styles.orderMeta}>
                          <div style={styles.statusSection}>
                            <label style={styles.statusLabel}>Change Status:</label>
                            <select
                              value={getItemStatus(order, productId) || "Pending"}
                              onChange={(e) => handleItemStatusUpdate(order._id, productId, e.target.value)}
                              style={styles.statusSelect}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                            {/* Current Status Display */}
                            <div style={styles.currentStatusSection}>
                              <span style={styles.currentStatusLabel}>Current:</span>
                              <div style={{
                                ...styles.statusBadge,
                                ...getStatusStyle(getItemStatus(order, productId) || "Pending")
                              }}>
                                {getStatusIcon(getItemStatus(order, productId) || "Pending")}
                                <span>{getItemStatus(order, productId) || "Pending"}</span>
                              </div>
                            </div>
                          </div>
                          <div style={styles.price}>
                            <DollarSign size={16} />
                            <span>{order.items[0]?.price || "0.00"}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={styles.orderActions}>
                          <Link
                            to={`/adminproducts/${productId}`}
                            style={styles.viewButton}
                          >
                            <Eye size={16} />
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
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

  // Empty State
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
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

  // Orders Container
  ordersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  // Product Section
  productSection: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  productHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  productTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    margin: 0,
  },
  productId: {
    color: "#f2582c",
    fontFamily: "monospace",
  },
  orderCount: {
    fontSize: "14px",
    color: "#6b7280",
    backgroundColor: "#f3f4f6",
    padding: "4px 12px",
    borderRadius: "20px",
  },

  // Orders Grid
  ordersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px",
    padding: "24px",
  },

  // Order Card
  orderCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },

  // Product Image
  productImage: {
    height: "160px",
    overflow: "hidden",
    backgroundColor: "#f9fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.2s ease",
  },

  // Order Details
  orderDetails: {
    padding: "20px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "16px",
    lineHeight: "1.4",
  },
  orderInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  infoText: {
    fontSize: "14px",
    color: "#6b7280",
  },

  // Order Meta
  orderMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  statusSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statusLabel: {
    fontSize: "12px",
    color: "#6b7280",
    fontWeight: "500",
  },
  statusSelect: {
    padding: "6px 8px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "12px",
    backgroundColor: "#fff",
    color: "#374151",
    cursor: "pointer",
    minWidth: "100px",
  },
  currentStatusSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "6px",
  },
  currentStatusLabel: {
    fontSize: "11px",
    color: "#6b7280",
    fontWeight: "500",
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  statusPending: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  statusProcessing: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
  },
  statusCancelled: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  statusDelivered: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  price: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#f2582c",
  },

  // Actions
  orderActions: {
    display: "flex",
    gap: "8px",
  },
  viewButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    backgroundColor: "#f2582c",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s ease",
    border: "none",
    cursor: "pointer",
  },

  // Responsive Design
  "@media (max-width: 768px)": {
    header: {
      flexDirection: "column",
      gap: "16px",
      alignItems: "flex-start",
    },
    ordersGrid: {
      gridTemplateColumns: "1fr",
      padding: "16px",
    },
    content: {
      padding: "12px",
    },
  },
};

export default ManageOrdersV2;
