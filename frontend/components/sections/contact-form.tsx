'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { postData } from '@/lib/api/public';
import { fadeIn } from '@/lib/motion';
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
      companyName: '',
      serviceInterestedIn: '',
      projectBudget: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: ContactSchema) => {
      const detailLines = [
        payload.companyName ? `Company: ${payload.companyName}` : null,
        payload.serviceInterestedIn ? `Service: ${payload.serviceInterestedIn}` : null,
        payload.projectBudget ? `Project Budget: ${payload.projectBudget}` : null,
      ].filter(Boolean);

      const message = detailLines.length > 0 ? `${detailLines.join('\n')}\n\n${payload.message}` : payload.message;

      const subjectParts = ['Website Contact'];
      if (payload.serviceInterestedIn) subjectParts.push(payload.serviceInterestedIn);
      if (payload.projectBudget) subjectParts.push(payload.projectBudget);

      return postData('/inquiries', {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        subject: subjectParts.join(' • '),
        message,
      });
    },
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
        <div className="relative">
          <Input id="name" {...form.register('name')} placeholder=" " className="peer pt-6" />
          <Label
            htmlFor="name"
            className="pointer-events-none absolute left-3 top-3 z-10 !m-0 bg-background/70 px-1 text-xs text-slate-300/80 transition-all duration-200 ease-premium peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:bg-background/70 peer-focus:px-1 peer-focus:text-xs peer-focus:text-brand-pink"
          >
            Name
          </Label>
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.name?.message}</p>
        </div>
        <div className="relative">
          <Input id="email" {...form.register('email')} placeholder=" " className="peer pt-6" />
          <Label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-3 z-10 !m-0 bg-background/70 px-1 text-xs text-slate-300/80 transition-all duration-200 ease-premium peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:bg-background/70 peer-focus:px-1 peer-focus:text-xs peer-focus:text-brand-pink"
          >
            Email
          </Label>
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.email?.message}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <Input id="phone" {...form.register('phone')} placeholder=" " className="peer pt-6" />
          <Label
            htmlFor="phone"
            className="pointer-events-none absolute left-3 top-3 z-10 !m-0 bg-background/70 px-1 text-xs text-slate-300/80 transition-all duration-200 ease-premium peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:bg-background/70 peer-focus:px-1 peer-focus:text-xs peer-focus:text-brand-pink"
          >
            Phone Number
          </Label>
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.phone?.message}</p>
        </div>
        <div className="relative">
          <Input id="companyName" {...form.register('companyName')} placeholder=" " className="peer pt-6" />
          <Label
            htmlFor="companyName"
            className="pointer-events-none absolute left-3 top-3 z-10 !m-0 bg-background/70 px-1 text-xs text-slate-300/80 transition-all duration-200 ease-premium peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:bg-background/70 peer-focus:px-1 peer-focus:text-xs peer-focus:text-brand-pink"
          >
            Company Name
          </Label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <Input id="serviceInterestedIn" {...form.register('serviceInterestedIn')} placeholder=" " className="peer pt-6" />
          <Label
            htmlFor="serviceInterestedIn"
            className="pointer-events-none absolute left-3 top-3 z-10 !m-0 bg-background/70 px-1 text-xs text-slate-300/80 transition-all duration-200 ease-premium peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:bg-background/70 peer-focus:px-1 peer-focus:text-xs peer-focus:text-brand-pink"
          >
            Service Interested In
          </Label>
        </div>
        <div className="relative">
          <Input id="projectBudget" {...form.register('projectBudget')} placeholder=" " className="peer pt-6" />
          <Label
            htmlFor="projectBudget"
            className="pointer-events-none absolute left-3 top-3 z-10 !m-0 bg-background/70 px-1 text-xs text-slate-300/80 transition-all duration-200 ease-premium peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:bg-background/70 peer-focus:px-1 peer-focus:text-xs peer-focus:text-brand-pink"
          >
            Project Budget
          </Label>
        </div>
      </div>

      <div className="relative">
        <Textarea id="message" {...form.register('message')} placeholder=" " className="peer pt-7" />
        <Label
          htmlFor="message"
          className="pointer-events-none absolute left-3 top-3 z-10 !m-0 bg-background/70 px-1 text-xs text-slate-300/80 transition-all duration-200 ease-premium peer-placeholder-shown:top-6 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:bg-background/70 peer-focus:px-1 peer-focus:text-xs peer-focus:text-brand-pink"
        >
          Message
        </Label>
        <p className="mt-1 text-xs text-rose-300">{form.formState.errors.message?.message}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={mutation.isPending} magnetic>
          <Send className="mr-2 h-4 w-4" />
          {mutation.isPending ? 'Sending...' : 'Send Inquiry'}
        </Button>
        <AnimatePresence>
          {mutation.isSuccess ? (
            <motion.p initial="hidden" animate="show" exit="hidden" variants={fadeIn} className="text-sm text-brand-success">
              Thanks. Your message has been received.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
