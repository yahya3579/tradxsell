
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import ProductDetailsPopup from "../ProductDetailspopup";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const ManageUsers = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sellersPerPage = 10;
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [tagsModalSeller, setTagsModalSeller] = useState(null);
  const [tags, setTags] = useState([]);
  const [role, setRole] = useState("");
  const [sellerProfile, setSellerProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/users/admins`
        );
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };
    fetchSellers();
  }, []);

  const filteredSellers = sellers.filter((seller) =>
    seller.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage);
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller);

  const handleDetailsClick = async (seller) => {
    setSelectedSeller(seller);
    
    // If the user is a seller, fetch their profile details
    if (seller.role === 'seller') {
      setLoadingProfile(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOCALHOST_URL}/seller/profile?userId=${seller._id}`
        );
        if (response.data.seller) {
          setSellerProfile(response.data.seller);
        }
      } catch (error) {
        console.error('Error fetching seller profile:', error);
        setSellerProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    } else {
      setSellerProfile(null);
    }
  };

  const handleClosePopup = () => {
    setSelectedSeller(null);
    setSellerProfile(null);
    setLoadingProfile(false);
  };

  // (Before May 20)
  // const handleDelete = async (email) => {
  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_LOCALHOST_URL}/users/admins/${email}`
  //     );
  //     setSellers((prevSellers) =>
  //       prevSellers.filter((seller) => seller.email !== email)
  //     );
  //   } catch (error) {
  //     console.error("Error deleting seller:", error);
  //   }
  // };

// (May 20)
  const handleDelete = async (email, username) => {
    // Show confirmation dialog
    const confirmed = await new Promise((resolve) => {
      toast((t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Are you sure you want to delete user "{username}"?</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              style={{
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              style={{
                background: '#666',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ), {
        duration: 0,
        position: "top-center",
        style: {
          background: '#fff',
          color: '#333',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '1px solid #ddd',
        },
      });
    });

    if (!confirmed) return;

    // Show loading toast
    const loadingToast = toast.loading('Deleting user...', {
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
      const encodedEmail = encodeURIComponent(email);
      await axios.delete(
        `${process.env.REACT_APP_LOCALHOST_URL}/users/admins?email=${encodedEmail}`
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success toast
      toast.success("User deleted successfully!", {
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

      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller.email !== email)
      );
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      toast.error("Failed to delete user. Please try again.", {
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
      
      console.error("Error deleting seller:", error);
    }
  };

  const senderId = localStorage.getItem("id");

  const startNewChat = async (receiverId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCALHOST_URL}/chat/start`,
        {
          senderId,
          receiverId,
        }
      );

      if (response.data.chat) {
        navigate(`/chat`);
      } else {
        console.error("Error creating chat:", response.data.message);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleTagsClick = (seller) => {
    setTagsModalSeller(seller);
    // Get tags from the seller's data and ensure they are properly set
    const sellerTags = seller.tags || [];
    setTags(sellerTags);
    setRole(seller.role || "seller");
    setShowTagsModal(true);
  };

  const handleTagsSave = async () => {
    if (!tagsModalSeller) return;
    
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCALHOST_URL}/seller/admin/update-tags-role`,
        {
          userId: tagsModalSeller.user || tagsModalSeller._id,
          tags,
          role,
        }
      );

      setSellers((prev) =>
        prev.map((s) =>
          s._id === tagsModalSeller._id ? { ...s, tags, role } : s
        )
      );
      setShowTagsModal(false);
    } catch (err) {
      alert("Failed to update tags/role");
      console.error("Failed to update tags/role:", err);
    }
  };

  const roleColors = {
    user: "#4caf50",
    seller: "#1976d2",
    QualityAssurance: "#fb5420",
  };

  const styles = {
    datetime: { fontSize: "0.75rem" },
    cellStyle: { padding: "5px" },
    tableResponsive: {
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
    },
    popup: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    popupContent: {
      backgroundColor: "#2c2c2c",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      width: "90%",
      maxWidth: "400px",
      color: "white",
    },
    closeButton: {
      backgroundColor: "#ef5b2b",
      color: "#fff",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    },
    roleButton: (role) => ({
      backgroundColor: roleColors[role] || "#121212",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      width: "140px",
      justifyContent: "center",
    }),
  };

  const tagOptions = [
    { label: "Registered", value: "registered" },
    { label: "Verified", value: "verified" },
    { label: "Gold", value: "gold" },
  ];

  return (
    <div>
      {/* Toast Container */}
      <Toaster />
      
      <style>
        {`
          @media (max-width: 440px) {
            .responsive-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1rem;
            }
          }

          @media (max-width: 576px) {
            .responsive-text-sm {
              font-size: 0.8rem;
            }
            .responsive-text-md {
              font-size: 0.9rem;
            }
          }

          @media (min-width: 577px) {
            .responsive-text-sm {
              font-size: 0.95rem;
            }
            .responsive-text-md {
              font-size: 1.05rem;
            }
          }
        `}
      </style>

      <div style={{ backgroundColor: "white", margin: "25px", borderRadius: "30px" }}>
        <div className="container p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 responsive-header">
            <h4 className="mb-0 fw-bold responsive-text-md">All Users</h4>
            <div className="d-flex align-items-center gap-2">
              <InputGroup className="p-2 rounded bg-light" style={{ maxWidth: "300px" }}>
                <InputGroup.Text className="bg-transparent border-0">
                  <FaSearch style={{ color: "gray" }} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search sellers..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // reset to page 1 on search
                  }}
                  className="border-0 bg-transparent shadow-none responsive-text-sm"
                  style={{ marginBottom: "0" }}
                />
              </InputGroup>
            </div>
          </div>

          <div style={styles.tableResponsive}>
            <table className="table table-hover align-middle shadow-sm rounded bg-white">
              <thead>
                <tr>
                  <th className="responsive-text-sm" style={{ color: "#b5b7c0" }}>
                    Username
                  </th>
                  <th className="responsive-text-sm" style={{ color: "#b5b7c0" }}>
                    Email
                  </th>
                  <th className="responsive-text-sm" style={{ color: "#b5b7c0" }}>
                    Role
                  </th>
                  <th className="responsive-text-sm" style={{ color: "#b5b7c0" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSellers.map((seller) => (
                  <tr key={seller._id} className="responsive-text-sm">
                    <td style={styles.cellStyle}>{seller.username}</td>
                    <td style={styles.cellStyle}>{seller.email}</td>
                    <td style={styles.cellStyle}>
                      <button style={styles.roleButton(seller.role)}>{seller.role}</button>
                    </td>
                    <td style={{ verticalAlign: "middle", minWidth: "220px" }}>
                      <div className="d-flex flex-nowrap gap-1">
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => startNewChat(seller._id)}
                          style={{ width: "115px" }}
                        >
                          Chat
                        </button>
                        <Link
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleDetailsClick(seller)}
                        >
                          Details
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(seller.email, seller.username)}
                        >
                          Delete
                        </button>
                        {seller.role === "seller" && (
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleTagsClick(seller)}
                            style={{ width: "90px" }}
                          >
                            Tags
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
            <small className="text-muted responsive-text-sm text-center text-md-start">
              Showing {indexOfFirstSeller + 1} to {Math.min(indexOfLastSeller, filteredSellers.length)} of{" "}
              {filteredSellers.length} entries
            </small>

            <nav>
              <ul className="pagination mb-0 justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    &laquo;
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {selectedSeller && (
          <div style={styles.popup}>
            <div style={{
              ...styles.popupContent,
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 style={{ marginBottom: "0", color: "#EF5B2B" }}>
                  {selectedSeller.username}'s Details
                </h2>
                <button 
                  onClick={handleClosePopup} 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Basic User Information */}
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>Basic Information</h4>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Username:</strong> {selectedSeller.username}</p>
                    <p><strong>Email:</strong> {selectedSeller.email}</p>
                    <p><strong>Role:</strong> 
                      <span style={{ 
                        backgroundColor: roleColors[selectedSeller.role] || '#666',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        marginLeft: '8px',
                        fontSize: '12px'
                      }}>
                        {selectedSeller.role}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Address:</strong> {selectedSeller.address || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {selectedSeller.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Seller Profile Information */}
              {selectedSeller.role === 'seller' && (
                <div style={{ marginBottom: '20px' }}>
                  {loadingProfile ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p style={{ marginTop: '10px' }}>Loading seller profile...</p>
                    </div>
                  ) : sellerProfile ? (
                    <>
                      {/* Company Information */}
                      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                        <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>Company Information</h4>
                        <div className="row">
                          <div className="col-md-6">
                            <p><strong>Company Name:</strong> {sellerProfile.companyName || 'Not provided'}</p>
                            <p><strong>Business Type:</strong> {sellerProfile.businessType || 'Not provided'}</p>
                            <p><strong>Monthly Sales:</strong> {sellerProfile.monthlySales || 'Not provided'}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Office Address:</strong> {sellerProfile.officeAddress || 'Not provided'}</p>
                            <p><strong>Warehouse Address:</strong> {sellerProfile.warehouseAddress || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Description and Bio */}
                      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                        <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>About</h4>
                        <div style={{ marginBottom: '15px' }}>
                          <p><strong>Description:</strong></p>
                          <p style={{ 
                            backgroundColor: '#444', 
                            padding: '10px', 
                            borderRadius: '4px',
                            marginBottom: '0'
                          }}>
                            {sellerProfile.description || 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <p><strong>Bio:</strong></p>
                          <p style={{ 
                            backgroundColor: '#444', 
                            padding: '10px', 
                            borderRadius: '4px',
                            marginBottom: '0'
                          }}>
                            {sellerProfile.bio || 'Not provided'}
                          </p>
                        </div>
                      </div>

                      {/* Social Links */}
                      {sellerProfile.socialLinks && (
                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                          <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>Social Media Links</h4>
                          <div className="row">
                            <div className="col-md-4">
                              <p><strong>Facebook:</strong></p>
                              <a href={sellerProfile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                                 style={{ color: '#EF5B2B', wordBreak: 'break-all' }}>
                                {sellerProfile.socialLinks.facebook || 'Not provided'}
                              </a>
                            </div>
                            <div className="col-md-4">
                              <p><strong>Instagram:</strong></p>
                              <a href={sellerProfile.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                                 style={{ color: '#EF5B2B', wordBreak: 'break-all' }}>
                                {sellerProfile.socialLinks.instagram || 'Not provided'}
                              </a>
                            </div>
                            <div className="col-md-4">
                              <p><strong>LinkedIn:</strong></p>
                              <a href={sellerProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                                 style={{ color: '#EF5B2B', wordBreak: 'break-all' }}>
                                {sellerProfile.socialLinks.linkedin || 'Not provided'}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Profile Image */}
                      {sellerProfile.profileImageUrl && (
                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                          <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>Profile Image</h4>
                          <img 
                            src={sellerProfile.profileImageUrl} 
                            alt="Profile" 
                            style={{ 
                              maxWidth: '200px', 
                              maxHeight: '200px', 
                              borderRadius: '8px',
                              border: '2px solid #EF5B2B'
                            }}
                          />
                        </div>
                      )}

                      {/* Legal Documents */}
                      {sellerProfile.legalDocuments && sellerProfile.legalDocuments.length > 0 && (
                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                          <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>Legal Documents ({sellerProfile.legalDocuments.length})</h4>
                          <div className="d-flex flex-wrap gap-2">
                            {sellerProfile.legalDocuments.map((doc, idx) => (
                              <div key={idx} style={{ position: 'relative' }}>
                                {doc.type === 'application/pdf' ? (
                                  <div style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    border: '1px solid #555'
                                  }} onClick={() => window.open(doc.url, '_blank')}>
                                    <span style={{ color: '#EF5B2B', fontWeight: 'bold' }}>PDF</span>
                                  </div>
                                ) : (
                                  <img 
                                    src={doc.url} 
                                    alt={`Legal doc ${idx + 1}`}
                                    style={{
                                      width: '80px',
                                      height: '80px',
                                      objectFit: 'cover',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      border: '1px solid #555'
                                    }}
                                    onClick={() => window.open(doc.url, '_blank')}
                                  />
                                )}
                                <small style={{ 
                                  display: 'block', 
                                  textAlign: 'center', 
                                  marginTop: '4px',
                                  color: '#ccc',
                                  fontSize: '10px'
                                }}>
                                  {doc.name}
                                </small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CNIC Documents */}
                      {sellerProfile.cnicDocuments && sellerProfile.cnicDocuments.length > 0 && (
                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                          <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>CNIC Documents ({sellerProfile.cnicDocuments.length})</h4>
                          <div className="d-flex flex-wrap gap-2">
                            {sellerProfile.cnicDocuments.map((doc, idx) => (
                              <div key={idx} style={{ position: 'relative' }}>
                                {doc.type === 'application/pdf' ? (
                                  <div style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    border: '1px solid #555'
                                  }} onClick={() => window.open(doc.url, '_blank')}>
                                    <span style={{ color: '#EF5B2B', fontWeight: 'bold' }}>PDF</span>
                                  </div>
                                ) : (
                                  <img 
                                    src={doc.url} 
                                    alt={`CNIC doc ${idx + 1}`}
                                    style={{
                                      width: '80px',
                                      height: '80px',
                                      objectFit: 'cover',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      border: '1px solid #555'
                                    }}
                                    onClick={() => window.open(doc.url, '_blank')}
                                  />
                                )}
                                <small style={{ 
                                  display: 'block', 
                                  textAlign: 'center', 
                                  marginTop: '4px',
                                  color: '#ccc',
                                  fontSize: '10px'
                                }}>
                                  {doc.name}
                                </small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {sellerProfile.tags && sellerProfile.tags.length > 0 && (
                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                          <h4 style={{ color: '#EF5B2B', marginBottom: '15px' }}>Tags</h4>
                          <div className="d-flex flex-wrap gap-2">
                            {sellerProfile.tags.map((tag) => (
                              <span key={tag} style={{
                                backgroundColor: tag === 'verified' ? '#28a745' : 
                                             tag === 'registered' ? '#6c757d' : 
                                             tag === 'gold' ? '#ffc107' : '#6c757d',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                              }}>
                                {tag === 'verified' ? '✔ Verified' : 
                                 tag.charAt(0).toUpperCase() + tag.slice(1)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '20px', 
                      backgroundColor: '#333', 
                      borderRadius: '8px' 
                    }}>
                      <p>No seller profile found for this user.</p>
                    </div>
                  )}
                </div>
              )}

              <button onClick={handleClosePopup} style={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {showTagsModal && (
        <Modal show={showTagsModal} onHide={() => setShowTagsModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Assign Tags & Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Tags:</label>
              <div className="d-flex gap-2 flex-wrap">
                {tagOptions.map((tag) => (
                  <div key={tag.value} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`tag-${tag.value}`}
                      checked={tags.includes(tag.value)}
                      onChange={(e) => {
                        if (e.target.checked) setTags([...tags, tag.value]);
                        else setTags(tags.filter((t) => t !== tag.value));
                      }}
                    />
                    <label className="form-check-label" htmlFor={`tag-${tag.value}`}>{tag.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Role:</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="seller">Seller</option>
                <option value="user">User</option>
                <option value="QualityAssurance">QualityAssurance</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTagsModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleTagsSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ManageUsers;
