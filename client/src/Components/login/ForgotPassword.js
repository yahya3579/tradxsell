import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './login.css';
import triangle from '../../assets/logosidebar.png';
import logo from '../../assets/logosid.png';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Reset link sent if the email exists.', { position: 'top-center' });
      } else {
        toast.error(data.error || 'Request failed', { position: 'top-center' });
      }
    } catch (e) {
      toast.error('Network error', { position: 'top-center' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      <Toaster />
      <div className="login-left-side">
        <div className="login-logo">
          <img src={logo} className="imglogo" />
        </div>
        <div className="login-tagline">Reset your password securely.</div>
        <div className="login-triangle-pattern"><img src={triangle} alt="pattern" /></div>
      </div>

      <div className="login-right-side">
        <div className="login-top-nav">
          <div className="login-return-link" onClick={() => navigate('/')}> 
            <FaArrowLeft /> Return Home
          </div>
          <div className="login-signup-text">
            Remembered your password? <Link to="/login" className="login-signup-link">Go to Login</Link>
          </div>
        </div>

        <div className="login-form-content">
          <div className="login-header">Forgot Password</div>
          <div className="login-subheader">Enter your email to receive a reset link.</div>

          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span> use Email</span>
            <div className="login-divider-line"></div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="login-form-group">
              <label className="login-label">EMAIL</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>

          {/* Role selection removed: reset works by email only */}

            <button type="submit" className="login-continue-button" disabled={submitting}>
              {submitting ? 'SENDING…' : 'SEND RESET LINK'} <FaArrowRight className="login-arrow-icon" />
            </button>
          </form>

          <div className="login-signup-footer">
            New here? <Link to="/register" className="login-signup-link">Sign Up Now</Link>
          </div>

          <div className="login-footer">
            <div>© 2023-2024 TradXsell Inc. All Rights Reserved</div>
            <div className="login-help-text">Need help?</div>
          </div>
        </div>
      </div>
    </div>
  );
}


