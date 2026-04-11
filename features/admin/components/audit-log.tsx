"use client";

import { 
  Badge, 
} from "@/components/ui";
import { 
  History, 
  Shield, 
  Clock, 
  Search,
} from "lucide-react";
import { mockAuditLogs } from "../data/mock-admin-data";
import { motion } from "framer-motion";

export function AuditLog() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-black flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          System Audit Logs
        </h3>
        <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                placeholder="Search actions or targets..." 
               className="w-full h-11 rounded-xl border bg-card pl-10 pr-4 text-sm leading-none outline-none transition-all focus:ring-2 focus:ring-primary/20"
              />
           </div>
        </div>
      </div>

      <div className="border border-border/50 rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-sm">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-muted/40 text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Target Entity</th>
              <th className="px-6 py-4">Performed By</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {mockAuditLogs.map((log, idx) => (
              <motion.tr 
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="group hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <Shield className="h-3 w-3 text-primary" />
                    </div>
                    <span className="font-black">{log.action}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-foreground">{log.target}</td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border text-[10px] font-bold">
                    {log.admin}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                      <Clock className="h-3 w-3 text-primary opacity-50" />
                      {log.timestamp}
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Logged
                   </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
