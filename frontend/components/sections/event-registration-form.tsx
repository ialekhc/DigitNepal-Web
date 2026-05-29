'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CalendarCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { postData } from '@/lib/api/public';
import { eventRegistrationSchema, type EventRegistrationSchema } from '@/lib/schemas/contact';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function EventRegistrationForm() {
  const form = useForm<EventRegistrationSchema>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      organization: '',
      eventName: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: EventRegistrationSchema) =>
      postData('/inquiries', {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        subject: `Event Registration • ${payload.eventName}`,
        message: `Organization: ${payload.organization}\nPhone: ${payload.phone}\nRequested Event: ${payload.eventName}`,
      }),
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
          <Label htmlFor="event-name">Name</Label>
          <Input id="event-name" {...form.register('name')} placeholder="Full name" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.name?.message}</p>
        </div>
        <div>
          <Label htmlFor="event-email">Email</Label>
          <Input id="event-email" {...form.register('email')} placeholder="you@example.com" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.email?.message}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="event-phone">Phone</Label>
          <Input id="event-phone" {...form.register('phone')} placeholder="+977-98XXXXXXXX" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.phone?.message}</p>
        </div>
        <div>
          <Label htmlFor="event-organization">Organization</Label>
          <Input id="event-organization" {...form.register('organization')} placeholder="Your organization" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.organization?.message}</p>
        </div>
      </div>

      <div>
        <Label htmlFor="event-eventName">Event Name</Label>
        <Input id="event-eventName" {...form.register('eventName')} placeholder="Flutter Mobile App Development Bootcamp" />
        <p className="mt-1 text-xs text-rose-300">{form.formState.errors.eventName?.message}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={mutation.isPending}>
          <CalendarCheck className="mr-2 h-4 w-4" />
          {mutation.isPending ? 'Registering...' : 'Submit Registration'}
        </Button>
        {mutation.isSuccess ? <p className="text-sm text-accent-cyan">Registration request received.</p> : null}
      </div>
    </form>
  );
}
