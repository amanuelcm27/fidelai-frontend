"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ShieldCheck } from "lucide-react";
import { resolvedRecords } from "@/features/expert/data/mock";

export function ExpertPerformanceRecords() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Task ID</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Domain</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-center">Chunks Reviewed</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Resolution Type</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Resolution Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {resolvedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-black text-sm">{record.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-muted/50 text-muted-foreground uppercase tracking-wider">
                      {record.domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-sm text-muted-foreground">{record.chunks}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`text-[10px] uppercase font-bold tracking-widest ${
                      record.resolution.includes('Overrides AI') ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                      record.resolution.includes('Overrides Annotators') ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      record.resolution.includes('Content Rejected') ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                      'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      {record.resolution}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-muted-foreground">{new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
