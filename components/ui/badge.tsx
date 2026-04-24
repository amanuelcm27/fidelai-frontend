import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info' | 'ghost';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background text-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    success: 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/20',
    warning: 'bg-amber-500/15 text-amber-600 border border-amber-500/20',
    info: 'bg-blue-500/15 text-blue-600 border border-blue-500/20',
    ghost: 'border border-transparent bg-muted/50 text-foreground hover:bg-muted',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
