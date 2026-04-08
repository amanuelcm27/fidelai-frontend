"use client";

import { useOnboarding } from "@/context/onboarding-context";
import { ArrowLeft, ArrowRight, ShieldCheck, UploadCloud, X, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function ComplianceForm() {
  const { role, compliance, setCompliance, setCurrentStep, markStepComplete } = useOnboarding();
  const router = useRouter();
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // States for specific verifications
  const [quiz1Answer, setQuiz1Answer] = useState("");
  const [quiz2Answer, setQuiz2Answer] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const contributorAgreements = [
    { key: "dataOwnership", label: "I confirm that the dataset belongs to me or I have permission to share it." },
    { key: "copyright", label: "No copyrighted or restricted content." },
    { key: "privacy", label: "No personal sensitive data (PII)." },
    { key: "liability", label: "I agree that the platform is not responsible for the misuse of uploaded data." },
    { key: "aiUsage", label: "I agree the platform can process and sell datasets." }
  ];

  // Redirect if no role
  useEffect(() => {
    if (!role) {
      router.push("/onboarding/step-1");
    }
  }, [role, router]);

  const handleNext = () => {
    setError("");

    if (role === "contributor") {
      const allAgreed = contributorAgreements.every(a => (compliance as any)[a.key]);
      if (!allAgreed) {
        setError("You must accept all required agreements to continue.");
        return;
      }
    }

    if (role === "annotator") {
      if (quiz1Answer !== "meaningA") { // Mock proper answer
        setError("Quiz 1 answer is incorrect. Please read the sentence carefully.");
        return;
      }
      if (quiz2Answer !== "education") {
        setError("Quiz 2 answer is incorrect. Please assess the text domain again.");
        return;
      }
      if (!compliance.annotationExperience || !compliance.availability) {
        setError("Please fill out your experience and availability.");
        return;
      }
    }

    if (role === "expert") {
      if (!uploadedFileName) {
        setError("Please upload your certification or proof of expertise.");
        return;
      }
      if (!compliance.researchBackground || !compliance.yearsOfExperience) {
        setError("Research background and years of experience are required.");
        return;
      }
      if (!(compliance as any).expertAgreement) {
         setError("You must agree to the platform quality guidelines.");
         return;
      }
    }

    if (role === "buyer") {
      if (!compliance.organization || !compliance.useCase) {
        setError("Organization name and use case are required.");
        return;
      }
    }
    
    markStepComplete(2);
    setCurrentStep(3);
    router.push("/onboarding/step-3");
  };

  const handleBack = () => {
    setCurrentStep(1);
    router.push("/onboarding/step-1");
  };

  // Expert file upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
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
        <h2 className="text-2xl font-bold tracking-tight mb-2">Role Qualification and Compliance</h2>
        <p className="text-muted-foreground">Please provide necessary verification and compliance data to proceed.</p>
      </div>

      <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
        
        {/* === CONTRIBUTOR === */}
        {role === "contributor" && (
          <div className="space-y-6">
            <div className="bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 p-4 rounded-lg text-sm">
              <strong className="block mb-1">Notice:</strong> Currently the platform supports only Amharic Text Datasets.
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">What type of data will you upload?</label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 bg-background border border-orange-500 placeholder:text-orange-600 px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm">
                  <input type="checkbox" className="text-orange-600 focus:ring-orange-500" checked disabled />
                  <span className="text-sm font-medium">Text</span>
                </label>
                {["Audio", "Image", "Video"].map(type => (
                  <div key={type} className="flex items-center gap-2 bg-muted border border-border/50 px-4 py-2 rounded-lg cursor-not-allowed opacity-60">
                    <input type="checkbox" disabled />
                    <span className="text-sm">{type}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Coming soon</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 space-y-4">
               <label className="text-sm font-semibold">Agreements & Legal Requirements (Required)</label>
               {contributorAgreements.map(({ key, label }) => (
                 <label key={key} className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={(compliance as any)[key] || false}
                    onChange={(e) => {
                      setCompliance({ [key]: e.target.checked });
                      setError("");
                    }}
                    className="mt-1 h-4 w-4 rounded border-border text-orange-600 focus:ring-orange-500 shrink-0"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                    {label}
                  </span>
                </label>
               ))}
            </div>
          </div>
        )}

        {/* === ANNOTATOR === */}
        {role === "annotator" && (
          <div className="space-y-8">
            <div className="space-y-4 pt-2">
              <h3 className="font-semibold text-foreground border-b pb-2">Amharic Proficiency Quizzes</h3>
              
              <div className="space-y-3 bg-background p-5 rounded-xl border border-border shadow-sm">
                <p className="text-sm font-medium">Quiz 1: Choose the correct meaning for the sentence below.</p>
                <p className="font-amharic text-lg font-bold text-orange-600 dark:text-orange-400">"ትምህርት ለሀገር እድገት መሰረት ነው።"</p>
                <div className="space-y-2 mt-2">
                  {[
                    { id: "meaningB", text: "Agriculture is key to development." },
                    { id: "meaningA", text: "Education is the foundation for a country's development." },
                    { id: "meaningC", text: "Health is the foundation of a country." }
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${quiz1Answer === opt.id ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-500/50"}`}>
                      <input type="radio" name="quiz1" value={opt.id} checked={quiz1Answer === opt.id} onChange={(e) => { setQuiz1Answer(e.target.value); setError(""); }} className="text-orange-600 focus:ring-orange-500 border-border bg-background" />
                      <span className="text-sm">{opt.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3 bg-background p-5 rounded-xl border border-border shadow-sm">
                <p className="text-sm font-medium">Quiz 2: Classify the domain of the following text.</p>
                <p className="font-amharic text-lg font-bold text-orange-600 dark:text-orange-400">"ተማሪዎች በፈተና ወቅት ጠንክረው ማንበብ አለባቸው።"</p>
                <div className="space-y-2 mt-2">
                  {[
                    { id: "politics", text: "Politics" },
                    { id: "religion", text: "Religion" },
                    { id: "education", text: "Education" },
                    { id: "news", text: "News" }
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${quiz2Answer === opt.id ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-500/50"}`}>
                      <input type="radio" name="quiz2" value={opt.id} checked={quiz2Answer === opt.id} onChange={(e) => { setQuiz2Answer(e.target.value); setError(""); }} className="text-orange-600 focus:ring-orange-500 border-border bg-background" />
                      <span className="text-sm">{opt.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Annotation Experience</label>
                <select 
                  value={compliance.annotationExperience || ""}
                  onChange={(e) => setCompliance({ annotationExperience: e.target.value })}
                  className="flex h-11 w-full rounded-lg border border-input bg-background text-foreground px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <option value="" disabled className="dark:bg-[#0f172a] dark:text-white">Select experience level</option>
                  <option value="Beginner" className="dark:bg-[#0f172a] dark:text-white">Beginner</option>
                  <option value="Intermediate" className="dark:bg-[#0f172a] dark:text-white">Intermediate</option>
                  <option value="Advanced" className="dark:bg-[#0f172a] dark:text-white">Advanced</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Availability (Hours/Week)</label>
                <select 
                  value={compliance.availability || ""}
                  onChange={(e) => setCompliance({ availability: e.target.value })}
                  className="flex h-11 w-full rounded-lg border border-input bg-background text-foreground px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <option value="" disabled className="dark:bg-[#0f172a] dark:text-white">Select availability</option>
                  <option value="0-10" className="dark:bg-[#0f172a] dark:text-white">0 - 10 hours</option>
                  <option value="10-20" className="dark:bg-[#0f172a] dark:text-white">10 - 20 hours</option>
                  <option value="20-40" className="dark:bg-[#0f172a] dark:text-white">20 - 40 hours</option>
                  <option value="40+" className="dark:bg-[#0f172a] dark:text-white">40+ hours</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Preferred Domain (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g., Medical, Legal, Conversational"
                  value={(compliance.domainExpertise || []).join(", ")}
                  onChange={(e) => setCompliance({ domainExpertise: e.target.value.split(",").map(s => s.trim()) })}
                  className="flex h-11 w-full rounded-lg border border-input bg-background text-foreground px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* === EXPERT === */}
        {role === "expert" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Certification or Proof</label>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors relative ${isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-border hover:border-orange-500/50 hover:bg-orange-500/5'} cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.doc,.docx,image/*" />
                {uploadedFileName ? (
                  <div className="flex flex-col items-center gap-2 text-primary">
                    <CheckCircle2 className="w-8 h-8" />
                    <span className="font-medium text-foreground">{uploadedFileName}</span>
                    <button onClick={(e) => { e.stopPropagation(); setUploadedFileName(""); }} className="text-xs text-destructive hover:underline mt-1 flex items-center"><X className="w-3 h-3 mr-1"/> Remove</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span className="font-medium text-foreground">Click or Drag & Drop to upload</span>
                    <span className="text-xs">Accepted: PDF, DOC, Image (Max 5MB)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Research Background</label>
                <textarea 
                  placeholder="Summarize your academic or professional background..."
                  value={compliance.researchBackground || ""}
                  onChange={(e) => setCompliance({ researchBackground: e.target.value })}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 min-h-[80px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Years of Experience</label>
                <input 
                  type="number" 
                  placeholder="e.g., 5"
                  value={compliance.yearsOfExperience || ""}
                  onChange={(e) => setCompliance({ yearsOfExperience: e.target.value })}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Institution / Company</label>
                <input 
                  type="text" 
                  placeholder="Current affiliation"
                  value={(compliance as any).institution || ""}
                  onChange={(e) => setCompliance({ institution: e.target.value } as any)}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Domain Specialization</label>
                <input 
                  type="text" 
                  placeholder="NLP, Linguistics, specific Amharic dialects..."
                  value={(compliance.domainSpecialization || []).join(", ")}
                  onChange={(e) => setCompliance({ domainSpecialization: e.target.value.split(",").map(s => s.trim()) })}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2 border-t border-border/50 pt-4 mt-2">
                 <label className="text-sm font-semibold mb-2 block">Links (Optional)</label>
                 <div className="space-y-3">
                   <div className="flex gap-3">
                     <span className="inline-flex items-center justify-center w-24 text-xs font-medium bg-muted rounded-lg border border-border">Google Scholar</span>
                     <input type="url" placeholder="https://" value={(compliance as any).scholarLink || ""} onChange={(e) => setCompliance({ scholarLink: e.target.value } as any)} className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm focus-[...]" />
                   </div>
                   <div className="flex gap-3">
                     <span className="inline-flex items-center justify-center w-24 text-xs font-medium bg-muted rounded-lg border border-border">LinkedIn</span>
                     <input type="url" placeholder="https://" value={(compliance as any).linkedinLink || ""} onChange={(e) => setCompliance({ linkedinLink: e.target.value } as any)} className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm focus-[...]" />
                   </div>
                   <div className="flex gap-3">
                     <span className="inline-flex items-center justify-center w-24 text-xs font-medium bg-muted rounded-lg border border-border">ResearchGate</span>
                     <input type="url" placeholder="https://" value={(compliance as any).researchGateLink || ""} onChange={(e) => setCompliance({ researchGateLink: e.target.value } as any)} className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm focus-[...]" />
                   </div>
                 </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={(compliance as any).expertAgreement || false}
                  onChange={(e) => setCompliance({ expertAgreement: e.target.checked } as any)}
                  className="mt-1 h-4 w-4 rounded border-border text-orange-600 focus:ring-orange-500 shrink-0 bg-background"
                />
                <span className="text-sm font-medium group-hover:text-foreground transition-colors leading-snug">
                  I confirm that my review decisions will follow platform quality and ethics guidelines.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* === BUYER === */}
        {role === "buyer" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization Name</label>
                <input 
                  type="text" 
                  placeholder="Company Name"
                  value={compliance.organization || ""}
                  onChange={(e) => setCompliance({ organization: e.target.value })}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <input 
                  type="text" 
                  placeholder="e.g., Healthcare, AI Research"
                  value={compliance.industry || ""}
                  onChange={(e) => setCompliance({ industry: e.target.value })}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Dataset Purpose</label>
              <textarea 
                placeholder="Briefly describe the purpose of the required datasets..."
                value={(compliance as any).datasetPurpose || ""}
                onChange={(e) => setCompliance({ datasetPurpose: e.target.value } as any)}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 min-h-[60px] resize-y"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Use Case</label>
              <textarea 
                placeholder="How do you plan to use the Amharic datasets?"
                value={compliance.useCase || ""}
                onChange={(e) => setCompliance({ useCase: e.target.value })}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 min-h-[60px] resize-y"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl flex items-start gap-3 border border-destructive/20 shadow-sm animate-in fade-in slide-in-from-top-1">
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 h-11 px-6 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
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
