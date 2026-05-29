'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { postData } from '@/lib/api/public';
import { careerApplicationSchema, type CareerApplicationSchema } from '@/lib/schemas/contact';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export function CareerApplicationForm() {
  const [resumeFileName, setResumeFileName] = useState<string>('');

  const form = useForm<CareerApplicationSchema>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      position: '',
      coverLetter: '',
      resumeFileName: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: CareerApplicationSchema) =>
      postData('/inquiries', {
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        subject: `Career Application • ${payload.position}`,
        message: `Position: ${payload.position}\nResume: ${payload.resumeFileName || 'Not attached'}\n\nCover Letter:\n${payload.coverLetter}`,
      }),
    onSuccess: () => {
      setResumeFileName('');
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
          <Label htmlFor="career-name">Full Name</Label>
          <Input id="career-name" {...form.register('fullName')} placeholder="Your full name" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.fullName?.message}</p>
        </div>
        <div>
          <Label htmlFor="career-email">Email</Label>
          <Input id="career-email" {...form.register('email')} placeholder="you@example.com" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.email?.message}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="career-phone">Phone</Label>
          <Input id="career-phone" {...form.register('phone')} placeholder="+977-98XXXXXXXX" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.phone?.message}</p>
        </div>
        <div>
          <Label htmlFor="career-position">Position</Label>
          <Input id="career-position" {...form.register('position')} placeholder="Frontend Developer" />
          <p className="mt-1 text-xs text-rose-300">{form.formState.errors.position?.message}</p>
        </div>
      </div>

      <div>
        <Label htmlFor="career-resume">Resume Upload</Label>
        <Input
          id="career-resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(event) => {
            const file = event.target.files?.[0];
            const fileName = file?.name ?? '';
            setResumeFileName(fileName);
            form.setValue('resumeFileName', fileName, { shouldValidate: true });
          }}
        />
        <p className="mt-1 text-xs text-slate-300/80">
          {resumeFileName ? `Selected: ${resumeFileName}` : 'Attach your latest resume (PDF/DOC/DOCX).'}
        </p>
      </div>

      <div>
        <Label htmlFor="career-coverLetter">Cover Letter</Label>
        <Textarea
          id="career-coverLetter"
          className="min-h-[140px]"
          {...form.register('coverLetter')}
          placeholder="Tell us about your background and why you are a strong fit."
        />
        <p className="mt-1 text-xs text-rose-300">{form.formState.errors.coverLetter?.message}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={mutation.isPending}>
          <FileText className="mr-2 h-4 w-4" />
          {mutation.isPending ? 'Submitting...' : 'Apply Now'}
        </Button>
        {mutation.isSuccess ? <p className="text-sm text-accent-cyan">Application received successfully.</p> : null}
      </div>
    </form>
  );
}
