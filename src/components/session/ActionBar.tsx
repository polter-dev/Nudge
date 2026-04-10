"use client";

import { NudgeIcon } from "~/components/icons/SessionIcons";

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

/** ~Length ratio "Skip Current Task" : "Nudge yourself" for proportional flex growth */
const SKIP_GROW = 1.22;
const NUDGE_GROW = 1;

export function ActionBar({
  secondsRemaining,
  onSkipTask,
  onNudgeSelf,
  onLeaveSession,
}: ActionBarProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <div
        className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-green-200 bg-green-100 px-5 tabular-nums text-sm font-bold leading-none text-green-900 dark:border-green-900 dark:bg-[#064E3B] dark:text-[#4ADE80]"
        aria-label={`${formatTime(secondsRemaining)} remaining`}
        aria-live="polite"
      >
        {formatTime(secondsRemaining)}
      </div>

      <div className="flex min-w-0 flex-1 items-stretch gap-1">
        <button
          type="button"
          onClick={onSkipTask}
          className="inline-flex h-9 min-w-0 items-center justify-center whitespace-nowrap rounded-full border border-zinc-400 px-4 py-0 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-500 hover:bg-zinc-50 active:bg-zinc-100 dark:border-[#3F3F46] dark:bg-[#27272A] dark:text-[#F4F4F5] dark:hover:border-[#52525B] dark:hover:bg-[#3F3F46] dark:active:bg-[#52525B]"
          style={{ flex: `${SKIP_GROW} 1 0%` }}
        >
          Skip Current Task
        </button>

        <button
          type="button"
          onClick={onNudgeSelf}
          className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-purple-500 bg-transparent py-2 pl-1 pr-4 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-50 active:bg-purple-100 dark:border-[#A855F7] dark:text-[#A855F7] dark:hover:bg-[rgba(168,85,247,0.1)] dark:active:bg-[rgba(168,85,247,0.2)]"
          style={{ flex: `${NUDGE_GROW} 1 0%` }}
        >
          <NudgeIcon size={16} className="shrink-0" />
          Nudge yourself
        </button>
      </div>

      <button
        type="button"
        onClick={onLeaveSession}
        className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-red-600 px-5 py-0 text-sm font-medium text-white transition-colors hover:bg-red-500 active:bg-red-700"
      >
        Leave session
      </button>
    </div>
  );
}
