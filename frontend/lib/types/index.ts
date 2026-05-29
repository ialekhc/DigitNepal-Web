export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string | null;
  featured: boolean;
  order: number;
};

export type Application = {
  id: string;
  title: string;
  slug: string;
  category:
    | 'WEBSITE'
    | 'MOBILE_APP'
    | 'SAAS'
    | 'DASHBOARD'
    | 'CLIENT_SYSTEM'
    | 'OTHER';
  imageUrl?: string | null;
  description: string;
  technologies: string[];
  projectLink?: string | null;
  featured: boolean;
};

export type Event = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  eventDate: string;
  eventTime: string;
  venue?: string | null;
  onlineLink?: string | null;
  description: string;
  registrationLink?: string | null;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  excerpt: string;
  content: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string | null;
  author?: {
    id: string;
    name: string;
  };
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export type CompanyPhoto = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  order: number;
};

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  description: string;
  photoUrl: string;
  order: number;
};

export type SettingRecord<TValue = Record<string, unknown>> = {
  id: string;
  key: string;
  value: TValue;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
