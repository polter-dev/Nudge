"use client";

import { useEffect, useReducer } from "react";

import { type SessionTask, type TaskStatus } from "~/types/session";

// ── Action types ──────────────────────────────────────────────────────────────

export type TaskAction =
  | { type: "COMPLETE_TASK"; taskId: string }
  | { type: "SKIP_TASK"; taskId: string }
  | { type: "DELETE_TASK"; taskId: string }
  | { type: "ADD_TASK"; id: string; title: string; estimatedMinutes: number }
  | { type: "REORDER_TASKS"; orderedIds: string[] }
  | { type: "TICK_CURRENT_TASK" };

// ── Helpers ───────────────────────────────────────────────────────────────────

function getCurrentTask(tasks: SessionTask[]): SessionTask | undefined {
  return tasks
    .filter((t) => t.status === "active")
    .sort((a, b) => a.order - b.order)[0];
}

// ── Reducer ───────────────────────────────────────────────────────────────────

function tasksReducer(state: SessionTask[], action: TaskAction): SessionTask[] {
  switch (action.type) {
    case "COMPLETE_TASK":
      return state.map((t) =>
        t.id === action.taskId
          ? { ...t, status: "completed" as TaskStatus }
          : t,
      );

    case "SKIP_TASK": {
      const maxOrder = state.reduce((max, t) => Math.max(max, t.order), 0);
      return state.map((t) =>
        t.id === action.taskId
          ? { ...t, status: "skipped" as TaskStatus, order: maxOrder + 1 }
          : t,
      );
    }

    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.taskId);

    case "ADD_TASK": {
      const maxOrder = state.reduce((max, t) => Math.max(max, t.order), -1);
      const newTask: SessionTask = {
        id: action.id,
        title: action.title,
        estimatedMinutes: action.estimatedMinutes,
        elapsedSeconds: 0,
        status: "active",
        order: maxOrder + 1,
      };
      return [...state, newTask];
    }

    case "REORDER_TASKS":
      return state.map((t) => ({
        ...t,
        order: action.orderedIds.indexOf(t.id),
      }));

    case "TICK_CURRENT_TASK": {
      const current = getCurrentTask(state);
      if (!current) return state;
      return state.map((t) =>
        t.id === current.id ? { ...t, elapsedSeconds: t.elapsedSeconds + 1 } : t,
      );
    }
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

interface UseTaskListReturn {
  tasks: SessionTask[];
  currentTask: SessionTask | undefined;
  dispatch: React.Dispatch<TaskAction>;
}

export function useTaskList(initialTasks: SessionTask[]): UseTaskListReturn {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const currentTask = getCurrentTask(tasks);

  // Tick the current task's elapsed timer every second.
  // Re-runs only when the active task changes, not on every tick.
  useEffect(() => {
    if (!currentTask) return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK_CURRENT_TASK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTask?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return { tasks, currentTask, dispatch };
}
