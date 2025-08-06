import React, { useState, useEffect, useContext } from "react";
import tradxsell from "../../assets/tradxsell-black.png";
import { FaUsers, FaUserTie, FaTools, FaCheckCircle } from "react-icons/fa";
import { MdDashboard, MdInventory } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import DashboardStats from "./DashboardStats";
import ManageProducts from "./ManageProducts";
import ManageUsers from "./ManageUsers";
import ManageComplains from "./ManageComplains";
import QualityAssurance from "./QualityAssurance";
import { AuthContext } from "../../AuthContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isHovered, setIsHovered] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const { handleLogout, loggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const getActive = (path) => location.pathname === path;

  useEffect(() => {
    if (!loggedIn || role !== 'MainAdmin') {
      navigate('/login', { replace: true });
    }
  }, [loggedIn, role, navigate]);

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
      paddingTop: "80px", // Prevent overlap with fixed navbar
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
            <img src={tradxsell} alt="TRADXSELL" style={{ height: "48px" }} />
          </Link>
          <h2
            style={{
              margin: "10px 0 10px 13px",
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
            <FaUserTie style={{ width: "18px", marginRight: "8px" }} />{" "}
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
            <FaTools style={{ width: "18px", marginRight: "8px" }} /> {" "}
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
          <Link
  to="/admin/rfq"
  className="btn fw-bold mb-2"
  style={{
    background: "linear-gradient(90deg, #FB5420 44.4%, #C52F03 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "1rem",
    boxShadow: "0 2px 8px rgba(251, 84, 32, 0.08)",
    marginTop: "10px",
    width: "100%",
    textAlign: "center",
  }}
>
  RFQ Management
</Link>
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
          <div style={styles.title}>ADMIN DASHBOARD</div>
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

export default AdminDashboard;
