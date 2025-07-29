import React, { useState, useEffect, useContext } from "react";
import tradxsell from "../../assets/tradxsell-black.png";
import { MdInventory } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";


const QualityAssuranceNavbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [activeComponent, setActiveComponent] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const userName = localStorage.getItem('username')


  const navigate = useNavigate();
  const location = useLocation();
  const Role = localStorage.getItem('role');

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

  useEffect(() => {
    // Set activeComponent based on current route
    if (location.pathname.includes("manageproducts")) {
      setActiveComponent("products");
    } else if (location.pathname.includes("sellercomplaints")) {
      setActiveComponent("complaints");
    }
  }, [location]);

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
      backgroundColor: "#fff",
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
      padding: "10px 0px",
      backgroundColor: isHovered ? "#ffe5dc" : "transparent",
      color: "#fb5420",
      border: "1px solid #fb5420",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: `${14 * fontSizeMultiplier}px`,
    },
    active: {
      backgroundColor: "#FB5420",
      borderRadius: "5px",
      color: "White",
      fontWeight: "bold",
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
          <Link to="/" style={styles.logo}>
            <img src={tradxsell} alt="TRADXSELL" style={{ height: "58px" }} />
          </Link>
          <h2 style={{ margin: "25px 0 10px 13px", fontSize: "20px", fontWeight: "bold" }}>
            Dashboard
          </h2>
          <div
            style={{
              ...styles.menuItem,
              ...(activeComponent === "products" ? styles.active : {}),
            }}
            onClick={() => {
              setActiveComponent("products");
              navigate("/quality/manageproducts");
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
              ...(activeComponent === "complaints" ? styles.active : {}),
            }}
            onClick={() => {
              setActiveComponent("complaints");
              navigate("/quality/sellercomplaints");
              if (isMobile) setIsSidebarVisible(false);
            }}
          >
            <span style={styles.menuLeft}>
              <FaTools style={{ width: "18px", marginRight: "8px" }} /> Seller Complaints
            </span>
            <SlArrowRight style={{ width: "12px", marginLeft: "auto", }} />
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
          <div style={styles.title}>QUALITY ASSURANCE</div>
          <div style={styles.user}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              roundedCircle
              width={35}
              height={35}
              alt={userName}
              className="me-3"
            />
            <div style={styles.textBlock}>
              <span style={styles.username}>{userName}</span>
              <br />
              <small style={styles.role}>{Role}</small>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px", flex: 1 }}>
          <Outlet />
        </div>
        {/* Rendered via Routes outside this component */}
      </div>
    </div>

  );
};

export default QualityAssuranceNavbar;
