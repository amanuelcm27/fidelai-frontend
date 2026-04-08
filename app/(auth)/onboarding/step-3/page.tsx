"use client";

import { useEffect } from "react";
import { useOnboarding } from "@/context/onboarding-context";
import { ReadinessTest } from "@/components/onboarding/readiness-test";

export default function Step3Page() {
  const { setCurrentStep } = useOnboarding();

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  return <ReadinessTest />;
}
