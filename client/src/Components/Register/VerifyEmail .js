// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const VerifyEmail = () => {
//   const { token } = useParams();
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/verify-email/${token}`);
//         const data = await response.json();
//         if (response.ok) {
//           setMessage(data.message);
//           setTimeout(() => {
//             navigate("/login");
//           }, 3000);
//         } else {
//           setMessage(data.error);
//         }
//       } catch (error) {
//         setMessage("Something went wrong. Please try again.");
//       }
//     };

//     verifyEmail();
//   }, [token, navigate]);

//   return (
//     <div>
//       <h2>Email Verification</h2>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default VerifyEmail;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const VerifyEmail = () => {
//   const { token } = useParams();
//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/verify-email/${token}`);
//         const data = await response.json();

//         if (response.ok) {
//           setMessage(data.message);
//           setIsSuccess(true);
//           setTimeout(() => {
//             navigate("/login");
//           }, 5000); // Delay redirect by 5 seconds
//         } else {
//           setMessage(data.message || "Verification failed.");
//           setIsSuccess(false);
//         }
//       } catch (error) {
//         setMessage("Something went wrong. Please try again.");
//         setIsSuccess(false);
//       }
//     };

//     verifyEmail();
//   }, [token, navigate]);

//   return (
//     <div style={styles.container}>
//       <h2>Email Verification</h2>
//       <p style={{ 
//         ...styles.message, 
//         color: isSuccess ? "green" : "red" 
//       }}>
//         {message}
//       </p>
//       {isSuccess && <p>You will be redirected to the login page shortly...</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "500px",
//     margin: "100px auto",
//     padding: "20px",
//     textAlign: "center",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     backgroundColor: "#fff",
//     fontFamily: "Arial, sans-serif"
//   },
//   message: {
//     fontSize: "16px",
//     margin: "20px 0"
//   }
// };

// export default VerifyEmail;





// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const VerifyEmail = () => {
//   const { token } = useParams();
//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const navigate = useNavigate();
//   const hasVerified = useRef(false); // ✅ Prevent multiple API calls

//   useEffect(() => {
//     const verifyEmail = async () => {
//       if (hasVerified.current) return; // ✅ Prevent re-verification
//       hasVerified.current = true;

//       try {
//         const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/verify-email/${token}`);
//         const data = await response.json();

//         if (response.ok) {
//           setMessage(data.message);
//           setIsSuccess(true);
//           setTimeout(() => {
//             navigate("/login");
//           }, 5000);
//         } else {
//           // Show error message only if it’s the first response
//           setMessage(data.message || "Verification failed.");
//           setIsSuccess(false);
//         }
//       } catch (error) {
//         setMessage("Something went wrong. Please try again.");
//         setIsSuccess(false);
//       }
//     };

//     verifyEmail();
//   }, [token, navigate]);

//   return (
//     <div style={styles.container}>
//       <h2>Email Verification</h2>
//       <p style={{ 
//         ...styles.message, 
//         color: isSuccess ? "green" : "red" 
//       }}>
//         {message}
//       </p>
//       {isSuccess && <p>You will be redirected to the login page shortly...</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "500px",
//     margin: "100px auto",
//     padding: "20px",
//     textAlign: "center",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     backgroundColor: "#fff",
//     fontFamily: "Arial, sans-serif"
//   },
//   message: {
//     fontSize: "16px",
//     margin: "20px 0"
//   }
// };

// export default VerifyEmail;



import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

      try {
        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/verify-email/${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setMessage(data.message || "Verification failed.");
          setIsSuccess(false);
        }
      } catch (error) {
        setMessage("Something went wrong. Please try again.");
        setIsSuccess(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={styles.container}>
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
