import { useState } from 'react';
import { Lock, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from './AuthProvider';
import { api } from '~/trpc/react';

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

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{4,}$/;

function validateUsername(value: string): string {
  if (!value) return 'Required';
  if (value.length < 5) return 'Must be at least 5 characters';
  if (!USERNAME_REGEX.test(value))
    return 'Must start with a letter and contain only letters and numbers';
  return '';
}

function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  hint,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error: string;
  hint?: string;
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-[13px] font-medium"
        style={{ color: '#374151' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="w-full outline-none transition-all"
        style={{
          height: 42,
          borderRadius: 8,
          border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
          padding: '0 12px',
          fontSize: 14,
          color: '#111111',
          background: '#FFFFFF',
          fontFamily: "'DM Sans', sans-serif",
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = `1px solid ${error ? '#EF4444' : '#7C3AED'}`;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? 'rgba(239,68,68,0.1)' : 'rgba(124,58,237,0.08)'}`;
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.border = `1px solid ${error ? '#EF4444' : '#D1D5DB'}`;
        }}
      />
      {error ? (
        <div className="flex items-center gap-1">
          <AlertCircle size={12} color="#EF4444" />
          <span className="text-[12px]" style={{ color: '#EF4444' }}>{error}</span>
        </div>
      ) : hint ? (
        <span className="text-[12px]" style={{ color: '#9CA3AF' }}>{hint}</span>
      ) : null}
    </div>
  );
}

export function SignUpScreen() {
  const navigate = useNavigate();
  const { loginWithDemo } = useAuth();

  const [form, setForm] = useState({ firstName: '', lastName: '', userName: '', email: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState('');

  const signupMutation = api.auth.signup.useMutation({
    onSuccess: (_data) => {
      loginWithDemo({
        email: form.email.trim().toLowerCase(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        userName: form.userName.trim(),
      });
      navigate('/profile-setup');
    },
    onError: (err) => {
      setServerError(err.message);
    },
  });

  const errors = {
    firstName: touched.firstName && !form.firstName ? 'Required' : '',
    lastName: touched.lastName && !form.lastName ? 'Required' : '',
    userName: touched.userName ? validateUsername(form.userName) : '',
    email: touched.email
      ? !form.email
        ? 'Required'
        : !form.email.toLowerCase().endsWith('.edu')
        ? 'Must be a .edu email address'
        : ''
      : '',
  };

  const allFilled =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.userName.trim() &&
    form.email.trim();

  const hasErrors = Object.values(errors).some(Boolean);
  const isValid = allFilled && !hasErrors;

  const touchAll = () =>
    setTouched({ firstName: true, lastName: true, userName: true, email: true });

  const handleContinue = () => {
    touchAll();
    setServerError('');
    if (!isValid) return;
    signupMutation.mutate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      userName: form.userName.trim(),
      email: form.email.trim().toLowerCase(),
    });
  };

  const set = (field: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));
  const touch = (field: keyof typeof form) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  return (
    <div
      className="w-full flex flex-col"
      style={{
        height: '100vh',
        minHeight: 700,
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
      <div className="flex-1 flex items-center justify-center relative overflow-auto py-8">
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
            margin: '0 16px',
          }}
        >
          <h1
            className="text-[24px] text-[#111111] text-center"
            style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 700 }}
          >
            Create your account
          </h1>
          <p className="text-[14px] text-[#6B7280] text-center mt-2">
            Fill in your details, then verify with your university Microsoft account
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-1.5">
              <Shield size={14} color="#16A34A" />
              <span className="text-[12px] text-[#6B7280]">Verified students only</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={14} color="#16A34A" />
              <span className="text-[12px] text-[#6B7280]">No password needed</span>
            </div>
          </div>

          {/* Form fields */}
          <div className="w-full flex flex-col gap-4 mt-6">
            {/* First + Last name row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <InputField
                  label="First name"
                  id="firstName"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={set('firstName')}
                  onBlur={touch('firstName')}
                  error={errors.firstName}
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="Last name"
                  id="lastName"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={set('lastName')}
                  onBlur={touch('lastName')}
                  error={errors.lastName}
                />
              </div>
            </div>

            <InputField
              label="Username"
              id="userName"
              placeholder="janesmith"
              value={form.userName}
              onChange={set('userName')}
              onBlur={touch('userName')}
              error={errors.userName}
              hint="Min 5 characters · starts with a letter · letters and numbers only"
            />

            <InputField
              label="University email"
              id="email"
              type="email"
              placeholder="jane@university.edu"
              value={form.email}
              onChange={set('email')}
              onBlur={touch('email')}
              error={errors.email}
              hint="Must be a verified .edu address"
            />
          </div>

          {/* Divider */}
          <div className="w-full flex items-center gap-3 mt-6">
            <div className="flex-1" style={{ height: 1, background: '#E5E7EB' }} />
            <span className="text-[12px]" style={{ color: '#9CA3AF' }}>then verify with</span>
            <div className="flex-1" style={{ height: 1, background: '#E5E7EB' }} />
          </div>

          {/* Server error */}
          {serverError && (
            <div className="w-full flex items-center gap-2 mt-4 px-3 py-2.5 rounded-lg"
              style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <AlertCircle size={14} color="#EF4444" />
              <span className="text-[13px]" style={{ color: '#EF4444' }}>{serverError}</span>
            </div>
          )}

          {/* Microsoft button */}
          <button
            onClick={handleContinue}
            disabled={signupMutation.isPending}
            className="w-full flex items-center justify-center gap-3 mt-4 transition-colors"
            style={{
              height: 48,
              borderRadius: 8,
              border: `1px solid ${isValid ? '#7C3AED' : '#D1D5DB'}`,
              background: isValid ? '#7C3AED' : '#FFFFFF',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: isValid ? '#FFFFFF' : '#6B7280',
              cursor: signupMutation.isPending ? 'not-allowed' : 'pointer',
              opacity: signupMutation.isPending ? 0.7 : 1,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (isValid && !signupMutation.isPending) e.currentTarget.style.background = '#6D28D9';
            }}
            onMouseLeave={(e) => {
              if (isValid) e.currentTarget.style.background = '#7C3AED';
            }}
          >
            {signupMutation.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <MicrosoftLogo />
            )}
            {signupMutation.isPending ? 'Creating account…' : 'Continue with Microsoft'}
          </button>

          <p
            className="text-center text-[12px] text-[#9CA3AF] mt-4"
            style={{ maxWidth: 340 }}
          >
            By signing up you agree to our Terms of Service. We only accept verified .edu email addresses.
          </p>

          <p className="text-center text-[13px] text-[#9CA3AF] mt-3">
            Already have an account?{' '}
            <button
              className="hover:underline"
              style={{ color: '#7C3AED', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
