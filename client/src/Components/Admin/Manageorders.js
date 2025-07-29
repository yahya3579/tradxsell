import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext.js";
import SideNavbar from "./SideNavbar";
import "./ManageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const { email: sellerEmail } = useContext(AuthContext);
  const [productSellerEmails, setProductSellerEmails] = useState({});
  const [productOrders, setProductOrders] = useState({});
  const { username: sellerusername } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders from the API
        const response = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/orders`
        );
        const ordersData = response.data;

        // Set orders data
        setOrders(ordersData);

        // Fetch and map seller emails for products
        fetchProductSellerEmails(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // (Before May 20)
  // const fetchProductSellerEmails = async (orders) => {
  //   try {
  //     // Extract unique productIds from all items in orders
  //     const productIds = [
  //       ...new Set(
  //         orders.flatMap((order) => order.items.map((item) => item.productId))
  //       ),
  //     ];
  //     console.log("Product IDs:", productIds);

  //     const orderResults = [];
  //     for (const productId of productIds) {
  //       // Fetch orders for each productId
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_LOCALHOST_URL}/orders/product/${productId}`
  //       );
  //       orderResults.push({ productId, orders: response.data });
  //     }

  //     // Accumulate productId and orders mapping into an object
  //     const orderData = orderResults.reduce((acc, { productId, orders }) => {
  //       acc[productId] = orders;
  //       return acc;
  //     }, {});

  //     // Update the state with the accumulated data
  //     setProductOrders(orderData);

  //     console.log("All product orders:", orderData); // Optional: Log to verify structure
  //   } catch (error) {
  //     console.error("Error fetching product seller emails:", error);
  //   }
  // };


  // (May 20)
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
      // Fetch orders for each productId using query parameter
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

    console.log("All product orders:", orderData);
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

  // const handleItemStatusUpdate = async (orderId, productId, status) => {
  //   try {
  //     await axios.put(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/orders/${orderId}/items/${productId}/status`,
  //       { status }
  //     );
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/orders`
  //     );
  //     setOrders(response.data);
  //   } catch (error) {
  //     console.error("Error updating item status:", error);
  //     setError("Failed to update item status");
  //   }
  // };


  const handleItemStatusUpdate = async (orderId, productId, status) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_LOCALHOST_URL}/orders/item/status?orderId=${orderId}&productId=${productId}`,
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
      <SideNavbar />
      <main style={{ flex: 1, padding: "20px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #333",
            paddingBottom: "10px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            Manage Orders
          </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px" }}>{sellerusername}</span>
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
        <div style={styles.container}>
          <div style={styles.ordersContainer}>
            <div>
              {Object.keys(productOrders).map((productId) => (
                <div key={productId}>
                  <h6>Product ID: {productId}</h6>
                  {productOrders[productId].map((order) => (
                    <div key={order._id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                      {/* Order Info */}
                      <h5 className="card-title text-primary">{order.username}'s Order</h5>
                      <p className="card-text">
                        <strong>Email:</strong> {order.email} <br />
                        <strong>Status:</strong> <span className={`badge ${order.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>{order.status}</span> <br />
                        <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                      </p>
                  
                      {/* Items Section */}
                      <h6 className="card-subtitle mb-2 text-muted">Items:</h6>
                      {order.items.map((item) => (
                        <div key={item._id} className="d-flex mb-3 align-items-center">
                          <img
                            src={`${process.env.REACT_APP_LOCALHOST_URL}${item?.imageUrl}`}
                            alt={item.name}
                            className="img-thumbnail me-3"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                          />
                          <div className="d-flex flex-row justify-content-between align-items-center">
                            <p className="mb-1 me-4"><strong>Name:</strong> {item.name}</p>
                            <p className="mb-1 me-4"><strong>Price:</strong> ${item.price}</p>
                            <p className="mb-1 me-4"><strong>Quantity:</strong> {item.quantity}</p>
                            <p className="mb-1 me-4"><strong>Color:</strong> {item.color}</p>
                            <p className="mb-1 me-4"><strong>Size:</strong> {item.size}</p>
                            <p className="mb-0"><strong>Status:</strong> {item.status}</p>
                          </div>
                        </div>
                      ))}
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

export default ManageOrders;
