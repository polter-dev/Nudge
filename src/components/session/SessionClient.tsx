"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLiveKitOptional } from "~/app/session/partner/LiveKitProvider";
import { NudgeLogo } from "~/components/icons/NudgeLogo";
import { HelpIcon, MessagesIcon, SettingsIcon, SidebarToggleIcon } from "~/components/icons/SidebarIcons";

import { ActionBar } from "~/components/session/ActionBar";
import { BreakBanner } from "~/components/session/BreakBanner";
import { CameraGuard } from "~/components/session/CameraGuard";
import { PartnerMIADialog } from "~/components/session/PartnerMIADialog";
import { PomodoroRoundDialog } from "~/components/session/PomodoroRoundDialog";
import { ProgressBar } from "~/components/session/ProgressBar";
import { SessionRightPanel } from "~/components/session/SessionRightPanel";
import { VideoPanel } from "~/components/session/VideoPanel";
import { useCameraGuard } from "~/hooks/useCameraGuard";
import { useSessionPhase } from "~/hooks/useSessionPhase";
import { useTaskList } from "~/hooks/useTaskList";
import { classifyCameraError } from "~/lib/cameraErrorKind";
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
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [partnerCameraDenied, setPartnerCameraDenied] = useState(false);
  const [partnerCameraNotFound, setPartnerCameraNotFound] = useState(false);
  const [soloLocalStream, setSoloLocalStream] = useState<MediaStream | null>(
    null,
  );
  const [soloCameraError, setSoloCameraError] = useState<string | null>(null);
  const [soloCameraStarting, setSoloCameraStarting] = useState(false);
  const [soloCameraDenied, setSoloCameraDenied] = useState(false);
  const [soloCameraNotFound, setSoloCameraNotFound] = useState(false);
  const soloStreamRef = useRef<MediaStream | null>(null);
  const liveKit = useLiveKitOptional();

  useEffect(() => {
    soloStreamRef.current = soloLocalStream;
  }, [soloLocalStream]);

  useEffect(() => {
    return () => {
      soloStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (mode !== "solo") {
      setSoloLocalStream((prev) => {
        prev?.getTracks().forEach((t) => t.stop());
        return null;
      });
      setSoloCameraError(null);
      setSoloCameraDenied(false);
      setSoloCameraNotFound(false);
      setSoloCameraStarting(false);
    }
  }, [mode]);

  const localStream =
    mode === "partner" ? (liveKit?.localStream ?? soloLocalStream) : soloLocalStream;
  const remoteStream =
    mode === "partner" ? (liveKit?.remoteStream ?? null) : null;
  const isLocalCameraPending =
    (mode === "partner" && (liveKit?.connectionState === "connecting" || soloCameraStarting)) ||
    (mode === "solo" && soloCameraStarting);
  const isVideoReconnecting =
    mode === "partner" && liveKit?.connectionState === "reconnecting";

  const partnerCameraError =
    mode === "partner" ? (liveKit?.error ?? null) : null;

  useEffect(() => {
    if (mode !== "partner" || !liveKit?.error) {
      setPartnerCameraDenied(false);
      setPartnerCameraNotFound(false);
      return;
    }
    const kind = classifyCameraError(liveKit.error);
    setPartnerCameraDenied(kind === "denied");
    setPartnerCameraNotFound(kind === "notfound");
  }, [mode, liveKit?.error]);

  async function handleEnablePartnerCamera() {
    // TEMP DEV BYPASS: use direct getUserMedia instead of LiveKit token auth
    await handleEnableSoloCamera();
  }

  async function handleEnableSoloCamera() {
    setSoloCameraError(null);
    setSoloCameraDenied(false);
    setSoloCameraNotFound(false);
    setSoloCameraStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setSoloLocalStream((prev) => {
        prev?.getTracks().forEach((t) => t.stop());
        return stream;
      });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Could not access your camera.";
      setSoloCameraError(message);
      if (e instanceof DOMException) {
        if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
          setSoloCameraDenied(true);
          setSoloCameraNotFound(false);
        } else if (
          e.name === "NotFoundError" ||
          e.name === "OverconstrainedError"
        ) {
          setSoloCameraNotFound(true);
          setSoloCameraDenied(false);
        } else {
          const kind = classifyCameraError(message);
          setSoloCameraDenied(kind === "denied");
          setSoloCameraNotFound(kind === "notfound");
        }
      } else {
        const kind = classifyCameraError(message);
        setSoloCameraDenied(kind === "denied");
        setSoloCameraNotFound(kind === "notfound");
      }
    } finally {
      setSoloCameraStarting(false);
    }
  }

  async function handleEnableLocalCamera() {
    if (mode === "partner") {
      await handleEnablePartnerCamera();
    } else {
      await handleEnableSoloCamera();
    }
  }

  function handleStopSoloCamera() {
    setSoloLocalStream((prev) => {
      prev?.getTracks().forEach((t) => t.stop());
      return null;
    });
    setSoloCameraError(null);
    setSoloCameraDenied(false);
    setSoloCameraNotFound(false);
  }

  async function handleTurnCameraOff() {
    if (mode === "partner" && liveKit?.localStream) {
      // Real LiveKit path (when auth is in place)
      await liveKit.stopLocalCamera();
    } else {
      // TEMP DEV BYPASS path (and solo mode)
      handleStopSoloCamera();
    }
  }

  function handleCameraDisconnect() {
    handleStopSoloCamera();
    router.push("/dashboard");
  }

  const { showWarning, resetGuard } = useCameraGuard(
    localStream !== null,
    handleCameraDisconnect,
  );

  async function handleImBack() {
    resetGuard();
    await handleEnableLocalCamera();
  }

  const showLocalCameraButton =
    (mode === "partner" && localStream === null) ||
    (mode === "solo" && localStream === null);

  const showTurnCameraOffButton = localStream !== null;

  const localCameraDenied =
    mode === "partner" ? (partnerCameraDenied || soloCameraDenied) : soloCameraDenied;
  const localCameraNotFound =
    mode === "partner" ? (partnerCameraNotFound || soloCameraNotFound) : soloCameraNotFound;
  const localCameraError =
    mode === "partner" ? (partnerCameraError ?? soloCameraError) : soloCameraError;

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
          "z-10 flex shrink-0 flex-col items-center bg-[#2D1B4E] transition-all duration-300 dark:bg-[#09090D]",
          isSidebarOpen ? "w-14" : "w-8",
        )}
      >
        <div style={{ height: 44 }} className="flex w-full shrink-0 items-center justify-center">
          <button
            type="button"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <SidebarToggleIcon size={20} />
          </button>
        </div>

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
        <header style={{ height: 44 }} className="flex shrink-0 items-center justify-center overflow-hidden bg-black dark:bg-[#6D28D9]">
          <NudgeLogo className="h-6 w-auto max-h-full" />
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

          <div className="flex min-h-0 shrink-0 items-center self-stretch border-b border-zinc-200 bg-stone-100 px-4 py-2 dark:border-[#3F3F46] dark:bg-[#12121A]">
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
              localStream={localStream}
              remoteStream={remoteStream}
              isLocalCameraPending={isLocalCameraPending}
              isVideoReconnecting={isVideoReconnecting}
              onEnableLocalCamera={handleEnableLocalCamera}
              showLocalCameraButton={showLocalCameraButton}
              onTurnCameraOff={handleTurnCameraOff}
              showTurnCameraOffButton={showTurnCameraOffButton}
              localCameraDenied={localCameraDenied}
              localCameraNotFound={localCameraNotFound}
              localCameraError={localCameraError}
              isCameraOn={localStream !== null}
              onCameraToggle={() => {
                if (localStream !== null) {
                  void handleTurnCameraOff();
                  resetGuard();
                } else {
                  void handleEnableLocalCamera();
                }
              }}
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

      {showWarning && <CameraGuard onImBack={handleImBack} />}
      <PartnerMIADialog isOpen={false} />
    </div>
  );
}
