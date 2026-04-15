import { Lock, Mic, PhoneOff, Music, Wifi } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const userImage =
  'https://images.unsplash.com/photo-1701889297494-16eb5bc8dca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBkZXNrJTIwbGFwdG9wfGVufDF8fHx8MTc3MTkzNjA4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const partnerImage =
  'https://images.unsplash.com/photo-1686543971025-15aa01b5f7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0dWR5aW5nJTIwY29tcHV0ZXIlMjB3ZWJjYW18ZW58MXx8fHwxNzcxOTc1MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

export function WebcamFeeds({ onEndCall }: { onEndCall?: () => void }) {
  return (
    <div className="flex flex-col flex-1 gap-4 relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* User webcam */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          flex: '0 0 58%',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <ImageWithFallback
          src={userImage}
          alt="Your webcam"
          className="w-full h-full object-cover"
        />
        {/* You pill */}
        <div
          className="absolute bottom-3 left-3 px-3 py-1 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <span className="text-[13px]" style={{ fontWeight: 600, color: '#111' }}>
            You
          </span>
        </div>
      </div>

      {/* Partner webcam */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          flex: '0 0 38%',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <ImageWithFallback
          src={partnerImage}
          alt="Partner webcam"
          className="w-full h-full object-cover"
        />
        {/* Partner name pill */}
        <div
          className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: '#16A34A' }}
            />
            <div className="flex flex-col">
              <span className="text-[13px]" style={{ fontWeight: 600, color: '#111' }}>
                Zack J.
              </span>
              <span className="text-[10px] text-[#9CA3AF] -mt-0.5">
                University of Florida
              </span>
            </div>
          </div>
        </div>
        {/* Wifi indicator */}
        <div
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <Wifi size={14} color="#9CA3AF" />
        </div>
      </div>

      {/* Floating call controls */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{
          bottom: '-4px',
          background: '#FFFFFF',
          borderRadius: '9999px',
          height: 48,
          width: 240,
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
          style={{ width: 36, height: 36, background: '#FF3B30', border: 'none' }}
          onClick={onEndCall}
        >
          <PhoneOff size={16} color="#FFFFFF" />
        </button>
        <button
          className="rounded-full flex items-center justify-center cursor-pointer"
          style={{ width: 36, height: 36, background: '#F3F4F6', border: 'none' }}
        >
          <Music size={16} color="#6B7280" />
        </button>
      </div>
    </div>
  );
}