import { DatasetApprovalQueue } from "@/features/admin/components/dataset-approval-queue";
import { PayoutManagement } from "@/features/admin/components/payout-management";
import { AuditLog } from "@/features/admin/components/audit-log";
import { Settings, HeartPulse, History, Wallet } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";

export default function AdminSystemPage() {
  const adminSystemTabs = [
    {
      id: "approvals",
      label: "Marketplace Queue",
      content: (
        <div className="space-y-6 pt-6">
           <div className="space-y-1">
              <h2 className="text-2xl font-black flex items-center gap-2">
                 <HeartPulse className="h-6 w-6 text-primary" />
                 Quality Control
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Review and authorize datasets before they go live on the global marketplace.</p>
           </div>
           <DatasetApprovalQueue />
        </div>
      )
    },
    {
      id: "payouts",
      label: "Financial & Commission",
      content: (
        <div className="space-y-6 pt-6">
           <div className="space-y-1">
              <h2 className="text-2xl font-black flex items-center gap-2">
                 <Wallet className="h-6 w-6 text-primary" />
                 Treasury Management
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Manage payouts, set platform commission rates, and monitor financial health.</p>
           </div>
           <PayoutManagement />
        </div>
      )
    },
    {
      id: "audit",
      label: "Security Audit Logs",
      content: (
        <div className="space-y-6 pt-6">
           <div className="space-y-1">
              <h2 className="text-2xl font-black flex items-center gap-2">
                 <History className="h-6 w-6 text-primary" />
                 System Integrity
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Immutable record of all administrative actions and system events.</p>
           </div>
           <AuditLog />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter">System Administration</h1>
        <p className="text-muted-foreground text-lg">Platform configuration, quality assurance, and financial governance.</p>
      </header>

      <Tabs tabs={adminSystemTabs} />
    </div>
  );
}
