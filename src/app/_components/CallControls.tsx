import {
  Lock,
  Unlock,
  Mic,
  MicOff,
  PhoneOff,
  Music,
} from 'lucide-react';

/* ─── Single icon button ─── */
function ControlButton({
  bg,
  iconColor,
  children,
}: {
  bg: string;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-opacity hover:opacity-85"
      style={{ background: bg, color: iconColor }}
    >
      {children}
    </button>
  );
}

/* ─── Pill bar shell ─── */
function BarShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center justify-center gap-3 rounded-full px-5"
      style={{
        width: 240,
        height: 48,
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      {children}
    </div>
  );
}

/* ─── State 1: Active / Locked-in ─── */
export function CallControlsActive() {
  return (
    <BarShell>
      <ControlButton bg="#F3F4F6" iconColor="#6B7280">
        <Lock size={16} strokeWidth={2.2} />
      </ControlButton>
      <ControlButton bg="#3E1862" iconColor="#FFFFFF">
        <Mic size={16} strokeWidth={2.2} />
      </ControlButton>
      <ControlButton bg="#FF3B30" iconColor="#FFFFFF">
        <PhoneOff size={16} strokeWidth={2.2} />
      </ControlButton>
      <ControlButton bg="#F3F4F6" iconColor="#6B7280">
        <Music size={16} strokeWidth={2.2} />
      </ControlButton>
    </BarShell>
  );
}

/* ─── State 2: Muted / Unlocked ─── */
export function CallControlsMuted() {
  return (
    <BarShell>
      <button
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-opacity hover:opacity-85"
        style={{
          background: 'transparent',
          border: '2px solid #3E1862',
          color: '#3E1862',
        }}
      >
        <Unlock size={16} strokeWidth={2.2} />
      </button>
      <ControlButton bg="#FF3B30" iconColor="#FFFFFF">
        <MicOff size={16} strokeWidth={2.2} />
      </ControlButton>
      <ControlButton bg="#FF3B30" iconColor="#FFFFFF">
        <PhoneOff size={16} strokeWidth={2.2} />
      </ControlButton>
      <ControlButton bg="#F3F4F6" iconColor="#6B7280">
        <Music size={16} strokeWidth={2.2} />
      </ControlButton>
    </BarShell>
  );
}

/* ─── Showcase ─── */
export function CallControls() {
  return (
    <div
      className="flex flex-col items-center gap-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Label */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] tracking-widest text-[#9CA3AF] uppercase">
          Active — Locked In
        </span>
        <CallControlsActive />
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] tracking-widest text-[#9CA3AF] uppercase">
          Muted — Unlocked
        </span>
        <CallControlsMuted />
      </div>
    </div>
  );
}