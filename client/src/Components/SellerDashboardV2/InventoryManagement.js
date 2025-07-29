import React, { useState, useContext, useEffect } from "react";
import styles from "./InventoryManagement.module.css";
import axios from "axios";
import { AuthContext } from "../../AuthContext.js";
import { Link } from "react-router-dom";

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("inStock");
  const { email: sellerEmail, username: sellerusername } = useContext(AuthContext);
  const [productsInventory, setproductsInventory] = useState([]);

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


  // (May 20)
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST_URL}/products/seller`,
        {
          params: { email: sellerEmail }
        }
      );
      setproductsInventory(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
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

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container">
          <span className={` ${styles.navbarBrand}`}>
            Inventory Management System
          </span>
          <div className="navbar-nav">
            <button
              className={`${styles.navButton} ${
                activeTab === "inStock" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("inStock")}
            >
              In Stock Products
            </button>
            <button
              className={`${styles.navButton} ${
                activeTab === "inPending" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("inPending")}
            >
              In Pending Products
            </button>
            <button
              className={`${styles.navButton} ${
                activeTab === "approved" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("approved")}
            >
              Approved Products
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="container">
        {activeTab === "inStock" && (
          <div className={styles.tabContent}>
            <h5>In Stock Products ({totalQuantity? totalQuantity : 0})</h5>

                {/* in stock products  */}
                <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {productsInventory.map((product) => (
              <div key={product.id} style={styleInner.card}>
                <img
                  src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                  alt={product.name}
                  style={styleInner.cardImage}
                />
                <div style={styleInner.cardBody}>
                  <h5 style={styleInner.cardID}>Quantity: {product?.quantity}</h5>
                  <h5 style={styleInner.cardTitle}>{product.name}</h5>
                  <p style={styleInner.cardPrice}>${product.price}</p>
                  <p style={styleInner.cardDescription}>{product.description}</p>
                  <div style={styleInner.statusContainer}>
                    <span
                      style={{
                        ...styleInner.statusIndicator,
                        backgroundColor:
                          product.status === "approved"
                            ? "green"
                            : product.status === "not approved"
                            ? "red"
                            : product.status === "pending"
                            ? "yellow"
                            : "transparent",
                      }}
                    ></span>
                    <span style={styleInner.statusText}>{product.status}</span>
                  </div>
                  <div style={styleInner.cardActions}>
                    <Link
                      to={`/adminproducts/${product.id}`}
                      style={styleInner.viewButton}
                    >
                      View Details
                    </Link>
                    <button
                      style={styleInner.deleteButton}
                      onClick={() => this.handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          </div>
        )}
        {activeTab === "inPending" && (
          <div >
            <div className={styles.tabContent}>
            <h5>In Pinding Products ({inPindingPoductsCount ? inPindingPoductsCount : 0})</h5>

                {/* in stock products  */}
                <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {InPindingProducts.map((product) => (
              <div key={product.id} style={styleInner.card}>
                <img
                  src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                  alt={product.name}
                  style={styleInner.cardImage}
                />
                <div style={styleInner.cardBody}>
                  <h5 style={styleInner.cardID}>Quantity: {product?.quantity}</h5>
                  <h5 style={styleInner.cardTitle}>{product.name}</h5>
                  <p style={styleInner.cardPrice}>${product.price}</p>
                  <p style={styleInner.cardDescription}>{product.description}</p>
                  <div style={styleInner.statusContainer}>
                    <span
                      style={{
                        ...styleInner.statusIndicator,
                        backgroundColor:
                          product.status === "approved"
                            ? "green"
                            : product.status === "not approved"
                            ? "red"
                            : product.status === "pending"
                            ? "yellow"
                            : "transparent",
                      }}
                    ></span>
                    <span style={styleInner.statusText}>{product.status}</span>
                  </div>
                  <div style={styleInner.cardActions}>
                    <Link
                      to={`/adminproducts/${product.id}`}
                      style={styleInner.viewButton}
                    >
                      View Details
                    </Link>
                    <button
                      style={styleInner.deleteButton}
                      onClick={() => this.handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          </div>
          </div>
        )}
        {activeTab === "approved" && (
           <div >
           <div className={styles.tabContent}>
           <h5>Approved Products ({approvedProductsCount ? approvedProductsCount : 0})</h5>

               {/* in stock products  */}
               <div
           style={{
             display: "grid",
             gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
             gap: "20px",
             marginTop: "20px",
           }}
         >
           {ApprovedProducts.map((product) => (
             <div key={product.id} style={styleInner.card}>
               <img
                 src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                 alt={product.name}
                 style={styleInner.cardImage}
               />
               <div style={styleInner.cardBody}>
                 <h5 style={styleInner.cardID}>Quantity: {product?.quantity}</h5>
                 <h5 style={styleInner.cardTitle}>{product.name}</h5>
                 <p style={styleInner.cardPrice}>${product.price}</p>
                 <p style={styleInner.cardDescription}>{product.description}</p>
                 <div style={styleInner.statusContainer}>
                   <span
                     style={{
                       ...styleInner.statusIndicator,
                       backgroundColor:
                         product.status === "approved"
                           ? "green"
                           : product.status === "not approved"
                           ? "red"
                           : product.status === "pending"
                           ? "yellow"
                           : "transparent",
                     }}
                   ></span>
                   <span style={styleInner.statusText}>{product.status}</span>
                 </div>
                 <div style={styleInner.cardActions}>
                   <Link
                     to={`/adminproducts/${product.id}`}
                     style={styleInner.viewButton}
                   >
                     View Details
                   </Link>
                   <button
                     style={styleInner.deleteButton}
                     onClick={() => this.handleDeleteProduct(product.id)}
                   >
                     Delete
                   </button>
                 </div>
               </div>
             </div>
           ))}
         </div>
       
         </div>
         </div>
        )}
      </div>
    </div>
  );
};


const styleInner = {
    input: {
      width: "100%",
      padding: "5px",
      margin: "3px 0",
      borderRadius: "5px",
      border: "1px solid #333",
      backgroundColor: "rgb(237 237 237)",
      color: "#1f2121",
      fontsize: "5px"
    },
    fileInput: {
      margin: "5px 0",
    },
    button: {
      padding: "3px 15px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#EF5B2B",
      color: "#FFF",
      cursor: "pointer",
      fontSize:"10px"
    },
    card: {
      backgroundColor: "rgb(174 183 203 / 34%)",
      borderRadius: "8px",
      // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      border: "1px solid gray",
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
    },
    cardBody: {
      padding: "15px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#EF5B2B",
    },
    cardID: {
      fontSize: "14px",
      color: "#999",
    },
    cardPrice: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "rgb(97, 105, 124)",
    },
    cardDescription: {
      fontSize: "14px",
      color: "#737373",
      marginBottom: "10px",
      height: '100px', 
      overflow: 'hidden', 
      textOverflow: 'ellipsis',  
      display: '-webkit-box',
      WebkitLineClamp: 3, 
      WebkitBoxOrient: 'vertical',
    },
    statusContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    statusIndicator: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      marginRight: "10px",
    },
    statusText: {
      fontSize: "14px",
      color: "rgb(97, 105, 124)",
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    viewButton: {
      backgroundColor: "#8997b9",
      color: "#FFF",
      padding: "5px 10px",
      borderRadius: "5px",
      textDecoration: "none",
      fontSize: "10px"
    },
    deleteButton: {
      backgroundColor: "#61697c",
      color: "#FFF",
      padding: "5px 10px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "10px"
    },
    formContainer: {
      backgroundColor: "rgb(226 231 238)",
      borderRadius: "8px",
      padding: "20px",
      marginTop: "20px",
    },
    closeButton: {
      backgroundColor: "#EF5B2B",
      color: "#FFF",
      padding: "5px 10px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginBottom: "20px",
      fontSize: "10px"
    },
  };
export default InventoryManagement;


