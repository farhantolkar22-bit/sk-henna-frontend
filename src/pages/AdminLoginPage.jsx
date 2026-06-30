import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Key, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [step, setStep] = useState('email'); // 'email' | 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken) navigate('/admin');
  }, [navigate]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email.'); return; }
    setError('');
    setStep('password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) { setError('Please enter your password.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success && data.role === 'admin') {
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('userRole', 'admin');
        if (onLoginSuccess) onLoginSuccess('admin');
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid credentials. Try again.');
        setStep('email'); // go back to email step on failure
        setPassword('');
      }
    } catch {
      setError('Cannot connect to server. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    }}>
      {/* Glow */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '28px', padding: '44px 38px',
        maxWidth: '400px', width: '100%',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>

        {/* Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 28px rgba(124,58,237,0.45)',
          }}>
            <Lock size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: '800', color: 'white', margin: 0 }}>Admin Panel</h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', margin: '6px 0 0' }}>SK Henna — Secure Access</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '12px 16px', color: '#fca5a5',
            fontSize: '13px', fontWeight: '600', textAlign: 'center', marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {/* ── STEP 1: Email ── */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={iconWrapStyle}><Mail size={15} /></span>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@skhenna.com or 'admin'"
                  autoFocus
                  style={inputStyle}
                />
              </div>
            </div>

            <button type="submit" style={btnStyle}>
              Continue <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* ── STEP 2: Password ── */}
        {step === 'password' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Show the entered email (read-only) */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.06)', borderRadius: '12px',
              padding: '11px 16px', border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
                {email}
              </span>
              <button
                type="button"
                onClick={() => { setStep('email'); setPassword(''); setError(''); }}
                style={{ background: 'none', border: 'none', color: '#a78bfa', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <ArrowLeft size={12} /> Change
              </button>
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={iconWrapStyle}><Key size={15} /></span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoFocus
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Verifying…' : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
          Not an admin?{' '}
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}>
            Go to website
          </button>
        </p>
      </div>
    </div>
  );
}

/* ── Shared styles ── */
const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: '700',
  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em',
  textTransform: 'uppercase', marginBottom: '8px'
};

const iconWrapStyle = {
  position: 'absolute', left: '14px', top: '50%',
  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)',
  display: 'flex', alignItems: 'center', pointerEvents: 'none'
};

const inputStyle = {
  width: '100%', padding: '13px 14px 13px 42px',
  borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.07)', fontSize: '14px',
  fontWeight: '600', color: 'white', outline: 'none',
  boxSizing: 'border-box', transition: 'border-color 0.2s',
};

const btnStyle = {
  width: '100%', padding: '13px 20px', borderRadius: '14px', border: 'none',
  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
  color: 'white', fontSize: '15px', fontWeight: '800',
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  justifyContent: 'center', gap: '8px',
  boxShadow: '0 6px 24px rgba(124,58,237,0.4)',
  transition: 'all 0.2s',
};
