"use client";

interface BreakBannerProps {
  round: number;
  onResume: () => void;
}

export function BreakBanner({ round, onResume }: BreakBannerProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-1 text-center text-2xl">☕</div>
        <h2 className="mb-1 text-center font-display text-lg font-semibold text-zinc-900">
          On a break
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-500">
          Round {round} is ready when you are.
        </p>
        <button
          onClick={onResume}
          className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Resume round {round}
        </button>
      </div>
    </div>
  );
}
