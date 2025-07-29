import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./login.css"; // Will be creating new login.css file
import triangle from "../../assets/logosidebar.png";
import logo from "../../assets/logosid.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleLoginValidation = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, role }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setError("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
      } else {
        if (data.error) {
          setError(data.error);
        }
      }

      if (data.success) {
        const allowedRoles = ["user", "MainAdmin", "QualityAssurance"]; // Allowed roles for this login page
        if (!allowedRoles.includes(data.user.role)) {
          setError("You are not authorized to log in from this page.");

          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
          return;
        }
        setSuccessMessage("Login successfully!");
        handleLogin(
          data.user.email,
          data.user.username,
          data.user.role,
          data.user.id
        );

        // Redirect based on the role
        if (data.user.role === "user") {
          window.location.href = "/";
        } else if (data.user.role === "MainAdmin") {
          window.location.href = "/admin/dashboard";
        } else if (data.user.role === "QualityAssurance") {
          window.location.href = "/quality/manageproducts";
        }
      } else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
    console.log("Google login clicked");
  };

  return (
    <div className="login-page-container">
      <div className="login-left-side">
        <div className="login-logo">
          <img src={logo} className="imglogo" />
        </div>
        <div className="login-tagline">
          Uncover Millions of products from reputable Suppliers-sign up now!
        </div>
        <div className="login-triangle-pattern">
          {" "}
          <img src={triangle}></img>{" "}
        </div>
      </div>

      <div className="login-right-side">
        <div className="login-top-nav">
          <div className="login-return-link" onClick={handleReturnHome}>
            <FaArrowLeft /> Return Home
          </div>
          <div className="login-signup-text">
            Don't have an account yet?{" "}
            <Link to="/register" className="login-signup-link">
              SIGN UP NOW
            </Link>
          </div>
        </div>

        <div className="login-form-content">
          <div className="login-header">Log In</div>
          <div className="login-subheader">Login in your Account.</div>

          {/* <button className="login-google-button" onClick={handleGoogleLogin}>
            <FaGoogle /> Log in with Google
          </button> */}

          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span> use Email</span>
            <div className="login-divider-line"></div>
          </div>

          <form onSubmit={handleLoginValidation}>
            <div className="login-form-group">
              <label className="login-label">EMAIL</label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>

            <div className="login-form-group">
              <label className="login-label">PASSWORD</label>
              <div className="login-password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                />
                <span
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="login-form-group">
              <label className="login-label">ROLE</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="login-input"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="MainAdmin">Main Admin</option>
                <option value="QualityAssurance">Quality Assurance</option>
              </select>
            </div>

            <button type="submit" className="login-continue-button">
              CONTINUE <FaArrowRight className="login-arrow-icon" />
            </button>

            <button
              type="button"
              className="login-continue-button"
              onClick={() => navigate("/login/seller")}
            >
              Seller Login <FaArrowRight className="login-arrow-icon" />
            </button>
          </form>

          {successMessage && (
            <div className="login-success-alert">{successMessage}</div>
          )}

          {showAlert && (
            <div className="login-error-alert">
              Invalid email or password. Please try again.
            </div>
          )}

          <div className="login-signup-footer">
            Are you new here?{" "}
            <Link to="/register" className="login-signup-link">
              Sign Up Now
            </Link>
          </div>

          <div className="login-footer">
            <div>Copyright 2023 - 2024 TradXsell Inc. All Rights Reserved</div>
            <div className="login-help-text">Need help?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
