"use client";

import { MousePointer2 } from "lucide-react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface ActionBarProps {
  secondsRemaining: number;
  round?: number;
  onSkipTask: () => void;
  onNudgeSelf: () => void;
  onLeaveSession: () => void;
}

export function ActionBar({
  secondsRemaining,
  onSkipTask,
  onNudgeSelf,
  onLeaveSession,
}: ActionBarProps) {
  return (
    <div className="flex flex-nowrap items-center justify-between gap-[1vw]">
      <div
        className="shrink-0 whitespace-nowrap rounded-full border border-green-200 bg-green-100 px-5 py-2 tabular-nums text-base font-bold text-green-900"
        aria-label={`${formatTime(secondsRemaining)} remaining`}
        aria-live="polite"
      >
        {formatTime(secondsRemaining)}
      </div>

      <button
        onClick={onSkipTask}
        className="shrink-0 whitespace-nowrap rounded-full border border-zinc-400 px-5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-500 hover:bg-zinc-50 active:bg-zinc-100"
      >
        Skip Current Task
      </button>

      <button
        onClick={onNudgeSelf}
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-purple-500 bg-transparent px-5 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-50 active:bg-purple-100"
      >
        <MousePointer2 size={14} />
        Nudge yourself
      </button>

      <button
        onClick={onLeaveSession}
        className="shrink-0 whitespace-nowrap rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 active:bg-red-700"
      >
        Leave session
      </button>
    </div>
  );
}
