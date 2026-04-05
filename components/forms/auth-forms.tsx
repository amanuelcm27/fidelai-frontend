"use client";

/**
 * Placeholder for the login form.
 * Will use react-hook-form + zod for validation.
 */
export function LoginForm() {
  return (
    <form className="mt-6 space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" placeholder="you@example.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input id="password" type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Sign In
      </button>
    </form>
  );
}

/**
 * Placeholder for the register form.
 */
export function RegisterForm() {
  return (
    <form className="mt-6 space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
        <input id="name" type="text" placeholder="John Doe" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div className="space-y-1">
        <label htmlFor="reg-email" className="text-sm font-medium">Email</label>
        <input id="reg-email" type="email" placeholder="you@example.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div className="space-y-1">
        <label htmlFor="reg-password" className="text-sm font-medium">Password</label>
        <input id="reg-password" type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Create Account
      </button>
    </form>
  );
}
