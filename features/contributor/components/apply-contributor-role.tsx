"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  Button, 
  Badge 
} from "@/components/ui";
import { 
  ClipboardCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  XCircle
} from "lucide-react";
import { useState } from "react";

export function ApplyContributorRole() {
  const [status, setStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('approved');

  const renderStatus = () => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center animate-pulse">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Application Under Review</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Our experts are reviewing your profile. This usually takes 24-48 hours.
              </p>
            </div>
            <Badge variant="warning" className="px-4 py-1">Pending Approval</Badge>
          </div>
        );
      case 'approved':
        return (
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Contributor Account Active</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Congratulations! You are now a verified contributor. You can start uploading datasets.
              </p>
            </div>
            <Badge variant="success" className="px-4 py-1">Verified Contributor</Badge>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Application Rejected</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Unfortunately, your application didn&apos;t meet our current requirements. You can re-apply in 30 days.
              </p>
            </div>
            <Button variant="outline" size="sm">View Feedback</Button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Become a Contributor</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Upload Amharic data and earn revenue. Complete your profile and submit your application today.
              </p>
            </div>
            <Button onClick={() => setStatus('pending')} className="w-full">
              Apply Now
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Account Status</CardTitle>
      </CardHeader>
      <CardContent>
        {renderStatus()}
      </CardContent>
    </Card>
  );
}
