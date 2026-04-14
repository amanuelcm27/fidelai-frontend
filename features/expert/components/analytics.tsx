"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldCheck,
  TrendingUp,
  BarChart as BarChartIcon,
  PieChart,
  Target,
  Bot,
  Users,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { expertAnalytics } from "@/features/expert/data/mock";

// ─── Simple CSS Mini Charts ─────────────────────────────────────────────────

function SimpleBarChart({ data, color }: { data: { week: string; decisions: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.decisions));
  return (
    <div className="flex items-end gap-1.5 h-32 mt-4 pt-4 border-b border-border/50 pb-2">
      {data.map((d) => {
        const pct = (d.decisions / Math.max(max, 1)) * 100;
        return (
          <div key={d.week} className="flex-1 flex flex-col items-center gap-2 group relative">
            <span className="absolute -top-7 text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {d.decisions}
            </span>
            <div 
              className={`w-full rounded-t-sm transition-all duration-500 hover:opacity-80 ${color}`}
              style={{ height: `${pct}%` }}
            />
            <span className="text-[9px] text-muted-foreground truncate w-full text-center">
              {d.week.split(" ")[0]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ExpertAnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Main Metrics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total Reviews</p>
              <div className="p-2 bg-blue-500/10 rounded-lg"><ShieldCheck className="w-4 h-4 text-blue-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">145</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
               <TrendingUp className="w-3 h-3 text-blue-500" /> Lifetime resolutions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">AI Agreement</p>
              <div className="p-2 bg-purple-500/10 rounded-lg"><Bot className="w-4 h-4 text-purple-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">{expertAnalytics.aiAgreementPct}%</p>
            <p className="text-xs text-muted-foreground mt-1">Matched predicted ground truth</p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Annotator Match</p>
              <div className="p-2 bg-emerald-500/10 rounded-lg"><Users className="w-4 h-4 text-emerald-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">{expertAnalytics.annotatorAgreementPct}%</p>
            <p className="text-xs text-muted-foreground mt-1">Matched human consensus</p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Dispute Resolution Rate</p>
              <div className="p-2 bg-amber-500/10 rounded-lg"><Target className="w-4 h-4 text-amber-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">98.5%</p>
            <p className="text-xs text-muted-foreground mt-1">Of queue cleared within SLA</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Adjudications Chart */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-border/50 bg-card/60 h-full">
            <CardHeader className="pb-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
              Volume: Decisions Over Time
            </CardHeader>
            <CardContent className="p-5">
              <SimpleBarChart data={expertAnalytics.decisionsOverTime} color="bg-blue-500" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Domain Comparison */}
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
           <Card className="border-border/50 bg-card/60 h-full">
             <CardHeader className="pb-4">
               <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <PieChart className="w-4 h-4 text-primary" /> Domain Breakdown
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                 {expertAnalytics.domainPerformance.map((d) => (
                   <div key={d.domain} className="flex justify-between items-center p-3 rounded-lg border bg-muted/20">
                      <div>
                        <p className="text-sm font-bold">{d.domain}</p>
                        <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">{d.disputes} disputes cleared</p>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-black text-rose-500">{d.overrideRate}% AI Overrides</span>
                      </div>
                   </div>
                 ))}
             </CardContent>
           </Card>
        </motion.div>

      </div>

      {/* Insights */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Smart System Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
           {[
             { title: "High disagreement in Legal domain", msg: "Annotators frequently override AI in contract analysis.", active: true },
             { title: "Frequent overrides of AI predictions", msg: "You have rejected 34% of AI baseline truths in Law.", active: false },
             { title: "Escalation Queue Clearing Fast", msg: "Your resolution velocity is 1.5x the median reviewer.", active: false }
           ].map((ins, i) => (
             <Card key={i} className={`border-border/50 bg-card/60 shadow-sm ${ins.active ? 'border-amber-500/20 bg-amber-500/5' : ''}`}>
               <CardContent className="p-5 flex items-start gap-4">
                 <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${ins.active ? 'text-amber-500' : 'text-primary'}`} />
                 <div>
                   <p className={`text-sm font-black mb-1 ${ins.active ? 'text-amber-700' : ''}`}>{ins.title}</p>
                   <p className="text-xs text-muted-foreground leading-relaxed">{ins.msg}</p>
                 </div>
               </CardContent>
             </Card>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
