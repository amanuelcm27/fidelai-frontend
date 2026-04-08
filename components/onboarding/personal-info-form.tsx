"use client";

import { useOnboarding, OnboardingRole } from "@/context/onboarding-context";
import { Upload, PenTool, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roles: { id: OnboardingRole; title: string; desc: string; icon: any; color: string; border: string; bg: string; activeBg: string }[] = [
  { 
    id: "contributor", 
    title: "Contributor", 
    desc: "Upload Amharic data & earn", 
    icon: Upload,
    color: "text-primary",
    border: "border-primary",
    bg: "bg-primary/5",
    activeBg: "bg-primary/20"
  },
  { 
    id: "annotator", 
    title: "Annotator", 
    desc: "Label data & get paid", 
    icon: PenTool,
    color: "text-blue-500",
    border: "border-blue-500",
    bg: "bg-blue-500/5",
    activeBg: "bg-blue-500/20"
  },
  { 
    id: "expert", 
    title: "Expert", 
    desc: "Review & ensure quality", 
    icon: ShieldCheck,
    color: "text-emerald-500",
    border: "border-emerald-500",
    bg: "bg-emerald-500/5",
    activeBg: "bg-emerald-500/20"
  },
  { 
    id: "buyer", 
    title: "Buyer", 
    desc: "Purchase top-tier datasets", 
    icon: ShoppingBag,
    color: "text-amber-600",
    border: "border-amber-600",
    bg: "bg-amber-600/5",
    activeBg: "bg-amber-600/20"
  },
];

export function PersonalInfoForm() {
  const { role, setRole, personalDetails, setPersonalDetails, setCurrentStep, markStepComplete } = useOnboarding();
  const router = useRouter();
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!personalDetails.fullName) newErrors.fullName = "Full name is required";
    if (!personalDetails.country) newErrors.country = "Country is required";
    if (!role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      markStepComplete(1);
      setCurrentStep(2);
      router.push("/onboarding/step-2");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Personal Details & Role</h2>
        <p className="text-muted-foreground">Please tell us a bit about yourself and how you plan to use FidelAI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ... existing fields ... */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <input 
            type="text" 
            value={personalDetails.fullName || ""}
            onChange={(e) => setPersonalDetails({ fullName: e.target.value })}
            placeholder="John Doe"
            className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all hover:border-border"
          />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number (Optional)</label>
          <input 
            type="tel" 
            value={personalDetails.phone || ""}
            onChange={(e) => setPersonalDetails({ phone: e.target.value })}
            placeholder="+251 911 234 567"
            className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all hover:border-border"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Country / Region</label>
          <div className="relative">
            <select 
              value={personalDetails.country || ""}
              onChange={(e) => setPersonalDetails({ country: e.target.value })}
              className="flex h-11 w-full rounded-lg border border-input bg-background text-foreground px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all hover:border-border appearance-none w-full"
            >
              <option value="" disabled className="dark:bg-[#0f172a] dark:text-white">Select your country</option>
              <option value="Ethiopia" className="dark:bg-[#0f172a] dark:text-white">Ethiopia</option>
              <option value="United States" className="dark:bg-[#0f172a] dark:text-white">United States</option>
              <option value="United Kingdom" className="dark:bg-[#0f172a] dark:text-white">United Kingdom</option>
              <option value="Kenya" className="dark:bg-[#0f172a] dark:text-white">Kenya</option>
              <option value="Other" className="dark:bg-[#0f172a] dark:text-white">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Native Language</label>
          <div className="relative">
            <select 
              value={personalDetails.language || ""}
              onChange={(e) => setPersonalDetails({ language: e.target.value })}
              className="flex h-11 w-full rounded-lg border border-input bg-background text-foreground px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all hover:border-border appearance-none w-full"
            >
              <option value="" disabled className="dark:bg-[#0f172a] dark:text-white">Select primary language</option>
              <option value="Amharic" className="dark:bg-[#0f172a] dark:text-white">Amharic</option>
              <option value="Oromo" className="dark:bg-[#0f172a] dark:text-white">Oromiffa</option>
              <option value="Tigrinya" className="dark:bg-[#0f172a] dark:text-white">Tigrinya</option>
              <option value="English" className="dark:bg-[#0f172a] dark:text-white">English</option>
              <option value="Other" className="dark:bg-[#0f172a] dark:text-white">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <label className="text-base font-semibold mb-4 block">Select your primary role</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setRole(r.id);
                setErrors({ ...errors, role: "" });
              }}
              className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                role === r.id 
                  ? `${r.border} ${r.activeBg} shadow-lg ring-4 ring-primary/10 scale-[1.02]` 
                  : "border-border/50 bg-background hover:border-border hover:bg-muted/30"
              }`}
            >
              {role === r.id && (
                <div className={`absolute top-0 right-0 w-8 h-8 ${r.border} border-b border-l rounded-bl-xl flex items-center justify-center opacity-20`}>
                   <div className={`w-2 h-2 rounded-full ${r.color.replace('text-', 'bg-')}`} />
                </div>
              )}
              <div className={`p-3 rounded-xl ${role === r.id ? "bg-background shadow-sm" : r.bg} shrink-0 transition-all`}>
                <r.icon className={`w-6 h-6 ${r.color}`} />
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-base mb-1 transition-colors ${role === r.id ? "text-foreground" : "text-foreground/80"}`}>{r.title}</h4>
                <p className={`text-xs transition-colors ${role === r.id ? "text-muted-foreground" : "text-muted-foreground/70"}`}>{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
        {errors.role && <p className="text-xs text-destructive mt-2">{errors.role}</p>}
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 h-12 px-8 rounded-xl brand-gradient-btn font-bold text-white shadow-lg brand-shadow brand-shadow-hover transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
