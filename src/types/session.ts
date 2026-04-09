export type TaskStatus = "active" | "completed" | "skipped" | "deleted";

export type SessionStage = "debrief" | "lock-in" | "end";

// Phase drives the live session state machine: intro → lock-in → debrief → complete
export type SessionPhase = "intro" | "lock-in" | "debrief" | "complete";

export interface SessionTask {
  id: string;
  title: string;
  estimatedMinutes: number;
  elapsedSeconds: number;
  status: TaskStatus;
  order: number;
}
