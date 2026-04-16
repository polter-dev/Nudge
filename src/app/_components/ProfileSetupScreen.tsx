import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, ArrowRight, ChevronDown } from 'lucide-react';
import { useAuth } from './AuthProvider';

const FONT_HEADING = "'General Sans', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";

const YEAR_OPTIONS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'PhD'];

const MAJOR_SUGGESTIONS = [
  'Computer Science',
  'Biology',
  'Business Administration',
  'Psychology',
  'Engineering',
  'Mathematics',
  'English',
  'Nursing',
  'Political Science',
  'Communications',
];

export function ProfileSetupScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bio, setBio] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMajorSuggestions, setShowMajorSuggestions] = useState(false);

  const filteredMajors = major
    ? MAJOR_SUGGESTIONS.filter((m) => m.toLowerCase().includes(major.toLowerCase()))
    : MAJOR_SUGGESTIONS;

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className="w-full flex flex-col"
      style={{
        height: '100vh',
        minHeight: 700,
        background: '#FFFFFF',
        fontFamily: FONT_BODY,
      }}
    >
      {/* Top bar */}
      <div
        className="w-full flex items-center justify-center shrink-0"
        style={{ height: 48, background: '#2D1B4E' }}
      >
        <span
          className="text-[14px] tracking-[0.2em]"
          style={{ fontFamily: FONT_HEADING, fontWeight: 600, color: '#5C17EC' }}
        >
          NUDGE
        </span>
      </div>

      {/* Main area */}
      <div className="flex-1 flex items-center justify-center relative overflow-auto py-8">
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: 800,
            height: 800,
            background:
              'radial-gradient(circle at top left, rgba(124,58,237,0.03) 0%, transparent 70%)',
          }}
        />

        <div
          className="relative z-10 w-full flex flex-col items-center"
          style={{
            maxWidth: 480,
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            padding: 40,
            margin: '0 16px',
          }}
        >
          {/* Avatar placeholder */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{ background: '#F3E8FF' }}
          >
            <User size={36} color="#7C3AED" />
          </div>

          <h1
            className="text-[24px] text-[#111111] text-center"
            style={{ fontFamily: FONT_HEADING, fontWeight: 700 }}
          >
            Set up your profile
          </h1>
          <p className="text-[14px] text-[#6B7280] text-center mt-2">
            {user ? `Welcome, ${user.firstName}!` : 'Welcome!'} Tell others a bit about yourself.
            <br />
            <span className="text-[12px] text-[#9CA3AF]">All fields are optional — you can do this later.</span>
          </p>

          {/* Form fields */}
          <div className="w-full flex flex-col gap-5 mt-6">
            {/* Major */}
            <div className="w-full flex flex-col gap-1 relative">
              <label
                htmlFor="major"
                className="text-[13px] font-medium"
                style={{ color: '#374151' }}
              >
                Major
              </label>
              <input
                id="major"
                type="text"
                placeholder="e.g. Computer Science"
                value={major}
                onChange={(e) => {
                  setMajor(e.target.value);
                  setShowMajorSuggestions(true);
                }}
                onFocus={() => setShowMajorSuggestions(true)}
                onBlur={() => setTimeout(() => setShowMajorSuggestions(false), 200)}
                className="w-full outline-none transition-all"
                style={{
                  height: 42,
                  borderRadius: 8,
                  border: '1px solid #D1D5DB',
                  padding: '0 12px',
                  fontSize: 14,
                  color: '#111111',
                  background: '#FFFFFF',
                  fontFamily: FONT_BODY,
                }}
              />
              {showMajorSuggestions && filteredMajors.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-20"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    maxHeight: 160,
                    overflowY: 'auto',
                  }}
                >
                  {filteredMajors.map((m) => (
                    <button
                      key={m}
                      className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors"
                      style={{ color: '#374151', border: 'none', background: 'none', cursor: 'pointer' }}
                      onMouseDown={() => {
                        setMajor(m);
                        setShowMajorSuggestions(false);
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Year */}
            <div className="w-full flex flex-col gap-1 relative">
              <label
                htmlFor="year"
                className="text-[13px] font-medium"
                style={{ color: '#374151' }}
              >
                Year
              </label>
              <button
                id="year"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                className="w-full flex items-center justify-between outline-none transition-all"
                style={{
                  height: 42,
                  borderRadius: 8,
                  border: '1px solid #D1D5DB',
                  padding: '0 12px',
                  fontSize: 14,
                  color: year ? '#111111' : '#9CA3AF',
                  background: '#FFFFFF',
                  fontFamily: FONT_BODY,
                  cursor: 'pointer',
                }}
              >
                {year || 'Select your year'}
                <ChevronDown size={16} color="#9CA3AF" />
              </button>
              {showYearDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowYearDropdown(false)} />
                  <div
                    className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-20"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    {YEAR_OPTIONS.map((y) => (
                      <button
                        key={y}
                        className="w-full text-left px-3 py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
                        style={{
                          color: '#374151',
                          border: 'none',
                          background: year === y ? '#FAF5FF' : 'none',
                          cursor: 'pointer',
                          fontWeight: year === y ? 600 : 400,
                        }}
                        onClick={() => {
                          setYear(y);
                          setShowYearDropdown(false);
                        }}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Bio */}
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="bio"
                className="text-[13px] font-medium"
                style={{ color: '#374151' }}
              >
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Tell your study partners a little about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 160))}
                className="w-full outline-none transition-all resize-none"
                rows={3}
                style={{
                  borderRadius: 8,
                  border: '1px solid #D1D5DB',
                  padding: '10px 12px',
                  fontSize: 14,
                  color: '#111111',
                  background: '#FFFFFF',
                  fontFamily: FONT_BODY,
                }}
              />
              <span className="text-[11px] text-right" style={{ color: '#9CA3AF' }}>
                {bio.length}/160
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3 mt-6">
            <button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 transition-colors"
              style={{
                height: 48,
                borderRadius: 8,
                background: '#7C3AED',
                fontFamily: FONT_BODY,
                fontWeight: 600,
                fontSize: 15,
                color: '#FFFFFF',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#6D28D9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#7C3AED'; }}
            >
              Continue to Dashboard <ArrowRight size={18} />
            </button>

            <button
              onClick={handleSkip}
              className="w-full text-center text-[13px] transition-colors"
              style={{
                color: '#9CA3AF',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#7C3AED'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; }}
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
