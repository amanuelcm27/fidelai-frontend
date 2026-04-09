"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Zod schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Login Form Component
 */
export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      // Set mock cookie for middleware
      document.cookie = "token=mock-token; path=/; max-age=3600";
      setIsLoading(false);
      router.push("/dashboard/profile"); 
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
        <input 
          id="email" 
          type="email" 
          placeholder="you@example.com" 
          {...register("email")}
          className={`flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : 'border-input hover:border-border'}`} 
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <Link href="#" className="text-xs font-medium text-orange-600 hover:text-orange-500 transition-colors">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            {...register("password")}
            className={`flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : 'border-input hover:border-border'}`} 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <div className="flex items-center space-x-2 pt-1">
        <input 
          type="checkbox" 
          id="rememberMe" 
          {...register("rememberMe")}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background" 
        />
        <label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Remember me
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full flex h-12 items-center justify-center rounded-xl brand-gradient-btn px-8 text-sm font-bold text-white shadow-lg brand-shadow brand-shadow-hover transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 mt-6"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Sign In
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-border/50 bg-background px-8 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Google
        </button>
        <button type="button" className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-border/50 bg-background px-8 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Microsoft
        </button>
      </div>
    </form>
  );
}

/**
 * Register Form Component
 */
export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const password = watch("password", "");
  const calculateStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 7) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };
  const strength = calculateStrength(password);
  const strengthText = ["Weak", "Fair", "Good", "Strong", "Excellent"][strength];
  const strengthColor = ["bg-muted", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"][strength];

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      // Set mock cookie for middleware
      document.cookie = "token=mock-token; path=/; max-age=3600";
      setIsLoading(false);
      router.push("/dashboard/profile"); 
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
        <input 
          id="fullName" 
          type="text" 
          placeholder="John Doe" 
          {...register("fullName")}
          className={`flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${errors.fullName ? 'border-destructive focus-visible:ring-destructive' : 'border-input hover:border-border'}`} 
        />
        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="reg-email" className="text-sm font-medium">Email Address</label>
        <input 
          id="reg-email" 
          type="email" 
          placeholder="you@example.com" 
          {...register("email")}
          className={`flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : 'border-input hover:border-border'}`} 
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="reg-password" className="text-sm font-medium">Password</label>
          <div className="relative">
            <input 
              id="reg-password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              {...register("password")}
              className={`flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : 'border-input hover:border-border'}`} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
          <input 
            id="confirmPassword" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            {...register("confirmPassword")}
            className={`flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : 'border-input hover:border-border'}`} 
          />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {password.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full ${strengthColor} transition-all duration-300`} style={{ width: `${(strength / 4) * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground text-right">{strengthText}</p>
        </div>
      )}

      <div className="flex items-start space-x-2 pt-2">
        <input 
          type="checkbox" 
          id="acceptTerms" 
          {...register("acceptTerms")}
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background shrink-0" 
        />
        <label htmlFor="acceptTerms" className="text-sm text-muted-foreground leading-snug">
          I agree to the <Link href="/terms" className="text-foreground hover:text-orange-600 font-medium transition-colors">Terms of Service</Link> and <Link href="/privacy" className="text-foreground hover:text-orange-600 font-medium transition-colors">Privacy Policy</Link>.
        </label>
      </div>
      {errors.acceptTerms && <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>}

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full flex h-12 items-center justify-center rounded-xl brand-gradient-btn px-8 text-sm font-bold text-white shadow-lg brand-shadow brand-shadow-hover transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 mt-6"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Create Account
      </button>
    </form>
  );
}
