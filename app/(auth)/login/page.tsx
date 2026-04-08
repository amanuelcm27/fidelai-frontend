import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LoginForm } from "@/components/forms/auth-forms";
import { motion } from "framer-motion";
import { Database } from "lucide-react";
export default function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="relative hidden lg:flex flex-col items-center justify-center flex-1 bg-muted/30 border-r border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        
        <div className="relative z-10 max-w-lg p-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Database className="w-3 h-3" />
            Amharic AI Ecosystem
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-foreground leading-tight">
            Powering the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Amharic AI</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The largest marketplace for sourcing, annotating, and selling high-quality language data for artificial intelligence models.
          </p>

          <div className="grid grid-cols-2 gap-4 text-left">
            {[
              "Upload datasets and earn",
              "Annotate and get paid",
              "Validate AI data",
              "Buy high-quality datasets"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8 group w-fit">
            <div className="w-9 h-9 rounded-xl brand-gradient-logo flex items-center justify-center shadow-lg brand-shadow">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              <span className="brand-text">Fidel AI</span>
            </span>
          </Link>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue working.
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
