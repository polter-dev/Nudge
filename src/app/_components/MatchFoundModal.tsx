import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const yourAvatar =
  'https://images.unsplash.com/photo-1668701064538-79c4c87fbeb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBjb2xsZWdlJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzcxOTc1NTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const partnerAvatar =
  'https://images.unsplash.com/photo-1690543364186-973ade5dd0c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBzdHVkZW50JTIwc21pbGluZyUyMGNhc3VhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk3NzI2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

function Avatar({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div
      className="rounded-full overflow-hidden shrink-0"
      style={{
        width: 52,
        height: 52,
        border: '3px solid #FFFFFF',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      }}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function MatchFoundModal({
  onAccept,
  onDecline,
}: {
  onAccept?: () => void;
  onDecline?: () => void;
}) {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return (
    /* ── Overlay ── */
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.50)' }}
    >
      {/* ── Modal card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="flex flex-col items-center"
        style={{
          width: 420,
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #7C3AED',
          boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
          padding: 36,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Sparkle */}
        <span className="text-[28px] leading-none">✨</span>

        {/* Heading */}
        <h2
          className="text-[22px] text-[#111111]"
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          Match Found!
        </h2>

        {/* Avatars row */}
        <div
          className="flex items-center justify-center"
          style={{ marginTop: 24, gap: 0 }}
        >
          {/* Left — You */}
          <div className="flex flex-col items-center" style={{ width: 80 }}>
            <Avatar src={yourAvatar} alt="You" />
            <span
              className="text-[12px] text-[#6B7280]"
              style={{ fontWeight: 600, marginTop: 8 }}
            >
              You
            </span>
          </div>

          {/* Lightning bolt */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: 32 }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 28,
                height: 28,
                background: 'rgba(124,58,237,0.08)',
              }}
            >
              <Zap size={16} color="#7C3AED" fill="#7C3AED" strokeWidth={0} />
            </div>
          </div>

          {/* Right — Partner */}
          <div className="flex flex-col items-center" style={{ width: 80 }}>
            <Avatar src={partnerAvatar} alt="Zack J." />
            <span
              className="text-[12px] text-[#111111]"
              style={{ fontWeight: 600, marginTop: 8 }}
            >
              Zack J.
            </span>
            <span className="text-[10px] text-[#9CA3AF]" style={{ marginTop: 1 }}>
              University of Florida
            </span>
          </div>
        </div>

        {/* Session details */}
        <p
          className="text-[13px] text-[#6B7280] text-center"
          style={{ marginTop: 24 }}
        >
          25 min focus · 5 min break · 3 rounds
        </p>

        {/* Camera required chip */}
        <div
          className="inline-flex items-center gap-1 rounded-full px-3 py-1"
          style={{
            marginTop: 8,
            background: 'rgba(22,163,74,0.10)',
          }}
        >
          <Check size={12} color="#16A34A" strokeWidth={2.5} />
          <span className="text-[11px] text-[#16A34A]" style={{ fontWeight: 500 }}>
            Camera required
          </span>
        </div>

        {/* Accept button */}
        <button
          className="w-full flex items-center justify-center text-white text-[15px] cursor-pointer transition-colors"
          style={{
            marginTop: 28,
            height: 48,
            borderRadius: 8,
            background: '#7C3AED',
            border: 'none',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#6B21A8')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#7C3AED')}
          onClick={onAccept}
        >
          Accept
        </button>

        {/* Decline button */}
        <button
          className="w-full flex items-center justify-center text-[15px] cursor-pointer transition-colors"
          style={{
            marginTop: 10,
            height: 44,
            borderRadius: 8,
            background: '#FFFFFF',
            border: '1px solid #D1D5DB',
            color: '#6B7280',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#9CA3AF')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#D1D5DB')}
          onClick={onDecline}
        >
          Decline
        </button>

        {/* Auto-decline timer */}
        <p className="text-[11px] text-[#9CA3AF]" style={{ marginTop: 16 }}>
          Auto-decline in{' '}
          <span
            style={{
              fontWeight: 600,
              color: seconds <= 5 ? '#EF4444' : '#6B7280',
            }}
          >
            {seconds}s
          </span>
        </p>
      </motion.div>
    </div>
  );
}