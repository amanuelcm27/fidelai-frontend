"use client";

import { Tabs } from "@/components/ui/tabs";
import { AccountSettings } from "@/features/settings/components/account-settings";
import { SecuritySettings } from "@/features/settings/components/security-settings";
import { NotificationSettings } from "@/features/settings/components/notification-settings";
import { AppearanceSettings } from "@/features/settings/components/appearance-settings";
import { User, Shield, Bell, Palette, AlertTriangle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const settingsTabs = [
    {
      id: 'account',
      label: 'Account',
      icon: <User size={16} />,
      content: <AccountSettings />,
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield size={16} />,
      content: <SecuritySettings />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={16} />,
      content: <NotificationSettings />,
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: <Palette size={16} />,
      content: <AppearanceSettings />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account configurations and platform preferences.</p>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        <Tabs 
          tabs={settingsTabs} 
          defaultValue="account"
          className="p-8"
        />
      </div>

      {/* Danger Zone */}
      <div className="bg-destructive/5 rounded-2xl border border-destructive/20 p-8 space-y-6">
        <div className="flex items-center gap-3 text-destructive">
          <AlertTriangle size={20} />
          <h3 className="text-lg font-bold">Danger Zone</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-1">
             <h4 className="text-sm font-bold">Deactivate Account</h4>
             <p className="text-xs text-muted-foreground">Temporarily disable your profile. You can reactivate it anytime by logging back in.</p>
             <button className="mt-4 px-4 py-2 text-xs font-bold border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/10 transition-colors">
               Deactivate
             </button>
           </div>
           
           <div className="space-y-1">
             <h4 className="text-sm font-bold text-destructive">Delete Account</h4>
             <p className="text-xs text-muted-foreground">Permanently remove your account and all associated data. This action is irreversible.</p>
             <button className="mt-4 px-4 py-2 text-xs font-bold bg-destructive text-white rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-destructive/20 flex items-center gap-2">
               <Trash2 size={14} />
               Delete Permanently
             </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
