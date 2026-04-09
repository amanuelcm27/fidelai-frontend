"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Bell, Briefcase, ShoppingBag, Info, Mail } from "lucide-react";

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailAll: true,
    taskAlerts: true,
    marketplaceAlerts: false,
    systemAnnouncements: true,
    desktopPush: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b">
        <h3 className="text-lg font-bold">Email Notifications</h3>
        <p className="text-sm text-muted-foreground">Manage which emails you want to receive from FidelAI.</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        <NotificationToggle
          icon={Mail}
          title="Global Email Notifications"
          description="Receive all major platform updates via your registered email address."
          checked={settings.emailAll}
          onToggle={() => toggle('emailAll')}
        />
        <NotificationToggle
          icon={Briefcase}
          title="Task & Workspace Alerts"
          description="Get notified when a new task is assigned or your submission is reviewed."
          checked={settings.taskAlerts}
          onToggle={() => toggle('taskAlerts')}
        />
        <NotificationToggle
          icon={ShoppingBag}
          title="Marketplace & Sales"
          description="Receive alerts for dataset purchases, inquiries, and license approvals."
          checked={settings.marketplaceAlerts}
          onToggle={() => toggle('marketplaceAlerts')}
        />
        <NotificationToggle
          icon={Info}
          title="System Announcements"
          description="Stay updated on platform maintenance, security advisories, and new features."
          checked={settings.systemAnnouncements}
          onToggle={() => toggle('systemAnnouncements')}
        />
      </div>

      <div className="pt-8 pb-4 border-b">
        <h3 className="text-lg font-bold">Desktop Notifications</h3>
        <p className="text-sm text-muted-foreground">Manage push notifications in your browser.</p>
      </div>

      <div className="max-w-2xl">
        <NotificationToggle
          icon={Bell}
          title="Push Notifications"
          description="Enable real-time desktop alerts for urgent tasks and platform system events."
          checked={settings.desktopPush}
          onToggle={() => toggle('desktopPush')}
        />
      </div>
    </div>
  );
}

function NotificationToggle({ icon: Icon, title, description, checked, onToggle }: { icon: any, title: string, description: string, checked: boolean, onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/20 transition-all group">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon size={18} />
        </div>
        <div className="space-y-0.5">
          <h5 className="text-sm font-bold">{title}</h5>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
}
