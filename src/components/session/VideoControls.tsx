"use client";

import {
  CameraOffIcon,
  CameraOnIcon,
  EndCallIcon,
  MutedMicIcon,
  MusicIcon,
  UnmutedMicIcon,
} from "~/components/icons/SessionIcons";
import { cn } from "~/lib/utils";

interface VideoControlsProps {
  mode?: "partner" | "solo";
  onHangUp: () => void;
  onMusicToggle: () => void;
  isMusicOn: boolean;
  isLockIn: boolean;
  onEnableCamera?: () => void;
  showEnableCameraButton?: boolean;
  isEnableCameraPending?: boolean;
  onTurnCameraOff?: () => void;
  showTurnCameraOffButton?: boolean;
  isCameraOn: boolean;
  onCameraToggle: () => void;
}

export function VideoControls({
  mode = "partner",
  onHangUp,
  onMusicToggle,
  isMusicOn,
  isLockIn,
  onEnableCamera,
  showEnableCameraButton = false,
  isEnableCameraPending = false,
  onTurnCameraOff,
  showTurnCameraOffButton = false,
  isCameraOn,
  onCameraToggle,
}: VideoControlsProps) {
  const leftControl =
    showEnableCameraButton && onEnableCamera ? (
      <button
        type="button"
        onClick={() => void onEnableCamera()}
        disabled={isEnableCameraPending}
        className={cn(
          "rounded-md bg-violet-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        Turn camera on
      </button>
    ) : showTurnCameraOffButton && onTurnCameraOff ? (
      <button
        type="button"
        onClick={() => void onTurnCameraOff()}
        className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-[10px] font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-[#3F3F46] dark:bg-[#27272A] dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        Turn camera off
      </button>
    ) : (
      <span className="inline-block w-[22px] shrink-0" aria-hidden="true" />
    );

  return (
    <div className="flex items-center justify-between gap-2 rounded-none bg-white px-3 py-1.5 dark:bg-[#18181B]">
      <div className="min-w-0 shrink">{leftControl}</div>

      <div className="flex items-center gap-3">
        {mode !== "solo" && (
          <>
            <button
              type="button"
              onClick={() => onCameraToggle()}
              aria-label={isCameraOn ? "Turn camera off" : "Turn camera on"}
              className="flex items-center justify-center rounded-full transition-opacity hover:opacity-90 active:scale-95"
            >
              {isCameraOn ? (
                <CameraOnIcon size={32} />
              ) : (
                <CameraOffIcon size={32} />
              )}
            </button>
            <div className="relative flex items-center justify-center">
              {isLockIn ? (
                <>
                  <MutedMicIcon size={32} />
                  <svg
                    viewBox="0 0 428 428"
                    width={32}
                    height={32}
                    className="absolute inset-0"
                    aria-hidden="true"
                  >
                    <circle cx="213.817" cy="213.817" r="210.817" fill="black" fillOpacity={0.41} />
                  </svg>
                </>
              ) : (
                <UnmutedMicIcon size={32} />
              )}
            </div>
          </>
        )}

        <button
          onClick={onHangUp}
          aria-label="Leave session"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80 active:scale-95"
        >
          <EndCallIcon size={32} />
        </button>
      </div>

      <button
        onClick={onMusicToggle}
        aria-label={isMusicOn ? "Turn off ambient music" : "Turn on ambient music"}
        className={cn(
          "flex items-center justify-center rounded-full border border-zinc-200 bg-white p-1.5 transition-colors dark:border-[#3F3F46] dark:bg-[#18181B]",
          isMusicOn
            ? "text-zinc-800 dark:text-[#F4F4F5]"
            : "text-zinc-600 hover:text-zinc-800 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5]",
        )}
      >
        <MusicIcon size={14} />
      </button>
    </div>
  );
}
