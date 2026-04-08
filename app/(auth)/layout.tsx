import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthBackground } from "@/components/auth/auth-background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <AuthBackground />
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
