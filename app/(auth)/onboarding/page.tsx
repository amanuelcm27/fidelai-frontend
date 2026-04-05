"use client";

export default function OnboardingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Welcome to FidelAI</h1>
      <p className="mt-2 text-center text-muted-foreground">
        Complete your profile setup in 3 easy steps
      </p>
      {/* OnboardingStepper component will be integrated here */}
      <div className="mt-8 space-y-4">
        <div className="p-4 border rounded-lg">Step 1: Profile Information</div>
        <div className="p-4 border rounded-lg">Step 2: Role Selection</div>
        <div className="p-4 border rounded-lg">Step 3: Preferences</div>
      </div>
    </div>
  );
}
