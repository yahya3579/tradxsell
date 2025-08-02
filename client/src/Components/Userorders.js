import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Assuming you have an AuthContext for managing user authentication

function UserOrders() {
    const { email, loggedIn } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    console.log("email is", email);
    // (Before May 20)
    // useEffect(() => {
    //     if (!email) {
    //         <p>please login</p>
    //     }
    //     const fetchOrders = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/orders/${email}`);
    //             console.log(response.data); 
    //             setOrders(response.data);
    //         } catch (error) {
    //             console.error('Error fetching orders:', error);
    //             setError('Failed to fetch orders');
    //         }
    //     };

    //     fetchOrders();
    // }, [email, navigate]);


    // (May 20)
    useEffect(() => {
    if (!email) {
        return; // Early return instead of rendering <p> which isn't valid in useEffect
    }
    
    const fetchOrders = async () => {
        try {
            const encodedEmail = encodeURIComponent(email);
            const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/orders/email?email=${encodedEmail}`);
            console.log(response.data); 
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders');
        }
    };

    fetchOrders();
}, [email, navigate]);

    if (error) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Error: {error}</div>;
    }

    if (!loggedIn) {
        return (
            <div style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <div 
                    style={{
                        backgroundColor: "#EF5B2B",
                        padding: "20px 40px",
                        borderRadius: "15px",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out"
                    }}
                    onClick={() => navigate('/login')}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    <h1 style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "2.5rem",
                        letterSpacing: "1.5px",
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
                    }}>
                        PLEASE LOGIN
                    </h1>
                </div>
                <p style={{
                    marginTop: "20px",
                    color: "#333",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    textAlign: "center"
                }}>
                    Access your orders and account details after logging in.
                </p>
            </div>
        );
    }
    
    if (orders.length === 0) {
        return (
            <div style={{ backgroundColor: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1 style={{ color: "#EF5B2B", textAlign: "center", fontWeight: "bold" }}>NO ORDER PLACED</h1>
        </div>
        
        );
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '50px' }}>
            <div className="container">
                <h2 className="mb-4" style={{ color: '#EF5B2B', fontWeight: 'bold', textAlign: 'center', fontSize: '2.5rem' }}>Your Orders</h2>
                {orders.map(order => (
                    <div key={order._id} className="card mb-4 shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
                        <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: '#EF5B2B', color: 'white', borderRadius: '12px 12px 0 0' }}>
                            <h5 className="card-title mb-0">Order #{order._id}</h5>
                            <p className="mb-0">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'white', borderRadius: '0 0 12px 12px' }}>
                            <table className="table table-bordered text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <thead style={{ backgroundColor: '#EF5B2B', color: 'white' }}>
                                    <tr>
                                        <th style={{ width: '30%' }}>Product</th>
                                        <th style={{ width: '20%' }}>Quantity</th>
                                        <th style={{ width: '20%' }}>Colour</th>
                                        <th style={{ width: '20%' }}>Size</th>
                                        <th style={{ width: '25%' }}>Total</th>
                                        <th style={{ width: '25%' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map(item => (
                                        <tr key={item.productId}>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <img src={`${process.env.REACT_APP_LOCALHOST_URL}${item?.imageUrl}`} alt={item.name} className="img-fluid rounded" style={{ maxHeight: '60px', marginRight: '10px', width: '50px' }} />
                                                    <span style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</span>
                                                </div>
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }}>{item.quantity}</td>
                                            <td style={{ verticalAlign: 'middle' }}>{item.color!=='null' ? item.color : '-'}</td> {/* Show dash if color is null */}
                                            <td style={{ verticalAlign: 'middle' }}>{item.size!=='null' ? item.size : '-'}</td> {/* Show dash if size is null */}
                                            <td style={{ verticalAlign: 'middle' }}>${item.price * item.quantity}</td>
                                            <td style={{ verticalAlign: 'middle' }}>
                                                <span>{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserOrders;
