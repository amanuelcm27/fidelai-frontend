"use client";

import { cn } from '@/lib/utils';

interface AnnotationPanelProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnnotationPanel({ className, children }: AnnotationPanelProps) {
  return (
    <div className={cn('flex h-full flex-col rounded-xl border bg-card', className)}>
      <div className="border-b p-4">
        <h3 className="font-semibold">Annotation Panel</h3>
        <p className="text-xs text-muted-foreground">Select and label text chunks</p>
      </div>
      <div className="flex-1 p-4">
        {children || <p className="text-sm text-muted-foreground">No content loaded.</p>}
      </div>
    </div>
  );
}

export function DatasetPanel({ className, children }: AnnotationPanelProps) {
  return (
    <div className={cn('flex h-full flex-col rounded-xl border bg-card', className)}>
      <div className="border-b p-4">
        <h3 className="font-semibold">Dataset Panel</h3>
        <p className="text-xs text-muted-foreground">View dataset content and metadata</p>
      </div>
      <div className="flex-1 p-4">
        {children || <p className="text-sm text-muted-foreground">No dataset selected.</p>}
      </div>
    </div>
  );
}

export function ReviewPanel({ className, children }: AnnotationPanelProps) {
  return (
    <div className={cn('flex h-full flex-col rounded-xl border bg-card', className)}>
      <div className="border-b p-4">
        <h3 className="font-semibold">Review Panel</h3>
        <p className="text-xs text-muted-foreground">Review and adjudicate annotations</p>
      </div>
      <div className="flex-1 p-4">
        {children || <p className="text-sm text-muted-foreground">No review items.</p>}
      </div>
    </div>
  );
}
