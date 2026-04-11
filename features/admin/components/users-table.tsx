"use client";

import { 
  Badge, 
  Button, 
  Select,
} from "@/components/ui";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck,
  ShieldAlert,
  Clock,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar,
  User as UserIcon
} from "lucide-react";
import { mockAdminUsers, AdminUser } from "../data/mock-admin-data";
import { motion } from "framer-motion";

const statusStyles = {
  Active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Suspended: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Deactivated: "bg-muted text-muted-foreground border-border",
};

const verificationStyles = {
  Verified: "text-blue-600 font-bold",
  Unverified: "text-muted-foreground",
  Pending: "text-amber-600 font-bold",
};

export function UsersTable() {
  const paginationPages: Array<number | string> = [1, 2, "...", 50];

  return (
    <div className="border border-border/50 rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-muted/40 text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em]">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Verification</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {mockAdminUsers.map((user, idx) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                       <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-black text-foreground">{user.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold">{user.role}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={`rounded-full px-3 py-0 scale-90 ${statusStyles[user.status]}`}>
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.verificationStatus === 'Verified' ? (
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                    ) : user.verificationStatus === 'Unverified' ? (
                      <ShieldAlert className="h-4 w-4 text-rose-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-500" />
                    )}
                    <span className={`text-xs ${verificationStyles[user.verificationStatus]}`}>
                      {user.verificationStatus}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Calendar className="h-3 w-3 text-primary opacity-50" />
                    {user.joinedDate}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                     </Button>
                     <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                     </Button>
                     <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                        <XCircle className="h-4 w-4 text-rose-500" />
                     </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-border/50 bg-background/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {paginationPages.map((page) => (
            <button
              key={page}
              type="button"
              className={`h-9 min-w-9 rounded-full border px-3 text-xs font-black transition-colors ${
                page === 1
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : page === "..."
                    ? "border-transparent bg-transparent px-1 text-muted-foreground"
                    : "border-border/60 bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              aria-label={typeof page === "number" ? `Go to page ${page}` : "More pages"}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
