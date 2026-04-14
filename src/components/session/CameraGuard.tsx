"use client";

interface CameraGuardProps {
  onImBack: () => void;
}

export function CameraGuard({ onImBack }: CameraGuardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xl">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-2xl">
        <p className="text-base text-zinc-800">
          Still there? Nudge can&apos;t see you... Your session will end automatically in 2 minutes if your
          camera remains off.
        </p>
        <button
          type="button"
          onClick={() => onImBack()}
          className="mt-6 inline-flex rounded-full bg-[#6D28D9] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#5B21B6] active:bg-[#4C1D95]"
        >
          I&apos;m back!
        </button>
      </div>
    </div>
  );
}
