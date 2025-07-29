import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext.js";
import "./ManageOrders.css";
import style from "./Ordercard.module.css";
import { Link } from "react-router-dom";
function ManageOrdersV2() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const { email: sellerEmail } = useContext(AuthContext);
  const [productSellerEmails, setProductSellerEmails] = useState({});
  const [productOrders, setProductOrders] = useState({});
  const { username: sellerusername } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
      await axios.put(
        `${process.env.REACT_APP_LOCALHOST_URL}/orders/${orderId}/items/${productId}/status`,
        { status }
      );
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST_URL}/orders`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error updating item status:", error);
      setError("Failed to update item status");
    }
  };

  if (error) {
    return <div style={styles.errorMessage}>Error: {error}</div>;
  }

  if (loading) {
    return <div style={styles.loadingMessage}>Loading orders...</div>;
  }

  return (
    <div className="ManageOrder">
      <main style={{ flex: 1, padding: "20px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid gray",
            paddingBottom: "10px",
          }}
        >
          <h2 style={{ fontSize: "16px", color: "black" }}>Manage Orders</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px", color: "black" }}>
              {sellerusername}
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#EF5B2B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {sellerusername.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="container">
          <div className="container">
            <div className="card-container">
              {Object.keys(productOrders).map((productId) => (
                <div key={productId} className="card-row">
                  <h6 className="text-black">Product ID: {productId}</h6>
                  {productOrders[productId].map((order) => (
                    <div key={order._id} className={style.card}>
                      {/* Card Image */}
                      <div className={style.cardImg}>
                        <img
                          src={`${process.env.REACT_APP_LOCALHOST_URL}${order.items[0]?.imageUrl}`}
                          alt={order.items[0]?.name || "Product Image"}
                          className={style.img}
                        />
                      </div>
                      {/* Card Info */}
                      <div className={style.cardInfo}>
                        <p className={style.textTitle}>
                          {order.items[0]?.name || "Product Name"}
                        </p>
                        <p
                          className={style.textBody}
                          style={{ color: "black", fontSize: "12px" }}
                        >
                          Ordered by: {order.username} <br />
                          Email: {order.email} <br />
                          Status:{" "}
                          <span
                            className={
                              order.status === "Completed"
                                ? style.success
                                : style.warning
                            }
                          >
                            {order.status}
                          </span>
                        </p>
                      </div>
                      {/* Card Footer */}
                      <div className={style.cardFooter}>
                        <span className={style.textTitle}>
                          ${order.items[0]?.price || "0.00"}
                        </span>
                        <div className={style.cardButton}>
                          <Link
                            to={`/adminproducts/${productId}`}
                            style={styles.viewButton}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  manageOrders: {
    display: "flex",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "#E0E0E0",
  },
  viewButton:{
    fontSize:"10px",
    textDecoration:"none"
  },
  container: {
    flexGrow: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  pageTitle: {
    color: "white",
    fontWeight: "bold",
    marginBottom: "2rem",
    fontSize: "2.5rem",
  },
  ordersContainer: {
    overflowY: "scroll", // Enable vertical scrolling
    flex: 1,
    // Hide scrollbar styles
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // Internet Explorer and Edge
    "&::-webkit-scrollbar": {
      display: "none", // Chrome, Safari, and Opera
    },
  },
  orderCard: {
    backgroundColor: "#1E1E1E",
    border: "1px solid #333",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    marginBottom: "2rem",
    overflow: "hidden",
  },
  orderHeader: {
    backgroundColor: "#2C3E50",
    padding: "1.5rem",
    borderBottom: "1px solid #333",
  },
  orderTitle: {
    color: "#EF5B2B",
    fontWeight: "bold",
    marginBottom: "1rem",
    fontSize: "1.5rem",
  },
  orderDetails: {
    "& p": {
      marginBottom: "0.5rem",
    },
  },
  orderItems: {
    padding: "1.5rem",
  },
  itemsTitle: {
    color: "#EF5B2B",
    marginBottom: "1rem",
    fontSize: "1.2rem",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #333",
  },
  itemImage: {
    width: "80px",
    height: "80px",
    marginRight: "1rem",
  },
  itemImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "4px",
  },
  itemDetails: {
    flexGrow: 1,
  },
  itemName: {
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
    color: "#EF5B2B",
  },
  itemStatus: {
    minWidth: "120px",
  },
  statusSelect: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #555",
    borderRadius: "4px",
    backgroundColor: "#333",
    color: "#E0E0E0",
  },
  errorMessage: {
    color: "#ff6b6b",
    textAlign: "center",
    paddingTop: "2rem",
    fontSize: "1.2rem",
  },
  loadingMessage: {
    color: "#EF5B2B",
    textAlign: "center",
    paddingTop: "2rem",
    fontSize: "1.2rem",
  },
};

export default ManageOrdersV2;
