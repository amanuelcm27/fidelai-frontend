"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { LogOut, CheckCircle2, ChevronRight, ChevronLeft, XCircle, Info, Flag } from "lucide-react";
import { mockTaskChunks, taskQueue } from "@/features/annotator/data/mock";
import { motion, AnimatePresence } from "framer-motion";

interface WorkspaceProps {
  taskId: string;
}

type ChunkStatus = "answered" | "skipped" | "flagged" | "unvisited";

interface Answer {
  domainMatch: string | null;
  isAmharic: boolean | null;
  readability: string;
  harmful: boolean | null;
  confidence: string | null;
  note: string;
  status: ChunkStatus;
}

export function AnnotatorWorkspace({ taskId }: WorkspaceProps) {
  const router = useRouter();

  const taskDetails = taskQueue.find((t) => t.id === taskId) || {
    id: taskId,
    domain: "Unknown",
    chunks: 0,
  };

  const chunks = mockTaskChunks[taskId] || mockTaskChunks["default"];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Array of answers maintaining state across all chunks
  const [answers, setAnswers] = useState<Answer[]>(() => 
    Array(chunks.length).fill({
      domainMatch: null,
      isAmharic: null,
      readability: "High",
      harmful: null,
      confidence: null,
      note: "",
      status: "unvisited" as ChunkStatus
    })
  );

  // Form State controlled by the currently viewed chunk
  const [domainMatch, setDomainMatch] = useState<string | null>(null);
  const [isAmharic, setIsAmharic] = useState<boolean | null>(null);
  const [readability, setReadability] = useState("High");
  const [isHarmful, setIsHarmful] = useState<boolean | null>(null);
  const [confidence, setConfidence] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const currentChunk = chunks[currentIndex];
  const progressPercent = ((currentIndex) / chunks.length) * 100;

  // Sync form state when currentIndex changes
  useEffect(() => {
    const savedAnswer = answers[currentIndex];
    setDomainMatch(savedAnswer.domainMatch);
    setIsAmharic(savedAnswer.isAmharic);
    setReadability(savedAnswer.readability);
    setIsHarmful(savedAnswer.harmful);
    setConfidence(savedAnswer.confidence);
    setNotes(savedAnswer.note);
  }, [currentIndex, answers]);

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "TEXTAREA") return;
      
      switch (e.key) {
        case "1": setDomainMatch("Match"); break;
        case "2": setDomainMatch("Not Match"); break;
        case "3": setDomainMatch("Uncertain"); break;
        case "Enter":
          e.preventDefault();
          handleSubmit("answered");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [domainMatch, confidence, isAmharic, readability, isHarmful, notes, currentIndex, isComplete]); 


  const saveCurrentState = (status: ChunkStatus) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = {
      domainMatch,
      isAmharic,
      readability,
      harmful: isHarmful,
      confidence,
      note: notes,
      status
    };
    setAnswers(newAnswers);
  };

  const handleNextPhase = () => {
    if (currentIndex < chunks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleSubmit = (status: ChunkStatus) => {
    if (isComplete) return;
    saveCurrentState(status);
    handleNextPhase();
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      saveCurrentState("unvisited"); // Wait, don't overwrite if they just hit back without changing? Actually, preserve whatever they typed so far if they go back. The safe assumption is treating it as unvisited or leaving it as previous unless submitted. We will just save what they have typed but keep status as unvisited so it doesn't count as answered yet.
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleExit = () => {
    router.push("/annotator/tasks");
  };

  if (!currentChunk && !isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-black">Task not found</h2>
        <Button onClick={handleExit}>Return to Tasks</Button>
      </div>
    );
  }

  // Completion calculation
  const answeredCount = answers.filter(a => a.status === "answered").length;
  const skippedCount = answers.filter(a => a.status === "skipped").length;
  const flaggedCount = answers.filter(a => a.status === "flagged").length;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] w-full overflow-hidden">
      {/* ─── Top Bar ─── */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               <h2 className="text-xl font-black tracking-tight">{taskDetails.id}</h2>
               <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                 {taskDetails.domain}
               </span>
            </div>
            <div className="flex items-center gap-3">
               <p className="text-xs font-bold text-muted-foreground w-12 mr-1">
                 {currentIndex + 1} / {chunks.length}
               </p>
               <Progress value={progressPercent} className="w-32 h-1.5" />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-muted/40 p-1.5 rounded-lg border border-border/50 mr-auto ml-10">
           {answers.map((ans, idx) => {
             let icon = <span className="w-3 h-3 block" />;
             if (ans.status === "answered") icon = <CheckCircle2 className="w-3 h-3 text-emerald-500" />;
             if (ans.status === "flagged") icon = <Flag className="w-3 h-3 text-amber-500" />;
             if (ans.status === "skipped") icon = <span className="w-3 h-3 flex items-center justify-center text-muted-foreground font-bold text-[8px]">-</span>;
             
             return (
                <div 
                  key={idx} 
                  className={`w-5 h-5 flex items-center justify-center text-xs rounded-sm border ${idx === currentIndex ? 'border-primary bg-primary/10' : 'border-transparent bg-background'}`}
                >
                  {icon}
                </div>
             );
           })}
        </div>

        <Button variant="outline" onClick={handleExit} className="gap-2 text-muted-foreground hover:text-foreground">
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Exit</span>
        </Button>
      </div>

      {/* ─── Main Content Split ─── */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden gap-6 lg:gap-10 pt-6">
        
        {/* Left Panel: Text Viewer */}
        <div className="flex-1 flex flex-col min-h-[250px] overflow-hidden">
          <div className="mb-4 shrink-0 px-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
              Source Text Chunk
            </h3>
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
               <Info className="w-3.5 h-3.5 text-primary" />
               Review this text and validate its quality and classification. You are validating contributor-submitted data.
            </p>
          </div>
          <Card className="flex-1 border-border/50 bg-card/60 backdrop-blur-sm overflow-auto shadow-sm">
            <CardContent className="p-8 h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={currentChunk?.id}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.98 }}
                   transition={{ duration: 0.15 }}
                 >
                   <p className="text-2xl md:text-3xl font-medium leading-relaxed tracking-tight text-foreground/90 pb-8 text-center" style={{ lineHeight: '1.8' }}>
                     {currentChunk?.text}
                   </p>
                 </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Annotation Controls */}
        <div className="w-full lg:w-[450px] shrink-0 flex flex-col overflow-auto h-full px-1 no-scrollbar">
           <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 shrink-0">
            Validation Criteria
          </h3>
          
          <div className="space-y-7 flex-1 pb-6">
             {/* Section 1: Domain Match */}
             <div className="space-y-3">
               <label className="text-sm font-bold text-foreground">Does this text match its assigned domain?</label>
               <div className="grid grid-cols-3 gap-2">
                 {['Match', 'Not Match', 'Uncertain'].map((opt, i) => (
                   <button
                     key={opt}
                     onClick={() => setDomainMatch(opt)}
                     className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all ${
                       domainMatch === opt 
                         ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]' 
                         : 'bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                     }`}
                   >
                     {opt} <span className="opacity-40 ml-1 font-normal">[{i+1}]</span>
                   </button>
                 ))}
               </div>
             </div>

             <hr className="border-border/50" />

             {/* Section 2: Language Check */}
             <div className="space-y-3">
               <label className="text-sm font-bold text-foreground">Is this text written in Amharic?</label>
               <div className="flex gap-2">
                 <button
                   onClick={() => setIsAmharic(true)}
                   className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                     isAmharic === true 
                       ? 'bg-primary border-primary text-white shadow-md scale-[1.02]' 
                       : 'bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                   }`}
                 >
                   Yes, Amharic
                 </button>
                 <button
                   onClick={() => setIsAmharic(false)}
                   className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                     isAmharic === false 
                       ? 'bg-rose-500 border-rose-500 text-white shadow-md scale-[1.02]' 
                       : 'bg-card border-border hover:border-rose-500/50 text-muted-foreground hover:text-foreground'
                   }`}
                 >
                   No, not Amharic
                 </button>
               </div>
             </div>

             <hr className="border-border/50" />

             {/* Section 3: Readability */}
             <div className="space-y-3">
               <label className="text-sm font-bold text-foreground">How readable is this text?</label>
               <Select 
                 value={readability}
                 onChange={(e) => setReadability(e.target.value)}
                 className="rounded-xl border-border/50 bg-card/60 h-11 text-sm font-medium"
               >
                  <option value="High">High (Clear and natural)</option>
                  <option value="Medium">Medium (Understandable but awkward)</option>
                  <option value="Low">Low (Confusing or broken)</option>
               </Select>
             </div>

             <hr className="border-border/50" />

             {/* Section 4: Harmful Content */}
             <div className="space-y-3">
               <label className="text-sm font-bold text-foreground">
                 Does this text contain harmful, offensive, or unsafe content?
               </label>
               <div className="flex gap-2">
                 <button
                   onClick={() => setIsHarmful(true)}
                   className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                     isHarmful === true 
                       ? 'bg-rose-500 border-rose-500 text-white shadow-md scale-[1.02]' 
                       : 'bg-card border-border hover:border-rose-500/50 text-muted-foreground hover:text-foreground'
                   }`}
                 >
                   Yes, unsafe
                 </button>
                 <button
                   onClick={() => setIsHarmful(false)}
                   className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                     isHarmful === false 
                       ? 'bg-emerald-500 border-emerald-500 text-white shadow-md scale-[1.02]' 
                       : 'bg-card border-border hover:border-emerald-500/50 text-muted-foreground hover:text-foreground'
                   }`}
                 >
                   No, safe
                 </button>
               </div>
             </div>

             <hr className="border-border/50" />

             {/* Section 5: Confidence */}
             <div className="space-y-3">
               <label className="text-sm font-bold text-foreground">How confident are you in your evaluation?</label>
               <div className="flex gap-2">
                 {['High', 'Medium', 'Low'].map((opt) => (
                   <button
                     key={opt}
                     onClick={() => setConfidence(opt)}
                     className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                       confidence === opt 
                         ? 'bg-primary border-primary text-white shadow-md scale-[1.02]' 
                         : 'bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                     }`}
                   >
                     {opt}
                   </button>
                 ))}
               </div>
             </div>

             <hr className="border-border/50" />

             {/* Section 6: Notes */}
             <div className="space-y-2 pb-2">
               <label className="text-sm font-bold text-muted-foreground flex justify-between">
                 <span>Notes</span>
                 <span className="opacity-50 text-xs">Optional comment field</span>
               </label>
               <textarea
                 value={notes}
                 onChange={(e) => setNotes(e.target.value)}
                 placeholder="Type any context or ambiguity here..."
                 className="w-full h-24 rounded-xl border border-border/50 bg-card/60 p-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
               />
             </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-border/50 space-y-3 shrink-0 bg-background sticky bottom-0">
             <div className="flex gap-2">
               <Button 
                 variant="outline" 
                 className="h-12 px-4 shadow-sm text-foreground bg-card hover:bg-muted/60"
                 onClick={handleBack}
                 disabled={currentIndex === 0}
                 title="Go back to previous chunk"
               >
                 <ChevronLeft className="w-4 h-4 mr-1 lg:mr-0" /> <span className="hidden lg:inline">Back</span>
               </Button>
               <Button 
                 className="flex-1 h-12 text-sm font-black gap-2 shadow-lg shadow-primary/20 group transition-all"
                 onClick={() => handleSubmit("answered")}
                 disabled={!domainMatch || !confidence || isAmharic === null || isHarmful === null}
               >
                 Submit & Next <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Button>
             </div>

             <div className="flex gap-2">
               <Button variant="outline" className="flex-1 h-10 text-xs font-bold text-muted-foreground hover:bg-muted/50" onClick={() => handleSubmit("skipped")}>
                 <XCircle className="w-3.5 h-3.5 mr-1.5" /> Skip
               </Button>
               <Button variant="outline" className="flex-1 h-10 text-xs font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 border-amber-500/20" onClick={() => handleSubmit("flagged")}>
                 <Flag className="w-3.5 h-3.5 mr-1.5" /> Flag Review
               </Button>
             </div>
          </div>
        </div>

      </div>

      {/* Auto Completion Modal */}
      <Modal isOpen={isComplete} onClose={handleExit} className="max-w-md text-center p-8">
         <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
         </div>
         <h2 className="text-3xl font-black mb-2">Task Completed 🎉</h2>
         <p className="text-muted-foreground mb-8 text-sm">
           Great work! Your annotations have been saved and sent for consensus tracking.
         </p>

         <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl border bg-card text-center col-span-2">
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Chunks</p>
               <p className="text-2xl font-black">{chunks.length}</p>
            </div>
            <div className="p-4 rounded-xl border bg-emerald-500/5 border-emerald-500/20 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Answered</p>
               <p className="text-xl font-bold text-emerald-600">{answeredCount}</p>
            </div>
            <div className="p-4 rounded-xl border bg-amber-500/5 border-amber-500/20 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">Flagged</p>
               <p className="text-xl font-bold text-amber-600">{flaggedCount}</p>
            </div>
            <div className="p-4 rounded-xl border bg-muted/30 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Skipped</p>
               <p className="text-xl font-bold text-muted-foreground">{skippedCount}</p>
            </div>
            <div className="p-4 rounded-xl border bg-blue-500/5 border-blue-500/20 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Points Earned</p>
               <p className="text-xl font-bold text-blue-600">+{answeredCount * 15}</p>
            </div>
         </div>

         <Button className="w-full h-12 font-black text-sm" onClick={handleExit}>
           Return to Tasks
         </Button>
      </Modal>

      {/* Persistent Info Tooltip at bottom (desktop only) */}
      <div className="hidden lg:flex fixed bottom-6 left-64 ml-8 items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-md">
        <Info className="w-4 h-4 text-primary shrink-0" />
        <p className="text-xs text-primary/80 font-medium">
          Each chunk is reviewed by multiple annotators. Final decisions are based on agreement.
        </p>
      </div>
    </div>
  );
}
