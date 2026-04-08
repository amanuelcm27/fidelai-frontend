import Link from "next/link";
import { Sparkles } from "lucide-react";
import { RegisterForm } from "@/components/forms/auth-forms";
import { Database } from "lucide-react";
export default function RegisterPage() {
  return (
    <div className="flex flex-col lg:flex-row-reverse min-h-screen">
      <div className="relative hidden lg:flex flex-col items-center justify-center flex-1 bg-muted/30 border-l border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        
        <div className="relative z-10 max-w-lg p-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Database className="w-3 h-3" />
            Shape The Future
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-foreground leading-tight">
            Join the Amharic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Data Revolution</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create an account to contribute, annotate, validate, or purchase high-quality Amharic datasets.
          </p>

          <div className="flex flex-col gap-4 text-left mx-auto max-w-sm">
            {[
              "Earn competitive rates for dataset uploads",
              "Work flexibly as an annotator",
              "Contribute to meaningful AI research",
              "Build inclusive language technology"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                </div>
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Create an account</h2>
            <p className="text-sm text-muted-foreground">
              Sign up to get started with the platform.
            </p>
          </div>

          <RegisterForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
