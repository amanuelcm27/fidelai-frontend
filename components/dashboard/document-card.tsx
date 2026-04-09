"use client";

import { FileText, Download } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  type: string;
  date: string;
}

export function DocumentCard({ title, type, date }: DocumentCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors group">
      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <FileText size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate">{title}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{type}</span>
          <span className="text-muted-foreground opacity-30">•</span>
          <span className="text-xs text-muted-foreground">Uploaded {date}</span>
        </div>
      </div>
      <button className="h-9 w-9 rounded-lg border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all">
        <Download size={16} />
      </button>
    </div>
  );
}
