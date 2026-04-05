/**
 * Auth Feature Module
 *
 * Contains login/register logic, auth hooks, and form integration.
 * Uses: react-hook-form, zod, @tanstack/react-query
 */

export { LoginForm, RegisterForm } from '@/components/forms/auth-forms';
export { useAuth } from '@/context/auth-context';

// Future exports:
// export { useLogin } from './hooks/use-login';
// export { useRegister } from './hooks/use-register';
