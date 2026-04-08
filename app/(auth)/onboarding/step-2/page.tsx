"use client";

import { useEffect } from "react";
import { useOnboarding } from "@/context/onboarding-context";
import { ComplianceForm } from "@/components/onboarding/compliance-form";

export default function Step2Page() {
  const { setCurrentStep } = useOnboarding();

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  return <ComplianceForm />;
}
