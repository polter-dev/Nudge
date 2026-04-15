import { Check, X, MousePointer2 } from 'lucide-react';

/* ─── Shared card wrapper ─── */
function CardShell({
  borderColor,
  bg = '#FFFFFF',
  children,
  shift = false,
}: {
  borderColor: string;
  bg?: string;
  children: React.ReactNode;
  shift?: boolean;
}) {
  return (
    <div
      className="flex items-center rounded-[10px] px-4 py-3"
      style={{
        width: 400,
        background: bg,
        border: '1px solid #E5E7EB',
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        transform: shift ? 'translateX(-60px)' : 'none',
        transition: 'transform 0.25s ease',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Indicator circles ─── */
function FilledCircle({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
      style={{ background: color }}
    >
      {children}
    </div>
  );
}

function OutlinedCircle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
      style={{ border: '1.5px solid #D1D5DB' }}
    >
      {children}
    </div>
  );
}

/* ─── 1. COMPLETED ─── */
function CompletedCard() {
  return (
    <CardShell borderColor="#16A34A" bg="#F0FDF4">
      <FilledCircle color="#16A34A">
        <Check size={12} color="#FFFFFF" strokeWidth={3} />
      </FilledCircle>
      <span
        className="flex-1 mx-3 text-[14px]"
        style={{
          color: '#6B7280',
          textDecoration: 'line-through',
        }}
      >
        Calc 2 Quiz Prep
      </span>
      <span
        className="text-[12px] text-[#9CA3AF] shrink-0"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        15:30
      </span>
    </CardShell>
  );
}

/* ─── 2. ACTIVE ─── */
function ActiveCard({ shift = false }: { shift?: boolean }) {
  return (
    <CardShell borderColor="#7C3AED" bg="#FAF5FF" shift={shift}>
      <FilledCircle color="#7C3AED">
        <span className="text-[11px] text-white" style={{ fontWeight: 600 }}>
          4
        </span>
      </FilledCircle>
      <span
        className="flex-1 mx-3 text-[14px]"
        style={{ fontWeight: 600, color: '#111111' }}
      >
        ENC paper draft
      </span>
      <span
        className="text-[12px] shrink-0"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          color: '#7C3AED',
        }}
      >
        4:02
      </span>
    </CardShell>
  );
}

/* ─── 3. PENDING ─── */
function PendingCard() {
  return (
    <CardShell borderColor="#D1D5DB">
      <OutlinedCircle>
        <span className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
          5
        </span>
      </OutlinedCircle>
      <span className="flex-1 mx-3 text-[14px]" style={{ color: '#111111' }}>
        Read Chapter 12
      </span>
      <span
        className="text-[12px] text-[#D1D5DB] shrink-0"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        —
      </span>
    </CardShell>
  );
}

/* ─── 4. SKIPPED ─── */
function SkippedCard() {
  return (
    <CardShell borderColor="#D1D5DB">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{ background: '#E5E7EB' }}
      >
        <span className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
          3
        </span>
      </div>
      <span
        className="flex-1 mx-3 text-[14px]"
        style={{ color: '#9CA3AF', fontStyle: 'italic' }}
      >
        Trip planning
      </span>
      <span
        className="text-[11px] text-[#9CA3AF] shrink-0"
        style={{ fontStyle: 'italic' }}
      >
        Skipped
      </span>
    </CardShell>
  );
}

/* ─── 5. ACTION REVEALED (swipe) ─── */
function ActionRevealedCard() {
  return (
    <div className="relative" style={{ width: 400, height: 48 }}>
      {/* Action buttons revealed behind the card */}
      <div
        className="absolute right-0 top-0 bottom-0 flex items-center gap-2 pr-1"
        style={{ width: 100 }}
      >
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#16A34A' }}
        >
          <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
        </button>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#EF4444' }}
        >
          <X size={16} color="#FFFFFF" strokeWidth={2.5} />
        </button>
        {/* Cursor hint */}
        <MousePointer2
          size={14}
          color="#9CA3AF"
          className="absolute"
          style={{ bottom: 2, right: 2 }}
        />
      </div>

      {/* Shifted active card on top */}
      <div className="absolute inset-0">
        <ActiveCard shift />
      </div>
    </div>
  );
}

/* ─── Showcase export ─── */
export function TaskCards() {
  return (
    <div
      className="flex flex-col gap-2"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <CompletedCard />
      <ActiveCard />
      <PendingCard />
      <SkippedCard />
      <ActionRevealedCard />
    </div>
  );
}
