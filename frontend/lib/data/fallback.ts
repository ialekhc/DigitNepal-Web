import { Application, Blog, CompanyPhoto, Event, Service, TeamMember } from '@/lib/types';
import { serviceCatalog } from './services-catalog';

export const fallbackServices: Service[] = serviceCatalog.map((service, index) => ({
  id: `service-${index + 1}`,
  title: service.title,
  slug: service.slug,
  description: service.description,
  featured: true,
  order: index + 1,
}));

export const fallbackApplications: Application[] = [
  {
    id: 'app-1',
    title: 'Himalayan Commerce Suite',
    slug: 'himalayan-commerce-suite',
    category: 'SAAS',
    description: 'A multi-tenant commerce platform for regional distributors and retailers.',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    projectLink: '#',
    featured: true,
    imageUrl: null,
  },
  {
    id: 'app-2',
    title: 'CityCare Health App',
    slug: 'citycare-health-app',
    category: 'MOBILE_APP',
    description: 'Patient-focused mobile app for appointments, reminders, and teleconsulting.',
    technologies: ['React Native', 'Node.js', 'Firebase'],
    projectLink: '#',
    featured: true,
    imageUrl: null,
  },
];

export const fallbackEvents: Event[] = [
  {
    id: 'event-1',
    title: 'AI Product Sprint Bootcamp',
    slug: 'ai-product-sprint-bootcamp',
    eventDate: '2026-07-15T10:00:00.000Z',
    eventTime: '10:00 AM - 4:00 PM',
    venue: 'Kathmandu Innovation Hub',
    onlineLink: null,
    description: 'A practical intensive for founders and teams building AI-powered products.',
    registrationLink: '#',
    status: 'UPCOMING',
    imageUrl: null,
  },
  {
    id: 'event-2',
    title: 'Data Intelligence Webinar',
    slug: 'data-intelligence-webinar',
    eventDate: '2026-07-28T13:00:00.000Z',
    eventTime: '7:00 PM - 8:30 PM',
    venue: null,
    onlineLink: 'https://example.com',
    description: 'Real-world BI dashboards and analytics strategy session.',
    registrationLink: '#',
    status: 'UPCOMING',
    imageUrl: null,
  },
];

export const fallbackBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'How Nepalese Businesses Are Scaling with Custom Software',
    slug: 'nepal-businesses-scaling-custom-software',
    excerpt:
      'Custom digital systems are helping local organizations streamline operations and unlock growth.',
    content: 'Article content',
    tags: ['Technology', 'Business'],
    status: 'PUBLISHED',
    publishedAt: '2026-06-01T08:00:00.000Z',
  },
];

export const fallbackCompanyPhotos: CompanyPhoto[] = [
  {
    id: 'company-photo-1',
    title: 'Creative Product Sessions',
    description: 'Collaborative discovery and planning sessions where we align strategy, design, and development.',
    imageUrl: '/brand/favicon-alt-512.png',
    alt: 'Digit Nepal creative planning workspace',
    order: 1,
  },
  {
    id: 'company-photo-2',
    title: 'Engineering & Delivery',
    description: 'Focused execution from architecture to production releases with quality and performance in mind.',
    imageUrl: '/brand/favicon-512.png',
    alt: 'Digit Nepal software engineering environment',
    order: 2,
  },
  {
    id: 'company-photo-3',
    title: 'Training & Community',
    description: 'Hands-on workshops and tech programs that help students and professionals build practical skills.',
    imageUrl: '/brand/favicon-alt-512.png',
    alt: 'Digit Nepal technology workshop and training',
    order: 3,
  },
];

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 'team-member-1',
    name: 'Alekh Chaudhary',
    designation: 'CEO & Founder',
    description:
      'Leads company vision, product strategy, and digital innovation initiatives across client and in-house platforms.',
    photoUrl: '/team/alekh-chaudhary.jpg',
    order: 1,
  },
  {
    id: 'team-member-2',
    name: 'Arun K. Chaudhary',
    designation: 'Business Development Manager',
    description:
      'Drives client partnerships, growth opportunities, and strategic collaboration to expand Digit Nepal services.',
    photoUrl: '/team/business-development-manager.jpg',
    order: 2,
  },
];
