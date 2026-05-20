'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { postData } from '@/lib/api/public';
import { contactSchema, type ContactSchema } from '@/lib/schemas/contact';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export function ContactForm() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: ContactSchema) => postData('/inquiries', payload),
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register('name')} placeholder="Your full name" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.name?.message}</p>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...form.register('email')} placeholder="you@company.com" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.email?.message}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input id="phone" {...form.register('phone')} placeholder="+977-98XXXXXXXX" />
        </div>
        <div>
          <Label htmlFor="subject">Subject (Optional)</Label>
          <Input id="subject" {...form.register('subject')} placeholder="Project inquiry" />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...form.register('message')} placeholder="Tell us about your project..." />
        <p className="mt-1 text-xs text-rose-300">{form.formState.errors.message?.message}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={mutation.isPending}>
          <Send className="mr-2 h-4 w-4" />
          {mutation.isPending ? 'Sending...' : 'Send Inquiry'}
        </Button>
        {mutation.isSuccess ? (
          <p className="text-sm text-accent-cyan">Thanks. Your message has been received.</p>
        ) : null}
      </div>
    </form>
  );
}
