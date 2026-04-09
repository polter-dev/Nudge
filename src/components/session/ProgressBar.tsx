"use client";

import { type SessionPhase } from "~/types/session";
import { DEBRIEF_SECONDS, INTRO_SECONDS, POMODORO_SECONDS } from "~/hooks/useSessionPhase";

const TOTAL = INTRO_SECONDS + POMODORO_SECONDS + DEBRIEF_SECONDS;

const INTRO_PCT = (INTRO_SECONDS / TOTAL) * 100;   // ~15.15%
const LOCK_PCT = (POMODORO_SECONDS / TOTAL) * 100;  // ~75.76%
const DEBRIEF_PCT = (DEBRIEF_SECONDS / TOTAL) * 100; // ~9.09%

interface ProgressBarProps {
  phase: SessionPhase;
  phaseSecondsRemaining: number;
  phaseSecondsTotal: number;
  lockInProgress: number;
  pomodoroRound: number;
}

export function ProgressBar({
  phase,
  phaseSecondsRemaining,
  lockInProgress,
  pomodoroRound,
}: ProgressBarProps) {
  // Overall fill as % of the full track (0–100)
  let fillPct: number;
  if (phase === "intro") {
    fillPct = (1 - phaseSecondsRemaining / INTRO_SECONDS) * INTRO_PCT;
  } else if (phase === "lock-in") {
    fillPct = INTRO_PCT + lockInProgress * LOCK_PCT;
  } else if (phase === "debrief") {
    fillPct = INTRO_PCT + LOCK_PCT + (1 - phaseSecondsRemaining / DEBRIEF_SECONDS) * DEBRIEF_PCT;
  } else {
    fillPct = 100;
  }

  // Per-segment fill (0–100 within each segment's width)
  const introFill = Math.min(fillPct / INTRO_PCT, 1) * 100;
  const lockFill = Math.min(Math.max(fillPct - INTRO_PCT, 0) / LOCK_PCT, 1) * 100;
  const debriefFill = Math.min(Math.max(fillPct - INTRO_PCT - LOCK_PCT, 0) / DEBRIEF_PCT, 1) * 100;

  const scrubberColor =
    phase === "intro" ? "#7C3AED" : phase === "lock-in" ? "#F59E0B" : "#71717a";

  const isIntroActive = phase === "intro";
  const isLockActive = phase === "lock-in";
  const isDebriefActive = phase === "debrief";

  return (
    <div className="px-6 pb-4 pt-3">
      {/* Static time labels above track */}
      <div className="mb-1.5 flex gap-1 text-[10px] font-mono text-zinc-400">
        <div className="shrink-0 text-center" style={{ width: `${INTRO_PCT}%` }}>3:00</div>
        <div className="shrink-0 text-center" style={{ width: `${LOCK_PCT}%` }}>25:00</div>
        <div className="shrink-0 text-center" style={{ width: `${DEBRIEF_PCT}%` }}>3:00</div>
      </div>

      {/* Track — three colored segments */}
      <div className="relative flex items-center gap-2">
        {/* Intro segment — violet */}
        <div
          className="relative h-2 overflow-hidden rounded-full"
          style={{ width: `${INTRO_PCT}%` }}
        >
          <div className="absolute inset-0 bg-[#7C3AED]/20" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[#7C3AED] transition-[width] duration-1000 ease-linear"
            style={{ width: `${introFill}%` }}
          />
        </div>

        {/* Lock-in segment — amber/gold */}
        <div
          className="relative h-2 overflow-hidden rounded-full"
          style={{ width: `${LOCK_PCT}%` }}
        >
          <div className="absolute inset-0 bg-[#F59E0B]/20" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[#F59E0B] transition-[width] duration-1000 ease-linear"
            style={{ width: `${lockFill}%` }}
          />
        </div>

        {/* Debrief segment — gray */}
        <div
          className="relative h-2 overflow-hidden rounded-full"
          style={{ width: `${DEBRIEF_PCT}%` }}
        >
          <div className="absolute inset-0 bg-zinc-200" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-zinc-400 transition-[width] duration-1000 ease-linear"
            style={{ width: `${debriefFill}%` }}
          />
        </div>

        {/* Scrubber dot — floats above track at fillPct position */}
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-200 shadow-sm transition-[left] duration-1000 ease-linear"
          style={{ left: `${fillPct}%`, backgroundColor: scrubberColor }}
        />
      </div>

      {/* Phase names + subtitles below track */}
      <div className="mt-2 flex gap-1">
        {/* Intro */}
        <div className="shrink-0 text-center" style={{ width: `${INTRO_PCT}%` }}>
          <div
            className={`text-[11px] font-semibold italic ${isIntroActive ? "text-[#7C3AED]" : "text-zinc-400"}`}
          >
            Plan
          </div>
          <div className="text-[10px] leading-tight text-zinc-400">
            Introduce and plan your session
          </div>
        </div>

        {/* Lock-in */}
        <div className="shrink-0 text-center" style={{ width: `${LOCK_PCT}%` }}>
          <div
            className={
              isLockActive
                ? "text-sm font-bold text-[#F59E0B]"
                : "text-[11px] text-zinc-400"
            }
          >
            LOCK IN
          </div>
          <div className="text-[10px] leading-tight text-zinc-500">
            Round {pomodoroRound}
          </div>
        </div>

        {/* Debrief */}
        <div className="shrink-0 text-center" style={{ width: `${DEBRIEF_PCT}%` }}>
          <div
            className={`text-[11px] font-semibold italic ${isDebriefActive ? "text-zinc-600" : "text-zinc-400"}`}
          >
            End
          </div>
          <div className="text-[10px] leading-tight text-zinc-400">Optional</div>
        </div>
      </div>
    </div>
  );
}
