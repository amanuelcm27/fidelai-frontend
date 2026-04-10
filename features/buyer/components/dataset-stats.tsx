"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui";
import { 
  BarChart3, 
  PieChart, 
  Activity, 
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  Users
} from "lucide-react";
import { Dataset } from "../data/mock-datasets";

interface DatasetStatsProps {
  dataset: Dataset;
}

export function DatasetStats({ dataset }: DatasetStatsProps) {
  const statsCols = [
    {
      label: "Chunk Distribution",
      value: "Balanced",
      desc: "Uniformly distributed across sources",
      icon: Layers,
      color: "text-blue-600",
      bg: "bg-blue-500/10"
    },
    {
      label: "Token Density",
      value: "High",
      desc: "Avg ~120 tokens per chunk",
      icon: Sparkles,
      color: "text-amber-600",
      bg: "bg-amber-500/10"
    },
    {
      label: "Domain Coverage",
      value: "Specific",
      desc: "Focused on " + dataset.domain + " domain",
      icon: Search,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Expert QC",
      value: dataset.expertValidation ? "Verified" : "Pending",
      desc: "Double-checked for accuracy",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Dataset Health & Metrics
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCols.map((stat) => (
          <Card key={stat.label} className="border-border/50 shadow-sm transition-all hover:bg-muted/5 group">
            <CardContent className="p-6">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{stat.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Quality Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-24 flex items-end gap-2 px-2 pt-4">
                {[45, 60, 85, 95, 80, 55, 30, 40, 75, 90, 85, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-pointer group relative" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       Score: {h+5}%
                    </div>
                  </div>
                ))}
             </div>
             <p className="text-center text-[10px] text-muted-foreground mt-2 italic font-medium">94% of dataset chunks score above 85% QC</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Contributor Diversity
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-4 py-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                   <p className="text-sm font-bold">120+ Contributors</p>
                   <p className="text-[10px] text-muted-foreground leading-tight">Data sourced from native Amharic speakers globally.</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
