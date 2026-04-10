"use client";

import { EndCallIcon, LockIcon, MutedMicIcon, MusicIcon, UnmutedMicIcon } from "~/components/icons/SessionIcons";
import { cn } from "~/lib/utils";

interface VideoControlsProps {
  mode?: "partner" | "solo";
  onHangUp: () => void;
  onMusicToggle: () => void;
  isMusicOn: boolean;
  isLockIn: boolean;
}

export function VideoControls({
  mode = "partner",
  onHangUp,
  onMusicToggle,
  isMusicOn,
  isLockIn,
}: VideoControlsProps) {
  return (
    <div className="flex items-center justify-between rounded-none bg-white px-3 py-1.5 dark:bg-[#18181B]">
      <div className="w-[22px] shrink-0" aria-hidden="true" />

      <div className="flex items-center gap-3">
        {mode !== "solo" && (
          <>
            <LockIcon
              size={14}
              className={isLockIn ? "text-[#F59E0B]" : "text-zinc-400"}
            />
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
