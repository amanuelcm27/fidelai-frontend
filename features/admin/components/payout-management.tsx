"use client";

import { 
  Badge, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Input
} from "@/components/ui";
import { 
  Wallet, 
  CheckCircle, 
  ArrowUpRight,
  Percent,
  TrendingDown,
  Building2
} from "lucide-react";
import { mockPayouts, mockSystemSettings } from "../data/mock-admin-data";
import { motion } from "framer-motion";

export function PayoutManagement() {
  return (
    <div className="space-y-8">
      {/* Commission Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-primary/20 bg-primary/5 shadow-inner">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
               <Percent className="h-4 w-4" />
               Revenue Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted-foreground uppercase opacity-70">Platform Commission %</label>
                   <div className="relative">
                      <Input type="number" defaultValue={mockSystemSettings.platformCommission} className="h-12 text-lg font-black pr-10 rounded-xl" />
                      <span className="absolute right-4 top-3 text-muted-foreground font-bold">%</span>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted-foreground uppercase opacity-70">Contributor Share %</label>
                   <div className="relative">
                      <Input type="number" defaultValue={mockSystemSettings.contributorShare} className="h-12 text-lg font-black pr-10 rounded-xl bg-background/50" disabled />
                      <span className="absolute right-4 top-3 text-muted-foreground font-bold">%</span>
                   </div>
                </div>
             </div>
             <Button className="w-full font-black uppercase tracking-widest gap-2">
                Update Commission Structure
                <ArrowUpRight className="h-4 w-4" />
             </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card shadow-sm">
           <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                 <Building2 className="h-4 w-4" />
                 Global Thresholds
              </CardTitle>
           </CardHeader>
           <CardContent className="grid grid-cols-2 gap-6 pt-4">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase opacity-70">Min Payout (ETB)</label>
                  <Input type="number" defaultValue={mockSystemSettings.minPayoutThreshold} className="h-12 text-lg font-black rounded-xl" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase opacity-70">QC Pass Threshold %</label>
                  <Input type="number" defaultValue={mockSystemSettings.qcThreshold} className="h-12 text-lg font-black rounded-xl" />
               </div>
           </CardContent>
        </Card>
      </div>

      {/* Payout Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-black flex items-center gap-2">
           <Wallet className="h-5 w-5 text-primary" />
           Pending Payout Requests
        </h3>
        <div className="border border-border/50 rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-sm">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-muted/40 text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em]">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Request Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockPayouts.map((p, idx) => (
                <motion.tr 
                  key={p.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-black">{p.userName}</td>
                  <td className="px-6 py-4 font-medium text-muted-foreground">{p.role}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-black text-primary">ETB {p.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`rounded-full px-3 py-0 scale-90 ${
                      p.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 
                      p.status === 'Approved' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : 
                      'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    }`}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{p.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       {p.status === 'Pending' && (
                         <Button
                           size="sm"
                           variant="outline"
                           className="h-8 border-blue-200 bg-background font-bold text-blue-600 hover:bg-blue-500/10 hover:text-blue-700 dark:border-blue-500/30 dark:hover:bg-blue-500/20 dark:hover:text-blue-300"
                         >
                           Approve
                         </Button>
                       )}
                       {p.status === 'Approved' && (
                         <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">Mark as Paid</Button>
                       )}
                       {p.status === 'Paid' && (
                         <Button size="sm" variant="ghost" className="h-8 font-bold gap-2 opacity-50" disabled>
                            <CheckCircle className="h-3 w-3" />
                            Processed
                         </Button>
                       )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
