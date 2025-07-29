import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SellerRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterValidation = async (event) => {
    event.preventDefault();
    const currRole = localStorage.getItem("role");
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
            role: "seller",
            currRole,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("You are registered successfully!");
        setError("");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 1000);
      } else {
        if (data.error) {
          setError(data.error);
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f7fafc",
    },
    formBox: {
      width: "100%",
      maxWidth: "400px",
      padding: "2rem",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      marginBottom: "1rem",
      border: "1px solid #F5F5F5",
      borderRadius: "0.375rem",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#EF5B2B",
      color: "white",
      border: "none",
      borderRadius: "0.375rem",
      fontSize: "1rem",
      cursor: "pointer",
    },
    alert: {
      marginTop: "1rem",
      padding: "0.5rem",
      backgroundColor: "#fed7d7",
      color: "#9b2c2c",
      borderRadius: "0.375rem",
    },
    success: {
      marginTop: "1rem",
      padding: "0.5rem",
      backgroundColor: "#c6f6d5",
      color: "#2f855a",
      borderRadius: "0.375rem",
    },
    registerMessage: {
      marginTop: "1rem",
      fontSize: "0.875rem",
      color: "#4a5568",
    },
    registerLink: {
      color: "#EF5B2B",
      cursor: "pointer",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={{padding:"20px"}}>Create Seller Account</h2>
        {error && <div style={styles.alert}>{error}</div>}
        {successMessage && <div style={styles.success}>{successMessage}</div>}
        <form onSubmit={handleRegisterValidation}>
          <input
            type="text"
            name="Username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="address"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="Phone-Number"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.registerMessage}>
          Already have an account?{" "}
          <Link to="/login" style={styles.registerLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SellerRegister;
