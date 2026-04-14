"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { PartnerVideoBar } from "~/components/session/PartnerVideoBar";
import { VideoControls } from "~/components/session/VideoControls";
import { VideoFeed } from "~/components/session/VideoFeed";

interface VideoPanelProps {
  mode?: "partner" | "solo";
  partnerName?: string;
  partnerUniversity?: string;
  isLockIn: boolean;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
  isLocalCameraPending?: boolean;
  isVideoReconnecting?: boolean;
  onEnableLocalCamera?: () => void;
  showLocalCameraButton?: boolean;
  onTurnCameraOff?: () => void;
  showTurnCameraOffButton?: boolean;
  localCameraDenied?: boolean;
  localCameraNotFound?: boolean;
  localCameraError?: string | null;
  isCameraOn: boolean;
  onCameraToggle: () => void;
}

export function VideoPanel({
  mode = "partner",
  partnerName,
  partnerUniversity,
  isLockIn,
  localStream = null,
  remoteStream = null,
  isLocalCameraPending = false,
  isVideoReconnecting = false,
  onEnableLocalCamera,
  showLocalCameraButton = false,
  onTurnCameraOff,
  showTurnCameraOffButton = false,
  localCameraDenied = false,
  localCameraNotFound = false,
  localCameraError = null,
  isCameraOn,
  onCameraToggle,
}: VideoPanelProps) {
  const [isMusicOn, setIsMusicOn] = useState(false);

  const showLocalCameraErrorBanner =
    localCameraDenied ||
    localCameraNotFound ||
    (localCameraError != null && localCameraError !== "");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      {isVideoReconnecting && (
        <div
          role="status"
          className="w-[90%] max-w-[800px] rounded-lg border border-blue-600/40 bg-blue-500/15 px-3 py-2 text-center text-xs text-blue-950 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100"
        >
          Reconnecting…
        </div>
      )}
      {showLocalCameraErrorBanner && (
        <div
          role="alert"
          className="w-[90%] max-w-[800px] space-y-2 text-sm"
        >
          {localCameraDenied && (
            <div className="rounded-lg border border-amber-600/40 bg-amber-500/15 px-3 py-2 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
              Camera permission denied — nudge tracking won&apos;t be available
              this session.
            </div>
          )}
          {localCameraNotFound && (
            <div className="rounded-lg border border-red-600/40 bg-red-500/15 px-3 py-2 text-red-950 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-100">
              No camera found. Connect a camera or check system settings.
            </div>
          )}
          {localCameraError &&
            !localCameraDenied &&
            !localCameraNotFound && (
              <div className="rounded-lg border border-red-600/40 bg-red-500/15 px-3 py-2 text-red-950 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-100">
                <p>{localCameraError}</p>
                {onEnableLocalCamera && (
                  <button
                    type="button"
                    onClick={() => void onEnableLocalCamera()}
                    disabled={isLocalCameraPending}
                    className="mt-2 rounded-md bg-red-900/20 px-2 py-1 text-xs font-medium text-red-950 hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-400/20 dark:text-red-50 dark:hover:bg-red-400/30"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}
        </div>
      )}
      <div className="relative aspect-video w-[90%] max-w-[800px] overflow-hidden rounded-2xl border border-black bg-white shadow-md dark:border-[#3F3F46] dark:bg-[#27272A]">
        <div className="absolute inset-0 z-0">
          <VideoFeed stream={localStream} variant="user" />
        </div>
        {isLocalCameraPending && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
          </div>
        )}
        {showLocalCameraButton && onEnableLocalCamera && !isLocalCameraPending && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <button
              type="button"
              onClick={() => void onEnableLocalCamera()}
              className="pointer-events-auto rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-violet-800"
            >
              Turn camera on
            </button>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <VideoControls
            mode={mode}
            onHangUp={() => undefined}
            onMusicToggle={() => setIsMusicOn((prev) => !prev)}
            isMusicOn={isMusicOn}
            isLockIn={isLockIn}
            onEnableCamera={onEnableLocalCamera}
            showEnableCameraButton={showLocalCameraButton}
            isEnableCameraPending={isLocalCameraPending}
            onTurnCameraOff={onTurnCameraOff}
            showTurnCameraOffButton={showTurnCameraOffButton}
            isCameraOn={isCameraOn}
            onCameraToggle={onCameraToggle}
          />
        </div>
      </div>

      {mode !== "solo" && (
        <div className="relative aspect-video w-[90%] max-w-[800px] overflow-hidden rounded-2xl border border-black bg-white shadow-md dark:border-[#3F3F46] dark:bg-[#27272A]">
          <VideoFeed stream={remoteStream} variant="partner" />
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
