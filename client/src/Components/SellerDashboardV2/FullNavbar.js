import { React, useState } from "react";
import "./fullnavbar.css";
import { Link } from "react-router-dom";

export default function FullNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
          <a className="navbar-brand" style={{fontSize: "14px"}} href="#">
            Tradxsell Seller Central
          </a>

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
            <Link to="/admin/sellerdashboard/salesdashboard"  className="text-white">
              Sales
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
