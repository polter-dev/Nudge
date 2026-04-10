"use client";

import { useState } from "react";
import Link from "next/link";

import { NudgeLogo } from "~/components/icons/NudgeLogo";
import { HelpIcon, MessagesIcon, SettingsIcon, SidebarToggleIcon } from "~/components/icons/SidebarIcons";

import { ActionBar } from "~/components/session/ActionBar";
import { BreakBanner } from "~/components/session/BreakBanner";
import { PomodoroRoundDialog } from "~/components/session/PomodoroRoundDialog";
import { ProgressBar } from "~/components/session/ProgressBar";
import { SessionRightPanel } from "~/components/session/SessionRightPanel";
import { VideoPanel } from "~/components/session/VideoPanel";
import { useSessionPhase } from "~/hooks/useSessionPhase";
import { useTaskList } from "~/hooks/useTaskList";
import { cn } from "~/lib/utils";
import { type SessionTask } from "~/types/session";

interface PartnerTask {
  title: string;
  elapsedSeconds: number;
}

interface SessionClientProps {
  initialTasks: SessionTask[];
  mode?: "partner" | "solo";
  partnerCurrentTask?: PartnerTask | null;
  partnerName?: string;
  partnerUniversity?: string;
}

export function SessionClient({
  initialTasks,
  mode = "partner",
  partnerCurrentTask,
  partnerName,
  partnerUniversity,
}: SessionClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);

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
    skipPhaseForTesting,
    finishRoundForTesting,
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
    <div
      className={cn(
        "relative flex h-screen w-full overflow-hidden bg-stone-50 font-sans dark:bg-[#12121A]",
        isDark && "dark",
      )}
    >
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
      <aside
        className={cn(
          "flex shrink-0 flex-col items-center bg-[#2D1B4E] pt-6 transition-all duration-300 dark:bg-[#09090D]",
          isSidebarOpen ? "w-14" : "w-8",
        )}
      >
        <button
          type="button"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <SidebarToggleIcon size={22} />
        </button>

        <div
          className={cn(
            "flex flex-col items-center gap-10 transition-opacity duration-200",
            isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <button
            type="button"
            aria-label="Profile"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {/* TODO: Profile icon SVG not yet provided — placeholder */}
          </button>

          <button
            type="button"
            aria-label="Messages"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <MessagesIcon size={22} />
          </button>

          <div className="flex max-w-[5.5rem] flex-col items-center gap-2">
            <button
              type="button"
              onClick={skipPhaseForTesting}
              disabled={phase === "complete"}
              title="Testing only: Plan → Lock-in → End → Complete"
              className={cn(
                "w-full rounded-md border px-1.5 py-1.5 text-center text-[9px] font-semibold leading-tight transition-colors",
                phase === "complete"
                  ? "cursor-not-allowed border-white/15 text-white/35"
                  : "border-amber-400/55 bg-amber-500/20 text-amber-100 hover:bg-amber-500/30",
              )}
            >
              Skip phase
            </button>
            <button
              type="button"
              onClick={finishRoundForTesting}
              disabled={phase !== "lock-in" || roundComplete}
              title="Testing only: end current Pomodoro and open the round-complete dialog"
              className={cn(
                "w-full rounded-md border px-1.5 py-1.5 text-center text-[9px] font-semibold leading-tight transition-colors",
                phase !== "lock-in" || roundComplete
                  ? "cursor-not-allowed border-white/15 text-white/35"
                  : "border-amber-400/55 bg-amber-500/20 text-amber-100 hover:bg-amber-500/30",
              )}
            >
              Finish round
            </button>
            {mode === "partner" && (
              <Link
                href="/session/solo/active"
                className="w-full rounded-md border border-amber-400/55 bg-amber-500/20 px-1.5 py-1.5 text-center text-[9px] font-semibold leading-tight text-amber-100 transition-colors hover:bg-amber-500/30"
              >
                Solo mode preview
              </Link>
            )}
            {mode === "solo" && (
              <Link
                href="/session/partner/active"
                className="w-full rounded-md border border-amber-400/55 bg-amber-500/20 px-1.5 py-1.5 text-center text-[9px] font-semibold leading-tight text-amber-100 transition-colors hover:bg-amber-500/30"
              >
                Partner session preview
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="w-full rounded-md border border-amber-400/55 bg-amber-500/20 px-1.5 py-1.5 text-center text-[9px] font-semibold leading-tight text-amber-100 transition-colors hover:bg-amber-500/30"
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "mt-auto flex flex-col items-center gap-10 pb-5 transition-opacity duration-200",
            isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Link
            href="/dashboard"
            aria-label="Settings"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <SettingsIcon size={22} />
          </Link>
          <Link
            href="/dashboard"
            aria-label="Help"
            className="rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HelpIcon size={22} />
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-11 shrink-0 items-center justify-center overflow-visible bg-black">
          <NudgeLogo className="h-[1.58203125rem] w-auto" />
        </header>

        {/* Two-column content — CSS Grid: progress + action bar row, then video + task panel */}
        <div
          className="grid flex-1 overflow-hidden"
          style={{
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <div className="shrink-0 border-b border-r border-zinc-200 bg-white dark:border-[#3F3F46] dark:bg-transparent">
            <ProgressBar
              phase={phase}
              phaseSecondsRemaining={phaseSecondsRemaining}
              phaseSecondsTotal={phaseSecondsTotal}
              lockInProgress={lockInProgress}
              pomodoroRound={pomodoroRound}
            />
          </div>

          <div className="flex min-h-0 shrink-0 items-center self-stretch border-b border-zinc-200 bg-stone-100 px-6 py-3 dark:border-[#3F3F46] dark:bg-[#12121A]">
            <ActionBar
              secondsRemaining={timerSeconds}
              round={timerRound}
              onSkipTask={handleSkipTask}
              onNudgeSelf={() => undefined}
              onLeaveSession={endLockIn}
            />
          </div>

          <div className="min-h-0 overflow-hidden border-r border-zinc-200 bg-white dark:border-[#3F3F46] dark:bg-[#12121A]">
            <VideoPanel
              mode={mode}
              partnerName={partnerName}
              partnerUniversity={partnerUniversity}
              isLockIn={phase === "lock-in"}
            />
          </div>

          <div className="min-h-0 overflow-hidden">
            <SessionRightPanel
              mode={mode}
              tasks={tasks}
              currentTask={currentTask}
              dispatch={dispatch}
              partnerCurrentTask={partnerCurrentTask ?? null}
              phase={phase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
