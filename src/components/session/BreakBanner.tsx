"use client";

interface BreakBannerProps {
  round: number;
  onResume: () => void;
}

export function BreakBanner({ round, onResume }: BreakBannerProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-[#27272A]">
        <div className="mb-1 text-center text-2xl">☕</div>
        <h2 className="mb-1 text-center font-display text-lg font-semibold text-zinc-900 dark:text-[#F4F4F5]">
          On a break
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-500 dark:text-[#A1A1AA]">
          Round {round} is ready when you are.
        </p>
        <button
          onClick={onResume}
          className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-[#2D1B4E] dark:hover:bg-[#3D2B5E]"
        >
          Resume round {round}
        </button>
      </div>
    </div>
  );
}
