"use client";

import { HelpCircle, Pause, Settings, User } from "lucide-react";
import Link from "next/link";

import { ActionBar } from "~/components/session/ActionBar";
import { BreakBanner } from "~/components/session/BreakBanner";
import { PomodoroRoundDialog } from "~/components/session/PomodoroRoundDialog";
import { ProgressBar } from "~/components/session/ProgressBar";
import { SessionRightPanel } from "~/components/session/SessionRightPanel";
import { VideoPanel } from "~/components/session/VideoPanel";
import { useSessionPhase } from "~/hooks/useSessionPhase";
import { useTaskList } from "~/hooks/useTaskList";
import { type SessionTask } from "~/types/session";

interface PartnerTask {
  title: string;
  elapsedSeconds: number;
}

interface SessionClientProps {
  initialTasks: SessionTask[];
  partnerCurrentTask: PartnerTask | null;
  partnerName: string;
  partnerUniversity: string;
}

export function SessionClient({
  initialTasks,
  partnerCurrentTask,
  partnerName,
  partnerUniversity,
}: SessionClientProps) {
  const {
    phase,
    phaseSecondsRemaining,
    phaseSecondsTotal,
    pomodoroSecondsRemaining,
    pomodoroRound,
    lockInProgress,
    roundComplete,
    isPaused,
    endLockIn,
    continueLockIn,
    takeBreak,
    resumeFromBreak,
  } = useSessionPhase();

  const { tasks, currentTask, dispatch } = useTaskList(initialTasks);

  const timerSeconds =
    phase === "lock-in" ? pomodoroSecondsRemaining : phaseSecondsRemaining;
  const timerRound = phase === "lock-in" ? pomodoroRound : undefined;

  function handleSkipTask() {
    if (!currentTask) return;
    dispatch({ type: "SKIP_TASK", taskId: currentTask.id });
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-stone-50 font-sans">
      {/* ── Round-end dialog ── */}
      {roundComplete && (
        <PomodoroRoundDialog
          round={pomodoroRound}
          onContinue={continueLockIn}
          onTakeBreak={takeBreak}
        />
      )}

      {/* ── Break banner ── */}
      {isPaused && !roundComplete && (
        <BreakBanner round={pomodoroRound} onResume={resumeFromBreak} />
      )}

      {/* ── Left sidebar ── */}
      <aside className="flex w-14 shrink-0 flex-col items-center bg-[#2D1B4E] pt-24">
        <div className="flex flex-col items-center gap-10">
          <button
            aria-label="Pause or resume panel"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {/* TODO: Replace with custom SVG — see SVGList.md */}
            <Pause size={28} />
          </button>

          <button
            aria-label="Profile"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {/* TODO: Replace with custom SVG — see SVGList.md */}
            <User size={28} />
          </button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-10 pb-5">
          <Link
            href="/dashboard"
            aria-label="Settings"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {/* TODO: Replace with custom SVG — see SVGList.md */}
            <Settings size={28} />
          </Link>
          <Link
            href="/dashboard"
            aria-label="Help"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {/* TODO: Replace with custom SVG — see SVGList.md */}
            <HelpCircle size={28} />
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-11 shrink-0 items-center justify-center bg-black">
          {/* TODO: Replace with <NudgeLogoIcon /> SVG — see SVGList.md */}
          <span className="font-display text-lg font-normal tracking-widest text-white">
            NUDGE
          </span>
        </header>

        {/* Two-column content — CSS Grid: progress + action bar row, then video + task panel */}
        <div
          className="grid flex-1 overflow-hidden"
          style={{
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <div className="shrink-0 border-b border-r border-zinc-200 bg-white">
            <ProgressBar
              phase={phase}
              phaseSecondsRemaining={phaseSecondsRemaining}
              phaseSecondsTotal={phaseSecondsTotal}
              lockInProgress={lockInProgress}
              pomodoroRound={pomodoroRound}
            />
          </div>

          <div className="shrink-0 border-b border-zinc-200 bg-stone-100 px-4 py-3">
            <ActionBar
              secondsRemaining={timerSeconds}
              round={timerRound}
              onSkipTask={handleSkipTask}
              onNudgeSelf={() => undefined}
              onLeaveSession={endLockIn}
            />
          </div>

          <div className="min-h-0 overflow-hidden border-r border-zinc-200 bg-white">
            <VideoPanel
              partnerName={partnerName}
              partnerUniversity={partnerUniversity}
              isLockIn={phase === "lock-in"}
            />
          </div>

          <div className="min-h-0 overflow-hidden">
            <SessionRightPanel
              tasks={tasks}
              currentTask={currentTask}
              dispatch={dispatch}
              partnerCurrentTask={partnerCurrentTask}
              phase={phase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
