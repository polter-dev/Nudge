"use client";

import { Mic } from "lucide-react";

import { EndCallIcon, LockIcon, MicMutedIcon, MusicIcon } from "~/components/icons/SessionIcons";
import { cn } from "~/lib/utils";

interface VideoControlsProps {
  onHangUp: () => void;
  onMusicToggle: () => void;
  isMusicOn: boolean;
  isLockIn: boolean;
}

export function VideoControls({
  onHangUp,
  onMusicToggle,
  isMusicOn,
  isLockIn,
}: VideoControlsProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-1.5">
      <div className="w-[22px] shrink-0" aria-hidden="true" />

      <div className="flex items-center gap-3">
        <LockIcon
          size={14}
          className={isLockIn ? "text-[#F59E0B]" : "text-zinc-400"}
        />
        <div className="flex items-center justify-center rounded-full bg-[#7C3AED]/10 p-1.5">
          {isLockIn ? (
            <MicMutedIcon size={16} className="text-[#7C3AED]" />
          ) : (
            <Mic size={16} className="text-[#7C3AED]" />
          )}
        </div>

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
          "flex items-center justify-center rounded-full border border-zinc-200 bg-white p-1.5 transition-colors",
          isMusicOn ? "text-zinc-800" : "text-zinc-600 hover:text-zinc-800",
        )}
      >
        <MusicIcon size={14} />
      </button>
    </div>
  );
}
