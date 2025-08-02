import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import side from "../../assets/sidebar-bg.png";
import triangle from "../../assets/logosidebar.png";
import logo from "../../assets/logosid.png";
import { FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleRegisterValidation = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Show loading toast
    const loadingToast = toast.loading('Creating your account...', {
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
        `${process.env.REACT_APP_LOCALHOST_URL}/users/addnew`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username,
            address,
            phoneNumber,
            role: "user",
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        // Show success toast
        toast.success("Registration successful! Please check your email to verify your account.", {
          duration: 4000,
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

        setSuccessMessage(
          "You are registered successfully! Please check your email to verify your account."
        );
        setError("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      } else {
        if (data.error) {
          setError(data.error);
          
          // Show error toast
          toast.error(data.error, {
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

          if (data.error.includes("not verified")) {
            setShowResend(true);
          } else {
            setShowResend(false);
          }
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
      
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

      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    
    // Show loading toast
    const loadingToast = toast.loading('Sending verification email...', {
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
      const response = await axios.post(
        `${process.env.REACT_APP_LOCALHOST_URL}/users/resend-verification`,
        { email },
        { withCredentials: true }
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.data.message) {
        // Show success toast
        toast.success("Verification email resent. Please check your inbox.", {
          duration: 4000,
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
        setShowResend(false);
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      toast.error("Failed to resend verification. Try again later.", {
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
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Toast Container */}
      <Toaster />
      
      {/* Sidebar Section */}
      <div className="login-left-side">
        <div className="login-logo">
          <img src={logo} className="imglogo" alt="Logo" />
        </div>
        <div className="login-tagline">
          Uncover Millions of products from reputable Suppliers—sign up now!
        </div>
        <div className="login-triangle-pattern">
          <img src={triangle} alt="Triangle Pattern" />
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="signup-content">
        <div className="signup-container">
          <h2>Sign Up</h2>
          <h6>Create your Account</h6>

          <form onSubmit={handleRegisterValidation} className="signup-form">
            <div>
              <p
                style={{
                  textAlign: "left",
                  marginBottom: "4px",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                User Name
              </p>
              <input
                type="text"
                value={username}
                placeholder="john doe"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <p
                style={{
                  textAlign: "left",
                  marginBottom: "4px",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Email
              </p>
              <input
                type="email"
                value={email}
                placeholder="doe@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ position: "relative" }}>
              <p
                style={{
                  textAlign: "left",
                  marginBottom: "4px",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Password
              </p>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "35px",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div>
              <p
                style={{
                  textAlign: "left",
                  marginBottom: "4px",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Address
              </p>
              <input
                type="text"
                value={address}
                placeholder="Street No..."
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <p
                style={{
                  textAlign: "left",
                  marginBottom: "4px",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Phone Number
              </p>
              <input
                type="text"
                value={phoneNumber}
                placeholder="+121-2112-12"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {loading ? (
              <button type="button" disabled className="loading-btn">
                Registering...
              </button>
            ) : (
              <button type="submit">Register</button>
            )}

            {/* <button type="submit">Register</button> */}
          </form>

          {error && <div className="login-error-alert">{error}</div>}
          {successMessage && (
            <div className="login-success-alert">{successMessage}</div>
          )}

          {/* {showResend && (
            <div
              className="resend-section"
              style={{ marginTop: "10px", textAlign: "center" }}
            >
              <button
                onClick={handleResendVerification}
                className="resend-button"
                style={{
                  marginTop: "5px",
                  padding: "8px 16px",
                  backgroundColor: "#EF5B2B",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Resend Verification Email
              </button>
            </div>
          )} */}

          {showResend && (
            <div
              className="resend-section"
              style={{ marginTop: "10px", textAlign: "center" }}
            >
              <button
                onClick={handleResendVerification}
                className="resend-button"
                disabled={resendLoading}
                style={{
                  marginTop: "5px",
                  padding: "8px 16px",
                  backgroundColor: resendLoading ? "#ccc" : "#EF5B2B",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: resendLoading ? "not-allowed" : "pointer",
                }}
              >
                {resendLoading ? "Sending..." : "Resend Verification Email"}
              </button>
            </div>
          )}

          <p className="account-info-text">
            Already have an account?{" "}
            <Link className="account-info-text-link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
