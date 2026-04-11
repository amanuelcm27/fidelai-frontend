"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, UserPlus, Wallet, Ban, Clock } from "lucide-react";
import { mockAuditLogs } from "../data/mock-admin-data";

const actionIcons: Record<string, React.ReactNode> = {
  "User Suspended": <Ban className="h-4 w-4 text-rose-500" />,
  "Dataset Approved": <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  "Payout Processed": <Wallet className="h-4 w-4 text-blue-500" />,
  "Role Granted": <UserPlus className="h-4 w-4 text-purple-500" />,
};

export function SystemActivityTimeline() {
  return (
    <Card className="shadow-sm border-border/50 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockAuditLogs.map((log, idx) => (
          <div key={log.id} className="relative flex gap-4 pb-4 last:pb-0">
            {idx < mockAuditLogs.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-px bg-border/50" />
            )}
            <div className={`shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center bg-background shadow-sm z-10`}>
              {actionIcons[log.action] || <Clock className="h-4 w-4" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black leading-none">{log.action}</p>
              <p className="text-xs font-medium text-muted-foreground">
                <span className="text-foreground">{log.target}</span> handled by <span className="text-primary">{log.admin}</span>
              </p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                {log.timestamp}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
