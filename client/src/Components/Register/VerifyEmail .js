



import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (hasVerified.current) return;
      hasVerified.current = true;

      // Show loading toast
      const loadingToast = toast.loading('Verifying your email...', {
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
        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/verify-email/${token}`);
        const data = await response.json();

        // Dismiss loading toast
        toast.dismiss(loadingToast);

        if (response.ok) {
          // Show success toast
          toast.success("Email verified successfully! Redirecting to login...", {
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

          setMessage(data.message);
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          // Show error toast
          const errorMessage = data.message || "Verification failed.";
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

          setMessage(errorMessage);
          setIsSuccess(false);
        }
      } catch (error) {
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

        setMessage("Something went wrong. Please try again.");
        setIsSuccess(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={styles.container}>
      {/* Toast Container */}
      <Toaster />
      
      <div style={styles.card}>
        <div style={styles.icon}>
          {isSuccess ? "✅" : "❌"}
        </div>
        <h2 style={styles.heading}>Email Verification</h2>
        <p style={{ 
          ...styles.message, 
          color: isSuccess ? "#28a745" : "#dc3545" 
        }}>
          {message}
        </p>
        {isSuccess && <p style={styles.redirect}>Redirecting to login in 5 seconds...</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f4f8",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    animation: "fadeIn 0.5s ease-in-out"
  },
  icon: {
    fontSize: "48px",
    marginBottom: "10px"
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#333"
  },
  message: {
    fontSize: "16px",
    margin: "15px 0",
    fontWeight: "500"
  },
  redirect: {
    fontSize: "14px",
    color: "#666",
    marginTop: "10px"
  }
};

export default VerifyEmail;
