import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import Logo from "../../../logo.png";
import { AuthContext } from "../../../AuthContext";
import CategorySection from "./Catagories";
import { useCart } from "../../../CartContext";
import { CurrencyContext } from "../../../CurrencyContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { loggedIn, handleLogout, role } = useContext(AuthContext);
  const { currency, updateCurrency, rates } = useContext(CurrencyContext);

  const toggleMenu = () => setShowMenu(!showMenu);
  useEffect(() => {
    if (type === "") return;
    const HandleLocalProducts = () => {
      navigate("/allproducts", { state: { filter: type } });
    };
    HandleLocalProducts();
  }, [type]);

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) setShowMenu(false);
  };
  const [showCategories, setShowCategories] = useState(false);
  const { cartCount } = useCart();

  // Simplified navbar for sellers and admins
  if (role === "MainAdmin" || role === "QualityAssurance" || role === "seller") {
    return (
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-dark set-navbar">
          <NavLink to="/" className="navbar-brand">
            <img src={Logo} alt="Logo" className="nav__logo-img" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={showMenu}
            aria-label="Toggle navigation"
          >
            <IoMenu />
          </button>
          <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  to="/home"
                  onClick={closeMenuOnMobile}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              {role === "seller" && (
                <li className="nav-item">
                  <NavLink
                    to="/sellerdashboard"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Seller Dashboard
                  </NavLink>
                </li>
              )}
              {role === "MainAdmin" && (
                <li className="nav-item">
                  <NavLink
                    to="/admin/dashboard"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              {role === "QualityAssurance" && (
                <li className="nav-item">
                  <NavLink
                    to="/quality/manageproducts"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Quality Dashboard
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: '0.5rem 1rem'
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="header">
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark set-navbar">
        <NavLink to="/" className="navbar-brand">
          <img src={Logo} alt="Logo" className="nav__logo-img" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={showMenu}
          aria-label="Toggle navigation"
        >
          <IoMenu />
        </button>
        <div
          className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item d-flex justify-content-center align-items-center">
            <div className="currency-converter">
            <label htmlFor="currency-selector">Currency:</label>
            <select
              id="currency-selector"
              value={currency}
              onChange={(e) => updateCurrency(e.target.value)}
            >
              {Object.keys(rates).map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          </li>
          <li className="nav-item d-flex justify-content-center align-items-center">
              <div className="d-flex mt-2 border rounded px-3">
                
                <p
                  className={` ${
                    type === "local"
                      ? "productTypeColor fw-bold mb-1"
                      : "text-muted fw-bold mb-1"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setType("local")}
                >
                  Local
                </p>
                <span className="ms-1 me-1">/</span>
                <p
                  className={`${
                    type === "international"
                      ? "productTypeColor fw-bold mb-1"
                      : "text-muted fw-bold mb-1"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setType("international")}
                >
                  International
                </p>
              </div>
            </li>
            <li className="nav-item">
              <NavLink
                to="/home"
                onClick={closeMenuOnMobile}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            {role === "seller" ? (
              <li className="nav-item">
                <NavLink
                  to="/admin/sellerdashboard"
                  onClick={closeMenuOnMobile}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Seller Dashboard
                </NavLink>
              </li>
            ) : role === "QualityAssurance" ? (
              <li className="nav-item">
                <NavLink
                  to="/quality/manageproducts"
                  onClick={closeMenuOnMobile}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/userorders"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Order
                  </NavLink>
                </li>
                {role === "user" ? (
                  <li className="nav-item">
                    <NavLink
                      to="/userdashboard"
                      onClick={closeMenuOnMobile}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <i
                        className="fa-solid fa-user"
                        style={{ color: "#EF5B2B", marginRight: "3px" }}
                      ></i>
                      Account
                    </NavLink>
                  </li>
                ) : null}
                <li className="nav-item position-relative">
                  <NavLink
                    to="/cart"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <FaShoppingCart />
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/chat"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chat-dots-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </NavLink>
                </li>
              </>
            )}
            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      `btn text-white fw-bold px-4 py-2 ${
                        isActive ? "active" : ""
                      }`
                    }
                    style={{
                      background:
                        "linear-gradient(90deg, #FB5420 44.4%, #C52F03 100%)",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    onClick={closeMenuOnMobile}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item"
              style={{
                color: "white",
                background:
                  "linear-gradient(90deg, #FB5420 44.4%, #C52F03 100%)",
                border: "none",
                borderRadius: "5px",
              }}
              >
                <button
                  className="nav-link"
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: '0.5rem 1rem'
                  }}
                >
                  Logout
                </button>
              </li>
            )}
            
            {/* Sub-navbar items for mobile - hidden on larger screens */}
            <li className="nav-item sub-nav-mobile">
              <div className="sub-nav-divider"></div>
              <h6 className="sub-nav-header">Categories & More</h6>
            </li>
            <li className="nav-item sub-nav-mobile">
              <NavLink
                to="#"
                onClick={() => {
                  setShowCategories(!showCategories);
                  closeMenuOnMobile();
                }}
                className={({ isActive }) => "nav-link sub-nav-link"}
              >
                All Categories
              </NavLink>
            </li>
            <li className="nav-item sub-nav-mobile">
              <NavLink
                to="/allproducts"
                onClick={closeMenuOnMobile}
                className={({ isActive }) => "nav-link sub-nav-link"}
              >
                All Products
              </NavLink>
            </li>
            <li className="nav-item sub-nav-mobile">
              <NavLink
                to="/helpCenter"
                onClick={closeMenuOnMobile}
                className={({ isActive }) => "nav-link sub-nav-link"}
              >
                Help Center
              </NavLink>
            </li>
            {role !== "seller" && role !== "QualityAssurance" && (
              <li className="nav-item sub-nav-mobile">
                <NavLink
                  to="/seller-register"
                  onClick={closeMenuOnMobile}
                  className={({ isActive }) => "nav-link sub-nav-link"}
                >
                  Become a seller
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Sub-Navbar - Only visible on larger screens */}
      <div className="sub-navbar desktop-only">
        <ul>
          <li
            onClick={() => setShowCategories(!showCategories)}
          >
            <NavLink to="#">All Categories</NavLink>
          </li>
          <li>
            <NavLink to="/allproducts">All Products</NavLink>
          </li>
          <li>
            <NavLink to="/helpCenter">Help Center</NavLink>
          </li>
          {role !== "seller" && role !== "QualityAssurance" && (
            <>
              <li>
                <NavLink to="/seller-register">Become a seller</NavLink>
              </li>
              <li>
                <NavLink to="/user/rfq" >
                  RFQ (Request for Quotation)
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Conditionally render CategorySection based on hover state */}
      {showCategories && (
        <CategorySection setShowCategories={setShowCategories} />
      )}
    </header>
  );
};

export default Navbar;