import { React, useState, useContext, useEffect } from "react";
import "./fullnavbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext.js";
import { Store } from "lucide-react";

export default function FullNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sellerLogo, setSellerLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: userId } = useContext(AuthContext);

  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch seller profile to get logo
  useEffect(() => {
    const fetchSellerProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/seller/profile?userId=${userId}`);
        const data = await response.json();
        
        if (data.seller && data.seller.profileImageUrl) {
          setSellerLogo(data.seller.profileImageUrl);
        }
      } catch (error) {
        console.error('Error fetching seller profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProfile();
  }, [userId]);

  return (
    <div className="container-navbar container-navbar">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          {/* Hamburger icon */}
          <button
            className="btn btn-outline-light me-2"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Navbar brand */}
          <div className="d-flex align-items-center">
            {/* Seller Logo or Store Icon */}
            {sellerLogo && !loading ? (
              <img
                src={sellerLogo}
                alt="Seller Logo"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                  border: "2px solid #EF5B2B"
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : (
              <Store 
                className="text-light" 
                size={40} 
                style={{
                  marginRight: "10px",
                  color: "#EF5B2B"
                }}
              />
            )}
            
            {/* Brand text */}
            <a 
              className="navbar-brand" 
              style={{
                fontSize: "14px"
              }} 
              href="#"
            >
              Tradxsell Seller Central
            </a>
          </div>

          {/* Navbar links */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <Link
                  className="nav-link text-light "
                  style={{ fontSize: "12px" }}
                  to="/admin/sellerdashboard/addproduct"
                >
                  Manage Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light "
                  style={{ fontSize: "12px" }}
                  to="/admin/sellerdashboard/orders"
                >
                  Manage Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light "
                  style={{ fontSize: "12px" }}
                  to="/admin/sellerdashboard/inventory"
                >
                  Manage Inventory System
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* hide this nav  */}
      <nav className="d-lg-none navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="d-flex flex-wrap justify-content-around">
          <Link
                  className="nav-link text-light "
                  style={{ fontSize: "12px" }}
                  to="/admin/sellerdashboard/addproduct"
                >
                  Manage Products
                </Link>
                <Link
                  className="nav-link text-light "
                  style={{ fontSize: "12px" }}
                  to="/admin/sellerdashboard/orders"
                >
                  Manage Orders
                </Link>
                <Link
                  className="nav-link text-light "
                  style={{ fontSize: "12px" }}
                  to="/admin/sellerdashboard/inventory"
                >
                  Manage Inventory System
                </Link>
          </div>
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          className="btn-close btn-close-white mt-3 ms-auto me-3"
          onClick={toggleSidebar}
        ></button>

        {/* Dashboard Title */}
        <div style={{ padding: "20px 20px 10px 20px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
          <h4 style={{ color: "white", margin: 0, fontSize: "18px", fontWeight: "bold" }}>
            Dashboard
          </h4>
        </div>

        <ul className="list-unstyled custom-sidebar-nav">
          {/* Main Links */}
          <li className="ps-0">
            <Link to="/admin/sellerdashboard" className="text-white">
              Seller Dashboard
            </Link>
          </li>
          <li className="ps-0">
            <Link to="/admin/sellerdashboard/addproduct" className="text-white">
              Manage Products
            </Link>
          </li>
          <li className="ps-0">
            <Link to="/admin/sellerdashboard/orders" className="text-white">
              Manage Orders
            </Link>
          </li>
          <li className="ps-0">
            <Link to='/admin/sellerdashboard/inventory'  className="text-white">
              Inventory Management System
            </Link>
          </li>
          <li className="ps-0">
            <Link to='/admin/sellerdashboard/complains'  className="text-white">
              Complian
            </Link>
          </li>
          <li className="ps-0">
            <Link to="/admin/sellerdashboard/feedbacks"  className="text-white">
              Custome Feedbacks
            </Link>
          </li>
          <li className="ps-0">
            <Link to="/admin/sellerdashboard"  className="text-white">
              Account Health
            </Link>
          </li>
          <li className="ps-0">
            <Link to="/admin/sellerdashboard"  className="text-white">
              Buyer Messages
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay to close sidebar */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
}
