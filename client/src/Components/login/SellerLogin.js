import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import "./login.css"; // Reuse styling
import triangle from "../../assets/logosidebar.png";
import logo from "../../assets/logosid.png";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleLoginValidation = async (event) => {
    event.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading('Logging in as seller...', {
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
          body: JSON.stringify({ email, password, role: "seller" }),
          credentials: "include",
        }
      );

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok && data.success) {
        if (data.user.role !== "seller") {
          setError("You are not authorized to log in as a seller.");
          
          // Show error toast
          toast.error("You are not authorized to log in as a seller.", {
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
          setTimeout(() => setShowAlert(false), 4000);
          return;
        }

        // Show success toast
        toast.success("Seller login successful! Redirecting...", {
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

        // Redirect to seller dashboard
        // window.location.href = "/admin/sellerdashboard";
        window.location.href = "/sellerdashboard";
      } else {
        const errorMessage = data.error || "Invalid credentials";
        setError(errorMessage);
        
        // Show error toast
        toast.error(errorMessage, {
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
        setTimeout(() => setShowAlert(false), 4000);
      }
    } catch (error) {
      console.error("Login error:", error);
      
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
      setTimeout(() => setShowAlert(false), 4000);
    }
  };

    return (
    <div className="login-page-container">
      {/* Toast Container */}
      <Toaster />
      
      <div className="login-left-side">
        <div className="login-logo"><img src={logo} className="imglogo" /></div>
        <div className="login-tagline">Seller Portal – Login to manage your store!</div>
        <div className="login-triangle-pattern"><img src={triangle} alt="pattern" /></div>
      </div>

      <div className="login-right-side">
        <div className="login-top-nav">
          <div className="login-return-link" onClick={() => navigate("/")}>
            <FaArrowLeft /> Return Home
          </div>
          <div className="login-signup-text">
            Don't have a seller account?{" "}
            <Link to="/register" className="login-signup-link">SIGN UP NOW</Link>
          </div>
        </div>

        <div className="login-form-content">
          <div className="login-header">Seller Login</div>
          <div className="login-subheader">Access your seller dashboard.</div>

          <form onSubmit={handleLoginValidation}>
            <div className="login-form-group">
              <label className="login-label">EMAIL</label>
              <input
                type="email"
                placeholder="seller@example.com"
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
          </form>

          {successMessage && <div className="login-success-alert">{successMessage}</div>}
          {showAlert && <div className="login-error-alert">{error}</div>}

          <div className="login-signup-footer">
            Are you new here?{" "}
            <Link to="/register" className="login-signup-link">Sign Up Now</Link>
          </div>

          <div className="login-footer">
            <div>© 2023-2024 TradXsell Inc. All Rights Reserved</div>
            <div className="login-help-text">Need help?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
