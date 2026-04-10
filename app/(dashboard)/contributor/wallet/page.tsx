"use client";

import { ScoreCard } from "@/features/contributor/components/score-card";
import { PayoutPanel } from "@/features/contributor/components/payout-panel";
import { ApplyContributorRole } from "@/features/contributor/components/apply-contributor-role";
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";

export default function ContributorWalletPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Wallet className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Wallet & Rewards</h1>
        </div>
        <p className="text-muted-foreground ml-11">
          Monitor your earnings, points progress, and manage your withdrawal options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Earnings & Transactions */}
        <div className="lg:col-span-7 space-y-6">
          <PayoutPanel />
          
          <Card className="bg-muted/30 border-dashed">
             <CardContent className="p-6 flex items-start gap-4">
               <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
               <div className="space-y-1">
                 <p className="text-sm font-bold">About Revenue Sharing</p>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   FidelAI provides a transparent 35% revenue share for all validated dataset sales. 
                   Reach Gold status to unlock the 45% premium tier. Payments are processed monthly between 
                   the 1st and 5th of each month.
                 </p>
               </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Score & Status */}
        <div className="lg:col-span-5 space-y-6">
          <ScoreCard />
          <ApplyContributorRole />
          
          <Card className="border-emerald-500/20 bg-emerald-500/5">
             <CardContent className="p-6">
               <div className="flex items-center gap-3 mb-4">
                 <ShieldCheck className="w-5 h-5 text-emerald-600" />
                 <h3 className="text-sm font-bold tracking-tight">Payout Security</h3>
               </div>
               <p className="text-xs text-emerald-800/80 leading-relaxed mb-4">
                 Multiple security layers protect your earnings. Ensure your bank account name matches 
                 your verified profile identity for smooth withdrawals.
               </p>
               <button className="text-[10px] font-bold text-emerald-700 hover:underline">Manage Payout Settings</button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
