"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { UserRole } from "@/lib/mocks/dashboard.ts";
import { CheckCircle2, UploadCloud, ShoppingCart, Activity } from "lucide-react";

interface ActivitySummaryProps {
  role: UserRole;
}

export function ActivitySummary({ role }: ActivitySummaryProps) {
  const commonStats = [
    { title: "Last Login", value: "Today, 10:24 AM", icon: Activity },
    { title: "Account Status", value: "Verified", icon: CheckCircle2 },
  ];

  const roleStats = {
    contributor: [
      { title: "Uploaded Datasets", value: "14", trend: { value: 12, isPositive: true }, icon: UploadCloud },
      { title: "Pending Review", value: "3", icon: Activity },
    ],
    annotator: [
      { title: "Completed Tasks", value: "128", trend: { value: 8, isPositive: true }, icon: CheckCircle2 },
      { title: "Hours Logged", value: "45h", icon: Activity },
    ],
    expert: [
      { title: "Adjudicated Tasks", value: "42", trend: { value: 15, isPositive: true }, icon: CheckCircle2 },
      { title: "Approval Rate", value: "98%", icon: Activity },
    ],
    buyer: [
      { title: "Purchased Datasets", value: "8", trend: { value: 2, isPositive: true }, icon: ShoppingCart },
      { title: "Orders in Progress", value: "1", icon: Activity },
    ],
    admin: [
      { title: "Active Users", value: "1.2k", trend: { value: 5, isPositive: true }, icon: Activity },
      { title: "Support Tickets", value: "24", icon: Activity },
    ],
  };

  const currentRoleStats = roleStats[role] || roleStats.contributor;
  const allStats = [...commonStats, ...currentRoleStats];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {allStats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          className="bg-card/40 backdrop-blur-sm border-primary/10"
        />
      ))}
    </div>
  );
}
