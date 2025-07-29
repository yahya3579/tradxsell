import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.js";
import { CurrencyContext } from "../CurrencyContext.js";

function Cart() {
  const { email, loggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const { currency, rates } = useContext(CurrencyContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // (Before May 20)
  // useEffect(() => {
  //   // Redirect if email is null
  //   if (!email) {
  //     navigate("/home"); // Redirect to the desired page
  //     return; // Exit the effect
  //   }

  //   const fetchCartItems = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_LOCALHOST_URL}/cart/${email}`
  //       );
  //       setCartItems(response.data);
  //     } catch (err) {
  //       setError("Failed to fetch cart items");
  //       console.error(err);
  //     }
  //   };

  //   fetchCartItems();
  // }, [email, navigate]); // Include navigate in dependencies


  // (May 20)
  useEffect(() => {
  // Redirect if email is null
  if (!email) {
    navigate("/home"); // Redirect to the desired page
    return;
  }

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST_URL}/cart/?email=${encodeURIComponent(email)}`
      );
      setCartItems(response.data);
    } catch (err) {
      setError("Failed to fetch cart items");
      console.error(err);
    }
  };

  fetchCartItems();
}, [email, navigate]);


  const increaseQuantity = async (productId) => {
    try {
      await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/cart/increase`, {
        email,
        productId,
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/cart/decrease`, {
        email,
        productId,
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // (Before May 20)
  // const removeFromCart = async (productId) => {
  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/cart/remove/${email}/${productId}`
  //     );
  //     setCartItems((prevItems) =>
  //       prevItems.filter((item) => item.productId !== productId)
  //     );
  //   } catch (err) {
  //     console.error("Error removing item:", err);
  //   }
  // };

  // (May 20)
  const removeFromCart = async (productId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_LOCALHOST_URL}/remove`,
      {
        params: {
          email: email,       // assuming `email` is available in your component
          productId: productId
        }
      }
    );

    // Update UI after successful deletion
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  } catch (err) {
    console.error("Error removing item:", err);
  }
};


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loggedIn) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "#EF5B2B",
            padding: "20px 40px",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <h1
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2.5rem",
              letterSpacing: "1.5px",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            PLEASE LOGIN
          </h1>
        </div>
        <p
          style={{
            marginTop: "20px",
            color: "#333",
            fontSize: "1.2rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Access your cart and account details after logging in.
        </p>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>YOUR CART</h2>
      {cartItems.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <table style={styles.cartTable}>
          <thead>
            <tr>
              <th style={{ ...styles.header, paddingLeft: 55 }}>PRODUCT</th>
              <th style={styles.header}>PRICE</th>
              <th style={{ ...styles.header, paddingLeft: 55 }}>QUANTITY</th>
              <th style={{ ...styles.header, paddingLeft: 55 }}>SIZE</th>
              <th style={{ ...styles.header, paddingLeft: 55 }}>COLOUR</th>
              <th style={{ ...styles.header, paddingLeft: 10 }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const convertedPrice = (
                item.price * (rates[currency] || 1)
              ).toFixed(2);

              return (
                <tr key={item.productId} style={styles.cartItemRow}>
                  <td style={{ ...styles.productInfo, paddingTop: 10 }}>
                    <img
                      src={`${process.env.REACT_APP_LOCALHOST_URL}${item?.imageUrl}`}
                      alt={item.name}
                      style={styles.productImage}
                    />
                    <span style={styles.productName}>{item.name}</span>
                  </td>
                  <td style={styles.subtotal}>
                    {`${currency} ${convertedPrice}`}
                  </td>
                  <td style={{ paddingLeft: 60 }}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => increaseQuantity(item.productId)}
                    >
                      +
                    </button>
                    <div
                      style={{ paddingLeft: 5, display: "inline-block" }}
                    ></div>
                    <div style={{ paddingRight: 7, display: "inline-block" }}>
                      {item.quantity}
                    </div>
                    <button
                      style={styles.quantityButton}
                      onClick={() => decreaseQuantity(item.productId)}
                    >
                      -
                    </button>
                  </td>

                  <td>
                    <div style={{ paddingLeft: 20 }}>
                      <span style={{ ...styles.cartItemRow, paddingLeft: 40 }}>
                        {item.size === "null" ? "-" : item.size}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ paddingLeft: 70 }}>
                      <span style={styles.cartItemRow}>
                        {item.color === "null" ? "-" : item.color}
                      </span>
                    </div>
                  </td>

                  <td style={{ ...styles.removeCell, paddingRight: 10 }}>
                    <button
                      style={styles.removeButton}
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ ...styles.icon, paddingLeft: 4 }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <div style={styles.summary}>
          <p style={styles.total}>
            Total: {currency}{" "}
            {cartItems
              .reduce((sum, item) => {
                // Convert price based on current currency
                const convertedPrice = item.price * (rates[currency] || 1);
                return sum + convertedPrice * item.quantity;
              }, 0)
              .toFixed(2)}
          </p>
          <Link
            to="/payment"
            state={{
              cartItems: cartItems,
              totalBill: cartItems
                .reduce((sum, item) => {
                  const convertedPrice = item.price * (rates[currency] || 1);
                  return sum + convertedPrice * item.quantity;
                }, 0)
            }}
            className="btn btn-primary"
            style={styles.checkoutButton}
          >
            NEXT
          </Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#EF5B2B",
    fontSize: "24px",
    fontWeight: "bold",
  },
  emptyCart: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: "18px",
    color: "#666",
  },
  cartTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  },
  header: {
    backgroundColor: "#EF5B2B",
    color: "#fff",
    padding: "15px",
    fontSize: "16px",
    textAlign: "left",
  },
  cartItemRow: {
    borderBottom: "1px solid #ddd",
    padding: "20px 0",
    height: "120px",
  },
  productInfo: {
    display: "flex",
    alignItems: "center",
  },
  productImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "15px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  subtotal: {
    fontSize: "16px",
    padding: "12px",
    fontWeight: "bold",
  },
  removeCell: {
    padding: "12px",
  },
  removeButton: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  icon: {
    marginRight: "8px",
  },
  summary: {
    textAlign: "right",
  },
  total: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
  },
  checkoutButton: {
    padding: "12px 20px",
    backgroundColor: "#EF5B2B",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  quantityButton: {
    padding: "4px 15px",
  },
};

export default Cart;
