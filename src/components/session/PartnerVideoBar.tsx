"use client";

import { MousePointer2 } from "lucide-react";

interface PartnerVideoBarProps {
  partnerName: string;
  partnerUniversity: string;
  onNudge?: () => void;
}

export function PartnerVideoBar({
  partnerName,
  partnerUniversity,
  onNudge,
}: PartnerVideoBarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-white px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-700 text-xs font-semibold text-white">
          {partnerName?.[0] ?? "?"}
        </div>
        <div className="min-w-0 leading-tight">
          {partnerName && (
            <div className="truncate text-xs font-semibold text-zinc-800">{partnerName}</div>
          )}
          {partnerUniversity && (
            <div className="truncate text-[10px] text-zinc-600">{partnerUniversity}</div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onNudge}
        aria-label="Nudge partner"
        className={
          onNudge
            ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white transition-colors hover:bg-purple-500 active:scale-95"
            : "flex h-7 w-7 shrink-0 cursor-default items-center justify-center rounded-lg bg-purple-600 text-white opacity-60"
        }
      >
        <MousePointer2 size={13} className="text-white" />
      </button>
    </div>
  );
}
