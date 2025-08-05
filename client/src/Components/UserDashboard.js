import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext.js';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function UserDashboard() {
    const { id } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [editField, setEditField] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const fetchInfo = async () => {
            if (!id) {
                setError('User ID not available');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError('');
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCALHOST_URL}/userdetails`,
                    {
                        params: { id }
                    }
                );

                if (response.data.success && response.data.user) {
                    const user = response.data.user;
                    setUsername(user.username || '');
                    setEmail(user.email || '');
                    setAddress(user.address || '');
                    setPhoneNumber(user.phoneNumber || '');
                } else {
                    setError('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching info:', error);
                setError('Failed to load user details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, [id]);

    // REMOVE: useEffect(() => {
    //   if (!id) return;
    //   setRfqLoading(true);
    //   setRfqError(null);
    //   axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/rfq/user/${id}`)
    //     .then(res => {
    //       setRfqs(res.data);
    //       setRfqLoading(false);
    //     })
    //     .catch(err => {
    //       setRfqError('Failed to load RFQs');
    //       setRfqLoading(false);
    //     });
    // }, [id]);

    const handleEditClick = (field) => {
        setEditField(field);
        // Initialize newValue with current field value
        switch (field) {
            case 'username':
                setNewValue(username);
                break;
            case 'email':
                setNewValue(email);
                break;
            case 'address':
                setNewValue(address);
                break;
            case 'phoneNumber':
                setNewValue(phoneNumber);
                break;
            default:
                setNewValue('');
        }
    };

    // (Before May 20)
    // const saveChanges = async () => {
    //     try {
    //         const updatedData = {
    //             username,
    //             email,
    //             address,
    //             phoneNumber
    //         };

    //         updatedData[editField] = newValue;
    //         await axios.put(`${process.env.REACT_APP_LOCALHOST_URL}/users/update/${id}`, updatedData);

    //         switch (editField) {
    //             case 'username':
    //                 setUsername(newValue);
    //                 break;
    //             case 'email':
    //                 setEmail(newValue);
    //                 break;
    //             case 'address':
    //                 setAddress(newValue);
    //                 break;
    //             case 'phoneNumber':
    //                 setPhoneNumber(newValue);
    //                 break;
    //             default:
    //                 break;
    //         }

    //         setUpdateMessage(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully!`);
    //         setEditField(null);
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //     }
    // };


    // (May 20)
    const saveChanges = async () => {
        if (!newValue.trim()) {
            toast.error('Please enter a value to update', {
                duration: 4000,
                position: "top-center",
                style: {
                    background: '#f44336',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '500',
                    padding: '16px 20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#f44336',
                },
            });
            return;
        }

        try {
            const updatedData = {
                username,
                email,
                address,
                phoneNumber
            };

            // Update the specific field the user is editing
            updatedData[editField] = newValue;

            // Send a PUT request using query parameter for ID
            const response = await axios.put(
                `${process.env.REACT_APP_LOCALHOST_URL}/users/update`,
                updatedData,
                {
                    params: { id }
                }
            );

            if (response.data.user) {
                // Update local state with new value
                switch (editField) {
                    case 'username':
                        setUsername(newValue);
                        break;
                    case 'email':
                        setEmail(newValue);
                        break;
                    case 'address':
                        setAddress(newValue);
                        break;
                    case 'phoneNumber':
                        setPhoneNumber(newValue);
                        break;
                    default:
                        break;
                }

                // Show success toast
                toast.success(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully!`, {
                    duration: 4000,
                    position: "top-center",
                    style: {
                        background: '#4CAF50',
                        color: '#fff',
                        borderRadius: '10px',
                        fontSize: '16px',
                        fontWeight: '500',
                        padding: '16px 20px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#4CAF50',
                    },
                });

                setUpdateMessage(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully!`);
                setEditField(null);
                setNewValue('');
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            
            // Show error toast
            toast.error(`Failed to update ${editField}. Please try again.`, {
                duration: 4000,
                position: "top-center",
                style: {
                    background: '#f44336',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '500',
                    padding: '16px 20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#f44336',
                },
            });
        }
    };


    const cancelEdit = () => {
        setEditField(null);
    };

    return (
        <div className='home-container' style={{ backgroundColor: "white", height: "100vh", padding: "20px" }}>
            <Toaster />
            
            {loading ? (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '50vh',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #f3f4f6',
                        borderTop: '3px solid #EF5B2B',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p style={{ color: '#666', fontSize: '16px' }}>Loading user details...</p>
                </div>
            ) : error ? (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '50vh',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <p style={{ color: '#f44336', fontSize: '18px', textAlign: 'center' }}>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            backgroundColor: '#EF5B2B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <h1 style={{ color: "#EF5B2B", textAlign: "center", fontWeight: "bold", marginBottom: "40px" }}>Welcome, {username}!</h1>
                    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}>
                        <div className="mb-3">
                            <Link to="/user/rfq" className="btn btn-outline-primary">
                                Request for Quotation (RFQ)
                            </Link>
                        </div>
                        {updateMessage && <p style={{ color: "#28a745", textAlign: "center", fontSize: "18px", marginBottom: "20px" }}>{updateMessage}</p>}
                        <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                            <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Username:</span>
                            {editField === 'username' ? (
                                <span>
                                    <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                                    <button onClick={saveChanges} style={buttonStyle}>Save</button>
                                    <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                                </span>
                            ) : (
                                <span style={{ marginLeft: "10px" }}>{username}
                                    <button onClick={() => handleEditClick('username')} style={editButtonStyle}>Edit</button>
                                </span>
                            )}
                        </div>

                        <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                            <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Email:</span>
                            {editField === 'email' ? (
                                <span>
                                    <input type="email" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                                    <button onClick={saveChanges} style={buttonStyle}>Save</button>
                                    <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                                </span>
                            ) : (
                                <span style={{ marginLeft: "10px" }}>{email}
                                    <button onClick={() => handleEditClick('email')} style={editButtonStyle}>Edit</button>
                                </span>
                            )}
                        </div>

                        <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                            <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Address:</span>
                            {editField === 'address' ? (
                                <span>
                                    <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                                    <button onClick={saveChanges} style={buttonStyle}>Save</button>
                                    <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                                </span>
                            ) : (
                                <span style={{ marginLeft: "10px" }}>{address || 'Not provided'}
                                    <button onClick={() => handleEditClick('address')} style={editButtonStyle}>Edit</button>
                                </span>
                            )}
                        </div>

                        <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                            <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Phone #:</span>
                            {editField === 'phoneNumber' ? (
                                <span>
                                    <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                                    <button onClick={saveChanges} style={buttonStyle}>Save</button>
                                    <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                                </span>
                            ) : (
                                <span style={{ marginLeft: "10px" }}>{phoneNumber || 'Not provided'}
                                    <button onClick={() => handleEditClick('phoneNumber')} style={editButtonStyle}>Edit</button>
                                </span>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const buttonStyle = {
    marginLeft: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#EF5B2B",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

const editButtonStyle = {
    marginLeft: "20px",
    padding: "3px 8px",
    fontSize: "14px",
    backgroundColor: "white",
    color: "#EF5B2B",
    border: "2px solid #EF5B2B",
    borderRadius: "5px",
    cursor: "pointer"
};

export default UserDashboard;
