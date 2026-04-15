export function LeaveConfirmModal({
  onStay,
  onLeave,
}: {
  onStay: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.50)' }}
    >
      <div
        className="flex flex-col items-center"
        style={{
          width: 360,
          background: '#FFFFFF',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
          padding: 32,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <h3
          className="text-[18px] text-[#111111]"
          style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 700 }}
        >
          Leave this session?
        </h3>
        <p className="text-[13px] text-[#9CA3AF]" style={{ marginTop: 6 }}>
          Your progress will be saved.
        </p>

        <div className="flex items-center gap-3 w-full" style={{ marginTop: 24 }}>
          <button
            onClick={onStay}
            className="flex-1 flex items-center justify-center text-white text-[14px] cursor-pointer transition-colors"
            style={{
              height: 44,
              borderRadius: 8,
              background: '#7C3AED',
              border: 'none',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#6B21A8')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#7C3AED')}
          >
            Stay
          </button>
          <button
            onClick={onLeave}
            className="flex-1 flex items-center justify-center text-[14px] cursor-pointer transition-colors"
            style={{
              height: 44,
              borderRadius: 8,
              background: '#FFFFFF',
              border: '1px solid #FF3B30',
              color: '#FF3B30',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}
