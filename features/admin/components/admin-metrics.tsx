"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  UserCheck, 
  FileCheck, 
  Database, 
  TrendingUp, 
  Wallet 
} from "lucide-react";

const metrics = [
  { 
    title: "Total Users", 
    value: "1,284", 
    change: "+4.3%", 
    icon: <Users className="h-4 w-4 text-blue-500" />,
    description: "System registered users" 
  },
  { 
    title: "Active Contributors", 
    value: "342", 
    change: "+12.1%", 
    icon: <UserCheck className="h-4 w-4 text-emerald-500" />,
    description: "Valid data providers" 
  },
  { 
    title: "Pending Approvals", 
    value: "28", 
    change: "-5.0%", 
    icon: <FileCheck className="h-4 w-4 text-amber-500" />,
    description: "Tasks in queue" 
  },
  { 
    title: "Published Datasets", 
    value: "156", 
    change: "+8.2%", 
    icon: <Database className="h-4 w-4 text-purple-500" />,
    description: "Live on marketplace" 
  },
  { 
    title: "Total Revenue", 
    value: "ETB 248.5k", 
    change: "+15.4%", 
    icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
    description: "Overall platform volume" 
  },
  { 
    title: "Pending Payouts", 
    value: "ETB 14.2k", 
    change: "+2.1%", 
    icon: <Wallet className="h-4 w-4 text-rose-500" />,
    description: "Funds to be processed" 
  },
];

export function AdminMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tighter">{metric.value}</div>
            <p className="mt-1 text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              <span className={metric.change.startsWith('+') ? "text-emerald-500" : "text-rose-500"}>
                {metric.change}
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
