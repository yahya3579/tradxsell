// import React, { useState, useEffect, useContext } from "react";
// import tradxsell from "../../assets/tradxsell-black.png";
// import { FaUsers, FaUserTie, FaTools, FaCheckCircle } from "react-icons/fa";
// import { MdDashboard, MdInventory } from "react-icons/md";
// import { SlArrowRight } from "react-icons/sl";
// import { Link } from "react-router-dom";
// import DashboardStats from "../MainAdminV2/DashboardStats";
// import ManageProducts from "../MainAdminV2/ManageProducts";
// import ManageUsers from "../MainAdminV2/ManageUsers";
// import ManageComplains from "../MainAdminV2/ManageComplains";
// import QualityAssurance from "../MainAdminV2/QualityAssurance";
// import { AuthContext } from "../../AuthContext";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";

// const SellerDashboardV4 = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
//   const [isHovered, setIsHovered] = useState(false);
//   const [activeComponent, setActiveComponent] = useState("dashboard");
//   const { handleLogout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const getActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const handleResize = () => {
//       const isSmall = window.innerWidth < 992;
//       setIsMobile(isSmall);
//       setIsSidebarVisible(!isSmall);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev);
//   };

//   const fontSizeMultiplier = isMobile ? 0.9 : 1;

//   const styles = {
//     container: {
//       fontFamily: "Arial, sans-serif",
//       display: "flex",
//       height: "100vh",
//       backgroundColor: "#f3f3f3",
//       position: "relative",
//     },
//     sidebar: {
//       width: "250px",
//       backgroundColor: "#fff",
//       boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
//       display: isSidebarVisible ? "flex" : "none",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       padding: "20px 10px",
//       position: isMobile ? "absolute" : "relative",
//       zIndex: 10,
//       height: "100%",
//     },
//     closeIcon: {
//       position: "absolute",
//       top: "10px",
//       right: "10px",
//       backgroundColor: "transparent",
//       border: "none",
//       fontSize: `${20 * fontSizeMultiplier}px`,
//       cursor: "pointer",
//       color: "#fb5420",
//       display: isMobile ? "block" : "none",
//     },
//     logo: {
//       fontWeight: "bold",
//       fontSize: `${20 * fontSizeMultiplier}px`,
//       paddingBottom: "15px",
//     },
//     menuItem: {
//       padding: "10px 20px",
//       color: "#9197b3",
//       fontSize: `${14 * fontSizeMultiplier}px`,
//       cursor: "pointer",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     menuLeft: {
//       display: "flex",
//       alignItems: "center",
//     },
//     header: {
//       backgroundColor: "#fb5420",
//       color: "#fff",
//       padding: "15px 20px",
//       fontWeight: "bold",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     toggleButton: {
//       display: isMobile && !isSidebarVisible ? "block" : "none",
//       backgroundColor: "#fb5420",
//       border: "none",
//       color: "#fff",
//       padding: "8px 12px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       zIndex: 20,
//     },
//     title: {
//       fontWeight: "bold",
//       fontSize: `${18 * fontSizeMultiplier}px`,
//       textAlign: "center",
//       flex: 1,
//       marginRight: "10px",
//     },
//     user: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       textAlign: "right",
//       fontSize: `${14 * fontSizeMultiplier}px`,
//     },
//     profileImage: {
//       width: "32px",
//       height: "32px",
//       borderRadius: "50%",
//       objectFit: "cover",
//     },
//     textBlock: {
//       lineHeight: "1.2",
//     },
//     username: {
//       color: "black",
//       fontWeight: "bold",
//     },
//     role: {
//       color: "white",
//       fontSize: "0.8rem",
//     },
//     main: {
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       overflowX: "auto",
//     },
//     logout: {
//       marginTop: "auto",
//       padding: "10px 20px",
//       backgroundColor: isHovered ? "#ffe5dc" : "transparent",
//       color: isHovered ? "#fb5420" : "#fb5420",
//       border: "1px solid #fb5420",
//       borderRadius: "5px",
//       cursor: "pointer",
//       fontSize: `${14 * fontSizeMultiplier}px`,
//     },
//     activeMenuItem: {
//       backgroundColor: "#FB5420",
//       color: "white",
//       borderRadius: "8px",
//     },
//   };

//   const role = localStorage.getItem("role");
//   const userName = localStorage.getItem("username");

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         {isMobile && (
//           <button onClick={toggleSidebar} style={styles.closeIcon}>
//             ✖
//           </button>
//         )}
//         <div>
//           <Link to="/" style={styles.logo}>
//             <img src={tradxsell} alt="TRADXSELL" style={{ height: "48px" }} />
//           </Link>
//           <h2
//             style={{
//               margin: "10px 0 10px 13px",
//               fontSize: "20px",
//               fontWeight: "bold",
//             }}
//           >
//             Dashboard
//           </h2>
//           <div
//             style={{
//               ...styles.menuItem,
//               ...(getActive("/admin/sellerdashboard") ? styles.activeMenuItem : {}),
//             }}
//             onClick={() => {
//               navigate("/admin/sellerdashboard");
//               if (isMobile) setIsSidebarVisible(false);
//             }}
//           >
//             <span style={styles.menuLeft}>
//               <MdDashboard style={{ width: "18px", marginRight: "8px" }} />{" "}
//               Dashboard
//             </span>
//             <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
//           </div>
//           <div
//             style={{
//               ...styles.menuItem,
//               ...(getActive("/admin/sellerdashboard/addproduct") ? styles.activeMenuItem : {}),
//             }}
//             onClick={() => {
//               navigate("/admin/sellerdashboard/addproduct");
//               if (isMobile) setIsSidebarVisible(false);
//             }}
//           >
//             <span style={styles.menuLeft}>
//             <MdInventory style={{ width: "18px", marginRight: "8px" }} />{" "}
//               Manage Products
//             </span>
//             <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
//           </div>
//           <div
//             style={{
//               ...styles.menuItem,
//               ...(getActive("/admin/sellerdashboard/orders") ? styles.activeMenuItem : {}),
//             }}
//             onClick={() => {
//               navigate("/admin/sellerdashboard/orders");
//               if (isMobile) setIsSidebarVisible(false);
//             }}
//           >
//             <span style={styles.menuLeft}>
//             <FaUserTie style={{ width: "18px", marginRight: "8px" }} />{" "}
//               Manage Orders
//             </span>
//             <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
//           </div>
//           <div
//             style={{
//               ...styles.menuItem,
//               ...(getActive("/admin/sellerdashboard/inventory") ? styles.activeMenuItem : {}),
//             }}
//             onClick={() => {
//               navigate("/admin/sellerdashboard/inventory");
//               if (isMobile) setIsSidebarVisible(false);
//             }}
//           >
//             <span style={styles.menuLeft}>
//             <FaTools style={{ width: "18px", marginRight: "8px" }} /> {" "}
//               Inventory Management
//             </span>
//             <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
//           </div>
//           <div
//             style={{
//               ...styles.menuItem,
//               ...(getActive("/admin/sellerdashboard/complains") ? styles.activeMenuItem : {}),
//             }}
//             onClick={() => {
//               navigate("/admin/sellerdashboard/complains");
//               if (isMobile) setIsSidebarVisible(false);
//             }}
//           >
//             <span style={styles.menuLeft}>
//             <FaCheckCircle style={{ width: "18px", marginRight: "8px" }} />{" "}
//               Complains
//             </span>
//             <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
//           </div>
//           <div
//             style={{
//               ...styles.menuItem,
//               ...(getActive("/admin/sellerdashboard/feedbacks") ? styles.activeMenuItem : {}),
//             }}
//             onClick={() => {
//               navigate("/admin/sellerdashboard/feedbacks");
//               if (isMobile) setIsSidebarVisible(false);
//             }}
//           >
//             <span style={styles.menuLeft}>
//             <FaCheckCircle style={{ width: "18px", marginRight: "8px" }} />{" "}
//               Customer Feedbacks
//             </span>
//             <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
//           </div>
//           <div
//             style={{
//               ...styles.menuItem,
//               ...(getActive("/admin/sellerdashboard/salesdashboard") ? styles.activeMenuItem : {}),
//             }}
//             onClick={() => {
//               navigate("/admin/sellerdashboard/salesdashboard");
//               if (isMobile) setIsSidebarVisible(false);
//             }}
//           >
//             <span style={styles.menuLeft}>
//             <FaCheckCircle style={{ width: "18px", marginRight: "8px" }} />{" "}
//               Sales Analytics
//             </span>
//             <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
//           </div>
//         </div>
//         <button
//           style={styles.logout}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </div>

//       {/* Main Content */}
//       <div style={styles.main}>
//         <div style={styles.header}>
//           {isMobile && !isSidebarVisible && (
//             <button onClick={toggleSidebar} style={styles.toggleButton}>
//               ☰
//             </button>
//           )}
//           <div style={styles.title}>SELLER DASHBOARD</div>
//           <div style={styles.user}>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
//               alt="Profile"
//               style={styles.profileImage}
//             />
//             <div style={styles.textBlock}>
//               <span style={styles.username}>{userName}</span>
//               <br />
//               <small style={styles.role}>{role}</small>
//             </div>
//           </div>
//         </div>

//         {/* Render selected component */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default SellerDashboardV4;




import React, { useState, useEffect, useContext } from "react";
import tradxsell from "../../assets/tradxsell-black.png";
import {
  FaClipboardList,
  FaBoxes,
  FaExclamationTriangle,
  FaComments,
  FaChartLine,
  FaUserCog,
} from "react-icons/fa";
import { MdDashboard, MdInventory } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const SellerDashboardV4 = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isHovered, setIsHovered] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const getActive = (path) => location.pathname === path;

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
      marginTop: "0px",
      padding: "10px 20px",
      backgroundColor: isHovered ? "#ffe5dc" : "transparent",
      color: "#fb5420",
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
    chat: {
      marginTop: "auto",
      marginBottom: "10px",
      padding: "10px 0px",
      backgroundColor: "#FB5420",
      color: "white",
      border: "1px solid #fb5420",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: `${14 * fontSizeMultiplier}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    }
  };

  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("username");

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {isMobile && (
          <button onClick={toggleSidebar} style={styles.closeIcon}>
            ✖
          </button>
        )}
        <div>
          <h2 style={{ margin: "30px 0 10px 13px", fontSize: "20px", fontWeight: "bold" }}>
            Dashboard
          </h2>

          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/sellerdashboard") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/sellerdashboard");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <MdDashboard style={{ width: "18px", marginRight: "8px" }} /> Dashboard
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>

          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/sellerdashboard/addproduct") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/sellerdashboard/addproduct");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <MdInventory style={{ width: "18px", marginRight: "8px" }} /> Manage Products
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>

          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/sellerdashboard/orders") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/sellerdashboard/orders");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaClipboardList style={{ width: "18px", marginRight: "8px" }} /> Manage Orders
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>

          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/sellerdashboard/inventory") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/sellerdashboard/inventory");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaBoxes style={{ width: "18px", marginRight: "8px" }} /> Inventory Management
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>

          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/sellerdashboard/complains") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/sellerdashboard/complains");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaExclamationTriangle style={{ width: "18px", marginRight: "8px" }} /> Complains
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>

          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/sellerdashboard/feedbacks") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/sellerdashboard/feedbacks");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaComments style={{ width: "18px", marginRight: "8px" }} /> Customer Feedbacks
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>


          <div
            style={{
              ...styles.menuItem,
              ...(getActive("/sellerdashboard/accountsettings") ? styles.activeMenuItem : {}),
            }}
            onClick={() => {
              navigate("/sellerdashboard/accountsettings");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaUserCog style={{ width: "18px", marginRight: "8px" }} /> Account Settings
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto" }} />
          </div>
        </div>

        <button
          style={styles.chat}
          onClick={() => {

            navigate("/chat");
            if (isMobile) setIsSidebarVisible(false);
          }}
        >
          Chat
        </button>

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
          <div style={styles.title}>SELLER DASHBOARD</div>
          <div style={styles.user}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              alt="Profile"
              style={styles.profileImage}
            />
            <div style={styles.textBlock}>
              <span style={styles.username}>{userName}</span>
              <br />
              <small style={styles.role}>{role}</small>
            </div>
          </div>
        </div>

        {/* Render selected component */}
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboardV4;
