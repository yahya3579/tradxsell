import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  // Address-related state
  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleAddressChange = (field, value) => {
    setAddressData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Payment-related state
  const [paymentData, setPaymentData] = useState({
    paymentType: 'creditCard',
    cardNumber: '',
    cvv: '',
    expirationDate: '',
    name: '',
  });

  const handlePaymentChange = (field, value) => {
    setPaymentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <CheckoutContext.Provider
      value={{
        addressData,
        setAddressData,
        handleAddressChange,
        paymentData,
        setPaymentData,
        handlePaymentChange,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
