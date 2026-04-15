import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from './AuthProvider';

function MicrosoftLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

export function LoginScreen() {
  const navigate = useNavigate();
  const { loginWithDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const emailError = touched && !email.trim() ? 'Please enter your email' : '';
  const isValid = email.trim().length > 0;

  const handleSignIn = () => {
    setTouched(true);
    if (!isValid) return;
    loginWithDemo({ email: email.trim().toLowerCase() });
    navigate('/dashboard');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSignIn();
  };

  return (
    <div
      className="w-full flex flex-col"
      style={{
        height: '100vh',
        minHeight: 600,
        background: '#FFFFFF',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        className="w-full flex items-center justify-center shrink-0"
        style={{ height: 48, background: '#2D1B4E' }}
      >
        <span
          className="text-[14px] tracking-[0.2em]"
          style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 600, color: '#5C17EC' }}
        >
          NUDGE
        </span>
      </div>

      {/* Main area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 800,
            height: 800,
            background:
              'radial-gradient(circle at top right, rgba(124,58,237,0.03) 0%, transparent 70%)',
          }}
        />

        <div
          className="relative z-10 w-full flex flex-col items-center"
          style={{
            maxWidth: 440,
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            padding: 40,
          }}
        >
          <h1
            className="text-[24px] text-[#111111] text-center"
            style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 700 }}
          >
            Welcome back
          </h1>
          <p className="text-[14px] text-[#6B7280] text-center mt-2">
            Sign in with your university Microsoft account
          </p>

          {/* Email field */}
          <div className="w-full mt-8 flex flex-col gap-1">
            <label
              htmlFor="login-email"
              className="text-[13px] font-medium"
              style={{ color: '#374151' }}
            >
              University email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              onKeyDown={handleKeyDown}
              className="w-full outline-none"
              style={{
                height: 44,
                borderRadius: 8,
                border: `1px solid ${emailError ? '#EF4444' : '#D1D5DB'}`,
                padding: '0 12px',
                fontSize: 14,
                color: '#111111',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = '1px solid #7C3AED';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)';
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.border = `1px solid ${emailError ? '#EF4444' : '#D1D5DB'}`;
              }}
            />
            {emailError && (
              <span className="text-[12px]" style={{ color: '#EF4444' }}>{emailError}</span>
            )}
          </div>

          {/* Sign in button — styled like Microsoft SSO */}
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 mt-4"
            style={{
              height: 48,
              borderRadius: 8,
              border: 'none',
              background: '#7C3AED',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#6D28D9')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#7C3AED')}
          >
            <MicrosoftLogo />
            Sign in with Microsoft
          </button>

          <p className="text-center text-[13px] text-[#9CA3AF] mt-6">
            Don&apos;t have an account?{' '}
            <button
              className="hover:underline"
              style={{ color: '#7C3AED', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            <Lock size={12} color="#9CA3AF" strokeWidth={2} />
            <span className="text-[11px] text-[#9CA3AF]">
              We only accept verified .edu emails
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
