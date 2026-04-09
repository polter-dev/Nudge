"use client";

import { Check, GripVertical, X } from "lucide-react";

import { cn } from "~/lib/utils";
import { type SessionTask } from "~/types/session";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface TaskCardProps {
  task: SessionTask;
  isCurrent: boolean;
  positionNumber: number;
  isDragging?: boolean;
  dragHandleAttributes?: React.HTMLAttributes<HTMLButtonElement>;
  dragHandleListeners?: React.HTMLAttributes<HTMLButtonElement>;
}

export function TaskCard({
  task,
  isCurrent,
  positionNumber,
  isDragging,
  dragHandleAttributes,
  dragHandleListeners,
}: TaskCardProps) {
  const isActive = task.status === "active";
  const isCompleted = task.status === "completed";
  const isSkipped = task.status === "skipped";

  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-shadow",
        isDragging && "shadow-lg",
        isActive && "border-2 border-zinc-900 bg-white",
        isCompleted && "border-transparent bg-[--color-task-done]",
        isSkipped && "border-transparent bg-[--color-task-done]",
      )}
    >
      {isActive ? (
        <button
          aria-label="Drag to reorder"
          className="shrink-0 cursor-grab touch-none text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
          {...dragHandleAttributes}
          {...dragHandleListeners}
        >
          <GripVertical size={14} />
        </button>
      ) : (
        <div className="w-[14px] shrink-0" />
      )}

      {isActive && (
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            isCurrent
              ? "border-2 border-amber-400 bg-transparent text-zinc-800"
              : "border-2 border-zinc-300 bg-transparent text-zinc-400",
          )}
        >
          {positionNumber}
        </div>
      )}

      {isCompleted && (
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
          <Check size={11} className="text-white" strokeWidth={3} />
        </div>
      )}

      {isSkipped && (
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black">
          <X size={11} className="text-white" strokeWidth={3} />
        </div>
      )}

      <span
        className={cn(
          "flex-1 truncate text-sm",
          isActive && "font-medium text-zinc-800",
          isCompleted && "font-medium text-zinc-400 line-through",
          isSkipped && "text-zinc-400 line-through",
        )}
      >
        {task.title}
      </span>

      {isActive &&
        (isCurrent ? (
          <span className="shrink-0 tabular-nums text-xs font-semibold text-amber-500">
            {formatTime(task.elapsedSeconds)}
          </span>
        ) : (
          <span className="shrink-0 tabular-nums text-xs text-zinc-400">
            {task.estimatedMinutes}m
          </span>
        ))}

      {isCompleted && (
        <span className="shrink-0 tabular-nums text-xs text-zinc-500">
          {formatTime(task.elapsedSeconds)}
        </span>
      )}

      {isSkipped && (
        <span className="shrink-0 text-xs text-zinc-400">Skipped</span>
      )}
    </div>
  );
}
