"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { CheckmarkIcon, DragHandleIcon, SkippedIcon } from "~/components/icons/SessionIcons";
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
  dragHandleAttributes: React.HTMLAttributes<HTMLButtonElement>;
  dragHandleListeners: React.HTMLAttributes<HTMLButtonElement>;
  onComplete: () => void;
  onDelete: () => void;
}

export function TaskCard({
  task,
  isCurrent,
  positionNumber,
  isDragging,
  dragHandleAttributes,
  dragHandleListeners,
  onComplete,
  onDelete,
}: TaskCardProps) {
  const isActive = task.status === "active";
  const isCompleted = task.status === "completed";
  const isSkipped = task.status === "skipped";

  const [isHoveringNumber, setIsHoveringNumber] = useState(false);
  const [isHoveringTime, setIsHoveringTime] = useState(false);

  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-xl border border-black px-3 py-2.5 transition-shadow dark:border-[#3F3F46]",
        isDragging && "shadow-lg",
        isActive &&
          "border-2 border-black bg-white dark:border-[#F97316] dark:bg-[#27272A]",
        isCompleted && "bg-[--color-task-done]",
        isSkipped && "bg-[--color-task-done]",
      )}
    >
      <button
        aria-label="Drag to reorder"
        className="shrink-0 cursor-grab touch-none text-zinc-300 active:cursor-grabbing dark:text-[#52525B]"
        {...dragHandleAttributes}
        {...dragHandleListeners}
      >
        <DragHandleIcon size={14} />
      </button>

      {isActive && (
        <div
          onMouseEnter={() => setIsHoveringNumber(true)}
          onMouseLeave={() => setIsHoveringNumber(false)}
          onClick={isCurrent ? onComplete : undefined}
          className={cn(
            "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-xs font-bold transition-colors",
            isCurrent && isHoveringNumber
              ? "bg-green-500"
              : isCurrent
                ? "border-2 border-amber-400 bg-transparent text-zinc-800 dark:text-[#F4F4F5]"
                : "border-2 border-zinc-300 bg-transparent text-zinc-400 dark:border-[#3F3F46] dark:text-[#A1A1AA]",
          )}
        >
          {isCurrent && isHoveringNumber ? (
            <CheckmarkIcon size={14} className="text-white" />
          ) : (
            positionNumber
          )}
        </div>
      )}

      {isCompleted && (
        <CheckmarkIcon size={20} className="shrink-0 text-green-500" />
      )}

      {isSkipped && (
        <SkippedIcon size={20} className="shrink-0 text-zinc-900" />
      )}

      <span
        className={cn(
          "flex-1 truncate text-sm",
          isActive && "font-medium text-zinc-800 dark:text-[#F4F4F5]",
          isCompleted && "font-medium text-zinc-400 line-through dark:text-[#A1A1AA]",
          isSkipped && "text-zinc-400 line-through dark:text-[#A1A1AA]",
        )}
      >
        {task.title}
      </span>

      {isActive &&
        (isCurrent ? (
          <span
            onMouseEnter={() => setIsHoveringTime(true)}
            onMouseLeave={() => setIsHoveringTime(false)}
            onClick={isHoveringTime ? onDelete : undefined}
            className={cn(
              "shrink-0 cursor-pointer tabular-nums text-xs font-semibold transition-colors",
              isHoveringTime ? "text-red-500" : "text-amber-500",
            )}
          >
            {isHoveringTime ? (
              <X size={14} strokeWidth={2.5} />
            ) : (
              formatTime(task.elapsedSeconds)
            )}
          </span>
        ) : (
          <span className="shrink-0 tabular-nums text-xs text-zinc-400 dark:text-[#A1A1AA]">
            {task.estimatedMinutes}m
          </span>
        ))}

      {isCompleted && (
        <span className="shrink-0 tabular-nums text-xs text-zinc-500 dark:text-[#A1A1AA]">
          {formatTime(task.elapsedSeconds)}
        </span>
      )}

      {isSkipped && (
        <span className="shrink-0 text-xs text-zinc-400 dark:text-[#A1A1AA]">Skipped</span>
      )}
    </div>
  );
}
