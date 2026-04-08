"use client";

import { useEffect } from "react";
import { useOnboarding } from "@/context/onboarding-context";
import { PersonalInfoForm } from "@/components/onboarding/personal-info-form";

export default function Step1Page() {
  const { setCurrentStep } = useOnboarding();

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  return <PersonalInfoForm />;
}
