"use client";

import { useOnboarding } from "@/context/onboarding-context";
import { ArrowLeft, CheckCircle2, UploadCloud, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ReadinessTest() {
  const { role, readinessData, setReadinessData, setCurrentStep, markStepComplete } = useOnboarding();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if no role
  useEffect(() => {
    if (!role) {
      router.push("/onboarding/step-1");
    }
  }, [role, router]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    markStepComplete(3);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/onboarding/pending");
    }, 1500);
  };

  const handleBack = () => {
    setCurrentStep(2);
    router.push("/onboarding/step-2");
  };

  if (!role) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Readiness Check</h2>
        <p className="text-muted-foreground">Complete this quick interactive test to verify your setup.</p>
      </div>

      <div className="bg-muted/30 p-6 sm:p-8 rounded-2xl border border-border/50 shadow-sm relative overflow-hidden">
        {/* --- CONTRIBUTOR TEST --- */}
        {role === "contributor" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary" />
              Sample Dataset Upload
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Please simulate a sample file upload. Ensure it matches our required format.</p>
            
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${readinessData.sampleData ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'}`}
                 onClick={() => setReadinessData({ sampleData: "sample_corpus_v1.zip", completed: true })}>
              {readinessData.sampleData ? (
                <div className="flex flex-col items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                  <span className="font-medium">{readinessData.sampleData} selected</span>
                  <span className="text-xs opacity-80">Format verified successfully</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span className="font-medium text-foreground">Click to upload sample format</span>
                  <span className="text-xs">Supports .zip, .json, .csv</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- ANNOTATOR TEST --- */}
        {role === "annotator" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Labeling Example</h3>
            <p className="text-sm text-muted-foreground">Select the correct translation sentiment for the following Amharic phrase.</p>
            
            <div className="p-4 bg-background border border-border rounded-lg text-center text-lg font-amharic font-medium shadow-sm">
              "ይህ በጣም ግሩም ስራ ነው!"
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Negative', color: 'bg-destructive/10 border-destructive text-destructive', active: 'bg-destructive text-white border-destructive' },
                { label: 'Neutral', color: 'bg-muted border-border text-muted-foreground', active: 'bg-primary text-white border-primary' },
                { label: 'Positive', color: 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400', active: 'bg-emerald-500 text-white border-emerald-500' }
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setReadinessData({ labelResult: opt.label, completed: true })}
                  className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                    readinessData.labelResult === opt.label 
                      ? `${opt.active} shadow-lg scale-[1.05]` 
                      : `${opt.color} hover:shadow-md opacity-80 hover:opacity-100`
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- EXPERT TEST --- */}
        {role === "expert" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Adjudication Review</h3>
            <p className="text-sm text-muted-foreground">Two annotators disagreed on this entity extraction. Adjudicate the correct label.</p>
            
            <div className="p-4 bg-background border border-border rounded-lg shadow-sm">
              <span className="text-muted-foreground text-sm">Source Text:</span>
              <p className="font-amharic text-lg font-medium mt-1">አዲስ አበባ ከተማ አስተዳደር</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setReadinessData({ reviewDecision: "LOCATION", completed: true })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  readinessData.reviewDecision === "LOCATION" 
                    ? "bg-emerald-500/10 border-emerald-500" 
                    : "bg-background border-border hover:border-emerald-500/50"
                }`}
              >
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Annotator A</div>
                <div className="font-medium text-emerald-600 flex justify-between items-center">
                  LOCATION (GPE)
                  {readinessData.reviewDecision === "LOCATION" && <Check className="w-4 h-4" />}
                </div>
              </button>
              
              <button
                onClick={() => setReadinessData({ reviewDecision: "ORGANIZATION", completed: true })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  readinessData.reviewDecision === "ORGANIZATION" 
                    ? "bg-emerald-500/10 border-emerald-500" 
                    : "bg-background border-border hover:border-emerald-500/50"
                }`}
              >
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Annotator B</div>
                <div className="font-medium text-emerald-600 flex justify-between items-center">
                  ORGANIZATION (ORG)
                  {readinessData.reviewDecision === "ORGANIZATION" && <Check className="w-4 h-4" />}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* --- BUYER TEST --- */}
        {role === "buyer" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Dataset Requirements</h3>
            <p className="text-sm text-muted-foreground">To help us tailor the marketplace to your needs, please select your primary requirement metric.</p>
            
            <div className="space-y-3">
              {['Volume / Size', 'Quality / Accuracy', 'Domain Specificity', 'Diversity / dialect coverage'].map((req) => (
                <label 
                  key={req} 
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    readinessData.datasetRequirement === req 
                      ? "bg-primary/10 border-primary" 
                      : "bg-background border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <input 
                    type="radio" 
                    name="buyerReq"
                    checked={readinessData.datasetRequirement === req}
                    onChange={() => setReadinessData({ datasetRequirement: req, completed: true })}
                    className="w-4 h-4 text-primary border-border focus:ring-primary bg-background" 
                  />
                  <span className="font-medium text-sm">{req}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 h-11 px-6 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!readinessData.completed || isSubmitting}
          className="flex items-center gap-2 h-12 px-8 rounded-xl brand-gradient-btn font-bold text-white shadow-lg brand-shadow brand-shadow-hover transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:grayscale"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">Submitting...</span>
          ) : (
            <>Complete Setup <CheckCircle2 className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </motion.div>
  );
}
