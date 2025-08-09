import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './login.css';
import triangle from '../../assets/logosidebar.png';
import logo from '../../assets/logosid.png';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState(emailFromQuery);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters', { position: 'top-center' });
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match', { position: 'top-center' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Password reset successful. Redirecting…', { position: 'top-center' });
        setTimeout(()=> navigate('/login'), 1500);
      } else {
        toast.error(data.error || 'Reset failed', { position: 'top-center' });
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
        <div className="login-logo"><img src={logo} className="imglogo" /></div>
        <div className="login-tagline">Choose a strong password to keep your account secure.</div>
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
          <div className="login-header">Reset Password</div>
          <div className="login-subheader">Enter and confirm your new password.</div>

          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span> update password</span>
            <div className="login-divider-line"></div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="login-form-group">
              <label className="login-label">ACCOUNT EMAIL</label>
              <input type="email" className="login-input" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="login-form-group">
              <label className="login-label">NEW PASSWORD</label>
              <input type="password" className="login-input" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div className="login-form-group">
              <label className="login-label">CONFIRM PASSWORD</label>
              <input type="password" className="login-input" placeholder="••••••••" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
            </div>
            <button type="submit" className="login-continue-button" disabled={submitting}>
              {submitting ? 'SAVING…' : 'SAVE PASSWORD'} <FaArrowRight className="login-arrow-icon" />
            </button>
          </form>

          <div className="login-footer">
            <div>© 2023-2024 TradXsell Inc. All Rights Reserved</div>
            <div className="login-help-text">Need help?</div>
          </div>
        </div>
      </div>
    </div>
  );
}


