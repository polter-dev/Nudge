import { Check, X, MousePointer } from 'lucide-react';

export type TaskStatus = 'completed' | 'active' | 'pending' | 'skipped' | 'action';

export interface SessionTask {
  id: number;
  name: string;
  status: TaskStatus;
  time?: string;
}

export function SessionTaskCard({ task }: { task: SessionTask }) {
  const leftBorderColor =
    task.status === 'completed'
      ? '#16A34A'
      : task.status === 'active' || task.status === 'action'
        ? '#7C3AED'
        : '#D1D1D1';

  const bgColor =
    task.status === 'completed'
      ? '#F0FDF4'
      : task.status === 'active'
        ? '#FAF5FF'
        : '#FFFFFF';

  /* ── Action-revealed state ── */
  if (task.status === 'action') {
    return (
      <div className="relative flex items-center">
        <div
          className="flex-1 flex items-center rounded-[10px] relative"
          style={{
            padding: '12px 16px',
            background: '#FAF5FF',
            border: '1px solid #E5E7EB',
            borderLeft: `4px solid #7C3AED`,
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            transform: 'translateX(-60px)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* Purple circle with number */}
          <div
            className="rounded-full flex items-center justify-center shrink-0 mr-3"
            style={{ width: 20, height: 20, background: '#7C3AED' }}
          >
            <span
              className="text-[11px] text-white"
              style={{ fontWeight: 600 }}
            >
              {task.id}
            </span>
          </div>
          <span
            className="flex-1 text-[14px] text-[#111111]"
            style={{ fontWeight: 600 }}
          >
            {task.name}
          </span>
          <span
            className="text-[12px] ml-3 shrink-0"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              color: '#7C3AED',
            }}
          >
            {task.time}
          </span>
        </div>
        {/* Revealed action buttons */}
        <div className="flex items-center gap-2 ml-2">
          <button
            className="rounded-full flex items-center justify-center cursor-pointer"
            style={{ width: 36, height: 36, background: '#16A34A', border: 'none' }}
          >
            <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
          </button>
          <button
            className="rounded-full flex items-center justify-center cursor-pointer"
            style={{ width: 36, height: 36, background: '#EF4444', border: 'none' }}
          >
            <X size={16} color="#FFFFFF" strokeWidth={2.5} />
          </button>
          <MousePointer size={12} color="#9CA3AF" className="ml-0.5" />
        </div>
      </div>
    );
  }

  /* ── All other states ── */
  return (
    <div
      className="flex items-center rounded-[10px]"
      style={{
        padding: '12px 16px',
        background: bgColor,
        border: '1px solid #E5E7EB',
        borderLeft: `4px solid ${leftBorderColor}`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Left circle indicator */}
      {task.status === 'completed' ? (
        <div
          className="rounded-full flex items-center justify-center shrink-0 mr-3"
          style={{ width: 20, height: 20, background: '#16A34A' }}
        >
          <Check size={12} color="#FFFFFF" strokeWidth={3} />
        </div>
      ) : task.status === 'active' ? (
        <div
          className="rounded-full flex items-center justify-center shrink-0 mr-3"
          style={{ width: 20, height: 20, background: '#7C3AED' }}
        >
          <span className="text-[11px] text-white" style={{ fontWeight: 600 }}>
            {task.id}
          </span>
        </div>
      ) : (
        /* pending / skipped — gray outlined circle */
        <div
          className="rounded-full flex items-center justify-center shrink-0 mr-3"
          style={{
            width: 20,
            height: 20,
            background: 'transparent',
            border: '2px solid #D1D1D1',
          }}
        >
          <span className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 600 }}>
            {task.id}
          </span>
        </div>
      )}

      {/* Task name */}
      <span
        className="flex-1 text-[14px]"
        style={{
          fontWeight: task.status === 'active' ? 600 : 400,
          color:
            task.status === 'completed'
              ? '#6B7280'
              : task.status === 'skipped'
                ? '#9CA3AF'
                : '#111111',
          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
          fontStyle: task.status === 'skipped' ? 'italic' : 'normal',
        }}
      >
        {task.name}
      </span>

      {/* Right — time / status */}
      {task.status === 'completed' && (
        <span
          className="text-[12px] ml-3 shrink-0 text-[#9CA3AF]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
          }}
        >
          {task.time}
        </span>
      )}
      {task.status === 'active' && (
        <span
          className="text-[12px] ml-3 shrink-0"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            color: '#7C3AED',
          }}
        >
          {task.time}
        </span>
      )}
      {task.status === 'pending' && (
        <span
          className="text-[12px] ml-3 shrink-0 text-[#9CA3AF]"
          style={{ fontWeight: 400 }}
        >
          —
        </span>
      )}
      {task.status === 'skipped' && (
        <span
          className="text-[11px] ml-3 shrink-0 text-[#9CA3AF]"
          style={{ fontWeight: 400, fontStyle: 'italic' }}
        >
          Skipped
        </span>
      )}
    </div>
  );
}
