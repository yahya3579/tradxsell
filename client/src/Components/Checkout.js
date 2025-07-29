import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Assuming you have an AuthContext for managing user authentication
import Footer from './Homepage/footer/Footer';
import { Link } from 'react-router-dom';
import { CurrencyContext } from "../CurrencyContext.js";

function Checkout() {
  const { loggedIn, email, username } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const { currency, rates } = useContext(CurrencyContext);

  useEffect(() => {
    if (loggedIn) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/cart/${email}`);
          setCartItems(response.data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
          setError('Failed to fetch cart items');
        }
      };

      fetchCartItems();
    }
  }, [loggedIn, email]);

  const handleOrder = async () => {
    try {
      const order = {
        email: email,
        username: username, // Replace with actual username or fetch from context if available
        items: cartItems
      };

      // Step 1: Place the order
      const response = await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/orders/add`, order); // Adjust the API endpoint as per your backend route
      console.log('Order placed successfully:', response.data);

      // Step 2: Delete cart items after placing the order
      await axios.delete(`${process.env.REACT_APP_LOCALHOST_URL}/cart/remove/${email}`); // Adjust the API endpoint as per your backend route
      console.log('Cart items deleted successfully');

      // Optionally, you can clear the cartItems state or show a success message to the user
      setCartItems([]);

    } catch (error) {
      console.error('Error placing order or deleting cart items:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loggedIn) {
    return <div>Please log in to see your cart items.</div>;
  }

  // Placeholder for when cart items are loading
  if (cartItems.length === 0) {
    return <div>Loading cart items...</div>;
  }

  // const calculateTotalBill = () => {
  //   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  const calculateTotalBill = () => {
    return cartItems.reduce((total, item) => {
      const itemTotalPrice = item.price * item.quantity; // Calculate the total price for the item
      const convertedPrice = itemTotalPrice * (rates[currency] || 1); // Convert to selected currency
      return total + convertedPrice; // Add to the total
    }, 0);
  };

  const totalBill = calculateTotalBill();

  return (
    <div className="container-fluid" style={{ backgroundColor: "white", color: "white", minHeight: "100vh", paddingTop: "60px", alignContent: 'center', }}>
      <div className="container mb-5 d-flex flex-row justify-content-center align-items-center ">
        <div className="row w-100">
          <div className="col-12">
            <div className="card" style={{ backgroundColor: "white", color: "black" }}>
              <div className="card-header">
                <h5 className="">ORDER SUMMARY</h5>
              </div>
              <div className="card-body" style={{height:"100%"}}>
                <ul className="list-group list-group-flush">
                  {cartItems.map(item => {
                    const ItemTotalPrice=item.price * item.quantity;
                    const convertedPrice = (ItemTotalPrice * (rates[currency] || 1)).toFixed(2);

                    return(
                    <li key={item._id} className="list-group-item" style={{ backgroundColor: "white", color: "black" }}>
                      <div className="row">
                        <div className="col"><img src={`${process.env.REACT_APP_LOCALHOST_URL}${item?.imageUrl}`} alt={item.name} style={{ height: 100 }} /></div>
                        <div className="col" style={{ paddingTop: 35 }}>{item.name}</div>
                        {item.color !== 'null' && ( // Only render the color if it's not null
                          <div className="col" style={{ paddingTop: 35 }}>Color: {item.color}</div>
                        )}
                        {item.size !== 'null' && ( // Only render the size if it's not null
                          <div className="col" style={{ paddingTop: 35 }}>Size: {item.size}</div>
                        )}
                        <div className="col" style={{ paddingTop: 35 }}>Quantity: {item.quantity}</div>
                        <div className="col" style={{ paddingTop: 35 }}>{`${currency} ${convertedPrice}`}</div>
                      </div>
                    </li>
                  )})}
                </ul>
              </div>
              <div className="card-footer" style={{ backgroundColor: "white", color: "black", fontWeight: "bold", paddingBottom: "60px" }}>
                Total Bill: {currency}{" "}{calculateTotalBill().toFixed(2)}
              </div>
              <Link to="/payment" state={{ cartItems,totalBill }} className="btn btn-primary" style={{ fontSize: "20px", fontWeight: "bold", color: "white", backgroundColor: "#EF5B2B", border: "2px solid white" }}>Proceed to Checkout</Link>
            </div>
          </div>
        </div>
        
      </div>
      <div className="row">
          <div className="col-md-12 p-0">
            <Footer />
          </div>
        </div>
    </div>
  );
}

export default Checkout;
