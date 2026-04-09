"use client";

import { PartnerFocusCard } from "~/components/session/PartnerFocusCard";
import { TaskList } from "~/components/session/TaskList";
import { type TaskAction } from "~/hooks/useTaskList";
import { type SessionPhase, type SessionTask } from "~/types/session";

interface SessionRightPanelProps {
  tasks: SessionTask[];
  currentTask: SessionTask | undefined;
  dispatch: React.Dispatch<TaskAction>;
  partnerCurrentTask: { title: string; elapsedSeconds: number } | null;
  phase: SessionPhase;
}

export function SessionRightPanel({
  tasks,
  currentTask,
  dispatch,
  partnerCurrentTask,
  phase: _phase,
}: SessionRightPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* ── Scrollable task area ── */}
      <div className="flex-1 overflow-y-auto bg-stone-100 px-3 py-3">
        <div className="rounded-3xl bg-[#E8F5E9] p-6">
          <p className="mb-3 font-sans text-base font-bold text-zinc-800">Your Tasks:</p>
          <TaskList
            tasks={tasks}
            currentTask={currentTask}
            onComplete={(id) => dispatch({ type: "COMPLETE_TASK", taskId: id })}
            onDelete={(id) => dispatch({ type: "DELETE_TASK", taskId: id })}
            onSkip={(id) => dispatch({ type: "SKIP_TASK", taskId: id })}
            onReorder={(orderedIds) =>
              dispatch({ type: "REORDER_TASKS", orderedIds })
            }
            onAdd={(title, estimatedMinutes) =>
              dispatch({
                type: "ADD_TASK",
                id: crypto.randomUUID(),
                title,
                estimatedMinutes,
              })
            }
          />
        </div>
      </div>

      {/* ── Partner focus card — pinned at bottom ── */}
      <div className="shrink-0 bg-stone-100 px-3 pb-3 pt-4">
        <div className="rounded-3xl bg-[#FBE3A1] p-6">
          <PartnerFocusCard currentTask={partnerCurrentTask} />
        </div>
      </div>
    </div>
  );
}
