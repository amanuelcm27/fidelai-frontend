import { Check, User, ShieldCheck, Activity } from "lucide-react";
import { useOnboarding } from "@/context/onboarding-context";

const steps = [
  { id: 1, title: "Personal Details", description: "Tell us about yourself", icon: User },
  { id: 2, title: "Compliance", description: "Preferences & rules", icon: ShieldCheck },
  { id: 3, title: "Readiness", description: "Interactive test", icon: Activity },
];

export function StepIndicator() {
  const { currentStep, isStepComplete } = useOnboarding();

  return (
    <div className="flex flex-col space-y-8 relative">
      <div className="absolute left-[1.125rem] top-8 bottom-8 w-px bg-border/50 hidden md:block -z-10" />

      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = isStepComplete(step.id) || currentStep > step.id;

        return (
          <div key={step.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 relative">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 relative z-10 bg-background ${
                isActive
                  ? "border-primary text-primary"
                  : isCompleted
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-border text-muted-foreground"
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
            </div>
            
            <div className="flex flex-col">
              <span className={`text-sm font-bold tracking-tight uppercase ${
                isActive ? "text-primary" : isCompleted ? "text-emerald-500" : "text-muted-foreground"
              }`}>
                Step {step.id}
              </span>
              <span className={`text-base font-semibold ${
                isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.title}
              </span>
              <span className="text-sm text-muted-foreground hidden md:block">
                {step.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
