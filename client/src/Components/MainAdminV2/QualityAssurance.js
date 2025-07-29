import { faEnvelope, faHome, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QualityAssurance({ setIsRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
      const checkScreen = () => setIsSmallScreen(window.innerWidth <= 600);
      checkScreen();
      window.addEventListener('resize', checkScreen);
      return () => window.removeEventListener('resize', checkScreen);
  }, []);
    const handleRegisterValidation = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/addnew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username, address, phoneNumber, role: 'QualityAssurance' }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("You are registered successfully!");
                setError("");

                setTimeout(() => {
                    setSuccessMessage("");
                    navigate('/admin/dashboard');
                }, 1000);
            } else {
                if (data.error) {
                    setError(data.error);
                }
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError("An error occurred. Please try again.");
        }
    };

    const styles = {
      container: {
        display: 'flex',
        minHeight: isSmallScreen ? '110vh' : '90vh',
        backgroundColor: 'rgb(238, 233, 233)',
    },
        sideNav: {
            width: '240px',
        },
        content: {
            flex: 1,
            transition: 'margin-left 0.3s ease',
            margin: '20px',
            backgroundColor:'white',
            borderRadius: '15px',
          
        },
        formBox: {
            paddingTop:'50px',
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
           
            borderRadius: '8px',
            margin: '0 auto',
        },
        header: {
            marginBottom: '1.2rem',
            textAlign: 'center',
            fontSize: '1.875rem',
            fontWeight: '600',
            color: '#EF5D2E',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        inputContainer: {
            position: 'relative',
        },
        input: {
            width: '100%',
            padding: '0.5rem 0.75rem',
            paddingLeft: '2.5rem',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            backgroundColor:'#F5F5F5'
        },
        icon: {
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0',
        },
        button: {
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#FB5420',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '.9rem',
            cursor: 'pointer',
        },
        alert: {
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#fed7d7',
            color: '#9b2c2c',
            borderRadius: '0.375rem',
        },
        success: {
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#c6f6d5',
            color: '#2f855a',
            borderRadius: '0.375rem',
        },
        registerMessage: {
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#4a5568',
        },
        registerLink: {
            color: '#EF5B2B',
            cursor: 'pointer',
        },
    };

    return (
        <>
        <div style={styles.container}>
        
            <div style={{...styles.content}}>
            <h4 style={{color:"black" , padding:"20px", paddingBottom:'0px', fontWeight:"bold", fontSize:'16.4px'}}>Add Q/A</h4>
                <div style={{ padding: '0rem' }}>
                <div style={{...styles.formBox }}>
                    <div style={styles.header}>
                    Add Quality Assurance
                    </div>
                    {error && <div style={styles.alert}>{error}</div>}
                    {successMessage && <div style={styles.success}>{successMessage}</div>}
                    
                    <form onSubmit={handleRegisterValidation} style={styles.form}>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                        </div>
                        <button type="submit" style={styles.button}>
                            Register
                        </button>
                    </form>
                    
                </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default QualityAssurance;
