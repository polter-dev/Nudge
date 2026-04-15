import { Lock, Mic, Music, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { SessionTimeline } from './SessionTimeline';
import { SessionTaskCard } from './SessionTaskCard';
import type { SessionTask } from './SessionTaskCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

const webcamImage =
  'https://images.unsplash.com/photo-1758876201884-8695c9c98203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN0dWR5aW5nJTIwbGFwdG9wJTIwZm9jdXNlZCUyMGRlc2t8ZW58MXx8fHwxNzcxOTc1Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const tasks: SessionTask[] = [
  { id: 1, name: 'Calc 2 Quiz Prep', status: 'completed', time: '15:30' },
  { id: 2, name: 'ENC paper draft', status: 'active', time: '6:45' },
  { id: 3, name: 'Read Ch. 7 Psychology', status: 'pending' },
];

/* ─── Main Screen ─── */
export function SoloSessionScreen() {
  const navigate = useNavigate();
  return (
    <div
      className="flex-1 flex flex-col min-h-0"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Timeline */}
      <div className="px-6 pt-5 flex justify-center">
        <SessionTimeline />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 min-h-0 px-6 pb-5 gap-6">
        {/* LEFT — Webcam */}
        <div className="flex flex-col" style={{ width: '55%' }}>
          {/* Webcam feed */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden"
            style={{
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <ImageWithFallback
              src={webcamImage}
              alt="Your webcam"
              className="w-full h-full object-cover"
            />

            {/* "You" pill — bottom left */}
            <div
              className="absolute bottom-3 left-3 px-3 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <span className="text-[13px] text-[#111]" style={{ fontWeight: 600 }}>
                You
              </span>
            </div>

            {/* AI Focus badge — top right */}
            <div
              className="absolute top-3 right-3 flex items-center gap-2 rounded-lg px-3.5 py-2"
              style={{
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: '#16A34A',
                  boxShadow: '0 0 6px rgba(22,163,106,0.5)',
                }}
              />
              <span
                className="text-[13px]"
                style={{ fontWeight: 600, color: '#16A34A' }}
              >
                Focused
              </span>
            </div>
          </div>

          {/* Focus Score bar */}
          <div className="flex flex-col items-center mt-3 gap-1">
            <div className="flex items-center gap-2.5">
              <div
                className="rounded-full overflow-hidden"
                style={{ width: 240, height: 6, background: '#E5E7EB' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: '94%', background: '#16A34A' }}
                />
              </div>
              <span
                className="text-[13px]"
                style={{ fontWeight: 600, color: '#16A34A' }}
              >
                94%
              </span>
            </div>
            <span className="text-[11px] text-[#9CA3AF]">
              AI-powered focus tracking · Camera only
            </span>
          </div>

          {/* Floating call controls */}
          <div className="flex justify-center mt-3">
            <div
              className="flex items-center justify-center"
              style={{
                background: '#FFFFFF',
                borderRadius: '9999px',
                height: 48,
                width: 180,
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                gap: 12,
              }}
            >
              <button
                className="rounded-full flex items-center justify-center cursor-pointer"
                style={{ width: 36, height: 36, background: '#F3F4F6', border: 'none' }}
              >
                <Lock size={16} color="#6B7280" />
              </button>
              <button
                className="rounded-full flex items-center justify-center cursor-pointer"
                style={{ width: 36, height: 36, background: '#3E1862', border: 'none' }}
              >
                <Mic size={16} color="#FFFFFF" />
              </button>
              <button
                className="rounded-full flex items-center justify-center cursor-pointer"
                style={{ width: 36, height: 36, background: '#F3F4F6', border: 'none' }}
              >
                <Music size={16} color="#6B7280" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Tasks + Stats */}
        <div
          className="flex flex-col overflow-y-auto"
          style={{
            width: '40%',
            borderLeft: '1px solid #E5E7EB',
            paddingLeft: 24,
          }}
        >
          {/* Top action row */}
          <div className="flex items-center justify-between mb-4 pt-1">
            <div
              className="px-4 py-1.5 rounded-full"
              style={{
                background: '#16A34A',
                boxShadow: '0 0 12px rgba(22,163,106,0.25)',
              }}
            >
              <span
                className="text-white"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                25:00
              </span>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg text-[12px] border bg-transparent cursor-pointer"
              style={{ color: '#FF3B30', borderColor: '#FF3B30', fontWeight: 500 }}
              onClick={() => navigate('/summary')}
            >
              End Session
            </button>
          </div>

          {/* Your Tasks */}
          <div className="rounded-xl p-4" style={{ background: '#E8F5E9' }}>
            <h3
              className="mb-3"
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#111111',
              }}
            >
              Your Tasks
            </h3>

            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <SessionTaskCard key={task.id} task={task} />
              ))}
            </div>

            {/* Add task */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#374151' }}
              >
                <Plus size={20} color="#FFFFFF" />
              </button>
              <span className="w-2 h-2 rounded-full" style={{ background: '#D1D1D1' }} />
            </div>
          </div>

          {/* Session Stats card */}
          <div
            className="mt-6 rounded-xl p-5"
            style={{
              background: '#FAF5FF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#111111',
                }}
              >
                Session Stats
              </h4>
              <ChevronDown size={16} color="#9CA3AF" />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#6B7280]">Time focused</span>
                <span
                  className="text-[14px]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    color: '#7C3AED',
                  }}
                >
                  22:15
                </span>
              </div>
              <div
                className="w-full"
                style={{ height: 1, background: '#E5E7EB' }}
              />
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#6B7280]">Distractions</span>
                <span
                  className="text-[14px] text-[#9CA3AF]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                  }}
                >
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}