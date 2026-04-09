"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const accountSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string(),
  language: z.string(),
});

type AccountValues = z.infer<typeof accountSchema>;

export function AccountSettings() {
  const { register, handleSubmit, formState: { isDirty } } = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullName: "Aman Solomon",
      phone: "+251 911 234 567",
      language: "Amharic",
    },
  });

  const onSubmit = (data: AccountValues) => {
    toast.success("Account settings updated");
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b">
        <h3 className="text-lg font-bold">Account Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your basic account information.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input {...register('fullName')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input {...register('phone')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Language</label>
            <select {...register('language')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="Amharic">Amharic</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={!isDirty} className="h-10 px-6 rounded-lg bg-primary text-white font-bold opacity-80 hover:opacity-100 disabled:opacity-50">
          Save Changes
        </button>
      </form>
    </div>
  );
}
