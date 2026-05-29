import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const serviceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  icon: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
});

export const applicationSchema = z.object({
  title: z.string().min(3),
  category: z.enum(['WEBSITE', 'MOBILE_APP', 'SAAS', 'DASHBOARD', 'CLIENT_SYSTEM', 'OTHER']),
  imageUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().min(10),
  technologies: z.string().min(2),
  projectLink: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

export const eventSchema = z.object({
  title: z.string().min(3),
  imageUrl: z.string().url().optional().or(z.literal('')),
  eventDate: z.string().min(8),
  eventTime: z.string().min(3),
  venue: z.string().optional(),
  onlineLink: z.string().url().optional().or(z.literal('')),
  description: z.string().min(10),
  registrationLink: z.string().url().optional().or(z.literal('')),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']),
});

export const blogSchema = z.object({
  title: z.string().min(3),
  imageUrl: z.string().url().optional().or(z.literal('')),
  excerpt: z.string().min(10),
  content: z.string().min(30),
  tags: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export const settingSchema = z.object({
  key: z.string().min(2),
  value: z.string().min(2),
  description: z.string().optional(),
});

export const companyPhotoSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Valid image URL required'),
  alt: z.string().min(2, 'Alt text is required'),
  order: z.coerce.number().int().min(1),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  designation: z.string().min(2, 'Designation is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  photoUrl: z.string().url('Valid photo URL required'),
  order: z.coerce.number().int().min(1),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type ServiceSchema = z.infer<typeof serviceSchema>;
export type ApplicationSchema = z.infer<typeof applicationSchema>;
export type EventSchema = z.infer<typeof eventSchema>;
export type BlogSchema = z.infer<typeof blogSchema>;
export type SettingSchema = z.infer<typeof settingSchema>;
export type CompanyPhotoSchema = z.infer<typeof companyPhotoSchema>;
export type TeamMemberSchema = z.infer<typeof teamMemberSchema>;
