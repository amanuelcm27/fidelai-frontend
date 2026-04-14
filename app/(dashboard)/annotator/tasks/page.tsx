"use client";

import { ListTodo } from "lucide-react";
import { TaskQueueList } from "@/features/annotator/components/task-queue";

export default function AnnotatorTasksPage() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <section className="border-b pb-8">
        <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] mb-2">
          <ListTodo className="w-3.5 h-3.5" />
          Task Queue
        </div>
        <h1 className="text-4xl font-black tracking-tighter">Available Tasks</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mt-1">
          Browse, review, and claim annotation tasks. Accept a task to begin working in the workspace.
        </p>
      </section>

      {/* Task List */}
      <section>
        <TaskQueueList />
      </section>
    </div>
  );
}
