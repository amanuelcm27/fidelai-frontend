"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Award,
  Clock,
  Target,
  BarChart as BarChartIcon,
  PieChart,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock Data
const accuracyTrendData = [
  { week: "W1 Mar", value: 82 },
  { week: "W2 Mar", value: 85 },
  { week: "W3 Mar", value: 88 },
  { week: "W4 Mar", value: 86 },
  { week: "W1 Apr", value: 90 },
  { week: "W2 Apr", value: 94 },
];

const taskVolumeData = [
  { week: "W1 Mar", value: 3 },
  { week: "W2 Mar", value: 5 },
  { week: "W3 Mar", value: 6 },
  { week: "W4 Mar", value: 4 },
  { week: "W1 Apr", value: 7 },
  { week: "W2 Apr", value: 7 },
];

const domainPerformance = [
  { domain: "Health", accuracy: 96, tasks: 12 },
  { domain: "Legal", accuracy: 78, tasks: 5 },
  { domain: "Tech", accuracy: 92, tasks: 8 },
  { domain: "Finance", accuracy: 94, tasks: 7 },
];

const insights = [
  { type: "positive", text: "Strong performance in Health domain texts (96% accuracy)." },
  { type: "warning", text: "Lower agreement rate detected in recent Legal validations." },
  { type: "info", text: "Your flagging rate is 5% higher than the platform average." },
];

// ─── Simple CSS Mini Charts ─────────────────────────────────────────────────

function SimpleBarChart({ data, color }: { data: { week: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1.5 h-32 mt-4 pt-4 border-b border-border/50 pb-2">
      {data.map((d) => {
        const pct = (d.value / Math.max(max, 1)) * 100;
        return (
          <div key={d.week} className="flex-1 flex flex-col items-center gap-2 group relative">
            <span className="absolute -top-7 text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {d.value}
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

function SimpleLineChart({ data }: { data: { week: string; value: number }[] }) {
  const max = 100;
  const min = 70; // baseline for visualization mapping
  
  return (
    <div className="relative h-32 mt-4 pt-4 border-b border-border/50 pb-6">
       <div className="absolute inset-0 flex items-end gap-0">
          {data.map((d, i) => {
            const pct = ((d.value - min) / (max - min)) * 100;
            return (
              <div key={d.week} className="flex-1 flex flex-col items-center justify-end relative h-full">
                 <div 
                   className="w-3 h-3 bg-primary rounded-full absolute -ml-1.5 border-2 border-background z-10 hover:scale-150 transition-transform cursor-pointer"
                   style={{ bottom: `${pct}%`, left: '50%' }}
                   title={`${d.value}%`}
                 />
                 {/* Fake SVG line connection visual logic - simplified to just dots and vertical anchors for a clean structural look */}
                 <div className="w-px border-l border-dashed border-border/50 absolute bottom-0 z-0" style={{ height: `${pct}%`, left: '50%' }} />
                 <span className="absolute -bottom-6 text-[9px] text-muted-foreground">
                   {d.week.split(" ")[0]}
                 </span>
              </div>
            );
          })}
       </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function AnalyticsDashboard() {
  const hasData = true; // Swap to test empty state

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center border rounded-2xl bg-card/30 border-dashed">
        <BarChartIcon className="w-12 h-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-xl font-black">No analytics available yet</h3>
        <p className="text-muted-foreground text-sm mt-2 max-w-sm">
          Complete more tasks to generate insights, trends, and performance metrics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Overall Accuracy</p>
              <div className="p-2 bg-emerald-500/10 rounded-lg"><Target className="w-4 h-4 text-emerald-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">91.4%</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
               <TrendingUp className="w-3 h-3 text-emerald-500" /> +2.4% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tasks Completed</p>
              <div className="p-2 bg-blue-500/10 rounded-lg"><FileText className="w-4 h-4 text-blue-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">32</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
               <TrendingUp className="w-3 h-3 text-emerald-500" /> +5 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Points Earned</p>
              <div className="p-2 bg-amber-500/10 rounded-lg"><Award className="w-4 h-4 text-amber-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">2,840</p>
            <p className="text-xs text-muted-foreground mt-1">Total lifetime XP</p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-hover hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Avg. Time / Task</p>
              <div className="p-2 bg-purple-500/10 rounded-lg"><Clock className="w-4 h-4 text-purple-500" /></div>
            </div>
            <p className="text-3xl font-black tracking-tighter">18m</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
               <TrendingUp className="w-3 h-3 text-rose-500 transform rotate-180" /> -2m faster vs avg
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Consensus Alignment */}
         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
           <Card className="h-full border-border/50 bg-card/60">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Consensus Alignment
               </CardTitle>
               <p className="text-xs text-muted-foreground">This reflects how often your annotations match consensus outcomes.</p>
             </CardHeader>
             <CardContent className="flex flex-col items-center justify-center p-8">
               <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-[12px] border-emerald-500/20">
                 {/* Fake SVG Radial representation */}
                 <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                   <circle cx="80" cy="80" r="68" fill="none" stroke="currentColor" strokeWidth="12" className="text-emerald-500 stroke-current" strokeDasharray="427" strokeDashoffset="42" />
                 </svg>
                 <div className="text-center">
                   <span className="text-4xl font-black tracking-tighter">90%</span>
                 </div>
               </div>
               <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mt-6 bg-emerald-500/10 px-3 py-1 rounded-full">Highly Reliable</p>
             </CardContent>
           </Card>
         </motion.div>

         {/* Accuracy & Task Trends */}
         <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <Card className="border-border/50 bg-card/60">
               <CardContent className="p-5">
                 <div className="flex items-center justify-between">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Accuracy Trend</h3>
                 </div>
                 <SimpleLineChart data={accuracyTrendData} />
               </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/60">
               <CardContent className="p-5">
                 <div className="flex items-center justify-between">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Task Volume</h3>
                 </div>
                 <SimpleBarChart data={taskVolumeData} color="bg-blue-500" />
               </CardContent>
            </Card>
         </motion.div>
      </div>

      {/* Breakdowns Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Label Distribution */}
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-1">
           <Card className="h-full border-border/50 bg-card/60">
             <CardHeader className="pb-4">
               <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <PieChart className="w-4 h-4 text-primary" /> Label Distribution
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold"><span>Match</span> <span>65%</span></div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold"><span>Not Match</span> <span>25%</span></div>
                  <Progress value={25} className="h-2 [&>div]:bg-amber-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold"><span>Uncertain</span> <span>10%</span></div>
                  <Progress value={10} className="h-2 [&>div]:bg-rose-500" />
                </div>
             </CardContent>
           </Card>
         </motion.div>

         {/* Domain Performance */}
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-1">
           <Card className="h-full border-border/50 bg-card/60">
             <CardHeader className="pb-4">
               <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <BarChartIcon className="w-4 h-4 text-primary" /> Domain Performance
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                 {domainPerformance.map((d) => (
                   <div key={d.domain} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                     <div>
                       <p className="text-sm font-bold">{d.domain}</p>
                       <p className="text-[10px] text-muted-foreground uppercase">{d.tasks} Tasks</p>
                     </div>
                     <Badge className={
                       d.accuracy >= 90 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : 
                       "bg-amber-500/10 text-amber-600 border-amber-500/20"
                     }>{d.accuracy}% Acc</Badge>
                   </div>
                 ))}
             </CardContent>
           </Card>
         </motion.div>

         {/* Flagging & Insights */}
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-1 flex flex-col gap-4">
            {/* Flagging */}
            <Card className="border-border/50 bg-card/60 shrink-0">
               <CardContent className="p-5 flex items-center justify-between">
                 <div>
                   <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5 text-muted-foreground mb-1">
                     <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Flagging Behavior
                   </h3>
                   <p className="text-2xl font-black">24 <span className="text-sm font-normal text-muted-foreground tracking-normal">Chunks</span></p>
                 </div>
                 <div className="text-right">
                   <span className="text-lg font-black text-amber-600">8%</span>
                   <p className="text-[10px] text-muted-foreground uppercase">Flag Rate</p>
                 </div>
               </CardContent>
            </Card>

            {/* Smart Insights */}
            <Card className="flex-1 border-border/50 bg-card/60 flex flex-col">
              <CardHeader className="pb-3 shrink-0">
                 <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                   <Lightbulb className="w-4 h-4 text-primary" /> Performance Insights
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 overflow-auto">
                 {insights.map((insight, idx) => (
                   <div key={idx} className={`p-3 rounded-xl border text-xs font-medium leading-relaxed ${
                     insight.type === 'positive' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700' :
                     insight.type === 'warning' ? 'bg-amber-500/5 border-amber-500/20 text-amber-700' :
                     'bg-blue-500/5 border-blue-500/20 text-blue-700'
                   }`}>
                     {insight.text}
                   </div>
                 ))}
              </CardContent>
            </Card>
         </motion.div>
      </div>

    </div>
  );
}
