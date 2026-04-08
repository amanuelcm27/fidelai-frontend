"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

export type OnboardingRole = "contributor" | "annotator" | "expert" | "buyer" | null;

export interface PersonalDetails {
  fullName: string;
  phone: string;
  country: string;
  language: string;
  experienceLevel: string;
}

export interface ComplianceData {
  // Contributor
  dataTypes?: string[];
  datasetSizeCapacity?: string;
  languageExpertise?: string[];
  dataPolicyAgreement?: boolean;
  // Annotator
  domainExpertise?: string[];
  annotationExperience?: string;
  availability?: string;
  preferredTaskTypes?: string[];
  // Expert
  researchBackground?: string;
  publications?: string;
  domainSpecialization?: string[];
  yearsOfExperience?: string;
  // Buyer
  organization?: string;
  industry?: string;
  datasetInterest?: string[];
  useCase?: string;
}

export interface ReadinessData {
  completed: boolean;
  sampleData?: string;
  labelResult?: string;
  reviewDecision?: string;
  datasetRequirement?: string;
}

export interface OnboardingState {
  currentStep: number;
  role: OnboardingRole;
  personalDetails: PersonalDetails;
  compliance: ComplianceData;
  preferences: Record<string, unknown>;
  readinessData: ReadinessData;
  completedSteps: number[];
}

interface OnboardingContextType extends OnboardingState {
  setCurrentStep: (step: number) => void;
  setRole: (role: OnboardingRole) => void;
  setPersonalDetails: (details: Partial<PersonalDetails>) => void;
  setCompliance: (data: Partial<ComplianceData>) => void;
  setPreferences: (prefs: Record<string, unknown>) => void;
  setReadinessData: (data: Partial<ReadinessData>) => void;
  markStepComplete: (step: number) => void;
  isStepComplete: (step: number) => boolean;
  resetOnboarding: () => void;
}

const initialPersonalDetails: PersonalDetails = {
  fullName: "",
  phone: "",
  country: "",
  language: "",
  experienceLevel: "",
};

const initialReadiness: ReadinessData = {
  completed: false,
};

const initialState: OnboardingState = {
  currentStep: 1,
  role: null,
  personalDetails: initialPersonalDetails,
  compliance: {},
  preferences: {},
  readinessData: initialReadiness,
  completedSteps: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("fidelai_onboarding");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse onboarding state:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fidelai_onboarding", JSON.stringify(state));
    }
  }, [state, isMounted]);

  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const setRole = useCallback((role: OnboardingRole) => {
    setState((prev) => ({ ...prev, role }));
  }, []);

  const setPersonalDetails = useCallback((details: Partial<PersonalDetails>) => {
    setState((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, ...details },
    }));
  }, []);

  const setCompliance = useCallback((data: Partial<ComplianceData>) => {
    setState((prev) => ({
      ...prev,
      compliance: { ...prev.compliance, ...data },
    }));
  }, []);

  const setPreferences = useCallback((prefs: Record<string, unknown>) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
    }));
  }, []);

  const setReadinessData = useCallback((data: Partial<ReadinessData>) => {
    setState((prev) => ({
      ...prev,
      readinessData: { ...prev.readinessData, ...data },
    }));
  }, []);

  const markStepComplete = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step],
    }));
  }, []);

  const isStepComplete = useCallback(
    (step: number) => state.completedSteps.includes(step),
    [state.completedSteps]
  );

  const resetOnboarding = useCallback(() => {
    setState(initialState);
    localStorage.removeItem("fidelai_onboarding");
  }, []);

  if (!isMounted) return null;

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        setCurrentStep,
        setRole,
        setPersonalDetails,
        setCompliance,
        setPreferences,
        setReadinessData,
        markStepComplete,
        isStepComplete,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
