import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD"); // Default currency
  const [rates, setRates] = useState({});

  // Fetch live exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD" // Replace with preferred API
        );
        setRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };
    fetchRates();
  }, []);

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, rates, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
