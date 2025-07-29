import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext.js'; // adjust path as needed

const SellerComplainV2 = () => {
  const [complaint, setComplaint] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { email, role } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!complaint.trim()) {
      alert('Please enter your complaint before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_URL}/complaints/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            role,
            complaint: complaint.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Complaint submitted successfully!');
        setComplaint('');
        setMessage('');
      } else {
        setMessage(data.message || 'Failed to submit complaint');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    formCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      width: '100%',
      maxWidth: '500px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginBottom: '30px'
    },
    textarea: {
      width: '100%',
      minHeight: '200px',
      padding: '15px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      backgroundColor: '#fafafa',
      boxSizing: 'border-box'
    },
    submitBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff5722',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '20px'
    },
    message: {
      color: 'red',
      marginTop: '15px',
      textAlign: 'center',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Submit a Complaint</h2>
        <div>
          <textarea
            style={styles.textarea}
            placeholder="Enter your complaint here"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = '#007bff';
              e.target.style.backgroundColor = 'white';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.backgroundColor = '#fafafa';
            }}
          />
          <button
            type="button"
            style={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#e64a19';
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#ff5722';
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SellerComplainV2;
