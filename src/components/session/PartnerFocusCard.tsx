function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface PartnerFocusCardProps {
  currentTask: { title: string; elapsedSeconds: number } | null;
}

export function PartnerFocusCard({ currentTask }: PartnerFocusCardProps) {
  return (
    <div>
      <p className="mb-2 font-sans text-base font-bold text-zinc-900">
        Partner&apos;s Focus:
      </p>

      {currentTask === null ? (
        <p className="text-xs text-zinc-500 italic">
          Partner hasn&apos;t started a task yet.
        </p>
      ) : (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-4">
          <span className="truncate text-xs font-medium text-zinc-700">
            {currentTask.title}
          </span>
          <span className="ml-3 shrink-0 tabular-nums text-xs text-zinc-400">
            {formatTime(currentTask.elapsedSeconds)}
          </span>
        </div>
      )}
    </div>
  );
}
