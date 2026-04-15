import { useState } from 'react';
import {
  CheckCircle,
  SkipForward,
  Minus,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

const partnerAvatar =
  'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0dWRlbnQlMjBjYXN1YWwlMjBwb3J0cmFpdCUyMGZyaWVuZGx5fGVufDF8fHx8MTc3MTk3NzM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

/* ─── Stat Block ─── */
function StatBlock({
  label,
  value,
  accentColor,
}: {
  label: string;
  value: string;
  accentColor: string;
}) {
  return (
    <div
      className="flex-1 flex flex-col items-center"
      style={{
        background: '#FFFFFF',
        borderRadius: 10,
        border: '1px solid #E5E7EB',
        borderTop: `3px solid ${accentColor}`,
        padding: 20,
      }}
    >
      <span className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
        {label}
      </span>
      <span
        className="text-[28px] text-[#111111]"
        style={{
          fontFamily: "'General Sans', sans-serif",
          fontWeight: 700,
          marginTop: 4,
          lineHeight: 1.2,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ─── Task Row ─── */
type TaskStatus = 'completed' | 'skipped' | 'not-started';

function TaskRow({
  name,
  time,
  status,
}: {
  name: string;
  time: string;
  status: TaskStatus;
}) {
  const iconMap = {
    completed: <CheckCircle size={16} color="#16A34A" strokeWidth={2} />,
    skipped: <SkipForward size={16} color="#9CA3AF" strokeWidth={2} />,
    'not-started': <Minus size={16} color="#9CA3AF" strokeWidth={2} />,
  };

  const isMuted = status === 'skipped' || status === 'not-started';

  return (
    <div className="flex items-center gap-2.5">
      {iconMap[status]}
      <span
        className="flex-1 text-[13px]"
        style={{
          color: isMuted ? '#9CA3AF' : '#374151',
          fontStyle: status === 'skipped' ? 'italic' : 'normal',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {name}
      </span>
      <span
        className="text-[12px] shrink-0"
        style={{
          color: '#9CA3AF',
          fontFamily: status === 'completed' ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
          fontStyle: isMuted ? 'italic' : 'normal',
        }}
      >
        {time}
      </span>
    </div>
  );
}

/* ─── Star Rating ─── */
function StarRating() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hover || rating);
        return (
          <button
            key={star}
            className="bg-transparent border-none cursor-pointer p-0"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={24}
              color={filled ? '#F59E0B' : '#D1D5DB'}
              fill={filled ? '#F59E0B' : 'none'}
              strokeWidth={1.8}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ─── Tasks Data ─── */
const tasks: { name: string; time: string; status: TaskStatus }[] = [
  { name: 'Calc 2 Quiz Prep', time: '15:30', status: 'completed' },
  { name: 'Chemistry homework + notes', time: '4:00', status: 'completed' },
  { name: 'Trip planning', time: 'Skipped', status: 'skipped' },
  { name: 'ENC paper draft', time: '4:02', status: 'completed' },
  { name: 'Read Chapter 12', time: 'Not started', status: 'not-started' },
];

/* ─── Main Export ─── */
export function SessionSummaryScreen() {
  const navigate = useNavigate();
  return (
    <div
      className="flex-1 flex items-center justify-center"
      style={{
        background: '#F9FAFB',
        fontFamily: "'DM Sans', sans-serif",
        overflowY: 'auto',
        padding: '40px 0',
      }}
    >
      {/* ── Card ── */}
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: 600,
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          padding: 40,
        }}
      >
        {/* Heading */}
        <h1
          className="text-[24px] text-[#111111] text-center"
          style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 700 }}
        >
          Session Complete! 🎉
        </h1>

        {/* Partner info */}
        <div
          className="flex items-center justify-center gap-2.5"
          style={{ marginTop: 8 }}
        >
          <div
            className="rounded-full overflow-hidden shrink-0"
            style={{ width: 32, height: 32 }}
          >
            <ImageWithFallback
              src={partnerAvatar}
              alt="Zack J."
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[14px] text-[#111111]" style={{ fontWeight: 600 }}>
              Studied with Zack J.
            </span>
            <span className="text-[12px] text-[#9CA3AF]">University of Florida</span>
          </div>
        </div>

        {/* Stat blocks */}
        <div className="flex gap-4" style={{ marginTop: 28 }}>
          <StatBlock label="Total Time" value="33:00" accentColor="#7C3AED" />
          <StatBlock label="Focus Score" value="91%" accentColor="#16A34A" />
          <StatBlock label="Tasks Done" value="3 of 5" accentColor="#F59E0B" />
        </div>

        {/* Divider */}
        <div style={{ marginTop: 28, height: 1, background: '#E5E7EB' }} />

        {/* Task Recap */}
        <h3
          className="text-[14px] text-[#111111]"
          style={{ fontWeight: 600, marginTop: 20 }}
        >
          Task Recap
        </h3>

        <div className="flex flex-col gap-2" style={{ marginTop: 12 }}>
          {tasks.map((task) => (
            <TaskRow key={task.name} {...task} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ marginTop: 24, height: 1, background: '#E5E7EB' }} />

        {/* Rate your partner */}
        <h3
          className="text-[14px] text-[#111111]"
          style={{ fontWeight: 600, marginTop: 20 }}
        >
          Rate your partner
        </h3>

        <div style={{ marginTop: 8 }}>
          <StarRating />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3" style={{ marginTop: 32 }}>
          <button
            className="flex items-center justify-center text-white text-[15px] cursor-pointer transition-colors"
            style={{
              width: 160,
              height: 44,
              borderRadius: 8,
              background: '#7C3AED',
              border: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#6B21A8')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#7C3AED')}
            onClick={() => navigate('/matchmaking')}
          >
            Study Again
          </button>
          <button
            className="flex items-center justify-center text-[15px] cursor-pointer transition-colors"
            style={{
              width: 180,
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
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}