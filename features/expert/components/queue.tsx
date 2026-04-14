"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Target, Layers, AlertCircle, ChevronRight, Filter } from "lucide-react";
import { reviewQueueData } from "@/features/expert/data/mock";
import Link from "next/link";
import { useState } from "react";

export function ExpertQueueList() {
  const [filter, setFilter] = useState("All");

  const filteredData = filter === "All" 
    ? reviewQueueData 
    : reviewQueueData.filter(d => d.reason.includes(filter) || d.domain === filter);

  return (
    <div className="space-y-6">
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="w-4 h-4 text-muted-foreground mr-2" />
        {["All", "Low Consensus", "AI Conflict", "Flagged Content", "Legal", "Health"].map((f) => (
          <Button
            key={f}
            variant="outline"
            size="sm"
            onClick={() => setFilter(f)}
            className={`text-xs font-bold rounded-full border-border/50 ${filter === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground'}`}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredData.map((task) => (
          <Card key={task.id} className="group border-border/50 bg-card/60 backdrop-blur-sm shadow-sm transition-all hover:bg-muted/10 hover:border-primary/30">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row items-stretch">
                
                {/* Left: Info */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black tracking-tight">{task.id}</h3>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/30">
                      {task.domain}
                    </Badge>
                    <Badge className={`text-[10px] uppercase font-bold tracking-widest ${
                      task.difficulty === 'High' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                      task.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      {task.difficulty} Difficulty
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                       <AlertCircle className="w-4 h-4 text-rose-500" />
                       Escalation: <span className="font-bold text-rose-600">{task.reason}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                      <Layers className="w-4 h-4 text-primary opacity-70" />
                      {task.chunks} Chunks
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                      <Target className="w-4 h-4 text-primary opacity-70" />
                      Assigned {task.assignedAt}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="border-t lg:border-t-0 lg:border-l border-border/50 p-6 flex flex-row lg:flex-col items-center justify-center gap-3 bg-muted/10">
                  <Link href={`/expert/workspace/${task.id}`} className="w-full">
                    <Button className="w-full text-sm font-black gap-2 h-12 shadow-lg shadow-primary/20">
                      <ShieldCheck className="w-4 h-4" /> Resolve <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full text-xs font-bold text-muted-foreground">
                    Skip / Drop
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center p-12 border border-dashed rounded-xl border-border/50 bg-card/30">
            <p className="text-muted-foreground font-bold">No escalated tasks matching that filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
