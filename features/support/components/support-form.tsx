"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Mail, MessageSquare, Send } from "lucide-react";

const supportSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  subject: z.string().min(5, "Subject is too short"),
  description: z.string().min(20, "Please provide more details"),
});

type SupportValues = z.infer<typeof supportSchema>;

export function SupportForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SupportValues>({
    resolver: zodResolver(supportSchema)
  });

  const onSubmit = (data: SupportValues) => {
    return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Sending support request:", data);
          toast.success("Support ticket submitted! We'll get back to you soon.");
          reset();
          resolve(true);
        }, 2000);
    });
  };

  return (
    <div className="bg-card rounded-2xl border p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          <MessageSquare size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold">Contact Support</h3>
          <p className="text-xs text-muted-foreground">Submit a ticket and our team will get back to you within 24 hours.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-loose">Category</label>
            <select
              {...register('category')}
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none hover:border-border"
            >
              <option value="">Select a category</option>
              <option value="account">Account & Authentication</option>
              <option value="dataset">Dataset Upload / Review</option>
              <option value="payment">Payment & Earnings</option>
              <option value="technical">Technical Bug / Issue</option>
            </select>
            {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-loose">Subject</label>
            <input
              {...register('subject')}
              placeholder="Briefly describe the issue"
              className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary hover:border-border"
            />
            {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-loose">Description</label>
            <textarea
              {...register('description')}
              rows={5}
              placeholder="Tell us exactly what happened. Include any error messages."
              className="flex w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary hover:border-border resize-none"
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:grayscale"
        >
          {isSubmitting ? (
             <>
               <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               Sending...
             </>
          ) : (
            <>
               Submit Request
               <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
