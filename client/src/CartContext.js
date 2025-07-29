import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { email } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart items from the server
  // useEffect(() => {
  //   if (!email) return;

  //   const fetchCartItems = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_LOCALHOST_URL}/cart/${email}`
  //       );
  //       setCartItems(response.data);

  //       // Update cart count
  //       const totalItems = response.data.reduce(
  //         (sum, item) => sum + item.quantity,
  //         0
  //       );
  //       setCartCount(totalItems);
  //     } catch (error) {
  //       console.error("Failed to fetch cart items:", error);
  //     }
  //   };

  //   fetchCartItems();
  // }, [email,cartItems]);


  // Fetch cart items from the server (20 May)
useEffect(() => {
  if (!email) return;

  const fetchCartItems = async () => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST_URL}/cart?email=${encodedEmail}`
      );
      setCartItems(response.data);

      // Update cart count
      const totalItems = response.data.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(totalItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  fetchCartItems();
  }, [email]);
// }, [email, cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, setCartItems, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming CartContext
export const useCart = () => {
  return useContext(CartContext);
};
