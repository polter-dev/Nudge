"use client";

import { type SessionPhase } from "~/types/session";
import { DEBRIEF_SECONDS, INTRO_SECONDS, POMODORO_SECONDS } from "~/hooks/useSessionPhase";
import { cn } from "~/lib/utils";

/** Lock-in track / accent — scrubber ring matches this in lock-in phase */
const LOCK_IN_YELLOW = "#F59E0B";

const TOTAL = INTRO_SECONDS + POMODORO_SECONDS + DEBRIEF_SECONDS;

const INTRO_PCT = (INTRO_SECONDS / TOTAL) * 100;   // ~15.15%
const LOCK_PCT = (POMODORO_SECONDS / TOTAL) * 100;  // ~75.76%
const DEBRIEF_PCT = (DEBRIEF_SECONDS / TOTAL) * 100; // ~9.09%

const INTRO_VISUAL_PCT = 15;
const LOCK_VISUAL_PCT = 70;
const DEBRIEF_VISUAL_PCT = 15;

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

  let scrubberPct: number;
  if (fillPct <= INTRO_PCT) {
    scrubberPct = (fillPct / INTRO_PCT) * INTRO_VISUAL_PCT;
  } else if (fillPct <= INTRO_PCT + LOCK_PCT) {
    const lockProgress = (fillPct - INTRO_PCT) / LOCK_PCT;
    scrubberPct = INTRO_VISUAL_PCT + lockProgress * LOCK_VISUAL_PCT;
  } else {
    const debriefProgress = (fillPct - INTRO_PCT - LOCK_PCT) / DEBRIEF_PCT;
    scrubberPct = INTRO_VISUAL_PCT + LOCK_VISUAL_PCT + debriefProgress * DEBRIEF_VISUAL_PCT;
  }

  // Per-segment fill (0–100 within each segment's width)
  const introFill = Math.min(fillPct / INTRO_PCT, 1) * 100;
  const lockFill = Math.min(Math.max(fillPct - INTRO_PCT, 0) / LOCK_PCT, 1) * 100;
  const debriefFill = Math.min(Math.max(fillPct - INTRO_PCT - LOCK_PCT, 0) / DEBRIEF_PCT, 1) * 100;

  const isIntroActive = phase === "intro";
  const isLockActive = phase === "lock-in";
  const isDebriefActive = phase === "debrief";

  return (
    <div className="px-4 pb-2 pt-2">
      {/* Static time labels above track */}
      <div className="mb-1 flex gap-1 text-[10px] font-mono text-zinc-400 dark:text-[#A1A1AA]">
        <div className="shrink-0 text-center" style={{ width: `${INTRO_VISUAL_PCT}%` }}>3:00</div>
        <div className="shrink-0 text-center" style={{ width: `${LOCK_VISUAL_PCT}%` }}>25:00</div>
        <div className="shrink-0 text-center" style={{ width: `${DEBRIEF_VISUAL_PCT}%` }}>3:00</div>
      </div>

      {/* Track — three colored segments */}
      <div className="relative flex items-center gap-2">
        {/* Intro segment — violet */}
        <div
          className="relative h-2 overflow-hidden rounded-full"
          style={{ width: `${INTRO_VISUAL_PCT}%` }}
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
          style={{ width: `${LOCK_VISUAL_PCT}%` }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{ backgroundColor: LOCK_IN_YELLOW }}
          />
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-linear"
            style={{ width: `${lockFill}%`, backgroundColor: LOCK_IN_YELLOW }}
          />
        </div>

        {/* Debrief segment — gray */}
        <div
          className="relative h-2 overflow-hidden rounded-full"
          style={{ width: `${DEBRIEF_VISUAL_PCT}%` }}
        >
          <div className="absolute inset-0 bg-zinc-200 dark:bg-[#3F3F46]" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-zinc-400 transition-[width] duration-1000 ease-linear dark:bg-[#71717a]"
            style={{ width: `${debriefFill}%` }}
          />
        </div>

        {/* Scrubber dot — floats above track at fillPct position */}
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-sm transition-[left] duration-1000 ease-linear",
            phase === "lock-in" ? "bg-white" : "border-zinc-200 dark:border-[#3F3F46]",
          )}
          style={
            phase === "lock-in"
              ? { left: `${scrubberPct}%`, borderColor: LOCK_IN_YELLOW }
              : {
                  left: `${scrubberPct}%`,
                  backgroundColor: phase === "intro" ? "#7C3AED" : "#71717a",
                }
          }
        />
      </div>

      {/* Phase names + subtitles below track */}
      <div className="mt-1 flex gap-1">
        {/* Intro */}
        <div className="shrink-0 text-center" style={{ width: `${INTRO_VISUAL_PCT}%` }}>
          <div
            className={`text-[11px] font-semibold italic ${isIntroActive ? "text-[#7C3AED]" : "text-zinc-400 dark:text-[#A1A1AA]"}`}
          >
            Plan
          </div>
          <div className="text-[10px] leading-tight text-zinc-400 dark:text-[#A1A1AA]">
            Introduction/plan
          </div>
        </div>

        {/* Lock-in */}
        <div className="shrink-0 text-center" style={{ width: `${LOCK_VISUAL_PCT}%` }}>
          <div
            className={
              isLockActive
                ? "text-sm font-bold text-[#F59E0B]"
                : "text-[11px] text-zinc-400 dark:text-[#A1A1AA]"
            }
          >
            LOCK IN
          </div>
          <div className="text-[10px] leading-tight text-zinc-500 dark:text-[#A1A1AA]">
            {phase === "intro" ? "Multiple rounds" : `Round ${pomodoroRound}`}
          </div>
        </div>

        {/* Debrief */}
        <div className="shrink-0 text-center" style={{ width: `${DEBRIEF_VISUAL_PCT}%` }}>
          <div
            className={`text-[11px] font-semibold italic ${isDebriefActive ? "text-zinc-600 dark:text-[#F4F4F5]" : "text-zinc-400 dark:text-[#A1A1AA]"}`}
          >
            End
          </div>
          <div className="text-[10px] leading-tight text-zinc-400 dark:text-[#A1A1AA]">Optional</div>
        </div>
      </div>
    </div>
  );
}
