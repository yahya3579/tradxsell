import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Table, Badge, Spinner, Button, Modal, Form, Alert } from 'react-bootstrap';
import { toast, Toaster } from "react-hot-toast";
import tradxsell from "../../assets/tradxsell-black.png";
import { FaUsers, FaUserTie, FaTools, FaCheckCircle } from "react-icons/fa";
import { MdDashboard, MdInventory } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

export default function AdminRFQ() {
  const [rfqs, setRfqs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [quote, setQuote] = useState({ price: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Layout states
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isHovered, setIsHovered] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const getActive = (path) => location.pathname === path;

  useEffect(() => {
    setFetching(true);
    axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/rfq/custom/admin`)
      .then(res => {
        setRfqs(res.data);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [success]);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 992;
      setIsMobile(isSmall);
      setIsSidebarVisible(!isSmall);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const fontSizeMultiplier = isMobile ? 0.9 : 1;

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      display: "flex",
      height: "100vh",
      backgroundColor: "#f3f3f3",
      position: "relative",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#fff",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      display: isSidebarVisible ? "flex" : "none",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px 10px",
      position: isMobile ? "absolute" : "relative",
      zIndex: 10,
      height: "100%",
    },
    closeIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "transparent",
      border: "none",
      fontSize: `${20 * fontSizeMultiplier}px`,
      cursor: "pointer",
      color: "#fb5420",
      display: isMobile ? "block" : "none",
    },
    logo: {
      fontWeight: "bold",
      fontSize: `${20 * fontSizeMultiplier}px`,
      paddingBottom: "15px",
    },
    menuItem: {
      padding: "10px 20px",
      color: "#9197b3",
      fontSize: `${14 * fontSizeMultiplier}px`,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    menuLeft: {
      display: "flex",
      alignItems: "center",
    },
    header: {
      backgroundColor: "#fb5420",
      color: "#fff",
      padding: "15px 20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px", // Add margin to move header down from navbar
    },
    toggleButton: {
      display: isMobile && !isSidebarVisible ? "block" : "none",
      backgroundColor: "#fb5420",
      border: "none",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "5px",
      cursor: "pointer",
      zIndex: 20,
    },
    title: {
      fontWeight: "bold",
      fontSize: `${18 * fontSizeMultiplier}px`,
      textAlign: "center",
      flex: 1,
      marginRight: "10px",
    },
    user: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textAlign: "right",
      fontSize: `${14 * fontSizeMultiplier}px`,
    },
    profileImage: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    textBlock: {
      lineHeight: "1.2",
    },
    username: {
      color: "black",
      fontWeight: "bold",
    },
    role: {
      color: "white",
      fontSize: "0.8rem",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflowX: "auto",
    },
    logout: {
      marginTop: "auto",
      padding: "10px 20px",
      backgroundColor: isHovered ? "#ffe5dc" : "transparent",
      color: isHovered ? "#fb5420" : "#fb5420",
      border: "1px solid #fb5420",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: `${14 * fontSizeMultiplier}px`,
    },
    activeMenuItem: {
      backgroundColor: "#FB5420",
      color: "white",
      borderRadius: "8px",
    },
  };

  const userName = localStorage.getItem("username");

  const handleQuote = rfq => {
    setSelectedRFQ(rfq);
    setQuote({ price: '', message: '' });
    setError(null);
    setSuccess(null);
  };

  const handleSendQuote = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Show loading toast
    const loadingToast = toast.loading('Sending quote to user...', {
      position: "top-center",
      style: {
        background: '#2196F3',
        color: '#fff',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    });

    try {
      await axios.put(`${process.env.REACT_APP_LOCALHOST_URL}/rfq/custom/admin/${selectedRFQ._id}/respond`, quote);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success toast
      toast.success("Quote sent to user successfully!", {
        duration: 3000,
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

      setSuccess('Quote sent to user!');
      setSelectedRFQ(null);
    } catch (err) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      const errorMessage = err.response?.data?.error || 'Failed to send quote';
      toast.error(errorMessage, {
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

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Toast Container */}
      <Toaster />
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {isMobile && (
          <button onClick={toggleSidebar} style={styles.closeIcon}>
            ✖
          </button>
        )}
        <div>
          <Link to="/" style={{...styles.logo, marginTop: "20px"}}>
            <img src={tradxsell} alt="TRADXSELL" style={{ height: "48px" }} />
          </Link>
          <h2
            style={{
              margin: "30px 0 10px 13px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </h2>
          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/admin/dashboard") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/admin/dashboard");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <MdDashboard style={{ width: "18px", marginRight: "8px" }} />{" "}
              Dashboard
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/admin/manageproduct") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/admin/manageproduct");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <MdInventory style={{ width: "18px", marginRight: "8px" }} />{" "}
              Manage Products
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/admin/manageusers") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/admin/manageusers");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaUsers style={{ width: "18px", marginRight: "8px" }} />{" "}
              Manage Users
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/admin/managecomplains") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/admin/managecomplains");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaUserTie style={{ width: "18px", marginRight: "8px" }} />{" "}
              Manage Complains
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/admin/createqualityassurance") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/admin/createqualityassurance");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaCheckCircle style={{ width: "18px", marginRight: "8px" }} />{" "}
              Quality Assurance
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/admin/rfq") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/admin/rfq");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaTools style={{ width: "18px", marginRight: "8px" }} />{" "}
              RFQ Management
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>
        </div>
        <button
          style={styles.logout}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.header}>
          {isMobile && !isSidebarVisible && (
            <button onClick={toggleSidebar} style={styles.toggleButton}>
              ☰
            </button>
          )}
          <div style={styles.title}>RFQ MANAGEMENT</div>
          <div style={styles.user}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              alt="User"
              style={styles.profileImage}
            />
            <div style={styles.textBlock}>
              <div style={styles.username}>{userName || "Admin"}</div>
              <div style={styles.role}>Administrator</div>
            </div>
          </div>
        </div>

        {/* RFQ Content */}
        <div className="container py-4">
          <div style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            padding: "32px 24px",
            maxWidth: 1200,
            margin: "32px auto"
          }}>
            <h2 style={{
              fontWeight: 700,
              color: "#EF5B2B",
              borderBottom: "3px solid #EF5B2B",
              display: "inline-block",
              marginBottom: 24,
              paddingBottom: 6,
              fontSize: "2rem"
            }}>RFQ Management</h2>
            {fetching ? (
              <Spinner animation="border" />
            ) : rfqs.length === 0 ? (
              <div>No RFQs found.</div>
            ) : (
              <Table striped bordered hover responsive style={{ marginTop: 24 }}>
                <thead style={{ background: "#f7f7f7" }}>
                  <tr>
                    <th style={{ fontWeight: 700 }}>User</th>
                    <th style={{ fontWeight: 700 }}>Product</th>
                    <th style={{ fontWeight: 700 }}>Description</th>
                    <th style={{ fontWeight: 700 }}>Quantity</th>
                    <th style={{ fontWeight: 700 }}>City</th>
                    <th style={{ fontWeight: 700 }}>Country</th>
                    <th style={{ fontWeight: 700 }}>Delivery Period</th>
                    <th style={{ fontWeight: 700 }}>Target Price</th>
                    <th style={{ fontWeight: 700 }}>Status</th>
                    <th style={{ fontWeight: 700 }}>Admin Quote</th>
                    <th style={{ fontWeight: 700 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rfqs.map(rfq => (
                    <tr key={rfq._id}>
                      <td>{rfq.user?.username || rfq.user?.email || '-'}</td>
                      <td>{rfq.productName}</td>
                      <td>{rfq.description}</td>
                      <td>{rfq.quantity}</td>
                      <td>{rfq.city}</td>
                      <td>{rfq.country}</td>
                      <td>{rfq.deliveryPeriod}</td>
                      <td>{rfq.targetPrice}</td>
                      <td>
                        <Badge bg={
                          rfq.status === 'under review' ? 'secondary' :
                          rfq.status === 'quoted' ? 'info' :
                          rfq.status === 'closed' ? 'dark' : 'light'
                        } style={{ fontSize: "1rem", padding: "6px 14px" }}>
                          {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        {rfq.adminQuote && rfq.adminQuote.price ? (
                          <div>
                            <div><b>Price:</b> {rfq.adminQuote.price}</div>
                            <div><b>Message:</b> {rfq.adminQuote.message}</div>
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td>
                        {rfq.status === 'under review' && (
                          <Button
                            size="sm"
                            onClick={() => handleQuote(rfq)}
                            style={{
                              background: "linear-gradient(90deg, #FB5420 44.4%, #C52F03 100%)",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              fontWeight: 600,
                              padding: "8px 18px"
                            }}
                          >
                            Respond
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Modal show={!!selectedRFQ} onHide={() => setSelectedRFQ(null)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Send Quote to User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Price (per unit)</Form.Label>
                    <Form.Control type="number" min={0} value={quote.price} onChange={e => setQuote({ ...quote, price: e.target.value })} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={2} value={quote.message} onChange={e => setQuote({ ...quote, message: e.target.value })} required />
                  </Form.Group>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setSelectedRFQ(null)} disabled={loading} style={{ borderRadius: 6 }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSendQuote}
                  disabled={loading}
                  style={{
                    background: "linear-gradient(90deg, #FB5420 44.4%, #C52F03 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    padding: "8px 18px"
                  }}
                >
                  {loading ? 'Sending...' : 'Send Quote'}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}