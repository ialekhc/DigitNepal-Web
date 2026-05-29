import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  serviceInterestedIn: z.string().optional(),
  projectBudget: z.string().optional(),
  message: z.string().min(12, 'Message should be at least 12 characters.'),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const eventRegistrationSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(7, 'Please enter a valid phone number.'),
  organization: z.string().min(2, 'Please enter your organization.'),
  eventName: z.string().min(2, 'Please select or enter event name.'),
});

export type EventRegistrationSchema = z.infer<typeof eventRegistrationSchema>;

export const careerApplicationSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(7, 'Please enter a valid phone number.'),
  position: z.string().min(2, 'Please enter a position.'),
  coverLetter: z.string().min(40, 'Cover letter should be at least 40 characters.'),
  resumeFileName: z.string().optional(),
});

export type CareerApplicationSchema = z.infer<typeof careerApplicationSchema>;
