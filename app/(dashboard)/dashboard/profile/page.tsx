"use client";

import { useAuth } from "@/context/auth-context";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { ProfileInfoForm } from "@/features/profile/components/profile-info-form";
import { RoleInfoSection } from "@/features/profile/components/role-info-section";
import { ActivitySummary } from "@/features/profile/components/activity-summary";
import { DocumentCard } from "@/components/dashboard/document-card";
import { mockUser, mockDocuments, type DashboardUser } from "@/lib/mocks/dashboard";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();
  const displayUser: DashboardUser = user
    ? {
        id: user.id,
        fullName: user.name?.trim() || user.email.split("@")[0] || "User",
        email: user.email,
        phone: mockUser.phone,
        country: mockUser.country,
        language: mockUser.language,
        role: user.role,
        status: "active",
        joinedDate: mockUser.joinedDate,
      }
    : mockUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account information and view your platform identity.</p>
      </div>

      {/* Main Profile Header */}
      <ProfileCard user={displayUser} />

      {/* Stats Summary */}
      <ActivitySummary role={displayUser.role} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <ProfileInfoForm 
            initialData={{
              fullName: displayUser.fullName,
              email: displayUser.email,
              phone: displayUser.phone,
              country: displayUser.country,
              language: displayUser.language,
              experience: "2+ years in linguistics and annotation",
            }} 
          />
          
          {/* Role-Specific Info */}
          <RoleInfoSection role={displayUser.role} />
        </div>

        <div className="space-y-8">
          {/* Documents Section */}
          <div className="bg-card rounded-2xl border p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Documents & Verification</h3>
            <div className="space-y-3">
              {mockDocuments.map((doc) => (
                <DocumentCard key={doc.id} title={doc.title} type={doc.type} date={doc.date} />
              ))}
              {mockDocuments.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-xl">
                   <p className="text-xs text-muted-foreground">No documents uploaded yet.</p>
                </div>
              )}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-primary/30 text-primary text-xs font-bold hover:bg-primary/5 transition-colors">
              + Upload New Document
            </button>
          </div>

          <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6">
            <h4 className="font-bold text-primary mb-2">Need help?</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">If you need to change your registered role or update sensitive account data, please contact our support team.</p>
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              Go to Support &rarr;
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
