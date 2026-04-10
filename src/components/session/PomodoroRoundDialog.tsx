"use client";

import { useEffect, useState } from "react";

interface PomodoroRoundDialogProps {
  round: number;
  onContinue: () => void;
  onTakeBreak: () => void;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function PomodoroRoundDialog({
  round,
  onContinue,
  onTakeBreak: _onTakeBreak,
}: PomodoroRoundDialogProps) {
  const [breakMode, setBreakMode] = useState(false);
  const [breakSecondsRemaining, setBreakSecondsRemaining] = useState(5 * 60);
  const [breakDone, setBreakDone] = useState(false);

  useEffect(() => {
    if (!breakMode || breakDone) return;
    const interval = setInterval(() => {
      setBreakSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setBreakDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [breakMode, breakDone]);

  return (
    /* Backdrop */
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-[#27272A]">
        {!breakMode ? (
          <>
            <h2 className="mb-2 text-center text-lg font-semibold text-zinc-900 dark:text-[#F4F4F5]">
              {round === 1
                ? "Great job! You finished your first round!"
                : `Way to go! You just finished round ${round}.`}
            </h2>
            <p className="mb-6 text-center text-sm text-zinc-500 dark:text-[#A1A1AA]">
              {round === 1
                ? "Do you want to keep going or take a break?"
                : "You are LOCKED IN. Wanna take a small break?"}
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={onContinue}
                className="w-full rounded-xl bg-[#2D1B4E] py-3 text-sm font-semibold text-white hover:bg-[#3D2B5E]"
              >
                Push through
              </button>
              <button
                type="button"
                onClick={() => setBreakMode(true)}
                className="w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-[#3F3F46] dark:text-[#A1A1AA] dark:hover:bg-[#3F3F46]"
              >
                Recharge
              </button>
            </div>
          </>
        ) : !breakDone ? (
          <>
            <p className="mb-2 text-center text-sm text-zinc-500 dark:text-[#A1A1AA]">
              Take a breather. Next round starts when you&apos;re ready.
            </p>
            <div className="my-4 text-center font-mono text-4xl font-bold text-[#2D1B4E] dark:text-[#F4F4F5]">
              {formatTime(breakSecondsRemaining)}
            </div>
            <p className="text-center text-xs text-zinc-400 dark:text-[#A1A1AA]">
              Starting automatically when timer ends
            </p>
            <button
              type="button"
              onClick={() => {
                setBreakSecondsRemaining(0);
                setBreakDone(true);
              }}
              className="mt-4 w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-[#3F3F46] dark:text-[#A1A1AA] dark:hover:bg-[#3F3F46]"
            >
              Skip timer
            </button>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-center text-lg font-semibold text-zinc-900 dark:text-[#F4F4F5]">
              Ready to lock in?
            </h2>
            <p className="mb-6 text-center text-sm text-zinc-500 dark:text-[#A1A1AA]">
              Your break is over. Let&apos;s make round {round + 1} count.
            </p>
            <button
              type="button"
              onClick={onContinue}
              className="w-full rounded-xl bg-[#F59E0B] py-3 text-sm font-bold text-white hover:bg-[#D97706]"
            >
              Let&apos;s go
            </button>
          </>
        )}
      </div>
    </div>
  );
}
