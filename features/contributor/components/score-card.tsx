"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Progress, 
  Badge 
} from "@/components/ui";
import { 
  Trophy, 
  Star, 
  ChevronRight, 
  TrendingUp 
} from "lucide-react";

export function ScoreCard() {
  const currentScore = 1200;
  const threshold = 2000;
  const progress = (currentScore / threshold) * 100;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">Contributor Status</CardTitle>
        <Trophy className="w-5 h-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-black">1,250</p>
            <p className="text-xs text-muted-foreground">Total Points Earned</p>
          </div>
          <div className="text-right">
            <Badge variant="success" className="mb-1">Level 4</Badge>
            <p className="text-[10px] text-muted-foreground italic">Top 15% in Ethiopia</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium">Next Reward: Gold Contributor</span>
            </div>
            <span className="text-muted-foreground font-mono">1,250 / 2,000</span>
          </div>
          <Progress value={progress} className="h-3 bg-primary/10" />
          <p className="text-[11px] text-muted-foreground text-center">
            Earn 750 more points to unlock higher revenue sharing!
          </p>
        </div>

        <div className="pt-2">
          <button className="w-full flex items-center justify-between p-3 rounded-lg bg-card border shadow-sm hover:border-primary transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">Points Breakdown</p>
                <p className="text-[10px] text-muted-foreground">See how your score is calculated</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
