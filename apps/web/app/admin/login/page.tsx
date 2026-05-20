'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { api } from '@/lib/api/client';
import { loginSchema, type LoginSchema } from '@/lib/schemas/admin';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@digitnepal.com',
      password: 'Digit@12345',
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: LoginSchema) => {
      const sanitizedPayload: LoginSchema = {
        email: payload.email.trim().toLowerCase(),
        password: payload.password.trim(),
      };
      const { data } = await api.post('/auth/login', sanitizedPayload);
      return data;
    },
    onSuccess: (data) => {
      window.localStorage.setItem('digit_nepal_token', data.accessToken);
      router.replace('/admin/dashboard');
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  const mutationErrorMessage = (() => {
    if (!mutation.isError) return null;
    if (axios.isAxiosError(mutation.error)) {
      const apiMessage = mutation.error.response?.data?.message;
      if (Array.isArray(apiMessage)) return apiMessage.join(', ');
      if (typeof apiMessage === 'string') return apiMessage;
      if (mutation.error.code === 'ERR_NETWORK') return 'Cannot reach API server';
      return mutation.error.message;
    }
    return 'Unexpected error occurred';
  })();

  return (
    <div className="section-wrap flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-300/80">Sign in to manage Digit Nepal website content.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-300/70" />
              <Input id="email" className="pl-9" {...form.register('email')} />
            </div>
            <p className="mt-1 text-xs text-rose-300">{form.formState.errors.email?.message}</p>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-300/70" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="pl-9 pr-10"
                {...form.register('password')}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-2 inline-flex rounded-md p-1 text-slate-300/80 hover:bg-white/10 hover:text-white"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-rose-300">{form.formState.errors.password?.message}</p>
          </div>

          {mutationErrorMessage ? (
            <p className="text-sm text-rose-300">
              Login failed: {mutationErrorMessage}. {api.defaults.baseURL ? `API: ${api.defaults.baseURL}. ` : ''}
              Please verify credentials and backend availability.
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
