"use client";

import { Plus } from "lucide-react";
import { useRef, useState } from "react";

interface AddTaskInputProps {
  onAdd: (title: string, estimatedMinutes: number) => void;
}

export function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [showMinutes, setShowMinutes] = useState(false);
  const [minutes, setMinutes] = useState("25");
  const titleRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  function expand() {
    setIsExpanded(true);
    setTimeout(() => titleRef.current?.focus(), 0);
  }

  function handlePlusClick() {
    if (!isExpanded) {
      expand();
      return;
    }
    if (!title.trim()) return;
    setShowMinutes(true);
    setTimeout(() => minutesRef.current?.focus(), 0);
  }

  function handleTitleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && title.trim()) {
      setShowMinutes(true);
      setTimeout(() => minutesRef.current?.focus(), 0);
    }
    if (e.key === "Escape") reset();
  }

  function handleConfirm() {
    const parsed = parseInt(minutes, 10);
    if (!title.trim() || isNaN(parsed) || parsed <= 0) return;
    onAdd(title.trim(), parsed);
    reset();
  }

  function handleMinutesKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") reset();
  }

  function reset() {
    setTitle("");
    setMinutes("25");
    setShowMinutes(false);
    setIsExpanded(false);
  }

  // Collapsed: just the two circles centered
  if (!isExpanded) {
    return (
      <div className="mt-3 flex justify-center gap-3">
        <button
          onClick={expand}
          aria-label="Add task"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white transition-colors hover:bg-green-600 active:bg-green-800"
        >
          <Plus size={16} />
        </button>
        <div
          aria-hidden="true"
          className="h-9 w-9 cursor-not-allowed rounded-full bg-zinc-300 opacity-50"
        />
      </div>
    );
  }

  // Expanded: full-width title, centered add buttons, then optional minutes row
  return (
    <div className="mt-3 flex flex-col gap-2">
      <input
        ref={titleRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleTitleKeyDown}
        placeholder="Add a new task..."
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-colors focus:border-green-400 focus:ring-1 focus:ring-green-400"
        aria-label="New task title"
      />

      <div className="flex justify-center gap-3">
        <button
          onClick={handlePlusClick}
          aria-label="Add task"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-white transition-colors hover:bg-green-600 active:bg-green-800"
        >
          <Plus size={16} />
        </button>
        <div
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-zinc-300 opacity-50"
        />
      </div>

      {/* Row 2: estimated minutes */}
      {showMinutes && (
        <div className="flex items-center gap-2 pl-1">
          <label className="shrink-0 text-xs text-zinc-500">Est. minutes:</label>
          <input
            ref={minutesRef}
            type="number"
            min="1"
            max="120"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            onKeyDown={handleMinutesKeyDown}
            className="w-16 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm tabular-nums text-zinc-800 outline-none transition-colors focus:border-green-400 focus:ring-1 focus:ring-green-400"
            aria-label="Estimated minutes"
          />
          <button
            onClick={handleConfirm}
            className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-400"
          >
            Add
          </button>
          <button
            onClick={reset}
            className="rounded-lg px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
