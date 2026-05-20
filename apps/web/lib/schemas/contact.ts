import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(12, 'Message should be at least 12 characters.'),
});

export type ContactSchema = z.infer<typeof contactSchema>;
