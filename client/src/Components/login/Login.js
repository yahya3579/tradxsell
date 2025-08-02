import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import "./login.css"; // Will be creating new login.css file
import triangle from "../../assets/logosidebar.png";
import logo from "../../assets/logosid.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleLoginValidation = async (event) => {
    event.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading('Logging in...', {
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
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

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

          // Show error toast
          toast.error("You are not authorized to log in from this page.", {
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

          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
          return;
        }
        
        // Show success toast
        toast.success("Login successful! Redirecting...", {
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
        // Show error toast
        toast.error("Invalid email or password. Please try again.", {
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

        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show network error toast
      toast.error("Network error. Please try again later.", {
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
      {/* Toast Container */}
      <Toaster />
      
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
