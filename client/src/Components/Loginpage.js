import { faEnvelope, faEye, faEyeSlash, faLock, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

// Import Google icon
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login({ setIsRegister, setIsForgotPassword }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { handleLogin } = useContext(AuthContext);

    const handleLoginValidation = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            const data = await response.json();
    
            if (data.success) {
                handleLogin(data.user.email, data.user.username, data.user.role, data.user.id);
    
                // Redirect based on the role
                if (data.user.role === 'user') {
                    window.location.href = '/';
                } else if (data.user.role === 'seller') {
                    window.location.href = '/admin/sellerdashboard';
                }
                else if (data.user.role === 'MainAdmin') {
                    window.location.href = '/admin/checksellers';
                }
                else if (data.user.role === 'QualityAssurance') {
                    window.location.href = '/quality/manageproducts';
                }
            } else {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    };

    const handleReturnHome = () => {
        window.location.href = '/';
    };
    
    const styles = {
        container: {
            display: 'flex',
            minHeight: '100vh',
        },
        leftSide: {
            flex: 1,
            backgroundColor: '#EF5D2E',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
        },
        logo: {
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
        },
        tagline: {
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginTop: 'auto',
            marginBottom: '6rem',
            maxWidth: '80%',
        },
        trianglePattern: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '40%',
            opacity: 0.2,
        },
        rightSide: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 3rem',
            backgroundColor: 'white',
        },
        topNav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
        },
        returnLink: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#666',
            cursor: 'pointer',
            textDecoration: 'none',
        },
        signUpText: {
            fontSize: '0.875rem',
            color: '#666',
        },
        signUpLink: {
            color: '#EF5D2E',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginLeft: '0.25rem',
        },
        formContent: {
            maxWidth: '450px',
            margin: '0 auto',
            width: '100%',
        },
        loginHeader: {
            fontWeight: 'bold',
            fontSize: '2rem',
            color: '#EF5D2E',
            marginBottom: '0.5rem',
        },
        loginSubheader: {
            color: '#666',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
        },
        googleButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: '#FEE1D9',
            color: '#333',
            padding: '0.75rem',
            borderRadius: '2rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            width: '100%',
        },
        divider: {
            display: 'flex',
            alignItems: 'center',
            color: '#666',
            fontSize: '0.75rem',
            margin: '1rem 0 1.5rem',
        },
        line: {
            flex: 1,
            height: '1px',
            backgroundColor: '#eee',
            margin: '0 0.5rem',
        },
        formGroup: {
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            fontSize: '0.7rem',
            color: '#666',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #eee',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            backgroundColor: '#f9f9f9',
        },
        continueButton: {
            backgroundColor: '#EF5D2E',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '0.25rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: 'medium',
            cursor: 'pointer',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1.5rem',
        },
        arrowIcon: {
            marginLeft: '0.5rem',
        },
        signupFooter: {
            textAlign: 'center',
            margin: '1.5rem 0',
            fontSize: '0.875rem',
            color: '#666',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#666',
            marginTop: 'auto',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
        },
        helpText: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        alert: {
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#fed7d7',
            color: '#9b2c2c',
            borderRadius: '0.375rem',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSide}>
                <div style={styles.logo}>TRADXSELL</div>
                <div style={styles.tagline}>
                    Uncover Millions of products from reputable Suppliers-sign up now!
                </div>
                <div style={styles.trianglePattern}>
                    {/* This would be best implemented with an actual SVG or image */}
                </div>
            </div>
            <div style={styles.rightSide}>
                <div style={styles.topNav}>
                    <div style={styles.returnLink} onClick={handleReturnHome}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Return Home
                    </div>
                    <div style={styles.signUpText}>
                        Don't have an account yet? <span style={styles.signUpLink} onClick={() => setIsRegister(true)}>SIGN UP NOW</span>
                    </div>
                </div>
                
                <div style={styles.formContent}>
                    <div style={styles.loginHeader}>Login In</div>
                    <div style={styles.loginSubheader}>Login in your Account.</div>
                    
                    <button style={styles.googleButton}>
                        <FontAwesomeIcon icon={faGoogle} /> Log in with Google
                    </button>
                    
                    <div style={styles.divider}>
                        <div style={styles.line}></div>
                        <span>Or use Email</span>
                        <div style={styles.line}></div>
                    </div>
                    
                    <form onSubmit={handleLoginValidation}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                placeholder="johndoe@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        
                        <button type="submit" style={styles.continueButton}>
                            CONTINUE <FontAwesomeIcon icon={faArrowRight} style={styles.arrowIcon} />
                        </button>
                    </form>
                    
                    {showAlert && (
                        <div style={styles.alert}>
                            Invalid email or password. Please try again.
                        </div>
                    )}
                    
                    <div style={styles.signupFooter}>
                        Are you new here? <span style={styles.signUpLink} onClick={() => setIsRegister(true)}>Sign Up Now</span>
                    </div>
                    
                    <div style={styles.footer}>
                        <div>Copyright 2023 - 2024 TradXsell Inc. All Rights Reserved</div>
                        <div style={styles.helpText}>
                            Need help?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;