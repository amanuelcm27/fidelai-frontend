"use client";

import { useState } from "react";
import { 
  Button, 
  Input, 
  Select, 
  Checkbox, 
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui";
import { 
  Upload, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  CheckCircle2,
  ArrowLeft,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const domains = [
  "General",
  "Health",
  "Education",
  "Law",
  "Finance",
  "News",
  "Religion",
];

export function DatasetUploadForm() {
  const router = useRouter();
  const [domain, setDomain] = useState("General");
  const [hasConsent, setHasConsent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isSensitiveDomain = ["Health", "Law", "Finance"].includes(domain);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) return;
    
    setIsUploading(true);
    // Mock upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto py-12 text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Upload Successful!</h2>
          <p className="text-muted-foreground">
            Your dataset has been submitted and is now pending AI Quality Control.
            You can track its progress in your submissions.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button onClick={() => router.push("/contributor/submissions")} className="w-full">
            View My Submissions
          </Button>
          <Button variant="outline" onClick={() => setIsSuccess(false)} className="w-full">
            Upload Another Dataset
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/contributor" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <Card className="border-border/50 shadow-xl">
        <CardHeader className="border-b bg-muted/30 pb-6">
          <CardTitle className="text-2xl font-black">Upload New Dataset</CardTitle>
          <p className="text-sm text-muted-foreground">Provide details about your dataset and upload the source files.</p>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Warning Message */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 text-amber-700" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-amber-900">Important System Note</p>
                <p className="text-amber-800/80 leading-relaxed">
                  The platform currently supports high-quality **text-based datasets** only (Amharic). 
                  Audio and image datasets will be available in the Q3 system update.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-tight">Dataset Title</label>
                <Input placeholder="e.g. Amharic News Corpus 2024" className="h-11" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-tight">Domain Category</label>
                <Select 
                  value={domain} 
                  onChange={(e) => setDomain(e.target.value)}
                  className="h-11"
                  required
                >
                  {domains.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold tracking-tight">Specific Sub-domain</label>
              <Input placeholder="e.g. Political Journalism, Medical Reports" className="h-11" />
            </div>

            {/* File Upload Area */}
            <div className="space-y-3">
              <label className="text-sm font-bold tracking-tight">Dataset Source File</label>
              <div className="border-2 border-dashed rounded-2xl p-12 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.docx,.txt,.jpg,.png" required />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                    <Upload className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <p className="text-lg font-bold">Select File to Upload</p>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">
                    Drag and drop your file here. Supported: PDF, TXT, DOCX, JPG (Max 50MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Sensitive Domain Logic */}
            <AnimatePresence>
              {isSensitiveDomain && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/20">
                        <ShieldCheck className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-emerald-900 uppercase tracking-wider">Verification Required</p>
                        <p className="text-xs text-emerald-800/80">Proof of authorization needed for {domain} datasets.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        By uploading to this domain, you must provide valid proof of ownership or authorization under Ethiopian Data Privacy Laws.
                      </p>
                      <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" className="h-11 gap-2 border-emerald-500/30 text-emerald-700 hover:bg-emerald-100">
                          <Plus className="w-4 h-4" />
                          Upload Auth Document
                        </Button>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          Accepted: PDF, JPG, PNG
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Consent Section */}
            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4 shadow-inner">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="consent"
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  required
                  className="mt-1"
                />
                <label 
                  htmlFor="consent" 
                  className="text-sm font-medium leading-relaxed cursor-pointer select-none"
                >
                  I confirm that I have the legal right to share this data and allow it to be used for AI training and marketplace datasets. I understand that fraudulent submissions will result in account termination.
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => router.back()} className="h-12 px-8">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!hasConsent || isUploading}
                className="h-12 px-12 shadow-lg shadow-primary/30"
              >
                {isUploading ? "Uploading Dataset..." : "Submit for Validation"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
