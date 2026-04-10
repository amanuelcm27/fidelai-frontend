"use client";

import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge
} from "@/components/ui";
import { 
  ShoppingCart, 
  Library, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Clock, 
  Sparkles,
  Search,
  LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DatasetCard } from "@/features/buyer/components/dataset-card";
import { mockDatasets } from "@/features/buyer/data/mock-datasets";

export default function BuyerDashboard() {
  const recommendedDatasets = mockDatasets.slice(0, 3);
  const recentDatasets = mockDatasets.slice(2, 4);

  return (
    <div className="space-y-10 pb-20">
      {/* Dashboard Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Buyer Portal
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Welcome back, Amanuel</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover and purchase high-quality Amharic NLP datasets for your AI models.
          </p>
        </div>
        <Link href="/buyer/marketplace">
          <Button size="lg" className="h-14 px-8 font-black gap-3 shadow-xl shadow-primary/20 rounded-2xl group transition-all hover:scale-105 active:scale-95">
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Go to Marketplace
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </section>

      {/* Recommended & Lib Quick Access */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-500" />
              Recommended for You
            </h2>
            <Link href="/buyer/marketplace" className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group">
              Browse All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedDatasets.map((ds) => (
              <DatasetCard key={ds.id} dataset={ds} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <Library className="w-6 h-6 text-primary" />
            Quick Access
          </h2>
          <Card className="border-primary/20 bg-primary/5 shadow-inner">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary opacity-60">My Library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-3">
                  {[
                    "Legal Proceedings Archive",
                    "Amharic News Corpus 2024"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-card border shadow-sm group hover:border-primary transition-all cursor-pointer">
                       <span className="text-xs font-bold truncate pr-4 text-foreground">{item}</span>
                       <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                    </div>
                  ))}
               </div>
               <Link href="/buyer/library" className="block">
                  <Button variant="outline" className="w-full text-xs font-black uppercase tracking-widest gap-2 bg-card border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm">
                    Open Full Library
                    <Library className="w-3.5 h-3.5" />
                  </Button>
               </Link>
            </CardContent>
          </Card>

          {/* Insights / Activity Summary */}
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Market Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
               <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-xs leading-relaxed font-medium">
                    Legal datasets demand has grown <span className="font-black text-emerald-600">12%</span> this month.
                  </div>
               </div>
               <div className="flex items-start gap-3 border-t pt-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs leading-relaxed font-medium">
                    3 new Healthcare datasets are currently in the final Expert Review stage.
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recently Added Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          Recently Published
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {recentDatasets.map((ds) => (
            <DatasetCard key={ds.id} dataset={ds} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
