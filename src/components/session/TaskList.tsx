"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment } from "react";

import { AddTaskInput } from "~/components/session/AddTaskInput";
import { TaskActionCard } from "~/components/session/TaskActionCard";
import { TaskCard } from "~/components/session/TaskCard";
import { type SessionTask } from "~/types/session";

interface SortableTaskCardProps {
  task: SessionTask;
  isCurrent: boolean;
  positionNumber: number;
}

function SortableTaskCard({
  task,
  isCurrent,
  positionNumber,
}: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: task.status !== "active",
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        task={task}
        isCurrent={isCurrent}
        positionNumber={positionNumber}
        isDragging={isDragging}
        dragHandleAttributes={
          attributes as React.HTMLAttributes<HTMLButtonElement>
        }
        dragHandleListeners={
          listeners as React.HTMLAttributes<HTMLButtonElement>
        }
      />
    </div>
  );
}

interface TaskListProps {
  tasks: SessionTask[];
  currentTask: SessionTask | undefined;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onSkip: (taskId: string) => void;
  onReorder: (orderedIds: string[]) => void;
  onAdd: (title: string, estimatedMinutes: number) => void;
}

export function TaskList({
  tasks,
  currentTask,
  onComplete,
  onDelete: _onDelete,
  onSkip,
  onReorder,
  onAdd,
}: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const visibleTasks = tasks
    .filter((t) => t.status !== "deleted")
    .sort((a, b) => a.order - b.order);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = visibleTasks.map((t) => t.id);
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));

    if (oldIndex !== -1 && newIndex !== -1) {
      onReorder(arrayMove(ids, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={visibleTasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {visibleTasks.map((task, index) => (
            <Fragment key={task.id}>
              <SortableTaskCard
                task={task}
                isCurrent={task.id === currentTask?.id}
                positionNumber={index + 1}
              />
              {task.id === currentTask?.id && (
                <TaskActionCard
                  taskTitle={task.title}
                  onComplete={() => onComplete(task.id)}
                  onSkip={() => onSkip(task.id)}
                />
              )}
            </Fragment>
          ))}
        </div>
      </SortableContext>

      <AddTaskInput onAdd={onAdd} />
    </DndContext>
  );
}
