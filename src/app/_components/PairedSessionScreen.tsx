import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SessionTimeline } from './SessionTimeline';
import { WebcamFeeds } from './WebcamFeeds';
import { RightPanel } from './RightPanel';
import { LeaveConfirmModal } from './LeaveConfirmModal';
import { NudgeToast, useNudgeToast } from './NudgeToast';

export function PairedSessionScreen() {
  const navigate = useNavigate();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const nudgeToast = useNudgeToast();

  return (
    <div
      className="flex-1 flex flex-col min-h-0 relative"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Timeline */}
      <div className="px-6 pt-5 flex justify-center">
        <SessionTimeline />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 min-h-0 px-6 pb-5 gap-6">
        {/* LEFT — Webcams */}
        <div className="flex flex-col" style={{ width: '55%' }}>
          <WebcamFeeds
            onEndCall={() => setShowLeaveModal(true)}
          />
        </div>

        {/* RIGHT — Tasks panel */}
        <div style={{ width: '45%' }}>
          <RightPanel
            onLeave={() => setShowLeaveModal(true)}
            onNudge={() => nudgeToast.show()}
          />
        </div>
      </div>

      {/* Leave confirmation modal */}
      {showLeaveModal && (
        <LeaveConfirmModal
          onStay={() => setShowLeaveModal(false)}
          onLeave={() => navigate('/summary')}
        />
      )}

      {/* Nudge toast */}
      <NudgeToast visible={nudgeToast.visible} />
    </div>
  );
}
