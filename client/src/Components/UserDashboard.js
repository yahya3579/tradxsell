import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext.js';
import { Link } from 'react-router-dom';
// REMOVE: import { Badge, Table, Spinner } from 'react-bootstrap';

function UserDashboard() {
    const { id } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [editField, setEditField] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    // (Before May 20)
    // useEffect(() => {
    //     const fetchInfo = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/users/userdetails/${id}`);
    //             setUsername(response.data.user.username);
    //             setEmail(response.data.user.email);
    //             setAddress(response.data.user.address);
    //             setPhoneNumber(response.data.user.phoneNumber);
    //         } catch (error) {
    //             console.error('Error fetching info:', error);
    //         }
    //     };

    //     if (id) {
    //         fetchInfo();
    //     }
    // }, [id]);


    // (May 20)
    useEffect(() => {
    const fetchInfo = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_LOCALHOST_URL}/userdetails`,
                {
                    params: { id } // query parameter instead of path
                }
            );

            setUsername(response.data.user.username);
            setEmail(response.data.user.email);
            setAddress(response.data.user.address);
            setPhoneNumber(response.data.user.phoneNumber);
        } catch (error) {
            console.error('Error fetching info:', error);
        }
    };

    if (id) {
        fetchInfo();
    }
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
        setNewValue('');
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
        await axios.put(
            `${process.env.REACT_APP_LOCALHOST_URL}/users/update`,
            updatedData,
            {
                params: { id } // pass id as query parameter
            }
        );

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

        setUpdateMessage(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully!`);
        setEditField(null);
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};


    const cancelEdit = () => {
        setEditField(null);
    };

    return (
        <div className='home-container' style={{ backgroundColor: "white", height: "100vh", padding: "20px" }}>
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
                        <span style={{ marginLeft: "10px" }}>{address}
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
                        <span style={{ marginLeft: "10px" }}>{phoneNumber}
                            <button onClick={() => handleEditClick('phoneNumber')} style={editButtonStyle}>Edit</button>
                        </span>
                    )}
                </div>
            </div>
            {/* REMOVE: <div className="mt-4">
              <h3>RFQ Requests</h3>
              {rfqLoading ? (
                <Spinner animation="border" />
              ) : rfqError ? (
                <div className="text-danger">{rfqError}</div>
              ) : rfqs.length === 0 ? (
                <div>No RFQ requests found.</div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Delivery Period</th>
                      <th>Location</th>
                      <th>Notes</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfqs.map(rfq => (
                      <tr key={rfq._id}>
                        <td>{rfq.productName}</td>
                        <td>{rfq.quantity}</td>
                        <td>{rfq.deliveryPeriod}</td>
                        <td>{rfq.deliveryLocation}</td>
                        <td>{rfq.notes}</td>
                        <td>
                          <Badge bg={
                            rfq.status === 'under review' ? 'secondary' :
                            rfq.status === 'delivered' ? 'info' :
                            rfq.status === 'approved' ? 'success' :
                            rfq.status === 'rejected' ? 'danger' :
                            rfq.status === 'quoted' ? 'warning' : 'dark'
                          }>
                            {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div> */}
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
