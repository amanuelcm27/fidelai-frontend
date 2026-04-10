"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge 
} from "@/components/ui";
import { 
  Quote, 
  LayoutList, 
  Hash, 
  Lock,
  Zap,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";

interface Chunk {
  id: string;
  text: string;
  source: string;
  qcScore: number;
  tokens: number;
}

interface SampleChunksProps {
  chunks: Chunk[];
}

export function SampleChunks({ chunks }: SampleChunksProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Quote className="w-5 h-5 text-primary" />
          Sample Data Preview
        </h3>
        <Badge variant="outline" className="text-secondary-foreground flex gap-2 items-center bg-secondary/10 border-none">
          <Zap className="w-3 h-3 text-secondary-foreground" />
          Showing {chunks.length || 0} of 10,000+ chunks
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {chunks.length === 0 ? (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="p-12 text-center text-muted-foreground flex flex-col items-center gap-3">
              <Lock className="w-10 h-10 opacity-20" />
              <p className="font-medium">Sample chunks are unavailable for this archival dataset.</p>
              <p className="text-xs">Purchase required for full document access.</p>
            </CardContent>
          </Card>
        ) : (
          chunks.map((chunk, idx) => (
            <motion.div
              key={chunk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group border-border/50 hover:border-primary/30 transition-all shadow-sm">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x">
                    {/* Metadata Sidebar */}
                    <div className="md:w-48 p-4 bg-muted/30 flex flex-col gap-3 shrink-0">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Chunk ID</span>
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                          <Hash className="w-3 h-3 text-primary" />
                          {chunk.id}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Quality</span>
                        <Badge className={`text-[10px] px-2 py-0 h-5 font-black ${
                          chunk.qcScore >= 95 ? 'bg-emerald-500/20 text-emerald-700' : 'bg-primary/20 text-primary'
                        } border-none shadow-none`}>
                          QC {chunk.qcScore}%
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Source</span>
                        <div className="flex items-center gap-1.5 text-xs font-bold truncate">
                          <Tag className="w-3 h-3 text-primary" />
                          {chunk.source}
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 relative bg-card group-hover:bg-muted/5 transition-colors">
                      <p className="text-sm font-medium leading-relaxed mb-4 font-inter text-foreground/90">
                        {chunk.text}
                      </p>
                      <div className="relative overflow-hidden rounded-lg bg-muted/20 p-4 border border-dashed text-sm">
                        <div className="blur-sm select-none">
                          ይህ የተደበቀ ፅሁፍ ነው። ለሙሉ ፅሁፍ ይህን ዳታሴት መግዛት ይኖርብዎታል። የኢትዮጵያ ቋንቋዎች ልማት ማዕከል ዳታሴቶችን ለመግዛት እንኳን ደህና መጡ።
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                           <div className="flex flex-col items-center gap-2">
                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border shadow-sm">
                               <Lock className="w-3 h-3 text-primary" />
                               <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Content Locked</span>
                             </div>
                             <p className="text-[10px] text-muted-foreground font-bold italic">Buy to unlock full context</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
