import { Camera, ArrowRight, Flame, BarChart3, Target, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MatchFoundModal } from './MatchFoundModal';

const avatarUrl =
  'https://images.unsplash.com/photo-1668701064538-79c4c87fbeb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBjb2xsZWdlJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzcxOTc1NTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

/* ─── Session Config Card ─── */
function SessionConfigCard() {
  const chips = [
    { label: '25 min focus', filled: true },
    { label: '5 min break', filled: false },
    { label: 'Camera on', filled: false, icon: true },
    { label: '3 rounds', filled: false },
  ];

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-6 py-4"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] whitespace-nowrap"
          style={{
            fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
            ...(chip.filled
              ? { background: '#7C3AED', color: '#FFFFFF' }
              : {
                  background: 'transparent',
                  color: '#7C3AED',
                  border: '1px solid #7C3AED',
                }),
          }}
        >
          {chip.icon && <Camera size={12} />}
          {chip.label}
        </span>
      ))}
      <button
        className="ml-4 text-[13px]"
        style={{
          color: '#7C3AED',
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Edit
      </button>
    </div>
  );
}

/* ─── Pulsing Rings + Avatar ─── */
function PulsingRadar() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 360, height: 360 }}>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes nudge-pulse {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.08); opacity: 0; }
        }
      `}</style>

      {/* Ring 1 — smallest, most opaque */}
      <span
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid rgba(124, 58, 237, 0.20)',
          animation: 'nudge-pulse 2.4s ease-out infinite',
        }}
      />
      {/* Ring 2 */}
      <span
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid rgba(124, 58, 237, 0.10)',
          animation: 'nudge-pulse 2.4s ease-out 0.5s infinite',
        }}
      />
      {/* Ring 3 — largest, faintest */}
      <span
        className="absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid rgba(124, 58, 237, 0.05)',
          animation: 'nudge-pulse 2.4s ease-out 1s infinite',
        }}
      />

      {/* Centre avatar */}
      <div
        className="relative z-10 rounded-full overflow-hidden"
        style={{
          width: 64,
          height: 64,
          border: '3px solid #FFFFFF',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}
      >
        <ImageWithFallback
          src={avatarUrl}
          alt="Your avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* ─── Left Context Panel ─── */
function UserContextPanel() {
  return (
    <div
      className="flex flex-col rounded-xl p-6"
      style={{
        width: 280,
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* User info */}
      <div className="flex items-center gap-3 mb-0">
        <div
          className="rounded-full overflow-hidden shrink-0"
          style={{ width: 40, height: 40 }}
        >
          <ImageWithFallback
            src={avatarUrl}
            alt="Gui O."
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[14px] text-[#111]" style={{ fontWeight: 600 }}>
            Gui O.
          </p>
          <p className="text-[11px] text-[#9CA3AF]">University of Central Florida</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4" style={{ height: 1, background: '#E5E7EB' }} />

      {/* Stats */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <BarChart3 size={16} color="#7C3AED" />
          <span className="text-[13px] text-[#374151]">14 sessions this week</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Target size={16} color="#16A34A" />
          <span className="text-[13px] text-[#374151]">92% focus rate</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Trophy size={16} color="#D97706" />
          <span className="text-[13px] text-[#374151]">4.9 accountability score</span>
        </div>
      </div>

      {/* Streak badge */}
      <div
        className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5"
        style={{ background: '#FFF7ED', border: '1px solid #FDBA74' }}
      >
        <Flame size={14} color="#EA580C" />
        <span className="text-[12px] text-[#EA580C]" style={{ fontWeight: 600 }}>
          6-day streak
        </span>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function MatchmakingScreen() {
  const [isMatchFound, setIsMatchFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a match found after 5 seconds
    const timer = setTimeout(() => {
      setIsMatchFound(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex-1 flex items-center justify-center relative"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Left context panel — positioned left of centre */}
      <div className="absolute" style={{ left: 40, top: '50%', transform: 'translateY(-50%)' }}>
        <UserContextPanel />
      </div>

      {/* Centre column */}
      <div className="flex flex-col items-center">
        {/* Config card */}
        <div className="mb-8">
          <SessionConfigCard />
        </div>

        {/* Pulsing radar */}
        <PulsingRadar />

        {/* Heading */}
        <div className="mt-6 text-center">
          <h2
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: '24px',
              fontWeight: 600,
              color: '#111111',
            }}
          >
            Looking for a study partner...
          </h2>
          <p className="mt-1 text-[14px] text-[#6B7280]">
            Usually takes less than 30 seconds
          </p>
        </div>

        {/* Online badge */}
        <div
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: '#16A34A' }} />
          <span className="text-[13px] text-[#6B7280]">312 students online</span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            className="rounded-lg px-6 py-2.5 text-[14px] text-[#6B7280] bg-transparent"
            style={{
              border: '1px solid #D1D5DB',
              fontWeight: 500,
              width: 140,
            }}
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center gap-1 text-[13px] bg-transparent border-none cursor-pointer"
            style={{ color: '#16A34A', fontWeight: 500 }}
            onClick={() => navigate('/solo')}
          >
            Study Solo Instead
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Match found modal */}
      {isMatchFound && (
        <MatchFoundModal
          onAccept={() => navigate('/session')}
          onDecline={() => setIsMatchFound(false)}
        />
      )}
    </div>
  );
}