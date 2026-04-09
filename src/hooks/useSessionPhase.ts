"use client";

import { useCallback, useEffect, useReducer } from "react";

import { type SessionPhase } from "~/types/session";

// ── Constants ─────────────────────────────────────────────────────────────────

export const INTRO_SECONDS = 3 * 60;
export const POMODORO_SECONDS = 25 * 60;
export const DEBRIEF_SECONDS = 3 * 60;

// ── State machine ─────────────────────────────────────────────────────────────

interface TimerState {
  phase: SessionPhase;
  introSecondsRemaining: number;
  pomodoroSecondsRemaining: number;
  pomodoroRound: number;
  debriefSecondsRemaining: number;
  // When true, a Pomodoro round just finished — show the round-end dialog
  roundComplete: boolean;
  // When true, the user is on a break — timer is paused until they resume
  isPaused: boolean;
}

type TimerAction =
  | { type: "TICK" }
  | { type: "END_LOCK_IN" }
  | { type: "CONTINUE_LOCK_IN" }
  | { type: "TAKE_BREAK" }
  | { type: "RESUME_FROM_BREAK" };

const initialState: TimerState = {
  phase: "intro",
  introSecondsRemaining: INTRO_SECONDS,
  pomodoroSecondsRemaining: POMODORO_SECONDS,
  pomodoroRound: 1,
  debriefSecondsRemaining: DEBRIEF_SECONDS,
  roundComplete: false,
  isPaused: false,
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "TICK": {
      // Timer is frozen during round-end dialog or break
      if (state.roundComplete || state.isPaused) return state;

      if (state.phase === "intro") {
        const next = state.introSecondsRemaining - 1;
        if (next <= 0) {
          return { ...state, introSecondsRemaining: 0, phase: "lock-in" };
        }
        return { ...state, introSecondsRemaining: next };
      }

      if (state.phase === "lock-in") {
        const next = state.pomodoroSecondsRemaining - 1;
        if (next <= 0) {
          // Round complete — freeze timer and show dialog instead of auto-resetting
          return { ...state, pomodoroSecondsRemaining: 0, roundComplete: true };
        }
        return { ...state, pomodoroSecondsRemaining: next };
      }

      if (state.phase === "debrief") {
        const next = state.debriefSecondsRemaining - 1;
        if (next <= 0) {
          return { ...state, debriefSecondsRemaining: 0, phase: "complete" };
        }
        return { ...state, debriefSecondsRemaining: next };
      }

      return state;
    }

    case "CONTINUE_LOCK_IN": {
      // User chose to keep working — start next Pomodoro round
      if (state.phase === "lock-in" && state.roundComplete) {
        return {
          ...state,
          pomodoroSecondsRemaining: POMODORO_SECONDS,
          pomodoroRound: state.pomodoroRound + 1,
          roundComplete: false,
          isPaused: false,
        };
      }
      return state;
    }

    case "TAKE_BREAK": {
      // User chose a break — dismiss dialog, pause the timer
      if (state.phase === "lock-in" && state.roundComplete) {
        return {
          ...state,
          pomodoroSecondsRemaining: POMODORO_SECONDS,
          pomodoroRound: state.pomodoroRound + 1,
          roundComplete: false,
          isPaused: true,
        };
      }
      return state;
    }

    case "RESUME_FROM_BREAK": {
      if (state.phase === "lock-in" && state.isPaused) {
        return { ...state, isPaused: false };
      }
      return state;
    }

    case "END_LOCK_IN": {
      if (state.phase === "lock-in") {
        return { ...state, phase: "debrief", roundComplete: false, isPaused: false };
      }
      return state;
    }
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export interface UseSessionPhaseReturn {
  phase: SessionPhase;
  phaseSecondsRemaining: number;
  phaseSecondsTotal: number;
  pomodoroSecondsRemaining: number;
  pomodoroRound: number;
  lockInProgress: number;
  roundComplete: boolean;
  isPaused: boolean;
  endLockIn: () => void;
  continueLockIn: () => void;
  takeBreak: () => void;
  resumeFromBreak: () => void;
}

export function useSessionPhase(): UseSessionPhaseReturn {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const endLockIn = useCallback(() => dispatch({ type: "END_LOCK_IN" }), []);
  const continueLockIn = useCallback(() => dispatch({ type: "CONTINUE_LOCK_IN" }), []);
  const takeBreak = useCallback(() => dispatch({ type: "TAKE_BREAK" }), []);
  const resumeFromBreak = useCallback(() => dispatch({ type: "RESUME_FROM_BREAK" }), []);

  const phaseSecondsRemaining =
    state.phase === "intro"
      ? state.introSecondsRemaining
      : state.phase === "debrief"
        ? state.debriefSecondsRemaining
        : state.pomodoroSecondsRemaining;

  const phaseSecondsTotal =
    state.phase === "intro"
      ? INTRO_SECONDS
      : state.phase === "debrief"
        ? DEBRIEF_SECONDS
        : POMODORO_SECONDS;

  const lockInProgress =
    (POMODORO_SECONDS - state.pomodoroSecondsRemaining) / POMODORO_SECONDS;

  return {
    phase: state.phase,
    phaseSecondsRemaining,
    phaseSecondsTotal,
    pomodoroSecondsRemaining: state.pomodoroSecondsRemaining,
    pomodoroRound: state.pomodoroRound,
    lockInProgress,
    roundComplete: state.roundComplete,
    isPaused: state.isPaused,
    endLockIn,
    continueLockIn,
    takeBreak,
    resumeFromBreak,
  };
}
