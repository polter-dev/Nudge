"use client";

interface PomodoroRoundDialogProps {
  round: number;
  onContinue: () => void;
  onTakeBreak: () => void;
}

export function PomodoroRoundDialog({
  round,
  onContinue,
  onTakeBreak,
}: PomodoroRoundDialogProps) {
  return (
    /* Backdrop */
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-1 text-center text-2xl">🎉</div>
        <h2 className="mb-1 text-center font-display text-lg font-semibold text-zinc-900">
          Round {round} complete!
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-500">
          You&apos;ve finished a 25-minute focus session. Ready to keep going?
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onContinue}
            className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Continue working
          </button>
          <button
            onClick={onTakeBreak}
            className="w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            Take a break
          </button>
        </div>
      </div>
    </div>
  );
}
