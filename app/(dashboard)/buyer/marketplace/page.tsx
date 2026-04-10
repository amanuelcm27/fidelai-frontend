"use client";

import { useState } from "react";
import { 
  Button 
} from "@/components/ui";
import { 
  ChevronLeft, 
  ChevronRight,
  ShoppingCart,
  Grid3X3,
  LayoutList,
  Database,
  FileText,
  Languages
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DatasetCard } from "@/features/buyer/components/dataset-card";
import { MarketplaceFilters } from "@/features/buyer/components/marketplace-filters";
import { mockDatasets } from "@/features/buyer/data/mock-datasets";
import { motion } from "framer-motion";

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-8 pb-20 max-w-[1400px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em]">
            <ShoppingCart className="w-4 h-4" />
            Global Marketplace
          </div>
          <h1 className="text-4xl font-black tracking-tight">Discover Datasets</h1>
          <p className="text-muted-foreground font-medium">
            Explore 1,200+ specialized Amharic datasets curated by linguistics experts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-muted/40 p-1.5 rounded-2xl border">
          <Button 
            variant={viewMode === "grid" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setViewMode("grid")}
            className="rounded-xl h-9 font-bold gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
            Grid View
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setViewMode("list")}
            className="rounded-xl h-9 font-bold gap-2"
          >
            <LayoutList className="w-4 h-4" />
            Detail View
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Filters - Sticky */}
        <div className="w-full lg:w-80 shrink-0">
          <MarketplaceFilters />
        </div>

        {/* Dataset Grid Area */}
        <div className="flex-1 space-y-12">
          {mockDatasets.length === 0 ? (
            <div className="h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-8 space-y-4">
               <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground" />
               </div>
               <div className="space-y-1">
                  <h3 className="text-xl font-black">No Datasets Found</h3>
                  <p className="text-muted-foreground max-w-xs">Try adjusting your filters or search keywords to find what you're looking for.</p>
               </div>
               <Button variant="outline" className="font-bold">Clear All Filters</Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {mockDatasets.map((ds) => (
                <DatasetCard key={ds.id} dataset={ds} />
              ))}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {mockDatasets.map((ds) => (
                <div key={ds.id} className="group p-6 rounded-3xl border bg-card hover:border-primary/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                   <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                         <h3 className="text-xl font-black group-hover:text-primary transition-colors">{ds.title}</h3>
                         <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest">{ds.domain}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground font-medium">
                         <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> {ds.size}</span>
                         <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {ds.chunkCount.toLocaleString()} Chunks</span>
                         <span className="flex items-center gap-1.5"><Languages className="w-3.5 h-3.5" /> {ds.language}</span>
                         <span className="flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">QC {ds.qcScore}%</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-2xl font-black text-primary whitespace-nowrap">ETB {ds.price.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <Link href={`/marketplace/${ds.id}`}>
                          <Button variant="ghost" className="font-bold">Details</Button>
                        </Link>
                        <Button className="font-bold shadow-lg shadow-primary/20">Buy Now</Button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 pt-8 border-t">
            <Button variant="outline" size="icon" disabled className="rounded-xl">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="default" className="rounded-xl font-bold w-10">1</Button>
            <Button variant="outline" className="rounded-xl font-bold w-10">2</Button>
            <Button variant="outline" className="rounded-xl font-bold w-10">3</Button>
            <span className="text-muted-foreground px-2">...</span>
            <Button variant="outline" className="rounded-xl font-bold w-10">50</Button>
            <Button variant="outline" size="icon" className="rounded-xl">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
