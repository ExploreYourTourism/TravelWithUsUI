import { useState } from 'react';
import { Link } from 'react-router-dom';
import LeftPanel from './LeftPanel';

function ForgotPassword() {
  const [step, setStep] = useState('email'); // 'email' | 'sent'
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); return; }
    setStep('sent');
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <LeftPanel
        title="Reset Password"
        description="We'll send a reset link to your registered email address."
      />

      <div className="col-12 col-md-7 d-flex justify-content-center align-items-center bg-light overflow-y-auto">
        <div className="bg-white rounded-4 shadow p-4" style={{ width: '100%', maxWidth: '460px' }}>

          {step === 'email' ? (
            <>
              <div className="mb-4">
                <Link to="/login" className="link-accent d-inline-flex align-items-center gap-1" style={{ fontSize: '13px' }}>
                  ← Back to Login
                </Link>
              </div>

              <h2 className="fw-semibold mb-1" style={{ color: '#333', fontSize: '1.5rem' }}>Forgot Password?</h2>
              <p className="mb-4" style={{ color: '#666', fontSize: '13px' }}>
                Enter your registered email and we'll send you a reset link.
              </p>

              <div className="position-relative mb-3">
                {error && <span className="error-text">{error}</span>}
                <label className="form-label fw-medium" style={{ fontSize: '13px', color: '#333' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className={`input-underline w-100${error ? ' error-input' : ''}`}
                />
              </div>

              <button className="btn btn-gradient w-100 mt-2" onClick={handleSubmit}>
                SEND RESET LINK
              </button>
            </>
          ) : (
            <div className="text-center py-3">
              <div className="mb-3" style={{ fontSize: '3.5rem' }}>📧</div>
              <h2 className="fw-semibold mb-2" style={{ color: '#333', fontSize: '1.4rem' }}>Check Your Email</h2>
              <p className="mb-1" style={{ color: '#666', fontSize: '13px' }}>
                We've sent a password reset link to
              </p>
              <p className="fw-semibold mb-4" style={{ color: '#9c4dff', fontSize: '14px' }}>{email}</p>
              <p className="mb-4" style={{ color: '#999', fontSize: '12px' }}>
                Didn't receive it? Check your spam folder or{' '}
                <button className="btn btn-link p-0 link-accent" style={{ fontSize: '12px' }} onClick={() => setStep('email')}>
                  try again
                </button>
              </p>
              <Link to="/login" className="btn btn-gradient px-4">
                BACK TO LOGIN
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
