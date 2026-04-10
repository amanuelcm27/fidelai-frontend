"use client";

import { SubmissionTable } from "@/features/contributor/components/submission-table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui";
import { FileText, Search } from "lucide-react";

export default function ContributorSubmissionsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">My Submissions</h1>
        </div>
        <p className="text-muted-foreground ml-11">
          Review and manage all datasets you have uploaded to the platform.
        </p>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Datasets Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <SubmissionTable />
        </CardContent>
      </Card>
    </div>
  );
}
