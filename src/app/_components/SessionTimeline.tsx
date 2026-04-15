import { Check } from 'lucide-react';

export function SessionTimeline() {
  return (
    <div
      className="flex flex-col justify-center"
      style={{
        width: 700,
        height: 80,
        fontFamily: "'General Sans', sans-serif",
      }}
    >
      {/* Top labels */}
      <div className="flex items-end mb-1.5">
        <div className="flex justify-center" style={{ width: 'calc(15% - 1.5px)' }}>
          <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 400 }}>
            Intro
          </span>
        </div>
        <div style={{ width: 3 }} />
        <div className="flex justify-center" style={{ width: 'calc(70% - 3px)' }}>
          <span
            className="text-[13px] tracking-wide"
            style={{
              fontWeight: 600,
              color: '#F59E0B',
              textTransform: 'uppercase' as const,
            }}
          >
            LOCK IN
          </span>
        </div>
        <div style={{ width: 3 }} />
        <div className="flex justify-center" style={{ width: 'calc(15% - 1.5px)' }}>
          <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 400 }}>
            Debrief
          </span>
        </div>
      </div>

      {/* Bar row */}
      <div className="flex items-center w-full relative" style={{ height: 16 }}>
        {/* Intro — fully filled purple (completed) */}
        <div className="relative" style={{ width: 'calc(15% - 1.5px)', height: 8 }}>
          <div
            className="w-full h-full rounded-l-full"
            style={{ background: '#7C3AED' }}
          />
          {/* Purple checkmark dot */}
          <div
            className="absolute top-1/2 right-0 flex items-center justify-center"
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#7C3AED',
              transform: 'translate(50%, -50%)',
              zIndex: 2,
              boxShadow: '0 0 0 2px #FFFFFF',
            }}
          >
            <Check size={8} color="#FFFFFF" strokeWidth={3} />
          </div>
        </div>

        <div style={{ width: 3, flexShrink: 0 }} />

        {/* Lock In — partially filled amber */}
        <div
          className="relative"
          style={{ width: 'calc(70% - 3px)', height: 8 }}
        >
          {/* Gray background */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{ background: '#E5E7EB' }}
          />
          {/* Amber fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-sm"
            style={{ width: '40%', background: '#F59E0B' }}
          />
          {/* Progress circle at boundary */}
          <div
            className="absolute top-1/2"
            style={{
              left: '40%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2px solid #F59E0B',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            }}
          />
        </div>

        <div style={{ width: 3, flexShrink: 0 }} />

        {/* Debrief — unfilled gray */}
        <div style={{ width: 'calc(15% - 1.5px)', height: 8 }}>
          <div
            className="w-full h-full rounded-r-full"
            style={{ background: '#E5E7EB' }}
          />
        </div>
      </div>

      {/* Bottom time labels */}
      <div className="flex items-start mt-1.5">
        <div className="flex justify-center" style={{ width: 'calc(15% - 1.5px)' }}>
          <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 400 }}>
            5:00
          </span>
        </div>
        <div style={{ width: 3 }} />
        <div className="flex justify-center" style={{ width: 'calc(70% - 3px)' }}>
          <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 400 }}>
            25:00
          </span>
        </div>
        <div style={{ width: 3 }} />
        <div className="flex justify-center" style={{ width: 'calc(15% - 1.5px)' }}>
          <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 400 }}>
            3:00
          </span>
        </div>
      </div>
    </div>
  );
}
