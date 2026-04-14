"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  AlertOctagon,
  Clock,
  Target,
  ChevronRight,
  History,
  AlertTriangle
} from "lucide-react";
import { expertStats, reviewQueueData } from "@/features/expert/data/mock";
import Link from "next/link";
import { motion } from "framer-motion";

export function ExpertDashboardContent() {
  return (
    <div className="space-y-10 pb-20">
      
      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm transition-hover hover:border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Pending Reviews</p>
              <div className="p-2 bg-rose-500/10 rounded-lg"><AlertOctagon className="w-5 h-5 text-rose-500" /></div>
            </div>
            <p className="text-4xl font-black tracking-tighter">{expertStats.pendingReviews}</p>
            <p className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">
              Requires immediate action
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-sm transition-hover hover:border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Resolved Cases</p>
              <div className="p-2 bg-emerald-500/10 rounded-lg"><ShieldCheck className="w-5 h-5 text-emerald-500" /></div>
            </div>
            <p className="text-4xl font-black tracking-tighter">{expertStats.resolvedCases}</p>
            <p className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">
              Total lifetime resolutions
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-sm transition-hover hover:border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Avg Decision Time</p>
              <div className="p-2 bg-amber-500/10 rounded-lg"><Clock className="w-5 h-5 text-amber-500" /></div>
            </div>
            <p className="text-4xl font-black tracking-tighter">{expertStats.avgDecisionTime}</p>
            <p className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">
              Per distinct task chunk
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-sm transition-hover hover:border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Agreement (Final)</p>
              <div className="p-2 bg-blue-500/10 rounded-lg"><Target className="w-5 h-5 text-blue-500" /></div>
            </div>
            <p className="text-4xl font-black tracking-tighter">{expertStats.agreementWithOutcomes}</p>
            <p className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">
              Alignment with AI ground truth
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Queue Preview */}
        <div className="col-span-1 lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black uppercase tracking-widest text-muted-foreground">Priority Review Queue</h2>
            <Link href="/expert/queue">
              <Button variant="ghost" className="text-xs font-bold text-primary gap-1 px-2.5 h-8">
                View Full Queue <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          
          <Card className="border-border/50 bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden">
            <div className="divide-y divide-border/50">
              {reviewQueueData.slice(0, 3).map((task) => (
                <div key={task.id} className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted/60 rounded-xl border border-border/50">
                      <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-black">{task.id}</p>
                        <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-bold">
                          {task.domain}
                        </Badge>
                      </div>
                      <p className="text-xs font-semibold text-rose-500 gap-1.5 flex flex-row items-center">
                         <AlertTriangle className="w-3 h-3" /> Escalation: {task.reason}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="text-right hidden sm:block">
                       <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{task.chunks} Chunks</p>
                       <p className="text-xs font-medium text-muted-foreground/70">{task.assignedAt}</p>
                     </div>
                     <Link href={`/expert/workspace/${task.id}`}>
                       <Button className="h-9 px-4 text-xs font-bold gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                         Resolve <ChevronRight className="w-3 h-3" />
                       </Button>
                     </Link>
                  </div>
                </div>
              ))}
              {reviewQueueData.length === 0 && (
                 <div className="p-8 text-center text-muted-foreground">
                   <ShieldCheck className="w-8 h-8 opacity-20 mx-auto mb-3" />
                   <p className="text-sm font-bold">Your queue is empty. Great job!</p>
                 </div>
              )}
            </div>
            <div className="bg-muted/20 p-3 border-t border-border/50 text-center">
               <Link href="/expert/queue" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                 + {Math.max(reviewQueueData.length - 3, 0)} more tasks pending
               </Link>
            </div>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          <h2 className="text-base font-black uppercase tracking-widest text-muted-foreground">Expert Guidelines</h2>
          <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
             <CardHeader className="pb-3 border-b border-border/50">
               <CardTitle className="text-sm tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Authority Protocol
               </CardTitle>
             </CardHeader>
             <CardContent className="p-5 space-y-4">
               <div>
                 <p className="text-sm font-bold mb-1">1. Final Say</p>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   Your decisions supersede individual annotator majorities and standard AI predictions. 
                   Ensure meticulous review of all context arrays before overriding.
                 </p>
               </div>
               <div>
                 <p className="text-sm font-bold mb-1">2. Mandatory Rationales</p>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   When overriding AI ground truth or breaking an annotator deadlock, you must 
                   input a clear textual reasoning string mapping why the escalation was resolved linearly.
                 </p>
               </div>
               <div>
                 <p className="text-sm font-bold mb-1">3. Domain Strictness</p>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   You are only receiving tasks associated with your verified expertise domains. 
                   Do not hesitate to flag items completely incongruent with these domains as 'Noise'.
                 </p>
               </div>
             </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
