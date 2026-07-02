import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, Key, ArrowRight, ArrowLeft, RefreshCw, CheckCircle, Lock } from 'lucide-react';
import { API_BASE_URL } from '../config';

// ─────────────────────────────────────────────────────────────
//  UNIFIED LOGIN — Smart flow based on email:
//  • Admin email → password input → /admin dashboard
//  • Any other email → OTP sent → enter OTP → /  (website)
//  • Any other email → OTP sent → enter OTP → /  (website)
// ─────────────────────────────────────────────────────────────

export default function LoginPage({ onLoginSuccess, googleClientId }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (sessionStorage.getItem('adminToken')) navigate('/admin');
    else if (sessionStorage.getItem('userToken')) navigate('/');
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '16px',
      background: 'linear-gradient(135deg, #fff7f0 0%, #fce7f3 50%, #fdf2f8 100%)',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '32px', padding: '44px 38px',
        maxWidth: '420px', width: '100%',
        border: '1px solid rgba(255,255,255,0.65)',
        boxShadow: '0 20px 60px rgba(236,72,153,0.12), 0 4px 16px rgba(0,0,0,0.06)',
      }}>
        <UnifiedFlow onLoginSuccess={onLoginSuccess} navigate={navigate} googleClientId={googleClientId} redirectPath={redirectPath} />

        {/* Back to site */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            width: '100%', marginTop: '22px', background: 'none', border: 'none',
            color: '#94a3b8', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#ec4899'}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >
          <ArrowLeft size={14} /> Back to website
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main Flow Component
// ─────────────────────────────────────────────────────────────
function UnifiedFlow({ onLoginSuccess, navigate, googleClientId, redirectPath }) {
  const [step, setStep] = useState('email');      // email | password | otp | success
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(null);          // 'admin' | 'user'
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMockModal, setShowMockModal] = useState(false);
  const [mockEmailInput, setMockEmailInput] = useState('shifakheratkar@gmail.com');
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);

  // ── Handle Successful Google Authentication ──
  const handleGoogleSuccess = async (googleEmail) => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: googleEmail })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.role === 'admin') {
          sessionStorage.setItem('adminToken', data.token);
          sessionStorage.setItem('userRole', 'admin');
          if (onLoginSuccess) onLoginSuccess('admin');
          setRole('admin');
        } else {
          sessionStorage.setItem('userToken', data.token);
          sessionStorage.setItem('userRole', 'user');
          if (onLoginSuccess) onLoginSuccess('user');
          setRole('user');
        }
        setStep('success');
        setTimeout(() => {
          navigate(data.role === 'admin' ? '/admin' : redirectPath);
        }, 1200);
      } else {
        setError(data.message || 'Google login failed.');
      }
    } catch (err) {
      setError('Cannot connect to server for Google login.');
    } finally {
      setLoading(false);
    }
  };

  // ── Real Google Login trigger ──
  const triggerGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const userInfo = await userInfoRes.json();
        if (userInfo.email) {
          await handleGoogleSuccess(userInfo.email);
        } else {
          setError('Failed to retrieve email from Google.');
        }
      } catch (err) {
        setError('Failed to fetch profile from Google.');
      }
    },
    onError: () => {
      setError('Google Sign-In was cancelled.');
    }
  });

  // ── Mock Google Login for local test when no credentials ──
  const handleMockGoogleClick = () => {
    setError('');
    setShowMockModal(true);
  };

  // Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // ── STEP 1: Email submit — detect admin vs user ──
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/check-role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.role === 'admin') {
        setRole('admin');
        setStep('password');
      } else {
        setRole('user');
        await sendOtp();
      }
    } catch {
      setError('Cannot connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Send OTP to user email ──
  const sendOtp = async () => {
    setLoading(true); setError(''); setInfo('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStep('otp');
        setInfo(data.message);
        setResendTimer(60);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2a: Admin password login ──
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!password) { setError('Please enter your password.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('userRole', 'admin');
        if (onLoginSuccess) onLoginSuccess('admin');
        setStep('success');
        setTimeout(() => navigate('/admin'), 1200);
      } else {
        setError(data.message || 'Incorrect password. Try again.');
        setPassword('');
      }
    } catch {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2b: OTP digit input handling ──
  const handleOtpChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };
  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  // ── STEP 2b: Verify OTP ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) { setError('Please enter the full 6-digit code.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('userToken', data.token);
        sessionStorage.setItem('userRole', 'user');
        if (onLoginSuccess) onLoginSuccess('user');
        setStep('success');
        setTimeout(() => navigate(redirectPath), 1500);
      } else {
        setError(data.message || 'Invalid OTP. Try again.');
      }
    } catch {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  // ─────────────── RENDERS ───────────────

  // Success
  if (step === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ width: '68px', height: '68px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 8px 28px rgba(16,185,129,0.3)' }}>
          <CheckCircle size={34} color="white" />
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px' }}>
          {role === 'admin' ? 'Welcome, Admin! 🔐' : 'You\'re in! 🎉'}
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
          {role === 'admin' ? 'Redirecting to admin dashboard…' : 'Redirecting to website…'}
        </p>
      </div>
    );
  }

  // Brand header
  const Header = () => (
    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
      <div style={{
        width: '58px', height: '58px', borderRadius: '50%',
        background: role === 'admin'
          ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
          : 'linear-gradient(135deg, #f59e0b, #ec4899)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 14px',
        boxShadow: role === 'admin' ? '0 8px 24px rgba(124,58,237,0.3)' : '0 8px 24px rgba(236,72,153,0.25)',
        transition: 'all 0.3s ease',
      }}>
        {role === 'admin' ? <Lock size={24} color="white" /> : <span style={{ fontSize: '24px' }}>✦</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.1' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: '950', letterSpacing: '0.05em', color: '#1e293b' }}>HENNA</span>
        <span style={{ fontSize: '10px', fontWeight: '800', color: '#db2777', letterSpacing: '0.1em', textTransform: 'uppercase' }}>BY SHIFA & SAHLA</span>
      </div>
    </div>
  );

  // ── Step 1: Email ──
  if (step === 'email') {
    return (
      <>
        <Header />
        <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && <ErrorBanner message={error} />}

          {/* Continue with Google (at the top) */}
          <button
            type="button"
            onClick={googleClientId ? () => triggerGoogleLogin() : handleMockGoogleClick}
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: '14px',
              border: '1.5px solid #e2e8f0',
              background: '#ffffff',
              color: '#334155',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.247-3.123C18.29 1.77 15.439 1 12.24 1 5.922 1 1 5.92 1 12.2s4.922 11.2 11.24 11.2c6.6 0 11-4.604 11-11.2 0-.756-.08-1.333-.178-1.915H12.24z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '6px 0', gap: '10px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
          </div>

          <div>
            <label style={labelStyle}>Your Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={iconStyle}><Mail size={15} /></span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
                required
                style={{ ...inputStyle, paddingLeft: '42px' }}
              />
            </div>
          </div>
          <button type="submit" disabled={loading} style={btnPrimary}>
            {loading ? 'Checking…' : <><span>Continue</span> <ArrowRight size={16} /></>}
          </button>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            Admin? Use your registered email. Users get a one-time code.
          </p>
        </form>

        {/* Mock Google Login Modal overlay */}
        {showMockModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '16px'
          }}>
            <div style={{
              background: 'white', borderRadius: '24px', padding: '32px',
              maxWidth: '380px', width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0',
            }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🔑</span> Google Demo Mode
              </h3>
              <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '0 0 18px' }}>
                Google Client ID is not configured in your server/.env file. Enter any email to test:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input
                  type="email"
                  value={mockEmailInput}
                  onChange={e => setMockEmailInput(e.target.value)}
                  placeholder="email@example.com"
                  style={inputStyle}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowMockModal(false)}
                    style={{
                      flex: 1, padding: '11px 16px', borderRadius: '12px',
                      border: '1.5px solid #e2e8f0', background: 'white',
                      color: '#64748b', fontSize: '13px', fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!mockEmailInput.trim() || !mockEmailInput.includes('@')) {
                        setError('Please enter a valid email.');
                        setShowMockModal(false);
                        return;
                      }
                      setShowMockModal(false);
                      handleGoogleSuccess(mockEmailInput.trim());
                    }}
                    style={{
                      flex: 1, padding: '11px 16px', borderRadius: '12px',
                      border: 'none', background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                      color: 'white', fontSize: '13px', fontWeight: '800',
                      cursor: 'pointer', boxShadow: '0 4px 12px rgba(236,72,153,0.2)'
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ── Step 2a: Admin Password ──
  if (step === 'password') {
    return (
      <>
        <Header />
        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && <ErrorBanner message={error} />}

          {/* Email pill (read-only) */}
          <EmailPill email={email} onBack={() => { setStep('email'); setPassword(''); setError(''); setRole(null); }} />

          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={iconStyle}><Key size={15} /></span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
                required
                style={{ ...inputStyle, paddingLeft: '42px' }}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={btnPrimary}>
            {loading ? 'Signing in…' : <><span>Sign In to Admin Panel</span> <ArrowRight size={16} /></>}
          </button>
        </form>
      </>
    );
  }

  // ── Step 2b: OTP Verification ──
  if (step === 'otp') {
    const filled = otp.join('').length;
    return (
      <>
        <Header />
        <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email pill */}
          <EmailPill email={email} onBack={() => { setStep('email'); setOtp(['','','','','','']); setError(''); setRole(null); }} />

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
              We sent a 6-digit code to <strong style={{ color: '#1e293b' }}>{email}</strong>
            </p>
            {info && <p style={{ color: '#64748b', fontSize: '12px', margin: '6px 0 0', fontStyle: 'italic' }}>{info}</p>}
          </div>

          {error && <ErrorBanner message={error} />}

          {/* OTP boxes */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => otpRefs.current[idx] = el}
                type="text" inputMode="numeric" maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(e.target.value, idx)}
                onKeyDown={e => handleOtpKeyDown(e, idx)}
                autoFocus={idx === 0}
                style={{
                  width: '46px', height: '56px', textAlign: 'center',
                  fontSize: '22px', fontWeight: '800', color: '#1e293b',
                  border: digit ? '2px solid #ec4899' : '2px solid #e2e8f0',
                  borderRadius: '12px',
                  background: digit ? 'rgba(236,72,153,0.06)' : 'rgba(248,250,252,0.8)',
                  outline: 'none', transition: 'all 0.15s',
                  boxShadow: digit ? '0 0 0 3px rgba(236,72,153,0.12)' : 'none',
                }}
              />
            ))}
          </div>

          <button type="submit" disabled={loading || filled !== 6} style={{
            ...btnPrimary,
            opacity: filled !== 6 ? 0.55 : 1,
            cursor: filled !== 6 ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Verifying…' : <><span>Verify & Enter Site</span> <ArrowRight size={16} /></>}
          </button>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {resendTimer > 0 ? (
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>Resend code in {resendTimer}s</span>
            ) : (
              <button type="button" onClick={sendOtp} disabled={loading}
                style={{ background: 'none', border: 'none', color: '#ec4899', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <RefreshCw size={13} /> Resend OTP
              </button>
            )}
          </div>
        </form>
      </>
    );
  }

  return null;
}

// ─── Shared sub-components ───

function EmailPill({ email, onBack }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(241,245,249,0.9)', borderRadius: '12px',
      padding: '11px 16px', border: '1px solid #e2e8f0'
    }}>
      <span style={{ color: '#475569', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Mail size={14} style={{ color: '#94a3b8' }} /> {email}
      </span>
      <button type="button" onClick={onBack}
        style={{ background: 'none', border: 'none', color: '#ec4899', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ArrowLeft size={12} /> Change
      </button>
    </div>
  );
}

function ErrorBanner({ message }) {
  return (
    <div style={{
      background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
      padding: '11px 14px', color: '#dc2626', fontSize: '13px', fontWeight: '600', textAlign: 'center'
    }}>
      {message}
    </div>
  );
}

// ─── Shared styles ───

const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: '700',
  color: '#94a3b8', letterSpacing: '0.08em',
  textTransform: 'uppercase', marginBottom: '8px'
};

const iconStyle = {
  position: 'absolute', left: '14px', top: '50%',
  transform: 'translateY(-50%)', color: '#94a3b8',
  display: 'flex', alignItems: 'center', pointerEvents: 'none'
};

const inputStyle = {
  width: '100%', padding: '13px 14px',
  borderRadius: '12px', border: '1.5px solid #e2e8f0',
  background: 'rgba(248,250,252,0.8)', fontSize: '14px',
  fontWeight: '600', color: '#1e293b', outline: 'none',
  transition: 'border-color 0.2s', boxSizing: 'border-box',
};

const btnPrimary = {
  width: '100%', padding: '13px 20px', borderRadius: '14px',
  border: 'none', background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
  color: 'white', fontSize: '15px', fontWeight: '800', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  boxShadow: '0 6px 20px rgba(236,72,153,0.3)', transition: 'all 0.2s',
};
