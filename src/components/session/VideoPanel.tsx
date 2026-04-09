"use client";

import { useState } from "react";

import { PartnerVideoBar } from "~/components/session/PartnerVideoBar";
import { VideoControls } from "~/components/session/VideoControls";
import { VideoFeed } from "~/components/session/VideoFeed";

interface VideoPanelProps {
  partnerName: string;
  partnerUniversity: string;
  isLockIn: boolean;
}

export function VideoPanel({ partnerName, partnerUniversity, isLockIn }: VideoPanelProps) {
  const [isMusicOn, setIsMusicOn] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      {/* User video — controls overlaid at bottom */}
      <div className="relative aspect-video w-[90%] max-w-[800px] overflow-hidden rounded-2xl bg-white shadow-md">
        <VideoFeed stream={null} variant="user" />
        <div className="absolute bottom-3 left-3 right-3">
          <VideoControls
            onHangUp={() => undefined}
            onMusicToggle={() => setIsMusicOn((prev) => !prev)}
            isMusicOn={isMusicOn}
            isLockIn={isLockIn}
          />
        </div>
      </div>

      {/* Partner video — info bar overlaid at bottom */}
      <div className="relative aspect-video w-[90%] max-w-[800px] overflow-hidden rounded-2xl bg-white shadow-md">
        <VideoFeed stream={null} variant="partner" />
        <div className="absolute bottom-3 left-3 right-3">
          <PartnerVideoBar
            partnerName={partnerName}
            partnerUniversity={partnerUniversity}
          />
        </div>
      </div>
    </div>
  );
}
