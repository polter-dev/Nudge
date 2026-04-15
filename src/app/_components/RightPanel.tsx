import { Bell, Plus } from 'lucide-react';
import { SessionTaskCard } from './SessionTaskCard';
import type { SessionTask } from './SessionTaskCard';

const tasks: SessionTask[] = [
  { id: 1, name: 'Calc 2 Quiz Prep', status: 'completed', time: '15:30' },
  { id: 2, name: 'Chemistry homework + notes', status: 'completed', time: '4:00' },
  { id: 3, name: 'Trip planning: itinerary + shopping list', status: 'skipped' },
  { id: 4, name: 'ENC paper draft', status: 'active', time: '4:02' },
  { id: 5, name: 'Read Ch. 7 Psychology', status: 'action', time: '0:00' },
];

export function RightPanel({ onLeave, onNudge }: { onLeave?: () => void; onNudge?: () => void }) {
  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{
        borderLeft: '1px solid #E5E7EB',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top action row */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Timer pill */}
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

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-lg text-[12px] text-[#6B7280] border border-[#D1D5DB] bg-transparent"
            style={{ fontWeight: 500 }}
          >
            Skip Task
          </button>
          <button
            className="px-3 py-1.5 rounded-lg text-[12px] text-white flex items-center gap-1.5"
            style={{ background: '#3E1862', fontWeight: 500 }}
            onClick={onNudge}
          >
            <Bell size={12} />
            Nudge yourself
          </button>
          <button
            className="px-3 py-1.5 rounded-lg text-[12px] border bg-transparent"
            style={{
              color: '#FF3B30',
              borderColor: '#FF3B30',
              fontWeight: 500,
            }}
            onClick={onLeave}
          >
            Leave
          </button>
        </div>
      </div>

      {/* Your Tasks section */}
      <div
        className="mx-4 mb-3 rounded-xl p-4"
        style={{ background: '#E8F5E9' }}
      >
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

        {/* Add task button */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: '#374151' }}
          >
            <Plus size={20} color="#FFFFFF" />
          </button>
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: '#D1D1D1' }}
          />
        </div>
      </div>

      {/* Partner's Focus section */}
      <div className="px-4 pb-4">
        <div
          className="rounded-xl p-5"
          style={{ background: '#FBE3A1' }}
        >
          <h4
            className="mb-3"
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              color: '#111111',
            }}
          >
            Partner's Focus
          </h4>
          <div
            className="flex items-center px-4 py-3 rounded-[10px]"
            style={{
              background: '#FFFFFF',
              border: '1px solid #FDE68A',
            }}
          >
            <span className="flex-1 text-[13px] text-[#111]" style={{ fontWeight: 500 }}>
              Anatomy homework & flashcards
            </span>
            <span
              className="text-[12px] text-[#9CA3AF] ml-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              15:30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
