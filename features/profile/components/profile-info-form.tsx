"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const profileSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  language: z.string().min(1, "Language is required"),
  experience: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileInfoFormProps {
  initialData: ProfileFormValues;
}

export function ProfileInfoForm({ initialData }: ProfileInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Saving profile:", data);
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-2xl border p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold">Personal Information</h3>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm font-bold text-primary hover:underline"
          >
            Edit Info
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
            <input
              {...register('fullName')}
              disabled={!isEditing}
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70 disabled:bg-muted/50"
            />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
            <input
              {...register('email')}
              disabled={!isEditing}
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70 disabled:bg-muted/50"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone Number</label>
            <input
              {...register('phone')}
              disabled={!isEditing}
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70 disabled:bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Country</label>
            <input
              {...register('country')}
              disabled={!isEditing}
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70 disabled:bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Primary Language</label>
            <input
              {...register('language')}
              disabled={!isEditing}
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70 disabled:bg-muted/50"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="h-11 px-6 rounded-xl border text-sm font-bold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty}
              className="h-11 px-6 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
