"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Shield, Key, History, LogOut } from 'lucide-react';
import { useState } from 'react';

const passwordSchema = z.object({
  current: z.string().min(1, "Required"),
  newPassword: z.string().min(8, "Must be at least 8 characters"),
  confirm: z.string()
}).refine(data => data.newPassword === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"]
});

export function SecuritySettings() {
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(passwordSchema)
  });

  const onSubmit = (data: any) => {
    toast.success("Password updated successfully");
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="pb-4 border-b">
          <h3 className="text-lg font-bold">Change Password</h3>
          <p className="text-sm text-muted-foreground">Keep your account secure by updating your password regularly.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <input type="password" {...register('current')} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm" />
            {errors.current && <p className="text-xs text-destructive">{errors.current.message as string}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <input type="password" {...register('newPassword')} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm" />
            {errors.newPassword && <p className="text-xs text-destructive">{errors.newPassword.message as string}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <input type="password" {...register('confirm')} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm" />
            {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message as string}</p>}
          </div>
          <button type="submit" className="h-10 px-6 rounded-lg bg-primary text-white font-bold hover:scale-105 active:scale-95 transition-all">
            Update Password
          </button>
        </form>
      </section>

      <section className="space-y-6 p-6 rounded-2xl border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-background border shadow-sm text-primary">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="font-bold">Two-Factor Authentication</h4>
              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <Switch checked={tfaEnabled} onCheckedChange={setTfaEnabled} />
        </div>
      </section>

      <section className="space-y-6">
        <div className="pb-4 border-b">
          <h3 className="text-lg font-bold">Active Sessions</h3>
          <p className="text-sm text-muted-foreground">Manage devices currently logged into your account.</p>
        </div>

        <div className="space-y-3">
          {[
            { device: "MacBook Pro - Chrome", location: "Addis Ababa, Ethiopia", status: "Current", time: "Now" },
            { device: "iPhone 15 - Safari", location: "Addis Ababa, Ethiopia", status: "Active", time: "3 hours ago" }
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                   <Key size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-bold">{session.device}</h5>
                  <p className="text-[10px] text-muted-foreground">{session.location} • {session.time}</p>
                </div>
              </div>
              {session.status === 'Current' ? (
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded">Current</span>
              ) : (
                <button className="text-[10px] font-bold text-destructive uppercase tracking-widest hover:underline">Revoke</button>
              )}
            </div>
          ))}
        </div>
        
        <button className="flex items-center gap-2 text-xs font-bold text-destructive hover:underline mt-4">
          <LogOut size={14} />
          Logout from all other devices
        </button>
      </section>
    </div>
  );
}
