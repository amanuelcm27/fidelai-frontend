"use client";

import { 
  Badge, 
  Button, 
} from "@/components/ui";
import { 
  Database, 
  CheckCircle, 
  XSquare, 
  Eye,
  BarChart3,
  User as UserIcon
} from "lucide-react";
import { mockDatasetApprovals, DatasetApproval } from "../data/mock-admin-data";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { motion } from "framer-motion";

export function DatasetApprovalQueue() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDS, setSelectedDS] = useState<DatasetApproval | null>(null);

  const handleView = (ds: DatasetApproval) => {
    setSelectedDS(ds);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Dataset Approval Queue
        </h3>
      </div>

      <div className="border border-border/50 rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-sm">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-muted/40 text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Dataset Name</th>
              <th className="px-6 py-4">Contributor</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">QC Score</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {mockDatasetApprovals.map((ds, idx) => (
              <motion.tr 
                key={ds.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-black text-foreground">{ds.name}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    <UserIcon className="h-4 w-4 text-primary opacity-50" />
                    {ds.contributor}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="scale-90 font-bold uppercase tracking-widest text-[10px]">
                    {ds.domain}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span className="font-black text-primary">{ds.qcScore}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={`scale-90 font-bold ${
                    ds.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 
                    ds.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 
                    'bg-rose-500/10 text-rose-600 border-rose-500/20'
                  }`}>
                    {ds.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => handleView(ds)} size="sm" variant="outline" className="h-8 font-bold gap-2 shadow-sm">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
                      Approve
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)}
        title="Dataset Approval Details"
      >
        {selectedDS && (
          <div className="space-y-6 pt-4">
            <div className="p-4 rounded-2xl bg-muted/40 border space-y-4">
               <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-xl font-black">{selectedDS.name}</h4>
                    <p className="text-xs text-muted-foreground">Submitted by {selectedDS.contributor}</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{selectedDS.domain}</Badge>
               </div>
               <p className="text-sm text-foreground leading-relaxed">
                  {selectedDS.metadata.summary}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl border bg-background/50 space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">QC Health Score</p>
                  <p className="text-2xl font-black text-emerald-600 tracking-tighter">{selectedDS.qcScore}%</p>
               </div>
               <div className="p-4 rounded-2xl border bg-background/50 space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Chunks</p>
                  <p className="text-2xl font-black tracking-tighter">{selectedDS.metadata.chunkCount.toLocaleString()}</p>
               </div>
            </div>

            <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Validation Summary</p>
                 <div className="flex items-center gap-2 p-3 rounded-xl border bg-emerald-500/5 text-emerald-700 text-xs font-bold leading-none capitalize">
                    <CheckCircle className="h-4 w-4" />
                    Passed all structural and linguistic validity checks.
                 </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6">
                <Button variant="ghost" onClick={() => setIsDetailsOpen(false)}>Close</Button>
                <Button
                  variant="outline"
                  className="text-rose-600 border-rose-200 bg-background font-bold gap-2 hover:bg-rose-500/10 hover:text-rose-700 dark:border-rose-500/30 dark:hover:bg-rose-500/20 dark:hover:text-rose-300"
                >
                   <XSquare className="h-4 w-4" />
                   Reject
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 font-bold gap-2 shadow-lg shadow-emerald-500/20">
                   <CheckCircle className="h-4 w-4" />
                   Approve for Marketplace
                </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
