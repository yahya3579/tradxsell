import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext.js";
import styles from "./SellerComplain.module.css";

function SellerComplain() {
  const [complaint, setComplaint] = useState("");
  const { email,role, username: sellerusername } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_URL}/complaints/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email,role, complaint }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Complaint submitted successfully");
      } else {
        setMessage(data.message || "Failed to submit complaint");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }

    setComplaint("");
  };

  return (
    <div className={styles.container}>
      <main className={styles.contentMain}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>Complaint</h2>
          <div className={styles.headerUser}>
            <span className={styles.userName}>{sellerusername}</span>
            <div className={styles.userAvatar}>
              {sellerusername.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.ComplainBox}>
            <h1 className={styles.title}>Submit a Complaint</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                placeholder="Enter your complaint"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows="5"
                className={styles.textarea}
              />
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SellerComplain;
