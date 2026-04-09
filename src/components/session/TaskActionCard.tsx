"use client";

import { Check, X } from "lucide-react";

interface TaskActionCardProps {
  taskTitle: string;
  onComplete: () => void;
  onSkip: () => void;
}

export function TaskActionCard({ taskTitle, onComplete, onSkip }: TaskActionCardProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-green-600 bg-white px-3 py-2">
      <button
        type="button"
        onClick={onComplete}
        aria-label="Mark complete"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-500"
      >
        <Check size={14} strokeWidth={3} />
      </button>
      <span className="flex-1 truncate px-3 text-sm font-medium text-zinc-800">{taskTitle}</span>
      <button
        type="button"
        onClick={onSkip}
        aria-label="Skip task"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400"
      >
        <X size={14} strokeWidth={3} />
      </button>
    </div>
  );
}
