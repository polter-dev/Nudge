"use client";

import { useState } from "react";

import { PartnerVideoBar } from "~/components/session/PartnerVideoBar";
import { VideoControls } from "~/components/session/VideoControls";
import { VideoFeed } from "~/components/session/VideoFeed";

interface VideoPanelProps {
  mode?: "partner" | "solo";
  partnerName?: string;
  partnerUniversity?: string;
  isLockIn: boolean;
}

export function VideoPanel({
  mode = "partner",
  partnerName,
  partnerUniversity,
  isLockIn,
}: VideoPanelProps) {
  const [isMusicOn, setIsMusicOn] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      {/* User video — controls overlaid at bottom */}
      <div className="relative aspect-video w-[90%] max-w-[800px] overflow-hidden rounded-2xl border border-black bg-white shadow-md dark:border-[#3F3F46] dark:bg-[#27272A]">
        <VideoFeed stream={null} variant="user" />
        <div className="absolute bottom-0 left-0 right-0">
          <VideoControls
            mode={mode}
            onHangUp={() => undefined}
            onMusicToggle={() => setIsMusicOn((prev) => !prev)}
            isMusicOn={isMusicOn}
            isLockIn={isLockIn}
          />
        </div>
      </div>

      {mode !== "solo" && (
        <div className="relative aspect-video w-[90%] max-w-[800px] overflow-hidden rounded-2xl border border-black bg-white shadow-md dark:border-[#3F3F46] dark:bg-[#27272A]">
          <VideoFeed stream={null} variant="partner" />
          <div className="absolute bottom-0 left-0 right-0">
            <PartnerVideoBar
              partnerName={partnerName ?? ""}
              partnerUniversity={partnerUniversity ?? ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}
