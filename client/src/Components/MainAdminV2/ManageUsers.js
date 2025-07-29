// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Form, InputGroup } from "react-bootstrap";
// import { FaSearch } from "react-icons/fa";
// import ProductDetailsPopup from "../ProductDetailspopup";
// import { Link, useNavigate } from "react-router-dom";
// import { MdChat } from "react-icons/md";

// const ManageUsers = () => {
//   const [sellers, setSellers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSeller, setSelectedSeller] = useState(null);
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchSellers = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_LOCALHOST_URL}/users/admins`
//         );
//         setSellers(response.data);
//       } catch (error) {
//         console.error("Error fetching sellers:", error);
//       }
//     };
//     fetchSellers();
//   }, []);

//   const filteredSellers = sellers.filter((seller) =>
//     seller.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   console.log("filteredSellers", filteredSellers);
//   const handleDetailsClick = (seller) => {
//     setSelectedSeller(seller);
//   };

//   const handleClosePopup = () => {
//     setSelectedSeller(null);
//   };

//   const handleDelete = async (email) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_LOCALHOST_URL}/users/admins/${email}`
//       );
//       setSellers((prevSellers) =>
//         prevSellers.filter((seller) => seller.email !== email)
//       );
//     } catch (error) {
//       console.error("Error deleting seller:", error);
//     }
//   };

//   // Function to start a new chat
//   const senderId = localStorage.getItem("id");

//   const startNewChat = async (receiverId) => {
//     try {
//       // Hit the API to start a new chat
//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCALHOST_URL}/chat/start`,
//         {
//           senderId,
//           receiverId,
//         }
//       );

//       // If the chat is successfully created, navigate to the /chat page
//       if (response.data.chat) {
//         console.log("Chat started:", response.data.chat);
//         navigate(`/chat`); // Navigate to the chat page
//       } else {
//         console.error("Error creating chat:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error starting chat:", error);
//     }
//   };

//   const roleColors = {
//     user: "#4caf50",
//     seller: "#1976d2",
//     QualityAssurance: "#fb5420",
//   };

//   const styles = {
//     datetime: {
//       fontSize: "0.75rem",
//     },
//     cellStyle: {
//       padding: "5px",
//     },
//     tableResponsive: {
//       overflowX: "auto",
//       WebkitOverflowScrolling: "touch",
//     },
//     popup: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//     },
//     popupContent: {
//       backgroundColor: "#2c2c2c",
//       borderRadius: "8px",
//       padding: "20px",
//       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//       width: "90%",
//       maxWidth: "400px",
//       color: "white",
//     },
//     closeButton: {
//       backgroundColor: "#ef5b2b",
//       color: "#fff",
//       padding: "10px 15px",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//       marginTop: "20px",
//     },
//     textarea: {
//       width: "100%",
//       padding: "10px",
//       borderRadius: "5px",
//       border: "1px solid #333333",
//       marginBottom: "20px",
//       resize: "none",
//       backgroundColor: "#1a1a1a",
//       color: "#ffffff",
//     },
//     submitButton: {
//       backgroundColor: "#ef5b2b",
//       color: "#fff",
//       padding: "10px 15px",
//       border: "none",
//       borderRadius: "5px",
//       marginRight: "10px",
//       cursor: "pointer",
//     },
//     roleButton: (role) => ({
//       backgroundColor: roleColors[role] || "#121212",
//       color: "#fff",
//       border: "none",
//       padding: "5px 10px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       gap: "5px",
//       width: "140px",
//       justifyContent: "center",
//     }),
//   };

//   return (
//     <div>
//       <style>
//         {`
//            @media (max-width: 440px) {
//              .responsive-header {
//                flex-direction: column !important;
//                align-items: flex-start !important;
//                gap: 1rem;
//              }
//            }
   
//            @media (max-width: 576px) {
//              .responsive-text-sm {
//                font-size: 0.8rem;
//              }
//              .responsive-text-md {
//                font-size: 0.9rem;
//              }
//            }
   
//            @media (min-width: 577px) {
//              .responsive-text-sm {
//                font-size: 0.95rem;
//              }
//              .responsive-text-md {
//                font-size: 1.05rem;
//              }
//            }
//          `}
//       </style>

//       <div
//         style={{
//           backgroundColor: "white",
//           margin: "25px",
//           borderRadius: "30px",
//         }}
//       >
//         <div className="container p-4">
//           <div className="d-flex justify-content-between align-items-center mb-4 responsive-header">
//             <h4 className="mb-0 fw-bold responsive-text-md">All Users</h4>

//             <div className="d-flex align-items-center gap-2">
//               <InputGroup
//                 className="p-2 rounded bg-light"
//                 style={{ maxWidth: "300px" }}
//               >
//                 <InputGroup.Text className="bg-transparent border-0">
//                   <FaSearch style={{ color: "gray" }} />
//                 </InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search sellers..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="border-0 bg-transparent shadow-none responsive-text-sm"
//                   style={{ marginBottom: "0" }}
//                 />
//               </InputGroup>
//             </div>
//           </div>

//           <div style={styles.tableResponsive}>
//             <table className="table table-hover align-middle shadow-sm rounded bg-white">
//               <thead>
//                 <tr>
//                   <th
//                     className="responsive-text-sm"
//                     style={{ color: "#b5b7c0" }}
//                   >
//                     Username
//                   </th>
//                   <th
//                     className="responsive-text-sm"
//                     style={{ color: "#b5b7c0" }}
//                   >
//                     Email
//                   </th>
//                   <th
//                     className="responsive-text-sm"
//                     style={{ color: "#b5b7c0" }}
//                   >
//                     Role
//                   </th>
//                   <th
//                     className="responsive-text-sm"
//                     style={{ color: "#b5b7c0" }}
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSellers.map((seller) => (
//                   <tr key={seller._id} className="responsive-text-sm">
//                     <td style={styles.cellStyle}>{seller.username}</td>
//                     <td style={styles.cellStyle}>{seller.email}</td>
//                     <td style={styles.cellStyle}>
//                       <button style={styles.roleButton(seller.role)}>
//                         {seller.role}
//                       </button>
//                     </td>
//                     <td style={{ verticalAlign: "middle", minWidth: "220px" }}>
//                       <div className="d-flex flex-nowrap gap-1">
//                         <button
//                           className="btn btn-outline-warning btn-sm"
//                           onClick={() => startNewChat(seller?._id)}
//                           style={{ width: "115px" }}
//                         >
//                           Chat
//                         </button>
//                         <Link
//                           className="btn btn-outline-info btn-sm"
//                           onClick={() => handleDetailsClick(seller)}
//                         >
//                           Details
//                         </Link>
//                         <button
//                           className="btn btn-outline-danger btn-sm"
//                           onClick={() => handleDelete(seller.email)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
//             <small className="text-muted responsive-text-sm text-center text-md-start">
//               Showing data 1 to 8 of 256K entries
//             </small>

//             <nav>
//               <ul className="pagination mb-0 justify-content-center">
//                 <li className="page-item disabled">
//                   <button className="page-link" aria-label="Previous">
//                     &laquo;
//                   </button>
//                 </li>
//                 <li className="page-item active">
//                   <button className="page-link">1</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">2</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">3</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">4</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">... 40</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link" aria-label="Next">
//                     &raquo;
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>

//         {selectedSeller && (
//           <div style={styles.popup}>
//             <div style={styles.popupContent}>
//               <h2 style={{ marginBottom: "20px" }}>
//                 {selectedSeller.username}'s Details
//               </h2>
//               <p>Email: {selectedSeller.email}</p>
//               <p>Address: {selectedSeller.address}</p>
//               <p>Phone Number: {selectedSeller.phoneNumber}</p>
//               <button onClick={handleClosePopup} style={styles.closeButton}>
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ProductDetailsPopup from "../ProductDetailspopup";
import { Link, useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sellersPerPage = 10;

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

  const handleDetailsClick = (seller) => {
    setSelectedSeller(seller);
  };

  const handleClosePopup = () => {
    setSelectedSeller(null);
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
  const handleDelete = async (email) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    await axios.delete(
      `${process.env.REACT_APP_LOCALHOST_URL}/users/admins?email=${encodedEmail}`
    );
    setSellers((prevSellers) =>
      prevSellers.filter((seller) => seller.email !== email)
    );
  } catch (error) {
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

  return (
    <div>
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
                          onClick={() => handleDelete(seller.email)}
                        >
                          Delete
                        </button>
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
            <div style={styles.popupContent}>
              <h2 style={{ marginBottom: "20px" }}>{selectedSeller.username}'s Details</h2>
              <p>Email: {selectedSeller.email}</p>
              <p>Address: {selectedSeller.address}</p>
              <p>Phone Number: {selectedSeller.phoneNumber}</p>
              <button onClick={handleClosePopup} style={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
