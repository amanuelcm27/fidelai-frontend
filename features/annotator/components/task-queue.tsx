"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Layers,
  CheckCircle2,
  XCircle,
  Inbox,
  Stethoscope,
  Scale,
  BarChart2,
  Cpu,
  Leaf,
  HelpCircle,
} from "lucide-react";
import { taskQueue, Task, Difficulty } from "@/features/annotator/data/mock";
import { motion, AnimatePresence } from "framer-motion";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const difficultyStyle: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  Medium: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Hard: "bg-rose-500/10 text-rose-600 border-rose-500/30",
};

const domainIcon: Record<string, React.ReactNode> = {
  Health: <Stethoscope className="h-4 w-4" />,
  Legal: <Scale className="h-4 w-4" />,
  Finance: <BarChart2 className="h-4 w-4" />,
  Tech: <Cpu className="h-4 w-4" />,
  Agriculture: <Leaf className="h-4 w-4" />,
};

const domainColor: Record<string, string> = {
  Health: "bg-blue-500/10 text-blue-500",
  Legal: "bg-purple-500/10 text-purple-500",
  Finance: "bg-emerald-500/10 text-emerald-500",
  Tech: "bg-cyan-500/10 text-cyan-500",
  Agriculture: "bg-lime-500/10 text-lime-600",
};

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
        <Inbox className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <p className="text-lg font-black tracking-tight">No tasks available</p>
        <p className="text-sm text-muted-foreground mt-1">
          Check back soon — new tasks are posted regularly.
        </p>
      </div>
    </div>
  );
}

// ─── Task Card ────────────────────────────────────────────────────────────────

function TaskCard({
  task,
  onAccept,
  onDecline,
}: {
  task: Task;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) {
  const icon = domainIcon[task.domain] ?? <HelpCircle className="h-4 w-4" />;
  const iconColor = domainColor[task.domain] ?? "bg-muted text-muted-foreground";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 group">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Domain Icon */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}
            >
              {icon}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  {task.id}
                </span>
                <Badge
                  variant="outline"
                  className={`text-xs font-bold ${difficultyStyle[task.difficulty]}`}
                >
                  {task.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs font-bold">
                  {task.domain}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {task.description}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  {task.chunks} chunks
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  ~{task.estimatedMinutes} min
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <Button
                size="sm"
                className="flex-1 sm:flex-none gap-1.5 font-bold"
                onClick={() => onAccept(task.id)}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 sm:flex-none gap-1.5 font-bold text-muted-foreground hover:text-destructive hover:border-destructive/40"
                onClick={() => onDecline(task.id)}
              >
                <XCircle className="h-3.5 w-3.5" />
                Decline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { useRouter } from "next/navigation";

// ─── Main Component ───────────────────────────────────────────────────────────

export function TaskQueueList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(taskQueue);

  const handleAccept = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    router.push(`/annotator/workspace/${id}`);
  };

  const handleDecline = (id: string) => {
    console.log(`[TaskQueue] Declined task: ${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
